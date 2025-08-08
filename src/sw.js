import { precacheAndRoute } from 'workbox-precaching';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly, CacheFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

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
