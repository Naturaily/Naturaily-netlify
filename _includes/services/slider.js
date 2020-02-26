const $slider = $('#servicesSlider');
const $sliderNav = $('[slider-nav]');
const $sliderNavPrev = $('[slider-nav="prev"]');
const $sliderNavNext = $('[slider-nav="next"]');
const $sliderCards = $('[slider-card]');
const $sliderClose = $('[slider-close]');
const sliderCardsLength = $sliderCards.length;
const maxLeft = parseInt($slider.css('right'), 10);
const middle = maxLeft / 2 - 50;
const maxRight = 0;
const open_card_class = 'services-slider_card--opened';
let currentPosition = false;
let nextMove = middle;
let prevMove = false;
let inProgress = false;

let closing = false;

function closeAllCards() {
  $sliderClose.addClass('hidden');
  $sliderCards.removeClass(open_card_class);
}

function updateNavButtons() {
  if (!prevMove) $sliderNavPrev.addClass('hidden');
  if (prevMove) $sliderNavPrev.removeClass('hidden');
  if (!nextMove && nextMove !== 0) $sliderNavNext.addClass('hidden');
  if (nextMove || nextMove === 0) $sliderNavNext.removeClass('hidden');
}

function changeMoves(target) {
  if (!currentPosition && currentPosition !== 0 || currentPosition === maxLeft) {
    prevMove = false;
    nextMove = middle;

    $slider.css('right', 'auto');
  } else if (currentPosition === middle) {
    prevMove = maxLeft;
    nextMove = maxRight;
  } else if (currentPosition === maxRight) {
    prevMove = middle;
    nextMove = false;
  }
}

function moveTo(target) {
  $slider.animate({
    right: target
  }, 400, () => {

    currentPosition = target;

    changeMoves();
    updateNavButtons();

    inProgress = false;
  });
}

function specialMove() {
  $slider.animate({
    left: 0,
    right: '-730px'
  }, 400, () => {

    $slider.css('left', 'auto');

    currentPosition = maxLeft;

    changeMoves();
    updateNavButtons();

    inProgress = false;
  });
}

$sliderNav.click((e) => {
  const navType = $(e.currentTarget).attr('slider-nav') === 'next' ? nextMove : prevMove;

  if (!inProgress) {
    inProgress = true;
    closeAllCards();
    moveTo(navType);
  }
});

$sliderClose.click((e) => {
  closeAllCards();
  $(e.currentTarget).addClass('hidden');
  closing = true;
});

$sliderCards.click((e) => {
  const clickedElementIndex = $sliderCards.index($(e.currentTarget));

  if (!closing) {
    if (clickedElementIndex <= 2) {
      specialMove();
    } else if (clickedElementIndex > 4) {
      moveTo(maxRight);
    } else {
      moveTo(middle);
    }

    closeAllCards();
    console.log(e);
    $(e.currentTarget).addClass(open_card_class);
    $(e.currentTarget).find('[slider-close]').removeClass('hidden');
  }

  closing = false;
});
