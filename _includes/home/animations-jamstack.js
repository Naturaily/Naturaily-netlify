ScrollTrigger.matchMedia({
  "(min-width: 992px)": () => {
    const jamstackTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "[gsap-jamstack]",
        end: "top+=250 bottom",
        onEnter: () => jamstackTimeline.restart(),
        onLeave: () => jamstackTimeline.play(),
        onEnterBack: () => jamstackTimeline.reverse(1)
      }
    });

    jamstackTimeline
      .set("[gsap-jamstack-full]", { x: -190, y: 2 })
      .set("[gsap-jamstack-half]", { opacity: 0 })
      .to("[gsap-jamstack-mask]", { duration: 1, x: 600 })
      .from("[gsap-jamstack-text]", { duration: .5, opacity: 0, x: 100 }, "-=.9")
      .from("[gsap-jamstack-full]", { duration: .3, opacity: 0 }, "-=.5")
      .from("[gsap-jamstack-half]", { duration: .01, opacity: 0 })
      .from("[gsap-jamstack-full]", { duration: .5, x: -190 })
      .from("[gsap-jamstack-tablet]", { duration: .5, x: -200, opacity: 0 }, "-=.5")
      .from("[gsap-jamstack-page]", { duration: .5, x: 7, y: 30, opacity: 0 })
      .from("[gsap-jamstack-cta]", { duration: .5, opacity: 0, y: 40 }, "-=.5")
      .from("[gsap-jamstack-link]", { duration: 0.7, opacity: 0, scale: 0.8, y: 10 })
    ;
  }
});
