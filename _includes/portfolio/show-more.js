window.addEventListener('load', () => {
  showMoreReviews();
  showMoreCases();

  function showMoreReviews() {
    const $reviewsButton = $('#portfolio-trigger');
    const $reviewsContainer = $('#portfolio-reviews');
    const $hiddenReviews  = $reviewsContainer.find('[data-review="hidden"]');

    $reviewsButton.click(() => {
      $hiddenReviews.slideDown(600);
      $reviewsButton.css('display', 'none');
    })
  }

  function showMoreCases() {
    const $casesButton = $('#cases-trigger');
    const $casesContainer = $('#cases-container');
    const $casesShadow = $('#cases-shadow');

    $casesButton.unbind('click').bind('click', () => {
      if ($(window).width() < 811) {
        mobileAccordion($casesButton, $casesContainer, $casesShadow);
      } else if ($(window).width() < 992) {
        mobileAccordion($casesButton, $casesContainer);
      } else {
        desktopAccordion($casesButton, $casesContainer);
      }
    });
  }

  mobileAccordion = ($button, $cases, $shadow = null) => {
    const isSectionCollapsed = $button[0].dataset.collapsed ? true : false;
    const $casesToShow = isSectionCollapsed ? $cases.find('[data-mobile="first-hidden"]') : $cases.find('[data-mobile="second-hidden"]');
    const $secondShadowedCase = $cases.find('[data-mobile="second-hidden"]').first();

    if ($shadow) {
      $casesToShow.first().animate({ 'margin-bottom': 0 }, 600);

      setTimeout(() => {
        animateAccordion($casesToShow, 'sm');
        $secondShadowedCase.addClass('portfolio-case--shadowed-sm');
        animateAccordion($secondShadowedCase, 'sm');
      }, 300);
    } else {
      animateAccordion($casesToShow, 'sm');
    }

    (isSectionCollapsed) ? $button.removeAttr('data-collapsed') : removeAccordion($button, $shadow);
  }

  desktopAccordion = ($button, $cases) => {
    const $casesToShow = $cases.find('[data-desktop="hidden"]');
    animateAccordion($casesToShow, 'lg');
    removeAccordion($button);
  }

  animateAccordion = ($casesToShow, elementsClass) => {
    $casesToShow
      .slideDown(600)
      .animate({ 'opacity': 1 }, 600)
      .removeClass(`portfolio-case--hidden-${elementsClass}`);
  }

  removeAccordion = ($button, $shadow = null) => {
    $button.css('display', 'none');
    ($shadow) ? $shadow.css('display', 'none') : '';
  }
})
