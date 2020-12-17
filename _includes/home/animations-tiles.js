const casesTilesTimeline = gsap.timeline();
const technologiesTimeline = gsap.timeline();
const blogTimeline = gsap.timeline();

const tilesSections = {
  cases: { trigger: "[gsap-cases-tiles]", timeline: casesTilesTimeline },
  technologies: { trigger: "[gsap-technologies]", timeline: technologiesTimeline },
  blog: { trigger: "[gsap-blog]", timeline: blogTimeline }
};

casesTilesTimeline
  .from("[gsap-cases-tile]", { duration: .8, opacity: 0, y: 40, stagger: .2 });
technologiesTimeline
  .from("[gsap-technologies-tile]", { duration: .7, opacity: 0, y: 70, stagger: .2 });
blogTimeline
  .from("[gsap-blog-background]", { duration: 1, width: 0 })
  .from("[gsap-blog-tile]", { duration: .6, opacity: 0, y: 50, stagger: .2 }, "-=.7")
  .from("[gsap-blog-link]", { duration: .5, opacity: 0, scale: 0.8 }, "+=.3");

for (const section in tilesSections) {
  ScrollTrigger.create({
    trigger: tilesSections[section].trigger,
    end: "top+=250 bottom",
    onEnter: () => tilesSections[section].timeline.restart(),
    onLeave: () => tilesSections[section].timeline.play(),
    onEnterBack: () => tilesSections[section].timeline.reverse(1)
  });
}
