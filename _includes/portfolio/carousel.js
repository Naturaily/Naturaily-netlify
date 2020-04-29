window.addEventListener('load', () => {
  const $carouselWrappers = $('[data-carousel="wrapper"]');
  let slideChangeGoing = false;

  $carouselWrappers.on('mousedown touchstart', initCarousel);

  function initCarousel() {
    const $targetCarousel = $(event.target).closest($('[data-carousel="wrapper"]'));
    const $carouselTabsContainer = $targetCarousel.find($('[data-carousel="tabs"]'));
    const $carouselDots = $targetCarousel.find($('[data-carousel="dots"]'));
    const carouselSize = $carouselDots.children().length;
    const targetType = event.target.dataset.carousel;

    if (targetType === 'dots-item') {
      dotsControl()
    } else if (targetType === 'nav-item') {
      navControl();
    } else {
      swipeControl();
    }

    function dotsControl() {
      const newIndex = event.target.dataset.dotIndex;
      if (newIndex) {
        checkChangeRequest(parseInt(newIndex));
      }
    }

    function navControl() {
      const currentTabIndex = parseInt($carouselDots.find('[data-dot-active="true"]')[0].dataset.dotIndex);
      const newIndex = event.target.dataset.nav === 'prev' ? currentTabIndex - 1 : currentTabIndex + 1;

      if (newIndex >= 0 && newIndex < carouselSize) {
        checkChangeRequest(newIndex);
      }
    }

    function swipeControl() {
      const targetTabIndex = parseInt($carouselDots.find('[data-dot-active="true"]')[0].dataset.dotIndex);
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
      const newIndex = (Math.abs(positionChange) > 30 && swipeToIndex >= 0 && swipeToIndex < $carouselDots.children().length)
        ? swipeToIndex
        : currentTabIndex;
      checkChangeRequest(newIndex, 'swipe');
      $targetCarousel.off('mousemove touchmove');
    }

    function checkChangeRequest(newIndex, type = 'default') {
      const $activeDot = $carouselDots.find('[data-dot-active="true"]');
      const currentIndex = parseInt($activeDot[0].dataset.dotIndex);

      if (slideChangeGoing === false && (newIndex !== currentIndex || type === 'swipe') {
        slideChangeGoing = true;
        changeTabPosition(newIndex, $activeDot);
      }
    }

    function changeTabPosition(newIndex, $activeDot) {
      const $newActiveDot = $carouselDots.find($(`[data-dot-index="${newIndex}"]`));
      const newTabPosition = `-${newIndex * 100}vw`;
      let $disabledNav = $targetCarousel.find('[data-nav-disabled="true"]');

      $disabledNav
        .removeClass('portfolio-carousel__nav-item--disabled')
        .attr('data-nav-disabled', 'false');

      if (newIndex === 0) {
        $disabledNav = $targetCarousel.find($(`[data-nav="prev"]`));
      } else if (newIndex === (carouselSize - 1) ) {
        $disabledNav = $targetCarousel.find($(`[data-nav="next"]`));
      } else {
        $disabledNav = null;
      }

      if ($disabledNav != null) {
        $disabledNav
          .addClass('portfolio-carousel__nav-item--disabled')
          .attr('data-nav-disabled', 'true')
      }

      $activeDot
        .removeClass('portfolio-carousel__dots-item--active')
        .attr('data-dot-active', 'false');

      $newActiveDot
        .addClass('portfolio-carousel__dots-item--active')
        .attr('data-dot-active', 'true');

      $carouselTabsContainer.animate({ left: newTabPosition }, 600, () => {
        slideChangeGoing = false;
      });
    }
  }
}, { passive: true })
