window.addEventListener('load', () => {
  const $cookieBox = $('#cookieInfo');

  if (Cookies.get('cookiesAccepted') === 'true') {
    $cookieBox.addClass('cookie-hide');
  } else {
    $('#cookieRemove').on( "click", function() {
      Cookies.set('cookiesAccepted', true);
      $cookieBox.addClass('cookie-hide');
    });
  }
});
