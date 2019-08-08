---
title: Challenges of migrating from AngularJS to Vue in TypeScript
description: >-
  Migrating an app from AngularJS to Vue in TypeScript is not an easy task. In
  fact, we've come across many caveats everyone intrested should know about.
slug: challenges-migrating-angularjs-vue-typescript
layout: post
twitter-card: summary_large_image
date: '2019-04-09 11:30:30 +0200'
category: JavaScript development
author: Bartek Zienkiewicz
avatar: bartek.jpg
image: migrating-from-angularjs-to-vuejs-using-typescript-a-case-study.png
text-preview: >-
  Migrating an app from AngularJS to Vue in TypeScript is not an easy task. In
  fact, we've come across many caveats everyone intrested should know about.
tags:
  - JavaScript development
  - Vue js development
  - Frontend development
---
TypeScript became mainstream relatively not so long ago. The development started back in 2012 and the language is supported and maintained by Microsoft. It became a superset of JavaScript. In this context, what it means is that TypeScript contains everything JavaScript does and much more. The main and significant difference between these two is the inclusion of `types`. You should be quite familiar with them if you’ve ever coded with so-called strong typing languages such as Java or C++.

While it may seem a bit counter-intuitive, TypeScript is extremely well received among developers. There are a lot of things going for it including better scalability, easier maintenance of large applications, much clearer code and forcing developers to write better methods. As you type, you can easily detect bugs and errors.

As we’ve been previously [mentioning](https://naturaily.com/blog/vue-2019), Vue’s core is going to be entirely rewritten in TypeScript meaning that the new iteration of Vue will support features such as class-based components. On top of that, the Vue Team reported that this move makes the framework more performant.

## About the project

Let’s talk about the early days of Angular, AngularJS 1.x to be exact. While the technology had some really cool features going for it, there are many more drawbacks than benefits. During those times the software architecture standards we see today were not really a thing. It is one of the reasons why the application we are currently working on is a bit of chaos. It doesn’t run smoothly, some actions take a really long time to perform. AngularJS code should be quite clear and easy to follow but this project is remarkably not very readable. Even our IDE had some problems with eg. finding method declarations. Without our past experience with older Angular versions, trying to figure out the ins and outs of the project could be a nightmare. Finally, the Product Owner decided that it would be best for the application's future to migrate it to VueJS + TypeScript.

Angular is a typical framework. It has a lot of built-in features that don’t exist in Vue. We have to recreate them from the ground up or turn to external libraries as we go in the Vue project.

## Why is the project migrating from AngularJS to Vue and TypeScript?

It’s difficult to maintain an application developed with old technology. It unnecessarily takes more of the developer’s valuable time. Fewer and fewer developers want to work on old code, especially if the code doesn’t have a clear and consistent architecture.

The Product Owner has a lot of experience with Java. It’s easier for him to read typed code than JavaScript code. A neat perk is that even though he doesn’t have much experience with Vue he can still read and understand the TypeScript code. On top of that, TypeScript has some familiar features such as Interfaces (to some extent). Once migrated to Vue, the application will be much more maintainable with the better user experience.

## How our experience with TypeScript?

So far, Vue CLI provides built-in TypeScript tooling support. Unfortunately, it doesn’t work with TS that great out of the box. We found that some helper libraries were necessary to work comfortably. To name a few, we’re actively using [`vue-property-decorator`](https://github.com/vuejs/vue-class-component){:rel=nofollow} and [`vuex-class`](https://github.com/ktsn/vuex-class){:rel=nofollow}. These libraries gave us the ability to use Decorators, making out code more readable. Decorators are basically telling the transpiler to create a method of a certain type. Here’s an example of a getter:

```typescript
@Getter(‘info’) info: string;
```
To give you a bit of context, here’s some code:

```typescript
@Getter(GET_USER) user!: any;
@Getter(GET_NOTIFICATIONS_BARS) notificationsBars!: string;
@Action(EDIT_USER) editUser!: Function;

  form: FormTypes = {
    username: '',
    locale: '',
    firstName: '',
    lastName: ''
  };
  invalidForm: boolean = false;
  fields: any;

  get localeState() {
    return this.user.locale;
  }
```

Much cleaner than JavaScript, right?

If you’re serious about migrating or building a scalable application with TypeScript, you will have to use Interfaces at some point. They’re basically an object containing data types. Interfaces significantly help you manipulate the data, they’re extremely useful when you need to make some changes to the endpoints as you can quickly find how these changes will affect your Vue application. Here’s an example of an Interface:

```typescript
Interface Project {
  name: string;
  id: string;
  created: number;
  show: boolean;
}
```

As you can see, `Project`'s attributes are clearly defined. Your IDE should inform you that you’re doing something wrong with the data, **eliminating the need of unit tests to basically 0**. We have found that Interfaces are really useful when working with API in Vuex.

There are a few issues we had during the migration from AngularJS application to Vue with TypeScript. As of today, there are not many Vue apps developed with TS, especially the ‘official’ ones. There are no clear reference projects to follow. We had to look for them in places like GitHub to get the hang of it.

If you have a JavaScript background, **getting used to TypeScript may take a little while**. It all comes down to how much time do you have to spend on looking for solutions to problems you **will** encounter during the development. You will have to dive deep into some forums to find solutions you need. But things get better as you get the hang of it, you will understand where certain errors come from and will be able to solve them quicker each time.


## 3rd-party libraries

On top of ‘regular’ Vue error search, we also have to take TypeScript under consideration. **Some libraries are not tested for TypeScript**, some don’t support it at all. We found that **3rd party libraries were the source of the vast majority of the issues we encountered in this project**.

Many typical libraries that you would want to use in your application were not developed with types. We had to **manually add types** to them, in some cases basically re-developing them. This situation may change in the future when TypeScript becomes mainstream but currently, it’s still an issue.

We have found a workaround though. Meet ‘Shims’. Shims were very useful during our project. They allowed us to declare global modules and interfaces. We basically imported libraries, then declared a global module that will take care of the types of these libraries.

## Conclusion

Our development team has a JavaScript background. Getting used to TypeScript took a while but once we’ve learned the know-how we came to some conclusions:

* The code within Vue’s Single File Components is much clearer, especially when we are using libraries for Decorators. This way adding new components and mixins to a component is much easier.
* Working with TypeScript requires a strong and reliable IDE. I can’t imagine working with TypeScript using editors other than **Visual Studio Code** or **WebStorm**. I highly recommend them if you’re developing a Vue application with TypeScript.
* TypeScript definitely helps in taking care of data types. The **need for most of the units tests** you had to do when you developed with JavaScript **is gone due to TypeScript’s nature**.
* **TypeScript forces developers to keep the code clean**. Also, it unlearns building huge methods for everything.
* It’s worth keeping track of the new version of the libraries you use. Some packages can go through 3 versions in a matter of weeks. You definitely don’t want to miss this out. The same thing about Vue and linters, plugins, and TypeScript itself. Test them before implementing.
* We’re using the official TypeScript guide as the basis of our code. The process of writing the code is not that different from typical JavaScript development. We advise new TypeScript developers to configure ESLint according to guidelines.
* Interfaces were a huge time-consuming barrier. We have to create a lot of new files. Yes, it sounds very daunting but we can import and reuse them from anywhere within our project. Every project has a different approach to this, eg. we have an access to Swagger in our project and you may not, thus there may be differences in interface implementation.
* Interfaces tell us a lot about the data. Documentation is not always available and you would have to check each and every endpoint via Postman or similar tool. Well-developed interfaces tell you everything you need to know, they essentially become your documentation. Plus, they make your code more consistent.
* While TypeScript has a lot to offer, after almost 15 years of experience in JavaScript, I don’t see it as a necessity. On the other hand, I realize that it’s definitely the direction the whole JavaScript ecosystem is heading, including large companies - you simply don’t want to be missing out on this topic.

## Should you migrate your AngularJS app to Vue with TypeScript?

It mainly depends on the time you can spend on it. You have to take necessary hours of head scratching and Vue/TypeScript bugs search under consideration, especially if you don’t have a lot of prior experience with TypeScript. After a few months of development we came to a conclusion that many issues were caused by developers’ lack of knowledge on certain topics. First steps are difficult, but things get better with time.

I don’t recommend TypeScript for small projects or quick prototypes, JavaScript will be a much better option.
