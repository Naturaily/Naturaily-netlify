---
title: How to use PWA plugin in Vue CLI 3.0
description: >-
  Learn how to create Progressive Web Applications in Vue CLI 3.0 using plugins.
  Let's jump into the world of PWA!
slug: pwa-vue-cli-3
layout: post
twitter-card: summary_large_image
date: '2018-08-06 10:42:09 +0000'
category: JavaScript development
author: Tomasz Żdanuk
avatar: tomasz.jpg
image: pwa-vue-cli-3.jpg
text-preview: >-
  In my previous post about Vue CLI 3.0 I've mentioned about PWA support plugin
  as one of the greatest features in my opinion. In this post, I'd like to
  introduce you into PWA world using Vue CLI 3.0.
tags:
  - Vue js development
  - JavaScript development
---
In my previous post about Vue CLI 3.0 I've mentioned about PWA support plugin as one of the greatest features in my opinion. In this post, I'd like to introduce you into PWA world using Vue CLI 3.0.

## First of all, what's the PWA?

According to Google Developers PWA description, Progressive Web Apps is a concept which improves user experiences in web applications, by making them reliable, fast and engaging. During Google I/O '17 presentation about the PWA, it was mentioned that in top 1000 mobile apps vs top 1000 mobile web properties, mobile web has almost **3 times more monthly unique visitors** than native apps, but even more interesting are statistics about average time spent there. Native apps users spend there more than **20 times more time than mobile web users**! Those statistics are crushing! But there is an explanation to that!

**Native mobile apps are more engaging** to users than web pages. It's way easier to just tap the icon on the home screen than to type a long URL. Native apps are also designed for mobile purposes, as well as in terms of graphic design, features and technical aspects. Unlike web apps, native apps have push notifications, access to your camera, or mic, but is that still true? No! PWA can that too!

## Read: [A brief guide to PWAs in 2018.](https://naturaily.com/blog/pwa-guide)

## PWA Characteristics

PWA is a mobile-oriented strategy of creating web applications, here's how Google on their site about PWA described three key PWA characteristics:

* Reliable,
* Fast,
* Engaging.

But what that's really mean for user?

In my opinion, it means:

* Accessible offline - to provide reliability,
* Fast on every network conditions and every device,
* Installable on your home screen - to be engaging.

More characteristics you can find in `Lighthouse and PWA checklist` section and across the whole article.

## PWA in Vue - the first touch

Vue CLI 3.0 introduced plugin application structure, thanks to that you can easily add PWA support plugin to your app whenever you like.

To add PWA support plugin to your existing Vue CLI 3.0 app, simply type in your console:

```shell
vue add @vue/pwa
```

Vue CLI generators will create all required files to make your app PWA ready.

When from the start you know that you need PWA in your new app you can use

```shell
vue create <app-name>
```

and then simply choose in wizard 'PWA support` option.

When you have your plugin installed or app created, you can find in your app tree files which are crucial in PWA app.

Those files are:

* `manifest.json`
* `registerServiceWorker.js`
* and few less relevant files.

I'll describe in more details the most important files in next sections of this article.

## Make your web app installable

One of the ways to make your app more engaging is making it installable. Thanks to that users can have easy access to your site by simple tapping icon on home screen, what is way much faster than typing whole URL. To make it possible, you only need to create and/or fill manifest file.
The manifest provides the most crucial information about your application, such as app name, an icon displayed on a home screen and more. The full list of settings you can find in [official MDN web docs](https://developer.mozilla.org/en-US/docs/Web/Manifest)

Vue CLI 3.0 and PWA plugin would create default `manifest.json` file for you, but remember to customize it for your needs! Here's how the default `manifest.json` file looks like (file is located in `/public` folder):

```json
{
  "name": "pwa",
  "short_name": "pwa",
  "icons": [
    {
      "src": "/img/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image.png"
    },
    {
      "src": "/img/icons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image.png"
    }
  ],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#4DBA87"
}
```

PWA template app also will generate a set of icons which will be used to represent your app on mobile devices. Imo, it's a good reference of what icon sizes you should made to make your app looking good on a home screen.

`manifest.json` it's not the only place where you can take a look when making your app installable. Few more tweaks you can make also from `vue.config.js` file, you can change there features like theme color, MS Tile color, or flag your app as not capable for Apple devices with iOS before 11.3 (you can read more about PWA support on Apple devices in `PWA on Apple devices` section).
For the full list of tweaks you can make in `vue.config.js` file and example configuration take a look here: [link](https://www.npmjs.com/package/@vue/cli-plugin-pwa/v/3.0.0-rc.1)

## Service Workers

'Service Workers' is a script that runs in the background and that allows your app to work not only online, but also offline, what is one of the PWA characteristics.

The core feature of service workers used in PWA is its ability to intercept and handle network requests usually done by caching but thanks to the service workers you can do a lot more than only to cache your network requests. By using service workers you can also achieve background sync or push notifications.

To make your 'Service Workers' actually work, there are two prerequisites:

1. Browser support

  For a long time, the crucial issue with 'service workers' was the lack of support from every browser. Currently, the situation looks much more optimistic and the most popular browsers are supporting SW. You can find more details on Jake Archibald page.

2. HTTPS

  Service Workers are a very powerful thing. It can fabricate and filter your data or hijack connections. That's why HTTPS is that important.

If you want to read more about Service Worker, I would recommend you to take a deeper look [here](https://developers.google.com/web/fundamentals/primers/service-workers/).

## What should we cache and how?

```
There are only two hard things in Computer Science:
cache invalidation and naming things.

~Phil Karlton
```

To make your app working offline, it is important to cache proper files and resources in a proper manner. In the case of web application it will be usually:

* App core Javascripts and CSS files
* Fonts
* Images
* Crucial HTTP Requests.

There is no universal rule what you should cache in your application, so the final decision you have to make on your own despite what's best for your application.

There is one more decision for you to take in this case: how to cache those files.

**Vue CLI 3.0** under the hood is using workbox to operate the service wokers, here are cache strategies available there:

* cacheFirst
  * Suites best: Fonts, Images
* networkFirst
  * Suites best: Network Requests
* staleWhileRevalidate
  * Suites best: JS and CSS files that aren't precached

Here's how it can look in Vue Service Worker file, service worker code is quite self-explanatory:

```javascript
workbox.setConfig({
  debug: false,
});

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://some-fancy-api.com'),
  workbox.strategies.networkFirst({
    cacheName: 'api',
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  }),
);
```

Remeber to register your Service Worker in the app. Vue CLI created the `registerServiceWorker` file for you, and here's how it's looks:

```javascript
import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
```

NOTE: Remember to give the same name for Service worker file as it stands in `registerServiceWorker`. In this case `service-worker.js`.

For more information about caching using Workbox take a look [here.](https://developers.google.com/web/tools/workbox/)

## Hardware access

One of the biggest advantages of mobile native apps is the accessibility to the hardware features such as camera, geolocation, Bluetooth, etc., but nowadays even web application can have an access to the many native features of your mobile phone or laptop. Of course, a lot depends of your web browser, and native mobile apps still will have a little bit better access, but web apps have nothing to be ashamed of.

If you are interested in [What Web Can Do Today](https://whatwebcando.today/) you should visit this [link.](https://whatwebcando.today/)

I will skip part of how to implement [Camera](https://developers.google.com/web/updates/2016/12/imagecapture) or [Bluetooth](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) access in your Vue app, because that's not the case of this article and the web is full of better written resources on how to get into those native features.

## PWA on Apple devices

PWA is technology widely supported by Google, thanks to that it works without any problems on Android devices but it's a little bit more problematic on iOS devices.

Apple has already showed the PWA support on iOS devices, so it's only the matter of time. They still have a lot of work ahead of them to be as good as Google in this case.

The iOS 11.3 version was a ray of hope for PWA. This update comes with support for fundamental PWA features on Apple mobile devices, like service workers and app manifest files.

Even with that, developing an app for an Apple device needs a lot more focus from the developer than it is necessary for an Android app. There are still problems with a splash screen, home screen buttons, navigation, data persistence, etc.

Some of these problems were hacked by Netguru developers, you can read more about that [here](https://www.netguru.co/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native).

Generating a splash screen graphics will be a lot easier with Appscope [tool](https://appsco.pe/developer/splash-screens).

## Lighthouse and PWA checklist

PWA is supported by Google, they released tools and notes, which should help you write your perfect PWA.

Lighthouse is a built-in Chrome plugin which allows you to audit your application from different angles, one of them is also PWA. Lighthouse PWA audit will automatically check for you features like:

* Service worker registration,
* Splash screen configuration,
* Respond when site is offline,
* HTTPS presence
* Speed on 3G connection
* and a lot more

Lighthouse PWA audit will check only required part of baseline [PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist), but even there are things which you should check manually like: Site works cross-browser, Each page has a URL or Page transition don't feel like they block on the network connection.

## Conclusion

PWA still have a long way to come, but it's on very good track!

I hope the Apple will soon fully support PWA apps because that should help PWA in becoming better and more popular technology. Thanks to the **Vue CLI 3.0**, building **PWA apps** is as easy as pie, and thanks to the plugin structure you can easily inclue PWA to your project on every stage of the development.

All what you have to worry about is preparing graphics and making decisions on what and how you want to cache, Vue PWA plugin will do the dirty work for you.
