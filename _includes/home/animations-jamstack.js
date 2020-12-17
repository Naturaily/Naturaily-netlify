const jamstackTimeline = gsap.timeline();

jamstackTimeline
  .set("[gsap-jamstack-full]", { x: -190, y: 2 })
  .set("[gsap-jamstack-half]", { opacity: 0 })
  .to("[gsap-jamstack-mask]", { duration: 1, x: 600 })
  .from("[gsap-jamstack-text]", { duration: .5, opacity: 0, x: 100 }, "-=.7")
  .from("[gsap-jamstack-full]", { duration: .3, opacity: 0 })
  .from("[gsap-jamstack-half]", { duration: .1, opacity: 0 })
  .from("[gsap-jamstack-full]", { duration: .5, x: -190 })
  .from("[gsap-jamstack-tablet]", { duration: .5, x: -200, opacity: 0 }, "-=.5")
  .from("[gsap-jamstack-page]", { duration: .5, x: 7, y: 30, opacity: 0 })
  .from("[gsap-jamstack-cta]", { duration: .5, opacity: 0 })
  .from("[gsap-jamstack-link]", { duration: 0.7, opacity: 0, scale: 0.9, y: 10, ease: "elastic" }, "+=.5");


ScrollTrigger.create({
  trigger: "[gsap-jamstack]",
  animation: jamstackTimeline,
  toggleActions: "restart none restart none"
});
