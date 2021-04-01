window.addEventListener('load', () => {
  const $carouselWrappers = $('[data-carousel="wrapper"]');
  let $targetCarousel;
  let $carouselTabsContainer;
  let $carouselDots;
  let $carouselBar;
  let $activeElement;
  let windowWidth;

  let carousel = {
    size: null,
    scale: 100,
    maxWidth: 811,
    fullWidth: false,
    animationTime: 600,
    changeGoing: false,
    currentTabIndex: null,
    isDesktop: false,
    tabsDisabled: false,
    node: false,
    progressBar: false,
    progressBarScale: 33.3,
    caseDajemy: false
  }

  $carouselWrappers.on('mousedown touchstart', () => {
    $targetCarousel = $(event.target).closest($('[data-carousel="wrapper"]'));
    carousel.isDesktop = $targetCarousel.data('carouselDesktop') ? true : false;
    carousel.progressBar = $targetCarousel.data('progressBar') ? true : false;
    carousel.caseDajemy = $targetCarousel.data('caseDajemy');
    carousel.maxWidth = carousel.progressBar ? 576 : 811;
    windowWidth = $(window).width();

    if (windowWidth < carousel.maxWidth || carousel.isDesktop) initCarousel();
  });

  const initCarousel = () => {
    $carouselTabsContainer = $targetCarousel.find($('[data-carousel="tabs"]'));
    $carouselDots = $targetCarousel.find($('[data-carousel="dots"]'));
    $carouselBar = $targetCarousel.find($('[data-carousel="bar"]'));
    const targetType = event.target.dataset.carousel;

    setCarouselParameters();
    setCarouselControl(targetType, event);
  };

  const setCarouselParameters = () => {
    const parametersUpdate = {
      tabsDisabled: $targetCarousel.data('tabsDisabled') ? true : false,
      node: $targetCarousel.data('node') ? true : false,
      fullWidth: $targetCarousel.data('fullWidth') ? true : false,
      scale: (carousel.progressBar && !carousel.fullWidth) || (carousel.caseDajemy && windowWidth < 576) ? 70 : 100
    };

    carousel = { ...carousel, ...parametersUpdate };

    const $activeContainer = carousel.progressBar ? $carouselTabsContainer : $carouselDots;
    const activeAttribute = carousel.progressBar ? '[data-tab-active="true"]' : '[data-dot-active="true"]';
    $activeElement = $activeContainer.find(activeAttribute);

    const activeElementIndex = carousel.progressBar ? $activeElement[0].dataset.tabIndex : $activeElement[0].dataset.dotIndex;
    carousel.currentTabIndex = parseInt(activeElementIndex);

    if (carousel.progressBar) {
      carousel.size = $carouselTabsContainer.children().length;
    } else if (windowWidth < 811) {
      carousel.size = $carouselDots.children().length;
    } else if (windowWidth > 992) {
      carousel.size = $carouselDots.find('[data-dots="lg"]').length;
    } else {
      carousel.size = $carouselDots.find('[data-dots="md"]').length + $carouselDots.find('[data-dots="lg"]').length;
    }

    if (carousel.size === 5) {
      carousel.progressBarScale = 20;
    } else if (carousel.size === 4) {
      carousel.progressBarScale = 25;
    } else {
      carousel.progressBarScale = 33.3;
    };
  };

  const setCarouselControl = (targetType, event) => {
    if (targetType === 'dots-item') {
      dotsControl()
    } else if (targetType === 'nav-item') {
      navControl();
    } else if (windowWidth < 811) {
      swipeControl(event);
    }
  };

  const dotsControl = () => {
    const newIndex = event.target.dataset.dotIndex;

    if (newIndex) checkChangeRequest(parseInt(newIndex));
  };

  const navControl = () => {
    const previousNav = (event.target.dataset.nav === 'prev');
    const newIndex = previousNav ? carousel.currentTabIndex - 1 : carousel.currentTabIndex + 1;

    if (newIndex >= 0 && newIndex < carousel.size) checkChangeRequest(newIndex);
  };

  const swipeControl = (event) => {
    const usingTouch = event.type === 'touchstart';
    const swipeStartPosition = usingTouch ? event.touches[0].clientX : event.clientX;
    const tabWidth = 0.6 * windowWidth;
    const rightSideClicked = swipeStartPosition > tabWidth;

    swiping(swipeStartPosition);
    $targetCarousel.one('mouseup touchend', () => swipeEnd(swipeStartPosition, rightSideClicked));
  };

  const swiping = (startSwipePosition) => {
    $targetCarousel.on('mousemove touchmove', function() {
      const usingTouch = event.type === 'touchmove';
      const currentSwipePosition = usingTouch ? event.touches[0].clientX : event.clientX;
      const swipePositionChange = currentSwipePosition - startSwipePosition;

      const mobileCarousel = !(windowWidth > 576 && carousel.isDesktop);
      const tabPositionUnit = mobileCarousel ? 'vw' : '%';
      const swipeLeft = swipePositionChange < 0;
      const tabInitialPosition = `-${carousel.currentTabIndex * carousel.scale}${tabPositionUnit}`;
      const tabPositionChange = swipeLeft ? -Math.abs(swipePositionChange) : Math.abs(swipePositionChange);
      const newTabPosition = `calc(${tabInitialPosition} + ${tabPositionChange}px)`;

      $carouselTabsContainer.css('left', newTabPosition);
    });
  };

  const swipeEnd = (startSwipePosition, rightSideClicked) => {
    const usingTouch = event.type === 'touchend';
    const endSwipePosition =  usingTouch ? event.changedTouches[0].clientX : event.clientX;
    const swipePositionChange = startSwipePosition - endSwipePosition;

    const swipeLeft = swipePositionChange < 0;
    const swipeToIndex = swipeLeft ? carousel.currentTabIndex - 1 : carousel.currentTabIndex + 1;
    const switchByTab = carousel.progressBar && !carousel.fullWidth && rightSideClicked && swipePositionChange < 5;

    const swipeEnough = Math.abs(swipePositionChange) > 30;
    const tabExists = (swipeToIndex >= 0 && swipeToIndex < carousel.size);
    const newIndex = tabExists && (swipeEnough || switchByTab) ? swipeToIndex : carousel.currentTabIndex;

    checkChangeRequest(newIndex, 'swipe');
    $targetCarousel.off('mousemove touchmove');
  };

  const checkChangeRequest = (newIndex, type = 'default') => {
    const isChangeProper = (newIndex !== carousel.currentTabIndex || type === 'swipe');

    if (!carousel.changeGoing && isChangeProper) {
      carousel.changeGoing = true;
      changeTabPosition(newIndex);
    }
  };

  const changeTabPosition = (newIndex) => {
    const positionUnit = windowWidth > 576 && carousel.isDesktop ? '%' : 'vw';
    const newTabPosition = `-${newIndex * carousel.scale}${positionUnit}`;
    const newBarWidth = `${(newIndex + 1) * carousel.progressBarScale}%`;

    const webdevelopmentCarousel = carousel.isDesktop && carousel.tabsDisabled;
    const nodeCarousel = webdevelopmentCarousel && carousel.node;
    const includeCarousel = carousel.progressBar;
    let carouselClass = null;

    if (nodeCarousel) {
      carouselClass = 'node-blog';
    } else if (webdevelopmentCarousel) {
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
      carousel.changeGoing = false;
    });
  };

  const changeTabsAttributes = (newIndex, type) => {
    const $allTabs = $carouselTabsContainer.find(`[data-carousel="tab"]`);
    const $newActiveTab = $carouselTabsContainer.find($(`[data-tab-index="${newIndex}"]`));
    let tabsClass = null;

    if (type === 'node-blog') {
      tabsClass = 'node-blog__posts-list__item--disabled';
    } else if (type === 'webdevelopment-blog') {
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
  };

  const changeNavAttributes = (newIndex) => {
    const customCarousel = (carousel.isDesktop && carousel.tabsDisabled) || !carousel.isDesktop;
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
  };
}, { passive: true })
