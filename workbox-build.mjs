import { injectManifest } from 'workbox-build';

async function buildSW() {
  try {
    const { count, size, warnings } = await injectManifest({
      swSrc: 'src/sw.js',     // Your custom SW source
      swDest: 'public/sw.js', // Output SW file for deployment
      globDirectory: 'public',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB max
    });

    warnings.forEach(console.warn);
    console.log(`Injected precache manifest into SW, ${count} files, total ${size} bytes.`);
  } catch (error) {
    console.error('Service Worker build failed:', error);
  }
}

buildSW();
