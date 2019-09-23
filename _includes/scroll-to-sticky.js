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

  var waypoints = $('.section').waypoint({
    handler: function(direction) {
      var waypointNavItem = $('.section-navigation a[href=' + '"#' + (this.element.id) + '"' + ']')[0];
      $('.section-navigation a').removeClass('is-active')
      $(waypointNavItem).addClass('is-active');
    }
  })

});
