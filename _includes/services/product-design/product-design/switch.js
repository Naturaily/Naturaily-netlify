window.addEventListener('load', () => {
  const $navs = $('[switch-nav]');
  const $arrows = $('[switch-arrow]');
  const $buttons = $('[switch-button]');
  let $switch;
  let $nav;
  let $cards;
  let $counter;

  const animationTime = 500;
  let isMobile;
  let switchSize;

  let switchStatus = {
    index: null,
    animating: false
  }

  $navs.click(() => { switchNav(); });
  $arrows.click(() => { switchArrow(); });
  $buttons.click(() => { switchArrow(); });

  const switchNav = () => {
    const newIndex = parseInt($(event.currentTarget)[0].dataset.index);

    setParameters();
    moveToCard(newIndex);
  };

  const switchArrow = () => {
    setParameters();

    const switchDirection = $(event.currentTarget)[0].dataset.direction;
    const newIndex = (switchDirection === 'prev') ? switchStatus.index - 1 : switchStatus.index + 1;
    const shouldSwitch = switchDirection && newIndex >= 0 && newIndex < switchSize;

    if (shouldSwitch) moveToCard(newIndex);
  };

  const setParameters = () => {
    $switch = $(event.target).closest($('[switch]'));
    $nav = $switch.find('[switch-nav]');
    $cards = $switch.find('[switch-cards]');
    $counter = $switch.find('[switch-counter]');
    switchSize = $($cards).children().length;
    isMobile = window.innerWidth < 576;

    const $activeCard = $switch.find('[switch-active-card]');
    switchStatus.index = parseInt($activeCard[0].dataset.index);
  };

  const moveToCard = (index) => {
    if (index !== switchStatus.index && !switchStatus.animating) {
      const newPosition = -100 * index;
      const changeDirection = index > switchStatus.index ? 'right' : 'left';

      switchStatus = {
        index: index,
        animating: true
      }

      $($cards).animate({ left: `${newPosition}%` }, animationTime, () => { switchStatus.animating = false });
      if ($nav) updateNav(index);
      updateCards(index);
      updateArrows(index);
      updateCounter(index, changeDirection);
    }
  };

  const updateNav = (index) => {
    const $navContainer = $nav.parent();
    const $newActiveElem = $navContainer.find(`[data-index="${index}"]`)
    const activeClass = 'product-design__process-nav__item--active';

    if (isMobile) {
      const initialPosition = 25;
      const positionChange = 50;
      const newPosition = initialPosition - index * positionChange;

      $($navContainer).animate({ left: `${newPosition}%` }, animationTime);
    }

    $nav.removeClass(activeClass);
    $newActiveElem.addClass(activeClass);
  }

  const updateCards = (index) => {
    const activeAttr = 'switch-active-card';
    const $activeCard = $cards.find(`[${activeAttr}]`)
    const $newActiveCard = $cards.find(`[data-index=${index}]`);

    $activeCard.removeAttr(activeAttr);
    $newActiveCard.attr(activeAttr, activeAttr);
  }

  const updateArrows = (index) => {
    const $prevArrow = $($arrows[0]);
    const $nextArrow = $($arrows[1]);
    const arrowHiddenClass = 'product-design__process-arrow--hidden';

    const $prevBtn = $($buttons[0]);
    const $nextBtn = $($buttons[1]);
    const buttonHiddenClass = 'product-design__process-button--disabled';

    $buttons.removeClass(buttonHiddenClass);

    if (index === 0) {
      $prevArrow.addClass(arrowHiddenClass);
      $nextArrow.removeClass(arrowHiddenClass);
      $prevBtn.addClass(buttonHiddenClass);
    } else if (index === switchSize - 1) {
      $nextArrow.addClass(arrowHiddenClass);
      $prevArrow.removeClass(arrowHiddenClass);
      $nextBtn.addClass(buttonHiddenClass);
    };
  };

  const updateCounter = (index, direction) => {
    const initialPosition = (direction === 'right') ? '-5px' : '20px';
    const secondPosition = (direction === 'right') ? '20px' : '-5px';
    const finalPosition = '50%';

    $counter.animate({ left: initialPosition }, animationTime / 2, () => {
      $counter.css('left', secondPosition);
      $counter[0].innerHTML = index + 1;
      $counter.animate({ left: finalPosition }, animationTime / 2);
    });
  }
})
