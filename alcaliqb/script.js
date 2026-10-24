
const $=s=>document.querySelector(s),page=document.body.dataset.page;

if(page!=='home'||true){
 const L=[['index','Home'],['about','About'],['gallery','Gallery'],['feedback','Feedback'],['contact','Contact'],['resources','Resources']];
 document.body.insertAdjacentHTML('beforeend',` <div id="nav" class="glass"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16l5 5"/></svg><nav>${L.map(l=>`<a href="${l[0]}.html" class="${l[0]===page?'on':''}">${l[1]}</a>`).join('')}</nav></div>
 <div id="player" class="glass"><div class="ic">♪</div><div class="in"><b id="tn">Neon Grade</b><div class="eq"><i></i><i></i><i></i><i></i></div><div class="ctl"><button id="pv">»</button><button id="pp">▷</button><button id="nx">«</button></div></div></div>`);
}

const T=[{n:'Cascade',s:[220,277,330,415],t:400},{n:'Hyper',s:[261,329,392,523],t:550},{n:'Noir Reel',s:[196,233,294,349],t:700}];
let ti=+sessionStorage.ti||0,ac,tm,i=0,on=false;
const show=()=>$('#tn').textContent=T[ti].n;show();
function step(){const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=T[ti].s[i++%4]*(i%8>4?2:1);
 g.gain.setValueAtTime(.12,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+.6);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+.6)}
function toggle(f){on=f??!on;clearInterval(tm);$('#player').classList.toggle('playing',on);$('#pp').textContent=on?'⏸':'▷';
 if(on){ac=ac||new AudioContext();tm=setInterval(step,T[ti].t)}}
$('#pp').onclick=()=>toggle();
$('#nx').onclick=()=>{ti=(ti+1)%3;sessionStorage.ti=ti;show();toggle(on)};
$('#pv').onclick=()=>{ti=(ti+2)%3;sessionStorage.ti=ti;show();toggle(on)};

if(page==='home'){
 const svg=$('#face');let h='<circle cx="100" cy="100" r="95" fill="rgba(0,0,0,.25)" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>';
 for(let k=0;k<60;k++)h+=`<line x1="100" y1="${k%5?9:14}" x2="100" y2="${k%5?11:6}" stroke="#fff" stroke-width="${k%5?1:3}" transform="rotate(${k*6} 100 100)"/>`;
 svg.innerHTML=h+`<line id="hh" x1="100" y1="100" x2="100" y2="55" stroke="#fff" stroke-width="5" stroke-linecap="round"/><line id="mh" x1="100" y1="100" x2="100" y2="35" stroke="#00e5ff" stroke-width="3.5" stroke-linecap="round"/><line id="sh" x1="100" y1="112" x2="100" y2="25" stroke="#ff2d6f" stroke-width="1.8"/><circle cx="100" cy="100" r="5" fill="#ffb800"/>`;
 const tick=()=>{const d=new Date(),ms=d.getMilliseconds(),s=d.getSeconds()+ms/1000,m=d.getMinutes()+s/60,hr=d.getHours()%12+m/60;
  $('#hh').setAttribute('transform',`rotate(${hr*30} 100 100)`);$('#mh').setAttribute('transform',`rotate(${m*6} 100 100)`);$('#sh').setAttribute('transform',`rotate(${s*6} 100 100)`);
  $('#digital').textContent=d.toLocaleTimeString();$('#date').textContent=d.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});requestAnimationFrame(tick)};tick();
 [['#2f6b3f',500,50,1,70],['#1f8a4c',620,70,2,45],['#0c3b25',720,60,3,28]].forEach(([c,b,a,k,sp],n)=>{
  let p=`M0 800 L0 ${b}`;for(let x=0;x<=2880;x+=40)p+=` L${x} ${b/1.6+a*Math.sin(x/1440*2*Math.PI*k+n)}`;
  $('#hills').insertAdjacentHTML('beforeend',`<svg class="hill" viewBox="0 0 2880 500" preserveAspectRatio="none" style="animation-duration:${sp*3}s;z-index:${n}" data-d="${(n+1)*8}"><path d="${p.replace('L0 800','L0 500')} L2880 500Z" fill="${c}"/></svg>`)});
 for(let k=0;k<7;k++){const c=document.createElement('div');c.className='cloud';const w=90+Math.random()*130;
  c.style.cssText=`width:${w}px;height:${w/3.5}px;top:${5+Math.random()*35}%;animation-duration:${50+Math.random()*60}s;animation-delay:-${Math.random()*90}s`;$('#clouds').appendChild(c)}
 
 let y0=null,dy=0;const H=$('#home');
 $('#knob').addEventListener('pointerdown',e=>{y0=e.clientY;e.target.setPointerCapture(e.pointerId);H.style.transition='none'});
 addEventListener('pointermove',e=>{if(y0===null)return;dy=Math.max(0,y0-e.clientY);H.style.transform=`translateY(${-dy}px)`});
 addEventListener('pointerup',()=>{if(y0===null)return;y0=null;H.style.transition='';if(dy>innerHeight*.25){H.style.transform='translateY(-100%)';setTimeout(()=>location.href='about.html',550)}else H.style.transform='';dy=0});
 $('#knob').addEventListener('click',()=>{if(dy===0){H.style.transform='translateY(-100%)';setTimeout(()=>location.href='about.html',550)}});
}

if(page==='gallery'){
 const P=$('#big'),R=['bri','con','sat','hue','sep'],U=['%','%','%','°','%'];
 const css=()=>{const v=k=>$('#'+k).value;return `brightness(${v('bri')}%) contrast(${v('con')}%) saturate(${v('sat')}%) hue-rotate(${v('hue')}deg) sepia(${v('sep')}%)`};
 const targets=()=>[P,...document.querySelectorAll('.thumbs .photo')];
 const apply=(f=css())=>{targets().forEach(t=>t.style.filter=f);R.forEach((k,i)=>$('#v'+k).textContent=$('#'+k).value+U[i])};
 R.forEach(k=>$('#'+k).addEventListener('input',()=>apply()));
 const preset={reset:[100,100,100,0,0],teal:[105,125,150,-20,15],noir:[90,170,0,0,0],vintage:[108,90,75,0,55],cyber:[110,135,200,70,0]};
 document.querySelectorAll('[data-p]').forEach(b=>b.addEventListener('click',()=>{preset[b.dataset.p].forEach((v,i)=>$('#'+R[i]).value=v);apply()}));
 document.querySelectorAll('.thumbs .photo').forEach(t=>t.addEventListener('click',()=>{P.src=t.src.replace('width=300','width=1000');P.alt=t.alt;document.querySelectorAll('.thumbs .photo').forEach(x=>x.classList.remove('sel'));t.classList.add('sel')}));
 const o=$('#orig');['pointerdown'].forEach(e=>o.addEventListener(e,()=>P.style.filter='none'));['pointerup','pointerleave'].forEach(e=>o.addEventListener(e,()=>apply()));
 document.querySelectorAll('.look').forEach(el=>{const p=preset[el.dataset.look],f=`brightness(${p[0]}%) contrast(${p[1]}%) saturate(${p[2]}%) hue-rotate(${p[3]}deg) sepia(${p[4]}%)`;el.style.filter=f;el.addEventListener('click',()=>{p.forEach((v,i)=>$('#'+R[i]).value=v);apply();$('#lab').scrollIntoView({behavior:'smooth'})})});
 apply();
}

document.querySelectorAll('.stars').forEach(s=>{for(let n=1;n<=5;n++)s.insertAdjacentHTML('beforeend',`<span data-n="${n}">★</span>`);
 const set=n=>s.querySelectorAll('span').forEach(x=>x.classList.toggle('on',+x.dataset.n<=n));
 s.querySelectorAll('span').forEach(x=>{x.onmouseenter=()=>set(+x.dataset.n);x.onclick=()=>{s.dataset.v=x.dataset.n;set(+x.dataset.n)};});s.onmouseleave=()=>set(+(s.dataset.v||0))});
document.querySelectorAll('form').forEach(f=>f.onsubmit=e=>{e.preventDefault();f.innerHTML=`<h2>Thank you, ${f.elements.name.value||'friend'}! </h2><p class="lead">Your message has been sent.</p>`});
