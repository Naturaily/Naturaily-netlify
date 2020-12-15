const casesTilesTimeline    = gsap.timeline();
const technologiesTimeline  = gsap.timeline();

const animationParams = { duration: 0.6, opacity: 0, y: 50, stagger: .2 }

casesTilesTimeline
  .from("[gsap-cases-tile]", animationParams);
technologiesTimeline
  .from("[gsap-technologies-tile]", animationParams);

ScrollTrigger.create({
  trigger: "[gsap-cases-tiles]",
  animation: casesTilesTimeline,
  toggleActions: "restart none restart none"
});

ScrollTrigger.create({
  trigger: "[gsap-technologies]",
  animation: technologiesTimeline,
  markers: true,
  toggleActions: "restart none restart none"
});
