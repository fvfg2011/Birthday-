const CONFIG = {
  name: "Ириша",

  introLine1: "Сегодня лучший день",
  introLine2: "Твоё день рождения!",

  mainText:
`Желаю чтобы этот год стал для тебя самым лучшим 🤍

Я хочу, чтобы ты знала что рядом с тобой становится теплее,
а каждый день немного счастливее)`,

  envelopeLead: "Для тебя есть ещё кое что)",
  envelopeHint: "Нажми на конверт))",

  letterText:
`Любимая, с днём рождения🤍

Спасибо, что ты у меня есть, без тебя мне бы не было так хорошо как сейчас
. Спасибо за каждый день проведённый с тобой,
и за то что рядом с тобой мне очень хорошо и комфортно)

Пусть в этом году сбудуться все твои желания(и папа отключит род контроль).
И запомни что я всегда есть и буду рядом🤍🤍`,
  letterSign: "с любовью))",
  letterButton: "У меня есть ещё кое-что)",

  photosTitle: "Немного моментов)",
  photos: [
    { src: "./photos/Photo1.jpg", caption: "День когда мы впервые поцеловались, и было это на мосту влюблённых)" },
    { src: "./photos/Photo2.jpg", caption: "Моё любимое фото, хоть тебя и нету на нём, но ты была рядом в тот момент)" },
    { src: "./photos/Photo3.jpg", caption: "Моё любимое фото тебя🤍" }
  ],
  photosButton: "Дальше",

  finalLine1: "Спасибо, что ты есть",
  finalLine2Prefix: "С днём рождения, "
};

const $ = id => document.getElementById(id);

(function initParticles(){
  const wrap = $('particles');
  const count = window.innerWidth < 500 ? 16 : 26;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className='p';
    const size = 2 + Math.random()*4;
    p.style.width = p.style.height = size+'px';
    p.style.left = Math.random()*100+'vw';
    p.style.bottom = '-5vh';
    p.style.animationDuration = (8+Math.random()*10)+'s';
    p.style.animationDelay = (Math.random()*10)+'s';
    wrap.appendChild(p);
  }
})();

function showStage(id){
  document.querySelectorAll('.stage').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active');
}

$('line1').textContent = CONFIG.introLine1;
$('line2').textContent = CONFIG.introLine2;
setTimeout(()=>$('line1').classList.add('show'), 300);
setTimeout(()=>$('line1').classList.remove('show'), 2400);
setTimeout(()=>$('line2').classList.add('show'), 3000);
setTimeout(()=>showStage('stage-main'), 5200);

$('mainName').textContent = CONFIG.name;
$('mainText').textContent = CONFIG.mainText;
$('btnMainContinue').addEventListener('click', ()=>{
  const stage = $('stage-main');
  stage.classList.add('leaving');
  setTimeout(()=>{
    stage.classList.remove('active');
    showStage('stage-envelope');
    setTimeout(()=>$('envWrap').classList.add('rise'), 150);
  }, 950);
});

$('envLead').textContent = CONFIG.envelopeLead;
$('envHint').textContent = CONFIG.envelopeHint;
$('envName').textContent = CONFIG.name;
$('envSealLetter').textContent = CONFIG.name.trim().charAt(0).toUpperCase();

(function initStars(){
  const field = $('envStars');
  const n = window.innerWidth < 500 ? 40 : 60;
  for(let i=0;i<n;i++){
    const s = document.createElement('div');
    s.className='star';
    const size = 1 + Math.random()*2;
    s.style.width = s.style.height = size+'px';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*100+'%';
    s.style.animationDuration = (2+Math.random()*3)+'s';
    s.style.animationDelay = (Math.random()*3)+'s';
    field.appendChild(s);
  }
})();

let envOpened = false;
$('envelope').addEventListener('click', function(){
  if(envOpened) return;
  envOpened = true;

  $('envSeal').classList.add('breaking');
  const wrap = this;
  const rect = wrap.getBoundingClientRect();
  for(let i=0;i<10;i++){
    const p = document.createElement('div');
    p.className='petal';
    const angle = Math.random()*Math.PI*2;
    const dist = 40+Math.random()*50;
    p.style.setProperty('--dx', Math.cos(angle)*dist+'px');
    p.style.setProperty('--dy', Math.sin(angle)*dist+'px');
    p.style.animationDelay = (Math.random()*0.15)+'s';
    wrap.appendChild(p);
  }

  setTimeout(()=>{
    showStage('stage-letter');
    setTimeout(()=>{
      $('letterCard').classList.add('show');
      spawnHearts();
    }, 200);
  }, 900);
});

$('letterText').textContent = CONFIG.letterText;
$('letterSign').textContent = CONFIG.letterSign;
$('btnLetterContinue').textContent = CONFIG.letterButton;
$('btnLetterContinue').addEventListener('click', ()=>{
  showStage('stage-photos');
  buildPhotos();
});

$('photosTitle').textContent = CONFIG.photosTitle;
$('btnPhotosContinue').textContent = CONFIG.photosButton;
let photosBuilt = false;
function buildPhotos(){
  if(photosBuilt) return;
  photosBuilt = true;
  const list = $('photoList');
  CONFIG.photos.forEach((ph,i)=>{
    const item = document.createElement('div');
    item.className='photo-item';
    const imgHtml = ph.src
      ? `<img src="${ph.src}" alt="${ph.caption||''}">`
      : `<div style="width:100%;aspect-ratio:4/3;border-radius:10px;background:linear-gradient(160deg,var(--blush),var(--gold));display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--plum);box-shadow:0 14px 34px rgba(0,0,0,.4);">фото ${i+1}</div>`;
    item.innerHTML = imgHtml + (ph.caption?`<div class="cap">${ph.caption}</div>`:'');
    list.appendChild(item);
    setTimeout(()=>item.classList.add('show'), 400 + i*450);
  });
}
$('btnPhotosContinue').addEventListener('click', ()=>{
  showStage('stage-final');
  $('finalLine1').textContent = CONFIG.finalLine1;
  $('finalLine2').textContent = CONFIG.finalLine2Prefix + CONFIG.name;
  spawnFinalSparkles();
  setTimeout(()=>{
    showStage('stage-galaxy');
    startGalaxy();
  }, 4500);
});

function spawnFinalSparkles(){
  const stage = $('stage-final');
  for(let i=0;i<14;i++){
    const s = document.createElement('div');
    s.className='sparkle';
    s.textContent = Math.random()>0.5 ? '✦':'♥';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*100+'%';
    s.style.fontSize = (10+Math.random()*14)+'px';
    s.style.animationDelay = (Math.random()*3)+'s';
    stage.appendChild(s);
  }
}

const GALAXY_WORDS = [
  "Happy Birthday","Joyeux Anniversaire","Feliz Cumpleaños","Alles Gute zum Geburtstag",
  "Buon Compleanno","Feliz Aniversário","З Днем Народження","Wszystkiego Najlepszego",
  "誕生日おめでとう","生日快乐","생일 축하해","Doğum Günün Kutlu Olsun",
  "Χρόνια Πολλά","Grattis på Födelsedagen","Gefeliciteerd","Hyvää Syntymäpäivää",
  "Chúc Mừng Sinh Nhật","สุขสันต์วันเกิด","יום הולדת שמח","जन्मदिन मुबारक", "С днём рождения"
];

let galaxyRotation = 0;
let galaxyScale = 1;
const GALAXY_MIN_SCALE = 0.6, GALAXY_MAX_SCALE = 3;

let galaxyStarted = false;
let galaxyParticles = [];
const ELLIPSE_RATIO = .38;

function startGalaxy(){
  if(galaxyStarted) return;
  galaxyStarted = true;

  const canvas = $('galaxyCanvas');
  const scene  = canvas.parentElement; // .galaxy-scene
  const ctx = canvas.getContext('2d');
  const SUPER = 1.6;           // запас разрешения, чтобы при зуме частицы не размывались
  let w,h,cx,cy,PXR;

  function resize(){
    PXR = devicePixelRatio * SUPER;
    w = canvas.width = scene.clientWidth * PXR;
    h = canvas.height = scene.clientHeight * PXR;
    canvas.style.width = scene.clientWidth+'px';
    canvas.style.height = scene.clientHeight+'px';
    cx = w/2; cy = h/2;
  }
  resize();
  window.addEventListener('resize', resize);

  const maxR = ()=> Math.min(w,h*2.2)/2 * .92;

  const ARMS = 7;const TWIST = 7;
  const N = 2000;

  galaxyParticles = [];
  for(let i=0;i<N;i++){
    const t = Math.pow(Math.random(), 0.6);
    const arm = Math.floor(Math.random()*ARMS) * (Math.PI*2/ARMS);
    const spread = (Math.random()-0.5)*0.5; galaxyParticles.push({
      radius: t,
      angle: t*TWIST + arm + spread,
      size: 0.5 + Math.random()*1.6,
      colorMix: Math.random()
    });
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    const R = maxR();

    ctx.globalCompositeOperation = 'source-over';
    const nebula = ctx.createRadialGradient(cx,cy,0,cx,cy,R*1.15);
    nebula.addColorStop(0,'rgba(168,90,107,.09)');
    nebula.addColorStop(.6,'rgba(94,52,80,.05)');
    nebula.addColorStop(1,'rgba(94,52,80,0)');
    ctx.fillStyle = nebula;
    ctx.beginPath();
    ctx.ellipse(cx,cy,R*1.15,R*1.15*ELLIPSE_RATIO,0,0,Math.PI*2);
    ctx.fill();

    ctx.globalCompositeOperation = 'lighter';
    galaxyParticles.forEach(p=>{
      const ang = p.angle + galaxyRotation;
      const r = 16 + p.radius*R;
      const x = cx + Math.cos(ang)*r;
      const y = cy + Math.sin(ang)*r*ELLIPSE_RATIO;

      const depth = (Math.sin(ang)+1)/2;
      const nearBoost = 0.65 + depth*0.95;
      const size = p.size * PXR * (0.55 + (1-p.radius)*1.05) * nearBoost;

      const alpha = (.10 + (1-p.radius)*.26) * (0.5 + depth*0.65);
      const hue = p.colorMix < .34 ? '232,180,168'
                : p.colorMix < .67 ? '196,150,218'
                : '216,168,107';

      const g = ctx.createRadialGradient(x,y,0,x,y,size*3);
      g.addColorStop(0, `rgba(${hue},${Math.min(alpha,.65)})`);
      g.addColorStop(.5,`rgba(${hue},${alpha*.35})`);
      g.addColorStop(1, 'rgba(168,90,107,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x,y,size*3,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  const layer = $('orbitLabels');
  const labels = GALAXY_WORDS.map((word,i)=>{
    const el = document.createElement('div');
    el.className='orbit-label';
    el.textContent = word;
    layer.appendChild(el);
    return {
      el,
      angle: (i/GALAXY_WORDS.length)*Math.PI*2,
      radiusRatio: 0.62 + (i%3)*0.14
    };
  });

  function drawLabels(){
    const rect = scene.getBoundingClientRect();
    const R = Math.min(rect.width, rect.height*2.2)/2 * .95;
    labels.forEach(l=>{
      const ang = l.angle + galaxyRotation;
      const r = l.radiusRatio*R;
      const x = Math.cos(ang)*r;
      const y = Math.sin(ang)*r*ELLIPSE_RATIO;
      const depth = (Math.sin(ang)+1)/2;
      const scale = 0.55 + depth*0.6;
      const opacity = 0.25 + depth*0.75;
      l.el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${scale})`;
      l.el.style.opacity = opacity;
      l.el.style.zIndex = Math.round(depth*10);
    });
    requestAnimationFrame(drawLabels);
  }
  requestAnimationFrame(drawLabels);
}

function initGalaxyGestures(){
  const wrap  = $('galaxyWrap');
  const scene = $('galaxyScene');

  function applyScale(){
    scene.style.transform = `translate(-50%,-50%) scale(${galaxyScale})`;
  }

  function angleFromCenter(clientX, clientY){
    const rect = scene.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    return Math.atan2(clientY - cy, clientX - cx);
  }

  const pointers = new Map();
  let lastAngle = null;let lastDist = null;
  wrap.addEventListener('pointerdown', e=>{
    wrap.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
    wrap.classList.add('grabbing');
    if(pointers.size === 1){
      lastAngle = angleFromCenter(e.clientX, e.clientY);
    } else if(pointers.size === 2){
      const [a,b] = [...pointers.values()];
      lastDist = Math.hypot(a.x-b.x, a.y-b.y);
      lastAngle = null;
    }
  });

  wrap.addEventListener('pointermove', e=>{
    if(!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});

    if(pointers.size === 1){
      const ang = angleFromCenter(e.clientX, e.clientY);
      if(lastAngle !== null){
        let delta = ang - lastAngle;
        if(delta > Math.PI) delta -= Math.PI*2;
        if(delta < -Math.PI) delta += Math.PI*2;
        galaxyRotation += delta;
      }
      lastAngle = ang;
    } else if(pointers.size === 2){
      const [a,b] = [...pointers.values()];
      const dist = Math.hypot(a.x-b.x, a.y-b.y);
      if(lastDist){
        const ratio = dist / lastDist;
        galaxyScale = Math.min(GALAXY_MAX_SCALE, Math.max(GALAXY_MIN_SCALE, galaxyScale * ratio));
        applyScale();
      }
      lastDist = dist;
    }
  });

  function release(e){
    pointers.delete(e.pointerId);
    if(pointers.size < 1) lastAngle = null;
    if(pointers.size < 2) lastDist = null;
    if(pointers.size === 0) wrap.classList.remove('grabbing');
  }
  wrap.addEventListener('pointerup', release);
  wrap.addEventListener('pointercancel', release);
  wrap.addEventListener('pointerleave', release);

  wrap.addEventListener('wheel', e=>{
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    galaxyScale = Math.min(GALAXY_MAX_SCALE, Math.max(GALAXY_MIN_SCALE, galaxyScale * (1+delta)));
    applyScale();
  }, {passive:false});
}
initGalaxyGestures();