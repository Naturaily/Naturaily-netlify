window.addEventListener('load', () => {
  const scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)};
  const $itemsToDraw = $('[data-draw="on-scroll"]');
  const $item = $itemsToDraw[0];

  const draw = () => {
    const svg = $($item).find('[data-draw="svg"]')[0];
    const scroll = $($item).find('[data-draw="scroll"]')[0];
    const path = $(svg).find('[data-draw="path"]')[0];
    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    const scrollPercent = $($item).scrollTop() / $($item).height();
    const draw = length * scrollPercent;

    path.style.strokeDashoffset = length - draw;
  }

  $($item).scroll(() => draw());
});
