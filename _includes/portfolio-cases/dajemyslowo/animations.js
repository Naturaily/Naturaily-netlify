const goalConfettiTimeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 4 })
  .to('[data-gsap="picture"] [data-gsap="confetti"]', { duration: .2, opacity: 0, stagger: .08 })
  .to('[data-gsap="picture"] [data-gsap="confetti"]', { duration: .2, opacity: 1, stagger: .08 })
;

const solutionConfettiTimeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 4 })
  .to('[data-gsap="solution-people"] [data-gsap="confetti"]', { duration: .2, opacity: 0, stagger: .1 })
  .to('[data-gsap="solution-people"] [data-gsap="confetti"]', { duration: .2, opacity: 1, stagger: .1 })
;

ScrollTrigger.matchMedia({
  "(max-width: 992px)": () => {
    goalConfettiTimeline.play();
    solutionConfettiTimeline.play();
  },

  "(min-width: 992px)": () => {
    gsap
      .timeline({ scrollTrigger: { trigger: '[data-gsap="challenges"]', start: "0 center" } })
      .from('[data-gsap="challenges-man"]', { duration: .6, x: 250, y: 650, ease: "power4.in" })
    ;

    const goalPictureTl = gsap.timeline({ scrollTrigger: { trigger: '[data-gsap="picture"]' } })
      .from('[data-gsap="picture"] [data-gsap="picture-hand-circle"]', { duration: .4, scale: 0 })
      .from('[data-gsap="picture"] [data-gsap="picture-hand-chat"]', { duration: .4, scale: 0 }, "-=.4")
      .from('[data-gsap="picture"] [data-gsap="picture-hand-hand"]', { duration: .4, opacity: 0, x: -20, y: 30 })
      .from('[data-gsap="picture"] [data-gsap="picture-plus"]', { duration: .4, scale: 0 })
      .from('[data-gsap="picture"] [data-gsap="picture-people-left"]', { duration: .4, opacity: 0, x: -100 })
      .from('[data-gsap="picture"] [data-gsap="picture-people-right"]', { duration: .4, opacity: 0, x: 100 }, "-=.4")
      .from('[data-gsap="picture"] [data-gsap="confetti"]', { duration: .2, opacity: 0, stagger: .08 })
      .from('[data-gsap="picture"] [data-gsap="picture-equals"]', { duration: .4, scale: 0 }, "-=1")
      .from('[data-gsap="picture"] [data-gsap="picture-logo"]', { duration: .4, scale: 0, opacity: 0 })
    ;

    const solutionPeopleTl =  gsap.timeline({ scrollTrigger: { trigger: '[data-gsap="solution-people"]' } })
      .from('[data-gsap="solution-people"] [data-gsap="picture-people-left"]', { duration: .4, opacity: 0, x: -150 })
      .from('[data-gsap="solution-people"] [data-gsap="picture-people-right"]', { duration: .4, opacity: 0, x: 150 }, "-=.4")
      .from('[data-gsap="solution-people"] [data-gsap="confetti"]', { duration: .2, opacity: 0, stagger: .1 })
    ;

    goalPictureTl.eventCallback('onComplete', () => goalConfettiTimeline.play());
    solutionPeopleTl.eventCallback('onComplete', () => solutionConfettiTimeline.play());
  }
});