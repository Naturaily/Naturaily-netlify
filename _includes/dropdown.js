$(document).ready(function() {
   $('#dropdown-toggle').on('click', function() {
      $('#dropdown').css("display", function(_,val){
        return val == "block" ? "none" : "block";
      });
   });
});
