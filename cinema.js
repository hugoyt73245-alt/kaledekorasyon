const film=document.getElementById('ceiling-film');
if(matchMedia('(prefers-reduced-motion: reduce)').matches){film.autoplay=false;film.pause();}
