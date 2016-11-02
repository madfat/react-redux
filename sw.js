let apps = 'pluralsight-redux-starter';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(apps).then(cache => {
      return cache.addAll([
        '/',
        '/bundle.js',
        '/src/index.html'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  debugger;
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});