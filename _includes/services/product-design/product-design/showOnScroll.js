window.addEventListener('load', () => {
  const scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)};
  const $itemsToShow = $('[data-show="on-scroll"]');

  const loop = () => {
    $itemsToShow.each(function(index){
      const $item = $itemsToShow[index];

      if (isElementInViewport($item)) {
        $($item).addClass('animated');
      } else {
        $($item).removeClass('animated');
      }
    });

    scroll(loop);
  }

  const isElementInViewport = (item) => {
    const rect = item.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0)
      ||  (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||  (rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  };

  loop();
});
