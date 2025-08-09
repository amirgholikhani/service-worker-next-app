"use client";

import { useEffect, useState } from "react";

export function useServiceWorker() {
  const [isOnline, setIsOnline] = useState(true);
  const [swStatus, setSwStatus] = useState<string>('');

  useEffect(() => {
    // Track online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set initial status
    setIsOnline(navigator.onLine);

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        // Use different service workers for development vs production
        const isDev = process.env.NODE_ENV === 'development';
        const swPath = isDev ? '/sw-dev.js' : '/service-worker.js';
        
        console.log(`Registering ${isDev ? 'development' : 'production'} service worker:`, swPath);
        
        navigator.serviceWorker
          .register(swPath)
          .then((reg) => {
            console.log(`${isDev ? 'Development' : 'Production'} Service Worker registered successfully:`, reg);
            setSwStatus('Registered');
            
            // Check for updates
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                setSwStatus('Updating...');
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    setSwStatus('Update Available');
                    console.log('New service worker available');
                  } else if (newWorker.state === 'activated') {
                    setSwStatus('Active');
                  }
                });
              }
            });
            
            // Check if already active
            if (reg.active) {
              setSwStatus('Active');
            }

            // Only register custom SW in production
            if (!isDev) {
              return navigator.serviceWorker.register("/sw-custom.js");
            }
          })
          .then((customReg) => {
            if (customReg) {
              console.log("Custom Service Worker registered successfully:", customReg);
            }
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
            setSwStatus('Failed');
          });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, swStatus };
}
