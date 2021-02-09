const countValues = [ 7, 94, 70, 125, 0.8 ];
const mobileValues = [ 7, 94, '70%', '125k', 0.8 ];

ScrollTrigger.matchMedia({
  "(min-width: 992px)": () => {
    const num1 = { var: 0 };
    const num2 = { var: 0 };
    const num3 = { var: 0 };
    const num4 = { var: 0 };
    const num5 = { var: 0 };

    gsap
      .timeline({ scrollTrigger: { trigger: "[gsap-numbers-tiles]" } })
      .from("[gsap-numbers-background]", { duration: 1, backgroundPosition: "100% 0" })
      .from("[gsap-numbers-image-mask]", { duration: 1, x: "-100%" }, "-=1")
      .to("[gsap-numbers-image-img]", { duration: 0.8, x: 100, scale: 1.05 }, "-=.6")
      .from("[gsap-numbers-tile]", { duration: .7, opacity: 0, y: 30, stagger: .3 }, "-=.4")
      .to(num1, { var:countValues[0], duration: .5, onUpdate: () => counter1.innerHTML = num1.var.toFixed() }, "-=1.8")
      .to(num2, { var: countValues[1], duration: .5, onUpdate: () => counter2.innerHTML = num2.var.toFixed() }, "-=1.5")
      .to(num3, { var: countValues[2], duration: .5, onUpdate: () => counter3.innerHTML = `${num3.var.toFixed()}%` }, "-=1.2")
      .to(num4, { var: countValues[3], duration: .5, onUpdate: () => counter4.innerHTML = `${num4.var.toFixed()}k` }, "-=.9")
      .to(num5, { var: countValues[4], duration: .5, onUpdate: () => counter5.innerHTML = num5.var.toFixed(1) }, "-=.6")
    ;
  },

  "(max-width: 991px)": () => {
    for (const value in countValues) {
      document.querySelector(`#counter${parseInt(value) + 1}`).innerHTML = mobileValues[value];
    }
  }
});
