$(document).ready(function() {

  var sticky = new Waypoint.Sticky({
    element: $('#stickyNav')[0]
  });

  function getRelatedContent(el){
    return $($(el).attr('href'));
  }

  $('[data-page-navigation]').on('click', 'a', function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop:getRelatedContent(this).offset().top})
  });

  $('[data-page-navigation]').on('click', '[data-dropdown-show]', function(e){

    $( "[data-page-navigation] li" ).each(function() {

    if ( this.classList.contains('is-visible') && !this.classList.contains('is-active') ) {
      $(this).removeClass('is-visible');
    } else {
      $(this).addClass('is-visible');
    }
    });
  });


  $('.section').waypoint(function(direction) {
    if (direction === 'down') {
      var waypointNavItem = $('[data-page-navigation] a[href=' + '"#' + (this.element.id) + '"' + ']')[0];
      $(waypointNavItem).parent().addClass('is-visible').addClass('is-active').siblings().removeClass('is-visible').removeClass('is-active');
    }
  }, {
    offset: 0
  });

  $('.section').waypoint(function(direction) {
    if (direction === 'up') {
      var waypointNavItem = $('[data-page-navigation] a[href=' + '"#' + (this.element.id) + '"' + ']')[0];
      $(waypointNavItem).parent().addClass('is-visible').addClass('is-active').siblings().removeClass('is-visible').removeClass('is-active');
    }
  }, {
    offset: '-100%'
  });


});
