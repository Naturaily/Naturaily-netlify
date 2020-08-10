window.addEventListener('load', () => {
  const sliderCloseAttr = 'slider-close';
  const sliderNavAttr = 'slider-nav';
  const dotIndexAttr = 'data-dot-index';

  const $slider = $('#servicesSlider');
  const $sliderClose = $(`[${sliderCloseAttr}]`);
  const $sliderNav = $(`[${sliderNavAttr}]`);
  const $sliderNavPrev = $('[slider-nav="prev"]');
  const $sliderNavNext = $('[slider-nav="next"]');
  const $sliderDots = $('[slider-dots]');
  const $sliderCards = $('[slider-card]');
  const $sliderWrapper = $('[slider-wrapper]');

  const animationTime = 400;
  const sliderType = $slider[0].dataset.type;

  const closeButtonClass = 'slider-close--hidden';
  const hiddenNavClass = 'slider-arrow--hidden';
  const openCardClass = sliderType === 'product-design' ? 'product-design__accordion-card--opened' : 'services-slider_card--opened';

  const windowWidth = window.innerWidth;
  const openedCardWidth = 610;
  let wrapperWidth = $sliderWrapper.width();
  let sliderWidth = $slider.width();
  let maxPosition = wrapperWidth - sliderWidth;
  let cardWidth = `-${($($sliderCards[0]).width() + 10)}`;

  let inProgress = false;
  let isClosing = false;
  let currentElement = 0;
  let positions = [];

  const addPositions = () => {
    const cardsAmount = [...Array($sliderCards.length).keys()];
    const allPositions = cardsAmount.map(key => key * cardWidth);

    positions = windowWidth <= 420 ? allPositions : allPositions.filter(position => position > maxPosition);

    if (maxPosition === 0) maxPosition = positions[positions.length - 1];
  }

  addPositions();
  if (windowWidth > 420) positions.push(maxPosition);

  $sliderNav.click((e) => { switchByNav(e) });
  $sliderClose.click((e) => { closeCard(e) });
  $sliderCards.click((e) => { openCard(e) });
  $(window).resize(() => { resetSlider() });

  if (sliderType === 'product-design') {
    $sliderDots.children().click((e) => { switchByDot(e) });
  }

  const switchByNav = (e) => {
    const navType = $(e.currentTarget).attr(sliderNavAttr);
    let newPosition = null;

    if (!inProgress) {
      if (navType === 'next') {
        newPosition = currentElement < positions.length - 1 ? positions[currentElement + 1] : maxPosition;
        ++currentElement;
      } else {
        newPosition = currentElement > 0 ? positions[currentElement - 1] : 0;
        --currentElement;
      }

      inProgress = true;
      closeAllCards();
      moveToPosition(newPosition);
    }
  }

  const switchByDot = (e) => {
    const dotIndex = $(e.currentTarget).attr(dotIndexAttr);

    if (dotIndex !== currentElement && !inProgress) {
      let newPosition = null;

      if (dotIndex > currentElement) {
        newPosition = currentElement < positions.length - 1 ? positions[dotIndex] : maxPosition;
      } else {
        newPosition = currentElement > 0 ? positions[dotIndex] : 0;
      }

      currentElement = parseInt(dotIndex);
      inProgress = true;
      closeAllCards();
      moveToPosition(newPosition);
    }
  }

  const moveToPosition = (newPosition) => {
    $slider.animate({ left: newPosition }, animationTime, () => {
      updateNav();

      inProgress = false;
    });

    if (sliderType === 'product-design') updateDots();
  }

  const updateDots = () => {
    const $newActiveDot = $($sliderDots.find(`[${dotIndexAttr} = ${currentElement}]`)[0]);
    const activeDotClass = 'custom-carousel__dots-item--active';

    $sliderDots.children()
      .animate({ height: `5px`, width: `5px`}, animationTime / 2)
      .removeClass(activeDotClass);
    $newActiveDot
      .animate({ height: `10px`, width: `10px`}, animationTime / 2)
      .addClass(activeDotClass);
  }

  const updateNav = () => {
    const currentLeftOffset = parseInt($slider.css('left'), 10);

    if (currentElement === 0) {
      $sliderNavPrev.addClass(hiddenNavClass);
      $sliderNavNext.removeClass(hiddenNavClass);
    } else if (currentLeftOffset === maxPosition || currentLeftOffset === maxPosition - 360) {
      $sliderNavPrev.removeClass(hiddenNavClass);
      $sliderNavNext.addClass(hiddenNavClass);
    } 
  }

  const updateValues = () => {
    wrapperWidth = $sliderWrapper.width();
    sliderWidth = $slider.width();
    maxPosition = wrapperWidth - sliderWidth;
    cardWidth = `-${($sliderCards.width() + 10)}`;
    currentElement = 0;
    positions = [];

    addPositions();
    if(windowWidth > 420) positions.push(maxPosition);
    updateNav();
  }

  const openCard = (e) => {
    if (!isClosing && windowWidth > 576) {
      const clickTarget = $(e.currentTarget);
      const indexOfClickedElem = $sliderCards.index(clickTarget);
      let newPosition = (indexOfClickedElem * cardWidth) + (wrapperWidth / 2) - (openedCardWidth / 2);

      currentElement = indexOfClickedElem < positions.length - 1 ? indexOfClickedElem : positions.length - 2;

      if (newPosition < (maxPosition - 360)) {
        newPosition = maxPosition - 360;
      } else if (newPosition > 0) {
        newPosition = 0;
      }

      inProgress = true;

      moveToPosition(newPosition);
      closeAllCards();

      clickTarget.addClass(openCardClass);
      clickTarget.find(`[${sliderCloseAttr}]`).removeClass(closeButtonClass);
    }

    isClosing = false;
  }

  const closeCard = (e) => {
    const clickTarget = $(e.currentTarget);

    closeAllCards();
    if (parseInt($slider.css('left'), 10) < maxPosition) moveToPosition(maxPosition);
    clickTarget.addClass(closeButtonClass);
    isClosing = true;
  }

  const closeAllCards = () => {
    $sliderClose.addClass(closeButtonClass);
    $sliderCards.removeClass(openCardClass);
  }

  const resetSlider = () => {
    let endResize = window.endResize;
    clearTimeout(endResize);

    window.endResize = setTimeout(function(){
      $sliderCards.removeClass(openCardClass);
      updateValues();
      moveToPosition(positions[0]);
    }, animationTime);
  }
}, { passive: true });
