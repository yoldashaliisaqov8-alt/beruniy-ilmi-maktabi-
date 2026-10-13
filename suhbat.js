/* Akademiya suhbat sahifalari uchun umumiy dastur (Huquq, Tarix, Tarbiya) */
(function(){
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  var raw=document.querySelector('script.suhbat-data').textContent;
  var items=[],mavzu='Umumiy',cur=null,field=null,m;
  raw.split('\n').forEach(function(l){
    var t=l.trim();
    if(m=t.match(/^MAVZU:\s*(.+)/i)){mavzu=m[1];cur=null;field=null;}
    else if(m=t.match(/^SAVOL:\s*(.*)/i)){cur={mavzu:mavzu,q:m[1],a:'',m:''};items.push(cur);field='q';}
    else if(cur&&(m=t.match(/^JAVOB:\s*(.*)/i))){cur.a=m[1];field='a';}
    else if(cur&&(m=t.match(/^MANBA:\s*(.*)/i))){cur.m=m[1];field=null;}
    else if(cur&&t&&field){cur[field]+=(cur[field]?'\n':'')+t;}
  });
  var app=document.getElementById('app'), idx=0, showA=false, tmr=null, left=0;
  var term='';

  // ---- Sahifa ----
  app.innerHTML=
   '<div class="field"><input class="txt" id="srch" placeholder="Savol qidirish..." style="flex:1;min-width:200px">'+
   '<button class="btn" id="bBoard">Elektron doskada ochish</button><button class="btn ghost" id="bRand">Tasodifiy savol</button></div>'+
   '<p style="color:var(--ink-soft);font-weight:600;margin:0 0 6px" id="cnt"></p><div id="lst"></div>'+
   '<div class="doska hidden" id="doska"><div class="d-top"><span id="dMav"></span><span class="sp"></span><span id="dNo"></span><span class="d-tm" id="dTm"></span></div>'+
   '<div class="d-q" id="dQ"></div><div id="dA"></div>'+
   '<div class="d-bar"><button class="d-btn" id="dPrev">← Oldingi</button><button class="d-btn main" id="dShow">Javobni ko\'rish</button><button class="d-btn" id="dNext">Keyingi →</button>'+
   '<button class="d-btn" id="dRand">Tasodifiy</button><button class="d-btn" id="dTimer">⏱ Taymer</button><button class="d-btn" id="dFull">To\'liq ekran</button><button class="d-btn" id="dClose">✕ Yopish</button></div></div>';

  function filtered(){return items.map(function(x,i){return {x:x,i:i};}).filter(function(o){return !term||(o.x.q+' '+o.x.a+' '+o.x.mavzu).toLowerCase().indexOf(term)>=0;});}
  function draw(){
    var f=filtered(),box=document.getElementById('lst');box.innerHTML='';
    document.getElementById('cnt').textContent=items.length?(f.length+' ta savol'):'';
    if(!items.length){box.innerHTML='<div class="card" style="padding:30px;text-align:center;font-weight:600;color:var(--ink-soft)">Hozircha savol qo\'shilmagan. Fayl ichidagi izohni o\'qib, savollarni yozing.</div>';return;}
    var last=null;
    f.forEach(function(o,k){
      if(o.x.mavzu!==last){last=o.x.mavzu;var h=document.createElement('div');h.className='mv-head';h.textContent=o.x.mavzu;box.appendChild(h);}
      var d=document.createElement('div');d.className='card qitem';
      d.innerHTML='<div class="n">'+(o.i+1)+'</div><div style="flex:1"><div class="t">'+esc(o.x.q)+'</div><div class="a hidden">'+esc(o.x.a||'(javob kiritilmagan)')+(o.x.m?'<div class="src">Izoh: '+esc(o.x.m)+'</div>':'')+'</div></div><button class="btn ghost" style="padding:8px 14px;font-size:15px">Javob</button><button class="btn" style="padding:8px 14px;font-size:15px">Doskaga</button>';
      var bs=d.querySelectorAll('button');
      bs[0].onclick=function(e){e.stopPropagation();d.querySelector('.a').classList.toggle('hidden');};
      bs[1].onclick=function(e){e.stopPropagation();openBoard(o.i);};
      d.onclick=function(){openBoard(o.i);};
      box.appendChild(d);
    });
  }
  document.getElementById('srch').oninput=function(){term=this.value.trim().toLowerCase();draw();};
  draw();

  // ---- Elektron doska ----
  var dk=document.getElementById('doska');
  function openBoard(i){if(!items.length)return;idx=i;dk.classList.remove('hidden');renderB();}
  function renderB(){
    var q=items[idx];showA=false;
    document.getElementById('dMav').textContent=q.mavzu;
    document.getElementById('dNo').textContent='Savol '+(idx+1)+' / '+items.length;
    document.getElementById('dQ').textContent=q.q;
    document.getElementById('dA').innerHTML='';
    document.getElementById('dShow').textContent='Javobni ko\'rish';
    document.getElementById('dPrev').disabled=idx===0;document.getElementById('dNext').disabled=idx===items.length-1;
    stopT();
  }
  function toggleA(){
    var q=items[idx];showA=!showA;
    document.getElementById('dA').innerHTML=showA?'<div class="d-a'+((q.a||'').length>1200?' xl':(q.a||'').length>500?' long':'')+'">'+esc(q.a||'(javob kiritilmagan)')+(q.m?'<div class="src">Izoh: '+esc(q.m)+'</div>':'')+'</div>':'';
    document.getElementById('dShow').textContent=showA?'Javobni yashirish':'Javobni ko\'rish';
  }
  function go(d){var n=idx+d;if(n>=0&&n<items.length){idx=n;renderB();}}
  function rnd(){if(items.length<2){openBoard(0);return;}var n;do{n=Math.floor(Math.random()*items.length);}while(n===idx&&dk.classList.contains('hidden')===false);idx=n;dk.classList.remove('hidden');renderB();}
  function drawT(){var t=document.getElementById('dTm');t.textContent=Math.floor(left/60)+':'+String(left%60).padStart(2,'0');t.className='d-tm'+(left<=15?' low':'');}
  function stopT(){clearInterval(tmr);tmr=null;document.getElementById('dTm').textContent='';}
  function toggleT(){if(tmr){stopT();return;}left=120;drawT();tmr=setInterval(function(){left--;drawT();if(left<=0)clearInterval(tmr);},1000);}
  function fs(){if(document.fullscreenElement)document.exitFullscreen();else if(dk.requestFullscreen)dk.requestFullscreen();}
  function close(){stopT();dk.classList.add('hidden');if(document.fullscreenElement)document.exitFullscreen();}
  document.getElementById('bBoard').onclick=function(){openBoard(0);};
  document.getElementById('bRand').onclick=rnd;
  document.getElementById('dShow').onclick=toggleA;
  document.getElementById('dPrev').onclick=function(){go(-1);};
  document.getElementById('dNext').onclick=function(){go(1);};
  document.getElementById('dRand').onclick=rnd;
  document.getElementById('dTimer').onclick=toggleT;
  document.getElementById('dFull').onclick=fs;
  document.getElementById('dClose').onclick=close;
  document.addEventListener('keydown',function(e){
    if(dk.classList.contains('hidden')||e.target.tagName==='INPUT')return;
    if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);
    else if(e.key===' '||e.key==='Enter'){e.preventDefault();toggleA();}
    else if(e.key==='Escape')close();
    else if(e.key.toLowerCase()==='r')rnd();else if(e.key.toLowerCase()==='f')fs();else if(e.key.toLowerCase()==='t')toggleT();
  });
})();
