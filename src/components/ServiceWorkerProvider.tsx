// src/components/ServiceWorkerProvider.tsx
"use client";

import { useServiceWorker } from "@/hooks/useServiceWorker";

export function ServiceWorkerProvider() {
  const { isOnline, swStatus } = useServiceWorker();
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg text-sm font-medium shadow-lg ${
        isOnline 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
        {swStatus && (
          <div className="text-xs mt-1 opacity-75">
            SW: {swStatus}
          </div>
        )}
      </div>
    </div>
  );
}
