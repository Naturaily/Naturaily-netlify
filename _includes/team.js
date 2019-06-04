jQuery(document).ready(function() {
   jQuery('.faces').on('mouseover', '.person-inner', (e) => {
     jQuery('.faces').addClass('dim');
     jQuery(e.currentTarget).addClass('not-dim');

   });
   jQuery('.faces').on('mouseleave', '.person-inner', (e) => {
     jQuery('.faces').removeClass('dim');
     jQuery(e.currentTarget).removeClass('not-dim');
   });
});
