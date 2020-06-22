window.addEventListener('load', () => {
  const $faqContainer = $('#services-faq');
  const $faqTriggers = $faqContainer.find('[data-type="trigger"]');

  $faqTriggers.click((e) => {
    const triggeredIndex = e.target.dataset.index;
    const $triggeredArrow = $(e.target).children();
    const $triggeredContent = $faqContainer.find(`[data-content-index="${triggeredIndex}"]`);
    const contentStatus = $triggeredContent[0].dataset.contentStatus;

    if (contentStatus === "visible") {
      $triggeredArrow.removeClass('services-faq__icon--rotated');
      $triggeredContent
        .attr('data-content-status', 'hidden')
        .slideUp(600, () => $triggeredContent.addClass('services-faq__text--hidden'));


    } else if (contentStatus === "hidden") {
      $triggeredArrow.addClass('services-faq__icon--rotated');
      $triggeredContent
        .slideDown(600)
        .attr('data-content-status', 'visible')
        .removeClass('services-faq__text--hidden');
    }
  })
})
