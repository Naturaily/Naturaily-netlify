ScrollTrigger.matchMedia({
  "(min-width: 992px)": () => {
    const casesTilesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "[gsap-cases-tiles]",
        end: "top+=250 bottom",
        onEnter: () => casesTilesTimeline.restart(),
        onLeave: () => casesTilesTimeline.play(),
        onEnterBack: () => casesTilesTimeline.reverse(1)
      }
    });

    const technologiesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "[gsap-technologies]",
        end: "top+=250 bottom",
        onEnter: () => technologiesTimeline.restart(),
        onLeave: () => technologiesTimeline.play(),
        onEnterBack: () => technologiesTimeline.reverse(1)
      }
    });

    const blogTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "[gsap-blog]",
        end: "top+=250 bottom",
        onEnter: () => blogTimeline.restart(),
        onLeave: () => blogTimeline.play(),
        onEnterBack: () => blogTimeline.reverse(1)
      }
    });

    casesTilesTimeline
      .from("[gsap-cases-tile]", { duration: .8, opacity: 0, y: 40, stagger: .2 })
    ;

    technologiesTimeline
      .from("[gsap-technologies-tile]", { duration: .7, opacity: 0, y: 70, stagger: .2 })
    ;

    blogTimeline
      .from("[gsap-blog-background]", { duration: 1, backgroundPosition: "100% 0" })
      .from("[gsap-blog-tile]", { duration: .6, opacity: 0, y: 50, stagger: .2 }, "-=.7")
      .from("[gsap-blog-link]", { duration: .5, opacity: 0, scale: 0.8 }, "+=.3")
    ;
  }
});
