window.addEventListener('load', () => {
  function getRelatedContent(el) {
    return $($(el).attr('href'));
  }

  $('[data-scroll-navigation]').on('click', 'a', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: getRelatedContent(this).offset().top
    });
  });
});
