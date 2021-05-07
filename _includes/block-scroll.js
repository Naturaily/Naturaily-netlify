const hamburgerIcon = document.getElementById('mobileSpan');
const hamburgerIconHeight = hamburgerIcon.offsetHeight;
const navigation = document.querySelector('[data-menu]');
let lastScrollTop = 0;

const throttle = (fn, wait) => {
  let time = Date.now();

  return () => {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

const hasScrolled = () => {
  const scrollTop = window.scrollY;
  const scrollThrottle = 40;

  if (Math.abs(lastScrollTop - scrollTop) <= scrollThrottle) return;

  if (scrollTop > lastScrollTop && scrollTop > hamburgerIconHeight){
    hamburgerIcon.classList.add('nav-up');
  } else if (scrollTop + window.innerHeight < document.body.clientHeight) {
    hamburgerIcon.classList.remove('nav-up');
  }

  navigation.classList.remove('active');
  hamburgerIcon.classList.remove('open');

  lastScrollTop = scrollTop;
}

hamburgerIcon.addEventListener('click', () => {
  hamburgerIcon.classList.toggle('open');
  navigation.classList.toggle('active');
})

window.addEventListener('scroll', throttle(hasScrolled, 150));
