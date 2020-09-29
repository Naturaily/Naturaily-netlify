window.addEventListener('load', () => {
  const attributes = {
    close: 'slider-close',
    nav: 'slider-nav',
    dotIndex: 'data-dot-index'
  };

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
  };

  const breakpoints = {
    small: 420,
    medium: 576,
    big: 811
  };

  let sliderParams = {
    animationTime: 400,
    breakpoint: sliderType === 'product-design' ? 576 : 420,
    windowWidth: window.innerWidth,
    wrapperWidth: $sliderWrapper.width(),
    sliderWidth: $slider.width(),
    cardWidth: `-${($($sliderCards[0]).width() + 10)}`,
    maxPosition: $sliderWrapper.width() - $slider.width()
  };

  let sliderStatus = {
    inProgress: false,
    isClosing: false,
    currentElement: 0,
    positions: [],
    isPositionMin: true,
    isPositionMax: false,
    currentPosition: 0,
    leftOffset: 0
  };

  const addPositions = () => {
    const cardsAmount = [...Array($sliderCards.length).keys()];
    const allPositions = cardsAmount.map(key => key * sliderParams.cardWidth);
    const filteredPositions = allPositions.filter(position => position > sliderParams.maxPosition);
    const isSliderBelowBreakpoint = sliderParams.windowWidth <= sliderParams.breakpoint;
    const lastPosition = sliderStatus.positions[sliderStatus.positions.length - 1];

    sliderStatus.positions = (isSliderBelowBreakpoint) ? allPositions : filteredPositions;

    if (sliderParams.maxPosition === 0) sliderParams.maxPosition = lastPosition;
  };

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

  const updatePositions = () => {
    sliderStatus.leftOffset = parseInt($slider.css('left'), 10);
    const findPosition = position => position <= sliderStatus.leftOffset;
    const maxPosition = sliderStatus.positions[sliderStatus.positions.length - 1];

    const statusUpdate = {
      isPositionMin: sliderStatus.leftOffset >= 0,
      isPositionMax: sliderStatus.leftOffset <= maxPosition
    };

    sliderStatus = {...sliderStatus, ...statusUpdate};

    if (!sliderStatus.isPositionMin && !sliderStatus.isPositionMax) {
      sliderStatus.currentPosition = sliderStatus.positions.findIndex(findPosition);
    };
  };

  const switchByNav = (e) => {
    if (!sliderStatus.inProgress) {
      const navType = $(e.currentTarget).attr(attributes.nav);
      const positions = {
        first: sliderStatus.positions[0],
        last: sliderStatus.positions[sliderStatus.positions.length - 1],
        prev: sliderStatus.positions[sliderStatus.currentPosition - 1],
        next: sliderStatus.positions[sliderStatus.currentPosition + 1],
        new: null
      }

      if (navType === 'next') {
        positions.new = sliderStatus.isPositionMax ? positions.last : positions.next;
      } else {
        positions.new = sliderStatus.isPositionMin ? positions.first : positions.prev;
      }

      sliderStatus.inProgress = true;
      closeAllCards();
      moveToPosition(positions.new);
      updatePositions();
    }
  }

  const switchByDot = (e) => {
    const dotIndex = $(e.currentTarget).attr(attributes.dotIndex);
    const shouldSliderSwitch = dotIndex !== sliderStatus.currentElement && !sliderStatus.inProgress;

    if (shouldSliderSwitch) {
      const newPosition = sliderStatus.positions[dotIndex];
      const statusUpdate = {
        currentElement: parseInt(dotIndex),
        inProgress: true,
        currentPosition: dotIndex
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

    $sliderDots.children().removeClass(activeDotClass);
    $newActiveDot.addClass(activeDotClass);
  }

  const updateNav = () => {
    const isUpdateMobile = sliderParams.windowWidth <= sliderParams.breakpoint;

    updatePositions();

    if (!isUpdateMobile) $sliderNav.removeClass(classes.hiddenNav);

    if (sliderStatus.isPositionMin) {
      $sliderNavPrev.addClass(classes.hiddenNav);
      if (isUpdateMobile) $sliderNavNext.removeClass(classes.hiddenNav);
    } else if (sliderStatus.isPositionMax) {
      $sliderNavNext.addClass(classes.hiddenNav);
      if (isUpdateMobile) $sliderNavPrev.removeClass(classes.hiddenNav);
    }
  };

  const updateValues = () => {
    const initialParams = {
      breakpoint: sliderType === 'product-design' ? 576 : 420,
      windowWidth: window.innerWidth,
      wrapperWidth: $sliderWrapper.width(),
      sliderWidth: $slider.width(),
      cardWidth: `-${($sliderCards.width() + 10)}`,
      maxPosition: $sliderWrapper.width() - $slider.width()
    };

    const initialStatus = {
      currentElement: 0,
      positions: [],
      isPositionMin: true,
      isPositionMax: false,
      currentPosition: 0
    };

    sliderParams = {...sliderParams, ...initialParams};
    sliderStatus = {...sliderStatus, ...initialStatus};

    addPositions();

    if (sliderParams.windowWidth > breakpoints.small) {
      sliderStatus.positions.push(sliderParams.maxPosition);
    }

    updateNav();
  }

  const openCard = (e) => {
    const cardStatus = {
      shouldOpen: !sliderStatus.isClosing && (sliderType === 'product-design' || sliderParams.windowWidth > 576),
      collapsed: sliderType === 'product-design' && sliderParams.windowWidth < 811,
      closeBtn: sliderType !== 'product-design' || sliderParams.windowWidth > 811
    }

    if (cardStatus.shouldOpen) {
      const $clickTarget = $(e.currentTarget);
      const clickIndex = $sliderCards.index($clickTarget);
      const openedCardWidth = cardStatus.collapsed ? sliderParams.windowWidth : 610;
      const maxOpenPosition = sliderParams.maxPosition - 360;
      let newPosition = (clickIndex * sliderParams.cardWidth) + (sliderParams.wrapperWidth / 2) - (openedCardWidth / 2);

      if (newPosition >= 0) {
        newPosition = 0;
      } else if (newPosition <= maxOpenPosition) {
        newPosition = maxOpenPosition;
      }

      const statusUpdate = {
        currentElement: clickIndex,
        inProgress: true
      }

      sliderStatus = {...sliderStatus, ...statusUpdate};

      moveToPosition(newPosition);
      updatePositions();
      closeAllCards();

      $clickTarget.addClass(classes.openCard);
      if (cardStatus.closeBtn) $clickTarget.find(`[${attributes.close}]`).removeClass(classes.closeBtn);
    }

    sliderStatus.isClosing = false;
  }

  const closeCard = (e) => {
    const $clickTarget = $(e.currentTarget);

    closeAllCards();
    if (parseInt($slider.css('left'), 10) < sliderParams.maxPosition) moveToPosition(sliderParams.maxPosition);
    $clickTarget.addClass(classes.closeBtn);
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
