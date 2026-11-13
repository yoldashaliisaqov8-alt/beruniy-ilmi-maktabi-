/* Isakov school — Xatolar daftari (Attestatsiya va Milliy sertifikat testlari uchun).
   Noto'g'ri javob berilgan savollar localStorage 'tm_wrong2' da saqlanadi, to'g'ri takrorlansa o'chadi. */
(function(){
  var K='tm_wrong2',MAX=300;
  function load(){try{return JSON.parse(localStorage.getItem(K)||'{}')||{}}catch(e){return {}}}
  function save(o){try{var ks=Object.keys(o);if(ks.length>MAX){ks.sort(function(a,b){return (o[a].d||0)-(o[b].d||0)}).slice(0,ks.length-MAX).forEach(function(k){delete o[k]})}localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
  function hash(s){var x=5381,i;for(i=0;i<s.length;i++)x=((x<<5)+x+s.charCodeAt(i))|0;return 'x'+(x>>>0).toString(36)}
  function idOf(q){return hash(q.text+'|'+q.opts.slice().sort().join('|'))}
  window.Xato={
    rec:function(src,q,ok){
      if(!q||!q.opts||q.opts.length<2||!(q.ans>=0)||!q.text)return;
      if((q.img&&q.img.length)||q.tbl)return;
      var id=idOf(q),o=load();
      if(ok){if(o[id]){delete o[id];save(o)}}
      else{o[id]={t:q.text,o:q.opts,a:q.ans,i:q.izoh||'',s:src||'',d:Date.now()};save(o)}
    },
    all:load,
    count:function(){return Object.keys(load()).length},
    remove:function(id){var o=load();delete o[id];save(o)},
    clear:function(){try{localStorage.removeItem(K)}catch(e){}},
    badge:function(listEl){ /* test ro'yxati tepasiga karta qo'shadi */
      if(!listEl)return;var n=window.Xato.count(),d=document.createElement('a');d.href='xatolar.html';d.className='card row';d.style.cssText='text-decoration:none;color:inherit;'+(n?'border-color:#f3b5b8':'opacity:.7');
      d.innerHTML='<div>\u274c Xatolar daftari<small>'+(n?'Noto\'g\'ri javob bergan '+n+' ta savolingizni takrorlang':'Hozircha bo\'sh: noto\'g\'ri javoblar shu yerda to\'planadi')+'</small></div><span class="arrow">\u203a</span>';
      listEl.insertBefore(d,listEl.firstChild);
    }
  };
})();
