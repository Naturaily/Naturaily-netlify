$("document").ready(function() {
  const list = $('#hoverPanelsContainer');
  list.on("mouseenter", '.panel', function(e) {
    let target = e.currentTarget.dataset.target;
    $('#hoverPanelsContainer div.active').removeClass("active");
    $('#hoverPanelsContent div.active').removeClass("active");
    $(e.currentTarget).addClass('active');
    $('#hoverPanelsContent #' + target).addClass('active');
    if (target === undefined) {
      $('#hoverPanelsContent #elastic').addClass('active');
    }
  })
});
