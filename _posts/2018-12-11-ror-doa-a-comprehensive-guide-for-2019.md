---
title: Who gives a F*** about Rails in 2019?
description: >-
  Every year we hear Ruby on Rails is dead or dying. We're here to tell you why
  you'll still be using it in 2019
slug: who-gives-f-about-rails
layout: post
twitter-card: summary_large_image
date: '2019-01-15 11:45:05 +0200'
category: Ruby on Rails development
author: Wojciech Miśta
avatar: wojciech.jpg
image: ror_doa_2019.png
text-preview: >-
  Let’s face it. Ruby on Rails is old. Really old. But judging by the changes
  that happen on the tech market it’s an extremely mature technology, so it
  makes perfect sense to use it in certain cases and applications.
tags:
  - Ruby on Rails development
---
Let’s face it. Ruby on Rails is old. Really old. But judging by the changes that happen on the tech market it’s an extremely mature technology, so it makes perfect sense to use it in certain cases and applications.

Why are we talking about it again? Ruby and Ruby on Rails community has been having a tough time in the past few years, due to evident decrease in interest from companies and developers. More and more startups and development teams opt for alternative technologies because of many significant downsides these two technologies have by today’s standards.

One may argue that “Ruby is dead” or “Rails is dead” and they may be having a valid point. These rumours didn’t come from nowhere. 


>Being in business since 2011 and a Ruby shop since the beginning, here at Rebased we have evaluated numerous alternatives for server-side web application development. Currently, at the end of 2018, I am certain that Ruby on Rails is still the best tool for quick, secure and high quality development of web applications, for most use cases. The rise of rich JavaScript applications have shifted some of the logic onto the frontend and together with emergence of “serverless” tools it means shrinking backend’s responsibilities, maybe even down to just SQL-JSON translation and authorization, but with that being said Ruby on Rails remains as our choice for building backends that are bigger than a few remote function calls. That does not mean Rails is our only-and-always choice, as there are cases when we pick a different technology that’s a better fit for some specific applications, but overall it seems 2019 will also be a year of mostly-Rails for us.
>
>~Tomasz Stachewicz, CEO of [Rebased](http://rebased.com){:rel=nofollow}


RoR used to be Web 2.0 poster child. After many painful years spent on creating spaghetti code in PHP, you could simply build a blog in under 15 minutes. No kidding! On top of that the code looked beautiful! 

For the first couple of years since the launch, Ruby on Rails turned out to be good enough to build products such as marketplaces, e-commerce sites or even social networks. Everything has changed when smartphones began to gain popularity. Things got significantly more complicated. 

It turned out that Ruby on Rails is not a perfect technology after all! It is certainly not the best choice to handle problems such as Machine Learning or Blockchain (is it still a thing in 2019?). Twitter moved from Ruby on Rails to Scala, other platforms opted for Go or Rust. It was a big hit for RoR community. People realized that it is not a good technology to handle hundreds of millions of users globally. Unless you’re willing to scale it on multiple servers but that’s a different and expensive story. 

Now, a few years later we ask ourselves a question. Is Ruby on Rails really dead? Does it still make sense to use Ruby on Rails to build your product? Oh boy. Let’s find out!

## Statistics

### StackOverflow

![ruby-on-rails-stackoverflow-trends](/_assets/images/ruby-on-rails-stackoverflow-trends.jpg)

Let’s start with some data from StackOverflow. We can clearly see a significant decrease in community engagement from Ruby and Ruby on Rails compared to Node.js. Yet, Node.js’ community is continuously growing and getting highly popular. Interest in Ruby on Rails framework and Ruby language is closer to 0% than ever before. 

### StackOverflow Developer Survey

![ruby-on-rails-stackoverflow-survey-2018](/_assets/images/ruby-on-rails-stackoverflow-survey-2018.jpg){:.float}

StacOverflow's annual tradition is to ask developers what they think about certain programming languages themselves and the industry in general. With that, one of the questions was what programming language do they use at work and the results are visible above.

According to the results from the same survey, globally Ruby developers have a salary of $64 000. That’s quite lower than Clojure ($72 000), Rust ($69 000), Erlang ($67 000) or even Go ($66 000) but much higher than JavaScript ($55 000). 

<br>
<br>
<br>

### Indeed

Things look a bit different if we focus only on the United States.

![ruby-on-rails-salary-indeed-com](/_assets/images/ruby-on-rails-salary-indeed.jpg)

You can clearly see that Ruby developer is still one of the highest paying jobs in this category but the number of available positions are getting lower and lower. There are nearly 2-times more open positions for a Node JS developer than there is for a Ruby on Rails developer. 

**Rails developers are more expensive than Node.js**

Judging by this data, it’s clear that programmers experienced with Node.js have much lower salary than those with RoR. Keep this in mind because it may be a significant factor for you when developing a product as it impacts the total development cost of your web product.

Chances are that you will be assembling your development team from scratch. From our experience you shouldn’t have much problems with availability of skilled programmers on the market. There are still thousands of skilled Ruby on Rails developers looking for new exciting projects but their number is getting lower. Of course it varies by location so we advise you to do your own research in your local area. Or just outsource/co-source the development.  

**RedMonk**

8th place in June of 2018.

![redmonk-ruby](/_assets/images/redmonk-ruby.png)

RedMonk takes GitHub and StackOverflow interest in the language and then compares it with all other major languages. We can clearly see that Ruby is far from being dead as many of doomsayers tend to say. With Ruby being kind of at the top we can conclude that it is still a popular language used to develop tools and apps. But don’t get too excited. 

**GitHub Stats**

![github-osctoverse-ruby-on-rails](/_assets/images/github-octoverse-ruby-on-rails.jpg){:.float}

This comparison shows how popular a certain language is among GitHub contributors - in other words, how many repositories are developed in a certain technology. It’s quite clear who’s the real winner. As we can see, fewer and fewer projects opt for Ruby. Even though it is still in the top 10 most popular languages out there, it’s used less and less each year.

**Ruby Gems**

While we’re at this topic let’s see how are Gem downloads holding up. _Infinium_ made a really cool [comparison of Gem downloads](https://infinum.co/the-capsized-eight/analyzing-rubygems-stats-v2017){:rel=nofollow}. They have been tracking the downloads for quite some time and storing in on their database. As a result we can learn more about the current situation Ruby on Rails is in and it doesn’t look really good. 

According to data gathered by Infinium, Fewer and fewer Gems are being created each year and the same thing goes for their releases. On the other hand, Ruby on Rails downloads are looking much better compared to the previous year. 

> 2019 - there was never a better way for Ruby than 2018, but 2019 shows even bigger potential.
> Ruby is growing very quickly in the niche it dominates - web development and backend APIs. I’m observing the Ruby market since 2004 and I have never been as excited abour Ruby than now. I see people from different languages switching to Ruby (only at Arkency alone there are 2 ex-c# programmers). Ruby keeps making the developers happy, while at the same time it’s a much more mature ecosystem. I’m especially excited about the growing adoption of DDD/CQRS/Event Sourcing techniqes and mutation testing in the community.
>
> ~Andrzej Krzywda, [Arkency](https://arkency.com){:rel=nofollow}

## So it’s 2019. What apps are still using Ruby on Rails?

Well, quite a lot actually.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">This is pretty amazing. Both GitHub and Shopify are huge, billion dollar companies running on the original apps made over a decade ago. And they now both on the latest Rails, helping to push the framework forward 🙏🌟👏 <a href="https://t.co/DsWqCjyFjK">https://t.co/DsWqCjyFjK</a></p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/status/1030528476250562569?ref_src=twsrc%5Etfw">August 17, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Currently **GitHub** has over 22 million users and a whooping 61 million repositories worldwide. Wow. It is the biggest code repository in the world. 

What about Airbnb? It uses Ruby on Rails too since the very beginning of its existence. Millions of users book rooms in over 65,000 locations all around the world every month.

If you’re a startup then you have probably heard or even are using **Basecamp**. Would you be surprised if I told you that Basecamp is not only actively using Ruby on Rails but RoR was born there! And they have even developed a really cool JS framework to work with it - [StimulusJS](https://stimulusjs.org/){:rel=nofollow}.

**Shopify**, a gigantic e-commerce platform. 

Recently we have developed a really interesting application for handling online real-time bidding during auctions. We have used Ruby on Rails on the backend and VueJS for frontend. It truly works like a charm. You can read more about it here [Artinfo - Portfolio](https://naturaily.com/project/artinfo). 

> “GitHub, Heroku, CodeClimate, TravisCI, Shopify. The Rails community is the most influencial community of the past decade, everything else is just following the lead and they’re still years away from surpassing the maturity we achieved through sheer strength."
>
> ~Fabio Akita, [Akita on Rails](http://www.akitaonrails.com){:rel:nofollow}

I could go on and on and give you examples of apps you’re probably using quite often that have utilized Ruby on Rails on their backends. My point is, Ruby on Rails is still a widely used and semi-popular technology. It’s not about how fast the performance is out of the box, it’s about how you use it. 

## Where Rails excels?

So as you can see, Ruby and Ruby on Rails have gotten popular for a reason! There are quite a few aspects where Rails is really tough to beat. 

### Quick development process

There is nothing that can beat Rails in terms of how fast it is to develop a project. It is definitely a go-to technology for startups and companies wanting to release a MVP. Creating a project or a product with Ruby on Rails is extremely fast and easy. Developers who use Ruby on Rails can build applications about 40% faster than teams that use other stacks. 

### Easy business logic implementation

Ruby on Rails allows for easy implementation of complex business logic in your application. Need API as soon as possible? No problem. RoR developers can create it really fast.  Just slap a front-end framework on it, such as Vue or React, and your web application is good to go. 

### Massive Library

"_There’s a gem for everything_"

Ruby is often praised for the massive library of gems developed by its community. You and your development team should mainly focus on actual logic without caring about minor but sometimes necessary implementations. Gems allows for easy implementation of many features or “bridges” between your app and external services. Most of them are free for commercial use!

Chances are that if you get stuck at developing a certain feature or implementing external application within your app, there probably already is a ready-to-use gem for it. Ruby library makes developers’ lives much easier and significantly reduces required time-to-market. 

There are certainly many other applications and projects where Ruby or Ruby on Rails fit perfectly. Check out our list of companies that actively use Rails in their apps and products - [here](https://naturaily.com/blog/ruby-on-rails-apps).

## What type of projects Ruby on Rails is good for?

With dozens of different technologies that can do the same thing it’s really difficult to choose the one that will suit you the best. This is why we have created a simple list of categories where we advise opting for Ruby on Rails.

**Regular web application** - Ruby on Rails is still a good solution for regular web applications. If you don’t expect millions of users and a huge traffic then Ruby on Rails may be the right choice for you! It is a proven and reliable technology that powers many applications regardless of its downsides. 

**E-Commerce** - Remember when I mentioned Shopify? This huge, e-commerce giant is powered by our beloved Ruby on Rails framework. Let’s not forget about Spree Commerce as an RoR e-commerce alternative. 

As there are gems for every e-commerce feature that you could need, Ruby on Rails makes it really easy to get up and running your store in no time. With them you can set up your payment gateway, marketing emailing campaign, even a help desk and many more. 

**Custom Database Solutions** - Ruby on Rails framework works really well for advanced database structures that are required for new and innovative business models. The framework has an excellent Object Relational Mapping, called ActiveRecord which allows developers for easy database manipulation without the need to use SQL. On top of that, Ruby on Rails can smoothly integrate with Database Management Systems such as PostgreSQL. 

**Content Management** - In the Ruby on Rails ecosystem there are so many great, SEO-friendly tools for content creation and management. Maybe a content-centric website would be more right up your alley? If so, then make sure to give Jekyll a shot. It’s the heart of the site you’re reading right now! Learn more about Netlify and Jekyll combo [here](https://naturaily.com/blog/why-jekyll-netlify-cms). 

**You don’t have a fixed app concept** - One of the most important advantages of building your application with Ruby on Rails is that you don’t need to have everything planned ahead. Instead, you can add more features as the development goes. It’s one of the reasons Rails is so popular among startups. 

**A quick prototype is needed** - Another crucial advantage. Ruby on Rails is awesome for prototyping. Really! Bare-bones features and usabilities can be developed in an extremely short time. Creating an MVP will show you what your users want and what your focus should be. 

## Ruby on Rails and Prototyping

History has shown that many large companies have started with Rails, for example Twitter, AirBnB, Hulu, Netflix (for more check out our list [here](https://naturaily.com/blog/ruby-on-rails-apps)), and have either opted for a different framework as the project got larger or just sticked with it. Ruby on Rails has been allowing companies to build a small application or a MVP in no-time. Quick development process allows to early acquire more users what eventually leads to quicker and more profitable monetization of the app. 

Bottom line is that you could, you can and you will be able for a very long time to build all sorts of applications with Rails, from social networks, online shops, auction sites to information systems if you will come to an agreement with some of Rails’ limitations. Ruby and Rails do just a few things but they do them really well.

## Where Rails falls short?

Unfortunately, Ruby on Rails is losing its popularity, and there are some serious reasons why. Some may not even be a deal breaker for you but some of them can cause some real issues for your project.

### Performance

It has to be mentioned - Rails is not a speed demon. If you really/dramatically need high operational speed and a low server resource consumption then Ruby on Rails is definitely not the way to go. Of course, keep in mind that it’s an edge case, and in most projects you really don’t need that much speed, especially if you’re building a startup or a MVP. Unless you’re expecting hundreds of millions of users. They don’t really care about performance that much when the app is useful, secure and intuitive. 

### Scaling

We all remember the whole Twitter vs Rails drama. It caused many discussions “Rails is not scalable” to surface. Is that really true? Yes, you can scale Ruby on Rails. You can either upgrade the server Rails is on or divide the work to multiple servers and tools. Is it worth it? Well, it really depends on your application. 

As I have mentioned in the previous paragraph, Rails is considered as relatively less performant back-end technology. Simply put: To achieve the same performance as other framework and back-end solution you may have to “burn” a lot of money on a proper and more performant server infrastructure. Opting for a more performant technology, such as NodeJS or Phoenix, may save you up to a few thousands dollars monthly. 

### Not really flexible - opinionated

If you’re familiar with Ruby on Rails framework then you probably know that it’s considered a very opinionated one. What it means is that it only lets you create your app the way Rails “wants” you to. While this feature has a lot going for it, it may be a pain while developing an unconventional application. There is a lot of default, set objects what may not leave enough room for developers’ creativity and while they of course can create anything they want, they have to choose between sacrificing development time or originality. 

### Rails can be an overkill for some apps

It’s important to note here that you don’t always need Rails in your application. We often advise our clients what technology is best for a certain type of a project. Sometimes Rails can be a bit too much and there may already be some existing tools that do exactly what our client has requested. 

### Ruby language and Machine Learning

Artificial Intelligence and Machine Learning are one of the hottest phrases of the past 4 years. Most of the modern apps offer some kind of ML integration to help users with tedious tasks or to even automate some jobs by basically replacing jobs and workers with code. 

It’s a pity that Ruby language, to put it simply, sucks at this. When it comes to AI/ML, Python is the best technology, not to mention that it’s one of the most popular programming languages in the world and is certainly much faster than Ruby. Even Java is considered one of the best technologies for the job. Unfortunately, Machine Learning is another major trend that our beloved language doesn’t follow, mainly because of the lack of needed libraries. Of course, we have to remember that languages are not supposed to be universal, so it’s not that big of an issue. 

## So where shouldn’t you use Ruby on Rails?

**Brochure site (to some extent)** - Let’s not overcomplicate things that we don’t need to. Ruby on Rails is a bit too much for a simple, static website. I’m sure that there are much better options for this particular application out there that won’t even require that much coding. 

**Blog-centric site** - We’re all aware that during the demo for Rails it was shown that you can build a whole Blog website in under 15 minutes. Since then web has come a long way. Now you can build a great Blog with free, easy to use tools, no need to bring the tank called Ruby on Rails to the table. 

**Your developers are not familiar with RoR** - Don’t force your developers to use a technology they don’t like or are simply not familiar with. Are they experienced with Go or Node or any other backend framework? Great! Build your application with that instead.  

**You don’t have a time limit, you don’t need a prototype** - This one’s important. As I’ve mentioned many times before, Ruby on Rails maximizes developers’ productivity therefore significantly reducing development time. Unfortunately, Ruby on Rails sacrifices some performance in the process. Unless you have a strict time limit or don’t need an MVP you should consider other backend solution. Of course, this may vary on your app requirements and other factors. 

## What are some good Ruby-backend Rails alternatives?

### Sinatra

Sinatra is a minimalistic alternative to Ruby on Rails. The creators took a bit of a different approach as they only included the most needed components to set up an application and therefore the loading time is relatively quick. 

### Hanami

If for some reason you can’t use Ruby on Rails go ahead and try Hanami instead. This new Ruby framework promises to fix some of the downsides to RoR. It promises to be much more lightweight as it consumes 60% less memory than Rails, be secure and have quick response times. From what we can gather now, Hanami feels like a first true Ruby alternative to Ruby on Rails. Check out Hanami here [HanamiRB](https://hanamirb.org/).

### Serverless Ruby

As I’ve sat down to write this post, some interesting things have happened. Check this out, Ruby is ‘serverless-ready’! AWS has just announced support for AWS Lambda which is a great news for Ruby community! It is joining technologies such as Java, Node.js, Go and C# in the Amazon cloud.

What does that mean? You no longer have to worry about your server infrastructure. With the right code, you can now use just a fraction of Amazon’s cloud computing power to execute a certain part of an application. The cool thing is you only pay for the compute time. 

Amazon Lambda and the whole Serverless technology is relatively new. It’s difficult to find developers who are familiar with this concept or more, have developed an application using it. 

You can read more about Amazon Lambda [here](https://aws.amazon.com/lambda/).

**GitLab's take on Ruby**

A while back, GitLab has shared their development story about Ruby on Rails. GitLab which is (arguably) the second most popular repository ‘storage’ in the world, is using Ruby on Rails for its backend. GitLab CEO Sid Sijbrandij stated that opting for RoR was a great choice. He said that the ecosystem has allowed them to shape a lot of functionality at a high quality and is still without par. 

It wasn’t all that great. The development team run into some challenges. They overcame the performance issues by rewriting some parts of code in Go and using Vue framework.

**Future of Ruby Language**

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Link: Ruby is alive and well and thinking about the next 25 years | TechRadar: <a href="https://t.co/ywNBrVjabC">https://t.co/ywNBrVjabC</a></p>&mdash; Yukihiro Matsumoto (@yukihiro_matz) <a href="https://twitter.com/yukihiro_matz/status/978646733927297024?ref_src=twsrc%5Etfw">March 27, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Few years back, Yukihiro ‘Matz’ Matsumoto - The creator of Ruby programming language, has announced that he’s working on the new version of Ruby code-named ‘3x3’. It is supposedly going to be 3-times faster than Ruby 2.0. Unfortunately, the release date is unknown. It is believed that this version is scheduled to be released by the end of 2020.

> “Ruby world ends on one web framework. Rails keeps Ruby alive and hurts Ruby at the same time.”
>
> ~Grzegorz Wilczyński, Software Engineer, [Lunarem](https://lunarem.com)

Fans have noticed that some of the parts of the new version already live in the preview of Ruby 2.6. Various benchmarks show a significant increase in performance due to the inclusion of JIT compiler. Of course, it’s not the only thing that’s going be to changed. Matz stated in an interview that Ruby 2.6 will be released on [Christmas](https://www.ruby-lang.org/en/news/2018/12/25/ruby-2-6-0-released/){:rel=nofollow} Day and will also have some type of concurrency abstraction. 

Matsumoto has also stated that in the past Ruby applications haven’t been compatible with other versions. He created “a big gap” by introducing various changes, dividing Ruby community. Now, he’s sure that this mistake won’t happen again. Matz guarantees that every Ruby 2 program will run with Ruby 3 which is a very bold claim. 

StackOverflow Developer Survey shows an unfortunate fact - less and less developers ‘love” Ruby. In fact, it didn’t even make to the Top 10. Yukihiro said that Ruby is no longer considered ‘hot’, but it is stable. He hopes that once 3x3 is released, Ruby will be ‘hot’ and loved again. 

**Maturity and stagnation**

Ruby is at a point of maturity not many programming language can brag about. It’s currently one of the oldest yet still popular languages out there. It’s a proven and reliable technology that is still widely used all around the world. The community is always there to help. If you get stuck on a problem with your code, chances are that thousands of people had too, thus it’s quite easy to find a solution.

Unfortunately, with maturity comes stagnation. As mentioned above, in the past few years there hasn’t been many changes or cool new features that would make Ruby ‘hot’ again. Some people may say Ruby and its community are dying. In my opinion this technology is stagnating. To put it simply, it’s really slowly becoming a legacy technology. 

> For at least a couple of years now Ruby is no longer exciting. And it doesn’t have to be - in the long run I don’t expect programming languages to be exciting, I want them to be mature, stable, and reliable. And that’s how I see Ruby in 2019. Every year there are fewer areas in which I need to turn to languages other than Ruby. It’s not and I doubt it will ever be a true “enterprise” technology, but when you need to move fast and be flexible - Ruby will remain a great choice for the coming years.
>
> ~Filip Tepper, Senior Engineer, [Castle Intelligence](https://castle.io/)

## Conclusion

Even though, after reading this post, using Ruby and Ruby on Rails may seem counterproductive and not like a very good idea, Ruby ecosystem has still a lot going for it. If you fully utilize Ruby on Rails potential then you will be able to develop sophisticated applications in no time. It’s a feature not many frameworks can proudly boast about, as (say it with me!) there’s a gem for everything. 

Recent and upcoming releases of Ruby on Rails sound very promising. Many of developers' complaints have been fixed, new exciting features are added with every new [version](https://www.ruby-lang.org/en/news/2018/12/25/ruby-2-6-0-released/){:rel=nofollow}. Hopefully Ruby and Rails will both rise again in the near future.
