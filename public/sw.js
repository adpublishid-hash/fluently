const CACHE_VERSION = 'fluently-cache-v7';
const APP_CACHE = `${CACHE_VERSION}-app`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;
const STROKE_CACHE = `${CACHE_VERSION}-strokes`;

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/Logo-fluently.png',
  '/pwa/icon-192.png',
  '/pwa/icon-512.png',
  '/pwa/apple-touch-icon.png',
];

// Lesson pages are lazy chunks; keep enough of them for offline study.
const MAX_STATIC_ITEMS = 450;
const MAX_IMAGE_ITEMS = 140;
const MAX_FONT_ITEMS = 40;
const MAX_STROKE_ITEMS = 600;

function isHttpRequest(request) {
  return request.url.startsWith('http');
}

async function putCache(cacheName, request, response, maxItems) {
  if (!response || (!response.ok && response.type !== 'opaque')) return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());

  if (!maxItems) return;
  const keys = await cache.keys();
  if (keys.length <= maxItems) return;
  await cache.delete(keys[0]);
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || cache.match('/index.html');
  }
}

async function cacheFirst(request, cacheName, maxItems) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  await putCache(cacheName, request, response, maxItems);
  return response;
}

async function staleWhileRevalidate(request, cacheName, maxItems) {
  const cached = await caches.match(request);
  const refresh = fetch(request)
    .then(async (response) => {
      await putCache(cacheName, request, response, maxItems);
      return response;
    })
    .catch(() => null);
  if (cached) return cached;
  return (await refresh) || Response.error();
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.webmanifest') ||
    url.pathname.endsWith('.json')
  );
}

function isImageAsset(url) {
  return (
    url.pathname.startsWith('/pwa/') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.gif') ||
    url.pathname.endsWith('.ico')
  );
}

function isFontAsset(url) {
  return (
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'fonts.googleapis.com' ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.ttf') ||
    url.pathname.endsWith('.otf')
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.registration.navigationPreload ? self.registration.navigationPreload.enable() : Promise.resolve(),
      caches.keys()
        .then((keys) => Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key))
        )),
      self.clients.claim(),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || !isHttpRequest(request)) return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin && url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, APP_CACHE));
    return;
  }

  // Hanzi/Kanji stroke data (immutable per version) for the stroke-order panel.
  if (url.hostname === 'cdn.jsdelivr.net' && url.pathname.includes('/hanzi-writer-data@')) {
    event.respondWith(cacheFirst(request, STROKE_CACHE, MAX_STROKE_ITEMS));
    return;
  }

  if (isFontAsset(url)) {
    event.respondWith(cacheFirst(request, FONT_CACHE, MAX_FONT_ITEMS));
    return;
  }

  if (sameOrigin && isImageAsset(url)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, MAX_IMAGE_ITEMS));
    return;
  }

  if (sameOrigin && isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE, MAX_STATIC_ITEMS));
  }
});
