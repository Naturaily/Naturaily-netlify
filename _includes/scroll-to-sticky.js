var sticky = new Waypoint.Sticky({
  element: $('.section-navigation')[0]
});

function getRelatedContent(el){
  return $($(el).attr('href'));
}
// Get link by section or article id
function getRelatedNavigation(el){
  console.log(el);
  return $('.page-navigation_item[href=#'+$(el).attr('id')+']');
}

$('.page-navigation a').on('click',function(e){
  e.preventDefault();
  $('html,body').animate({scrollTop:getRelatedContent(this).offset().top - 20})
});

$('section').waypoint(function(direction) {

   getRelatedNavigation(this).toggleClass('active', direction === 'down');
 }, {
   offset: '90%' //
 })
 .waypoint(function(direction) {

   getRelatedNavigation(this).toggleClass('active', direction === 'up');
 }, {
   offset: function() {  return -$(this).height() + 100; }
 });
