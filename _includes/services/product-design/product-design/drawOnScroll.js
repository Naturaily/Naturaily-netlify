window.addEventListener('load', () => {
  const scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)};
  const $item = $('[data-draw="on-scroll"]')[0];
  const $svg = $($($item).find('[data-draw="svg"]')[0]);
  const $scroll = $($item).find('[data-draw="scroll"]')[0];

  const drawingState = {
    isDrawn: false,
    windowWidth: $(window).width()
  };

  const drawPaths = {
    top: $svg.find('[data-draw="path"]')[0],
    bottom: $svg.find('[data-draw="path"]')[1]
  };

  const showElems = {
    definition: {
      dot: $svg.find('[data-draw="definition-dot"]')[0],
      text: $svg.find('[data-draw="definition-text"]')[0],
      start: 0.4,
      end: 0.5
    },
    solution: {
      dot: $svg.find('[data-draw="solution-dot"]')[0],
      text: $svg.find('[data-draw="solution-text"]')[0],
      start: 0.85,
      end: 0.95
    },
    discover:  {
      text: $svg.find('[data-draw="discover"]')[0],
      start: 0.1,
      end: 0.2
    },
    define: {
      text: $svg.find('[data-draw="define"]')[0],
      start: 0.25,
      end: 0.35
    },
    develop: {
      text: $svg.find('[data-draw="develop"]')[0],
      start: 0.55,
      end: 0.65
    },
    deliver: {
      text: $svg.find('[data-draw="deliver"]')[0],
      start: 0.75,
      end: 0.85
    }
  };

  const draw = () => {
    const length = drawPaths.top.getTotalLength() + 50;
    const scrollPercent = $($item).scrollTop() / $($item).height();
    const draw = length * scrollPercent;

    Object.entries(showElems).forEach(entry => {
      const item = entry[1];

      if (scrollPercent >= item.end) {
        show (item);
      } else if (scrollPercent <= item.start) {
        hide (item);
      } else {
        dynamic (item, scrollPercent);
      }
    });

    drawPaths.top.style.strokeDashoffset = length - draw;
    drawPaths.bottom.style.strokeDashoffset = length - draw;
  };

  const show = (item) => {
    $(item.text).css('opacity', 1);
    if (item.dot) $(item.dot).css('opacity', 1);
  };

  const hide = (item) => {
    $(item.text).css('opacity', 0);
    if (item.dot) $(item.dot).css('opacity', 0);
  };

  const dynamic = (item, scroll) => {
    $(item.text).css('opacity', (scroll - item.start) / (item.end - item.start));

    if (item.dot) {
      $(item.dot).css('opacity', (scroll - item.start) / (item.end - item.start));
    }
  };

  const updateState = () => {
    drawingState.isDrawn = false;
    drawingState.windowWidth = $(window).width();
  }

  $(window).resize(() => updateState());

  if (drawingState.isDrawn === false && drawingState.windowWidth > 1200) {
    $($item).scroll(() => draw());
  }
});
