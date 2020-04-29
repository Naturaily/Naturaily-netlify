window.addEventListener('load', () => {
  const animationTime = 600;
  const $tabsWrapper = $('#lv-solution-tabs');
  const $tabsContainer = $tabsWrapper.find($('[data-type="tabs-container"]'));
  const $tabsNavItems = $tabsWrapper.find($('[data-type="tabs-nav"]'));

  let $activeTab = $tabsWrapper.find($('[data-active-tab="true"]'));
  let $activeNav = $tabsWrapper.find($('[data-active-nav="true"]'));
  let activeIndex = $activeNav[0].dataset.navIndex;
  let isAnimationGoing = false;

  $tabsNavItems.click((event) => {
    if (!$(event.target).data('active-nav') && !isAnimationGoing) {
      isAnimationGoing = true;
      const $newNav = $(event.target);
      const newIndex = $newNav[0].dataset.navIndex;
      const $newTab = $tabsWrapper.find($(`[data-tab-index="${newIndex}"]`));
      const isLeftAnimation = newIndex > activeIndex;

      setContainerHeight($newTab.height());

      $activeNav
        // it update cached value by jquery
        .data('activeNav', false)
        .attr('data-active-nav', false)
        .children().animate({ opacity: 0 }, animationTime);

      $newNav
        // it update cached value by jquery
        .data('activeNav', true)
        .attr('data-active-nav', true)
        .children().animate({ opacity: 1 }, animationTime);

      $newTab
        .css('left', isLeftAnimation ? '200vw' : 0)
        .animate({ left: '100vw' }, animationTime)
        .attr('data-active-tab', 'true');

      $activeTab
        .animate({ left: isLeftAnimation ? 0 : '200vw' }, animationTime, () => {
          $activeTab
            .css('left', '200vw')
            .attr('data-active-tab', 'false');

          $activeTab = $tabsWrapper.find('[data-active-tab="true"]');
          $activeNav = $tabsWrapper.find('[data-active-nav="true"]');
          activeIndex = $activeNav[0].dataset.navIndex;

          isAnimationGoing = false;
        });
    }
  })

  function setContainerHeight(tabHeight) {
    const newHeight = window.innerWidth < 811 ? (tabHeight + 430) : (tabHeight + 280);
    $tabsContainer.animate({ height: `${newHeight}px` }, animationTime);
  }
}, { passive: true })
