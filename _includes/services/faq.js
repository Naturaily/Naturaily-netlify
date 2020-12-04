window.addEventListener('load', () => {
  const faqAttr = {
    trigger: '[data-type="trigger"]',
    container: '[data-type="faq-container"]',
    index: 'data-content-index',
    arrow: 'data-arrow-status',
    content: 'data-content-status'
  };

  const faqClasses = {
    rotated: 'services-faq__icon--rotated',
    hidden: 'services-faq__text--hidden'
  };

  const $faqTriggers = $(faqAttr.trigger);
  let $faqContainer;

  $faqTriggers.unbind('click').bind('click', (e) => {
    $faqContainer = $(e.target.closest(faqAttr.container));
    const mobileDevice = $(window).width() < 811;
    const faqType = $faqContainer[0].dataset.faqType;

    switch(faqType) {
      case 'home':
        faqClasses.rotated = 'home-hero__text-arrow--rotated';
        faqClasses.hidden = 'home-hero__list--hidden';
      case 'home-switch':
        faqClasses.rotated = 'home-switch__arrow--rotated';
        faqClasses.hidden = 'home-switch--hidden';
      case 'home':
      case 'home-switch':
      case 'standard':
        if (mobileDevice) { runFaq(e); }
        break;
      case 'custom':
        runFaq(e);
        break;
    }
  });

  const runFaq = (e) => {
    const $triggeredElement = $(e.target.closest(faqAttr.trigger));

    const index = $triggeredElement[0].dataset.index;
    const $arrow = $triggeredElement.children().last();
    const $content = $faqContainer.find(`[${faqAttr.index}="${index}"]`);

    const contentStatus = $content[0].dataset.contentStatus;

    if (contentStatus === "visible") {
      hideContent($content, $arrow);
    } else {
      const $visibleContent = $faqContainer.find(`[${faqAttr.content}="visible"]`);
      const $rotatedArrow = $faqContainer.find(`[${faqAttr.arrow}="rotated"]`);

      hideContent($visibleContent, $rotatedArrow);
      showContent($content, $arrow);
    }
  };

  const hideContent = ($element, $arrow) => {
    $arrow
      .removeAttr(faqAttr.arrow)
      .removeClass(faqClasses.rotated);
    $element
      .removeAttr(faqAttr.content)
      .slideUp(300, () => $element.addClass(faqClasses.hidden));
  };

  const showContent = ($element, $arrow) => {
    $arrow
      .attr(faqAttr.arrow, 'rotated')
      .addClass(faqClasses.rotated);
    $element
      .slideDown(300)
      .attr(faqAttr.content, 'visible')
      .removeClass(faqClasses.hidden);
  };
})
