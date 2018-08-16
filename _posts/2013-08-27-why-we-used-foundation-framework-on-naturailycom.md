---
title: Why we used Foundation Framework on naturaily.com
description: >-
  We will go over through some of the best features of the Foundation Framework
  which are the reasons why we used it to develop our website.
slug: foundation-framework-naturaily
date: '2013-08-27 10:38:01 +0000'
category: Frontend development
author: Maciej Kucharski
avatar: /assets/images/maciek.png
image: /assets/images/foundation.jpg
text-preview: >-
  Gentle normalize.css ----------------------- Your usual reset.css leaves you
  with absolutely nothing - each and every style has to be written by yourself,
  from scratch. We were looking for a set of rules that would remove browser
  inconsistencies while preserving some default and desirable styling.
  Foundation's normalize.css gives you just that.
tags:
  - Frontend development
---

Gentle normalize.css
-----------------------
Your usual reset.css leaves you with absolutely nothing - each and every style has to be written by yourself, from scratch. We were looking for a set of rules that would remove browser inconsistencies while preserving some default and desirable styling. Foundation's normalize.css gives you just that.
<!--more-->

Responsive grid
---------------
One of the most time-consuming things to deal with when developing a responsive site is creating a grid system that can react well to screen size changes. Normally, you would like your columns to have varying width depending on client width and at some point collapse into single column layout, when screen becomes too narrow to fit more columns.

Foundation comes with two grid system bundled in - each for different screen size. This grants you amazing control over your layout. For example, this:
```slim
    div.column.large-6.small-12
    div.column.large-6.small-12
```
creates two equal width columns for large screens that automatically change into single column layout when screen width drops below 768px.

That is great, but could be better with a little effort. We decided to change class names to more semantical and created a set of most used classes:

```slim
    .small--full
    .small--half
    .small--one-third
    ...
    .large--full
    .large--half
    ...
```

This makes complex grids somewhat easier to understand.

Responsive, touch enabled content sliders
-----------------------------------------
Hey, we've got great content to present and need a couple of sliders to do that neatly. Those sliders not only need to be as responsive as any other part of the website, they also have to play nicely with mobile devices. Luckily, Foundation has the Orbit plugin - an easily configurable, responsive slider that has support for touch events. A couple of values in `data-option` attribute are enough to get you a slider meeting all that criteria.

Mobile optimised images
-----------------------
Mobile devices often come with slower bandwidth. This can be a big issue, especially on portfolio-type sites like Naturaily’s where there are a lot of large images. So instead of using media queries and playing with background images we decided to decrease the load time on smaller devices by employing the Interchange plugin. It lets you define different image sources for any media query, device orientation and pixel density with ease. It comes with couple of named queries that you can use:
```html
<img src="/path/to/small.jpg" data-interchange="[/path/to/small.jpg, (small)], [/path/to/medium-image.jpg, (medium)] ,[/path/to/large-image.jpg, (large)]">
<img src="/path/to/landscape.jpg" data-interchange="[/path/to/landscape.jpg, (landscape)], [/path/to/portrait.jpg, (portrait)]">
```
or you can just write your own:
```html
<img src="/path/to/default.jpg" data-interchange="[/path/to/image.jpg, (screen and only (min-width: 1000px) and (orientation:portrait) and (-webkit-min-device-pixel-ratio: 2))]">
```

Mobile friendly navbar
----------------------
Putting performance aside, the navigation that is useful on desktop might not be a best idea for mobile. This is where Navbar component comes into play. It uses CSS and some Javascript to create responsive navigation for both desktop and smaller devices. As user screen becomes narrower than some defined value the navbar collapses into widely used dropdown pattern.

Written in sass
---------------
We love SASS. And we love Compass. This is how we like our CSS.

The fact that Foundation team used sass to write their framework allows us to easily compile handpicked Foundation modules and our own code into one file, reducing the number of required HTTP requests. Furthermore there is a variables.scss file included into uncompiled version of Foundation. It holds variables that let you completely customize your build: colors, media queries, breakpoints, font and much more.

So, was it worth it?
--------------------
Definitely yes. It saved us many hours of tedious work and allowed us to focus on details and quality of code.

Having said that, there is an argument against using Foundation - it has noticeably smaller community than it's biggest competitor, Bootstrap.

That’s all Folks!
