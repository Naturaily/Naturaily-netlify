window.addEventListener('load', () => {
  const animationTime = 500;

  const attributes = {
    content: '[testimonials-content]',
    activeCard: 'testimonials-active-card',
    activeLink: 'testimonials-active-link',
    index: 'data-index',
    linkIndex: 'data-link-index',
    autoHeight: 'data-auto-height'
  };

  const $elements = {
    switch: $("[testimonials]"),
    buttons: $("[testimonials-button]"),
    cards: $("[testimonials-cards]"),
    counter: $("[testimonials-counter]"),
    links: $("[testimonials-link]"),
    switcher: $("[testimonials-switcher]")
  };

  let switchData = {
    index: null,
    animating: false,
    size: $($elements.cards).children().length,
    isMobile: false,
    autoHeight: true
  };

  $elements.buttons.click(() => switchMobile());
  $elements.links.click(() => switchLink());

  const switchMobile = () => {
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
    const $activeCard = $(`[${attributes.activeCard}]`);
    const dataUpdate = {
      index: parseInt($activeCard[0].dataset.index),
      isMobile: window.innerWidth < 992
    };

    switchData = {...switchData, ...dataUpdate};
  };

  const moveToCard = (index, direction) => {
    if (index !== switchData.index && !switchData.animating) {
      const newPosition = { left: `${-100 * index}%` };
      const dataUpdate = { index: index, animating: true };
      const endAnimating = () => switchData.animating = false;

      switchData = {...switchData, ...dataUpdate};

      $elements.cards.animate(newPosition, animationTime, endAnimating());
      updateLinks(index);
      updateCards(index);
      updateCounter(index, direction);
    };
  };

  const updateLinks = (index) => {
    const $targetLink = $elements.links.parent().find(`[data-index="${index}"]`);
    const activeLinkClass = 'home-testimonials__switch-menu__item--active';

    $elements.links
      .removeClass(activeLinkClass)
      .removeAttr(attributes.activeLink);
    $targetLink
      .addClass(activeLinkClass)
      .attr(attributes.activeLink, attributes.activeLink);
  }

  const updateCards = (index) => {
    const $activeCard = $elements.cards.find(`[${attributes.activeCard}]`);
    const $newActiveCard = $elements.cards.find(`[${attributes.index}=${index}]`);
    const activeCardClass = 'home-testimonials__switch-card--active';

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
      if (switchData.isMobile && switchData.autoHeight) adjustHeight();
    });

    const adjustHeight = (initialIndex = 0) => {
      const $initialContent = $elements.cards.find(`[${attributes.index}="${initialIndex}"]`).find(attributes.content);
      const $newContent = $elements.cards.find(`[${attributes.activeCard}]`).find(attributes.content);
      const marginChange = $newContent.height() - $initialContent.height();

      $elements.switcher.animate({ 'margin-top': marginChange }, animationTime);
    };
  };
});
