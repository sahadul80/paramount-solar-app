import { NextResponse } from 'next/server';

// ==================== TYPE DEFINITIONS ====================

type ImageAttribution = {
  photographer?: string | null;
  photographer_url?: string | null;
  unsplash_id?: string | null;
};

type RawArticle = {
  title?: string;
  description?: string | null;
  url?: string;
  source?: { name?: string } | string | null;
  publishedAt?: string;
  urlToImage?: string | null;
  imageAttribution?: ImageAttribution | null;
  _origin?: string;
  _fetchedWithCountryBD?: boolean;
};

type NewsAPIResponse = {
  articles: NewsAPIArticle[];
};

type NewsAPIArticle = {
  title: string;
  description: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
  urlToImage: string | null;
};

type NewsDataResponse = {
  results: NewsDataArticle[];
};

type NewsDataArticle = {
  title: string;
  description: string | null;
  link?: string;
  source_id?: string;
  source?: { name: string };
  pubDate?: string;
  pubDate_iso?: string;
  image_url?: string | null;
  enclosure?: { url: string };
};

type GDELTArticle = {
  title?: string;
  url?: string;
  document_url?: string;
  link?: string;
  sourceurl?: string;
  excerpt?: string;
  snippet?: string;
  summary?: string;
  abstract?: string;
  description?: string;
  body?: string;
  domain?: string;
  source?: string;
  source_name?: string;
  provider?: string;
  seendate?: string;
  pubDate?: string;
  published?: string;
  date?: string;
  publish_date?: string;
  image?: string;
  image_url?: string;
  thumbnail?: string;
  images?: Array<{ url: string }>;
};

type UnsplashResponse = {
  results: UnsplashPhoto[];
};

type UnsplashPhoto = {
  urls: {
    regular?: string;
    small?: string;
    thumb?: string;
  };
  user?: {
    name?: string;
    links?: {
      html?: string;
    };
  };
  id?: string;
};

type CacheEntry = {
  ts: number;
  ttl: number;
  data: any;
};

type ScoredArticle = {
  item: RawArticle;
  score: number;
};

// ==================== CACHE MANAGEMENT ====================

declare global {
  // eslint-disable-next-line no-var
  var __solarNewsCache: Map<string, CacheEntry> | undefined;
}

if (!global.__solarNewsCache) {
  global.__solarNewsCache = new Map();
}

function setCache(key: string, data: unknown, ttl = 120): void {
  global.__solarNewsCache!.set(key, { ts: Date.now(), ttl, data });
}

function getCache<T>(key: string): T | null {
  const entry = global.__solarNewsCache!.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > entry.ttl * 1000) {
    global.__solarNewsCache!.delete(key);
    return null;
  }
  return entry.data as T;
}

// ==================== DATE VALIDATION ====================

function isValidDate(dateString?: string): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function safeDateParse(dateString?: string): string | undefined {
  if (!dateString || !isValidDate(dateString)) return undefined;
  return new Date(dateString).toISOString();
}

// ==================== NORMALIZERS ====================

function normalizeFromNewsAPI(item: NewsAPIArticle): RawArticle {
  return {
    title: item.title?.trim() || undefined,
    description: item.description?.trim() || null,
    url: item.url?.trim() || undefined,
    source: item.source?.name || 'NewsAPI',
    publishedAt: safeDateParse(item.publishedAt),
    urlToImage: item.urlToImage?.trim() || null,
    imageAttribution: null,
    _origin: 'newsapi',
  };
}

function normalizeFromNewsData(item: NewsDataArticle): RawArticle {
  const publishedAt = safeDateParse(item.pubDate_iso || item.pubDate);
  
  return {
    title: item.title?.trim() || undefined,
    description: item.description?.trim() || null,
    url: item.link?.trim() || undefined,
    source: item.source_id || item.source?.name || 'NewsData',
    publishedAt,
    urlToImage: (item.image_url || item.enclosure?.url)?.trim() || null,
    imageAttribution: null,
    _origin: 'newsdata',
  };
}

function normalizeFromGdelt(item: GDELTArticle): RawArticle {
  const url = (
    item.url ??
    item.document_url ??
    item.link ??
    item.sourceurl
  )?.trim();

  const title = item.title?.trim();

  const description = (
    item.excerpt ??
    item.snippet ??
    item.summary ??
    item.abstract ??
    item.description ??
    item.body
  )?.trim();

  const source = (
    item.domain ??
    item.source ??
    item.source_name ??
    item.provider ??
    'GDELT'
  );

  const publishedAt = safeDateParse(
    item.seendate ??
    item.pubDate ??
    item.published ??
    item.date ??
    item.publish_date
  );

  const urlToImage = (
    item.image ??
    item.image_url ??
    item.thumbnail ??
    (item.images?.[0]?.url)
  )?.trim();

  return {
    title: title || undefined,
    description: description || null,
    url: url || undefined,
    source: source || 'GDELT',
    publishedAt,
    urlToImage: urlToImage || null,
    imageAttribution: null,
    _origin: 'gdelt',
  };
}

function makeId(item: RawArticle): string {
  if (item.url) return item.url;
  return item.title ?? Math.random().toString(36).slice(2, 9);
}

// ==================== SCORING FUNCTION ====================

function scoreArticle(item: RawArticle, countryParam: string): number {
  let score = 1;
  const text = `${item.title ?? ''} ${item.description ?? ''} ${item.source ?? ''} ${item.url ?? ''}`.toLowerCase();

  if (countryParam === 'bd') {
    if (/\bbangladesh\b/.test(text) || /\.bd\b/.test(text)) score += 10;
    if (/\bdhaka\b/.test(text) || /\bchittagong\b/.test(text) || /\bsylhet\b/.test(text) || /\bkhulna\b/.test(text)) score += 8;
    if (item._fetchedWithCountryBD) score += 5;
  } else {
    if (/\bbangladesh\b/.test(text) || /\.bd\b/.test(text)) score += 2;
  }

  if (item.urlToImage) score += 2;
  if (item.publishedAt) score += 1;

  return score;
}

// ==================== UNSPLASH IMAGE FETCHER ====================

async function fetchUnsplashImageWithAttribution(
  query: string
): Promise<{ url: string; attribution: ImageAttribution } | null> {
  const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY ?? 'q6acLv6kT4KdP-UxGWkDWL53ukYTZc0sIvjZBBLghW4';
  
  if (!UNSPLASH_KEY) return null;
  if (!query || query.trim().length < 3) return null;

  const cacheKey = `unsplash:${query.toLowerCase().trim()}`;
  const cached = getCache<{ url: string; attribution: ImageAttribution }>(cacheKey);
  if (cached) return cached;

  try {
    const params = new URLSearchParams({ 
      query: query.trim(), 
      per_page: '1',
      orientation: 'landscape'
    });
    const endpoint = `https://api.unsplash.com/search/photos?${params.toString()}`;
    
    const response = await fetch(endpoint, { 
      headers: { 
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
        'Accept-Version': 'v1'
      } 
    });
    
    if (!response.ok) return null;
    
    const data = await response.json() as UnsplashResponse;
    const first = data?.results?.[0];
    if (!first) return null;

    const imgUrl = first.urls?.regular ?? first.urls?.small ?? first.urls?.thumb;
    if (!imgUrl) return null;

    const photographer = first.user?.name ?? null;
    const photographer_url = first.user?.links?.html
      ? `${first.user.links.html}?utm_source=solar-news-app&utm_medium=referral`
      : null;
    const unsplash_id = first.id ?? null;

    const payload = {
      url: imgUrl,
      attribution: {
        photographer,
        photographer_url,
        unsplash_id,
      },
    };

    setCache(cacheKey, payload, 60 * 60 * 24); // 24 hours
    return payload;
  } catch (error) {
    console.warn('Unsplash lookup failed:', error);
    return null;
  }
}

// ==================== API RESPONSE HANDLER ====================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') ?? 'solar OR photovoltaic OR "solar energy" OR renewable';
    const country = searchParams.get('country') ?? 'bd';
    const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
    const pageSize = Math.max(1, Number(searchParams.get('pageSize') ?? '5'));
    const ttl = Math.max(60, Number(searchParams.get('ttl') ?? '120'));

    const cacheKey = `${query}|${country}|${page}|${pageSize}`;
    const cached = getCache<{ articles: RawArticle[]; total: number }>(cacheKey);
    if (cached) {
      return NextResponse.json({ ...cached, cached: true }, { status: 200 });
    }

    // NewsAPI Fetch
    const newsapiPromise = (async (): Promise<RawArticle[]> => {
      const NEWSAPI_KEY = process.env.NEWSAPI_KEY;
      if (!NEWSAPI_KEY) return [];

      const params = new URLSearchParams();
      params.set('q', query);
      params.set('language', 'en');
      params.set('pageSize', String(Math.max(20, pageSize * 2)));
      params.set('page', String(page));
      params.set('apiKey', NEWSAPI_KEY);
      
      const url = `https://newsapi.org/v2/everything?${params.toString()}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) return [];
        const data = await response.json() as NewsAPIResponse;
        return (data.articles ?? []).map(normalizeFromNewsAPI);
      } catch (error) {
        console.warn('NewsAPI fetch failed:', error);
        return [];
      }
    })();

    // NewsData Fetch
    const newsdataPromise = (async (): Promise<RawArticle[]> => {
      const NEWSDATA_KEY = process.env.NEWSDATA_KEY ?? 'pub_3f5c16c90b5b40a7a889738d2f365d74';
      if (!NEWSDATA_KEY) return [];

      const params = new URLSearchParams();
      params.set('apikey', NEWSDATA_KEY);
      params.set('q', query);
      if (country === 'bd') params.set('country', 'bd');
      params.set('language', 'en');
      params.set('page', String(page));

      try {
        const url = `https://newsdata.io/api/1/news?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) return [];
        const data = await response.json() as NewsDataResponse;
        
        const articles = (data.results ?? []).map((item: NewsDataArticle) => {
          const normalized = normalizeFromNewsData(item);
          if (country === 'bd') normalized._fetchedWithCountryBD = true;
          return normalized;
        });
        return articles;
      } catch (error) {
        console.warn('NewsData fetch failed:', error);
        return [];
      }
    })();

    // GDELT Fetch
    const gdeltPromise = (async (): Promise<RawArticle[]> => {
      const gdeltQuery = encodeURIComponent(query.replace(/\bOR\b/g, ' '));
      const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${gdeltQuery}&format=json`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) return [];
        const data = await response.json();
        
        // Handle various possible response structures from GDELT
        const candidates = [
          data?.articles,
          data?.results, 
          data?.articles_list,
          data?.article,
          data?.docs,
          data?.feed?.entries,
          data?.feed,
          data
        ];
        
        let articles: any[] = [];
        for (const candidate of candidates) {
          if (Array.isArray(candidate) && candidate.length > 0) { 
            articles = candidate; 
            break; 
          }
        }
        
        if (!articles.length && data && typeof data === 'object') {
          for (const key of Object.keys(data)) {
            const value = (data as any)[key];
            if (Array.isArray(value) && value.length > 0) { 
              articles = value; 
              break; 
            }
          }
        }
        
        return articles.map(normalizeFromGdelt);
      } catch (error) {
        console.warn('GDELT fetch failed:', error);
        return [];
      }
    })();

    const [newsapiArticles, newsdataArticles, gdeltArticles] = await Promise.all([
      newsapiPromise,
      newsdataPromise,
      gdeltPromise
    ]);

    const combined: RawArticle[] = [...newsapiArticles, ...newsdataArticles, ...gdeltArticles];

    // Deduplicate by URL/Title
    const seenUrls = new Set<string>();
    const uniqueArticles: RawArticle[] = [];

    for (const item of combined) {
      const key = (item.url ?? item.title ?? '').trim().toLowerCase();
      if (!key || seenUrls.has(key)) continue;
      
      seenUrls.add(key);
      uniqueArticles.push(item);
    }

    // Fetch Unsplash images for articles missing images
    const articlesWithImages = await Promise.all(
      uniqueArticles.map(async (article): Promise<RawArticle> => {
        if (article.urlToImage) return article;

        const searchTerm = (article.title && article.title.length > 3) 
          ? article.title.substring(0, 120) 
          : query;
        
        const unsplashResult = await fetchUnsplashImageWithAttribution(searchTerm);
        if (unsplashResult) {
          return {
            ...article,
            urlToImage: unsplashResult.url,
            imageAttribution: unsplashResult.attribution,
          };
        }
        
        return article;
      })
    );

    // Score and sort articles
    const scoredArticles: ScoredArticle[] = articlesWithImages.map((article) => ({
      item: article,
      score: scoreArticle(article, country),
    }));

    scoredArticles.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      
      const dateA = a.item.publishedAt ? new Date(a.item.publishedAt).getTime() : 0;
      const dateB = b.item.publishedAt ? new Date(b.item.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

    const sortedArticles = scoredArticles.map((scored) => scored.item);

    // Pagination
    const total = sortedArticles.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedArticles = sortedArticles.slice(start, end);

    // Format final response
    const articles = paginatedArticles.map((article) => ({
      id: makeId(article),
      title: article.title || 'Untitled',
      description: article.description,
      url: article.url || '#',
      source: typeof article.source === 'string' 
        ? article.source 
        : (article.source?.name ?? 'Unknown Source'),
      publishedAt: article.publishedAt,
      urlToImage: article.urlToImage,
      imageAttribution: article.imageAttribution ?? null,
    }));

    const payload = { articles, total };

    setCache(cacheKey, payload, ttl);

    const response = NextResponse.json({ ...payload, cached: false }, { status: 200 });
    response.headers.set('Cache-Control', `public, s-maxage=${Math.max(60, ttl)}, stale-while-revalidate=30`);
    return response;

  } catch (error) {
    console.error('Solar news API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news articles', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}