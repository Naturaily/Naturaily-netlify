window.addEventListener('load', () => {
  let resizeTimer = false;

  const resetStyles = () => {
    $('[gsap][style]').removeAttr('style');
    $('[gsap][transform]').removeAttr('transform');
  };

  const resizeReset = () => {
    if ($(window).width() < 992) {
      resetStyles();
    } else {
      window.location = window.location;
    }
  };
  
  if ($(window).width() < 992) resetStyles();
  
  $(window).resize(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resizeReset(); }, 250);
  });
});
