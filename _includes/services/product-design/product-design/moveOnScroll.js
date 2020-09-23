window.addEventListener('load', () => {
  const $item = $($('[data-move="on-scroll"]')[0]);
  const $scroll = $($item.find('[data-move="scroll"]')[0]);
  const maxScroll = 590;
  let scrollWidth = $(window).width() > 1200;

  const movingDots = {
    secondary: {
      item: $($item.find('[data-move="secondary"]')[0]),
      x: 130,
      rotMin: -100,
      rotMax: -60
    },
    yellow: {
      item: $($item.find('[data-move="yellow"]')[0]),
      x: 420,
      rotMin: 120,
      rotMax: 250
    },
    blue: {
      item: $($item.find('[data-move="blue"]')[0]),
      x: 275,
      rotMin: 10,
      rotMax: 110
    }
  };

  const move = () => {
    const scrollPercent = $($scroll).scrollTop() / maxScroll;

    Object.entries(movingDots).forEach(entry => {
      const dot = entry[1];
      const moveUnit = dot.rotMax - dot.rotMin;
      const newRot = dot.rotMin + moveUnit * scrollPercent;
      const newTransform = `rotate(${newRot}deg) translateX(${dot.x}px) rotate(${newRot}deg)`;

      $(dot.item).css({
        'animation': 'none',
        'opacity': 1,
        'transform': newTransform
      });
    });
  };

  $(window).resize(() => {
    scrollWidth = $(window).width() > 1200;
  });

  if (scrollWidth) {
    $($scroll).scroll(() => move());
  };
});
