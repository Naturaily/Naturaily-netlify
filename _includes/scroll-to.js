var container, list, scrollTpo;
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
