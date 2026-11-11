/* Sayt logotipi: Yo'ldashali rasmi (keshni aylanib o'tish uchun yangi nom) */
(function(){var f='rasmlar/yoldashali-192.png?v=2';function s(){var h=document.head;if(!h)return;var ls=h.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"],link[rel="shortcut icon"]');if(!ls.length){var l=document.createElement('link');l.rel='icon';l.href=f;h.appendChild(l);var a=document.createElement('link');a.rel='apple-touch-icon';a.href=f;h.appendChild(a);return}[].forEach.call(ls,function(l){l.setAttribute('href',f)})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',s);else s();s()})();
/* Telefonga o'rnatish (PWA) va oflayn ishlash */
(function(){
  if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
    window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});
  }
  var ev=null;
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();ev=e;var b=document.getElementById('installBtn');if(b)b.classList.remove('hidden');});
  window.addEventListener('appinstalled',function(){var b=document.getElementById('installBtn');if(b)b.classList.add('hidden');});
  window.addEventListener('DOMContentLoaded',function(){var b=document.getElementById('installBtn');if(b&&(window.matchMedia('(display-mode: standalone)').matches||navigator.standalone))b.classList.add('hidden');});
  window.installApp=function(){
    if(ev){ev.prompt();ev=null;return;}
    var ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
    alert(ios?"iPhone'da: Safari'dagi \"Ulashish\" tugmasini bosing, so'ng \"Bosh ekranga qo'shish\" ni tanlang."
             :"Brauzer menyusidagi (uchta nuqta) \"Ilovani o'rnatish\" yoki \"Bosh ekranga qo'shish\" bandini tanlang.");
  };
})();
