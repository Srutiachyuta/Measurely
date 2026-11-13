// Retire the legacy cache-first worker. HTML, RSC responses and build chunks
// must not survive a deployment in an unversioned browser cache.
self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith("measurely-")).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
// No fetch handler: navigation and API requests use the browser network stack.
