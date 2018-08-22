var container,
    list,
    scrollTo;

$("document").ready(function() {
  container = $('.scrollTo-container');
  list = $('.scrollTo-list');
  list.on("click", 'li', function(element) {
    let scrollTo = $(element.target.dataset.target);
    $('.scrollTo-list li.active').removeClass("active");
    $(element.target).addClass('active');
    container.animate({
      scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
    });
  })
});



$(document).ready(function() {

  var scrollnow = function(e) {
    // if scrollnow()-function was triggered by an event
    if (e) {
        e.preventDefault();
        var target = this.hash;
    }
    // else it was called when page with a #hash was loaded
    else {
        var target = location.hash;
    }

    // same page scroll
    $.smoothScroll({
        offset: -120,
        scrollTarget: target
    });
  };

  // if page has a #hash
  if (location.hash) {
    $('html, body').scrollTop(0).show();
    // smooth-scroll to hash
    scrollnow();
  }

  // for each <a>-element that contains a "/" and a "#"
  $('a[href*="/#"]').filter(function(){
   // if the pathname of the href references the same page
   return this.hash &&
          this.pathname.replace(/^\//,'') == location.pathname.replace(/^\//,'') &&
          this.hostname == location.hostname;

  }).click(scrollnow);

});
