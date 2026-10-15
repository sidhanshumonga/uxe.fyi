import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'uxe.fyi',
    short_name: 'uxe.fyi',
    description: 'The open-source home for UX Engineering.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B0A',
    theme_color: '#0B0B0A',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
