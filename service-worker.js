// My Noegenesis — Service Worker
// Caches all pages for offline use and fast loading

const CACHE_NAME = 'noegenesis-v1';

// List every file in your site here
const ASSETS = [
  '/',
  '/index.html',
  '/foreword.html',
  '/authors-notes.html',
  '/introduction.html',
  '/light-as-meaning.html',
  '/how-to-build-your-light.html',
  '/advice.html',
  '/our-heart.html',
  '/the-continuum.html',
  '/imagination.html',
  '/the-pen.html',
  '/greatness.html',
  '/our-mind.html',
  '/truth.html',
  '/reality.html',
  '/thoughts.html',
  '/honour.html',
  '/power.html',
  '/reason.html',
  '/purity.html',
  '/belief.html',
  '/pleasure.html',
  '/understanding.html',
  '/morality.html',
  '/the-unseen.html',
  '/age-vs-evolution.html',
  '/the-conscience.html',
  '/gravitation.html',
  '/the-nature-of-life.html',
  '/reading.html',
  '/delusion.html',
  '/weakness.html',
  '/the-finality.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install: cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        // Cache new pages as they are visited
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => caches.match('/index.html'))
  );
});
