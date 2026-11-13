/* Isakov school — shrift o'lchami tanlovi (Oddiy / Katta / Juda katta). Tanlov 'tm_fs' da saqlanadi. */
(function(){
  var Z=[1,1.15,1.3],N=['Oddiy','Katta','Juda katta'];
  function get(){var v=0;try{v=+localStorage.getItem('tm_fs')||0}catch(e){}return v>=0&&v<3?v:0}
  function apply(v){document.documentElement.setAttribute('data-fs',v)}
  apply(get());
  var st=document.createElement('style');
  st.textContent=Z.map(function(z,i){return i?'html[data-fs="'+i+'"] body>*:not(#bnav):not(#bn-chip):not(#bn-toasts):not(.toast):not(script):not(style){zoom:'+z+'}':''}).join('\n')+
    '\n@media(max-width:420px){html[data-fs="1"] body>*:not(#bnav):not(#bn-chip):not(#bn-toasts):not(.toast):not(script):not(style){zoom:1.1}html[data-fs="2"] body>*:not(#bnav):not(#bn-chip):not(#bn-toasts):not(.toast):not(script):not(style){zoom:1.18}}'+
    '\nhtml[data-fs="1"],html[data-fs="2"]{overflow-x:hidden}'+
    '\n.top{flex-wrap:nowrap}.top .brand{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fsbtn{width:46px;height:46px;border-radius:50%;background:#fff;border:1px solid #e6ecf2;display:flex;align-items:center;justify-content:center;font:800 17px Nunito,sans-serif;color:#10223d;cursor:pointer;margin-left:auto;margin-right:96px;flex:0 0 46px;padding:0}';
  (document.head||document.documentElement).appendChild(st);
  window.FS={get:get,names:N,set:function(v){v=Math.max(0,Math.min(2,v|0));try{localStorage.setItem('tm_fs',v)}catch(e){}apply(v);[].forEach.call(document.querySelectorAll('.fsbtn'),function(b){b.title='Shrift: '+N[v]})}};
  function btn(){var top=document.querySelector('.top');if(!top||top.querySelector('.fsbtn'))return;
    var b=document.createElement('button');b.type='button';b.className='fsbtn';b.setAttribute('aria-label','Shrift o\'lchami');b.title='Shrift: '+N[get()];b.innerHTML='A<span style="font-size:12px">A</span>';
    b.onclick=function(){FS.set((get()+1)%3)};top.appendChild(b)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',btn);else btn();
})();
