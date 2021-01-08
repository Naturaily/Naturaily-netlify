window.addEventListener('load', () => {
  const animationTime = 500;

  const attributes = {
    index: 'data-index',
    activeCard: 'switch-active-card',
    autoHeight: 'data-auto-height'
  };

  const $elements = {
    switch: $("[switch]"),
    buttons: $("[switch-button]"),
    cards: $("[switch-cards]"),
    counter: $("[switch-counter]"),
    switcher: $("[switch-switcher]")
  };

  let switchData = {
    index: null,
    animating: false,
    size: $($elements.cards).children().length,
    isMobile: false
  };

  $elements.buttons.click(() => startSwitch());

  const startSwitch = () => {
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

  const setParameters = () => {
    const $activeCard = $elements.switch.find(`[${attributes.activeCard}]`);
    const dataUpdate = {
      index: parseInt($activeCard[0].dataset.index),
      isMobile: window.innerWidth < 992
    };

    switchData = {...switchData, ...dataUpdate};
  };

  const moveToCard = (index, direction) => {
    if (index !== switchData.index && !switchData.animating) {
      const newPosition = { left: `${-100 * index}%` };
      const endAnimating = () => { switchData.animating = false };
      const dataUpdate = {
        index: index,
        animating: true
      };

      switchData = {...switchData, ...dataUpdate};

      $($elements.cards).animate(newPosition, animationTime, endAnimating());
      updateCards(index);
      updateCounter(index, direction);
    };
  };

  const updateCards = (index) => {
    const $activeCard = $elements.cards.find(`[${attributes.activeCard}]`);
    const $newActiveCard = $elements.cards.find(`[${attributes.index}=${index}]`);
    const activeCardClass = 'home-switch-card--active';

    $activeCard
      .removeClass(activeCardClass)
      .removeAttr(attributes.activeCard)
    $newActiveCard
      .addClass(activeCardClass)
      .attr(attributes.activeCard, attributes.activeCard)
  };


  const updateCounter = (index, direction) => {
    const isMoveRight = direction === 'right';
    const initialPosition = isMoveRight ? '0' : '20px';
    const secondPosition = isMoveRight ? '20px' : '0';
    const finalPosition = '50%';

    $elements.counter.animate({ left: initialPosition }, animationTime / 2, () => {
      $elements.counter.css('left', secondPosition);
      $elements.counter[0].innerHTML = index + 1;
      $elements.counter.animate({ left: finalPosition }, animationTime / 2);
      if (switchData.isMobile) adjustHeight();
    });

    const adjustHeight = (initialIndex = 0) => {
      const $switcher = $elements.switch.find(attributes.switcher);
      const $initialContent = $elements.cards.find(`[${attributes.index}="${initialIndex}"]`).find(attributes.content);
      const $newContent = $elements.cards.find(`[${attributes.activeCard}]`).find(attributes.content);
      const marginChange = $newContent.height() - $initialContent.height();

      $switcher.animate({ 'margin-top': marginChange }, animationTime);
    };
  };
});
