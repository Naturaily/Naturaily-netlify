window.addEventListener('load', () => {
  const animationTime = 500;

  const attributes = {
    content: '[testimonials-content]',
    activeCard: 'testimonials-active-card',
    activeLink: 'testimonials-active-link',
    index: 'data-index',
    linkIndex: 'data-link-index',
    cardWrapper: '[testimonials-card-wrapper]'
  };

  const $elements = {
    switch: $("[testimonials]"),
    buttons: $("[testimonials-button]"),
    cards: $("[testimonials-cards]"),
    counter: $("[testimonials-counter]"),
    links: $("[testimonials-link]"),
    switcher: $("[testimonials-switcher]"),
    menu: $("[testimonials-menu]")
  };

  let switchData = {
    prevIndex: null,
    index: null,
    animating: false,
    size: $($elements.cards).children().length,
    isMobile: false,
    autoHeight: true,
    height: 470
  };

  const adjustCardsHeight = () => {
    const activeCardHeight = $(`[${attributes.activeCard}]`).find(attributes.cardWrapper).height();
    const maxCardHeight = $elements.cards.height();
    const adjustedHeight = maxCardHeight - (maxCardHeight - activeCardHeight) + 100;

    $elements.cards.css('height', `${adjustedHeight}px`);
  };

  if (window.innerWidth < 992) adjustCardsHeight();
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
    const index = $(`[${attributes.activeCard}]`)[0].dataset.index;
    const dataUpdate = {
      prevIndex: parseInt(index),
      index: parseInt(index),
      isMobile: window.innerWidth < 992
    };

    switchData = {...switchData, ...dataUpdate};
  };

  const moveToCard = (index, direction) => {
    if (index !== switchData.index && !switchData.animating) {
      const dataUpdate = { index: index, animating: true };
      switchData = {...switchData, ...dataUpdate};

      animateCards(index, direction);
      updateLinks(index);
      updateCards(index);
      updateCounter(index, direction);
    };
  };

  const animateCards = (index, direction) => {
    const newPosition = switchData.isMobile ? { left: `${-100 * index}%` } : `${-switchData.height * index}px`;
    const endAnimating = () => switchData.animating = false;

    if (switchData.isMobile) {
      animateCardsMobile(newPosition);
      endAnimating();
    } else {
      (direction === 'prev') ? gsapAnimateFromTop(index, newPosition) : gsapAnimateFromBottom(index, newPosition);
      endAnimating();
    }
  };

  const animateCardsMobile = (newPosition) => {
    const $prevCard = $elements.cards.find(`[${attributes.index}="${switchData.prevIndex}"]`);
    const $activeCard = $elements.cards.find(`[${attributes.index}="${switchData.index}"]`);
    const maxCardHeight = $elements.cards.height();
    const prevCardHeight = $prevCard.find(attributes.cardWrapper).height();
    const activeCardHeight = $activeCard.find(attributes.cardWrapper).height();
    const adjustedHeight = maxCardHeight - (maxCardHeight - activeCardHeight) + 100;

    if (prevCardHeight < activeCardHeight) {
      $elements.cards
        .animate(newPosition, animationTime)
        .css('height', `${adjustedHeight}px`);
    } else {
      $elements.cards.animate(newPosition, animationTime, () => {
        $elements.cards.css('height', `${adjustedHeight}px`);
      });
    };
  };

  const gsapAnimateFromBottom = (index, position) => {
    const exitToTop = gsap.timeline({ paused: true });
    const enterFromBelow = gsap.timeline({ paused: true });

    exitToTop
      .to(`[gsap-testimonials-logo-${switchData.prevIndex}]`, { duration: .3, y: -50, opacity: 0 })
      .to(`[gsap-testimonials-nps-${switchData.prevIndex}]`, { duration: .3, y: -25 }, "-=.3")
      .to(`[gsap-testimonials-text-${switchData.prevIndex}]`, { duration: .3, y: -50, opacity: 0 }, "-=.2")
      .to(`[gsap-testimonials-credits-${switchData.prevIndex}]`, { duration: .3, y: -50, opacity: 0 }, "-=.2");

    enterFromBelow
      .from(`[gsap-testimonials-logo-${index}]`, { duration: .3, y: 50, opacity: 0 })
      .from(`[gsap-testimonials-nps-${index}]`, { duration: .3, y: 25 }, "-=.3")
      .from(`[gsap-testimonials-text-${index}]`, { duration: .3, y: 50, opacity: 0 }, "-=.2")
      .from(`[gsap-testimonials-credits-${index}]`, { duration: .3, y: 50, opacity: 0 }, "-=.2");

    exitToTop.pause().progress(0).play().eventCallback("onComplete", () => {
      $elements.cards.css("top", position);
      enterFromBelow.pause().progress(0).play();
      exitToTop.pause().progress(0);
    });
  };

  const gsapAnimateFromTop = (index, position) => {
    const exitToBottom = gsap.timeline({ paused: true });
    const enterFromTop = gsap.timeline({ paused: true });

    exitToBottom
      .to(`[gsap-testimonials-logo-${switchData.prevIndex}]`, { duration: .3, y: 50, opacity: 0 })
      .to(`[gsap-testimonials-nps-${switchData.prevIndex}]`, { duration: .3, y: 25 }, "-=.3")
      .to(`[gsap-testimonials-text-${switchData.prevIndex}]`, { duration: .3, y: 50, opacity: 0 }, "-=.2")
      .to(`[gsap-testimonials-credits-${switchData.prevIndex}]`, { duration: .3, y: 50, opacity: 0 }, "-=.2");

    enterFromTop
      .from(`[gsap-testimonials-logo-${index}]`, { duration: .3, y: -50, opacity: 0 })
      .from(`[gsap-testimonials-nps-${index}]`, { duration: .3, y: -25 }, "-=.3")
      .from(`[gsap-testimonials-text-${index}]`, { duration: .3, y: -50, opacity: 0 }, "-=.2")
      .from(`[gsap-testimonials-credits-${index}]`, { duration: .3, y: -50, opacity: 0 }, "-=.2")
    ;

    exitToBottom.pause().progress(0).play().eventCallback("onComplete", () => {
      $elements.cards.css("top", position);
      enterFromTop.pause().progress(0).play();
      exitToBottom.pause().progress(0);
    });
  };

  const updateLinks = (index) => {
    const $targetLink = $elements.links.parent().find(`[data-index="${index}"]`);
    const activeLinkClass = 'home-testimonials__switch-menu__item--active';
    const movedMenuClass = 'home-testimonials__switch-menu__list--moved';

    $elements.links
      .removeClass(activeLinkClass)
      .removeAttr(attributes.activeLink);
    $targetLink
      .addClass(activeLinkClass)
      .attr(attributes.activeLink, attributes.activeLink);

    $elements.menu.removeClass(movedMenuClass);
    if (index >= 5) $elements.menu.addClass(movedMenuClass);
  };

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
