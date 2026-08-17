const CACHE_NAME = 'ruigong-diary-v1';
const assetsToCache = [
  './index_3.html',
  './manifest.json',
  './image/flower1.jpg',
  './image/flower2.jpg',
  './image/flower3.jpg',
  './image/flower4.jpg',
  './image/flower5.jpg',
  './image/flower6.jpg',
  './image/flower7.jpg',
  './image/flower8.jpg',
  './image/flower9.jpg',
  './image/flower10.jpg',
  './image/flower11.jpg'
];

// 安装阶段：缓存核心静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 抓取阶段：优先从缓存读取，无网络时也能正常运行
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request).catch(() => {
          // 如果离线且请求的是主页面，可返回缓存的主页面
          if (event.request.mode === 'navigate') {
            return caches.match('./index_3.html');
          }
        });
      })
  );
});