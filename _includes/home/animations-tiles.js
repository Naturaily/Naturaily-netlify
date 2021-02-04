ScrollTrigger.matchMedia({
  "(min-width: 992px)": () => {
    gsap
      .timeline({ scrollTrigger: { trigger: "[gsap-cases-tiles]" } })
      .from("[gsap-cases-tile]", { duration: .8, opacity: 0, y: 40, stagger: .2 })
    ;

    gsap
      .timeline({ scrollTrigger: { trigger: "[gsap-technologies]" } })
      .from("[gsap-technologies-tile]", { duration: .7, opacity: 0, y: 70, stagger: .2 })
    ;

    gsap
      .timeline({ scrollTrigger: { trigger: "[gsap-blog]" } })
      .from("[gsap-blog-background]", { duration: 1, backgroundPosition: "100% 0" })
      .from("[gsap-blog-tile]", { duration: .6, opacity: 0, y: 50, stagger: .2 }, "-=.7")
      .from("[gsap-blog-link]", { duration: .5, opacity: 0, scale: 0.8 }, "+=.3")
    ;
  }
});
