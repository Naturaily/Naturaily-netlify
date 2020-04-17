$(document).ready(() => {
  const animationTime = 600;
  const tabsContainer = $('#tabs-container');
  const tabsNav = $('#tabs-nav');
  const tabsNavItems = $('.portfolio-tabs__menu-list__item');
  let activeTab = $("[data-activetab='true']")

  tabsNavItems.each(function() {
    $(this).click(function() {
      if (this.dataset.activenav === 'false') {
        const activeNav = $("[data-activenav='true']");
        const activeIndex = activeNav[0].dataset.index;
        const newNav = $(this);
        const newTab = $(`#${this.dataset.tab}`);
        const newIndex = this.dataset.index;
        activeTab = $("[data-activetab='true']");

        setContainerHeight(newTab.height());

        if (newIndex > activeIndex) {
          activeTab.animate({'left' : 0}, animationTime, () => activeTab.css('left', '200vw'));
          newTab.css('left', '200vw');
          newTab.animate({'left' : '100vw'}, animationTime);
        } else {
          activeTab.animate({'left' : '200vw'}, animationTime);
          newTab.css('left', '0');
          newTab.animate({'left' : '100vw'}, animationTime);
        }

        activeNav.children().animate({'opacity' : 0}, animationTime);
        newNav.children('span').animate({'opacity' : 1}, animationTime);

        activeTab.attr('data-activeTab', 'false');
        newTab.attr('data-activeTab', 'true');

        activeNav.attr('data-activeNav', 'false');
        newNav.attr('data-activeNav', 'true');
      }
    })
  })

  function setContainerHeight(tabHeight) {
    let newHeight;

    (window.innerWidth < 811) ? newHeight = (tabHeight + 430) : newHeight = (tabHeight + 280);
    tabsContainer.animate({ 'height' : `${newHeight}px` }, animationTime);
  }
})
