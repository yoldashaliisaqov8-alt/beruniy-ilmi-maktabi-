/* Umumiy ma'lumot o'qish: suhbat sahifalari va svoyak to'plamlaridan savollarni yig'adi (fetch orqali) */
window.Baza=(function(){
  var FAN=[{id:'huquq',nom:'Huquqshunoslik',url:'huquq.html'},{id:'tarbiya',nom:'Tarbiya',url:'tarbiya.html'},{id:'tarix',nom:"O'zbekiston tarixi",url:'tarix-suhbat.html'}];
  function get(u){return fetch(u).then(function(r){if(!r.ok)throw new Error(u);return r.text();});}
  function dom(t){return new DOMParser().parseFromString(t,'text/html');}
  function suhbat(f){
    return get(f.url).then(function(t){
      var sc=dom(t).querySelector('script.suhbat-data'),out=[];if(!sc)return out;
      var mavzu='',cur=null,field=null,m;
      sc.textContent.split('\n').forEach(function(l){
        var s=l.trim();
        if(m=s.match(/^MAVZU:\s*(.+)/i)){mavzu=m[1];cur=null;field=null;}
        else if(m=s.match(/^SAVOL:\s*(.*)/i)){cur={fan:f.nom,url:f.url,mavzu:mavzu,q:m[1],a:'',m:''};out.push(cur);field='q';}
        else if(cur&&(m=s.match(/^JAVOB:\s*(.*)/i))){cur.a=m[1];field='a';}
        else if(cur&&(m=s.match(/^MANBA:\s*(.*)/i))){cur.m=m[1];field=null;}
        else if(cur&&s&&field){cur[field]+=(cur[field]?'\n':'')+s;}
      });
      return out;
    });
  }
  function svoyak(url,nom){
    return get(url).then(function(t){
      var d=dom(t),blocks=[].slice.call(d.querySelectorAll('script.set')),out=[];
      if(!blocks.length){var one=d.getElementById('data');if(one)blocks=[one];}
      blocks.forEach(function(sc){
        var th='',cur=null,m;
        sc.textContent.split('\n').forEach(function(l){
          var s=l.trim();if(!s)return;
          if(m=s.match(/^MAVZU:\s*(.+)/i)){th=m[1];cur=null;}
          else if(m=s.match(/^(\d+):\s*(.+)/)){cur={fan:nom,url:url,mavzu:th+' · '+m[1]+' ball',q:m[2],a:'',m:''};out.push(cur);}
          else if(cur&&(m=s.match(/^JAVOB:\s*(.+)/i)))cur.a=m[1];
          else if(cur&&(m=s.match(/^IZOH:\s*(.+)/i)))cur.m=m[1];
          else if(cur&&(m=s.match(/^MANBA:\s*(.+)/i)))cur.m=(cur.m?cur.m+'. ':'')+m[1];
        });
      });
      return out;
    });
  }
  return {FAN:FAN,suhbat:suhbat,svoyak:svoyak,
    hammasi:function(){return Promise.all(FAN.map(suhbat).concat([svoyak('zk-svoyak.html','Svoyak'),svoyak('zk-darslik.html','Svoyak: maktab darsligi')])).then(function(a){return [].concat.apply([],a);});}};
})();
