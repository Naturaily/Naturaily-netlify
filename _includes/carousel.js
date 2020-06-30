window.addEventListener('load', () => {
  const $carouselWrappers = $('[data-carousel="wrapper"]');
  const carousel = {
    change_going: false,
    is_desktop: false,
    tabs_disabled: false,
    progress_bar: false
  }

  $carouselWrappers.on('mousedown touchstart', () => {
    const $targetCarousel = $(event.target).closest($('[data-carousel="wrapper"]'));
    carousel.is_desktop = $targetCarousel.data('carouselDesktop') ? true : false;
    carousel.tabs_disabled = $targetCarousel.data('tabsDisabled') ? true : false;
    carousel.progress_bar = $targetCarousel.data('progressBar') ? true : false;

    if ($(window).width() < 811 || carousel.is_desktop) {
      initCarousel($targetCarousel);
    }
  });

  function initCarousel($targetCarousel) {
    const $carouselTabsContainer = $targetCarousel.find($('[data-carousel="tabs"]'));
    const $carouselDots = $targetCarousel.find($('[data-carousel="dots"]'));
    const targetType = event.target.dataset.carousel;
    let carouselSize;

    if (carousel.progress_bar) {
      carouselSize = $carouselTabsContainer.children().length;
    } else if ($(window).width() < 811) {
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
    } else if ($(window).width() < 811) {
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
      const swipeStartPosition = (event.type === 'touchstart') ? event.touches[0].clientX : event.clientX;
      let targetTabIndex;

      if (carousel.progress_bar) {
        targetTabIndex = parseInt($carouselTabsContainer.find('[data-tab-active="true"]')[0].dataset.tabIndex);
      } else {
        targetTabIndex = parseInt($carouselDots.find('[data-dot-active="true"]')[0].dataset.dotIndex);
      }

      swiping(swipeStartPosition, targetTabIndex);
      $targetCarousel.one('mouseup touchend', () => {
        swipeEnd(swipeStartPosition, targetTabIndex, carouselSize);
      });
    }

    function swiping(startPosition, tabIndex) {
      $targetCarousel.on('mousemove touchmove', function() {
        const currentPosition = (event.type === 'touchmove') ? event.touches[0].clientX : event.clientX;
        const positionChange = currentPosition - startPosition;
        const positionUnit = ($(window).width() > 576 && carousel.is_desktop) ? '%' : 'vw';
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
      let $activeElement;
      let currentIndex;

      if (carousel.progress_bar) {
        $activeElement = $carouselTabsContainer.find('[data-tab-active="true"]');
        currentIndex = parseInt($activeElement[0].dataset.tabIndex);
      } else {
        $activeElement = $carouselDots.find('[data-dot-active="true"]');
        currentIndex = parseInt($activeElement[0].dataset.dotIndex);
      }

      if (!carousel.change_going && (newIndex !== currentIndex || type === 'swipe')) {
        carousel.change_going = true;
        changeTabPosition(newIndex, $activeElement);
      }
    }

    function changeTabPosition(newIndex, $activeDot) {
      const $newActiveDot = $carouselDots.find($(`[data-dot-index="${newIndex}"]`));
      const positionUnit = ($(window).width() > 576 && carousel.is_desktop) ? '%' : 'vw'
      const newTabPosition = `-${newIndex * 100}${positionUnit}`;
      let $disabledNav = $targetCarousel.find('[data-nav-disabled="true"]');
      let carouselClass;

      if (carousel.is_desktop && carousel.tabs_disabled) {
        carouselClass = 'custom-carousel';
      } else if (carousel.is_desktop) {
        carouselClass = 'carousel-partners';
      } else {
        carouselClass = 'custom-carousel';
      }

      if (carousel.is_desktop && carousel.tabs_disabled) {
        const $allTabs = $carouselTabsContainer.find(`[data-carousel="tab"]`);
        const $newActiveTab = $carouselTabsContainer.find($(`[data-tab-index="${newIndex}"]`));

        $allTabs.addClass('webdevelopment-blog__posts-list__item--disabled');
        $newActiveTab.removeClass('webdevelopment-blog__posts-list__item--disabled');
      }

      $disabledNav
        .removeClass(`${carouselClass}__nav-item--disabled`)
        .attr('data-nav-disabled', 'false');
      $activeDot
        .removeClass(`${carouselClass}__dots-item--active`)
        .attr('data-dot-active', 'false');
      $newActiveDot
        .addClass(`${carouselClass}__dots-item--active`)
        .attr('data-dot-active', 'true');


      if (newIndex === 0) {
        $disabledNav = $targetCarousel.find($(`[data-nav="prev"]`));
      } else if (newIndex === (carouselSize - 1) ) {
        $disabledNav = $targetCarousel.find($(`[data-nav="next"]`));
      } else {
        $disabledNav = null;
      }

      if ($disabledNav != null) {
        $disabledNav.attr('data-nav-disabled', 'true')
        if (carousel.is_desktop && !carousel.tabs_disabled) {
          $disabledNav.addClass('carousel-partners__nav-item--disabled');
        } else {
          $disabledNav.addClass('custom-carousel__nav-item--disabled');
        }
      }

      $carouselTabsContainer.animate({ left: newTabPosition }, 600, () => {
        carousel.change_going = false;
      });
    }
  }
}, { passive: true })
