window.addEventListener('load', () => {
  const attributes = {
    switch: '[switch]',
    nav: '[switch-nav]',
    arrows: '[switch-arrow]',
    buttons: '[switch-button]',
    cards: '[switch-cards]',
    counter: '[switch-counter]',
    activeCard: '[switch-active-card]',
    index: 'data-index'
  }

  const $allNavs = $(attributes.nav);
  const $allArrows = $(attributes.arrows);
  const $allButtons = $(attributes.buttons);
  let $switch;
  let $nav;
  let $arrows;
  let $buttons;
  let $cards;
  let $counter;

  const animationTime = 500;
  let isMobile;
  let switchSize;
  let switchType;

  let switchStatus = {
    index: null,
    animating: false
  }

  $allNavs.click(() => { switchNav(); });
  $allArrows.click(() => { switchArrow(); });
  $allButtons.click(() => { switchArrow(); });

  const switchNav = () => {
    const newIndex = parseInt($(event.currentTarget)[0].dataset.index);

    setParameters();
    moveToCard(newIndex);
  };

  const switchArrow = () => {
    setParameters();

    const switchDirection = $(event.currentTarget)[0].dataset.direction;
    const newIndex = (switchDirection === 'prev') ? switchStatus.index - 1 : switchStatus.index + 1;
    const shouldSwitch = switchDirection && newIndex >= 0 && newIndex < switchSize;

    if (shouldSwitch) moveToCard(newIndex);
  };

  const setParameters = () => {
    $switch = $(event.target).closest($(attributes.switch));
    $nav = $switch.find(attributes.nav);
    $cards = $switch.find(attributes.cards);
    $arrows = $switch.find(attributes.arrows);
    $buttons = $switch.find(attributes.buttons);
    $counter = $switch.find(attributes.counter);

    switchType = $switch[0].dataset.switchType;
    switchSize = $($cards).children().length;
    isMobile = window.innerWidth < 811;

    const $activeCard = $switch.find(attributes.activeCard);
    switchStatus.index = parseInt($activeCard[0].dataset.index);
  };

  const moveToCard = (index) => {
    if (index !== switchStatus.index && !switchStatus.animating) {
      const newPosition = -100 * index;
      const changeDirection = index > switchStatus.index ? 'right' : 'left';

      switchStatus = {
        index: index,
        animating: true
      }

      $($cards).animate({ left: `${newPosition}%` }, animationTime, () => { switchStatus.animating = false });
      if ($nav) updateNav(index);
      updateCards(index);
      updateArrows(index);
      updateCounter(index, changeDirection);
    }
  };

  const updateNav = (index) => {
    const $navContainer = $nav.parent();
    const $newActiveElem = $navContainer.find(`[${attributes.index}="${index}"]`)
    const activeClass = 'product-design__process-nav__item--active';

    if (isMobile) {
      const initialPosition = 25;
      const positionChange = 50;
      const newPosition = initialPosition - index * positionChange;

      $($navContainer).animate({ left: `${newPosition}%` }, animationTime);
    }

    $nav.removeClass(activeClass);
    $newActiveElem.addClass(activeClass);
  }

  const updateCards = (index) => {
    const activeAttr = 'switch-active-card';
    const $activeCard = $cards.find(`[${activeAttr}]`)
    const $newActiveCard = $cards.find(`[${attributes.index}=${index}]`);

    $activeCard.removeAttr(activeAttr);
    $newActiveCard.attr(activeAttr, activeAttr);
  }

  const updateArrows = (index) => {
    const $prevArrow = $($arrows[0]);
    const $nextArrow = $($arrows[1]);
    const $prevBtn = $($buttons[0]);
    const $nextBtn = $($buttons[1]);

    let arrowHiddenClass;
    let buttonHiddenClass;

    if (switchType === 'process') {
      arrowHiddenClass = 'product-design__process-arrow--hidden';
      buttonHiddenClass = 'product-design__process-button--disabled';
    } else if (switchType === 'design') {
      arrowHiddenClass = 'product-design__design-arrow--hidden';
      buttonHiddenClass = 'product-design__design-button--disabled';
    }

    $buttons.removeClass(buttonHiddenClass);

    if (index === 0) {
      $prevArrow.addClass(arrowHiddenClass);
      $nextArrow.removeClass(arrowHiddenClass);
      $prevBtn.addClass(buttonHiddenClass);
    } else if (index === switchSize - 1) {
      $nextArrow.addClass(arrowHiddenClass);
      $prevArrow.removeClass(arrowHiddenClass);
      $nextBtn.addClass(buttonHiddenClass);
    };
  };

  const updateCounter = (index, direction) => {
    const initialPosition = (direction === 'right') ? '-5px' : '20px';
    const secondPosition = (direction === 'right') ? '20px' : '-5px';
    const finalPosition = '50%';
    const newInnerHTML = (switchType === 'process' && isMobile) ? index + 1 : `0${index + 1}`;

    $counter.animate({ left: initialPosition }, animationTime / 2, () => {
      $counter.css('left', secondPosition);
      $counter[0].innerHTML = newInnerHTML;
      $counter.animate({ left: finalPosition }, animationTime / 2);
    });
  }
})
