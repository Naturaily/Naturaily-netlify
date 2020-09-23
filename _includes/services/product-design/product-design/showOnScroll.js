window.addEventListener('load', () => {
  const scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)};
  const $itemsToShow = $('[data-show="on-scroll"]');
  const animatedClass = 'animated';

  const loop = () => {
    $itemsToShow.each((index) => {
      const $item = $itemsToShow[index];

      if (isElementInViewport($item)) {
        $($item).addClass(animatedClass);
      } else {
        $($item).removeClass(animatedClass);
      }
    });

    scroll(loop);
  }

  const isElementInViewport = ($item) => {
    const rect = $item.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const checkTopViewport = rect.top <= 0 && rect.bottom >= 0;
    const checkMiddleViewport = rect.bottom >= viewportHeight && rect.top <= viewportHeight;
    const checkBottomViewport = rect.top >= 0 && rect.bottom <= viewportHeight;

    return (checkTopViewport || checkMiddleViewport || checkBottomViewport);
  };

  loop();
});
