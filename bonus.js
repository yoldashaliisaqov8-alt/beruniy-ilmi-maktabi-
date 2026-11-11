/* Isakov school — bonus tizimi (ball, seriya, daraja, nishon, kunlik topshiriq).
   Hammasi brauzerda (localStorage 'tm_bonus') saqlanadi. */
(function(){
  if(window.Bonus||window.top!==window.self)return;
  var KEY='tm_bonus',DAILY_GOAL=20,DAILY_BONUS=20,DONE_BONUS=10,DAY_CAP=300;
  var LEVELS=[{n:'Yangi',min:0,e:'🌱'},{n:'Bilimdon',min:100,e:'🎓'},{n:'Ekspert',min:500,e:'🏆'},{n:'Ustoz',min:1500,e:'👑'}];
  var BADGES=[
    {id:'b_first',e:'👣',n:'Birinchi qadam',d:'Birinchi savolga javob bering'},
    {id:'b_100',e:'💯',n:'Birinchi 100 savol',d:'100 ta savolga javob bering'},
    {id:'b_500',e:'📚',n:'500 ta savol',d:'500 ta savolga javob bering'},
    {id:'b_q10',e:'✅',n:'10 ta test yakunlandi',d:'10 ta testni oxirigacha yeching'},
    {id:'b_att90',e:'🎯',n:'Attestatsiya 90%+',d:'Attestatsiya variantida 90% va undan yuqori natija'},
    {id:'b_s3',e:'🔥',n:'3 kunlik seriya',d:'3 kun ketma-ket test yeching'},
    {id:'b_s7',e:'🔥',n:'7 kunlik seriya',d:'7 kun ketma-ket test yeching'},
    {id:'b_s30',e:'🌋',n:'30 kunlik seriya',d:'30 kun ketma-ket test yeching'},
    {id:'b_d7',e:'⚡',n:'Kunlik topshiriq ×7',d:'Kunlik topshiriqni 7 marta bajaring'}
  ];
  function pad(n){return String(n).padStart(2,'0');}
  function dk(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
  function today(){return dk(new Date());}
  function fresh(){return {xp:0,total:0,correct:0,quizzes:0,days:{},qseen:{},qday:'',done:{},dailyDays:0,badges:{},ansXp:{},daily:{},dailyDone_:{}};}
  var S;
  function load(){try{S=JSON.parse(localStorage.getItem(KEY));}catch(e){S=null;}
    if(!S||typeof S!=='object')S=fresh();var f=fresh();for(var k in f)if(S[k]==null)S[k]=f[k];}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
  load();
  function level(xp){var L=LEVELS[0],N=null;for(var i=0;i<LEVELS.length;i++){if(xp>=LEVELS[i].min){L=LEVELS[i];N=LEVELS[i+1]||null;}}return {cur:L,next:N};}
  function streak(){var n=0,c=new Date();if(!S.days[dk(c)])c.setDate(c.getDate()-1);
    while(S.days[dk(c)]){n++;c.setDate(c.getDate()-1);}return n;}
  function bestStreak(){var ks=Object.keys(S.days).sort(),b=0,run=0,prev=null;
    ks.forEach(function(k){var d=new Date(k+'T00:00:00');if(prev&&Math.round((d-prev)/864e5)===1)run++;else run=1;if(run>b)b=run;prev=d;});return b;}
  function dayAnswers(){return S.daily[today()]||0;}

  /* ---------- xabarnoma (toast) ---------- */
  var tbox=null,css=false;
  function addCss(){if(css)return;css=true;var st=document.createElement('style');
    st.textContent='#bn-chip{position:fixed;top:10px;right:10px;z-index:40;display:flex;gap:8px;align-items:center;background:#fff;border:1.5px solid #e6ecf2;border-radius:999px;padding:5px 12px;font:800 14px Nunito,sans-serif;color:#10223d;box-shadow:0 6px 18px -10px rgba(16,34,61,.45);text-decoration:none;opacity:.94}'+
    '#bn-chip:hover{border-color:#1a6ee8}#bn-chip i{font-style:normal;color:#5b6b82;font-weight:700}'+
    '#bn-toasts{position:fixed;right:10px;top:54px;z-index:41;display:flex;flex-direction:column;gap:8px;align-items:flex-end;pointer-events:none}'+
    '.bn-t{background:#10223d;color:#fff;border-radius:14px;padding:9px 14px;font:700 14px Nunito,sans-serif;box-shadow:0 10px 24px -12px rgba(0,0,0,.5);animation:bnin .25s ease-out;max-width:80vw}'+
    '.bn-t.big{background:#1a6ee8;font-size:15px}.bn-t.out{opacity:0;transform:translateY(-6px);transition:.35s}'+
    '@keyframes bnin{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}'+
    '@media(max-width:600px){#bn-chip{top:8px;right:8px;padding:4px 10px;font-size:13px}#bn-toasts{top:46px}}';
    document.head.appendChild(st);}
  function toast(msg,big){function go(){addCss();if(!tbox){tbox=document.createElement('div');tbox.id='bn-toasts';document.body.appendChild(tbox);}
      var t=document.createElement('div');t.className='bn-t'+(big?' big':'');t.textContent=msg;tbox.appendChild(t);
      setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove();},400);},big?3600:1500);}
    if(document.body)go();else document.addEventListener('DOMContentLoaded',go);}
  function chip(){if(/yutuqlar\.html$/.test(location.pathname))return;var c=document.getElementById('bn-chip');
    if(!c){addCss();c=document.createElement('a');c.id='bn-chip';c.href='yutuqlar.html';c.title='Mening yutuqlarim';document.body.appendChild(c);}
    var L=level(S.xp).cur;c.innerHTML='<span>'+L.e+' '+S.xp+'</span><span>🔥 '+streak()+'</span>';}

  /* ---------- asosiy amallar ---------- */
  function checkBadges(){var got=[];function give(id){if(!S.badges[id]){S.badges[id]=today();got.push(id);}}
    if(S.total>=1)give('b_first');if(S.total>=100)give('b_100');if(S.total>=500)give('b_500');
    if(S.quizzes>=10)give('b_q10');var st=streak();if(st>=3||bestStreak()>=3)give('b_s3');if(st>=7||bestStreak()>=7)give('b_s7');
    if(st>=30||bestStreak()>=30)give('b_s30');if(S.dailyDays>=7)give('b_d7');
    got.forEach(function(id){var b=BADGES.filter(function(x){return x.id===id;})[0];if(b)toast('🏅 Yangi nishon: '+b.n,true);});}
  function addXp(n,label,big){var before=level(S.xp).cur.n;S.xp+=n;var after=level(S.xp).cur;
    if(label)toast('+'+n+' ⭐ '+label,big);
    if(after.n!==before)toast(after.e+' Yangi daraja: '+after.n+'!',true);}
  function markDay(){S.days[today()]=1;}
  function dailyCheck(){var t=today();if(dayAnswers()>=DAILY_GOAL&&!S.dailyDone_[t]){S.dailyDone_[t]=1;S.dailyDays++;addXp(DAILY_BONUS,'Kunlik topshiriq bajarildi!',true);}}
  if(!S.dailyDone_)S.dailyDone_={};

  function answered(qkey,isCorrect){
    var t=today();if(S.qday!==t){S.qseen={};S.qday=t;}
    if(qkey&&S.qseen[qkey])return;if(qkey)S.qseen[qkey]=1;
    markDay();S.total++;S.daily[t]=(S.daily[t]||0)+1;
    for(var k in S.daily)if(k<dk(new Date(Date.now()-14*864e5)))delete S.daily[k];
    if(isCorrect){S.correct++;var used=S.ansXp[t]||0;if(used<DAY_CAP){S.ansXp[t]=used+1;addXp(1,'to\'g\'ri javob');}}
    dailyCheck();checkBadges();save();chip();}
  function done(score,total,key,isAtt){
    if(!total||total<5)return;var t=today(),k=String(key||location.pathname);
    markDay();
    if(S.done[k]!==t){S.done[k]=t;S.quizzes++;addXp(DONE_BONUS,'test yakunlandi',true);}
    if(isAtt&&score/total>=0.9&&!S.badges.b_att90){S.badges.b_att90=t;toast('🏅 Yangi nishon: Attestatsiya 90%+',true);}
    for(var d in S.done)if(S.done[d]<dk(new Date(Date.now()-3*864e5)))delete S.done[d];
    checkBadges();save();chip();}

  /* ---------- javoblarni avtomatik aniqlash ---------- */
  var OPT='.op,.opt,.option,.choice,.variant';
  var OKC=/(^|\s)(ok|correct|good|right)(\s|$)/,NOC=/(^|\s)(no|wrong|bad)(\s|$)/;
  function norm(s){return String(s||'').replace(/\s+/g,' ').trim().slice(0,160);}
  function qtext(){var sel=['#qtext','.qtext','.qt','#question','.question','.q-text','#qt'];
    for(var i=0;i<sel.length;i++){var e=document.querySelector(sel[i]);if(e&&e.textContent.trim())return norm(e.textContent);}
    return '';}
  function pageKey(){return location.pathname+'|'+norm((document.querySelector('h1,#h')||{}).textContent).slice(0,60)+'|'+(location.search||'')+'|';}
  document.addEventListener('click',function(e){
    var el=e.target&&e.target.closest?e.target.closest(OPT):null;if(!el)return;
    if(OKC.test(el.className)||NOC.test(el.className)||el.disabled)return;
    var txt=norm(el.textContent),q=qtext();if(!txt)return;
    setTimeout(function(){
      var all=document.querySelectorAll(OPT),ok=false,bad=false;
      for(var i=0;i<all.length;i++){if(norm(all[i].textContent)!==txt)continue;
        if(OKC.test(all[i].className))ok=true;else if(NOC.test(all[i].className))bad=true;}
      if(!ok&&!bad)return;
      answered(pageKey()+q,ok);
    },500);
  },true);

  /* ---------- ochiq API ---------- */
  window.Bonus={done:done,get:function(){return S;},level:level,streak:streak,bestStreak:bestStreak,
    LEVELS:LEVELS,BADGES:BADGES,GOAL:DAILY_GOAL,BONUS:DAILY_BONUS,dayAnswers:dayAnswers,today:today,dk:dk,
    reset:function(){S=fresh();S.dailyDone_={};save();chip();},refresh:function(){load();chip();}};
  window.addEventListener('storage',function(e){if(e.key===KEY){load();chip();}});
  function init(){chip();}
  if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();
