$(document).ready(function() {

  var sticky = new Waypoint.Sticky({
    element: $('.section-navigation')[0]
  });

  function getRelatedContent(el){
    return $($(el).attr('href'));
  }

  $('.section-navigation a').on('click',function(e){
    e.preventDefault();
    $('html,body').animate({scrollTop:getRelatedContent(this).offset().top})
  });



  $('.section').waypoint(function(direction) {
    if (direction === 'down') {
      var waypointNavItem = $('.section-navigation a[href=' + '"#' + (this.element.id) + '"' + ']')[0];
      $(waypointNavItem).parent().addClass('is-visible').addClass('is-active').siblings().removeClass('is-visible').removeClass('is-active');
    }
  }, {
    offset: 'bottom-in-view'
  });

  $('.section').waypoint(function(direction) {
    if (direction === 'up') {
      var waypointNavItem = $('.section-navigation a[href=' + '"#' + (this.element.id) + '"' + ']')[0];
      $(waypointNavItem).parent().addClass('is-visible').addClass('is-active').siblings().removeClass('is-visible').removeClass('is-active');
    }
  }, {
    offset: '0'
  });


});
