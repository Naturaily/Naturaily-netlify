---
title: >-
  Next.js Commerce, Vue Storefront, Saleor, Magento PWA Studio: Modern headless
  storefront platforms compared
description: >-
  In this post, we will attempt to compare four popular headless storefront
  platforms: Vue Storefront, Saleor, Next.js Commerce and Magento PWA studio.
slug: >-
  next-js-commerce-vue-storefront-saleor-magento-pwa-studio-modern-headless-storefront-platforms-compared
layout: post
date: '2020-12-08 01:15:33 +0200'
category: E-commerce
authors:
  avatar: /assets/images/beata.jpg
  label: Beata Twardowska
  value: author-24
  slug: beata-twardowska
image: /assets/images/Modern-headless-storefront-platforms-compared.png
text-preview: >-
  The headless e-commerce trend has been gaining traction recently and PWA
  e-commerce frontends are slowly becoming the industry standard. According to
  Gartner, 80 percent of digital experience platforms will be deployed via
  headless by 2022.
tags:
  - Vue Storefront
  - Magento PWA Studio
  - Saleor
---
**The headless e-commerce trend has been gaining traction recently and PWA e-commerce frontends are slowly becoming the industry standard. According to Gartner, 80 percent of digital experience platforms will be deployed via headless by 2022.**

By leveraging the benefits of headless architecture, retailers can build online stores using independent frontends on top of e-commerce backends like Magento or Shopify. This design yields many benefits: the stores run faster, have higher conversion rates and rank higher in search results. 

Of course, you can always build your own PWA storefront from scratch. But the good news is you don’t really have to. The popularity of headless architecture has resulted in the emergence of many off-the-shelf e-commerce offerings. There is a thriving market of open-source storefronts. Some of them are compatible with multiple e-commerce platforms, while others are developed only with particular ones in mind – [Gatsby Storefront](https://www.gatsbyjs.com/starters/gatsbystorefront/gatsby-starter-storefront-shopify/){:rel="dofollow"}{:target="_blank"}, for example, comes with a dedicated theme for Shopify.

{% youtube B7CXzx9jQeM %}

<small class="text-center">The video presents the speed improvement resulting from using a dedicated Gatsby Storefront for Shopify.</small>

In this post, we will attempt to compare four popular headless storefront platforms: Vue Storefront, Saleor, Next.js Commerce and Magento PWA studio.

## What is headless commerce?

A headless e-commerce design separates the backend infrastructure from the presentation layer. The two layers remain connected, only using APIs. No matter which e-commerce platform or backend system you decide to use, going headless will bring a number of important benefits.

### 1. Independence

Many popular e-commerce platforms come with dedicated frontends. For example, Shopify Plus offers many responsive themes. However, by going headless, you eliminate the vendor lock-in and can use any frontend you want – or build one from scratch. When swapping the storefront (the e-commerce platform’s frontend), you can keep the e-commerce backend along with all the existing integrations and only change the old platform’s APIs to those of the new one.

A headless website makes you more independent of the e-commerce platform’s roadmap for frontend features. You own your frontend code and can develop it according to your needs, and move it to another e-commerce platform if you choose so. Also, you are not tied to Shopify's Liquid, an open-source template language written in Ruby. Instead, you can structure your code however you want and this is a huge deal for developers.

You can deploy and make changes, and invest in it with confidence. You are free to build additional landing pages quickly and deploy marketing conversion tests. If needed, you can always move it to another e-commerce platform.

### 2. Performance

One of the key benefits of PWA frontends is their great performance. In headless commerce, this results from server-side rendering and offline caching. The user does not have to wait for the Javascript to boot up and render the page. But, we still need to hydrate in order to make the page interactive.

In e-commerce PWAs, server-side rendering can be done in a few ways. With Vue, by default, components produce and manipulate DOM in the browser. But developers can also choose to render the exact same components into HTML strings on the server-side and then send them directly to the browser. Then, Vue hydrates static markups into the fully interactive client-side application.

### 3. SEO

Headless e-commerce stores not only run faster, but also give you better control of technical SEO. This is something that’s not offered by (or at least not the main focus of) the popular e-commerce storefronts out of the box.

We write more about optimizing [Shopify stores](https://naturaily.com/blog/shopify-stores-problems) for SEO in another [post](https://naturaily.com/blog/how-to-optimize-shopify-storefront-for-seo) on the blog.

### 4. True omnichannel

A headless frontend unlocks opportunities to deploy an omnichannel strategy in full and turn virtually any device or platform into an endpoint and checkout for your store. New endpoints can be added more easily and new features can be built faster, independently of the roadmap of the e-commerce platform provider.

## What popular headless storefronts are there?

Investing in a ready solution is cheaper than [building a PWA](https://divante.com/blog/pwa-ecommerce-buy-or-build/){:rel="nofollow"}{:target="_blank"} from scratch, and reduces your time to market to just a few months. This means achieving ROI after 4-9 months.

Here is a comparison of the four popular off-the-shelf headless storefronts which you can use on top of your e-commerce platform.

### [Vue Storefront](https://www.vuestorefront.io/){:rel="dofollow"}{:target="_blank"}

Vue Storefront has been establishing itself as a trusted storefront solution for building robust e-commerce stores and business websites with the app-like interface and user experience. It is open source and is backed by a large community. It is 100% offline, platform agnostic, and supports Magento 2. As one of the main benefits, Vue Storefront comes with an MIT license – permission to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of it without restrictions.

Because Vue Storefront is built on Vue.js + [Nuxt](https://nuxtjs.org/){:rel="dofollow"}{:target="_blank"} (Vue's SSR/SSG framework), developers can write JavaScript code from both the server and client side, while the data is synchronized between the two.

Vue Storefront gets updates weekly and has a very responsive support team. Their planning board is publicly available on GitHub.

With SSR, Vue Storefront handles the rendering process, which benefits SEO and makes the content understandable by search engine crawlers. HTMLs are generated for more dynamic websites whose content is not known at build time. This is also referred to as universal applications.

**Pros**

* Vue Storefront can connect with various e-commerce backends (Pimcore, Big Commerce, Magneto, etc) through API. It can communicate with each using platform-specific API calls.
* Vue Storefront renders pages server-side for better SEO.
* Vue Storefront is backed by a strong contributor community and an MIT license – as an open-source, free toolset.
* Because Vue Storefront uses IndexedDB and LocalStorage to store the data, it enables native caching.
* Comes with PWA solutions that are ready for production.
* If you want to use Magento CMS, it is compatible with both Magento 1 and Magento 2.
* At present, it is a more equipped toolset with a lot of features not available with PWA Studio.

**Cons**

* Incomplete documentation is missing
* Minor bugs
* Because it bases on REST API, you can’t make asynchronous calls
* Vue Storefront is still missing a few Magento features.
* Not fully compatible with Apple devices – does not work offline on iOS.
* Vue Storefront is built by an independent development company and you have to depend on their policies.
* There is growing concern over the conflict as soon as Magento gets an update.

### [Saleor](https://saleor.io/){:rel="dofollow"}{:target="_blank"}

Saleor is an open-source, Python-based headless e-commerce platform which launched in 2012. It powers some high-volume websites in niches such as publishing and apparel.

Saleor is a complete headless e-commerce platform and consists of:

* Saleor Core
* Dashboard
* Saleor Storefront

With the latest update Saleor Commerce comes with Saleor Storefront, a modular front end powered by a GraphQL API and written with React and TypeScript. Saleor uses GraphQL to communicate with the storefront and dashboard. You can freely customize its code to suit your needs – or build a custom storefront using the underlying [Saleor SDK](https://github.com/mirumee/saleor-sdk){:rel="dofollow"}{:target="_blank"}.

PWA Users have the privilege to shop and search offline enhancing shopping experiences. Built using HTML, CSS, and JavaScript, such shops can run on any platform that uses the standard-compliant browser. Functionalities such as push notification and offline working create experiences similar to a native application running on desktop and mobile. No separate bunding and distribution are required, which makes it more reliable.

Creating a Saleor-powered storefront is pretty straightforward and easy. Additional features include the customization of catalogues and storefronts, building mobile apps, and building user shopping experiences.

**Pros**

* Saleor Storefront comes with a solid documentation for basic queries (fetching products, making purchases etc).
* Clean architecture and code, easy to extend and modify.
* The GraphQL playground has nice and detailed documentation of every query and mutation

**Cons**

* Saleor still lacks a polished and ready-to-use SDK.
* Lack of deployment documentation.

### [Next.js Commerce](https://nextjs.org/commerce){:rel="dofollow"}{:target="_blank"}

Next.js Commerce is the joint effort of Vercel (previously ZEIT) and BigCommerce. It is an open source headless commerce solution utilizing the Next.js framework and BigCommerce APIs. It allows developers to create a headless storefront on BigCommerce in minutes that includes products, search, cart, checkout, emails and more.

With Next.js Commerce, e-commerce developers get an all-in-one starter kit for building high-performance sites leveraging and automating the implementation of common components, with a data layer and reusable data primitives provided by BigCommerce.

{% youtube 0seS7pmyT30 %}

**Pros**

* Performance
* Good for SEO
* Supports for internationalized (i18n) routing
* Hybrid SSG / SSR – pre-render pages at build time (SSG) and request time (SSR) within a single project
* Incremental static generation – update statically pre-rendered pages incrementally after build time
* UI Components
* API routes – create API endpoints to ensure backend compatibility
* Standardized data hooks
* Out-of-the-box integrations with BigCommerce, but the team plans to support major e-commerce backends.

**Next.js commerce is still in its infancy and little is known about its issues.** For a hands-on demo of the example Next.js Commerce theme, go [here](https://demo.vercel.store/){:rel="nofollow"}{:target="_blank"}.

### [Magento PWA studio](https://magento.com/resources/pwa-studio-overview){:rel="dofollow"}{:target="_blank"}

Magento PWA Studio allows you to create PWA storefronts on the Magento e-commerce platform. It’s a set of PWA tools and resources helping developers build front-ends and create PWA extensions and components.

The Magento PWA studio is dedicated for building Magento stores and consists of the following tools:

**PWA Buildpack** – the main PWAs development tools and libraries.

**Peregrine** – a collection of UI components for a Magento PWA allowing developers to use, extend, or remix these components to develop a unique Magento PWA storefront.

**Venia** – Magento’s proof-of-concept PWA built with PWA Buildpack and peregrine tools. It’s a storefront with examples of product and category pages.

**Pros**

* Magento PWA Studio comes with a great toolset: PWA development tools and libraries.
* GraphQL support
* PWA support
* Is open-source with a strong contributor community, which also translates into many benefits for PWA development.
* Magento PWA studio is easy to set up from the back-end. It allows us to clone a repository and allocate the Magento instance URL to the .env file. By executing a command, it allows the application to run successfully.
* This PWA toolset has already been used across many successful projects. 
* It has a dedicated PWA team to provide support and come up with solutions.
* It is an open-source and free toolset.

**Cons**

* Magento PWA studio is platform-specific (dedicated to Magento only).
* Many features are still missing from the development mode.
* Slow release process.
* Magento PWA doesn’t work offline on iOS devices. PWA notifications can only send messages to Android, while iOS is not supported.
* This toolset as of now is only available for websites running with Magento 2.3.x or higher.

## Summary

PWAs address many of the issues associated with traditional e-commerce platforms and will certainly continue to grow in popularity. Frontends like Vue Storefront, Magento PWA Studio, Saleor and Next.js Commerce help to deliver the benefits of PWAs to existing e-commerce platforms.

If you are looking for consultation on PWA or plan to upgrade your existing store to PWA, [drop us a line](https://naturaily.com/get-an-estimate) and see what we can do for you.
