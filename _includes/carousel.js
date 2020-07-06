window.addEventListener('load', () => {
  const $carouselWrappers = $('[data-carousel="wrapper"]');
  let $targetCarousel;
  let $carouselTabsContainer;
  let $carouselDots;
  let $carouselBar;
  let $activeElement;
  let windowWidth;

  const carousel = {
    size: null,
    scale: 100,
    max_width: 811,
    animationTime: 600,
    change_going: false,
    current_tab_index: null,
    is_desktop: false,
    tabs_disabled: false,
    progress_bar: false,
    progress_bar_scale: 33.3
  }

  $carouselWrappers.on('mousedown touchstart', () => {
    $targetCarousel = $(event.target).closest($('[data-carousel="wrapper"]'));
    carousel.is_desktop = $targetCarousel.data('carouselDesktop') ? true : false;
    carousel.progress_bar = $targetCarousel.data('progressBar') ? true : false;
    carousel.max_width = carousel.progress_bar ? 576 : 811;
    windowWidth = $(window).width();

    if (windowWidth < carousel.max_width || carousel.is_desktop) initCarousel();
  });

  function initCarousel() {
    $carouselTabsContainer = $targetCarousel.find($('[data-carousel="tabs"]'));
    $carouselDots = $targetCarousel.find($('[data-carousel="dots"]'));
    $carouselBar = $targetCarousel.find($('[data-carousel="bar"]'));
    const targetType = event.target.dataset.carousel;

    setCarouselParameters();
    setCarouselControl(targetType, event);
  }

  function setCarouselParameters() {
    carousel.tabs_disabled = $targetCarousel.data('tabsDisabled') ? true : false;
    carousel.scale = carousel.progress_bar ? 70 : 100;

    const $activeContainer = carousel.progress_bar ? $carouselTabsContainer : $carouselDots;
    const activeAttribute = carousel.progress_bar ? '[data-tab-active="true"]' : '[data-dot-active="true"]';
    $activeElement = $activeContainer.find(activeAttribute);

    const activeElementIndex = carousel.progress_bar ? $activeElement[0].dataset.tabIndex : $activeElement[0].dataset.dotIndex;
    carousel.current_tab_index = parseInt(activeElementIndex);

    if (carousel.progress_bar) {
      carousel.size = $carouselTabsContainer.children().length;
    } else if (windowWidth < 811) {
      carousel.size = $carouselDots.children().length;
    } else if (windowWidth > 992) {
      carousel.size = $carouselDots.find('[data-dots="lg"]').length;
    } else {
      carousel.size = $carouselDots.find('[data-dots="md"]').length + $carouselDots.find('[data-dots="lg"]').length;
    }
  }

  function setCarouselControl(targetType, event) {
    if (targetType === 'dots-item') {
      dotsControl()
    } else if (targetType === 'nav-item') {
      navControl();
    } else if (windowWidth < 811) {
      swipeControl(event);
    }
  }

  function dotsControl() {
    const newIndex = event.target.dataset.dotIndex;

    if (newIndex) checkChangeRequest(parseInt(newIndex));
  }

  function navControl() {
    const previousNav = (event.target.dataset.nav === 'prev');
    const newIndex = previousNav ? carousel.current_tab_index - 1 : carousel.current_tab_index + 1;

    if (newIndex >= 0 && newIndex < carousel.size) checkChangeRequest(newIndex);
  }

  function swipeControl(event) {
    const usingTouch = event.type === 'touchstart';
    const swipeStartPosition = usingTouch ? event.touches[0].clientX : event.clientX;
    const tabWidth = 0.6 * windowWidth;
    const rightSideClicked = swipeStartPosition > tabWidth;

    swiping(swipeStartPosition);
    $targetCarousel.one('mouseup touchend', () => swipeEnd(swipeStartPosition, rightSideClicked));
  }

  function swiping(startSwipePosition) {
    $targetCarousel.on('mousemove touchmove', function() {
      const usingTouch = event.type === 'touchmove';
      const currentSwipePosition = usingTouch ? event.touches[0].clientX : event.clientX;
      const swipePositionChange = currentSwipePosition - startSwipePosition;

      const mobileCarousel = !(windowWidth > 576 && carousel.is_desktop);
      const tabPositionUnit = mobileCarousel ? 'vw' : '%';
      const swipeLeft = swipePositionChange < 0;
      const tabInitialPosition = `-${carousel.current_tab_index * carousel.scale}${tabPositionUnit}`;
      const tabPositionChange = swipeLeft ? -Math.abs(swipePositionChange) : Math.abs(swipePositionChange);
      const newTabPosition = `calc(${tabInitialPosition} + ${tabPositionChange}px)`;

      $carouselTabsContainer.css('left', newTabPosition);
    });
  }

  function swipeEnd(startSwipePosition, rightSideClicked) {
    const usingTouch = event.type === 'touchend';
    const endSwipePosition =  usingTouch ? event.changedTouches[0].clientX : event.clientX;
    const swipePositionChange = startSwipePosition - endSwipePosition;

    const swipeLeft = swipePositionChange < 0;
    const swipeToIndex = swipeLeft ? carousel.current_tab_index - 1 : carousel.current_tab_index + 1;
    const switchByTab = carousel.progress_bar && rightSideClicked && swipePositionChange < 5;

    const swipeEnough = Math.abs(swipePositionChange) > 30;
    const tabExists = (swipeToIndex >= 0 && swipeToIndex < carousel.size);
    const newIndex = (swipeEnough && tabExists) || switchByTab ? swipeToIndex : carousel.current_tab_index;

    checkChangeRequest(newIndex, 'swipe');
    $targetCarousel.off('mousemove touchmove');
  }

  function checkChangeRequest(newIndex, type = 'default') {
    const isChangeProper = (newIndex !== carousel.current_tab_index || type === 'swipe');

    if (!carousel.change_going && isChangeProper) {
      carousel.change_going = true;
      changeTabPosition(newIndex);
    }
  }

  function changeTabPosition(newIndex) {
    const positionUnit = windowWidth > 576 && carousel.is_desktop ? '%' : 'vw';
    const newTabPosition = `-${newIndex * carousel.scale}${positionUnit}`;
    const newBarWidth = `${(newIndex + 1) * carousel.progress_bar_scale}%`;

    const blogCarousel = carousel.is_desktop && carousel.tabs_disabled;
    const includeCarousel = carousel.progress_bar;
    let carouselClass = null;

    if (blogCarousel) {
      carouselClass = 'webdevelopment-blog';
    } else if (includeCarousel) {
      carouselClass = 'services-include';
    }

    if (carouselClass) changeTabsAttributes(newIndex, carouselClass);
    if (includeCarousel) {
      $carouselBar.animate({ width: newBarWidth }, carousel.animationTime);
    } else {
      changeNavAttributes(newIndex);
    }

    $carouselTabsContainer.animate({ left: newTabPosition }, carousel.animationTime, () => {
      carousel.change_going = false;
    });
  }

  function changeTabsAttributes(newIndex, type) {
    const $allTabs = $carouselTabsContainer.find(`[data-carousel="tab"]`);
    const $newActiveTab = $carouselTabsContainer.find($(`[data-tab-index="${newIndex}"]`));
    let tabsClass = null;

    if (type === 'webdevelopment-blog') {
      tabsClass = 'webdevelopment-blog__posts-list__item--disabled';
    } else if (type === 'services-include') {
      tabsClass = 'custom-carousel__tabs-tab--inactive';
    }

    $allTabs
      .addClass(tabsClass)
      .attr('data-tab-active', 'false');
    $newActiveTab
      .removeClass(tabsClass)
      .attr('data-tab-active', 'true');
  }

  function changeNavAttributes(newIndex) {
    const customCarousel = (carousel.is_desktop && carousel.tabs_disabled) || !carousel.is_desktop;
    const carouselClass = customCarousel ? 'custom-carousel' : 'carousel-partners';
    const firstIndex = 0;
    const lastIndex = carousel.size - 1;

    const $disabledNav = $targetCarousel.find('[data-nav-disabled="true"]');
    const $newActiveDot = $carouselDots.find($(`[data-dot-index="${newIndex}"]`));
    const $previousNavBtn = $targetCarousel.find($(`[data-nav="prev"]`));
    const $nextNavBtn = $targetCarousel.find($(`[data-nav="next"]`));
    let $newDisabledNav = null;

    if (newIndex === firstIndex) {
      $newDisabledNav = $previousNavBtn;
    } else if (newIndex === lastIndex) {
      $newDisabledNav = $nextNavBtn;
    }

    $disabledNav
      .removeClass(`${carouselClass}__nav-item--disabled`)
      .attr('data-nav-disabled', 'false');
    $activeElement
      .removeClass(`${carouselClass}__dots-item--active`)
      .attr('data-dot-active', 'false');
    $newActiveDot
      .addClass(`${carouselClass}__dots-item--active`)
      .attr('data-dot-active', 'true');

    if ($newDisabledNav) {
      $newDisabledNav
        .attr('data-nav-disabled', 'true')
        .addClass(`${carouselClass}__nav-item--disabled`);
    }
  }
}, { passive: true })
