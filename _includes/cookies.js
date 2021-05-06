window.addEventListener('load', () => {
  const cookieAlert = document.getElementById('cookieInfo');

  const setCookie = (name, value, days) => {
    const date = new Date;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);

    document.cookie = `${name}=${value};path=/;expires=${date.toGMTString()}`;
  };

  const getCookie = (name) => {
    const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);

    return v ? v[2] : null;
  };

  const toogleCoookieAlert = () => cookieAlert.classList.toggle('cookie-hide');

  if (!getCookie('cookiesAccepted')) {
    const cookieBtnRemove = document.getElementById('cookieRemove');

    toogleCoookieAlert();

    cookieRemove.addEventListener('click', () => {
      setCookie('cookiesAccepted', true, 365);
      toogleCoookieAlert();
    })
  }
}, { passive: true });
