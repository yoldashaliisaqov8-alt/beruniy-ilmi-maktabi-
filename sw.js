/* Oflayn ishlash uchun xizmat ishchisi. Fayllarni yangilaganingizda VERSION raqamini oshiring. */
var VERSION='beruniy-v69';
var CORE=['./','index.html','stil.css','suhbat.js','baza.js','manifest.webmanifest','rasmlar/icon-192.png','rasmlar/icon-512.png','rasmlar/fon.webp',
 'test.html','test-6.html','test-7.html','test-8.html','test-9.html','test-10.html','test-11.html','huquq-test.html','sertifikat.html','sertifikat-2.html','sertifikat-3.html','sertifikat-4.html','sertifikat-5.html','sertifikat-6.html','sertifikat-xiva.html','sertifikat-qoqon.html','sert-kartasi.js','kirish.js','xlsx.mini.min.js','fanlar.html','istoriya.html','istoriya-6.html','slaydlar.html','videolar.html','oyinlar.html','zakovat.html','zk-savoljavob.html','zk-svoyak.html','zk-breynring.html','zk-erudit.html','zk-darslik.html','zk-darslik-adabiyot.html','zk-darslik-biologiya.html','zk-darslik-fizika.html','zk-darslik-geografiya.html','zk-darslik-huquq.html','zk-darslik-informatika.html','zk-darslik-ingliz-tili.html','zk-darslik-kimyo.html','zk-darslik-astronomiya.html','zk-darslik-chqbt.html','zk-darslik-matematika.html','zk-darslik-ona-tili.html','zk-darslik-tarix.html',
 'olimpiada.html','attestatsiya.html','milliy-sertifikat.html','pedagogik-mahorat.html','akademiya.html','huquq.html','tarbiya.html','tarix-suhbat.html','biletlar.html','bilet-chop.html','kartochkalar.html','qidiruv.html','qollanmalar.html','xronologiya.html'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){});}));}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==VERSION;}).map(function(x){return caches.delete(x);}));}).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);
  if(u.protocol!=='http:'&&u.protocol!=='https:')return;
  // Avval tarmoqdan yangisini olishga urinadi, bo'lmasa xotiradan beradi
  e.respondWith(fetch(r).then(function(res){
    if(res&&(res.ok||res.type==='opaque')){var cp=res.clone();caches.open(VERSION).then(function(c){c.put(r,cp);});}
    return res;
  }).catch(function(){return caches.match(r).then(function(m){return m||caches.match('index.html');});}));
});
