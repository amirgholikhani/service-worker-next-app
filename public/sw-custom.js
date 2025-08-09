// Custom service worker functionality
// This runs after the main Workbox service worker

// Handle offline fallback for navigation requests
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  }
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Handle background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'postQueueQueue') {
    event.waitUntil(processBackgroundSync());
  }
});

async function processBackgroundSync() {
  // Process any queued requests
  console.log('Processing background sync...');
} 