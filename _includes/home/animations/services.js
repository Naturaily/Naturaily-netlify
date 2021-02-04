ScrollTrigger.matchMedia({
  "(min-width: 992px)": () => {
    gsap
      .timeline({ scrollTrigger: { trigger: "[gsap-numbers-accent]" } })
      .from("[gsap-services-box]", { duration: .8, scaleX: 0 })
      .from("[gsap-services-image-mask]", { duration: .8, x: "100%" }, "-=.8")
      .to("[gsap-numbers-accent]", { duration: .8, scaleX: 1, x: "50vw" }, "-=.8")
      .from("[gsap-services-image]", { duration: .8, x: 20 }, "-=.6")
      .from("[gsap-services-header]", { duration: .5, opacity: 0, x: 40 }, "-=.4")
      .from("[gsap-services-text]", { duration: .5, opacity: 0, y: 60 }, "-=.2")
      .from("[gsap-services-paragraph]", { duration: .5, opacity: 0, y: 40 }, "-=.3")
      .from("[gsap-services-btn]", { duration: .4, opacity: 0, scale: .9 })
    ;
  }
});
