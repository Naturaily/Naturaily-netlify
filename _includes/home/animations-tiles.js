const casesTilesTimeline    = gsap.timeline();
const technologiesTimeline  = gsap.timeline();
const blogTimeline          = gsap.timeline();
const animationParams       = { duration: 0.6, opacity: 0, y: 50, stagger: .2, delay: .3 };

const tilesSections = {
  cases:          { trigger: "[gsap-cases-tiles]", timeline: casesTilesTimeline },
  technologies:   { trigger: "[gsap-technologies]", timeline: technologiesTimeline },
  blog:           { trigger: "[gsap-blog]", timeline: blogTimeline }
};

casesTilesTimeline
  .from("[gsap-cases-tile]", animationParams);
technologiesTimeline
  .from("[gsap-technologies-tile]", animationParams);
blogTimeline
  .from("[gsap-blog-background]", { duration: 1, width: 0 })
  .from("[gsap-blog-tile]", animationParams, "-=.7")
  .from("[gsap-blog-link]", { duration: 0.7, opacity: 0, scale: 0.9, y: 10, ease: "elastic" }, "+=.5");

for (const section in tilesSections) {
  ScrollTrigger.create({
    trigger: tilesSections[section].trigger,
    animation: tilesSections[section].timeline,
    toggleActions: "restart none restart none"
  });
}
