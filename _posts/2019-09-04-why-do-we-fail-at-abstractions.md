---
title: Why Do We Fail at Abstractions?
description: >-
  One of the problems I see time and time again are tightly coupled layers and
  classes. This happens especially in Ruby on Rails where the most common
  problem is...
slug: why-do-we-fail-at-abstractions
layout: post
date: '2019-09-04 08:40:22 +0200'
category: Ruby on Rails development
authors:
  avatar: /assets/images/michal_kosyk_profile.png
  label: Michał Kosyk
  value: author-27
  slug: michal-kosyk
image: /assets/images/why-do-we-fail-at-abstractions_.png
text-preview: >
  We have all been there. We got a task to introduce totally new functionality.
  New database relations, controllers, services, models, views. We all said:
  “this time it will be different”. We asked the right business questions, and
  designed exactly what was requested. In spite of that, three sprints later,
  things got messy. The code is rigid, the business requirements have changed
  and the project is out of hand, again.
---
We have all been there. We got a task to introduce totally new functionality. New database relations, controllers, services, models, views. We all said: _this time it will be **different**_. We asked the right business questions, and designed exactly what was requested. In spite of that, three sprints later, things got messy. The code is rigid, the business requirements have changed and the project is out of hand, again.

One of the problems I see time and time again are tightly coupled layers and classes. This happens especially in Ruby on Rails where the most common problem is presenting data directly from an ActiveRecord model without any layer between the presentation and persistence.

## Abstraction and concretisation

We have a tendency to understand everything with engineering terms first. Someone mentions a user and we already picture something like this:

```ruby
class User < ActiveRecord::Base
  # some logic
end
```

Why? Did anyone say anything about any specific implementation? No. For now, we are talking about some business entity that inhabits the application we create. What if we are not discussing a logged in user, but a visitor to our website? I think you get the idea.

We have a problem differentiating between abstractions and concretisations. I think of abstraction more like a theory of how something works. So, I do not think of a combustion engine when I say that I want a vehicle to travel somewhere. Instead, my mind pictures the very idea of traveling. I don’t care too much about how I will do it. The concrete implementation of this idea would be to use a car, train or a plane.

## Where is the solution?

The only solution is to train your abstract thinking. There is no other way. There is no switch to toggle, no magic pill to swallow or a single book to read. You need to do the dirty work of trying, failing, learning, and so on.

But people already did that and found out that we have common problems we all face. These people even created a book. Their names are: **Erich Gamma**, **Richard Helm**, **Ralph Johnson** and **John Vlissides** – the authors of [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Object-Oriented-Addison-Wesley-Professional-ebook/dp/B000SEIBB8){:rel="nofollow"}{:target="_blank"}. It’s crucial for every developer to at least try to tinker with the ideas in this book. The problem could be that they are in Java… but there is another book by Russ Olsen that tackles the language barrier and presents those [Design Patterns in Ruby](https://naturaily.com/blog/ruby-on-rails-design-patterns)!

Today I would like to present the Factory and a Presenter pattern as a way to help you reduce coupling between not only classes, but also layers.

## How do they work?

Let’s look at the definitions:

**Factory:** an object that creates other objects with a common interface. This pattern hides the implementation details of constructing those objects. This removes the necessity of the factory’s client object to know the type of the returned objects, and allows it to rely purely on their API.

**Presenter:** a very special case of a decorator – its purpose is to present data. It hides presentation logic (which results in views having less of it in them).

## How do they fit in the app?

Let’s imagine I have an _AnimalPresenterFactory_, which creates different animal presenters with a common interface. Imagine that we have a cow, a duck and a dog. They have their own ways of making a sound, but I need them to have a common interface. This is why we create _CowPresenter_, _DuckPresenter_ and a _DogPresenter_ which they all have a common interface in the form of a _\#make_sound_ method. Then we feed the _AnimalPresenterFactory_ with different animals. Now, when I would like to present their different voices, instead of building a tree of conditional statements that would base on an object’s class (which is in itself a violation of the [Liskov Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle){:rel="nofollow"}{:target="_blank"} of the SOLID principles), I would just call the _#make_sound_ method. And it would work with every other unified method in the given context.

I believe that a piece of code will help me properly visualise it.

We are building a travel planner in an existing system. The code is messy and we got a task of presenting the overall travel time for each individual stage of the trip. The whole calculation service already works but we need to create the view layer for the users. There are three classes that give us the travel time per each vehicle type.

```ruby
class Car
  def drive_time
    # some logic
  end

  def drive_start_address
    # some logic
  end
end

class Train
  def ride_time
    # some logic
  end

  def start_station
    # some logic
  end
end

class Aeroplane
  def flight_time
    # some logic
  end

  def start_airport
    # some logic
  end
end
```

As you can see, we have different methods for different objects returning the same thing. We need to unify them. We could do it by adding new methods to the classes but it’s not really helping the overall abstraction and it’s bloating the objects (which could be already pretty fat).

When we look at the views, we shouldn’t view them in terms of any business entity. What we should see are components: buttons, panels, tables, etc. So, when we look at a table’s row, we shouldn’t see cars – we should see a row, plain and simple. So, we need to present a few things: the type of the vehicle, travel time and addresses of where the users will travel from and to.

So let’s create a basic presenter

```ruby

class TravelPresenter
  TYPE = ""

  def initialize(means_of_traveling)
    @means_of_traveling = means_of_traveling
  end

  def type
    TYPE
  end

  def travel_time; end

  def address; end

  private

  attr_reader :means_of_traveling
end

```

We could either go with a plethora of conditional statements but that’s just evil. Instead, let’s rely purely on API, not the type of the object itself. It would be really bad if we had to ask if the server runs on Apache or Nginx, wouldn’t it? Now, it is time to create different subtypes of a TravelPresenter!

```ruby
class CarTravelPresenter < TravelPresenter
  TYPE = "Car"

  def travel_time
    means_of_traveling.driving_time
  end

  def address
    means_of_traveling.drive_start_address
  end
end

class TrainTravelPresenter < TravelPresenter
  TYPE = "Train"

  def travel_time
    means_of_traveling.ride_time
  end

  def address
    means_of_traveling.start_station.address
  end
end

class AeroplaneTravelPresenter < TravelPresenter
  TYPE = "Plane"

  def travel_time
    means_of_traveling.flight_time
  end

  def address
    means_of_traveling.start_airport.address
  end
end
```

Having these three object types helps us remove any logic from the view layer. There’s no need to ask for different methods once they’re unified them under one banner. Now, the problem isn’t gone entirely, because we still need to do something like this in other parts of our code:

```ruby
def travel_presenters
  vehicles.map do |vehicle|
    case vehicle.class.to_s
    when "Car"
      CarTravelPresenter.new(vehicle)
    when "Aeroplane"
      AeroplaneTravelPresenter.new(vehicle)
    when "Train"
      TrainTravelPresenter.new(vehicle)
    else
      raise StandardError
    end
  end
end
```

Fortunately, we can tackle that by putting it in a _Factory_.

```ruby
class TravelPresenterFactory
  def build(vehicle)
    case vehicle.class.to_s
    when "Car"
      CarTravelPresenter.new(vehicle)
    when "Aeroplane"
      AeroplaneTravelPresenter.new(vehicle)
    when "Train"
      TrainTravelPresenter.new(vehicle)
    else
      raise StandardError
    end
  end
end
```

Which removes the ugly responsibility of creating the objects from other parts of the system, making the previous code look like this:

```ruby
def travel_presenters(vehicles,
                      presenter_factory = TravelPresenterFactory.new)
  vehicles.map do |vehicle|
    presenter_factory.build(vehicle)
  end
end
```

Now, let me show you the execution:

```ruby
vehicles = [Car.new, Train.new, Aeroplane.new]

presenters = travel_presenters(vehicles)

presenters.each do |presenter|
  # print the type
  p presenter.type
  # print the travel time
  p presenter.travel_time
  # print the address
  p presenter.address
end
```

## What’s happened?

In the example above we produced code that did several things:

1. Moved the concretisation where it belongs so we could work on the higher levels of abstractions with, you’ve guessed it, abstractions.
2. Reduced the conditional statements to a minimum. At the end of the day we only want to know what an object does, not what it is.
3. Fixed the logic and helped us encapsulate what **really matters**.

Although I didn’t mention them, it will make your tests a lot simpler.

Use this knowledge to battle the unnecessary complexity of concretisation and reduce it to the simplicity of an abstraction.

Farewell

[{% image /assets/images/job-offers_naturaily.png join join %}](https://naturaily.com/careers){:target="_blank"}
