// src/components/ServiceWorkerProvider.tsx
"use client";

import { useServiceWorker } from "@/hooks/useServiceWorker";

export function ServiceWorkerProvider() {
  useServiceWorker();
  return null; // nothing visual
}
