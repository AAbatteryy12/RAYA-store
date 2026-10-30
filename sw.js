/* Raya Store service worker: receives push notifications even when the app is closed */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{};}catch(_){d={title:'Raya Store',body:e.data?e.data.text():''};}
  const title=d.title||'Raya Store';
  e.waitUntil(self.registration.showNotification(title,{body:d.body||'',tag:d.tag||'raya',renotify:true,icon:'og-cover.jpg',badge:'og-cover.jpg',vibrate:[200,100,200],data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){if(c.url.startsWith(self.registration.scope)&&'focus' in c){c.postMessage({open:(e.notification.data&&e.notification.data.open)||''});return c.focus();}}
    return self.clients.openWindow(url);
  }));
});
