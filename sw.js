const CACHE_NAME = 'checklist-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://i.ibb.co/27cxGcb1/lacustomlogotipo.png'
];

// Instala o Service Worker e guarda os arquivos essenciais no cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativa e limpa caches antigos se houver atualização
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Tenta buscar na rede; se falhar (offline), busca no cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});