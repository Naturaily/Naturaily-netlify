const casesTilesTimeline = gsap.timeline();

casesTilesTimeline.from("[gsap-cases-tile]", { duration: 0.6, opacity: 0, y: 50, stagger: .2 });

ScrollTrigger.create({
  trigger: "[gsap-cases-tiles]",
  animation: casesTilesTimeline,
  toggleActions: "restart none restart none"
});


const numbersTimeline = gsap.timeline();
const num = { var: 0 };

function count() {
  switch(this.vars.var) {
    case 7:
      counter1.innerHTML = (num.var).toFixed();
      break;
    case 60:
      counter2.innerHTML = (num.var).toFixed();
      break;
    case 80:
      counter3.innerHTML = `${(num.var).toFixed()}%`;
      break;
    case 125:
      counter4.innerHTML = `${(num.var).toFixed()}k`
      break;
    case 0.8:
      counter5.innerHTML = (num.var).toFixed(1);
      break;
  }
}

const bigAttr = "-=.7";
const smallAttr = "-=.35";

numbersTimeline
  .from("[gsap-numbers-background]", { duration: 1, width: 0 })
  .set(num, { var: 0 }, bigAttr)
  .to(num, { var: 7, duration: .5, onUpdate: count }, bigAttr)
  .from("[gsap-numbers-tile-1]", { duration: .4, opacity: 0, y: 20 }, bigAttr)
  .set(num, { var: 50 }, smallAttr)
  .to(num, { var: 60, duration: .5, onUpdate: count }, smallAttr)
  .from("[gsap-numbers-tile-2]", { duration: .4, opacity: 0, y: 20 }, bigAttr)
  .set(num, { var: 60 }, smallAttr)
  .to(num, { var: 80, duration: .5, onUpdate: count }, smallAttr)
  .from("[gsap-numbers-tile-3]", { duration: .4, opacity: 0, y: 20 }, bigAttr)
  .set(num, { var: 100 }, smallAttr)
  .to(num, { var: 125, duration: .5, onUpdate: count }, smallAttr)
  .from("[gsap-numbers-tile-4]", { duration: .4, opacity: 0, y: 20 }, bigAttr)
  .set(num, { var: 0 }, smallAttr)
  .to(num, { var: 0.8, duration: .5, onUpdate: count }, smallAttr)
  .from("[gsap-numbers-tile-5]", { duration: .4, opacity: 0, y: 20 }, bigAttr);

ScrollTrigger.create({
  trigger: "[gsap-numbers-tiles]",
  animation: numbersTimeline,
  markers: true,
  toggleActions: "restart none restart none"
});
