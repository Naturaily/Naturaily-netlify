const productTimeline = gsap.timeline();
const ecommerceTimeline = gsap.timeline();

const developmentSections = {
  product: { trigger: "[gsap-product-image]", timeline: productTimeline },
  ecommerce: { trigger: "[gsap-ecommerce-image]", timeline: ecommerceTimeline },
};
const gsapItemParams = { duration: .5, x: 20, opacity: 0 };

productTimeline
  .from("[gsap-product-background]", { duration: .8, backgroundPosition: "100% 0" })
  .set("[gsap-product-mask], [gsap-product-image]", { duration: .01, opacity: 1 }, "-=.2")
  .to("[gsap-product-mask]", { duration: .6, x: "-100%"}, "-=.2")
  .to("[gsap-product-img]", { duration: 1, scale: 1.15, x: 15 }, "-=.4")
  .from("[gsap-product-header]", { duration: .6, y: 50, opacity: 0 }, "-=1")
  .from("[gsap-product-item-1]", gsapItemParams, "-=.9")
  .from("[gsap-product-item-2]", gsapItemParams, "-=.1")
  .from("[gsap-product-item-3]", gsapItemParams, "-=.1");

ecommerceTimeline
  .from("[gsap-ecommerce-background]", { duration: .8, backgroundPosition: "0% 0%" })
  .set("[gsap-ecommerce-mask], [gsap-ecommerce-image]", { duration: .01, opacity: 1 }, "-=.2")
  .to("[gsap-ecommerce-mask]", { duration: .6, x: "100%"}, "-=.2")
  .to("[gsap-ecommerce-img]", { duration: 1, scale: 1.15, x: -15 }, "-=.4")
  .from("[gsap-ecommerce-header]", { duration: .6, y: 50, opacity: 0 }, "-=1")
  .from("[gsap-ecommerce-item-1]", gsapItemParams, "-=.9")
  .from("[gsap-ecommerce-item-2]", gsapItemParams, "-=.1")
  .from("[gsap-ecommerce-item-3]", gsapItemParams, "-=.1")
  .from("[gsap-ecommerce-item-4]", gsapItemParams, "-=.1");

for (const section in developmentSections) {
  ScrollTrigger.create({
    trigger: developmentSections[section].trigger,
    end: "top+=250 bottom",
    onEnter: () => developmentSections[section].timeline.restart(),
    onLeave: () => developmentSections[section].timeline.play(),
    onEnterBack: () => developmentSections[section].timeline.reverse(1.5)
  });
}
