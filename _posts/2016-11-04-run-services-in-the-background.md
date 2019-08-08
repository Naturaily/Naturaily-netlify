---
title: Run services in the background
description: >-
  In this tutorial you will find the best and easiest way to run Ruby on Rails
  services in the background. We will create an universal Job for all the
  services.
slug: ruby-on-rails-background-services
date: '2016-11-04 10:38:01 +0000'
category: Ruby on Rails development
author: Jan Wieczorkowski
avatar: janpol.png
image: random_console.png
text-preview: >-
  Some time ago [Marcin wrote about basic design patterns in Ruby on
  Rails](http://naturaily.com/blog/post/basic-design-patterns-in-ruby-on-rails).
  I’d like to go back to Service pattern in this post. I really like it, it's a
  good idea to place application’s business logic there. At Naturaily we use it
  quite often.
tags:
  - Ruby on Rails development
---



Some time ago [Marcin wrote about basic design patterns in Ruby on Rails](http://naturaily.com/blog/post/basic-design-patterns-in-ruby-on-rails). I’d like to go back to Service pattern in this post. I really like it, it's a good idea to place application’s business logic there. At Naturaily we use it quite often.

It happens that we need to run our service in the background. What's the easiest way to achieve this? Wrap our Service in a Job of course! Right... But we don't want to end up with dozens of very similar jobs. So... Here’s the solution. Let’s create universal Job for all the services.

## Create the Job
Our job will be called `ServiceInvocationJob`. It's a good name for our universal job. To create a new Job we need to run one simple task:

```bash
rails g job service_invocation
```

And now we should edit newly created file. Right now it looks like this:

```ruby
# app/jobs/service_invocation_job.rb
class ServiceInvocationJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
  end
end
```

What do we need to run some service? Service's arguments, of course, and Service class itself! We can't pass `class` as argument, so we'll pass class' name. At the end our Job will be as simple as that:

```ruby
class ServiceInvocationJob < ApplicationJob
  queue_as :default

  def perform(service_name, args)
    service_name.constantize.call(*args)
  end
end
```

Very nice? Don't you think?

## Update BaseService class

We already run our services in the background jobs! Everywhere, where we want to run our service in background, we need to change classic invocation:

```ruby
DoSomething.call(first_argument, second_argument)
```

to this

```ruby
ServiceInvocationJob.perform_later("DoSomething", [first_argument, second_argument])
```

But it doesn't look well. I think this one would be better:

```ruby
DoSomething.async_call(first_argument, second_argument) # note that async_ prefix!
```

Right?

So now we need to update our BaseService a bit! Nothing big. Just add a new static method called `async_call`. There's the updated file:

```ruby
class BaseService
  private_methods :new

  class << self
    def call(*args)
      new(*args).call
    end

    def async_call(*args)
      ServiceInvocationJob.perform_later(self.to_s, args)
    end
  end
end
```

## Summary
It is very easy, nothing fancy. However, there is a hidden message: you have to be lazy and remember that future-you is also lazy! You can create code that will solve your current problem (e. g. wrapper-job for your service), it's easy and fast, you don't need to think at all. But you should think a bit more and create code that will solve your problem and prevent the emergence of similar problems in the future(e. g. our ServiceInvocationJob). Future-you will be thankful.

Thank you! Bye!
