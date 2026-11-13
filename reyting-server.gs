/* Isakov school — reyting serveri (Google Apps Script).
   O'RNATISH (5 daqiqa):
   1) script.new saytini oching (Google hisobingiz bilan) -> bu kodni to'liq joylang.
   2) Yuqorida "Deploy" -> "New deployment" -> turi "Web app".
      Execute as: Me.  Who has access: Anyone. -> Deploy -> ruxsat bering.
   3) Chiqqan "Web app URL" ni menyu.js ichidagi  window.RANK_URL = '';  ga qo'ying (qo'shtirnoq orasiga).
   Ma'lumot sizning Google Drive'ingizdagi "Reyting" jadvalida saqlanadi. */
function sheet_(){
  var p=PropertiesService.getScriptProperties(),id=p.getProperty('sid'),ss;
  if(id){ss=SpreadsheetApp.openById(id)}else{ss=SpreadsheetApp.create('Reyting');p.setProperty('sid',ss.getId());ss.getSheets()[0].appendRow(['id','ism','xp','vaqt'])}
  return ss.getSheets()[0];
}
function doGet(e){
  var a=e.parameter.a,sh=sheet_(),out;
  if(a==='set'){
    var id=String(e.parameter.id||'').slice(0,40),n=String(e.parameter.n||'').replace(/[<>]/g,'').slice(0,24).trim(),xp=Math.max(0,Math.min(1e6,parseInt(e.parameter.xp,10)||0));
    if(id&&n){var d=sh.getDataRange().getValues(),f=-1;for(var i=1;i<d.length;i++)if(d[i][0]===id){f=i+1;break}
      if(f>0){sh.getRange(f,2,1,3).setValues([[n,xp,new Date()]])}else sh.appendRow([id,n,xp,new Date()])}
    out={ok:1};
  }else{
    var r=sh.getDataRange().getValues().slice(1).map(function(x){return {id:x[0],n:x[1],xp:x[2]}});
    r.sort(function(a,b){return b.xp-a.xp});out={top:r.slice(0,50)};
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
