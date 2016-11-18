var staticCacheName = 'transit-static-v1';

self.addEventListener('install', function(event) {
	self.addEventListener('install', function (event) {
  event.waitUntil(
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(
            [
              '/',
              '/bundle.js'
            ]
        );
      })
    );
  });
});