window.addEventListener('load', () => {
  const $carouselWrappers = $('[data-carousel="wrapper"]');

  $carouselWrappers.on('mousedown touchstart', initCarousel);

  function initCarousel() {
    const $targetCarousel = $(event.target).closest($('[data-carousel="wrapper"]'));
    const $carouselTabsContainer = $targetCarousel.find($('[data-carousel="tabs"]'));
    const $carouselNav = $targetCarousel.find($('[data-carousel="nav"]'));
    const targetType = event.target.dataset.carousel;

    (targetType === 'nav' || targetType === 'nav-item') ? dotsControl() : swipeControl();

    function dotsControl() {
      const newIndex = event.target.dataset.navIndex;

      if (newIndex) {
        const newTabPosition = `-${newIndex * 100}vw`;
        changeTabPosition(newTabPosition, newIndex);
      }
    }

    function swipeControl() {
      const targetTabIndex = parseInt($(event.target).closest($('[data-carousel="tab"]'))[0].dataset.tabIndex);
      const swipeStartPosition = (event.type === 'touchstart') ? event.touches[0].clientX : event.clientX;
      swiping(swipeStartPosition, targetTabIndex);
      $carouselTabsContainer.one('mouseup touchend', () => {
        swipeEnd(swipeStartPosition, targetTabIndex);
      });
    }

    function swiping(startPosition, tabIndex) {
      $carouselTabsContainer.on('mousemove touchmove', function() {
        const currentPosition = (event.type === 'touchmove') ? event.touches[0].clientX : event.clientX;
        const positionChange = currentPosition - startPosition;
        const newTabPosition = (positionChange < 0)
          ? `calc(-${tabIndex*100}vw - ${Math.abs(positionChange)}px)`
          : `calc(-${tabIndex*100}vw + ${positionChange}px)`
        $carouselTabsContainer.css('left', newTabPosition);
      });
    }

    function swipeEnd(startPosition, currentTabIndex) {
      console.log('end')
      const endPosition = (event.type === 'touchend') ? event.changedTouches[0].clientX : event.clientX;
      const positionChange = startPosition - endPosition;
      const swipeToIndex = positionChange > 0 ? currentTabIndex+1 : currentTabIndex-1;
      const newIndex = (Math.abs(positionChange) > 100 && swipeToIndex >= 0 && swipeToIndex < $carouselNav.children().length)
        ? swipeToIndex
        : currentTabIndex;
      const newTabPosition = `-${newIndex * 100}vw`;
      changeTabPosition(newTabPosition, newIndex);
      $carouselTabsContainer.off('mousemove touchmove');
    }

    function changeTabPosition(newTabPosition, newIndex) {
      const $activeNavItem = $carouselNav.find('.portfolio-carousel__nav-item--active');
      const $newActiveNavItem = $carouselNav.find($(`[data-nav-index="${newIndex}"]`));

      $activeNavItem.removeClass('portfolio-carousel__nav-item--active');
      $newActiveNavItem.addClass('portfolio-carousel__nav-item--active');
      $carouselTabsContainer.animate({ left: newTabPosition }, 600);
    }
  }
})
