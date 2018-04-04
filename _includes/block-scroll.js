$(document).ready(function() {
   $('#checkbox').on('click', function() {

      $('#Smallchat').css("visibility", function(_,val){
        return val == "hidden" ? "visible" : "hidden";
      });

      if ($('.menu').hasClass('active')) {
        $(".menu").removeClass('active');
      } else {
        $(".menu").addClass('active');
      }
   });
});

var didScroll,
    lastScrollTop = 0,
    delta = 5,
    navbarHeight = $('#checkbox, [data-reveal-header]').outerHeight();

$(window).scroll(function(event){
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  if(Math.abs(lastScrollTop - st) <= delta)
  return;

  if (st > lastScrollTop && st > navbarHeight){
    $('#checkbox, [data-reveal-header]').removeClass('nav-down').addClass('nav-up');
    $(".menu").removeClass('active');
  } else {
    if(st + $(window).height() < $(document).height()) {
      $('#checkbox, [data-reveal-header]').removeClass('nav-up').addClass('nav-down');
      $(".menu").removeClass('active');
    }
  }

  lastScrollTop = st;
}
