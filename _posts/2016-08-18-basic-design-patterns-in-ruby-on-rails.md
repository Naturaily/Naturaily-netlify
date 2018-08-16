---
title: Basic design patterns in Ruby on Rails
description: >-
  When you, as a programmer, encounter a problem, don't worry! In most cases,
  they can be solved by patterns! Find out what are the basic design patterns in
  Ruby on Rails.
slug: ruby-on-rails-design-patterns
date: '2016-08-18 10:38:01 +0000'
category: Ruby on Rails development
author: Marcin Mantke
avatar: /assets/images/mantle.png
image: /assets/images/patterns.jpg
text-preview: >-
  Not only as programmers, but in day-to-day life, we encounter some problems.
  Every person has similiar difficulties, and our society has found universal
  ways, **_patterns_**, to solve that problems. As programmers we also have
  problems, which can be solved by patterns.
tags:
  - Ruby on Rails development
---


Not only as programmers, but in day-to-day life, we encounter some problems. Every person has similiar difficulties, and our society has found universal ways, **_patterns_**, to solve that problems. As programmers we also have problems, which can be solved by patterns. Our beloved *Wikipedia* says, that

> **_software design pattern_** is a general reusable solution to a commonly occurring problem within a given context in software design. It is not a finished design that can > be transformed directly into source or machine code. It is a description or template for how to solve a problem that can be used in many different situations. Design > > patterns are formalized best practices that the programmer can use to solve common problems when designing an application or system.

And I must say I love that definition. There is nothing more to explain.

I’ve chosen two design patterns I found the most common in Rails world - service and decorator. Main reason why they are so common is that they help keep models slim and DRY through moving great part of logic into other parts of application. And of course slim models are good models, so better learn those two design patterns!

## Service

Service is by far my most used design pattern in Rails applications. The idea of this design pattern is very easy - if certain part of business logic doesn't really fit into model or controller, it may be good idea to put it into service. You can then use your service in multiple places, like models, controllers, jobs etc, keeping you application clean and DRY.

Default Rails app structure doesn't have folder where we can put our services. So we have to make one! Create `services` folder inside your `app` directory.

```
app/
  controllers/
  ...
    services/
    base_service.rb
    single_service.rb
    some_group_of_services/
      first_service.rb
      second_service.rb
```

Now, when we have a place to store our servies, let's define base service, so that we are sure every service uses the same interface to communicate with the rest of the application.

```ruby
class BaseService
  private_class_method :new

  def self.call(*args)
    new(*args).call
  end
end
```

That's it! Only one method, nothing more. Now, let's jump to the actual service.

```ruby
class YourService < BaseService

  def initialize(first_variable, second_variable)
    self.first_variable = first_variable
    self.second_variable = second_variable
  end

  def call
    # method body
  end

  private

  attr_accessor :first_variable, second_variable
end
```

Methods initialize and call are a must-have. If call method would be too long or complicated, it's best to create additional methods in private section. That's because only call method should be available outside of the service.

## Decorator

In OOP, decorator gives us ability to extend particular object's behaviour by equipping it with some additional methods. In Rails ecosystem I've usually seen this design pattern being used with [draper gem](https://github.com/drapergem/draper).

Draper is usefull when we have methods in models, which are used only in views. Using decorator design patter means puting in them every bit of logic which is used only in views. So, if in User model we have method `full_name`, e.g.

```ruby
def full_name
  "#{first_name} #{last_name}"
end
```

we should move it into `UserDecorator`.

```ruby
class UserDecorator < Draper::Decorator
  delegate_all

  def full_name
    "#{object.first_name} #{object.last_name}"
  end
end
```

Great thing is that not every user object in views will have that method, we have to **decorate** that object before sending it to the view, simply using `user.decorate`. So in controller we have to use:

```ruby
def show
  @user = User.find(params[:id]).decorate
end
```

And then, we can use this code in our views:

```erb
<%= @user.full_name %>
```

## That’s all?

Of course not, you silly! The world of design patterns is a lot lot bigger than that. Not every of them would be applicaple in RoR application, though. Or that particular problem you have. But still, it's very good to know some design patterns, even their main ideas. Because maybe one day, you'll have some problem and it can be solved with design pattern you know or at least heard of. Or maybe you will develop your own design pattern, that will be described in books? ;)
