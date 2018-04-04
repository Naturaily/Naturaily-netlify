jQuery(document).ready(function(){
    function resizeForm(){
        var width = document.documentElement.clientWidth;
        if(width > 991){
          window.sr = ScrollReveal({ reset: false, duration: 600 });

          sr.reveal('[data-reveal-resources]', {
            delay: 100,
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
            rotate: {x: 65},
          });

          sr.reveal('[data-reveal-technology]', {
            delay: 100,
          });

          sr.reveal('[data-reveal-tools]', {
            origin: 'bottom',
            delay: 100,
            distance: '150px',
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
            rotate: {x: 65},
          });

          sr.reveal('#results', {
            origin: 'left',
            delay: 100,
            distance: '100px',
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
            rotate: {x: 65},
          });

          sr.reveal('[data-reveal-competence]', {
            origin: 'right',
            delay: 100,
            distance: '100px',
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
            rotate: {x: 65},
          });

          sr.reveal('#galleryFirst', {
            delay: 100,
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
          });

          sr.reveal('#gallerySecond', {
            delay: 150,
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
          });

          sr.reveal('#galleryThird', {
            delay: 200,
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
          });

          sr.reveal('#galleryFourth', {
            delay: 250,
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
          });

          sr.reveal('#galleryFifth', {
            delay: 300,
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
          });
        }
    }
    window.onresize = resizeForm;
    resizeForm();
});
