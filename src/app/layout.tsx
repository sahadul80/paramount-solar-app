import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true,
})

// Core business information for reuse
const companyInfo = {
  name: 'Paramount Solar Ltd',
  description: 'Leading renewable energy company dedicated to harnessing solar power for a sustainable, carbon-neutral future in Bangladesh',
  url: 'https://paramount-solar-app.vercel.app',
  logo: '/images/logo.png',
  phone: '+880 1722 191757',
  email: 'info@paramountsolar.com',
  address: {
    street: 'Road-113/A',
    city: 'Gulshan-2',
    region: 'Dhaka-1212',
    country: 'Bangladesh'
  }
}

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: `${companyInfo.name} - Carbon Neutral Future | Solar Energy Solutions`,
    template: `%s | ${companyInfo.name}`
  },
  description: companyInfo.description,
  keywords: [
    'solar energy Bangladesh',
    'renewable energy solutions',
    'solar power company',
    'solar panel installation',
    'clean energy Bangladesh',
    'sustainable energy',
    'carbon neutral future',
    'solar farm development',
    'commercial solar',
    'residential solar',
    'solar EPC contractor',
    'green energy Bangladesh',
    'solar power plant',
    'renewable energy company',
    'solar energy solutions'
  ].join(', '),

  // Canonical URL
  metadataBase: new URL(companyInfo.url),

  // Authors and Creator
  authors: [{ name: companyInfo.name }],
  creator: companyInfo.name,
  publisher: companyInfo.name,

  // Open Graph Metadata
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: companyInfo.url,
    siteName: companyInfo.name,
    title: `${companyInfo.name} - Carbon Neutral Future`,
    description: companyInfo.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Paramount Solar Ltd - Leading Solar Energy Solutions',
      },
    ],
  },

  // Twitter Card Metadata
  twitter: {
    card: 'summary_large_image',
    title: `${companyInfo.name} - Carbon Neutral Future`,
    description: companyInfo.description,
    creator: '@paramountsolar',
    images: ['/og-image.jpg'],
  },

  // Robots Instructions
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional Important Metadata
  manifest: '/manifest.json',
  
  // Verification (Add your actual verification codes)
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },

  // Alternates and Languages
  alternates: {
    canonical: companyInfo.url,
    languages: {
      'en-BD': companyInfo.url,
    },
  },

  // Category (Business/Energy)
  category: 'energy',

  // App Links
  appLinks: {
    web: {
      url: companyInfo.url,
      should_fallback: true,
    },
  },

  // Other Important Meta Tags
  other: {
    'format-detection': 'telephone=no',
    'dc:creator': companyInfo.name,
    'dc:publisher': companyInfo.name,
    'dc:rights': `Copyright © ${new Date().getFullYear()} ${companyInfo.name}`,
  }
}

// Viewport configuration - MOVED from metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0F766E', // Solar theme color
}

// Structured Data (JSON-LD) for Organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyInfo.name,
  description: companyInfo.description,
  url: companyInfo.url,
  logo: `${companyInfo.url}${companyInfo.logo}`,
  telephone: companyInfo.phone,
  email: companyInfo.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyInfo.address.street,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.region,
    addressCountry: companyInfo.address.country,
  },
  sameAs: [
    'https://www.facebook.com/paramountsolar',
    'https://www.linkedin.com/company/paramountsolar',
    'https://twitter.com/paramountsolar',
    'https://www.instagram.com/paramountsolar',
  ],
  areaServed: 'Bangladesh',
  knowsAbout: [
    'Solar Energy',
    'Renewable Energy Solutions',
    'Solar Power Plants',
    'Energy Efficiency',
    'Sustainable Development'
  ],
  foundingDate: '2017', // Update with actual founding year
  numberOfEmployees: '50-100', // Update with actual range
  owns: {
    '@type': 'Product',
    name: 'Solar Power Solutions',
    description: 'Commercial and residential solar power solutions'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-BD" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (typeof performance !== 'undefined') {
                  const navTiming = performance.getEntriesByType('navigation')[0];
                  if (navTiming) {
                    console.log('Page Load Time:', navTiming.loadEventEnd - navTiming.navigationStart + 'ms');
                  }
                }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}