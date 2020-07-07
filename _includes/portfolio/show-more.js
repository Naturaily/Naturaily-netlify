window.addEventListener('load', () => {
  const $reviewsContainer = $('#portfolio-reviews');
  const $reviewsButton = $('#portfolio-trigger');
  const $reviewsShadow = $('#portfolio-shadow');

  const $casesContainer = $('#cases-container');
  const $casesButton = $('#cases-trigger');
  const $casesShadow = $('#cases-shadow');

  let accordionHasShadow = false;

  const classes = {
    mobile: 'sm',
    mobileShadowed: 'portfolio-case--shadowed-sm',
    desktop: 'lg',
  };

  const attributes = {
    hiddenReviews: '[data-review="hidden"]',
    hiddenCases: '[data-desktop="hidden"]',
    firstCasesSet: '[data-mobile="first-hidden"]',
    secondCasesSet: '[data-mobile="second-hidden"]',
    collapsed: 'data-collapsed'
  };

  const times = {
    short: 300,
    long: 600
  };

  $reviewsButton.click(() => showMoreReviews());
  $reviewsContainer.scroll(() => fadeOutShadow());

  $casesButton.unbind('click').bind('click', () => {
    const windowWidth = $(window).width();

    accordionHasShadow = windowWidth < 811;
    windowWidth < 992 ? mobileAccordion() : desktopAccordion();
  });

  const fadeOutShadow = () => {
    const currentPosition = $reviewsContainer.scrollTop();
    const maxPosition = $reviewsContainer[0].scrollHeight - $reviewsContainer[0].clientHeight;

    if (currentPosition > maxPosition - 100) {
      const opacity = (maxPosition - currentPosition) / 100;
      $reviewsShadow.css('opacity', opacity);
    }
  };

  const showMoreReviews = () => {
    const $hiddenReviews  = $reviewsContainer.find(attributes.hiddenReviews);
    accordionHasShadow = true;

    expandShadowed($hiddenReviews.first());
    animateAccordion($hiddenReviews);
    removeAccordion($reviewsButton, $reviewsShadow);
  };

  const mobileAccordion = () => {
    const $firstCasesSet = $casesContainer.find(attributes.firstCasesSet);
    const $secondCasesSet = $casesContainer.find(attributes.secondCasesSet);
    const $secondShadowedCase = $secondCasesSet.first();

    const isSectionCollapsed = $casesButton[0].dataset.collapsed;
    const $casesToShow = isSectionCollapsed ? $firstCasesSet : $secondCasesSet;

    if (accordionHasShadow) {
      expandShadowed($casesToShow.first());

      setTimeout(() => {
        animateAccordion($casesToShow, classes.mobile);
        $secondShadowedCase.addClass(classes.mobileShadowed);
        animateAccordion($secondShadowedCase, classes.mobile);
      }, times.short);
    } else {
      animateAccordion($casesToShow, classes.mobile);
    }

    isSectionCollapsed ? $casesButton.removeAttr(attributes.collapsed) : removeAccordion($casesButton, $casesShadow);
  };

  const desktopAccordion = () => {
    const $casesToShow = $casesContainer.find(attributes.hiddenCases);

    animateAccordion($casesToShow, classes.desktop);
    removeAccordion($casesButton);
  };

  const animateAccordion = ($casesToShow, elementsClass = null) => {
    $casesToShow
      .slideDown(times.long)
      .animate({ 'opacity': 1 }, times.long);

    if (elementsClass) {
      const hiddenClass = `portfolio-case--hidden-${elementsClass}`;

      $casesToShow.removeClass(hiddenClass);
    }
  };

  const expandShadowed = $shadowed => {
    $shadowed.animate({ 'margin-bottom': 0 }, times.long);
  };

  const removeAccordion = ($button, $shadow) => {
    $button.css('display', 'none');
    if (accordionHasShadow) {
      $shadow.animate({ 'opacity': 0 }, times.long, () => $shadow.css('display', 'none'));
    }
  };
});
