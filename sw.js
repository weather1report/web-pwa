const staticCacheName = 'site-static-v6'
const assets = [
    '.',
    'index.html',
    'app.js',
    'icons/icon_192.png',
    'icons/icon_512.png',
    'icons/apple-touch-icon_180.png',
    'icons/apple-touch-icon_120.png',
    'style.css'
]

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('Кэширование ресурсов')
            cache.addAll(assets)
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