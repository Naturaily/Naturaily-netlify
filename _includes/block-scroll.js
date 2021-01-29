window.addEventListener('load', () => {
  var didScroll,
      lastScrollTop = 0,
      delta = 5,
      navbarHeight = jQuery('#checkbox, #mobileSpan').outerHeight();

  jQuery('#checkbox').on('click', function() {
    if (jQuery('[data-menu]').hasClass('active')) {
      jQuery('[data-menu]').removeClass('active');
    } else {
      jQuery('[data-menu]').addClass('active');
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
      jQuery("[data-menu]").removeClass('active');
      jQuery("#mobileSpan").removeClass('open');
    } else {
      if(st + jQuery(window).height() < jQuery(document).height()) {
        jQuery('#checkbox, #mobileSpan').removeClass('nav-up').addClass('nav-down');
        jQuery("[data-menu]").removeClass('active');
        jQuery("#mobileSpan").removeClass('open');
      }
    }

    lastScrollTop = st;
  }
}, { passive: true });
