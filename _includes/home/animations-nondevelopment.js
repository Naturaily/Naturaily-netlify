ScrollTrigger.matchMedia({
  "(min-width: 992px)": () => {
    const nondevelopmentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "[gsap-nondevelopment]",
        end: "top+=250 bottom",
        onEnter: () => nondevelopmentTimeline.timeScale(1).restart(),
        onLeave: () => nondevelopmentTimeline.timeScale(1).play(),
        onEnterBack: () => nondevelopmentTimeline.timeScale(1.5).reverse(2)
      }
    });

    nondevelopmentTimeline
      .from("[gsap-nondevelopment-icon-1]", { duration: .6, scale: .6, opacity: 0 })
      .to("[gsap-nondevelopment-mask-1]", { duration: 1, x: 400 }, "-=.3")
      .from("[gsap-nondevelopment-item-1]", { duration: .4, y: 10, opacity: 0, stagger: .2 }, "-=.8")
      .from("[gsap-nondevelopment-link-1]", { duration: .4, opacity: 0, scale: .8 }, "-=.2")
      .from("[gsap-nondevelopment-icon-2]", { duration: .8, scale: .6, opacity: 0 }, "-=.7")
      .to("[gsap-nondevelopment-mask-2]", { duration: 1, x: 400 }, "-=.3")
      .from("[gsap-nondevelopment-item-2]", { duration: .4, y: 10, opacity: 0, stagger: .2 }, "-=.8")
      .from("[gsap-nondevelopment-link-2]", { duration: .4, opacity: 0, scale: .8 }, "-=.2")
    ;
  }
});
