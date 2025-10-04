const staticCacheName = 'site-static-v7'
const assets = [
    '.',
    'index.html',
    'app.js',
    'style.css',
    'icons/icon_192.png'
]

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('Кэширование ресурсов')
            return cache.addAll(assets)
        })
    )
})

self.addEventListener('active', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    )
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})