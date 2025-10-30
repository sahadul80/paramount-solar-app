import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paramount Solar Ltd - Carbon Neutral Future',
    short_name: 'Paramount Solar',
    description: 'Leading renewable energy company dedicated to harnessing solar power for a sustainable future',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0F766E',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}