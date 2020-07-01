window.addEventListener('load', () => {
  const $reviewsContainer = $('#portfolio-reviews');
  const $reviewsButton = $('#portfolio-trigger');
  const $reviewsShadow = $('#portfolio-shadow');

  const $casesContainer = $('#cases-container');
  const $casesButton = $('#cases-trigger');
  const $casesShadow = ($(window).width() < 811) ? $('#cases-shadow') : null;

  $reviewsButton.click(() => { showMoreReviews() })
  $reviewsContainer.scroll(() => { fadeOutShadow() })
  $casesButton.unbind('click').bind('click', () => {
    if ($(window).width() < 992) {
      mobileAccordion($casesButton, $casesContainer, $casesShadow);
    } else {
      desktopAccordion($casesButton, $casesContainer);
    }
  });

  fadeOutShadow = ($container) => {
    const currentPosition = $reviewsContainer.scrollTop();
    const maxPosition = $reviewsContainer[0].scrollHeight - $reviewsContainer[0].clientHeight;

    if (currentPosition > maxPosition - 100) {
      const opacity = (maxPosition - currentPosition)/100;
      $reviewsShadow.css('opacity', opacity);
    }
  }

  showMoreReviews = () => {
    const $clutchContainer = $('#portfolio-reviews');
    const $hiddenReviews  = $reviewsContainer.find('[data-review="hidden"]');

    expandShadowed($hiddenReviews.first());
    setTimeout(() => {
      animateAccordion($hiddenReviews);
      removeAccordion($reviewsButton, $reviewsShadow)
    }, 300);
  }

  mobileAccordion = ($button, $cases, $shadow) => {
    const isSectionCollapsed = $button[0].dataset.collapsed ? true : false;
    const $casesToShow = isSectionCollapsed ? $cases.find('[data-mobile="first-hidden"]') : $cases.find('[data-mobile="second-hidden"]');
    const $secondShadowedCase = $cases.find('[data-mobile="second-hidden"]').first();

    if ($shadow) {
      expandShadowed($casesToShow.first());
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

  animateAccordion = ($casesToShow, elementsClass = null) => {
    $casesToShow
      .slideDown(600)
      .animate({ 'opacity': 1 }, 600);

    if (elementsClass) {
      $casesToShow.removeClass(`portfolio-case--hidden-${elementsClass}`);
    }
  }

  expandShadowed = ($shadowed) => {
    $shadowed.animate({ 'margin-bottom': 0 }, 600)
  }

  removeAccordion = ($button, $shadow = null) => {
    $button.css('display', 'none');
    ($shadow) ? $shadow.css('display', 'none') : '';
  }
})
