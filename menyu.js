/* Isakov school — pastki menyu (telefonda mahkamlangan) va umumiy profil/reyting sozlamalari */
(function(){
  /* Reyting serveri (Google Apps Script veb-ilova manzili). Bo'sh bo'lsa, reyting faqat shu qurilmada ko'rinadi.
     Qo'llanma: reyting-server.gs faylidagi izohga qarang. */
  window.RANK_URL = window.RANK_URL || '';
  var GR=['C','C+','B','B+','A','A+'];
  window.TM={GR:GR,
    get:function(k,d){try{var v=localStorage.getItem(k);return v==null?d:v}catch(e){return d}},
    set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  if(window.top!==window.self)return;
  var I={
    home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
    book:'<path d="M4 5a2 2 0 0 1 2-2h13v17H6a2 2 0 0 0-2 2V5Z"/><path d="M8 7h7M8 11h5"/>',
    exam:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m9 13 2 2 4-4"/>',
    rank:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'};
  var T=[['index.html','Bosh','home',/(^|\/)(index\.html)?$/],['fanlar.html','Fan','book',/fanlar\.html$/],
    ['milliy-sertifikat.html','Imtihon','exam',/milliy-sertifikat\.html$/],['reyting.html','Reyting','rank',/reyting\.html$/],['profil.html','Profil','user',/profil\.html$/]];
  function go(){
    if(document.getElementById('bnav'))return;
    var st=document.createElement('style');
    st.textContent='#bnav{display:none}@media(max-width:700px){#bnav{position:fixed;left:0;right:0;bottom:0;z-index:45;display:grid;grid-template-columns:repeat(5,1fr);background:#fff;border-top:1px solid #e6ecf2;box-shadow:0 -6px 20px -12px rgba(16,34,61,.3);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}'+
    '#bnav a{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 0;border-radius:14px;text-decoration:none;color:#7b8aa0;font:800 11.5px Nunito,sans-serif}'+
    '#bnav svg{width:25px;height:25px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}'+
    '#bnav a.on{color:#1a6ee8}#bnav a.on svg{stroke-width:2.4}body{padding-bottom:84px;-webkit-text-size-adjust:100%}#bn-chip{padding:9px 14px!important;min-height:40px}a,button,label{-webkit-tap-highlight-color:transparent;touch-action:manipulation}#bnav a{min-height:52px;justify-content:center}.toast{bottom:96px!important}#bn-toasts{z-index:60}}';
    document.head.appendChild(st);
    var n=document.createElement('nav');n.id='bnav';n.setAttribute('aria-label','Asosiy menyu');
    var p=location.pathname,h='';
    T.forEach(function(t){var on=t[3].test(p);h+='<a href="'+t[0]+'"'+(on?' class="on" aria-current="page"':'')+'><svg viewBox="0 0 24 24">'+I[t[2]]+'</svg>'+t[1]+'</a>'});
    n.innerHTML=h;document.body.appendChild(n);
  }
  if(document.body)go();else document.addEventListener('DOMContentLoaded',go);
})();
