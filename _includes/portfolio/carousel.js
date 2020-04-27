window.addEventListener('load', () => {
  const $carouselWrappers = $('[data-carousel="wrapper"]');

  $carouselWrappers.on('mousedown touchstart', initCarousel);

  function initCarousel() {
    const $targetCarousel = $(event.target).closest($('[data-carousel="wrapper"]'));
    const $carouselTabsContainer = $targetCarousel.find($('[data-carousel="tabs"]'));
    const $carouselDots = $targetCarousel.find($('[data-carousel="dots"]'));
    const carouselSize = $carouselDots.children().length;
    const targetType = event.target.dataset.carousel;

    if (targetType === 'dots' || targetType === 'dots-item') dotsControl()
    else if (targetType === 'nav-item') navControl();
    else swipeControl();

    function dotsControl() {
      const newIndex = event.target.dataset.dotsIndex;
      if (newIndex) changeTabPosition(newIndex);
    }

    function navControl() {
      const currentTabIndex = parseInt($carouselDots.find('.portfolio-carousel__dots-item--active')[0].dataset.dotsIndex);
      const newIndex = event.target.dataset.nav === 'prev' ? currentTabIndex - 1 : currentTabIndex + 1;

      if (newIndex >= 0 && newIndex < carouselSize) changeTabPosition(newIndex);
    }

    function swipeControl() {
      const targetTabIndex = parseInt($carouselDots.find('.portfolio-carousel__dots-item--active')[0].dataset.dotsIndex);
      const swipeStartPosition = (event.type === 'touchstart') ? event.touches[0].clientX : event.clientX;

      swiping(swipeStartPosition, targetTabIndex);
      $targetCarousel.one('mouseup touchend', () => {
        swipeEnd(swipeStartPosition, targetTabIndex);
      });
    }

    function swiping(startPosition, tabIndex) {
      $targetCarousel.on('mousemove touchmove', function() {
        const currentPosition = (event.type === 'touchmove') ? event.touches[0].clientX : event.clientX;
        const positionChange = currentPosition - startPosition;
        const newTabPosition = (positionChange < 0)
          ? `calc(-${tabIndex*100}vw - ${Math.abs(positionChange)}px)`
          : `calc(-${tabIndex*100}vw + ${positionChange}px)`
        $carouselTabsContainer.css('left', newTabPosition);
      });
    }

    function swipeEnd(startPosition, currentTabIndex) {
      const endPosition = (event.type === 'touchend') ? event.changedTouches[0].clientX : event.clientX;
      const positionChange = startPosition - endPosition;
      const swipeToIndex = positionChange > 0 ? currentTabIndex+1 : currentTabIndex-1;
      const newIndex = (Math.abs(positionChange) > 100 && swipeToIndex >= 0 && swipeToIndex < $carouselDots.children().length)
        ? swipeToIndex
        : currentTabIndex;
      changeTabPosition(newIndex);
      $targetCarousel.off('mousemove touchmove');
    }

    function changeTabPosition(newIndex) {
      const $activeDotsItem = $carouselDots.find('.portfolio-carousel__dots-item--active');
      const $newActiveDotsItem = $carouselDots.find($(`[data-dots-index="${newIndex}"]`));
      const newTabPosition = `-${newIndex * 100}vw`;
      let $disabledNav = $targetCarousel.find('.portfolio-carousel__nav-item--disabled');

      $disabledNav.removeClass('portfolio-carousel__nav-item--disabled');

      console.log(carouselSize)

      if (newIndex == 0) {
        $disabledNav = $targetCarousel.find($(`[data-nav="prev"]`));
      } else if (newIndex == (carouselSize - 1) ) {
        $disabledNav = $targetCarousel.find($(`[data-nav="next"]`));
      } else {
        $disabledNav = null;
      }

      if ($disabledNav != null) $disabledNav.addClass('portfolio-carousel__nav-item--disabled');
      $activeDotsItem.removeClass('portfolio-carousel__dots-item--active');
      $newActiveDotsItem.addClass('portfolio-carousel__dots-item--active');
      $carouselTabsContainer.animate({ left: newTabPosition }, 600);
    }
  }
})
