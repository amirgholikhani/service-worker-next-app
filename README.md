# Service Worker Next.js App

A Next.js application with a comprehensive service worker implementation using Workbox for offline functionality, background sync, and PWA features.

## Features

- **Offline Support**: App works offline with cached resources
- **Background Sync**: Queues POST requests when offline
- **Smart Caching**: Different caching strategies for different resource types
- **PWA Ready**: Installable as a Progressive Web App
- **Real-time Status**: Visual indicators for online/offline status and service worker state

## Service Worker Capabilities

### Caching Strategies

- **API Routes**: StaleWhileRevalidate for `/api/users` and `/api/products`
- **Images**: CacheFirst with 30-day expiration
- **Static Assets**: StaleWhileRevalidate for CSS, JS, and fonts
- **Navigation**: NetworkFirst for HTML pages
- **Background Sync**: For POST requests to external APIs

### Offline Fallback

- Custom offline page with retry functionality
- Automatic reconnection detection
- Graceful degradation when offline

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Build Process

The build process automatically:
1. Builds the Next.js application
2. Generates the service worker with Workbox
3. Injects the precache manifest
4. Optimizes caching strategies

## Service Worker Registration

The service worker is automatically registered when the app loads and provides:
- Real-time online/offline status
- Service worker state monitoring
- Update notifications
- Background sync capabilities

## PWA Features

- Web app manifest for installation
- Theme color integration
- Offline-first architecture
- Background sync for data persistence

## Configuration

### Workbox Config (`workbox-config.js`)
- Precache patterns for static assets
- Service worker source and destination
- File size limits and optimization settings

### Service Worker Source (`src/sw-src.js`)
- Caching strategies
- Background sync configuration
- Offline fallback handling

## Browser Support

- Modern browsers with Service Worker support
- Progressive enhancement for older browsers
- Graceful fallback when service worker is unavailable

## Troubleshooting

- Check browser console for service worker registration status
- Verify offline.html is accessible
- Ensure HTTPS in production (required for service workers)
- Check browser developer tools > Application > Service Workers

## License

MIT
