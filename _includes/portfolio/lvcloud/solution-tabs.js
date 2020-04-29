window.addEventListener('load', () => {
  const animationTime = 600;
  const $tabsContainer = $('#tabs-container');
  const $tabsNavItems = $('[data-type="tabs-nav"]');
  let $activeTab = $('[data-active-tab="true"]');
  let $activeNav = $('[data-active-nav="true"]');

  $tabsNavItems.click((event) => {
    if (!$(event.target).data('active-nav')) {
      const $newNav = $(event.target);
      const $newTab = $(`#${$newNav.data('tab')}`);
      const isLeftAnimation = $newNav.data('index') > $activeNav.data('index');

      console.log($newNav.data('tab'))
      console.log($newTab.height())
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

          $activeTab = $('[data-active-tab="true"]');
          $activeNav = $('[data-active-nav="true"]');
        });
    }
  })

  function setContainerHeight(tabHeight) {
    const newHeight = window.innerWidth < 811 ? (tabHeight + 430) : (tabHeight + 280);

    $tabsContainer.animate({ height: `${newHeight}px` }, animationTime);
  }
}, { passive: true })
