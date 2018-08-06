$(function() {

  const modalTrigger = $("[data-modal-trigger]");



  modalTrigger.click(function(event) {
    const modalType = $(this).data("modal-trigger");
    openModal(modalType)
  });

  function openModal(modalType) {

    const modalContainer = $( '[data-modal="' + modalType + '"]'),
          modalClose = $( '[data-modal-close="' + modalType + '"]'),
          modalForm = $( '[data-modal-form="' + modalType + '"]');


    modalContainer.css('visibility', 'visible');
    modalForm.css('transform', 'translate(-50%, -50%)');
    $('html, body').css('cssText', 'overflow: hidden !important');

    modalClose.click(function() {
      modalContainer.css('visibility', 'hidden');
      modalForm.css('transform', 'translate(-50%, -200%)');
      $('html, body').css('overflow', '');
    });

    modalForm.click(function(event){
        event.stopPropagation();
    });
  }

});
