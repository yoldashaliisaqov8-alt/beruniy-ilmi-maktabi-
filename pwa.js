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
