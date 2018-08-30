---
title: Things you need to know about React Native
description: >-
  The popularity of React Native has skyrocketed in the past 2 years. Here's a
  brief introduction to the framework, its advantages and uses in software
  development.
slug: react-native-things-to-know
date: '2017-11-10 10:38:01 +0000'
category: JavaScript development
author: Wojciech Miśta
avatar: /assets/images/wojtek.jpg
image: /assets/images/react-native.jpg
text-preview: >-
  The popularity of React Native has skyrocketed for the past 2 years. Meet the
  framework developed by Facebook Team that stands behind Facebook, Instagram,
  and Skype mobile apps.
tags:
  - React Native development
  - Native mobile development
  - JavaScript development
---


The popularity of React Native has skyrocketed for the past 2 years. Meet the framework developed by Facebook Team that stands behind Facebook, Instagram, and Skype mobile apps.


## What is React Native?

React Native is a JavaScript framework for writing real, natively rendering mobile applications for iOS, Android, and Universal Windows Platform. As its name suggests, it is based on React (Facebook’s and Instagram’s JavaScript library for building user interfaces), but it doesn’t target the browser. Instead, React Native’s main target are mobile platforms.

React Native applications are written using JavaScript and JSX (HTML/XML-like structures), but then it invokes the native rendering APIs in Objective-C or Java depending on the platform, meaning that your app will consist of **real mobile UI components**, not webview. Your app will look and feel like any other native mobile application.

React Native can access platform features like a phone camera, user’s location due to the exposed JavaScript interfaces for platform APIs. According to John A. Calderaio from Medium.com, React Native manages GPU and Memory more efficiently than Swift. After series of benchmarks and tests, he states that “I am now more convinced than ever that React-Native is the framework of the future.” [1]

Upwork.com described React Native as **the future of hybrid app development**[3], and since React Native’s launch in 2015 the interest in this framework keeps constantly growing. React Native was used to develop apps like **Facebook, Instagram, Skype, Airbnb, Walmart, Tesla,** etc. But why?

## What are the advantages of React Native?

**JavaScript** - React Native uses JavaScript, one of the widely-used and fastest programming languages out there meaning that typically you can find React Native developer relatively quickly.

**Updates** - It is possible for developers to push updates directly to the users so that users don’t have to worry about downloading updates from for example Google Play. Unfortunately Apple’s new guidelines ban any form of Code Push in AppStore apps.[4]

**UI and Performance**
Currently used methods of writing mobile applications are combinations of JavaScript, HTML, and CSS **typically rendered using webviews**. This approach works, but it comes with drawbacks around **performance**.

Some frameworks try to mimic native UI elements, but the result feels a little bit off. Creating details like animations may take a lot of time, effort and will probably become out of date really quickly.

React Native has got you covered! It translates your markup to real, **native** UI elements, leveraging existing means of rendering on whatever platform you are working with. On top of that, React works separately from the UI meaning that **your applications will maintain high performance without sacrificing capability**. This means that developers coming from the Web with React can write mobile apps with the performance, look and feel of a native application, while using familiar tools.

**Cross-Platform and Code Sharing**
Working with React Native can shrink the resources needed to build mobile applications. Any developer familiar with React can easily pick up React Native and now target both Web and mobile platforms with the same skillset.

Much of your code can be shared across other supported platforms. Facebook noted in the React Europe 2015 keynote that Facebook Ads Manager application for Android **shares 87% of the iOS version**. Keep in mind that depending on the functionality of your app, not all the code you write will be cross-platform. However, if you want to build an app for both iOS and Android **choosing React Native will definitely save you a lot of time, money and lines of code**.

**Hot Reload**
React Native attempts to bring the best developer experience by saving time it takes to save the project just to be able to see the changes with an introduction to Hot Reload.

A video is worth a thousand words so here’s a comparison between Live Reload and Hot Reload:

<iframe width="100%" height="450" src="https://www.youtube.com/embed/2uQzVi-KFuc" frameborder="0" allowfullscreen></iframe>

## What are the disadvantages of React Native?

**Maturity** - React Native is very young, it launched in March of 2015 for iOS and 5 months later it was released for Android. Because of that the documentation definitely has room for improvement, but with Facebook on its side, it continues to evolve.

**Debugging** - React Native introduces another layer to your application, making debugging more difficult, especially at the intersection of React and the host platform.


![react-native-naturaily](/assets/images/react-native-naturaily.png "react-native-naturaily")


## Alternatives to React Native:

[**Xamarin**](https://www.xamarin.com/platform) - React Native faces a strong competition from Xamarin - an established cross-platform development platform. Its development is in C#. It offers basically equal performance, mature IDEs, comprehensive APIs and a little bit friendlier licensing.

[**Weex**](https://weex.apache.org/) - “Write once, run Everywhere” - the project allows developers to build applications for web, Android and iOS platform using the exact same codebase. Weex claims that it can compete with similar technologies because of its high performance, low footprint, simple syntax and extendable apis. You can build native applications using only HTML, CSS and JavaScript.

**Native app development** - Native app development often offers easy access to APIs, meaning that there are no restrictions and no “extra layers”. Native languages for Android and iOS are so called “strict languages”, which makes errors easier to detect.[2] Keep in mind that if you want to “go native” you will have to develop two applications for both iOS and Android.


## Conclusion:

React Native is a strong competitor to native app development and other mobile frameworks. It’s a framework with so many advantages and so few disadvantages. React Native can be written in JavaScript and then launched on iOS and Android platform **making cross-platform app development much easier, faster and cost-effective.**


###### References:

###### Eisenman Bonnie (2015) | “Learning React Native - Building Native Mobile Apps With JavaScript” | O’Reilly Media

###### [1] John A. Calderaio (2017.02.22) | “Comparing the Performance between Native iOS (Swift) and React-Native” | https://medium.com/

###### [2] Julia Friberg (2017.07.06) | “React Native vs Native in Mobile App Development” | https://www.varvet.com/

###### [3] Carey Wodehouse | “7 Reasons Why Facebook’s React Native Is the Future of Hybrid App Development” | https://www.upwork.com/

###### [4] “Message from Apple Review...“ | https://forums.developer.apple.com/thread/73640
