const casesTilesTimeline = gsap.timeline();

casesTilesTimeline.from("[gsap-cases-tile]", { duration: 0.7, opacity: 0, y: 100, stagger: .2 })

ScrollTrigger.create({
  trigger: "[gsap-cases-tiles]",
  animation: casesTilesTimeline,
  toggleActions: "restart none restart none"
});
