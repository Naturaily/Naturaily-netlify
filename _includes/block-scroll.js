var didScroll,
    lastScrollTop = 0,
    delta = 5,
    navbarHeight = jQuery('#checkbox, #mobileSpan').outerHeight();

jQuery('#checkbox').on('click', function() {

  if (jQuery('.menu').hasClass('active')) {

    jQuery(".menu").removeClass('active');
    jQuery('#Smallchat').css("visibility", "visible");

  } else {

    jQuery(".menu").addClass('active');
    jQuery('#Smallchat').css("visibility", "hidden");

  }
});

jQuery('#mobileSpan').click(function(){
	jQuery(this).toggleClass('open');
  jQuery('#checkbox').click();
});

jQuery(window).scroll(function(event){
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = jQuery(this).scrollTop();

  if(Math.abs(lastScrollTop - st) <= delta)
  return;

  if (st > lastScrollTop && st > navbarHeight){
    jQuery('#checkbox, #mobileSpan').removeClass('nav-down').addClass('nav-up');
    jQuery(".menu").removeClass('active');
    jQuery('#Smallchat').css("visibility", "visible");
    jQuery("#mobileSpan").removeClass('open');
  } else {
    if(st + jQuery(window).height() < jQuery(document).height()) {
      jQuery('#checkbox, #mobileSpan').removeClass('nav-up').addClass('nav-down');
      jQuery(".menu").removeClass('active');
      jQuery('#Smallchat').css("visibility", "visible");
      jQuery("#mobileSpan").removeClass('open');
    }
  }

  lastScrollTop = st;
}
