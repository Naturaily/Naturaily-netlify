ScrollTrigger.matchMedia({
  "(min-width: 992px)": () => {
    const bottomParams = { duration: .5, y: 50, opacity: 0 };
    const bottomParamsShort = { duration: .4, y: 50, opacity: 0 };
    const speedUp = "-=.2"

    const switchTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "[gsap-switch-header]",
        end: "top+=90 bottom",
        onEnter: () => switchTimeline.restart(),
        onLeave: () => switchTimeline.play(),
        onEnterBack: () => switchTimeline.reverse(1.5)
      }
    });

    switchTimeline
      .from("[gsap-switch-background]", { duration: .8, backgroundPosition: "-100% 0" })
      .from("[gsap-switch-content]", { duration: .8, x: -50, scaleX: 0 }, "-=.8")
      .from("[gsap-switch-header]", bottomParams)
      .from("[gsap-switch-project]", bottomParams, speedUp)
      .from("[gsap-switch-title]", bottomParams, speedUp)
      .from("[gsap-switch-text]", bottomParams, speedUp)
      .from("[gsap-switch-spec-1]", bottomParamsShort,speedUp)
      .from("[gsap-switch-spec-2]", bottomParamsShort, speedUp)
      .from("[gsap-switch-spec-3]", bottomParamsShort, speedUp)
      .from("[gsap-switch-spec-4]", bottomParamsShort, speedUp)
      .from("[gsap-switch-spec-5]", bottomParamsShort, speedUp)
      .from("[gsap-switch-testimonials]", { duration: .4, x: 50, opacity: 0 }, "-=.7")
      .from("[gsap-switch-nav]", { duration: .4, x: "100%" })
      .from("[gsap-switch-image]", { duration: .4, x: "100%" }, "-=.4")
      .from("[gsap-switch-img]", { duration: .8, x: 50, scale: 1.05 }, "-=.4")
      .from("[gsap-switch-btn]", { duration: .4, scale: .9, opacity: 0 }, "+=.5")
      .from("[gsap-switch-next]", { duration: .7, y: "170%" }, "+=.5")
    ;
  }
});
