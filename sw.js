const CACHE_NAME='blue-reading-journal-shell-v188-free-layout';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>name.startsWith('blue-reading-journal-shell-')&&name!==CACHE_NAME).map(name=>caches.delete(name)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
if(request.mode==='navigate'){event.respondWith(fetch(request).then(response=>{const c=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,c)).catch(()=>{});return response}).catch(async()=>await caches.match(request)||await caches.match('./index.html')));return}
event.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(response=>{if(response.ok){const clone=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,clone)).catch(()=>{})}return response})))});
