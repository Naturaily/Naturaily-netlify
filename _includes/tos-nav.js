window.addEventListener('load', () => {
  const $secondSection = $('.tos-content div:nth-child(2)');
  const $thirdSection = $('.tos-content div:nth-child(3)');
  const $fourthSection = $('.tos-content div:nth-child(4)');
  const $fifthSection = $('.tos-content div:nth-child(5)');
  const $firstNavOption = $('#tosNav li:nth-child(1) a');
  const $secondNavOption = $('#tosNav li:nth-child(2) a');
  const $thirdNavOption = $('#tosNav li:nth-child(3) a');
  const $fourthNavOption = $('#tosNav li:nth-child(4) a');
  const $fifthNavOption = $('#tosNav li:nth-child(5) a');

  $('#tosNav').stick_in_parent({ offset_top: 100 });

  $(document).ready(function () {
    checkCurrentSection();
    $(document).on('scroll', checkCurrentSection);
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off('scroll');

      $('a').each(function () {
        $(this).removeClass('active');
      })
      $(this).addClass('active');

      var target = this.hash,
          menu = target;
          $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top + 2
      }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on('scroll', checkCurrentSection);
      });
    });
  });

  function checkCurrentSection() {
    const $scrollPosition = $(window).scrollTop();

    if ($scrollPosition < $secondSection.offset().top) {
      removeActiveClasses();
      $firstNavOption.addClass('active');
    } else if ($scrollPosition < $thirdSection.offset().top) {
      removeActiveClasses();
      $secondNavOption.addClass('active');
    } else if ($scrollPosition < $fourthSection.offset().top) {
      removeActiveClasses();
      $thirdNavOption.addClass('active');
    } else if ($scrollPosition < $fifthSection.offset().top) {
      removeActiveClasses();
      $fourthNavOption.addClass('active');
    } else {
      removeActiveClasses();
      $fifthNavOption.addClass('active');
    }
  }

  function removeActiveClasses() {
    $('#tosNav a').each(function () {
      $(this).removeClass("active");
    });
  }
});
