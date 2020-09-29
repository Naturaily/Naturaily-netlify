window.addEventListener('load', () => {
  const triggerAttribute = '[data-type="trigger"]';
  const $faqTriggers = $(triggerAttribute);
  let $faqContainer;

  $faqTriggers.unbind('click').bind('click', (e) => {
    $faqContainer = $(e.target.closest('[data-type="faq-container"]'));
    const faqType = $faqContainer[0].dataset.faqType;
    const mobileDevice = $(window).width() < 811;

    if ((faqType === 'standard' && mobileDevice) || faqType === 'custom') {
      runFaq(e);
    }
  });

  const runFaq = (e) => {
    const $triggeredElement = $(e.target.closest(triggerAttribute));

    const index = $triggeredElement[0].dataset.index;
    const $arrow = $triggeredElement.children().last();
    const $content = $faqContainer.find(`[data-content-index="${index}"]`);

    const contentStatus = $content[0].dataset.contentStatus;

    if (contentStatus === "visible") {
      hideContent($content, $arrow);
    } else {
      const $visibleContent = $faqContainer.find('[data-content-status="visible"]');
      const $rotatedArrow = $faqContainer.find('[data-arrow-status="rotated"]');

      hideContent($visibleContent, $rotatedArrow);
      showContent($content, $arrow);
    }
  };

  const hideContent = ($element, $arrow) => {
    $arrow
      .removeAttr('data-arrow-status')
      .removeClass('services-faq__icon--rotated');
    $element
      .removeAttr('data-content-status')
      .slideUp(600, () => $element.addClass('services-faq__text--hidden'));
  };

  const showContent = ($element, $arrow) => {
    $arrow
      .attr('data-arrow-status', 'rotated')
      .addClass('services-faq__icon--rotated');
    $element
      .slideDown(600)
      .attr('data-content-status', 'visible')
      .removeClass('services-faq__text--hidden');
  };
})
