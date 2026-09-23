const film=document.getElementById('ceiling-film');
if(film){
  film.muted=true;
  film.defaultMuted=true;
  film.playsInline=true;
  film.setAttribute('muted','');
  film.setAttribute('playsinline','');
  film.setAttribute('webkit-playsinline','');
  let pending=false;
  function startFilm(){
    if(pending||!film.paused||document.hidden)return;
    pending=true;
    const result=film.play();
    if(result&&typeof result.then==='function')result.catch(()=>{}).finally(()=>{pending=false;});
    else pending=false;
  }
  film.addEventListener('loadeddata',startFilm);
  film.addEventListener('canplay',startFilm);
  document.addEventListener('pointerdown',startFilm,{passive:true});
  document.addEventListener('touchend',startFilm,{passive:true});
  document.addEventListener('keydown',startFilm);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)startFilm();});
  window.addEventListener('pageshow',startFilm);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting))startFilm();},{threshold:0.1}).observe(film);
  startFilm();
}
function revealHeading(){
  document.documentElement.classList.remove('heading-ready');
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('heading-ready')));
}
window.addEventListener('pageshow',revealHeading);
revealHeading();
