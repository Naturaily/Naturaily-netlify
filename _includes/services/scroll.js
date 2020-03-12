$(document).ready(() => {
  let width = document.documentElement.clientWidth;

  function resizeForm() {
    if (width > 1200) {
      window.sr = ScrollReveal({ reset: false, duration: 600, delay: 200 });

      sr.reveal('[services-testimonial]', { });

      sr.reveal('[data-bottom]', {
        origin: 'bottom',
        distance: '150px',
        easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
        rotate: { x: 65 },
      });

      sr.reveal('[services-left]', {
        origin: 'left',
        distance: '150px',
        easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
        rotate: { x: 80 },
      });

      sr.reveal('[services-right]', {
        origin: 'right',
        distance: '150px',
        rotate: { x: 80 },
      });
    }
  }

  resizeForm();

  window.onresize = () => {
    width = document.documentElement.clientWidth;

    resizeForm();
  }
});
