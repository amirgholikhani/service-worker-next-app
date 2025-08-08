import { precacheAndRoute } from 'workbox-precaching';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly, CacheFirst } from 'workbox-strategies';

precacheAndRoute([{"revision":"d09f95206c3fa0bb9bd9fefabfd0ea71","url":"file.svg"},{"revision":"2aaafa6a49b6563925fe440891e32717","url":"globe.svg"},{"revision":"8e061864f388b47f33a1c3780831193e","url":"next.svg"},{"revision":"1ca9ed21747066a68cb8c314b1811a37","url":"offline.html"},{"revision":"c0af2f507b369b085b35ef4bbe3bcf1e","url":"vercel.svg"},{"revision":"a2760511c65806022ad20adf74370ff3","url":"window.svg"}]);

const bgSyncPlugin = new BackgroundSyncPlugin('postQueueQueue', {
  maxRetentionTime: 24 * 60, // Retry for max 24 hours (in minutes)
});

// Cache API GET requests with NetworkFirst strategy
registerRoute(
  ({ url }) => url.origin === 'https://api.escuelajs.co' && url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [],
  })
);

// Use Background Sync for POST requests to /api/v1/products
registerRoute(
  ({ url, request }) =>
    url.origin === 'https://api.escuelajs.co' &&
    url.pathname === '/api/v1/products' &&
    request.method === 'POST',
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

// Cache images with CacheFirst strategy
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      // Add any expiration plugins here if you want
    ],
  })
);

// Fallback for navigation requests (HTML pages)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'html-cache',
  })
);
