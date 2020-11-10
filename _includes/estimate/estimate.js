window.addEventListener('load', () => {
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
}, { passive: true });

window.addEventListener('load', () => {
  const $estimateRadios = $('[type="radio"]');
  const $estimateOptions = $('[data-option]');

  $estimateRadios.change(function() {
    const $checkedOption = $(this.closest('[data-option]'));
    const checkedClass = 'estimate-form__option-wrapper--checked';

    $estimateOptions.removeClass(checkedClass);
    $checkedOption.addClass(checkedClass);
  })
});
