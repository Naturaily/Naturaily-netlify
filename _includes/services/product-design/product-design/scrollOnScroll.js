window.addEventListener('load', () => {
  const $item = $('[data-scroll="on-scroll"]')[0];
  const $wrapper = $($($item).find('[data-scroll="wrapper"]')[0]);
  const $img = $($($item).find('[data-scroll="img"]')[0]);
  const elPosition = $($item).offset().top;

  let scrollingState = {
    scrollingWidth: $(window).width() > 1200,
    sectionStart: $($item).offset().top - 100,
    sectionEnd: $($item).offset().top + 1300
  };

  if (scrollingState.scrollingWidth) {
    $wrapper.stick_in_parent({ offset_top: 200 });
  };

  const scroll = () => {
    const scrollPosition = $(window).scrollTop();
    const scrollingArea = scrollPosition > scrollingState.sectionStart && scrollPosition < scrollingState.sectionEnd;

    if (scrollingState.scrollingWidth && scrollingArea) {
      const scrollTop = scrollPosition - scrollingState.sectionStart;
      const sectionHeight = scrollingState.sectionEnd - scrollingState.sectionStart;
      const maxImgScroll = -1300;
      const scrollPercent = scrollTop / sectionHeight;

      $img.css('top', scrollPercent * maxImgScroll);
    }

    if (scrollPosition < scrollingState.sectionStart) {
      $img.css('top', 0);
    }
  };

  const updateState = () => {
    const stateUpdate = {
      scrollingWidth: $(window).width() > 1200,
      sectionStart: $($item).offset().top - 100,
      sectionEnd: $($item).offset().top + 2200
    }

    scrollingState = { ...scrollingState, ...stateUpdate };
  }

  $(window).resize(() => updateState());
  $(window).scroll(() => scroll());
});
