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
        // Try to register the main service worker first, fallback to dev if it fails
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => {
            console.log("Main Service Worker registered successfully:", reg);
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

            // Register custom service worker
            return navigator.serviceWorker.register("/sw-custom.js");
          })
          .then((customReg) => {
            console.log("Custom Service Worker registered successfully:", customReg);
          })
          .catch((err) => {
            console.log("Main service worker not available, trying development worker:", err);
            
            // Fallback to development service worker
            return navigator.serviceWorker.register("/sw-dev.js");
          })
          .then((devReg) => {
            if (devReg) {
              console.log("Development Service Worker registered successfully:", devReg);
              setSwStatus('Dev Mode');
            }
          })
          .catch((err) => {
            console.error("All service worker registrations failed:", err);
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
