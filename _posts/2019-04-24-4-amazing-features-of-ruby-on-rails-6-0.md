---
title: 4 Amazing Features of Rails 6.0
description: >-
  The release of the newest version of Rails is just around the corner. With it,
  a ton of new features will be introduced to the public.
slug: 4-features-ruby-on-rails-6
layout: post
twitter-card: summary_large_image
date: '2019-04-24 09:22:32 +0200'
category: Ruby on Rails development
authors:
  avatar: /assets/images/klaudusia.jpg
  label: Klaudia Chudy
  value: author-23
image: /assets/images/posts/4-best-features-of-ruby-on-rails-6.0.png
text-preview: >-
  Rails 6.0. is finally released. We’re excited to see all the new stuff Rails
  6.0 has to offer!
tags:
  - Ruby on Rails development
---
Rails 6.0. is finally released. We’re excited to see all the new stuff Rails 6.0 has to offer! With regular releases of the beta versions, developers had access to the upcoming framework for quite a while and they reported that it looks solid. Will the new Rails 6.0 bring back the [enormous popularity RoR once had](https://naturaily.com/blog/who-gives-f-about-rails){:target="_blank"}?

**Here are our most anticipated features of the new version of Rails 6.0!**

## Parallel Testing

Test’s performance is finally going to be improved (a lot!). Now you can use cores to your advantage of running big tests much faster. Each testing worker runs in its own thread - it should be reflected in the CPU monitor. Thanks to Eileen Uchitelle and Aaron Patterson, parallel-testing will land in the upcoming, final version of Rails framework.

As you probably already know, the way of implementing tests is very important. We try to implement as many suitable tests as we can. It's great news for us as more tests will no longer have that much of an impact on the execution time. (Stay tuned for our guide on how to write great tests in Rails!)

“The default number [of workers running  in parallel] is the actual core count on the machine you are on, but can be changed by the number passed to the parallelize method.” To enable executing tests parallel just set the number of workers in `rails_helper.rb`.

```ruby
parallelize(workers: 10)
```

## Native Webpacker Support

Webpacker was introduced a while back with the 5.1 version of Ruby on Rails. It makes using JavaScript pre-processor easier.

We usually use it for JavaScript code, it works really well but it can also be used for CSS, images, fonts and assets as well. From now on, Sprockets is being replaced and Webpacker is the default JavaScript bundler for Rails through the new app/javascript directory.

Currently, in modern applications, using traditional rails views is not so often anymore. User Interfaces are very interactive, there is a lot of dynamic elements which have to respond really fast. Now, the application setup with Rails on the backend and React/Vue on the frontend will be an easy-peasy pleasure :)

## Multiple database support

Another great feature of upcoming Rails 6.0 is the support for multiple simultaneous database connections. It’s a new, simple API for making that happen without the need to reach deeply into Active Record.

Official RoR blog suggests using two databases to for example split the workflow between two replica databases for a performance boost or records segmentation into databases for scaling. We can definitely see multiple database support as an improvement in building microservices architecture.

One of the real life examples where this feature could be really useful is our in-house project - Artinfo. In this project, there are two database connections, one for old users and one for those who just signed up. Now with Rails 6, this implementation would be much easier.



## Zeitwerk

With this version of Rails a new code loader was introduced - Zeitwerk. It promises to load your project’s classes and modules on demand, no need to write `require` calls. Zeitwerk uses absolute file names making the loader more efficient. Your classes and modules are available everywhere. The team behind the loader claims that it is thread-safe and matches Ruby’s semantics for constants.


**Still curious for more?** You can find more new stuff over at [rubyonrails.org](https://weblog.rubyonrails.org/2019/8/15/Rails-6-0-final-release){:rel="nofollow"}{:target="_blank"}.

[{% image /assets/images/job-offers_naturaily.png join join %}](https://naturaily.com/careers){:target="_blank"}
