'use strict';

const staticCache = 'mws-restaurant-cache-v1';
const allCaches = [
    staticCache
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        // Cache resources for offline first
        caches.open(staticCache).then(function(cache) {
            return cache.addAll([
                'index.html',
                'restaurant.html',
                'js/common.js',
                'js/wshelper.js',
                'js/main.js',
                'js/idb/idb.js',
                'js/restaurant_info.js',
                'css/styles.css',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    let requestUrl = new URL(event.request.url);

    if (requestUrl.origin === 'http://localhost:1337') {
        // Store in IDB
    } else {
        // Return matched cache resource
        // otherwise fetch from network and store in cache
        event.respondWith(
            caches.open(staticCache).then(function(cache) {
                return cache.match(event.request).then(function(response) {
                    return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }


});

