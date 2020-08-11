window.addEventListener('load', () => {
  const attributes = {
    close: 'slider-close',
    nav: 'slider-nav',
    dotIndex: 'data-dot-index'
  }

  const $slider = $('#servicesSlider');
  const $sliderClose = $(`[${attributes.close}]`);
  const $sliderNav = $(`[${attributes.nav}]`);
  const $sliderNavPrev = $('[slider-nav="prev"]');
  const $sliderNavNext = $('[slider-nav="next"]');
  const $sliderDots = $('[slider-dots]');
  const $sliderCards = $('[slider-card]');
  const $sliderWrapper = $('[slider-wrapper]');

  const sliderType = $slider[0].dataset.type;

  const classes = {
    closeBtn: 'slider-close--hidden',
    hiddenNav: 'slider-arrow--hidden',
    openCard: sliderType === 'product-design' ? 'product-design__accordion-card--opened' : 'services-slider_card--opened'
  }

  const breakpoints = {
    small: 420,
    medium: 576,
    big: 811
  }

  let sliderParams = {
    animationTime: 400,
    breakpoint: sliderType === 'product-design' ? 576 : 420,
    windowWidth: window.innerWidth,
    wrapperWidth: $sliderWrapper.width(),
    sliderWidth: $slider.width(),
    cardWidth: `-${($($sliderCards[0]).width() + 10)}`,
    maxPosition: $sliderWrapper.width() - $slider.width()
  }

  let sliderStatus = {
    inProgress: false,
    isClosing: false,
    currentElement: 0,
    positions: []
  }

  const addPositions = () => {
    const cardsAmount = [...Array($sliderCards.length).keys()];
    const allPositions = cardsAmount.map(key => key * sliderParams.cardWidth);
    const isSliderBelowBreakpoint = sliderParams.windowWidth <= sliderParams.breakpoint;

    if (isSliderBelowBreakpoint) {
      sliderStatus.positions = allPositions;
    } else {
      sliderStatus.positions = allPositions.filter(position => position > sliderParams.maxPosition);
    }

    if (sliderParams.maxPosition === 0)  {
      sliderParams.maxPosition = sliderStatus.positions[sliderStatus.positions.length - 1];
    };
  }

  addPositions();
  if (sliderParams.windowWidth > sliderParams.breakpoint) {
    sliderStatus.positions.push(sliderParams.maxPosition);
  }

  $sliderNav.click((e) => { switchByNav(e) });
  $sliderClose.click((e) => { closeCard(e) });
  $sliderCards.click((e) => { openCard(e) });
  $(window).resize(() => { resetSlider() });

  if (sliderType === 'product-design') {
    $sliderDots.children().click((e) => { switchByDot(e) });
  }

  const switchByNav = (e) => {
    if (!sliderStatus.inProgress) {
      const navType = $(e.currentTarget).attr(attributes.nav);
      const isPositionMax = sliderStatus.currentElement > sliderStatus.positions.length - 1;
      const isPositionMin = sliderStatus.currentElement < 0;
      let newPosition = null;

      if (navType === 'next') {
        newPosition = isPositionMax ? sliderParams.maxPosition : sliderStatus.positions[sliderStatus.currentElement + 1];
        ++sliderStatus.currentElement;
      } else {
        newPosition = isPositionMin ? 0 : sliderStatus.positions[sliderStatus.currentElement - 1];
        --sliderStatus.currentElement;
      }

      sliderStatus.inProgress = true;
      closeAllCards();
      moveToPosition(newPosition);
    }
  }

  const switchByDot = (e) => {
    const dotIndex = $(e.currentTarget).attr(attributes.dotIndex);
    const shouldSliderSwitch = dotIndex !== sliderStatus.currentElement && !sliderStatus.inProgress;

    if (shouldSliderSwitch) {
      const newPosition = sliderStatus.positions[dotIndex];
      const statusUpdate = {
        currentElement: parseInt(dotIndex),
        inProgress: true
      }

      sliderStatus = {...sliderStatus, ...statusUpdate};
      closeAllCards();
      moveToPosition(newPosition);
    }
  }

  const moveToPosition = (newPosition) => {
    const sliderHasDots = sliderType === 'product-design' && sliderParams.windowWidth < breakpoints.medium;

    $slider.animate({ left: newPosition }, sliderParams.animationTime, () => {
      updateNav();
      sliderStatus.inProgress = false;
    });

    if (sliderHasDots) updateDots();
  }

  const updateDots = () => {
    const $newActiveDot = $($sliderDots.find(`[${attributes.dotIndex} = ${sliderStatus.currentElement}]`)[0]);
    const activeDotClass = 'custom-carousel__dots-item--active';

    $sliderDots.children()
      .animate({ height: `5px`, width: `5px`}, sliderParams.animationTime / 2)
      .removeClass(activeDotClass);

    $newActiveDot
      .animate({ height: `10px`, width: `10px`}, sliderParams.animationTime / 2)
      .addClass(activeDotClass);
  }

  const updateNav = () => {
    const currentLeftOffset = parseInt($slider.css('left'), 10);
    const firstElement = sliderStatus.currentElement === 0;
    const lastElement = currentLeftOffset === sliderParams.maxPosition || currentLeftOffset === sliderParams.maxPosition - 360 || sliderStatus.currentElement === $sliderCards.length - 1;
    const isUpdateMobile = sliderParams.windowWidth <= sliderParams.breakpoint;

    if (!isUpdateMobile) $sliderNav.removeClass(classes.hiddenNav);

    if (firstElement) {
      $sliderNavPrev.addClass(classes.hiddenNav);
      if (isUpdateMobile) $sliderNavNext.removeClass(classes.hiddenNav);
    } else if (lastElement) {
      $sliderNavNext.addClass(classes.hiddenNav);
      if (isUpdateMobile) $sliderNavPrev.removeClass(classes.hiddenNav);
    }
  }

  const updateValues = () => {
    const paramsUpdate = {
      breakpoint: sliderType === 'product-design' ? 576 : 420,
      windowWidth: window.innerWidth,
      wrapperWidth: $sliderWrapper.width(),
      sliderWidth: $slider.width(),
      cardWidth: `-${($sliderCards.width() + 10)}`,
      maxPosition: $sliderWrapper.width() - $slider.width()
    };

    const statusUpdate = {
      currentElement: 0,
      positions: []
    };

    sliderParams = {...sliderParams, ...paramsUpdate};
    sliderStatus = {...sliderStatus, ...statusUpdate};

    addPositions();

    if (sliderParams.windowWidth > breakpoints.small) {
      sliderStatus.positions.push(sliderParams.maxPosition);
    }

    updateNav();
  }

  const openCard = (e) => {
    const shouldCardOpen = !sliderStatus.isClosing && (sliderType === 'product-design' || sliderParams.windowWidth > 576);

    if (shouldCardOpen) {
      const areCardsCollapsed = sliderType === 'product-design' && sliderParams.windowWidth < 811;
      const shouldCloseBtnOccur = sliderType !== 'product-design' || sliderParams.windowWidth > 811;
      const clickTarget = $(e.currentTarget);
      const indexOfClickedElem = $sliderCards.index(clickTarget);
      const isElementMax = indexOfClickedElem > sliderStatus.positions.length - 1;
      const openedCardWidth = areCardsCollapsed ? sliderParams.windowWidth : 610;
      const statusUpdate = {
        currentElement: isElementMax ? sliderStatus.positions.length - 2 : indexOfClickedElem,
        inProgress: true
      }

      let newPosition = (indexOfClickedElem * sliderParams.cardWidth) + (sliderParams.wrapperWidth / 2) - (openedCardWidth / 2);

      if (newPosition < (sliderParams.maxPosition - 360)) {
        newPosition = sliderParams.maxPosition - 360;
      } else if (newPosition > 0) {
        newPosition = 0;
      }

      sliderStatus = {...sliderStatus, ...statusUpdate};

      moveToPosition(newPosition);
      closeAllCards();

      clickTarget.addClass(classes.openCard);
      if (shouldCloseBtnOccur) clickTarget.find(`[${attributes.close}]`).removeClass(classes.closeBtn);
    }

    sliderStatus.isClosing = false;
  }

  const closeCard = (e) => {
    const clickTarget = $(e.currentTarget);

    closeAllCards();
    if (parseInt($slider.css('left'), 10) < sliderParams.maxPosition) moveToPosition(sliderParams.maxPosition);
    clickTarget.addClass(classes.closeBtn);
    sliderStatus.isClosing = true;
  }

  const closeAllCards = () => {
    $sliderClose.addClass(classes.closeBtn);
    $sliderCards.removeClass(classes.openCard);
  }

  const resetSlider = () => {
    let endResize = window.endResize;
    clearTimeout(endResize);

    window.endResize = setTimeout(function(){
      $sliderCards.removeClass(classes.openCard);
      updateValues();
      moveToPosition(sliderStatus.positions[0]);
    }, sliderParams.animationTime);
  }
}, { passive: true });
