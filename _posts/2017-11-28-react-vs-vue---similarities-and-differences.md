---
title: React vs Vue - similarities and differences
description: >-
  Both React and Vue have gained a lot of attention and interest from developers
  in the past 3 years. Here's a brief comparison based on our experience.
slug: react-vue-similarities-and-differences
date: '2017-11-28 10:38:01 +0000'
category: JavaScript development
author: Wojciech Miśta
avatar: /assets/images/wojtek.jpg
image: /assets/images/vue-v-react.png
text-preview: >-
  Both React and Vue have gained a lot of attention and interest from the
  developer's community for the past 3 years. Although their technical nature is
  slightly different, they are often compared to each other due to a similar set
  of features making them compete in web development market.
tags:
  - Comparison
  - JavaScript development
---

Both React and Vue have gained a lot of attention and interest from the developer's community for the past 3 years. Although their technical nature is slightly different, they are often compared to each other due to a similar set of features making them compete in web development market.

## What is React?

React was created by the social media giant - Facebook - and published in March 2013. It allows developers to create large web-applications that can change the data over time with no need to reload the page itself. If you need an example of how it works just look at Facebook :) React aims to provide reliability, scalability, and simplicity.

Since Javascript is much more powerful than HTML, Facebook decided to create HTML itself directly from Javascript for which they developed React.js. React is written in JSX - JavaScript XML - Javascript syntax allowing quoting of HTML, meaning that you can code in pure JavaScript as well. Keep in mind that React is **not** a framework - it is a Javascript library.

## What is Vue?

Vue was built with an intention to organize and simplify web development by an ex-Google engineer Evan You. He was working with Angular at that time and, as he stated in an interview, “_figured, what if I could just extract the part that I really liked about Angular and build something really lightweight without all the extra concepts involved?_” [1]. Vue was designed to be incrementally adaptable and it can function as a framework capable of powering one-page websites. Evan You calls Vue a **Progressive JavaScript framework**, which basically means that you can add other libraries like Vuex or Vue Router to the core of Vue. These add-ons blend seamlessly with the core and are officially supported by Vue.

## What are the similarities between Vue and React?

* **Javascript** - Both Vue and React use some version of Javascript. React focuses on ECMAScript 6, while Vue uses both ECMAScript 5 and 6. It doesn’t really mean much, because tools like [Babel](https://babeljs.io) exist and you can use ES5 with React as well, you just won’t have ES6 features.

* For the sake of the development process usage of JavaScript means that it shouldn’t be difficult to find React and Vue developers. Programmers who are quite familiar with this programming language can learn both of them relatively quickly.

* Talking about coding it’s worth mentioning that both React and Vue support **TypeScript** and **Flow**.

* **Rich front-end experience** - They are both great for providing an excellent user interface. Basically, if the device we want to interface understands Javascript we can use Vue and React to describe user interface for it. [2]

* They both utilize **Virtual DOM** - a set of libraries and algorithms that allow you to improve front-end performance by avoiding work with heavy DOM. It lets you work with a lightweight JavaScript object that imitates the DOM tree. [3]

* There are many extensive development tools available for Vue and React as well as resources and guidelines to make coding more productive.

As you can see, when it comes to features, Vue and React are quite similar. **What are the differences?**

**Vue is a progressive framework, React is a JavaScript Library** - meaning that usually, you will need more libraries with React to form a solution. As a result, React is not as constraining as other JavaScript frameworks and gives more freedom to developers because they can manually add libraries you want and need in your project. React focuses on one very specific thing - building User Interfaces - and does it very well.

Neither React or Vue are opinionated - both of them are highly customizable.

## Intuitive syntax

Programmers familiar with other JavaScript frameworks can pick up Vue very easily due to its simplicity and clarity. Vue’s syntax is simple and easy to understand as well as its specific dependencies and components. Experienced developers working with Vue often find its structure very intuitive. Typically, this results in easier debugging and working with the framework, thus shorter and smoother development process.

## Learning curve

Let’s say that you’ve started a new project in your company and want your employees to work in a JavaScript Library/Framework they have never been working in before. Probably the most important factor in this situation that you need to consider is its learning curve. Vue’s learning curve is a lot less steep than React’s - developers describe Vue as a framework that just “makes sense.”

**Typically, Vue takes less code than React** - This factor makes the development process shorter resulting in saving both time and money. Here’s an example of Two-way data binding in Vue and React.

Vue:

![vue-code](/assets/images/vue.PNG "vue-code")

React:

![react-code](/assets/images/react.PNG "react-code")

## Performance

**Vue is perfect for small and performant applications**. Its development team shared a very interesting 3rd party benchmark conducted by rawgit.com. It shows the advantage of using Vue - in almost every case React appears to be slower than Vue.

![benchmark](/assets/images/benchmark.png "benchmark")

As we mentioned before, both React and Vue.js use virtual DOM, however **in Vue.js it is much faster and performant than in React**. Evan You, the founder of Vue.js, paid close attention to well-known DOM’s performant issues. He stated, “_Vue 2.0 tackles this problem by combining virtual DOM with its reactive dependency tracking system, thus the system can automatically and efficiently determine when and what to re-render, freeing the developer from unnecessary optimization work._”
Keep in mind that these facts are relevant only in edge cases when your app needs to be very fast. Normally, you shouldn’t be bothered by the tool’s performance because most of the apps don’t need to do operations like Creating rows routinely.

Another “performance-based” factor that may matter in your project is the size of the library. Depending on what your app’s target Internet connection is, you may have to optimize your product to easier get to the larger audience.

To get similar features to Vue in React you need React DOM (37.4Kb) and React with Add-ons library (11.4 Kb) which totals at 48.8 Kb. Vue’s library is only 25.6 Kb - almost half the React size. This data varies on the version of these Libraries, but as you can see Vue is more “slow-connection” friendly than React.

## Mobile platforms

Facebook, the company behind React, expanded the possibilities of their JavaScript Library by building a framework that allows creating cross-platform UI native apps - React Native. Recently, it has gained a lot of popularity and praise due to the fact that React developers can create UI native apps for every major platform with the knowledge and skills they already have. You can read more about React Native [here](http://naturaily.com/blog/post/things-you-need-to-know-about-react-native).

Vue’s team isn’t far behind. With the very similar philosophy in mind, they’ve partnered with the Chinese e-commerce giant - Alibaba - and created Weex. Developers can leverage their existing knowledge of VueJS to build native apps for iOS, Android, and the Web.

## Popularity

Let’s start with **NPM downloads chart**. According to the statistics from npmcharts.com, it is very clear who’s the winner here. React has reached a milestone of 1.7M NPM downloads in November of 2017 alone. Judging by a number of downloads from the past few months we can see that this number is only going to get bigger. Meanwhile, Vue’s downloads are not as impressive as React’s - a little over 200,000.

![Npm charts](/assets/images/npmcharts.PNG "Npm charts")

Next up - StackOverflow. The case here is very similar. The percentage of questions tagged with “ReactJS” is over 4 times higher than “VueJS” showing that the interest in React has been growing much faster, especially throughout 2017.

![Stack Overflow](/assets/images/stack-overflow.png "Stack Overflow")

## **GitHub** contributors

According to bestof.js.org, **React has gained much more popularity than Vue.js** among GitHub community. There are over 1,100 contributors working on React, which gained almost 81,000 stars on the service. Even though a number of people working on Vue.js is significantly lower - 152 - the project managed to gain over 73,000 stars.


## Conclusion

From our experience, whenever clients ask us questions such as “What should I choose? Technology X or Y?” we often advise them to check the market for available developers. The popularity of React is going to get only higher, meaning that it is much easier to find React developer than Vue developer. This may be caused by the fact that React had launched almost a year before Vue and the developers who were willing to learn a new JavaScript technology have just stuck with it. Another reason could be the technological giant behind React, Facebook, who gave React popularity and almost free advertisement. It was an assurement for the developers that Facebook’s new technology will be updated, growing and most importantly won’t be abandoned in the near future.

React’s ecosystem is huge, extremely flexible and has a lot of packages to choose from. To help you decide what technology you should choose in your project, you should estimate how big your application is going to be. Typically React is used for complex services - just look at Facebook, Instagram, New York Times, Codeacademy. If you that’s what you’ve been looking for, you should **definitely go with React**.

On the other hand, if you prefer **easy-to-learn, highly performant yet lightweight framework**, clean code and working in a small team rather than with a lot of people on something big - **go with Vue**. At Naturaily, we use Vue for most of our projects, because it better fits our needs.

**The decision should always be up to the team** because most of the time it is made based on personal preferences of the developers. You will be happy with whatever you choose. Both technologies are awesome.

### Are you interested in React applications? <a href="/#hire-us" title="Build your startup with a great Polish developers" class="button--pink-small">Let's talk!</a>

###### [1] Vivian Cromwell (3.11.2016) | “Evan You” | https://betweenthewires.org/

###### [2] Samer Buna (31.03.2017) | “Yes, React is taking over front-end development. The question is why.” | https://medium.freecodecamp.org/

###### [3] Tony Freed (11.06.2017) | ”What is Virtual Dom” | https://tonyfreed.blog/

###### (29.09.2017) | “Vue.js vs React: Which JavaScript Framework to Choose for Your Project” | https://da-14.com/blog/

###### Jens Neuhaus (28.08.2017r | “Angular vs. React vs. Vue: A 2017 comparison” | https://medium.com/
