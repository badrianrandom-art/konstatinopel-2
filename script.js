const camera = document.querySelector('#camera');
const hero = document.querySelector('#hero');
const caption = document.querySelector('#caption');
const captionSub = document.querySelector('#captionSub');
const impact = document.querySelector('.impact');
const pauseBtn = document.querySelector('#pause');
const status = document.querySelector('#status');
const stage = document.querySelector('.stage');
const shotLabel = document.querySelector('#shotLabel');
const dialogueMark = document.querySelector('#dialogueMark');
let master, paused = false;

function resetScene(){
  if(master) master.kill();
  gsap.killTweensOf('*');
  gsap.set(camera,{scale:1,x:0,y:0,rotation:0});
  gsap.set(hero,{x:0,y:0,rotation:0,transformOrigin:'50% 88%'});
  gsap.set(['.point-arm','.left-arm','.point-hand','.front-leg','.back-leg'],{rotation:0});
  gsap.set('.eyes',{scaleY:1}); gsap.set('.pupil',{x:0,y:0});
  gsap.set('.mouth',{scaleY:1,scaleX:1}); gsap.set('.brows',{rotation:0});
  gsap.set(['.impact','.dust','.smoke','.shot-label','.dialogue-mark'],{opacity:0});
  gsap.set('.ship',{x:0}); gsap.set('.battle-banner',{rotation:0,transformOrigin:'top center'});
  caption.textContent=''; captionSub.textContent='SEJARAH DALAM ANIMASI';
}
function blink(at){master.to('.eyes',{scaleY:.06,duration:.08,yoyo:true,repeat:1},at)}
function speak(at,duration){
  master.set(dialogueMark,{opacity:1},at)
    .to('.mouth',{scaleY:.55,scaleX:.92,duration:.12,yoyo:true,repeat:Math.max(3,Math.floor(duration/.2)),ease:'sine.inOut'},at)
    .to('.mouth',{scaleY:1,scaleX:1,duration:.14},at+duration)
    .set(dialogueMark,{opacity:0},at+duration+.08);
}
function text(at,title,sub= 'PENGEPUNGAN KONSTANTINOPEL • 1453'){
  master.call(()=>{caption.textContent=title;captionSub.textContent=sub;},null,at);
}
function shot(at,label){master.call(()=>{shotLabel.textContent=label;gsap.to(shotLabel,{opacity:1,duration:.25});},null,at)}
function buildScene(){
 resetScene(); master=gsap.timeline({repeat:0,defaults:{ease:'power2.inOut'}});
 // 1 — The city before the siege
 shot(0,'ESTABLISHING SHOT • 1453');
 master.to(camera,{scale:1.06,x:-5,duration:3},0)
  .to('.cloud-a',{x:75,duration:18,ease:'none'},0).to('.cloud-b',{x:-55,duration:20,ease:'none'},0)
  .to('.ship-a',{x:18,duration:5,ease:'sine.inOut'},0).to('.ship-b',{x:-14,duration:5,ease:'sine.inOut'},0)
  .to(hero,{y:-3,rotation:.5,duration:1,yoyo:true,repeat:3},0)
  .call(()=>gsap.to(shotLabel,{opacity:0,duration:.2}),null,2.8);
 text(0.5,'KONSTANTINOPEL, TAHUN 1453','KOTA BERTEMBOK YANG DIANGGAP MUSTAHIL DITEMBUS');
 text(3.8,'KOTA TERAKHIR KEKAISARAN BIZANTIUM','SELAMA BERABAD-ABAD, TEMBOKNYA MENAHAN SERANGAN');
 speak(3.9,1.25); blink(2.7);
 // 2 — Mehmed II arrives
 shot(6.2,'THE OTTOMAN ARMY');
 master.to(camera,{scale:1.13,x:10,y:-3,duration:1.3},6.2)
  .to('.battle-banner',{rotation:3,duration:.4,yoyo:true,repeat:5},6.4)
  .to(hero,{rotation:-2,y:-5,duration:.35,yoyo:true,repeat:1},7.1)
  .to('.point-arm',{rotation:-13,duration:.35,yoyo:true,repeat:1},7.25)
  .to(camera,{scale:1.04,x:0,y:0,duration:1.2},9.2);
 text(6.3,'MEHMED II TIBA','SULTAN MUDA MEMIMPIN PASUKAN UTSMANIYAH');
 text(9.1,'AMBISI BESAR: MENAKLUKKAN KOTA','ARMADA, MERIAM, DAN PULUHAN RIBU PRAJURIT DIKERAHKAN');
 speak(6.5,1.4); speak(9.2,1.25); blink(8.5);
 // 3 — The siege cannons bombard the walls
 shot(11.8,'THE GREAT BOMBARDMENT');
 master.to(camera,{scale:1.18,x:-8,y:2,duration:.8},11.8)
  .to('.smoke-a',{opacity:.9,scale:2.2,x:-15,y:-28,duration:1.1},12.2)
  .to('.smoke-b',{opacity:.85,scale:2.5,x:20,y:-34,duration:1.2},12.8)
  .to('.smoke-c',{opacity:.9,scale:2.4,y:-38,duration:1.4},13.4)
  .to(camera,{x:5,y:-2,duration:.12,repeat:9,yoyo:true,ease:'none'},12.4)
  .to('.wall-front',{x:5,duration:.16,repeat:5,yoyo:true,ease:'none'},13.1)
  .to('.dust-a',{opacity:.9,scale:2.4,x:70,duration:1.3},13.4)
  .to('.dust-b',{opacity:.8,scale:2.6,x:-55,duration:1.4},13.8)
  .to(camera,{scale:1.08,x:0,y:0,duration:1.3},15.4);
 text(12,'MERIAM-MERIAM RAKSASA DITEMBAKKAN','TEMBAKAN BERULANG MENGHANTAM TEMBOK THEODOSIAN');
 text(15.4,'PERTAHANAN MULAI GOYAH','NAMUN PARA PEMBELA KOTA TERUS BERTAHAN');
 speak(12.1,1.25); speak(15.5,1.1);
 // 4 — The chain across the Golden Horn and the ships hauled over land
 shot(17.8,'THE GOLDEN HORN');
 master.to(camera,{scale:1.1,x:0,y:-5,duration:1},17.8)
  .to('.ship-a',{x:90,y:-5,duration:2.5},18.4)
  .to('.ship-b',{x:-75,y:3,duration:2.8},18.6)
  .to(camera,{scale:1.03,x:0,y:0,duration:1.2},21.2);
 text(18,'ARMADA UTSMANIYAH MENCARI JALAN','KAPAL-KAPAL DIPINDAHKAN MELALUI JALUR DARAT KE TANDUK EMAS');
 text(21.3,'PERTAHANAN BIZANTIUM TERKEJUT','ANCAMAN DATANG DARI ARAH YANG TAK DIDUGA');
 speak(18.1,1.45); speak(21.4,1.1);
 // 5 — Final assault and breach
 shot(23.7,'THE FINAL ASSAULT');
 master.to(camera,{scale:1.2,x:0,y:4,duration:1.1},23.7)
  .to('.smoke-a,.smoke-b,.smoke-c',{opacity:1,scale:3.1,y:-45,duration:1.4,stagger:.18},24)
  .to('.wall-front',{rotation:1.2,x:-7,duration:.2,repeat:7,yoyo:true,ease:'none'},24.6)
  .to('.gate',{filter:'brightness(.45)',duration:.4},25.5)
  .to('.dust-a,.dust-b',{opacity:1,scale:3.2,duration:1.1,stagger:.12},25.8)
  .to(hero,{y:-9,rotation:2,duration:.3,yoyo:true,repeat:3},26.2)
  .to(camera,{scale:1.1,x:0,y:0,duration:1.4},28.1);
 text(24,'29 MEI 1453 — SERANGAN PENENTU','PASUKAN UTSMANIYAH MELANCARKAN SERBUAN BESAR');
 text(27.5,'TEMBOK AKHIRNYA DITEMBUS','PERTEMPURAN SENGIT BERLANGSUNG DI DALAM KOTA');
 speak(24.1,1.3); speak(27.6,1.2);
 // 6 — The city falls; historical closing
 shot(30.2,'A NEW ERA');
 master.to(camera,{scale:1.02,y:0,duration:2},30.2)
  .to('.smoke-a,.smoke-b,.smoke-c',{opacity:.35,duration:2},30.2)
  .to('.battle-banner',{rotation:-2,duration:.8,yoyo:true,repeat:2},30.5)
  .to(hero,{rotation:0,y:0,duration:1},30.2);
 text(30.5,'KONSTANTINOPEL JATUH','SULTAN MEHMED II MEMASUKI KOTA');
 text(33.5,'SEBUAH ERA BERAKHIR, ERA BARU DIMULAI','KOTA INI KELAK DIKENAL SEBAGAI ISTANBUL');
 speak(30.6,1.2); speak(33.6,1.2);
 master.call(()=>gsap.to(shotLabel,{opacity:0,duration:.5}),null,35.5)
  .to(camera,{scale:1,duration:1.5},35.5)
  .to('.vignette',{opacity:1,duration:1},35.5)
  .call(()=>{status.textContent='SCENE COMPLETE';caption.textContent='29 MEI 1453';captionSub.textContent='JATUHNYA KONSTANTINOPEL';pauseBtn.textContent='↻ Replay';},null,37);
 paused=false;pauseBtn.textContent='Ⅱ Pause';status.textContent='SCENE PLAYING';
}
buildScene();
pauseBtn.addEventListener('click',()=>{
 if(!master)return;
 if(status.textContent==='SCENE COMPLETE'){buildScene();return;}
 paused=!paused;
 if(paused){master.pause();pauseBtn.textContent='▶ Play';status.textContent='SCENE PAUSED';}
 else{master.resume();pauseBtn.textContent='Ⅱ Pause';status.textContent='SCENE PLAYING';}
});
document.querySelector('#replay').addEventListener('click',buildScene);
stage.addEventListener('pointermove',e=>{
 if(window.matchMedia('(max-width:650px)').matches||paused)return;
 const r=stage.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
 gsap.to(camera,{x:nx*7,y:ny*4,duration:.8,ease:'power2.out',overwrite:'auto'});
 gsap.to('.pupil-left,.pupil-right',{x:nx*4,y:ny*2,duration:.2,overwrite:'auto'});
});
stage.addEventListener('pointerleave',()=>{if(!paused){gsap.to(camera,{x:0,y:0,duration:.8});gsap.to('.pupil-left,.pupil-right',{x:0,y:0,duration:.3});}});
