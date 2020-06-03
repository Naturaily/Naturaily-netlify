window.addEventListener('load', () => {
  const $reviewsButton = $('#portfolio-trigger');
  const $reviewsContainer = $('#portfolio-reviews');
  const $hiddenReviews  = $reviewsContainer.find('[data-review="hidden"]');

  $reviewsButton.click(() => {
    $hiddenReviews.slideDown(600);
    $reviewsButton.css('display', 'none');
  })
})
