const accGroupAttr = 'data-acc-group';
const openClass = 'active';

const openAccordion = (accordion) => accordion.classList.add(openClass);

const closeActiveAccordions = (group) => {
  const openAccGroup = document.querySelectorAll(`[${accGroupAttr}=${group}].${openClass}`);
  openAccGroup.forEach((acc) => acc.classList.remove(openClass));
};

const handleAccordion = (accordion) => {
  const isAccOpened = accordion.classList.contains(openClass);

  closeActiveAccordions(accordion.dataset.accGroup);
  if (!isAccOpened) openAccordion(accordion);
};

document.addEventListener('click', (e) => {
  const trigger = e.target.dataset.accTrigger;

  if (trigger) {
    const targetAcc = e.target.parentNode.closest(`[${accGroupAttr}]`);
    handleAccordion(targetAcc);
  }
});
