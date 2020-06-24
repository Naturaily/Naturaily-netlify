window.addEventListener('load', () => {
  const $faqContainer = $('#services-faq');
  const $faqTriggers = $faqContainer.find('[data-type="trigger"]');

  $faqTriggers.click((e) => {
    const triggeredIndex = e.target.dataset.index;
    const $triggeredArrow = $(e.target).children();
    const $triggeredContent = $faqContainer.find(`[data-content-index="${triggeredIndex}"]`);
    const contentStatus = $triggeredContent[0].dataset.contentStatus;

    if (contentStatus === "visible") {
      hideContent($triggeredContent, $triggeredArrow);
    } else {
      const $visibleContent = $faqContainer.find(`[data-content-status="visible"]`);
      const $rotatedArrow = $faqContainer.find(`[data-dot-status="rotated"]`);
      
      hideContent($visibleContent, $rotatedArrow);
      showContent($triggeredContent, $triggeredArrow);
    }
  })

  function hideContent($element, $arrow) {
    $arrow
      .removeAttr('data-dot-status')
      .removeClass('services-faq__icon--rotated');
    $element
      .removeAttr('data-content-status')
      .slideUp(600, () => $element.addClass('services-faq__text--hidden'));
  }

  function showContent($element, $arrow) {
    $arrow
      .attr('data-dot-status', 'rotated')
      .addClass('services-faq__icon--rotated');
    $element
      .slideDown(600)
      .attr('data-content-status', 'visible')
      .removeClass('services-faq__text--hidden');
  }
})
