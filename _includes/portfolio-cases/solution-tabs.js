window.addEventListener('load', () => {
  const animationTime = 600;
  const targetURL = event.target.URL;
  let $tabsWrapper;
  let animationType;

  if (targetURL.indexOf("lvcloud") >= 0) {
    $tabsWrapper = $('#lv-solution-tabs');
    animationType = 'slide';
  } else if (targetURL.indexOf("awn") >= 0) {
    $tabsWrapper = $('#awn-solution-tabs');
    animationType = 'fade';
  }

  const $tabsContainer = $tabsWrapper.find($('[data-type="tabs-container"]'));
  const $tabsNavItems = $tabsWrapper.find($('[data-type="tabs-nav"]'));

  let $activeTab = $tabsWrapper.find($('[data-active-tab="true"]'));
  let $activeNav = $tabsWrapper.find($('[data-active-nav="true"]'));
  let activeIndex = $activeNav[0].dataset.navIndex;
  let isAnimationGoing = false;

  $tabsNavItems.click((event) => {
    const $newNav = $(event.target).closest('[data-type="tabs-nav"]');

    if (!$newNav.data('active-nav') && !isAnimationGoing) {
      isAnimationGoing = true;
      const newIndex = $newNav[0].dataset.navIndex;
      const $newTab = $tabsWrapper.find($(`[data-tab-index="${newIndex}"]`));

      if (animationType === 'slide') {
        const isLeftAnimation = newIndex > activeIndex;

        setContainerHeight($newTab.height());

        $activeNav.children().animate({ opacity: 0 }, animationTime)
        $newNav.children().animate({ opacity: 1 }, animationTime);

        $newTab
          .css('left', isLeftAnimation ? '200vw' : 0)
          .animate({ left: '100vw' }, animationTime);

        $activeTab.animate({ left: isLeftAnimation ? 0 : '200vw' }, animationTime, () => {
          $activeTab
            .css('left', '200vw')
            .attr('data-active-tab', 'false');
          updateActiveItems();
        });
      } else if (animationType === 'fade') {
        $activeNav.removeClass('case-issues__nav-list__item--active');
        $newNav.addClass('case-issues__nav-list__item--active');
        $activeTab.animate({ opacity: 0 }, animationTime/2, () => {
          $activeTab
            .css('display', 'none')
            .removeClass('case-issues__tabs-tab--active')
            .attr('data-active-tab', 'false');
          $newTab
            .css('display', 'block')
            .animate({ opacity: 1 }, animationTime/2, () => {
              $newTab.addClass('case-issues__tabs-tab--active');
            });
          updateActiveItems();
        });
      }

      $activeNav
        .data('activeNav', false) // it updates cached value by jquery
        .attr('data-active-nav', false)

      $newNav
        .data('activeNav', true) // it updates cached value by jquery
        .attr('data-active-nav', true)

      $newTab.attr('data-active-tab', 'true');
    }
  });

  function setContainerHeight(tabHeight) {
    const newHeight = window.innerWidth < 811 ? (tabHeight + 430) : (tabHeight + 280);
    $tabsContainer.animate({ height: `${newHeight}px` }, animationTime);
  }

  function updateActiveItems() {
    $activeTab = $tabsWrapper.find('[data-active-tab="true"]');
    $activeNav = $tabsWrapper.find('[data-active-nav="true"]');
    activeIndex = $activeNav[0].dataset.navIndex;

    isAnimationGoing = false;
  }
}, { passive: true })
