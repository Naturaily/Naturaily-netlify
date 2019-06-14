jQuery(document).ready(function() {
   jQuery('[data-people]').on('mouseover', '[data-person]', (e) => {
     jQuery('[data-people]').addClass('dim');
     jQuery(e.currentTarget).addClass('not-dim');

   });
   jQuery('[data-people]').on('mouseleave', '[data-person]', (e) => {
     jQuery('[data-people]').removeClass('dim');
     jQuery(e.currentTarget).removeClass('not-dim');
   });
});
