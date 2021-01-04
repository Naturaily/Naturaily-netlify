const headerTimeline = gsap.timeline();

headerTimeline
  .from("[gsap-hero-background]", { duration: 1, backgroundPosition: "100% 0", delay: 1 })
  .from("[gsap-logo]", { duration: .5, opacity: 0, ease: "back" }, "-=.7")
  .from("[gsap-nav-item]", { duration: .5, opacity: 0, y: -150, stagger: 0.15 }, "-=.5")
  .from("[gsap-eu-bar]", { duration: 1, opacity: 0, y: -100 }, "-=1")
  .from("[gsap-nav-estimate]", { duration: .5, opacity: 0, ease: "back" }, "-=.5")
  .from("[gsap-hero-line]", { duration: 0.7, opacity: 0, y: 20, stagger: .25 })
  .from("[gsap-hero-mask]", { duration: .05, opacity: 0 }, "-=1.3")
  .from("[gsap-hero-photo]", { duration: 4, opacity: 0, x: -50, scale: 0.9, ease: "expo" }, "-=1.3")
  .from("[gsap-hero-clutch]", { duration: 1.5, opacity: 0, scale: 0.3, ease: "back" }, "-=3")
  .from("[gsap-hero-star]", { duration: 0.7, opacity: 0, scale: 0.3, y: 20, stagger: .25, ease: "elastic" }, "-=3.2")
  .from("[gsap-hero-areas]", { duration: 0.7, opacity: 0, left: -100 }, "-=2.3")
  .from("[gsap-hero-tile]", { duration: 0.7, opacity: 0, y: 150, stagger: .15 }, "-=2");
