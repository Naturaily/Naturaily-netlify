---
title: >-
  The code is black and full of errors. The fears of legacy code refactoring and
  how to overcome them
description: >-
  In the darkest corners of every app development process dwell lines of code
  that make even the bravest of developers wake up at night drenched with
  sweat. 
slug: legacy-code-refactoring
layout: post
twitter-card: >-
  In the darkest corners of every app development process dwell lines of code
  that make even the bravest of developers wake up at night drenched with
  sweat. 
date: '2019-06-18 02:48:11 +0200'
category: Software development
author: Michał Kosyk
authors: Michał Kosyk
avatar: michał-kosyk.png
image: legacy-code-refactor.png
text-preview: >-
  In the darkest corners of every app development process dwell lines of code
  that make even the bravest of developers wake up at night drenched with sweat.
  There are rumours around the team that business people will soon come to
  demand some changes in that particular part of the abyss. People are trembling
  with fear, dropping their cups, spilling coffee and asking for remote work –
  all in a bid to avoid the impending catastrophe.
tags:
  - Software development
---
**In the darkest corners of every app development process dwell lines of code that make even the bravest of developers wake up at night drenched with sweat. There are rumours around the team that business people will soon come to demand some changes in that particular part of the abyss. People are trembling with fear, dropping their cups, spilling coffee and asking for remote work – all in a bid to avoid the impending catastrophe.**

The time inevitably comes – the planning starts, coders nervously watch in horror as the project manager utters those cursed words: _“Hey, guys!”_ she said. _“Hope everyone had a good weekend because today we are doing something special! We need to change an old functionality a bit. Remember our payments system? We need to add another payment provider! How exciting, isn’t it?”_

The silence that followed was so intense you could hear a pin drop. Developers sighed. _“Oh, and the owners need it before Friday this week”_, she added after a short moment. Now, the massacre starts...

![null](/_assets/images/image4.gif)

...Everybody’s in a bit of a panic. Joe, the Ruby on Rails guy is starting to think out loud about the code. He remembers it, he is one of the sinners that left that abomination – hiding, feeding on new data and becoming impossible to remove. Jenny, React.js developer, remembers old tales of the first, failed attempts at building an Angular front-end app. A lonely tear slides down her cheek as she realises she is the one to battle with the beast.

![null](/_assets/images/image1.gif)

Then Joe, the eager guy, says:

\-	_Hey, maybe we can make a big refactor? You know, straighten out what’s wicked, split what’s coupled. Start over and do it in a better way!_

Everyone seems suddenly excited about the idea. A few following hours are spent analysing, another few on planning as the team creates first diagrams. Models are made, all the good that is left in the team is suddenly channeled into one goal. 

And that’s a common scenario. Legacy code is made a bit worse with every commit, it reaches the point when it’s too expensive to change. Adding new features is sometimes awkward, tricky – or simply impossible. You get an idea to “refactor” it in a big way, then you start to plan the refactor, you start the refactor and end up with a brand new code… That needs to change because the business requirements changed.

![null](/_assets/images/image2.gif)

What’s the problem? **Are we supposed to accept our lives as legacy code support team? The thing is… you’re biased.** You only see the bad parts of the old codebase. Of course, it’s clunky and full of bloaters. Some parts were touched, patched and changed too many times, yes. It is all true, alright, but there is a specific characteristic that makes your particular legacy code incredibly valuable. To demonstrate this, let me show an example.

### Legacy code is like a truck

Elon Musk presented his incredible, electric truck a year ago: 



{% youtube 5RRmepp7i5g %}

We still use the old, diesel trucks that stink, aren’t really fuel-efficient, and take a lot of time to learn to drive. New Tesla truck is slick, super fast and great looking. And it does most of the work for you. You just enjoy your life and the drive while watching your favourite show on Netflix.

Yet, I urge you to take a step back and look at the bigger picture. And, most importantly, think for a second. If it’s so great, why don’t we just dump old technology and start using the new one? 

Well, there are two reasons:

* There is no Tesla truck at hand. And we either need to wait for it or build it.
* The old diesel truck exists. And works.

As we can see, the legacy code is better than the new code in one crucial aspect: **IT WORKS**.

### Handling legacy code: to refactor or not to refactor?

Does it mean we should stop trying to make things better? Is it really the case of “don’t fix what ain’t broken”? Well, you need to define what does it mean “to refactor”. The first thing that comes to mind is to replace the old code with the new one. A question immediately arises: _which old code?_ If you mean all of it, I must warn you that you will need to stop creating new features for the business to really be able to do it. That’s impossible and no one will agree to do this. More problems unfold when you dive deeper into the code.

There is a lot of lost knowledge about the “whys” of legacy functionality. Maybe it was a mistake? Or just a hot-fix… but what if that particular part you are looking at is somehow connected through very badly written meta-programming that at the time was very useful? Or maybe it’s critical for your system?

### Who knows?

If you are asking this question, you don’t have enough tests, especially feature tests, that should require certain functionalities to work in a certain way. With the above problems in mind, you don’t really have the knowledge to approach a refactor. And you can’t! You are not certain if what you’ve built will do what it’s supposed to!

Now, when we know it’s impossible to exercise such a feat, we need to ask ourselves: how can we help the codebase? Let’s imagine it as an apple tree. It’s neglected, infested with a disease… but it gives fruits that we need to feed ourselves and our families.

We are the gardeners in our software development orchard and we need to take care of the tools that take care of our rents, bills and vacations. We need to stop nagging about our systems that feed us, and start making them better. Yes, it’s tedious; yes, it’s painful, but it allows you, dear developer, to afford a big latte everyday… but how do we do it? How do we groom these trees in our orchard?

### Simple. Step by step, one at a time, while growing new trees.

Start small. Possibly from a method that isn’t really clear but is a good starting point, and you know how to make it better? Do it. Don’t wait, don’t ask permission for it. Does it have tests? No? Write them, at least for the cases you know should happen – it’s still better than no tests at all. Do what you can and soon you will have one good looking tree in your orchard. You see a class coupled with a few others but you know that with Dependency Inversion Principle you can make it easier? **Do it.**

1. Imagine you have a product view. You have a product name, price, description and other stuff with some logic inside the view. 
2. After investigating, you see there are no tests – add them, you know what should happen. After that, you analyse the view’s logic and you see it really shouldn’t be here. A Presenter should take care of showing the data in a specific way. 
3. You start by creating a test, write some code until it fails, then write the production code, then test the code, then production, etc. 
4. Now, a really simple thing happens: you just added some tests, a Presenter class, and filled the instance with some methods and attributes. But what you did is profound in consequences. By decoupling the view from the data model, value object or ActiveRecord model, you separated two layers – the presentation layer and the persistence layer which gives you the freedom to put whatever you want in that presenter – even mocked data if you don’t really know the source of data to feed it with.

**So, the takeaways for today are:**

* **Big refactors never work**
* **Small refactors help you make the old code better**
* **New code is like a Tesla truck – it doesn’t exist just yet**
* **Old code is like a diesel truck – it’s not perfect but it works**

Enjoy your small refactors!

Farewell
