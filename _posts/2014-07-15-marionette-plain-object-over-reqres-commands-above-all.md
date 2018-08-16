---
title: 'Marionette: plain object over reqres, commands above all!'
description: >-
  Marionette.js tutorial - an introduction to Plain Objects and The Reqres, how
  to use them, and what are the differences.
slug: marionette-tutorial-objects-commands
date: '2014-07-15 10:38:01 +0000'
category: JavaScript development
author: Maciej Kucharski
avatar: /assets/images/maciek.png
image: /assets/images/marionette.jpg
text-preview: >-
  A brief introduction to Marionette’s reqres ( request-response ) and commands
  would be that they are application (or module) level event aggregators that
  either return a value or cause an action to happen.
tags:
  - JavaScript development
  - Backbone js development
---


A brief introduction to Marionette’s reqres ( request-response ) and commands would be that they are application (or module) level event aggregators that either return a value or cause an action to happen. Both provide similar api to execute and set handlers:
```coffee
App = new Marionette.Application()

App.reqres.setHandler “users:get”, (id) ->
  new User id: id

App.commands.setHandler “users:destroy”, (id) ->
  Users.find(id: id).destroy()

john = App.request ‘users:get’, 5
App.execute ‘users:destroy’, 5
```
There is one more significant difference between the two - request-response is synchronous, while commands are not.

Plain object vs the reqres
==========================

Come to think about it - if requests are synchronous, is there anything more to reqres than just a fancy API to call good ol' function? Let's write a (simple) piece of code twice to compare them.

With Marionette.request
-----------------------
```coffee
App = new Marionette.Application()``` // this is going to be a common part

App.module('posts').reqres.setHandler 'post:get', ->
  author: 'John Doe'
  publication_date: '05.05.05'
  body: 'Lorem ipsum dolor sit[...]'
  tags: ['marionette', 'is', 'cool']

// later in application code

favouritePost = App.module('posts').request 'post:get'
App.mainRegion.show new App.module('views.posts').FavouritePostView
  model: favouritePost
```
We set up a posts module that is responsible for keeping our posts in place; then we register a 'post:get' handler that will return an object containing all the data that the app needs. The post gets requested later in the app, which executes handler code and return post's details.
Now, the very same code, but using a plain object instead of module with reqres.

With js object
--------------
```coffee
// let`s skip App definition here

App.posts =
  getPost: ->
    author: 'John Doe'
    publication_date: '05.05.05'
    body: 'Lorem ipsum dolor sit[...]'
    tags: ['marionette', 'is', 'cool']

// later

favouritePost = App.posts.getPost()
App.mainRegion.show new App.module('views.posts').FavouritePostView
  model: favouritePost
```
Couple of things come to mind, first being: hell, the second piece of code just looks better. It'd be hard to disagree that reqres syntax is somewhat unwieldy and convoluted, while plain objects are much simpler and straightforward. There are also some less visible benefits:

- The request call looks a lot like an event call - but it works differently, I don't have to tell you, that this is not a desired effect,

- Plain objects are also easier to test, since you can test them in isolation not only from your application code, but also the framework,

- Reqres API has no way of scoping requests or creating hierarchy, you need to rely on fragile naming conventions.

On the flipside reqres API may nicely align with events, channels and commands that are likely to be all over the place.

Other than that - both approaches are nearly identical. They are synchronous, global, decoupled and allow only one handler per request type ( both also fail silently when overwriting previous handler). Ha, i just used global and decoupled in one sentence!
It's fine though, our modules need to talk to each other. What may be a tipping point (it was for me) is fact the reqres is more error prone. Typos are real, people, and request will just silently fail if no handler is found. Contrast it with plain object that will come at you screaming if you as much as try calling an undefined function.

Commands prevail
================

With all that above, you are probably thinking that I'm going to be mean to commands, too. Commands are actually quite awesome, mostly due to the fact, that they can't be easily replaced by a javascript object since they are asynchronous. They still have inherited some of problems that reqres suffers from, like silent fails, slightly harder testing and general flatness (as in no grouping).
You might think about dropping commands API for vents, also avaiable in Marionette, but this:
```coffee
App.vent.trigger 'some:command', params
```
isn't at all improvement to that:
```coffee
App.execute 'some:command', params
```
Second version is of course more concise and readable.

Marionette <3
=============

Although I gave Marionette a rough time, you shouldn't get discouraged. The apis are just a minor part of the framework and the dificulties you might have with them are vastly outweighted by all the awesomeness Marionette brings to the table. At Naturaily we love and cherish Marionette and believe it to be the best of libraries built on top of Backbone and maybe even the very best framework for single page applications available.
