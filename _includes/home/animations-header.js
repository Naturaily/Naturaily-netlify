const headerTimeline = gsap.timeline();

headerTimeline
  .from("[gsap-hero-background]", { duration: 1, width: 0 })
  .from("[gsap-eu-bar]", { duration: 1, opacity: 0, y: -100 })
  .from("[gsap-logo]", { duration: .5, opacity: 0, ease: "back" })
  .from("[gsap-nav-item]", { duration: 1, opacity: 0, y: -150, stagger: 0.25 })
  .from("[gsap-nav-estimate]", { duration: .5, opacity: 0, ease: "back" })
