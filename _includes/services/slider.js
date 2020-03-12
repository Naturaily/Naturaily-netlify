const $slider = $('#servicesSlider');
const $sliderNav = $('[slider-nav]');
const $sliderNavPrev = $('[slider-nav="prev"]');
const $sliderNavNext = $('[slider-nav="next"]');
const $sliderCards = $('[slider-card]');
const $sliderClose = $('[slider-close]');

const open_card_class = 'services-slider_card--opened';

let wrapperWidth = $('.services-slider_cards-wrapper').width();
let sliderWidth = $slider.width();
let maxPosition = wrapperWidth - sliderWidth;

let cardWidth = `-${($('.services-slider_card').width() + 10)}`;
const openedCardWidth = 610;

let positions = [];
addPositions();
if( window.innerWidth > 420) positions.push(maxPosition);

let inProgress = false;
let isClosing = false;
let currentElement = 0;

function updateValues() {
  wrapperWidth = $('.services-slider_cards-wrapper').width();
  sliderWidth = $slider.width();
  maxPosition = wrapperWidth - sliderWidth;
  cardWidth = `-${($('.services-slider_card').width() + 10)}`;

  currentElement = 0;

  positions = [];
  addPositions();
  if( window.innerWidth > 420) positions.push(maxPosition);

  updateNavButtons();
}

function addPositions() {
  for (let i = 0; i < $sliderCards.length; i++) {
    const j = i * cardWidth;
    if (j > maxPosition || window.innerWidth <= 420) {
      positions.push(j);
    }
  }

  if (maxPosition === 0) maxPosition = positions[positions.length - 1];
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
  if (!isClosing && window.innerWidth > 576) {
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

$(window).resize(() => {
  setTimeout(() => {
    $sliderCards.removeClass(open_card_class);
    updateValues();
    moveTo(positions[0]);
  }, 500);
});
