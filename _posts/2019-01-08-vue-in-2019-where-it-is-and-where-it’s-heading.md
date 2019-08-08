---
title: Vue in 2019 - where it is and where it’s heading
description: >-
  Vue JS is coming really strong into 2019, and with every month is getting
  closer to stand against giants such as Angular or even React in terms of
  popularity and utilization in business applications.
slug: vue-2019
layout: post
twitter-card: summary_large_image
date: '2019-01-08 11:19:26 +0200'
category: Frontend development
author: Wojciech Miśta
avatar: wojciech.jpg
image: vue-in-2019.png
text-preview: >-
  Vue JS is coming really strong into 2019, and with every month is getting
  closer to stand against giants such as Angular or even React in terms of
  popularity and utilization in business applications.
tags:
  - Vue js development
  - Frontend development
  - JavaScript development
---
So, if you’re here then you are probably wondering where the Vue framework is in 2019. The past year was really good for this, loved by many, framework. With constant updates, support from its creators and very talented community, Vue JS is coming really strong into 2019, and with every month is getting closer to stand against giants such as Angular or even React in terms of popularity and utilization in business applications.

To take a better look at what we are dealing with, let’s start with some fun and not boring at all statistics! 

## Vue's position in 2019

According to BuiltWith.com, over **97,000 live websites** are currently using VueJS. For comparison, 148,000 live websites are using React. As we can see, VueJS is not far behind its competition which is amazing news! Throwing Angular into the mix with just over 24,000 live websites it’s clear that Vue is truly gaining a lot of much needed attention from both developers and companies. 

Next up, NPM downloads.

![npm stats 2019 vue react](/_assets/images/npm-stat-2019-vue-react.jpg)

December of 2018 has been the best month for Vue by far. That month there were over **2 600 000 downloads of the Vue package**! React had a great year too! In October there were over 14 millions downloads of React. 

As we have mentioned in this post [Vue JS 2018](https://naturaily.com/blog/vue-js-2018), developers are most excited to learn Vue JS out of any other frontend JavaScript frameworks. We can see that from the results of a survey conducted by [StateOfJS.com](https://2018.stateofjs.com/front-end-frameworks/vuejs/){:rel="nofollow"}. Statistically, more developers would use VueJS again in future projects than Ember, Polymer or even Angular. 

### What do developers like most about Vue?

First of all, it’s easy to learn due to detailed and easy to follow documentation. Applications created with Vue are lightweight and have a really good performance. On top of that Vue is full of features making sure that your application can be robust. 

## So what will change in 2019 in the world of Vue?

Quite a lot! The Vue codebase is now written using TypeScript. Wait, what? Yeah, it’s really happening. It’s going to be entirely rewritten from ground up. But why?

Multiple sources show that TypeScript is growing with tremendous speed. In 2017 and 2018 it’s surpassed Shell, Ruby and C in the number of projects created on [GitHub](https://octoverse.github.com/projects){:rel="nofollow"}. 

![github octoverse typescript 2019](/_assets/images/typescript-2019-github.jpg)

StackOverflow survey shows that TypeScript is the 12th most popular programming language among developers. Due to its static type checking nature (think of Java) it’s a bit easier to learn and debug that JavaScript since developers are fully in control of each and every variable, array etc. within their codes. TypeScript doesn’t have type coercion, which can be both good and bad, but ultimately, it leads to less bugs and improves readability which is a big thing for large teams as your code has to be perfectly clear for others. 

TypeScript is a superset of ECMAScript. As a Vue developer, you don’t have to worry, you can still use JavaScript for your projects, no change here, but if you want to contribute to the Vue code you will have to learn TypeScript first. 

### Are there any benefits of using TypeScript?

Yes! _Evan You_, in his recent presentation, has stated that Vue 3 will be much faster than Vue 2 thanks to the mentioned above migration. Source code will be more maintainable and the whole Vue package will be shrinked down from 20kb gzipped to just below 10kb. 

Considering everything I’ve mentioned above, I think it’s no surprise that the previous TypeScript [support](https://vuejs.org/v2/guide/typescript.html){:rel="nofollow"} Vue’s had is going to be significantly improved with Vue 3.

### Virtual DOM improvement

Another major change is the Virtual DOM’s major performance improvement. Evan You utilized some tricks from [InfernoJS](https://infernojs.org/){:rel="nofollow"} framework that appear to double the Vue’s app boot up speed! Also, static tree hoisting, static prop hoisting etc. are expected to have a compile time improvement.

### Observers

New iteration of Vue is going to have improved property observations, as 3.0 will be equipped with a Proxy-based observer, that eliminates some of previous limitations. Now changes can be tracked on addition and deletion of property, Array index mutation and `.length` mutation.

### Improved Debugging

Debugging is going to see some changes too! As Evan’s post suggests, it’s going to be easier, as developers will be able to easily identify why a component is re-rendering using `renderTracked` and `renderTriggered` hooks. 

### Other changes

Other changes expected in Vue 3.0 are optimized slots generation meaning that a parent and a child can be re-rendered separately, platform agnosticism - easier to render-to-native projects such as Weex and NativeScript Vue, and, lo and behold, IE11 Support.

To read the whole article with all the goods that are coming with Vue 3.0 head over to [Plans for the next iteration of Vue JS](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf){:rel="nofollow"}.

## Conclusion

That’s a lot of new features! Hopefully they will be good enough to make more significant changes in the frontend JavaScript frameworks market. Vue is still going strong and showing no signs of stopping. Will Vue finally catch up with React? Only time will tell.
