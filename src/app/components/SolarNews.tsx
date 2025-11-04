// app/components/SolarNews.tsx (client)
'use client';

import React, { useEffect, useState, useCallback, FormEvent } from 'react';
import ParamountLoader from './Loader';
import Link from 'next/link';

export type Article = {
  id: string;
  title: string;
  description?: string | null;
  url: string;
  source: string;
  publishedAt?: string;
  urlToImage?: string | null;
};

type ApiResponse = {
  articles: Article[];
  total: number;
  cached?: boolean;
  error?: string;
};

type FetchError = {
  message: string;
  status?: number;
};

export default function SolarNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Controls
  const [query, setQuery] = useState('solar energy power plant');
  const [country, setCountry] = useState('bd');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [total, setTotal] = useState<number | null>(null);

  const buildUrl = useCallback((q: string = query, c: string = country, p: number = page, ps: number = pageSize): string => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (c) params.set('country', c);
    if (p) params.set('page', String(p));
    if (ps) params.set('pageSize', String(ps));
    return `/api/solar-news?${params.toString()}`;
  }, [query, country, page, pageSize]);

  const fetchNews = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const url = buildUrl();
      const res = await fetch(url);
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }
      
      const json: ApiResponse = await res.json();
      
      if (json.error) {
        throw new Error(json.error);
      }
      
      setArticles(json.articles ?? []);
      setTotal(json.total ?? null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  }, [buildUrl]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSearch = async (e?: FormEvent): Promise<void> => {
    e?.preventDefault();
    setPage(1);
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const totalPages = total ? Math.ceil(total / pageSize) : null;

  // Format date function
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  // Handle page size change
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setPage(1);
  };

  // Handle page navigation
  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  // Generate page numbers for pagination
  const getPageNumbers = (): number[] => {
    if (!totalPages) return [];
    
    const maxPagesToShow = 5;
    const currentPage = page;
    const pages: number[] = [];
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <section className="relative flex flex-col justify-center overflow-hidden w-full h-full bg-primary z-20 backdrop-blur-sm sm:p-4">
      <div className="container-responsive">
        {/* Header Section */}
        <div className="flex-between flex-row gap-4 m-2 sm:m-4">
          <div className="text-left">
            <h2 className="text-xl md:text-3xl font-bold gradient-text-solar">
              Solar & Renewable Energy News
            </h2>
            <p className="text-tertiary text-sm lg:text-base">
              Latest updates from the solar energy industry
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn btn-ghost btn-sm flex items-center gap-2"
              aria-label="Refresh news"
            >
              <svg 
                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Pagination Controls - Top */}
        <div className="text-sm text-tertiary flex justify-end">
            Page {page}{totalPages ? ` of ${totalPages}` : ''}
            {total && <span className="ml-2">({total} total)</span>}
        </div>
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <ParamountLoader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card card-status-error p-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <svg className="w-12 h-12 text-solar-error" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-solar-error mb-2">Failed to Load News</h3>
                <p className="text-secondary">{error}</p>
              </div>
              <button onClick={handleRefresh} className="btn btn-error mt-2">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <div className="card p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <svg className="w-16 h-16 text-tertiary" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">No Articles Found</h3>
                <p className="text-tertiary">Try adjusting your search terms or filters</p>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {articles.map((article) => (
                <Link 
                  key={article.id} 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <article className="card card-interactive group h-full flex flex-col overflow-hidden hover-lift">
                    {/* Image Container - Fixed Aspect Ratio */}
                    <div className="relative aspect-video overflow-hidden bg-tertiary">
                      {article.urlToImage ? (
                        <img 
                          src={article.urlToImage} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex-center bg-gradient-energy">
                          <svg className="w-12 h-12 text-white opacity-50" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Source Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="tag tag-primary text-xs font-semibold">
                          {article.source}
                        </span>
                      </div>
                      
                      {/* Date Overlay */}
                      {article.publishedAt && (
                        <div className="absolute top-3 right-3">
                          <span className="tag tag-white text-xs">
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 p-4 flex flex-col">
                      <h3 className="text-sm font-bold text-primary line-clamp-3 mb-2 group-hover:text-solar-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      {article.description && (
                        <p className="text-sm text-secondary line-clamp-3 mb-4 flex-1">
                          {article.description}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-3 border-t border-primary">
                        <div className="btn btn-sm btn-ghost w-full justify-center group/link">
                          Read Full Article
                          <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Bottom Pagination */}
            <div className="flex-center mt-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="btn btn-ghost btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        page === pageNum
                          ? 'bg-solar-primary text-white'
                          : 'bg-secondary text-primary hover:bg-tertiary'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  {totalPages && totalPages > 5 && page < totalPages - 2 && (
                    <span className="text-tertiary mx-1">...</span>
                  )}
                </div>
                
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!!totalPages && page >= totalPages}
                  className="btn btn-ghost btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-quaternary">
            Data aggregated from multiple news sources (NewsAPI, NewsData.io, GDELT). 
            Articles from Bangladesh are prioritized by default.
          </p>
        </div>
      </div>
    </section>
  );
}