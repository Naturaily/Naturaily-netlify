window.addEventListener('load', () => {
  $('#maincarousel').slick({
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    dots: true,
    speed: 300
  });

  $('#post1').on('click', function() {
    if ($('.slick-list').hasClass('open')) {
      $(".slick-list").removeClass('open');
    } else {
      $(".slick-list").addClass('open');
    }
  });

  $('.slick-arrow, .slick-dots > li').on('click', function() {
    if ($('.slick-list').hasClass('open')) {
      $('#post1').click();
    }
  });
});
