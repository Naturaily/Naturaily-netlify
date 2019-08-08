---
title: Three different ways to develop a mobile app
description: Hybirid? Native? PWA? Which one should you choose to develop a mobile app.
slug: three-ways-to-develop-mobile-apps
layout: post
twitter-card: summary_large_image
date: '2018-11-28 11:15:00 +0200'
category: Native mobile development
author: Epifany Bojanowska
avatar: epifany_bojanowska-2.jpg
image: ways-to-develop-mobile-apps.jpg
text-preview: >-
  So you have a mobile app you would like to build. The first question you need
  to ask yourself is what kind of app is it going to be? Native? Hybrid? Web?
  What is the difference and how should you choose? 
tags:
  - Native mobile development
  - JavaScript development
  - Frontend development
---
So you have a mobile app you would like to build. The first question you need to ask yourself is what kind of app is it going to be? **Native? Hybrid? Web?** What is the difference and how should you choose? 

Building a mobile app involves a lot more choices varying from the design, type, prospective user and their experience. A lot of those decisions boil down to whether you want to develop a **mobile app** or a **progressive web app**. If you ended up on this post you most likely decided on a mobile app. One of the advantages of this solution include an icon on the user’s screen that encourage repeated use. Another reason might be that the product needs to integrate with the device’s operating system to cache data or connect to Bluetooth for IoT (Internet of Things).

We hope the guide below will help you make an informed decision that will benefit the user experience and not elevate the costs and time of development.

## Native

Native apps are developed and designed specifically for the operating system that they are running on.

* **iOS** - Swift or Objective-C<br>Objective-C is the older and currently more favoured language. It is a bit more difficult to learn, but the majority of experienced developers are already familiar with it. Swift is still new but it is growing more and more popular. It is easier to learn, but with that said, it isn’t recommended for big projects.
* **Android** - Kotlin or Java<br>Similarly to iOS, when it comes to Android languages, Java is the older and more popular language, but Kotlin isn’t far behind and is said to catch up soon. This is all due to Google announcing it to be Android’s official programming language at Google I/O Developer Conference in  2017.

One of the biggest advantages of building a native app is the fact that it makes use of the **device’s security, speed and specific features in full**. Native code runs fastest for on-screen interactions or processing data that is stored locally. The user experience is usually much better due to the fact that the app looks and acts like other apps on the user’s device. Moreover, an access to wide range of APIs puts no limitation on app usage. 

The biggest disadvantage to building native apps is the cost. The developers must build a separate app for every operating system. This means you might need separate developers for each platform that you want your app to work on.

## Hybrid

Hybrid apps are build using a multi-platform technology powered by JavaScript, CSS, HTML5 or all three, and are essentially web apps in a native wrapper. See examples of hybrid frameworks below:

* Vue Native - [read more](https://naturaily.com/blog/vue-js-2018)
* React Native (developed by Facebook) - [read more](https://naturaily.com/blog/react-native-things-to-know)
* Angular Mobile (developed by Google) 
* Flutter (developed by Google) 
* Xamarin (developed by Microsoft)
* Cordova (formerly Phonegap developed by Apache)

All the advantages of hybrid apps stem from the fact that, **instead of building multiple native apps for each operating system, you are only building one core app** and only modifying it to work on all platforms. A single code-base makes for fewer developers **(lower cost of development)**, faster and easier updates and lower maintenance cost. If your app seems like it would be a good fit for hybrid, this can considerably reduce your time to market.

One of the biggest disadvantages of hybrid apps is their performance. Getting those types of apps to work cross-platform can be a lot of work. Sometimes the total cost of developing and maintaining the app may reach the cost of developing separate native apps, thus rendering the cost benefits negligible. It seems the same goes for time - a hybrid app may take less time to develop but if it is complicated and you want it to look right on different operating systems - it will likely take even more time than native development.

## Progressive Web Applications

In 2015, designer Frances Berriman and Google Chrome engineer Alex Russell coined the term "progressive web apps" to describe apps taking advantage of new features supported by modern browsers, including service workers and web app manifests, that let users upgrade web apps to progressive web applications in their native operating system. 

Progressive web applications (PWAs) are web applications that load like regular web pages or websites but can offer the user functionality such as working offline, push notifications, and device hardware access that used to only be available in native mobile applications. PWAs are an emerging technology that combine the open standards of the web offered by modern browsers and the benefits of a rich mobile experience. Simply put - **PWAs are mobile sites, designed to work like a native app.**

Unfortunately PWA are still relatively new and not broadly supported (Android only started supporting it in 2017 with Apple following mid-2018).

As the technology improves, there definitely emerge some good use cases for PWAs. For instance, large social media sites are a good example of something that would do well as a PWA. Twitter Lite and Pinterest both demonstrate how you can bring your mobile web experience almost on par with your native app, which would work well in markets with poor or expensive connectivity.

Find out more about PWAs [here](https://naturaily.com/blog/pwa-guide).

## Conclusion

Once you develop and release your app, it will most likely grow and change, so the conditions that caused you to make your original choice as to which type of app to built might also change. Whether you decide on native, hybrid or web, very much depends on the nature of your project, what your goals are, and what your users’ expectations are. There is no single answer for every project. 

The golden rule for an app developer is: no matter what type of application, it has to make life easier. And all types of apps, be it native, hybrid or web, should primarily cater to the needs of the end user. **Each type of app has its pros and cons, and therefore sometimes the business requirements may dictate the choice of one or the other.**
