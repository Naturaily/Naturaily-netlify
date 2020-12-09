window.addEventListener('load', () => {
  const attributes = {
    switch: '[switch]',
    buttons: '[switch-button]',
    links: '[switch-link]',
    cards: '[switch-cards]',
    counter: '[switch-counter]',
    switcher: '[switch-switcher]',
    content: '[switch-content]',
    activeCard: 'switch-active-card',
    index: 'data-index',
    linkIndex: 'data-link-index',
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
  const $allButtons = $(attributes.buttons);
  const $allLinks = $(attributes.links);
  let $switch;
  let $arrows;
  let $buttons;
  let $cards;
  let $counter;
  let $links;

  $allButtons.click(() => switchArrow());
  $allLinks.click(() => switchLink());

  const switchArrow = () => {
    setParameters();

    let switchDirection = $(event.currentTarget)[0].dataset.direction;
    let newIndex = switchDirection === 'prev' ? switchData.index - 1 : switchData.index + 1;

    if (newIndex < 0) {
      newIndex = switchData.size - 1;
      switchDirection = 'prev';
    } else if (newIndex >= switchData.size) {
      newIndex = 0;
      switchDirection = 'next';
    }

    moveToCard(newIndex, switchDirection);
  };

  const switchLink = () => {
    setParameters();

    const targetIndex = parseInt($(event.currentTarget)[0].dataset.index);
    const switchDirection = switchData.index > targetIndex ? 'prev' : 'next';

    moveToCard(targetIndex, switchDirection);
  };

  const setParameters = () => {
    $switch = $(event.target).closest($(attributes.switch));
    $cards = $switch.find(attributes.cards);
    $buttons = $switch.find(attributes.buttons);
    $counter = $switch.find(attributes.counter);
    $links = $switch.find(attributes.links);

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

  const moveToCard = (index, direction) => {
    if (index !== switchData.index && !switchData.animating) {
      const newPosition = -100 * index;
      const dataUpdate = {
        index: index,
        animating: true
      };

      switchData = {...switchData, ...dataUpdate};

      $($cards).animate({ left: `${newPosition}%` }, animationTime, () => { switchData.animating = false });
      if ($links) { updateLinks(index); }
      updateCards(index);
      updateCounter(index, direction);
    };
  };

  const updateLinks = (index) => {
    const $targetLink = $allLinks.parent().find(`[data-index="${index}"]`);
    const activeLinkClass = 'home-testimonials__switch-menu__item--active';

    $allLinks.removeClass(activeLinkClass);
    $targetLink.addClass(activeLinkClass);
  }

  const updateCards = (index) => {
    const $activeCard = $cards.find(`[${attributes.activeCard}]`);
    const $newActiveCard = $cards.find(`[${attributes.index}=${index}]`);

    $activeCard.removeAttr(attributes.activeCard);
    $newActiveCard.attr(attributes.activeCard, attributes.activeCard);
  };


  const updateCounter = (index, direction) => {
    const isMoveRight = direction === 'right';
    const initialPosition = isMoveRight ? '0' : '20px';
    const secondPosition = isMoveRight ? '20px' : '0';
    const finalPosition = '50%';

    $counter.animate({ left: initialPosition }, animationTime / 2, () => {
      $counter.css('left', secondPosition);
      $counter[0].innerHTML = index + 1;
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
