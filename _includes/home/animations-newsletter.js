ScrollTrigger.matchMedia({
  "(min-width: 992px)": () => {
    const newsletterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "[gsap-newsletter-text]",
        end: "top+=200 bottom",
        onEnter: () => newsletterTimeline.timeScale(1).restart(),
        onLeave: () => newsletterTimeline.timeScale(1).play(),
        onEnterBack: () => newsletterTimeline.timeScale(3).reverse()
      }
    });

    newsletterTimeline
      .set("[gsap-newsletter-half]", { opacity: 0 })
      .set("[gsap-newsletter-full]", { x: -100 })
      .from("[gsap-newsletter-form]", { duration: .8, opacity: 0, y: 30 })
      .from("[gsap-newsletter-btn]", { duration: .4, opacity: 0, scale: 0.8 })
      .from("[gsap-newsletter-text]", { duration: .4, color: "#312E2B" }, "-=.2")
      .from("[gsap-newsletter-author]", { duration: .2, opacity: 0 }, "-=.8")
      .to("[gsap-newsletter-type]", { text: { value: "Writing to you" }, duration: .8, delay: 1, ease: "none" }, "-=1.5")
      .to("[gsap-newsletter-type-name]", { text: { value: "Marcin Sulikowski" }, duration: .8, delay: 1, ease: "none" }, "-=.7")
      .from("[gsap-newsletter-full]", { duration: .6, opacity: 0 }, "-=1.4")
      .from("[gsap-newsletter-half]", { duration: .01, opacity: 0 }, "-=.8")
      .from("[gsap-newsletter-full]", { duration: .8, x: -100 }, "-=.8")
    ;
  }
});