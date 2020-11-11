JotForm.init(function(){
  setTimeout(function() {
    $('input_1').hint('Your name');
  }, 20);
  setTimeout(function() {
    $('input_2').hint('example@mail.com');
  }, 20);
  JotForm.setCustomHint('input_3', 'Tell us more');
  JotForm.highlightInputs = false;
});

JotForm.prepareCalculationsOnTheFly(
  [
    null,
    {"name":"job_name","qid":"1","subLabel":"","text":"","type":"control_textbox"},
    {"name":"job_email","qid":"2","text":"","type":"control_textbox"},
    {"name":"job_description","qid":"3","text":"","type":"control_textarea"},
    null,
    {"name":"send","qid":"5","text":"Send","type":"control_button"},
    null,
    null,
    {"name":"clickTo","qid":"8","text":"By submiting this form you agree to our Terms of service.","type":"control_text"},
    {"description":"","name":"estimateFields","qid":"9","subLabel":"","text":"Estimate Fields","type":"control_textbox"}
  ]
);

setTimeout(function() {
  JotForm.paymentExtrasOnTheFly(
    [
      null,
      {"name":"job_name","qid":"1","subLabel":"","text":"","type":"control_textbox"},
      {"name":"job_email","qid":"2","text":"","type":"control_textbox"},
      {"name":"job_description","qid":"3","text":"","type":"control_textarea"},
      null,
      {"name":"send","qid":"5","text":"Send","type":"control_button"},
      null,
      null,
      {"name":"clickTo","qid":"8","text":"By submiting this form you agree to our Terms of service.","type":"control_text"},
      {"description":"","name":"estimateFields","qid":"9","subLabel":"","text":"Estimate Fields","type":"control_textbox"}
    ]
  );
}, 20);
