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
    prevIndex: null,
    index: null,
    animating: false,
    size: $($elements.cards).children().length,
    isMobile: false
  };

  $elements.buttons.click(() => startSwitch());

  const startSwitch = () => {
    setParameters();

    const newIndex = switchData.index + 1 >= switchData.size ? 0 : switchData.index + 1;

    moveToCard(newIndex);
  };

  const setParameters = () => {
    const $activeCard = $elements.switch.find(`[${attributes.activeCard}]`);
    const index = parseInt($activeCard[0].dataset.index);
    const dataUpdate = { prevIndex: index, index: index, isMobile: window.innerWidth < 992 };

    switchData = {...switchData, ...dataUpdate};
  };

  const moveToCard = (index) => {
    if (index !== switchData.index && !switchData.animating) {
      const newPosition = `${-100 * index}%`;
      switchData.index = index;

      animateSwitch(index, newPosition);
      updateCards(index);
      updateCounter(index);
    };
  };

  const gsapAnimateFromRight = (index, position) => {
    const exitToLeft = gsap.timeline({ paused: true });
    const enterFromRight = gsap.timeline({ paused: true });
    switchData.animating = true;

    exitToLeft
      .to(`[gsap-switch-project-${switchData.prevIndex}]`, { duration: .3, x: -50, opacity: 0 })
      .to(`[gsap-switch-title-${switchData.prevIndex}]`, { duration: .3, x: -50, opacity: 0 }, "-=.2")
      .to(`[gsap-switch-text-${switchData.prevIndex}]`, { duration: .3, x: -50, opacity: 0 }, "-=.2")
      .to(`[gsap-switch-specs-${switchData.prevIndex}]`, { duration: .3, x: -50, opacity: 0 }, "-=.2")
      .to(`[gsap-switch-testimonials-${switchData.prevIndex}]`, { duration: .3, x: -50, opacity: 0 }, "-=.7")
      .to(`[gsap-switch-image-${switchData.prevIndex}]`, { duration: .4, x: "-100%" }, "-=.5")
      .to(`[gsap-switch-btn-${switchData.prevIndex}]`, { duration: .4, x: -50, opacity: 0 }, "-=.4")
      .to(`[gsap-switch-next-${switchData.prevIndex}]`, { duration: .4, x: "-100%", opacity: 0 }, "-=.4")
    ;

    enterFromRight
      .from(`[gsap-switch-image-${index}]`, { duration: .4, x: "100%" })
      .from(`[gsap-switch-project-${index}]`, { duration: .3, x: 50, opacity: 0 }, "-=.4")
      .from(`[gsap-switch-title-${index}]`, { duration: .3, x: 50, opacity: 0 })
      .from(`[gsap-switch-text-${index}]`, { duration: .3, x: 50, opacity: 0 }, "-=.2")
      .from(`[gsap-switch-specs-${index}]`, { duration: .3, x: 50, opacity: 0 }, "-=.2")
      .from(`[gsap-switch-testimonials-${index}]`, { duration: .3, x: 50, opacity: 0 }, "-=.7")
      .from(`[gsap-switch-btn-${index}]`, { duration: .4, scale: .9, opacity: 0 })
      .fromTo(`[gsap-switch-next-${index}]`, { y: "170%" }, { duration: .8, y: "0" }, "+=.5")
    ;

    exitToLeft.pause().progress(0).play().eventCallback("onComplete", () => {
      exitToLeft.pause().progress(0);
      $elements.cards.css("left", position);
      enterFromRight.pause().progress(0).play().eventCallback("onComplete", () => {
        switchData.animating = false;
      });
    });
  };

  const animateSwitch = (index, position) => {
    if (switchData.isMobile && !switchData.animating) {
      switchData.animating = true;
      $elements.cards.animate({ left: position }, animationTime, () => { switchData.animating = false; });
    } else if (!switchData.animating) {
      gsapAnimateFromRight(index, position);
    }
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


  const updateCounter = (index) => {
    $elements.counter.animate({ left: '-20px' }, animationTime / 2, () => {
      $elements.counter.css('left', '20px');
      $elements.counter[0].innerHTML = index + 1;
      $elements.counter.animate({ left: '0' }, animationTime / 2);
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
