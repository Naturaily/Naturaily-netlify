window.addEventListener('load', () => {
  const $triggerBtn = $('#webdevelopmentMoreTrigger');
  const $hiddenText = $('#webdevelopmentMoreText');

  $triggerBtn.click(() => {
    $triggerBtn.addClass('btn-white--invisible');
    $hiddenText.slideDown(300);
  });
});
