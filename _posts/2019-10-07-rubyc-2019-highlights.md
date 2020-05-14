---
title: RubyC 2019 Highlights
description: >-
  As soon as we knew the date of the RubyC, we immediately booked seats on the
  plane from Wroclaw to Kiev. We had to be there, Naturaily.
slug: rubyc-2019-highlights
layout: post
date: '2019-10-07 08:55:38 +0200'
category: Events
authors:
  avatar: /assets/images/beata.jpg
  label: Beata Twardowska
  value: author-24
image: /assets/images/posts/rubyc-2019-highlights.jpg
text-preview: >-
  RubyC is a European conference devoted to Ruby, Rails and other related
  technologies. Hundreds of Ruby enthusiasts and developers gather to exchange
  knowledge, discuss the latest news and learn from each other. As soon as we
  knew the date of the conference, we immediately booked seats on the plane from
  Wroclaw to Kiev. We had to be there, Naturaily.
tags:
  - RubyC
  - Ruby
  - Rails
  - Ruby on Rails Development
---
**RubyC is a European conference devoted to Ruby, Rails and other related technologies. Hundreds of Ruby enthusiasts and developers gather to exchange knowledge, discuss the latest news and learn from each other. As soon as we knew the date of the conference, we immediately booked seats on the plane from Wroclaw to Kiev. We had to be there, Naturaily.**

Conference details:

* date: 14-15 September
* place: Kiev
* venue: Premier Hotel RUS

Our representatives: **Dominik** & **Stefan**

{% image /assets/images/rubyc_1.png conference conference %}

## What impression did the conference make on them? Here's what they told us on their return.

First of all, they highly rated the substantive level of the conference and the atmosphere of the entire event. Kudos to all the organizers! Most of the speeches were very valuable. Below, you will find the summary of those that Stefan and Dominik found the most memorable.

## Dominik's review

The most interesting and valuable presentation was the one given by **Ivan Shamotov,** entitled: "It's all about money, money, money".

> Ivan is a Ruby developer since 1.8.6 and a Rails developer since Rails and Merbe merged. A huge part of his career has been connected with billing domains and how he is fully dedicated to the Ruby community at Saint Petersburg. - [source](https://rubyc.eu/#speakers){:rel="nofollow"}{:target="_blank"}

If you are a Ruby Developer, there is a high probability that one of your recruitment tasks was to write a Fibonacci sequence using recursion. The speaker of the presentation told us what other things we can thank Fibonacci for, gave a brief explanation about the Double Entry Accounting System and shared a few general rules on how to deal with money during a project.

Here they are:

* Never use **floats** to make money calculations. If you don't know why, [this page](https://0.30000000000000004.com/){:rel="nofollow"}{:target="_blank"} may be a hint.
* Use **a decimal with a correct scale** and precision in the database. You may think that an integer in the best way to go, but it won't work with cryptocurrencies, where the fraction is constantly changing.
* Sometimes you want to round up, and sometimes you want to round down - **use rounding wisely**. Also, remember to take care of fees that you have to pay to e.g., a payment gateway. You can't round them down, obviously, but if you pay fees monthly, you may want to calculate and store each fee with the biggest precision you can get and then round the sum of it - this way, the eventual amount will be smaller.
* Make sure your sheet is balanced in your double-entry bookkeeping system.
  Assets = Liabilities + Equity

Sounds interesting? You can watch the whole presentation here:

{% youtube x4nMt0MfBGk %}

The second presentation I find worth mentioning is the one given by **Yevhen Kuzminov**, entitled: "A year with Hanami in production: the Good, the Bad and some Recipes".

> Yevhen is a Ruby team leader in MobiDev. He’s gone all the way from PHP "one-pager" development to the full-stack, in addition to building Ruby and Blockchain teams from scratch. Author of the "Ruby Web Dev: The Other Way" and the "Hanami Cookbook". - [source](https://rubyc.eu/#speakers){:rel="nofollow"}{:target="_blank"}

In this talk, the speaker gave us some insights about using the Hanami framework on production environment. He explained what benefits Hanami has to offer, compared to what Rails offers us by default. I must admit that solutions like Entity-Repository (instead of ActiveRecord), separate class per action and a few others ideas, got me really interested. On the other hand, however, a lack of good docs and learning resources is a big disadvantage.

Also, before putting Hanami into your production code, you must know there is no out-of-the box authentication solution and many gems will have problems when used with Hanami, since they are ActiveModel oriented. You may have to spend more time on implementing caching mechanisms or websockets than when using the standard Rails solution.
Luckily, the presenter told us how he dealt with those issues and he even created a webpage with some ready-to-go recipes at [www.hanami-cookbook.stdout.in](https://hanami-cookbook.stdout.in/){:rel="nofollow"}{:target="_blank"}. Ultimately, while I am not convinced to use Hanami, I nevertheless found the presentation interesting. Your opinion may differ, so don't hesitate to check it out.

If you want to listen to the presentation, you will find it here:

{% youtube jDMUBRPI5zc %}

The third and the last is the presentation by Aleksander Dąbrowski: "10 performance sins of Rails application".

> Aleksander is a CTO of koleo.pl - the fastest growing train ticket retailer in Poland. He has worked in a variety of start-ups and even in a marketing agency. Aleks has worked with Ruby for more than a decade, has co-organized Warsaw's Ruby User Group, and was the author of rubysfera.pl, the leading Polish blog focused on Ruby and Rails. - [source](https://rubyc.eu/#speakers){:rel="nofollow"}{:target="_blank"}

This was a good-structured talk, wherein the speaker gave us few examples (actually 7, not 10) of what mistakes can be made in Rails applications in the context of performance. Some of them are:

* "Not measuring performance"
* "Optimization without measurement"
* "Doing too much".

For each sin, he gives a real-life example from the application he was working on. It’s worth watching and checking if you are not a sinner yourself!

{% youtube _MUez2wuhh0 %}

## Stefan's review

For me, the most memorable presentation was the one given by **Katrina Owen**, entitled: "One small step".

> Katrina is an Ecosystem Engineer at GitHub. Co-author of '[99 Bottles of OOP](https://www.sandimetz.com/99bottles){:rel="nofollow"}{:target="_blank"}', she works primarily in Go and Ruby, contributing to several open-source projects. She accidentally became a developer while pursuing a degree in molecular biology. When programming, her focus is on automation, workflow optimization, and refactoring. - [source](https://rubyc.eu/#speakers){:rel="nofollow"}{:target="_blank"}

Katrina has presented how you can refactor the code in a controlled, safe manner, using small steps. She explained this by using a funny song about creatures eating creatures. The song has a repetition in it that can be abstracted as an algorithm.

At the beginning, there is a program, reflected as the whole text of a song. This is a very simple representation that does not reveal the recursion in that text. After several small steps of refactors, we end up with an algorithmic representation of this song that reveals recursion in this text.

Then, Katrina showed how easily she can introduce new variations to this song by giving it different data. It was fun to watch and very valuable at the same time, because she showed us how, through small changes, you can eventually restructure your code to make it more robust and prepared for future changes.

Here are the most important tips I learned from the presentation:

* Refactor is about introducing change
* A test doesn't pass - git reset hard
* Make the change easy and then make an easy change
* Don't be afraid of ugly small changes if they help you to get things under control

I also found out that Katrina is the creator of [exercism.io](https://exercism.io/){:rel="nofollow"}{:target="_blank"} - a platform for code practice and programming mentorship that looks very interesting for everyone who wants to learn a new programming language.

You can watch Katrina's presentation here:

{% youtube 3_Obmtfy3dA %}

The second presentation I would like to feature is the one given by **Mugurel Chirica**, entitled: "Taming your Rails Monolith".

> Mugurel is a Senior Engineer at Simply Business —  an innovative technology company and insurance broker for small businesses. He's a fervent advocate of code quality, sharing knowledge and systems innovation. - [source](https://rubyc.eu/#speakers){:rel="nofollow"}{:target="_blank"}

It was a very nice talk. Mugurel explained how we can take care of large monolithic Rails applications. The code level approach is to use patterns such as Services, Values, Queries, Form Objects and Adapters to make the code inside a big monolith more structured and manageable.

However, there is also the organizational level approach: **split your applications to different components**. In my opinion, it is a very interesting concept because it is placed in the middle between a typical Rails monolith and microservices. In the components approach, you still have one Rails application, however your code is split between different components that have clear boundaries between them. In time, those components can be transformed into separated microservices, if needed.

I really liked this talk because it shows how to cope with big Rails applications in an evolutionary and safe way without risking a regression on the way.

Mugurel also recommended [this site](https://www.cbra.info/){:rel="nofollow"}{:target="_blank"}, because there is a lot of information about Component-Based Rails Applications. There is also a book entitled "[Component-Based Rails Applications](https://www.amazon.com/Component-Based-Rails-Applications-Addison-Wesley-Professional/dp/0134774582){:rel="nofollow"}{:target="_blank"}" and written by Stephan Hagemann.

Summing up, monoliths have both pros and cons.

Pros:

* They provide agility during the product's early stages
* It's easier to pivot with a monolith

Cons:

* Too complex after a while
* Hard to deploy
* Costly to scale
* Easy to add technical debt

 Managing a monolith can be done on two levels:

* Code level with patterns
  * Services
  * Values
  * Queries
  * Form Objects
  * Adapters
* Organizational level
  * Split to components
  * Use data mapping between components

You can watch Mugurel's presentation here:

{% youtube _332PMjVO9g %}

Last but not least - the talk by **Benoit Daloze**, entitled: "Parallel and Thread-Safe Ruby at High-Speed with TruffleRuby".

> Benoit is a researcher at Oracle Labs, working on TruffleRuby. He is interested in concurrency and virtual machines. He has contributed to many Ruby implementations, including TruffleRuby, MRI and JRuby. - [source](https://rubyc.eu/#speakers){:rel="nofollow"}{:target="_blank"}

Benoit is doing research in Oracle on TruffleRuby. One of his goals is to make collections in Ruby ready for concurrent access. It can be achieved by just synchronizing the access, but it is too costly to use in the case when only one thread uses the collection.

His idea is to split collections and objects into two different categories, namely **local objects** - if there is only one thread that accesses them - and **shared objects** - if there is more then one thread that accesses such object or collection. Such an approach makes almost no overhead in the case with one thread and, at the same time, gives us safe concurrent collections.

Benoit also talked about Truffle Ruby and how it uses the so-called **ahead of time compiler** to achieve high peak performance.

This talk was very technical and quite hard to understand, but I recommend to watch it anyway. It shows how hard it is to introduce new functionalities to the language. You begin to realize that there is a lot beneath the surface in Ruby language.

The main conclusion: synchronize only collections that need to be synchronized - only those used by more than one thread. For single thread applications, performance does not change.

You can watch Benoit's presentation here:

{% youtube EEzY91Fc-ng %}

Have you also been to RubyC in Kiev? If so, please let us know which presentations you found the most valuable and why. You can also watch all of them on [Svitla Systems’ Youtube Channel](https://www.youtube.com/channel/UC1nu2LV4_08GoZThHEindWA){:rel="nofollow"}{:target="_blank"}. Enjoy!

{% image /assets/images/rubyc_3.png RubyC-Kiev RubyC-Kiev %}

{% image /assets/images/rubyc_2.png RubyC-Kiev RubyC-Kiev %}

{% image /assets/images/rubyc_4.png RubyC-Kiev RubyC-Kiev %}

<br>

[{% image /assets/images/job-offers_naturaily.png join join %}](https://naturaily.com/careers){:target="_blank"}
