// Public-safe CLARYEL Universe standard for the Community runtime.
// Публично безопасный стандарт CLARYEL Universe для Community runtime.
(()=>{
  'use strict';
  const UNIVERSE_URL='https://claryel.space/universe/';
  const LANGUAGES=[
    ['en','/','gb','English'],['it','/it/','it','Italiano'],['de','/de/','de','Deutsch'],['fr','/fr/','fr','Français'],['es','/es/','es','Español'],['nl','/nl/','nl','Nederlands'],['pt','/pt/','pt','Português'],['pl','/pl/','pl','Polski'],['ro','/ro/','ro','Română'],['cs','/cs/','cz','Čeština'],['sv','/sv/','se','Svenska'],['el','/el/','gr','Ελληνικά'],['da','/da/','dk','Dansk'],['fi','/fi/','fi','Suomi'],['zh-CN','/zh-cn/','cn','简体中文'],['hi','/hi/','in','हिन्दी'],['ar','/ar/','sa','العربية'],['id','/id/','id','Bahasa Indonesia'],['uk','/uk/','ua','Українська'],['ru','/ru/','ru','Русский']
  ].map(([code,path,flag,name])=>({code,path,flag,name}));
  const COPY={
    en:['BETA','This website is published through a platform in beta testing or active development. Temporary technical issues may occur.','CLARYEL Universe','Choose language','Available languages'],
    it:['BETA','Questo sito viene pubblicato tramite una piattaforma in beta test o sviluppo attivo. Sono possibili inconvenienti tecnici temporanei.','CLARYEL Universe','Scegli la lingua','Lingue disponibili'],
    de:['BETA','Diese Website wird über eine Plattform im Betatest oder in aktiver Entwicklung veröffentlicht. Vorübergehende technische Störungen sind möglich.','CLARYEL Universe','Sprache wählen','Verfügbare Sprachen'],
    fr:['BETA','Ce site est publié via une plateforme en phase de bêta-test ou de développement actif. Des incidents techniques temporaires sont possibles.','CLARYEL Universe','Choisir la langue','Langues disponibles'],
    es:['BETA','Este sitio se publica mediante una plataforma en pruebas beta o desarrollo activo. Pueden producirse incidencias técnicas temporales.','CLARYEL Universe','Elegir idioma','Idiomas disponibles'],
    nl:['BETA','Deze website wordt gepubliceerd via een platform in bètatest of actieve ontwikkeling. Tijdelijke technische problemen zijn mogelijk.','CLARYEL Universe','Taal kiezen','Beschikbare talen'],
    pt:['BETA','Este site é publicado através de uma plataforma em testes beta ou desenvolvimento ativo. Podem ocorrer problemas técnicos temporários.','CLARYEL Universe','Escolher idioma','Idiomas disponíveis'],
    pl:['BETA','Ta strona jest publikowana przez platformę w fazie testów beta lub aktywnego rozwoju. Mogą wystąpić przejściowe problemy techniczne.','CLARYEL Universe','Wybierz język','Dostępne języki'],
    ro:['BETA','Acest site este publicat printr-o platformă aflată în testare beta sau dezvoltare activă. Pot apărea probleme tehnice temporare.','CLARYEL Universe','Alege limba','Limbi disponibile'],
    cs:['BETA','Tento web je publikován prostřednictvím platformy v beta testování nebo aktivním vývoji. Mohou nastat dočasné technické potíže.','CLARYEL Universe','Vybrat jazyk','Dostupné jazyky'],
    sv:['BETA','Webbplatsen publiceras genom en plattform i betatest eller aktiv utveckling. Tillfälliga tekniska problem kan förekomma.','CLARYEL Universe','Välj språk','Tillgängliga språk'],
    el:['BETA','Ο ιστότοπος δημοσιεύεται μέσω πλατφόρμας σε beta δοκιμή ή ενεργή ανάπτυξη. Ενδέχεται να παρουσιαστούν προσωρινά τεχνικά προβλήματα.','CLARYEL Universe','Επιλογή γλώσσας','Διαθέσιμες γλώσσες'],
    da:['BETA','Webstedet publiceres gennem en platform i betatest eller aktiv udvikling. Midlertidige tekniske problemer kan forekomme.','CLARYEL Universe','Vælg sprog','Tilgængelige sprog'],
    fi:['BETA','Sivusto julkaistaan beta-testauksessa tai aktiivisessa kehityksessä olevan alustan kautta. Tilapäisiä teknisiä ongelmia voi esiintyä.','CLARYEL Universe','Valitse kieli','Saatavilla olevat kielet'],
    'zh-CN':['BETA','本网站通过处于测试或持续开发阶段的平台发布，可能会出现临时技术问题。','CLARYEL Universe','选择语言','可用语言'],
    hi:['BETA','यह वेबसाइट बीटा परीक्षण या सक्रिय विकास में मौजूद प्लेटफ़ॉर्म से प्रकाशित होती है। अस्थायी तकनीकी समस्याएँ हो सकती हैं।','CLARYEL Universe','भाषा चुनें','उपलब्ध भाषाएँ'],
    ar:['BETA','يُنشر هذا الموقع عبر منصة في مرحلة الاختبار التجريبي أو التطوير النشط، وقد تحدث مشكلات تقنية مؤقتة.','CLARYEL Universe','اختر اللغة','اللغات المتاحة'],
    id:['BETA','Situs ini diterbitkan melalui platform yang sedang dalam pengujian beta atau pengembangan aktif. Gangguan teknis sementara dapat terjadi.','CLARYEL Universe','Pilih bahasa','Bahasa tersedia'],
    uk:['BETA','Сайт публікується через платформу на етапі beta-тестування або активної розробки. Можливі тимчасові технічні накладки.','CLARYEL Universe','Оберіть мову','Доступні мови'],
    ru:['БЕТА','Все публикации на сайте производятся через платформу, которая находится в стадии бета-тестирования или разработки. Поэтому возможны временные технические накладки.','Вселенная CLARYEL','Выбрать язык','Доступные языки']
  };
  const q=(selector,root=document)=>root?.querySelector(selector)||null;
  const qa=(selector,root=document)=>root?[...root.querySelectorAll(selector)]:[];
  const modulo=(value,length)=>((value%length)+length)%length;
  const normalize=value=>{const raw=String(value||'en').replace('_','-');if(/^zh(?:-cn|-hans)?$/i.test(raw))return'zh-CN';return raw.toLowerCase().split('-')[0]};
  const current=()=>normalize(document.documentElement.dataset.locale||document.documentElement.lang||location.pathname.split('/').filter(Boolean)[0]||'en');
  const words=()=>COPY[current()]||COPY.en;
  let context=null;let output=null;let lastTick=0;

  // Unlock feedback audio only after a user gesture.
  // Разблокировать звук обратной связи только после действия пользователя.
  function unlock(){
    try{if(!context){const Context=window.AudioContext||window.webkitAudioContext;if(!Context)return false;context=new Context();output=context.createGain();output.gain.value=.13;output.connect(context.destination)}if(context.state==='suspended')context.resume().catch(()=>{});return true}catch{return false}
  }
  function tick(speed=.6){
    try{navigator.vibrate?.(7)}catch{}if(!unlock()||context.state!=='running')return;const now=context.currentTime;if(now-lastTick<.024)return;lastTick=now;
    const oscillator=context.createOscillator();const filter=context.createBiquadFilter();const gain=context.createGain();oscillator.type='triangle';oscillator.frequency.setValueAtTime(740+speed*560,now);oscillator.frequency.exponentialRampToValueAtTime(510,now+.026);filter.type='lowpass';filter.frequency.value=2300;gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.035,now+.003);gain.gain.exponentialRampToValueAtTime(.0001,now+.027);oscillator.connect(filter);filter.connect(gain);gain.connect(output);oscillator.start(now);oscillator.stop(now+.034);
  }

  function createOrbit(){
    const active=LANGUAGES.find(item=>item.code===current())||LANGUAGES[0];const copy=words();const root=document.createElement('div');root.className='language-constellation-v5 claryel-language-standard';root.id='claryelLanguageStandard';root.dataset.claryelStandard='box-orbit-v1';
    root.innerHTML=`<button class="language-trigger-v5" type="button" aria-expanded="false" aria-controls="claryelLanguageOrbit" aria-label="${copy[3]}"><img src="/assets/flags/${active.flag}.svg" alt="" aria-hidden="true"></button><div class="language-orbit-shell-v5"><div class="language-orbit-v5" id="claryelLanguageOrbit" role="listbox" aria-label="${copy[4]}" tabindex="0"></div></div>`;
    const orbit=q('.language-orbit-v5',root);for(const item of LANGUAGES){const button=document.createElement('button');button.type='button';button.className='language-option-v5';button.role='option';button.dataset.language=item.code;button.setAttribute('aria-selected',String(item.code===active.code));button.innerHTML=`<img src="/assets/flags/${item.flag}.svg" alt="" aria-hidden="true"><span>${item.name}</span>`;orbit.append(button)}return root;
  }

  function mount(root){
    const trigger=q('.language-trigger-v5',root);const orbit=q('.language-orbit-v5',root);const options=qa('.language-option-v5',orbit);let rotation=0;let dragging=false;let startAngle=0;let startRotation=0;let suppress=false;let previous=0;
    const render=()=>options.forEach((option,index)=>{const slot=modulo(index+rotation,20);option.dataset.orbitSlot=String(slot);option.classList.toggle('is-preview',slot===5)});
    const feedback=()=>{if(rotation!==previous){tick(Math.min(1,Math.abs(rotation-previous)/2));previous=rotation}};
    const rotate=delta=>{rotation=modulo(rotation+delta,20);render();feedback()};
    const open=value=>{root.classList.toggle('open',value);trigger.setAttribute('aria-expanded',String(value));if(value){unlock();requestAnimationFrame(()=>orbit.focus({preventScroll:true}))}};
    const angle=event=>{const rect=orbit.getBoundingClientRect();return Math.atan2(event.clientY-rect.top-rect.height/2,event.clientX-rect.left-rect.width/2)};
    trigger.addEventListener('click',event=>{event.stopPropagation();open(!root.classList.contains('open'))});
    options.forEach(option=>option.addEventListener('click',event=>{event.stopPropagation();if(suppress){suppress=false;return}const item=LANGUAGES.find(entry=>entry.code===option.dataset.language);if(item){tick(.8);location.assign(`${item.path}${location.hash||''}`)}}));
    orbit.addEventListener('wheel',event=>{event.preventDefault();rotate(event.deltaY>0?1:-1)},{passive:false});
    orbit.addEventListener('keydown',event=>{if(['ArrowRight','ArrowDown'].includes(event.key)){event.preventDefault();rotate(1)}if(['ArrowLeft','ArrowUp'].includes(event.key)){event.preventDefault();rotate(-1)}if(event.key==='Escape'){event.preventDefault();open(false);trigger.focus()}if(event.key==='Enter'||event.key===' '){event.preventDefault();(options.find(option=>option.dataset.orbitSlot==='5')||options.find(option=>option.getAttribute('aria-selected')==='true'))?.click()}});
    orbit.addEventListener('pointerdown',event=>{if(event.button!==0)return;dragging=true;suppress=false;startAngle=angle(event);startRotation=rotation;orbit.classList.add('is-dragging');orbit.setPointerCapture?.(event.pointerId);unlock()});
    orbit.addEventListener('pointermove',event=>{if(!dragging)return;const delta=Math.round((angle(event)-startAngle)/(Math.PI*2/20));if(Math.abs(delta)>0)suppress=true;const next=modulo(startRotation+delta,20);if(next!==rotation){rotation=next;render();feedback()}});
    const finish=event=>{if(!dragging)return;dragging=false;orbit.classList.remove('is-dragging');try{orbit.releasePointerCapture?.(event.pointerId)}catch{}setTimeout(()=>{suppress=false},80)};orbit.addEventListener('pointerup',finish);orbit.addEventListener('pointercancel',finish);document.addEventListener('pointerdown',event=>{if(!root.contains(event.target))open(false)});render();
  }

  function start(){
    document.documentElement.dataset.hiddenLocale='false';document.documentElement.dataset.claryelLanguageStandard='ready';
    const controls=document.createElement('div');controls.id='claryelGlobalControls';controls.className='claryel-global-controls-standard';const universe=document.createElement('a');universe.href=UNIVERSE_URL;universe.className='claryel-universe-control';universe.setAttribute('aria-label',words()[2]);universe.innerHTML=`<span class="universe-control-core" aria-hidden="true"><i></i><i></i><i></i></span><span class="claryel-control-sr">${words()[2]}</span>`;controls.append(universe);
    const orbit=createOrbit();mount(orbit);controls.append(orbit);q('#languagePicker')?.remove();document.body.append(controls);
    const strip=document.createElement('div');strip.id='claryelBetaStrip';strip.className='claryel-beta-strip-standard';strip.role='note';strip.innerHTML=`<strong>${words()[0]}</strong><span>${words()[1]}</span><a href="${UNIVERSE_URL}">${words()[2]}</a>`;document.body.append(strip);document.body.dataset.claryelBetaStandard='ready';
    for(const type of ['pointerdown','touchstart','click','keydown','wheel'])addEventListener(type,unlock,{capture:true,passive:type==='touchstart'||type==='wheel'});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
