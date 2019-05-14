let vals = [];
let valsString;

function getValues () {

  vals = [];
  valsString = "";

  jQuery("[data-estimate] :input:checked").each(function(index, item) {
      vals.push(item.value);
      valsString = vals.toString();
  });
}

jQuery('[data-estimate=""]').on( "click", "input", function() {
  getValues();
  let formSource = "https://form.jotformeu.com/jsform/91251977229364?estimateFields=" + valsString;
  jQuery("#input_9").val(valsString)
});
