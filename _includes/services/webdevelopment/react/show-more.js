window.addEventListener('load', () => {
  const $triggerBtn = $('#reactMoreTrigger');
  const $hiddenText = $('#reactMoreText');

  $triggerBtn.click(() => {
    $triggerBtn.addClass('btn-white--invisible');
    $hiddenText.slideDown(300);
  });
});
