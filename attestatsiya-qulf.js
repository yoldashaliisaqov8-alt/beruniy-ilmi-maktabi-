/* ATTESTATSIYA sahifasi uchun alohida parol qulfi (zaif himoya: tasodifiy kirishni to'xtatadi).
   PAROLNI O'ZGARTIRISH: parol-yasash.html sahifasida yangi parol yozing, chiqqan HASH ni pastdagi HASH qatoriga qo'ying. */
(function(){
  var HASH='c4843c6c599849ee6ff44c185e43222081e3b9ce8f794f2a6b69149d580da36f';
  var KEY='beruniy_kirish_att_v1',SALT='beruniy-ilmi|';
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  if(get()===HASH)return;
  var st=document.createElement('style');st.id='att-st';
  st.textContent='html{overflow:hidden!important}body{visibility:hidden!important}#att-ov{visibility:visible!important}';
  (document.head||document.documentElement).appendChild(st);
  function sha(s,cb){
    try{
      var enc=new TextEncoder().encode(SALT+s);
      crypto.subtle.digest('SHA-256',enc).then(function(b){
        cb(Array.prototype.map.call(new Uint8Array(b),function(x){return('0'+x.toString(16)).slice(-2)}).join(''));
      },function(){cb(null)});
    }catch(e){cb(null)}
  }
  function build(){
    var ov=document.createElement('div');ov.id='att-ov';
    ov.style.cssText='position:fixed;inset:0;z-index:2147483647;background:linear-gradient(135deg,#eaf2ff,#fff6e8);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Nunito,Arial,sans-serif;visibility:visible';
    ov.innerHTML='<div style="background:#fff;border-radius:24px;box-shadow:0 10px 40px rgba(16,34,61,.18);padding:34px 30px;max-width:380px;width:100%;text-align:center">'
     +'<div style="font-size:42px">🔒</div>'
     +'<h1 style="margin:8px 0 6px;font-size:24px;color:#10223d">Attestatsiya bo\'limi</h1>'
     +'<p style="margin:0 0 18px;color:#5b6b82;font-weight:600">Bu bo\'lim uchun alohida parolni kiriting</p>'
     +'<input id="att-in" type="password" placeholder="Parol" autocomplete="current-password" style="width:100%;box-sizing:border-box;font:inherit;font-weight:700;font-size:18px;padding:13px 16px;border-radius:14px;border:1.5px solid #d5deea;outline:none">'
     +'<div id="att-er" style="color:#d33;font-weight:700;margin-top:10px;min-height:20px"></div>'
     +'<button id="att-bt" style="margin-top:6px;width:100%;font:inherit;font-weight:800;font-size:18px;padding:13px;border:none;border-radius:14px;background:#1a6ee8;color:#fff;cursor:pointer">Kirish</button>'
     +'<p style="margin:16px 0 0;font-size:13px;color:#8a97a8">Parolni olish uchun: t.me/yoldashaliisakov</p></div>';
    document.body.appendChild(ov);
    var inp=document.getElementById('att-in'),er=document.getElementById('att-er');
    ['keydown','keyup','keypress'].forEach(function(t){inp.addEventListener(t,function(e){e.stopPropagation()})});
    function go(){
      var v=inp.value;if(!v){er.textContent='Parolni yozing.';return}
      sha(v,function(h){
        if(h===null){er.textContent="Brauzer qo'llab-quvvatlamaydi. Boshqa brauzerda oching.";return}
        if(h===HASH){set(HASH);ov.remove();var s=document.getElementById('att-st');if(s)s.remove()}
        else{er.textContent="Parol noto'g'ri.";inp.select()}
      });
    }
    document.getElementById('att-bt').onclick=go;
    inp.addEventListener('keydown',function(e){if(e.key==='Enter')go()});
    setTimeout(function(){inp.focus()},50);
  }
  if(document.body)build();else document.addEventListener('DOMContentLoaded',build);
})();
