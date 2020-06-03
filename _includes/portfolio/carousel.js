window.addEventListener('load', () => {
  const $carouselWrappers = $('[data-carousel="wrapper"]');
  let slideChangeGoing = false;
  let isCarouselDesktop;

  $carouselWrappers.on('mousedown touchstart', () => {
    const $targetCarousel = $(event.target).closest($('[data-carousel="wrapper"]'));
    isCarouselDesktop = $targetCarousel.data('carouselDesktop') ? true : false;

    if ($(window).width() < 811 || isCarouselDesktop) {
      initCarousel($targetCarousel);
    }
  });

  function initCarousel($targetCarousel) {
    const $carouselTabsContainer = $targetCarousel.find($('[data-carousel="tabs"]'));
    const $carouselDots = $targetCarousel.find($('[data-carousel="dots"]'));
    const targetType = event.target.dataset.carousel;
    let carouselSize;

    if ($(window).width() < 811) {
      carouselSize = $carouselDots.children().length;
    } else if ($(window).width() > 992) {
      carouselSize = $carouselDots.find('[data-dots="lg"]').length;
    } else {
      carouselSize = $carouselDots.find('[data-dots="md"]').length + $carouselDots.find('[data-dots="lg"]').length;
    }

    if (targetType === 'dots-item') {
      dotsControl()
    } else if (targetType === 'nav-item') {
      navControl();
    } else {
      swipeControl(carouselSize);
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

    function swipeControl(carouselSize) {
      const targetTabIndex = parseInt($carouselDots.find('[data-dot-active="true"]')[0].dataset.dotIndex);
      const swipeStartPosition = (event.type === 'touchstart') ? event.touches[0].clientX : event.clientX;

      swiping(swipeStartPosition, targetTabIndex);
      $targetCarousel.one('mouseup touchend', () => {
        swipeEnd(swipeStartPosition, targetTabIndex, carouselSize);
      });
    }

    function swiping(startPosition, tabIndex) {
      $targetCarousel.on('mousemove touchmove', function() {
        const currentPosition = (event.type === 'touchmove') ? event.touches[0].clientX : event.clientX;
        const positionChange = currentPosition - startPosition;
        const positionUnit = ($(window).width() > 576 && isCarouselDesktop) ? '%' : 'vw';
        const newTabPosition = (positionChange < 0)
          ? `calc(-${tabIndex*100}${positionUnit} - ${Math.abs(positionChange)}px)`
          : `calc(-${tabIndex*100}${positionUnit} + ${positionChange}px)`
        $carouselTabsContainer.css('left', newTabPosition);
      });
    }

    function swipeEnd(startPosition, currentTabIndex, carouselSize) {
      const endPosition = (event.type === 'touchend') ? event.changedTouches[0].clientX : event.clientX;
      const positionChange = startPosition - endPosition;
      const swipeToIndex = positionChange > 0 ? currentTabIndex+1 : currentTabIndex-1;
      const newIndex = (Math.abs(positionChange) > 30 && swipeToIndex >= 0 && swipeToIndex < carouselSize)
        ? swipeToIndex
        : currentTabIndex;
      checkChangeRequest(newIndex, 'swipe');
      $targetCarousel.off('mousemove touchmove');
    }

    function checkChangeRequest(newIndex, type = 'default') {
      const $activeDot = $carouselDots.find('[data-dot-active="true"]');
      const currentIndex = parseInt($activeDot[0].dataset.dotIndex);

      if (!slideChangeGoing && (newIndex !== currentIndex || type === 'swipe')) {
        slideChangeGoing = true;
        changeTabPosition(newIndex, $activeDot);
      }
    }

    function changeTabPosition(newIndex, $activeDot) {
      const $newActiveDot = $carouselDots.find($(`[data-dot-index="${newIndex}"]`));
      const positionUnit = ($(window).width() > 576 && isCarouselDesktop) ? '%' : 'vw'
      const newTabPosition = `-${newIndex * 100}${positionUnit}`;
      let $disabledNav = $targetCarousel.find('[data-nav-disabled="true"]');

      if (isCarouselDesktop) {
        $disabledNav.removeClass('portfolio-partners__nav-item--disabled');
        $activeDot.removeClass('portfolio-partners__dots-item--active');
        $newActiveDot.addClass('portfolio-partners__dots-item--active');
      } else {
        $disabledNav.removeClass('case-carousel__nav-item--disabled');
        $activeDot.removeClass('case-carousel__dots-item--active');
        $newActiveDot.addClass('case-carousel__dots-item--active');
      }

      $disabledNav.attr('data-nav-disabled', 'false');
      $activeDot.attr('data-dot-active', 'false');
      $newActiveDot.attr('data-dot-active', 'true');

      if (newIndex === 0) {
        $disabledNav = $targetCarousel.find($(`[data-nav="prev"]`));
      } else if (newIndex === (carouselSize - 1) ) {
        $disabledNav = $targetCarousel.find($(`[data-nav="next"]`));
      } else {
        $disabledNav = null;
      }

      if ($disabledNav != null) {
        $disabledNav.attr('data-nav-disabled', 'true')
        if (isCarouselDesktop) {
          $disabledNav.addClass('portfolio-partners__nav-item--disabled');
        } else {
          $disabledNav.addClass('case-carousel__nav-item--disabled');
        }
      }

      $carouselTabsContainer.animate({ left: newTabPosition }, 600, () => {
        slideChangeGoing = false;
      });
    }
  }
}, { passive: true })
