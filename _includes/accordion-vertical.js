const accAttr = 'data-acc';
  const accTargetAttr = `${accAttr}-target`;
  const openClass = 'active';

  const openAccordion = (trigger, target, acc) => {
    const activeInAcc = document.querySelectorAll(`[${accAttr}=${acc}].${openClass}`);
    
    [...activeInAcc].forEach((item) => item.classList.remove(openClass));
    trigger.classList.add(openClass);
    target.classList.add(openClass);
  };

  const closeAccordion = (trigger, target) => {
    trigger.classList.remove(openClass);
    target.classList.remove(openClass);
  };

  document.addEventListener('click', (e) => {
    const accTrigger = e.target;
    const accTriggerData = accTrigger.dataset.accTrigger;
    const currentAcc = accTrigger.dataset.acc;
    
    if (accTriggerData) {
      const accTarget = document.querySelector(`[${accTargetAttr}="${accTriggerData}"`);
      const isAccOpened = accTarget.classList.contains('active');

      if (isAccOpened) {
        closeAccordion(accTrigger, accTarget);
      } else {
        openAccordion(accTrigger, accTarget, currentAcc);
      }
    }
  });
