const C='chat-v2',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'],X=['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(A);for(const u of X){try{await c.put(u,await fetch(new Request(u,{mode:'no-cors'})))}catch{}}}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
// ملفات التطبيق: الشبكة أولًا ثم النسخة المخزنة. المكتبات والخطوط: المخزّن أولًا. طلبات Supabase لا تُخزَّن أبدًا
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
const put=res=>{const c=res.clone();caches.open(C).then(x=>x.put(r,c));return res};
if(u.origin===location.origin)e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
else if(/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname))e.respondWith(caches.match(r).then(m=>m||fetch(r).then(put)))});
