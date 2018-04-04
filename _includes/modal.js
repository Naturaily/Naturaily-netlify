$(function() {
  const container = $('#contactContainer'),
        entry = $('[data-reveal-contact]'),
        exit = $("#exitButton");

  entry.click(function() {
    container.fadeToggle();
  });

  exit.click(function() {
    container.fadeOut();
  });
});
