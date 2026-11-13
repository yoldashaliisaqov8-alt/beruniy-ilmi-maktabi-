/* Isakov school — natijani Telegramga ulashish (matn va rasm) */
(function(){
  var SITE='https://yoldashaliisaqov8-alt.github.io/beruniy-ilmi-maktabi-/',CH='@yoldashaliisakov';
  function today(){try{var B=window.Bonus&&Bonus.get(),t=Bonus.today();return B&&B.ansXp&&B.ansXp[t]||0}catch(e){return 0}}
  function streak(){try{return window.Bonus?Bonus.streak():0}catch(e){return 0}}
  function parts(c){var n=today(),s=streak(),a=[];
    if(n>0)a.push('Bugun '+n+' ta to\'g\'ri javob');
    if(s>0)a.push(s+' kunlik seriya 🔥');
    return {n:n,s:s,line:a.join(', '),res:(c&&c.total)?(c.score+'/'+c.total+(c.title?' — '+c.title:'')):''}}
  function text(c){var p=parts(c),t=[];
    if(p.line)t.push(p.line);
    if(p.res)t.push('Natija: '+p.res);
    if(!t.length)t.push('Men Isakov school saytida tarix testlarini yechyapman');
    t.push('📚 Isakov school — tarix testlari');
    return t.join('\n')}
  function tg(c){var u='https://t.me/share/url?url='+encodeURIComponent(SITE)+'&text='+encodeURIComponent(text(c));
    var w=null;try{w=window.open(u,'_blank')}catch(e){}if(!w)location.href=u}
  function card(c,cb){
    var p=parts(c),W=1080,H=1080,cv=document.createElement('canvas');cv.width=W;cv.height=H;var x=cv.getContext('2d');
    var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1f2fa0');g.addColorStop(1,'#5a3fc9');x.fillStyle=g;x.fillRect(0,0,W,H);
    x.fillStyle='rgba(255,255,255,.08)';x.beginPath();x.arc(W-120,160,260,0,7);x.fill();x.beginPath();x.arc(100,H-100,300,0,7);x.fill();
    var F='Nunito, system-ui, -apple-system, Segoe UI, sans-serif';x.textAlign='center';
    x.fillStyle='#fff';x.font='800 64px '+F;x.fillText('ISAKOV SCHOOL',W/2,170);
    x.fillStyle='rgba(255,255,255,.75)';x.font='700 38px '+F;x.fillText('Tarix — kelajak ko\'zgusi',W/2,230);
    var y=430;
    if(p.res){x.fillStyle='#ffcf6b';x.font='800 190px '+F;x.fillText(c.score+'/'+c.total,W/2,y+70);x.fillStyle='#fff';x.font='700 44px '+F;
      wrap(x,c.title||'Natija',W/2,y+150,W-200,54);y+=260}
    else if(p.n>0){x.fillStyle='#ffcf6b';x.font='800 210px '+F;x.fillText(String(p.n),W/2,y+80);x.fillStyle='#fff';x.font='800 56px '+F;x.fillText('ta to\'g\'ri javob bugun',W/2,y+170);y+=260}
    if(p.s>0){x.fillStyle='rgba(255,255,255,.16)';rr(x,W/2-250,y+30,500,120,60);x.fill();x.fillStyle='#fff';x.font='800 58px '+F;x.fillText('🔥 '+p.s+' kunlik seriya',W/2,y+108)}
    else if(p.res&&p.n>0){x.fillStyle='#fff';x.font='700 46px '+F;x.fillText('Bugun '+p.n+' ta to\'g\'ri javob',W/2,y+90)}
    x.fillStyle='rgba(255,255,255,.85)';x.font='700 40px '+F;x.fillText(CH,W/2,H-110);
    x.fillStyle='rgba(255,255,255,.6)';x.font='600 30px '+F;x.fillText('yoldashaliisaqov8-alt.github.io/beruniy-ilmi-maktabi-',W/2,H-60);
    cv.toBlob(function(b){cb(b)},'image/png')}
  function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
  function wrap(x,t,cx,y,mw,lh){var w=String(t).split(' '),l='',n=0;for(var i=0;i<w.length;i++){var s=l?l+' '+w[i]:w[i];if(x.measureText(s).width>mw&&l){x.fillText(l,cx,y+n*lh);l=w[i];n++;if(n>=2){l=l+'…';break}}else l=s}x.fillText(l,cx,y+n*lh)}
  function img(c){card(c,function(b){if(!b)return;var f=null;try{f=new File([b],'natija.png',{type:'image/png'})}catch(e){}
    if(f&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:text(c)}).catch(function(){})}
    else{var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='isakov-school-natija.png';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},4000)}})}
  var css=false;
  function addCss(){if(css)return;css=true;var s=document.createElement('style');
    s.textContent='.ulash{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 0;width:100%}.ulash button{font:800 16px Nunito,sans-serif;padding:13px 18px;min-height:48px;border-radius:16px;border:none;cursor:pointer;flex:1 1 180px}.ulash .u1{background:#229ed9;color:#fff}.ulash .u2{background:#fff;color:#10223d;border:1.5px solid #e6ecf2}.ulash .u1:active{background:#1b86b8}';
    document.head.appendChild(s)}
  window.Ulash={text:text,telegram:tg,image:img,
    add:function(parent,c){if(!parent)return;addCss();var o=parent.parentNode&&parent.parentNode.querySelector('.ulash');if(o)o.remove();
      var d=document.createElement('div');d.className='ulash';d.innerHTML='<button type="button" class="u1">✈️ Telegramga ulashish</button><button type="button" class="u2">🖼 Rasm sifatida</button>';
      d.querySelector('.u1').onclick=function(){tg(c)};d.querySelector('.u2').onclick=function(){img(c)};
      parent.insertAdjacentElement('afterend',d)}};
})();
