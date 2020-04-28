window.addEventListener('load', () => {
  $('#techCarousel').slick({
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    dots: false,
    speed: 300,
    arrows: true
  });
}, { passive: true });
