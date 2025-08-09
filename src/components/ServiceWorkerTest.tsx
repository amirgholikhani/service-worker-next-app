"use client";

import { useState, useEffect } from 'react';

interface ServiceWorkerRegistration {
  scope: string;
  active: ServiceWorker | null;
  installing: ServiceWorker | null;
  waiting: ServiceWorker | null;
}

interface CacheInfo {
  name: string;
  keys: number;
}

export function ServiceWorkerTest() {
  const [swInfo, setSwInfo] = useState<readonly ServiceWorkerRegistration[] | null>(null);
  const [cacheInfo, setCacheInfo] = useState<CacheInfo[] | null>(null);

  useEffect(() => {
    // Get service worker information
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        setSwInfo(registrations);
      });
    }

    // Get cache information
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames.map(async (name) => {
            const cache = await caches.open(name);
            const keys = await cache.keys();
            return { name, keys: keys.length };
          })
        ).then(setCacheInfo);
      });
    }
  }, []);

  const testOffline = async () => {
    try {
      const response = await fetch('/api/test');
      console.log('Online fetch result:', response);
    } catch (error) {
      console.log('Fetch failed (expected when offline):', error);
    }
  };

  const clearCaches = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      window.location.reload();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Service Worker Test</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Service Worker Status</h3>
          <div className="bg-gray-100 p-3 rounded">
            {swInfo ? (
              <pre className="text-sm overflow-auto">
                {JSON.stringify(swInfo, null, 2)}
              </pre>
            ) : (
              <p>Loading service worker info...</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Cache Information</h3>
          <div className="bg-gray-100 p-3 rounded">
            {cacheInfo ? (
              <pre className="text-sm overflow-auto">
                {JSON.stringify(cacheInfo, null, 2)}
              </pre>
            ) : (
              <p>Loading cache info...</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={testOffline}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Fetch
          </button>
          
          <button
            onClick={clearCaches}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All Caches
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <p><strong>Instructions:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Open browser dev tools → Application → Service Workers</li>
            <li>Check the console for service worker logs</li>
            <li>Try going offline (Network tab → Offline)</li>
            <li>Test the &quot;Test Fetch&quot; button when offline</li>
            <li>Use &quot;Clear All Caches&quot; to reset everything</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 