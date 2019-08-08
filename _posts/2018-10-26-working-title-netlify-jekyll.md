---
title: Why You should use Jekyll and Netlify CMS for your site
description: >-
  Is love at first sight even a thing? I believe it is! And our new site is a
  result of that love.
slug: why-jekyll-netlify-cms
layout: post
twitter-card: summary_large_image
date: '2018-10-31 10:40:17 +0200'
category: Ruby on Rails development
author: Paweł Cybulski
avatar: lighto.jpg
image: netlify-jekyll.jpg
text-preview: >-
  Is love at first sight even a thing? I believe it is! And our new site is a
  result of that love.
tags:
  - Ruby on Rails development
---
Is love at first sight even a thing? I believe it is! And our new site is a result of that love.

We’ve started thinking about new site quite some time ago but from the start we had some ideas of what it should look like. Here’s what we wanted:

* super fast loading time,
* scalable architecture,
* reliable hosting,
* secure,
* easy to develop and flexible.

The decision to go static was obvious, but just having a static HTMLs won’t cut it as we wanted blog to be a major part of our site. The next decision to make was to pick a static site generator. Of course, there were a few popular candidates on the horizon such as:

* [Next](https://nextjs.org/){:rel="nofollow"}
* [Hugo](https://gohugo.io/){:rel="nofollow"}
* [Gatsby](https://www.gatsbyjs.org/){:rel="nofollow"}
* [Hexo](https://hexo.io/){:rel="nofollow"}
* [Nuxt](https://nuxtjs.org/){:rel="nofollow"}
* [Jekyll](https://jekyllrb.com/){:rel="nofollow"}

But let’s face it, with our background, and the fact that Ruby is dear to our hearts, the choice was obvious that it had to be Jekyll.

Now what is Jekyll exactly? Jekyll is a static site generator written by a co-founder of Github, Tom Preston-Werner. Blog focused generator, super easy to operate, gives us power of Ruby in form of plugin system for creating custom content for our site, and many more. You can read about that on the Jekyll site.

## Why Netlify?

At first, we wanted to use Jekyll exclusively with [jekyll-admin](https://github.com/jekyll/jekyll-admin){:rel="nofollow"} gem and just host it on our server, but after rethinking this a little we opted for hosting our site on Netlify, as it gives us some really cool perks. To name a few:

* Continuous Deployment - hands free project deploying based on github/gitlab/bitbucket activity.
* SSL - Out of the box HTTPS for default domain, you know what not having that means today, right?
* Redirects - that one was big for us, as lot’s of old site urls were long and not so SEO friendly, so we had to change them, and redirects are a blessing.
  Git gateway - GitHub/GitLab accountless access to repo? Aww yiss!

So choosing Netlify seemed like a good idea though there still was the case of jekyll-admin, it wasn’t exactly what we needed. Fortunately guys from Netlify also created Netlify CMS and after reading through the documentation, we thought “yeah, this is what we want”, and what exactly was that we wanted? Well, let me tell you.

## Editorial Workflow

What’s this Editorial Workflow all about actually? It gives our content creators ability to write content (posts, case studies, testimonials and such), request changes, edit it and then, when it’s ready, publish it. Thanks to the way Netlify CMS implements that, each post, testimonial, etc. can be published without any involvement from a developer, but the cool thing about this is that before going live our changes can be previewed on a separate site which is deployed by Netlify out of the box.

![null](/_assets/images/netlify-editorial-workflow.png)

## Admin

To fully utilise Netlify and for Editorial Workflow to actually work we have to first make Netlify CMS work and making that happen can’t be simpler. We just have to add `admin` folder in our project, few files, some javascript snippet and we’re set. This gives us access to admin panel like so: [www.netlify-example.com/admin](http://www.netlify-example.com/admin){:rel="nofollow"}. In there we have a list of collections we can edit, workflow tab and assets uploaded. Thanks to Netlify we can manage who can access our admin page with [Identity](https://www.netlify.com/docs/identity/){:rel="nofollow"}.

![netlify-admin](/_assets/images/netlify-admin.jpg)

## Widgets

In my opinion widgets are the main awesomeness of using Netlify CMS. They give use power to make any page editable through the admin panel, pretty much anything can be edited there. It gives our content creators an ability to set name of  url, title and description, add images, change layouts, and anything else you may think about.

![null](/_assets/images/netlify-widget-1.jpg)

![null](/_assets/images/netlify-widget-2.jpg)

## Is that all?

Of course not, there are many more features that Netlify along with Netlify CMS offer that we haven't used like _Forms_, _Prerendering_ for single page applications, _Split Testing_, _Lambda functions_ for thoese who want more, we can even create custom _Widgets_ and remember that features are constantly added so you can check and test (or use) some _Beta Features_. You can check all that on Netlify Documentation [page](https://www.netlify.com/docs){:rel="nofollow" target="_blank"}, as well as Netlify CMS Docs [page](https://www.netlifycms.org/docs){:rel="nofollow" target="_blank"}
