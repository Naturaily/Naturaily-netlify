window.addEventListener('load', () => {
  const attributes = {
    switch: '[switch]',
    nav: '[switch-nav]',
    arrows: '[switch-arrow]',
    buttons: '[switch-button]',
    cards: '[switch-cards]',
    counter: '[switch-counter]',
    switcher: '[switch-switcher]',
    content: '[switch-content]',
    activeCard: 'switch-active-card',
    index: 'data-index',
    animatedSvg: 'data-animating',
    autoHeight: 'data-auto-height'
  };

  let switchData = {
    index: null,
    animating: false,
    size: null,
    type: null,
    isMobile: false,
    autoHeight: false
  };

  const animationTime = 500;
  const $allNavs = $(attributes.nav);
  const $allArrows = $(attributes.arrows);
  const $allButtons = $(attributes.buttons);
  let $switch;
  let $nav;
  let $arrows;
  let $buttons;
  let $cards;
  let $counter;

  $allNavs.click(() => switchNav());
  $allArrows.click(() => switchArrow());
  $allButtons.click(() => switchArrow());

  const switchNav = () => {
    const newIndex = parseInt($(event.currentTarget)[0].dataset.index);

    setParameters();
    moveToCard(newIndex);
  };

  const switchArrow = () => {
    setParameters();

    const switchDirection = $(event.currentTarget)[0].dataset.direction;
    const newIndex = switchDirection === 'prev' ? switchData.index - 1 : switchData.index + 1;
    const shouldSwitch = switchDirection && newIndex >= 0 && newIndex < switchData.size;

    if (shouldSwitch) moveToCard(newIndex);
  };

  const setParameters = () => {
    $switch = $(event.target).closest($(attributes.switch));
    $nav = $switch.find(attributes.nav);
    $cards = $switch.find(attributes.cards);
    $arrows = $switch.find(attributes.arrows);
    $buttons = $switch.find(attributes.buttons);
    $counter = $switch.find(attributes.counter);

    const $activeCard = $switch.find(`[${attributes.activeCard}]`);
    const dataUpdate = {
      index: parseInt($activeCard[0].dataset.index),
      type: $switch[0].dataset.switchType,
      size: $($cards).children().length,
      isMobile: window.innerWidth < 811,
      autoHeight: $switch[0].dataset.autoHeight
    };

    switchData = {...switchData, ...dataUpdate};
  };

  const moveToCard = (index) => {
    if (index !== switchData.index && !switchData.animating) {
      const newPosition = -100 * index;
      const changeDirection = index > switchData.index ? 'right' : 'left';
      const dataUpdate = {
        index: index,
        animating: true
      };

      switchData = {...switchData, ...dataUpdate};

      $($cards).animate({ left: `${newPosition}%` }, animationTime, () => {
        switchData.animating = false;
        updateCards(index);
      });
      if ($nav) updateNav(index);
      updateArrows(index);
      updateCounter(index, changeDirection);
    };
  };

  const updateNav = (index) => {
    const $navContainer = $nav.parent();
    const $newActiveElem = $navContainer.find(`[${attributes.index}="${index}"]`)
    const activeClass = 'product-design__process-nav__item--active';

    if (switchData.isMobile) {
      const initialPosition = 25;
      const positionChange = 50;
      const newPosition = initialPosition - index * positionChange;

      $($navContainer).animate({ left: `${newPosition}%` }, animationTime);
    };

    $nav.removeClass(activeClass);
    $newActiveElem.addClass(activeClass);
  };

  const updateCards = (index) => {
    const $activeCard = $cards.find(`[${attributes.activeCard}]`);
    const $newActiveCard = $cards.find(`[${attributes.index}=${index}]`);
    const $animatedSvg = $activeCard.find(`[${attributes.animatedSvg}]`);
    const $newAnimatedSvg = $newActiveCard.find(`[${attributes.animatedSvg}]`);
    const animatedClass = 'switch-animated';

    $activeCard.removeAttr(attributes.activeCard);
    $newActiveCard.attr(attributes.activeCard, attributes.activeCard);
    if ($animatedSvg[0]) $animatedSvg.removeClass(animatedClass);
    if ($newAnimatedSvg[0]) $newAnimatedSvg.addClass(animatedClass);
  };

  const updateArrows = (index) => {
    const $prevArrow = $($arrows[0]);
    const $nextArrow = $($arrows[1]);
    const $prevBtn = $($buttons[0]);
    const $nextBtn = $($buttons[1]);

    const arrowHiddenClass = 'product-design__switch-arrow--hidden';
    const buttonHiddenClass = 'product-design__switch-button--disabled';

    $buttons.removeClass(buttonHiddenClass);

    if (index === 0) {
      $prevArrow.addClass(arrowHiddenClass);
      $nextArrow.removeClass(arrowHiddenClass);
      $prevBtn.addClass(buttonHiddenClass);
    } else if (index === switchData.size - 1) {
      $nextArrow.addClass(arrowHiddenClass);
      $prevArrow.removeClass(arrowHiddenClass);
      $nextBtn.addClass(buttonHiddenClass);
    };
  };

  const updateCounter = (index, direction) => {
    const isMoveRight = direction === 'right';
    const initialPosition = isMoveRight ? '-5px' : '20px';
    const secondPosition = isMoveRight ? '20px' : '-5px';
    const finalPosition = '50%';

    const isNumberSingle = (switchData.type === 'process' && switchData.isMobile) || (switchData.type === 'workshop' && !switchData.isMobile);
    const newInnerHTML = isNumberSingle ? index + 1 : `0${index + 1}`;

    $counter.animate({ left: initialPosition }, animationTime / 2, () => {
      $counter.css('left', secondPosition);
      $counter[0].innerHTML = newInnerHTML;
      $counter.animate({ left: finalPosition }, animationTime / 2);
      if (switchData.isMobile && switchData.autoHeight) adjustHeight();
    });

    const adjustHeight = (initialIndex = 0) => {
      const $switcher = $switch.find(attributes.switcher);
      const $initialContent = $cards.find(`[${attributes.index}="${initialIndex}"]`).find(attributes.content);
      const $newContent = $cards.find(`[${attributes.activeCard}]`).find(attributes.content);
      const marginChange = $newContent.height() - $initialContent.height();

      $switcher.animate({ 'margin-top': marginChange }, animationTime);
    };
  };
});
