const numbersTimeline = gsap.timeline();
const num1 = { var: 0 };
const num2 = { var: 0 };
const num3 = { var: 0 };
const num4 = { var: 0 };
const num5 = { var: 0 };

numbersTimeline
  .from("[gsap-numbers-background]", { duration: 1, width: 0 })
  .from("[gsap-numbers-tile]", { duration: .7, opacity: 0, y: 30, stagger: .3 }, "-=.4")
  .to(num1, { var: 7, duration: .5, onUpdate: () => counter1.innerHTML = num1.var.toFixed() }, "-=1.8")
  .to(num2, { var: 60, duration: .5, onUpdate: () => counter2.innerHTML = num2.var.toFixed() }, "-=1.5")
  .to(num3, { var: 80, duration: .5, onUpdate: () => counter3.innerHTML = `${num3.var.toFixed()}%` }, "-=1.2")
  .to(num4, { var: 125, duration: .5, onUpdate: () => counter4.innerHTML = `${num4.var.toFixed()}k` }, "-=.9")
  .to(num5, { var: 0.8, duration: .5, onUpdate: () => counter5.innerHTML = num5.var.toFixed(1) }, "-=.6");

ScrollTrigger.create({
  trigger: "[gsap-numbers-tiles]",
  animation: numbersTimeline,
  end: "top+=125 bottom",
  onEnter: () => numbersTimeline.timeScale(1).restart(),
  onLeave: () => numbersTimeline.timeScale(1).play(),
  onEnterBack: () => numbersTimeline.timeScale(2).reverse(2)
});
