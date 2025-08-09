module.exports = {
  swDest: 'public/service-worker.js',
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
  mode: 'production',
  // Use generateSW for better browser compatibility
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.escuelajs\.co\/api\/v1\/products/,
      handler: 'NetworkOnly',
      options: {
        backgroundSync: {
          name: 'postQueueQueue',
          options: {
            maxRetentionTime: 24 * 60, // 24 hours in minutes
          },
        },
      },
    },
    {
      urlPattern: /\/api\/users/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'users-api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
      },
    },
    {
      urlPattern: /\/api\/products/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'products-api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:css|js|woff|woff2|ttf|eot)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /^https?:\/\/.*$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
  // PWA features
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
};
