---
title: How to create blog in Meteor (NOT for complete beginners!)
description: >-
  Let's speed up the development of your very own blog app in MeteorJS with this
  tutorial!
slug: meteor-blog-tutorial
date: '2015-03-04 10:38:01 +0000'
category: JavaScript development
authors:
  label: Sebastian Brych
  value: author-14
  avatar: /assets/images/no-image.png

image: /assets/images/meteor_blog.jpg
text-preview: >-
  The purpose of this post is to show you how to create a very simple blog app
  in Meteor. Instead of writing everything from scratch, we're going to use
  packages that can help you speed up your development cycle and be more
  productive.
tags:
  - JavaScript development
  - Meteor js development
---
The purpose of this post is to show you how to create a very simple blog app in Meteor. Instead of writing everything from scratch, we're going to use packages that can help you speed up your development cycle and be more productive.

**Disclaimer**: I assume you have completed at least the official Meteor tutorial as this one is certainly not tailored for absolute beginners.

Let's start by creating our project.

```shell
$ meteor create blog
```

Change the directory and start the web server. Open the browser at `http://localhost:3000` and we can start our journey. ;)

```shell
$ cd blog
$ meteor
```

### Aaaaaand action

We can safely remove the boilerplate code created by the framework itself, as we're not going to use any of it.

```shell
$ rm blog.*
```

There are three 'official' ways to structure your app.
In the first one, we're supposed to keep all the feature directories in the root-level of our app
with special directories `client`, `lib` and `server` inside them.
It may suit some apps, but I think it can get quite messy in no time.

Second one, the one I chose for this project, in my opinion is the simplest in terms of keeping in mind where everything is.
It keeps the special directories on the root level and the feature directories inside of them.
Thanks to this method, it's easier to keep files in the right order. If you need to change something in the part of your app
that is presented to the end-user, you know that you have to look for this file in the `client`.
Analogically, if you need to change something server-related, you can easily locate the file in the `server` directory.

The third one is for more advanced users and it consists in keeping every feature in separate package,
which is helpful in terms of code reusability and making code dependencies explicit.

Let's create our base file structure, which can be tweaked to our needs later.

```shell
$ mkdir client lib server
```

Two essential packages for this project are `iron:router` and `twbs:bootstrap`.
First one is for creating routes within the application and the second one is pretty obvious.

```shell
$ meteor add iron:router
$ meteor add twbs:bootstrap
```

After installation it would be a good idea to create layout, therefor our blog doesn't look like it's from the '90s.
I'm not much of a web designer, so we'll have to go with this one:

_client/shared/main.html_

```html
<head>
  <title>Tutorial blog</title>
</head>
<body>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Tutorial blog</a>
      </div>
      <ul class="nav navbar-nav">
        <li><a href="#">Home</a></li>
        <li><a href="#">Add new post</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
       <li><a href="#">Login/Sign-up</a></li>
      </ul>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        Look ma, no hands.
      </div>
      <div class="col-lg-2"></div>
    </div>
  </div>
</body>
```

Feel free to adjust it to your own taste ;)

Assuming that some (future) parts of this app might look completely different, it would be a good idea to extract the main layout to
the separate template and leave main.html with just `head` tag in it.

_client/shared/layouts/main_layout.html_

```html
<template name="mainLayout">
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Tutorial blog</a>
      </div>
      <ul class="nav navbar-nav">
        <li><a href="#">Home</a></li>
        <li><a href="#">Add new post</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
       <li><a href="#">Login/Sign-up</a></li>
      </ul>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        {% raw %}{{> yield}}{% endraw %}
      </div>
      <div class="col-lg-2"></div>
    </div>
  </div>
</template>
```

_client/shared/main.html_

```html
<head>
  <title>Tutorial blog</title>
</head>
```

At this moment, it looks like our page is blank. This little masterpiece of web design is no longer being shown to the public. ;)
That's where `iron:router` steps in. We extracted layout to the separate template,
but we never told router to use it. Let's create the file `lib/router.js` and add this basic configuration.

_lib/router.js_

```javascript
Router.configure({
  layoutTemplate: 'mainLayout'
});
```

Also we can add this app's first route, which will take care of our root path and assign control of it to the controller.
Controller helps us with keeping the `router.js` file tidy and easy to read.
Without controllers this file would be a mess with just few routes configured.

_lib/router.js_

```javascript
Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});
```

_lib/controllers/main_page.js_

```javascript
MainPageController = RouteController.extend({
  layoutTemplate: 'mainLayout',
  template: 'postsList'
});
```

Assuming that we're going to use at least one more controller with this layout, we can extract the
future duplication to 'abstract' controller and just extend it in the specific ones.

_lib/controllers/base.js_

```javascript
BaseController = RouteController.extend({
  layoutTemplate: 'mainLayout'
});
```

_lib/controllers/main_page.js_

```javascript
MainPageController = BaseController.extend({
  template: 'postsList'
});
```

We can delete the layoutTemplate entry from the `lib/router.js`, but leave the Router.configure block, because we will need it later.
Template for postsList for now is fairly simple and we can use it as a placeholder.

_client/posts/templates/posts_list.html_

```html
<template name="postsList">
  <h1>Placeholder for posts</h1>
</template>
```

### Schema

To store our posts we have to create a collection:

_lib/collections/posts.js_

```javascript
Posts = new Mongo.Collection('posts');
```

For the sake of simplicity and productivity, we won't build our new-post form ourselves, we'll use additional packages instead.

```shell
meteor add aldeed:collection2
meteor add aldeed:autoform
```

Collection2 provides us with validations against the schema created by simple-schema package (installed as dependency of collection2).
Autoform is used for quick form generation.

I believe that schema for posts is self-explanatory.

_lib/collections/schemas/posts.js_

```javascript
var postFields = {
  title: {
    type: String,
    label: 'Title'
  },
  body: {
    type: String,
    label: 'Body',
    autoform: {
      type: 'textarea',
      rows: 5
    }
  },
  _id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  userId: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  author: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }
};

PostSchema = new SimpleSchema(postFields);
```

After creating schema we have to attach it to the Posts collection.

_lib/collections/posts.js_

```javascript
Posts = new Mongo.Collection('posts');
Posts.attachSchema(PostSchema);
```

### New posts

As the schema is ready, we need to create a form to actually submit new posts.
Form itself does not need any data from the database so we can safely use `BaseController` with it.

_lib/router.js_

```javascript
Router.configure({});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/new', {
  name: 'newPost',
  controller: 'BaseController'
});
```

### Form

With schema attached to our collection, we can use autoform magic to create a new-post form with just one line of code.
We're using custom meteor method, because we need some additional data inserted with post itself.

_client/posts/templates/new_post.html_

```html
<template name="newPost">
  <h1>Form for new Post</h1>
  {% raw %}{{> quickForm collection="Posts" id="submitPostForm" type="method" meteormethod="submitPost"}}{% endraw %}
</template>
```

We have to insert Date object from the server if we want to have consistent data across the users, since different users can live in different timezones.
For the sake of reactiveness, we will put this file in lib directory (as we want this method to be stubbed on client).

_lib/methods/posts.js_

```javascript
Meteor.methods({
  submitPost: function(post) {

    var additionalParams = {
      author: 'Author',
      createdAt: new Date()
    }

    _.extend(post, additionalParams);
    post._id = Posts.insert(post);

    return post;
  }
});
```

Our form works, but results are not shown anywhere. It's time to change postsList template to show some data instead of placeholder.
We need a cursor from the database to iterate on, we can pass data straight from controller without the need of template helper.

_lib/controllers/main_page.js_

```javascript
MainPageController = BaseController.extend({
  template: 'postsList',

  data: function(){
    return { posts: Posts.find({}, { sort: { createdAt: -1 } }) };
  }
});
```

We're iterating over `posts` (a cursor provided by the controller) and the result of each iteration is passed to postItem template.

_client/posts/templates/posts_list.html_

```html
<template name="postsList">
  {% raw %}{{#each posts}}{% endraw %}
    <hr>
    {% raw %}{{> postItem}}{% endraw %}
    <hr>
  {% raw %}{{/each}}{% endraw %}
</template>
```

The postItem template gives us a link to single posts' page.

_client/posts/templates/post_item.html_

```html
<template name="postItem">
  <h3>
    {% raw %}{{#linkTo route='singlePost'}}{% endraw %}
      {{title}}
    {% raw %}{{/linkTo}}{% endraw %}
  </h3>
</template>
```

In order to make this link work as intended, we have to set up another route, controller and template for single posts.
Also keep in mind that singlePost route has to be placed as the **last** route, since it uses variable parameters.
Otherwise, it would 'catch' other routes with anything in path.

_lib/router.js_

```javascript
Router.configure({});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/new', {
  name: 'newPost',
  controller: 'BaseController'
});

Router.route('/:_id', {
  name: 'singlePost',
  controller: 'SinglePostController'
});
```

_lib/controllers/single_post.js_

```javascript
SinglePostController = BaseController.extend({
  template: 'postPage',

  data: function() {
    return Posts.findOne(this.params._id);
  }
});
```

_client/posts/templates/post_page.html_

```html
<template name="postPage">
  <h2>{{title}}</h2>
  <p>{{body}}</p>
  <p>by {{author}}</p>
</template>
```

### Navigation

At the moment links in navbar are redirecting to... nothing. To change it, we can use `linkTo` helper with name of route as argument.

_client/shared/layouts/main_layout.html_

```html
<template name="mainLayout">
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        {% raw %}{{#linkTo route='root' class='navbar-brand'}}{% endraw %}
          Tutorial blog
        {% raw %}{{/linkTo}}{% endraw %}
      </div>
      <ul class="nav navbar-nav">
        <li>
          {% raw %}{{#linkTo route='root'}}{% endraw %}
            Home
          {% raw %}{{/linkTo}}{% endraw %}
        </li>
        <li>
          {% raw %}{{#linkTo route='newPost'}}{% endraw %}
            Add new post
          {% raw %}{{/linkTo}}{% endraw %}
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
       <li><a href="#">Login / Sign up</a></li>
      </ul>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        {% raw %}{{> yield}}{% endraw %}
      </div>
      <div class="col-lg-2"></div>
    </div>
  </div>
</template>
```

### MVP(ish)

We can see the list of all posts as well as the single ones and submit new one with form created with autoform.
To smooth things out we need a loading template, because our page may flicker when MiniMongo is syncing with MongoDB.
As we're not trying to reinvent the wheel, we'll use package for that.

```shell
$ meteor add sacha:spin
```

And we'll use it in IronRouter configuration.

_lib/router.js_

```javascript
Router.configure({
  loadingTemplate: 'spinner'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/new', {
  name: 'newPost',
  controller: 'BaseController'
});

Router.route('/:_id', {
  name: 'singlePost',
  controller: 'SinglePostController'
});
```

While we're at it, we can also create a 'notFound' template for cases when someone is trying to type URL that doesn't exist in our app...

_client/shared/not_found.html_

```html
<template name="notFound">
  <h1>Page not found</h1>
  <p>Go back to our {% raw %}{{#linkTo route='root'}}{% endraw %}main page{% raw %}{{/linkTo}}{% endraw %}</p>
</template>
```

...and put both templates inside of the Router.configure block

_lib/router.js_

```javascript
Router.configure({
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/new', {
  name: 'newPost',
  controller: 'BaseController'
});

Router.route('/:_id', {
  name: 'singlePost',
  controller: 'SinglePostController'
});
```

### Publications / Subscriptions

We won't use `autopublish` package anymore as we won't sync whole database with MiniMongo.

```shell
$ meteor remove autopublish
```

Instead, we will create publications and subscriptions for data we actually need.

_server/publications.js_

```javascript
Meteor.publish('allPosts', function(){
  return Posts.find();
});

Meteor.publish('singlePost', function(id){
  return Posts.find(id);
});
```

_lib/controllers/main_page.js_

```javascript
MainPageController = BaseController.extend({
  template: 'postsList',

  findOptions: function() {
    return { sort: {createdAt: -1}};
  },

  waitOn: function() {
    return Meteor.subscribe('allPosts', this.findOptions());
  },
  data: function(){
    return { posts: Posts.find({}, this.findOptions()) };
  }
});
```

_lib/controllers/single_post.js_

```javascript
SinglePostController = BaseController.extend({
  template: 'postPage',

  waitOn: function(){
    return Meteor.subscribe('singlePost', this.params._id);
  },

  data: function() {
    return Posts.findOne(this.params._id);
  }
});
```

### Authentication

Basic functionality is ready but it looks like anyone can actually post something on our blog.
To fix it, we need to remove the `insecure` package and install two different ones for taking care of user accounts.

```shell
$ meteor remove insecure
$ meteor add accounts-password
$ meteor add ian:accounts-ui-bootstrap-3
```

Now, for login buttons, we can use a helper provided by those packages instead of our placeholder in the mainLayout template.

_client/shared/layouts/main_layout.html_

```html
<template name="mainLayout">
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        {% raw %}{{#linkTo route='root' class='navbar-brand'}}{% endraw %}
          Tutorial blog
        {% raw %}{{/linkTo}}{% endraw %}
      </div>
      <ul class="nav navbar-nav">
        <li>
          {% raw %}{{#linkTo route='root'}}{% endraw %}
            Home
          {% raw %}{{/linkTo}}{% endraw %}
        </li>
        <li>
          {% raw %}{{#linkTo route='newPost'}}{% endraw %}
            Add new post
          {% raw %}{{/linkTo}}{% endraw %}
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
       {% raw %}{{> loginButtons}}{% endraw %}
      </ul>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        {% raw %}{{> yield}}{% endraw %}
      </div>
      <div class="col-lg-2"></div>
    </div>
  </div>
</template>
```

As user accounts are ready to use, we have to actually check for authenticated user before allowing him to see the form itself.
We can do so with a simple function coupled with onBeforeAction inside of router file. We will also need a template for failed auth.

_lib/router.js_

```javascript
Router.configure({
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/new', {
  name: 'newPost',
  controller: 'BaseController'
});

Router.route('/:_id', {
  name: 'singlePost',
  controller: 'SinglePostController'
});

Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}, {only: 'newPost'});
```

It would be a good idea to extract this `onBeforeAction` hook to specific controller. Let's create `NewPostController`.

_lib/controllers/new_post.js_

```javascript
NewPostController = BaseController.extend({
  template: 'newPost',

  onBeforeAction(function(){
    if (!Meteor.user()) {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else {
        this.render('accessDenied');
      }
    } else {
      this.next();
    }
  });
});
```

_client/shared/access_denied.html_

```html
<template name="accessDenied">
  <div class="jumbotron text-center">
    <h2>You have to log in first</h2>
  </div>
</template>
```

Yay, it works. Sort of. Well... we still can add new posts with browser console.
To prevent that, we have to add some checks to our submitPost Meteor method.

_lib/methods/posts.js_

```javascript
Meteor.methods({
  submitPost: function(post) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, 'You need to log in first');

    var additionalParams = {
      author: 'Author',
      createdAt: new Date(),
      userId: user._id
    }

    _.extend(post, additionalParams);
    post._id = Posts.insert(post);

    return post;
  }
});
```

You can also use AutoForm hooks to check if user is authenticated while submitting the form,
but it would be redundant as we're already checking it in the `Meteor.method`.
Instead, we can use it to redirect after successful posting.

_client/posts/templates/new_post.js_

```javascript
AutoForm.hooks({
  submitPostForm: {
    onSuccess: function(operation, post) {
      Router.go('singlePost', post);
    }
  }
});
```

## Conclusion

I believe that this app has all the functionality needed by MVP. It's not finished,
it's not even near being production-ready, but it wasn't supposed to be. The goal was to show you how to create (or at least start) an app
with more real-life approach, using packages and tools that can help with the trivial tasks.
You can, of course, continue to develop this application. For example it lacks the ability to comment on posts
or authorization to keep certain things out of the plain sight of logged in user. Feel free to post a comment with the github link
and maybe a little description of your app, if you decide to finish it.

Good luck.

![We're done](https://mrwgifs.com/wp-content/uploads/2013/04/Were-Done-Here-Bunny-Meyer-Reaction-Gif.gif)
