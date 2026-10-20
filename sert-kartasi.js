/* Beruniy ilmi maktabi — o'z sertifikati (A4 vertikal, PDF). Rasmiy davlat hujjati EMAS. */
(function(){
function level(sc,tot){var x=Math.round(sc*45/tot);return x>=40?'A+':x>=35?'A':x>=30?'B+':x>=25?'B':x>=20?'C+':x>=15?'C':null}
window.certLevel=level;
function fit(c,t,x,y,max,font){var s=parseInt(font.match(/(\d+)px/)[1],10);while(s>20){c.font=font.replace(/\d+px/,s+'px');if(c.measureText(t).width<=max)break;s-=2}c.fillText(t,x,y)}
// 8 qirrali yulduz (islomiy naqsh)
function star(c,x,y,r,fill,stroke,lw){c.save();c.translate(x,y);c.beginPath();for(var i=0;i<16;i++){var a=Math.PI*i/8-Math.PI/2,rr=i%2?r*0.62:r;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw||2;c.stroke()}c.restore()}
function logo(c,cx,cy,r){
 c.beginPath();c.arc(cx,cy,r+8,0,7);c.fillStyle='#c9a24a';c.fill();
 c.beginPath();c.arc(cx,cy,r,0,7);c.fillStyle='#1a6ee8';c.fill();
 var s=r*1.5/512;function P(pts,col){c.beginPath();pts.forEach(function(p,i){var X=cx+(p[0]-256)*s,Y=cy+(p[1]-262)*s;i?c.lineTo(X,Y):c.moveTo(X,Y)});c.closePath();c.fillStyle=col;c.fill()}
 P([[256,150],[453,235],[256,321],[60,235]],'#fff');
 P([[130,275],[256,335],[383,275],[383,355],[256,405],[130,355]],'#fff');
 c.fillStyle='#ffc21a';c.fillRect(cx+(430-256)*s,cy+(240-262)*s,13*s,120*s);
}
function pdf(jpegDataUrl,w,h){
 var b=atob(jpegDataUrl.split(',')[1]),img=new Uint8Array(b.length);for(var i=0;i<b.length;i++)img[i]=b.charCodeAt(i);
 var enc=new TextEncoder(),parts=[],off=[],len=0;
 function add(x){var u=typeof x==='string'?enc.encode(x):x;parts.push(u);len+=u.length}
 add('%PDF-1.4\n');
 function obj(n,body){off[n]=len;add(n+' 0 obj\n'+body+'\nendobj\n')}
 obj(1,'<< /Type /Catalog /Pages 2 0 R >>');obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
 obj(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
 off[4]=len;add('4 0 obj\n<< /Type /XObject /Subtype /Image /Width '+w+' /Height '+h+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+img.length+' >>\nstream\n');add(img);add('\nendstream\nendobj\n');
 var cs='q 595.28 0 0 841.89 0 0 cm /Im0 Do Q';obj(5,'<< /Length '+cs.length+' >>\nstream\n'+cs+'\nendstream');
 var xr=len;add('xref\n0 6\n0000000000 65535 f \n');for(var k=1;k<=5;k++)add(('0000000000'+off[k]).slice(-10)+' 00000 n \n');
 add('trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n'+xr+'\n%%EOF');
 var out=new Uint8Array(len),p=0;parts.forEach(function(u){out.set(u,p);p+=u.length});return new Blob([out],{type:'application/pdf'});
}
window.makeCert=function(o){
 var lv=level(o.score,o.total);if(!lv){alert('Sertifikat berish uchun kamida 45 tadan 15 ta (33%) to\'g\'ri javob kerak.');return false}
 var W=1240,H=1754,K=1654/W,cv=document.createElement('canvas');cv.width=1654;cv.height=2339;var c=cv.getContext('2d');c.scale(K,K);
 var g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'#fffaf0');g.addColorStop(1,'#f3ead2');c.fillStyle=g;c.fillRect(0,0,W,H);
 c.globalAlpha=.07;for(var yy=170;yy<H-120;yy+=110)for(var xx=170;xx<W-120;xx+=110)star(c,xx+((yy-170)/110%2?55:0),yy,34,null,'#1a3d7c',2);c.globalAlpha=1;
 c.strokeStyle='#1a3d7c';c.lineWidth=14;c.strokeRect(40,40,W-80,H-80);
 c.fillStyle='#fffaf0';c.fillRect(47,47,W-94,71);c.fillRect(47,H-118,W-94,71);c.fillRect(47,47,71,H-94);c.fillRect(W-118,47,71,H-94);
 var nx=18,ny=26,sx=(W-172)/nx,sy=(H-172)/ny;
 for(var i=0;i<=nx;i++){[86,H-86].forEach(function(y){star(c,86+i*sx,y,27,i%2?'#eadba8':'#fff6dc','#c9a24a',2);c.beginPath();c.arc(86+i*sx,y,5,0,7);c.fillStyle='#1a3d7c';c.fill()})}
 for(var j=1;j<ny;j++){[86,W-86].forEach(function(x){star(c,x,86+j*sy,27,j%2?'#eadba8':'#fff6dc','#c9a24a',2);c.beginPath();c.arc(x,86+j*sy,5,0,7);c.fillStyle='#1a3d7c';c.fill()})}
 [[86,86],[W-86,86],[86,H-86],[W-86,H-86]].forEach(function(p){star(c,p[0],p[1],50,'#1a3d7c','#c9a24a',4);star(c,p[0],p[1],30,'#c9a24a',null);star(c,p[0],p[1],15,'#fff',null)});
 c.strokeStyle='#c9a24a';c.lineWidth=4;c.strokeRect(124,124,W-248,H-248);
 c.strokeStyle='#1a3d7c';c.lineWidth=1.5;c.strokeRect(134,134,W-268,H-268);
 var X=W/2;
 logo(c,X,330,78);
 c.textAlign='center';c.textBaseline='alphabetic';c.fillStyle='#1a3d7c';c.font='bold 44px Georgia,serif';c.fillText('BERUNIY ILMI MAKTABI',X,480);
 c.fillStyle='#8a6d1f';c.font='italic 28px Georgia,serif';c.fillText('Tarix — kelajak ko\'zgusi',X,524);
 c.fillStyle='#1a3d7c';c.font='bold 100px Georgia,serif';c.fillText('SERTIFIKAT',X,680);
 c.strokeStyle='#c9a24a';c.lineWidth=3;c.beginPath();c.moveTo(X-200,720);c.lineTo(X+200,720);c.stroke();star(c,X,720,14,'#c9a24a',null);
 c.fillStyle='#444';c.font='32px Georgia,serif';c.fillText('Ushbu sertifikat egasi',X,800);
 c.fillStyle='#111';fit(c,o.name,X,900,860,'bold 76px Georgia,serif');
 c.strokeStyle='#c9a24a';c.lineWidth=3;c.beginPath();c.moveTo(250,932);c.lineTo(W-250,932);c.stroke();
 c.fillStyle='#444';fit(c,'“'+o.test+'”',X,1010,860,'34px Georgia,serif');c.font='32px Georgia,serif';c.fillText('testini topshirdi',X,1058);
 var pct=Math.round(o.score/o.total*100);
 [['To\'plangan ball',o.score+' / '+o.total],['Foiz',pct+' %'],['Daraja',lv]].forEach(function(k,i){var x=X+(i-1)*310;c.fillStyle='#6b7280';c.font='26px Georgia,serif';c.fillText(k[0],x,1230);c.fillStyle='#1a3d7c';c.font='bold 64px Georgia,serif';c.fillText(k[1],x,1305)});
 var d=new Date(),p=function(n){return(n<10?'0':'')+n},ds=p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear();
 var no='BR-'+String(d.getFullYear()).slice(2)+p(d.getMonth()+1)+p(d.getDate())+'-'+Math.floor(1000+Math.random()*9000);
 c.textAlign='left';c.fillStyle='#333';c.font='bold 28px Georgia,serif';c.fillText('Sana: '+ds,200,1470);c.font='24px Georgia,serif';c.fillText('Raqam: '+no,200,1508);
 c.textAlign='right';c.font='bold 28px Georgia,serif';c.fillText('Yo\'ldashali',W-200,1470);c.strokeStyle='#333';c.lineWidth=2;c.beginPath();c.moveTo(W-480,1438);c.lineTo(W-200,1438);c.stroke();c.font='22px Georgia,serif';c.fillStyle='#666';c.fillText('Muallif, tarix o\'qituvchisi',W-200,1508);
 c.textAlign='center';c.fillStyle='#8a8a8a';c.font='italic 20px Georgia,serif';c.fillText('Beruniy ilmi maktabi demo-testi natijasi. Rasmiy davlat sertifikati emas.',X,1590);
 var blob=pdf(cv.toDataURL('image/jpeg',0.92),cv.width,cv.height);
 var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sertifikat_'+o.name.replace(/\s+/g,'_')+'.pdf';document.body.appendChild(a);a.click();a.remove();
 window._lastCertPNG=cv.toDataURL('image/png');return true;
};})();
