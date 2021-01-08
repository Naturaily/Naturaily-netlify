const testimonialsTimeline = gsap.timeline();
const testimonialsLinks = document.querySelectorAll("[gsap-testimonials-menu-item]");

testimonialsTimeline
  .from("[gsap-testimonials-header]", { duration: .6, y: 50, opacity: 0 })
  .from("[gsap-testimonials-text]", { duration: .6, y: 50, opacity: 0 }, "-=.3")
  .from("[gsap-testimonials-clutch]", { duration: .6, y: 50, opacity: 0 }, "-=.7")
  .from("[gsap-testimonials-menu-item]", { duration: .3, x: 30, opacity: 0, stagger: .2 })
  .from("[gsap-testimonials-cards]", { duration: .4, y: 30, opacity: 0 }, "-=1.2")
;

ScrollTrigger.create({
  trigger: "[gsap-testimonials-header]",
  end: "top+=250 bottom",
  onEnter: () => testimonialsTimeline.restart(),
  onLeave: () => testimonialsTimeline.play(),
  onEnterBack: () => testimonialsTimeline.reverse(1)
});
