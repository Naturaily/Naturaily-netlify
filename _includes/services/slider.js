const $slider = $('#servicesSlider');
const $sliderNav = $('[slider-nav]');
const $sliderNavPrev = $('[slider-nav="prev"]');
const $sliderNavNext = $('[slider-nav="next"]');
const $sliderCards = $('[slider-card]');
const $sliderClose = $('[slider-close]');

const open_card_class = 'services-slider_card--opened';

const wrapperWidth = $('.services-slider_cards-wrapper').width();
const sliderWidth = $slider.width();
const maxPosition = wrapperWidth - sliderWidth;

const cardWidth = -260;
const openedCardWidth = 610;

const positions = [];
addPositions();
positions.push(maxPosition);

let inProgress = false;
let isClosing = false;
let currentElement = 0;

function addPositions() {
  for (let i = 0; i < $sliderCards.length; i++) {
    const j = i * cardWidth;
    if (j > maxPosition) {
      positions.push(j);
    }
  }
}

function closeAllCards() {
  $sliderClose.addClass('hidden');
  $sliderCards.removeClass(open_card_class);
}

function updateNavButtons() {
  const currentLeftOffset = parseInt($slider.css('left'), 10);
  if (currentLeftOffset === 0) {
    $sliderNavPrev.addClass('hidden');
  } else if (currentLeftOffset === maxPosition || currentLeftOffset === (maxPosition - 360)) {
    $sliderNavNext.addClass('hidden');
  } else {
    $sliderNav.removeClass('hidden')
  }
}

function moveTo(target) {
  $slider.animate({
    left: target
  }, 400, () => {
    updateNavButtons();

    inProgress = false;
  });
}

$sliderNav.click((e) => {
  const navType = $(e.currentTarget).attr('slider-nav');
  let target = null;

  if (!inProgress) {
    if (navType === 'next') {
      target = currentElement < positions.length - 1 ? positions[currentElement + 1] : maxPosition;
      ++currentElement;
    } else {
      target = currentElement > 0 ? positions[currentElement - 1] : 0;
      --currentElement;
    }

    inProgress = true;
    closeAllCards();
    moveTo(target);
  }
});

$sliderClose.click((e) => {
  closeAllCards();
  if (parseInt($slider.css('left'), 10) < maxPosition) moveTo(maxPosition);
  $(e.currentTarget).addClass('hidden');
  isClosing = true;
});

$sliderCards.click((e) => {
  if (!isClosing) {
    const indexOfClickedElem = $sliderCards.index($(e.currentTarget));
    let target = (indexOfClickedElem * cardWidth) + (wrapperWidth / 2) - (openedCardWidth / 2);
    currentElement = indexOfClickedElem < positions.length - 1 ? indexOfClickedElem : positions.length - 2;

    if (target < (maxPosition - 360)) {
      target = maxPosition - 360;
    } else if (target > 0) {
      target = 0;
    }

    inProgress = true;
    moveTo(target);

    closeAllCards();
    $(e.currentTarget).addClass(open_card_class);
    $(e.currentTarget).find('[slider-close]').removeClass('hidden');
  }

  isClosing = false;
});
