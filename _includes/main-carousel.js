$('#maincarousel').slick({
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  dots: true,
  speed: 300
});

$(document).ready(function() {
   $('#post1').on('click', function() {
      $('.slick-list').css("height", function(_,val){
        return val == "570px" ? "420px" : "570px";
      });
   });
});
