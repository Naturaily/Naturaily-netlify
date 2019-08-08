---
title: Chain of responsibility pattern in Ruby on Rails
description: ' While we were working on a project we stumbled upon some legacy code that consists of huge ‘if else’ statements. In this post we’ll show you how we refactored it using the Chain of responsibility pattern. '
slug: chain-of-responsibility-ruby-on-rails
layout: post
twitter-card: summary_large_image
date: '2019-01-24 12:45:21 +0200'
category: Ruby on Rails development
author: Klaudia Chudy
avatar: klaudusia.jpg
image: chain-of-responsibility-pattern.jpg
text-preview: >-
  While we were working on a project we stumbled upon some legacy code that
  consists of huge ‘if else’ statements. In this post we’ll show you how we
  refactored it using the Chain of responsibility pattern. 
tags:
  - Ruby on Rails development
---
While we were working on a project we stumbled upon some legacy code that consists of huge ‘if else’ statements. In this post we’ll show you how we refactored it using the Chain of responsibility pattern. 

## What is the definition of the Chain of responsibility pattern? 

>Chain the receiving objects and pass the request along the chain until an object handles it.
>
>~Krzysztof Kempiński, [Chain of Responsibility Design Pattern in Ruby](https://medium.com/kkempin/chain-of-responsibility-design-pattern-in-ruby-e0b756d4bb3b){:rel=nofollow}

It may be useful if we need to store some data that is not related to any model. Essentially, it’s an object oriented version of `if … elsif … elsif … else … end` that is much much easier to extend. Because of that we can’t use hashes. Processing objects, aka handlers, contain logic for handling exactly one case. 

So where can we use it? For example we could define a chain for handling payments. One handler would take care of payment for one provider such as payU, credit card, bank transfer. 


## So why did we use it?

We were working with big and messy legacy code. There was a gigant `if else` statement in one of the services. In our case it was responsible for choosing shipping provider based on selected carrier and shipment. It was taking into account saved api keys for providers, which provider was enabled in the given store and some other stuff. There were a lot of different cases, every case was handled differently, each one of them consisted of about 50-line method. 


## Another reason

Services are usually used for everything in Rails, which may not always be an ideal solution. This is our old, but good post about [basic design patterns](https://naturaily.com/blog/ruby-on-rails-design-patterns). Services may be very helpful when we have a lot of processes to accomplish, but in our opinion they are overused. Also services should be responsible for only one thing, as deciding how to handle something and handling it are two completely different things


### Our Idea?
Check which provider supports chosen carrier, then make sure that selected carrier is active for current provider. If not, continue checking. 

## Implementation
We have created main Chain object, which initializes all handlers and creates a “chain”. 

```ruby
class BasicChain
 class << self
   def resolve(*args)
     mapped_handlers[0...-1].each_with_index do |handler, index|
       mapped_handlers[index + 1].successor = handler
     end
     mapped_handlers.last.call(*args)
   end

   def handlers
     []
   end

   def mapped_handlers
     @mapped_handlers ||= handlers.map(&:new)
   end
 end
end
```

It’s an interface for all future chains, it initializes handlers and assigns successor to each one of them. As you can see in the code below, successor is just a next handler in the chain.

We’ve also implemented `BaseHandler`

```ruby
class BaseHandler
  attr_accessor :successor

  def initialize(successor = nil)
    @successor = successor
  end

  def call
    raise "#call method should be implemented"
  end
end
```

BaseHandler is an interface for all future handlers. In initializer, we provide a successor, which defines a next handler of the Chain, which will be executed if condition for the current handler is false (in this case, the carrier name is not passing).

`BasicChain` and `BaseHandler` provides pattern how every other Chain should look like. So, while creating a new chain, we need an array of handlers as it defines an order in chain and what handlers are involved in the chain.

```ruby
module ShippingProviderChain
  class Chain < BasicChain
    class << self
      def handlers
        [
          ShippingProviderChain::DefaultProviderHandler,
          ShippingProviderChain::SecondProviderHandler,
          ShippingProviderChain::FirstProviderHandler
        ]
      end
    end
  end
end
```

As you can see in the example below, handler returns active provider when a certain condition is met. In any other case it passes all received data to the next handler in the chain.

```ruby
module ShippingProviderChain
  class BaseShippingHandler < BaseHandler
    UNKNOWN_PROVIDER = "unknown".freeze
    PROVIDER = "".freeze
    SUPPORTED_CARRIERS = [].freeze

    def call(carrier_name, shop)
      return active_provider(carrier_name, shop) if supported_carrier?(carrier_name)
      return successor.call(carrier_name, shop) if successor.present?
      UNKNOWN_PROVIDER
    end

    def active_provider(carrier_name)
      PROVIDER
    end

    private

    def supported_carrier?(carrier_name)
      carrier_name.in?(CARRIERS)
    end
  end
end
```

Here’s an example of an implementation of a handler which selects `FirstProvider` if direct integration with this provider is enabled. If not, it selects unifaun if indirect integration enabled.

```ruby
module ShippingProviderChain
  class FirstProviderHandler < BaseShippingHandler
    PROVIDER = "first_provider".freeze
    CARRIERS = ["gls", "dhl", "..."]

    def active_provider(carrier_name, shop)
      if shop.first_provider.direct_integration_enabled?
        # select first provider
      elsif shop.unifaun_provider.enabled?
        # select unifaun
      else
        BaseShippingHandler::UNKNOWN_PROVIDER
      end
    end

    private

    def supported_carrier?(carrier_name)
      carrier_name.in?(CARRIERS)
    end
  end
end
```

## Conclusion

There is definitely a lot of room for improvement in our implementation but at the same time it’s a huge step forward compared to the original legacy code. Our solution also may not be perfect in this particular application, as there are not that many conditionals but it’s much easier to read and easier to extend in the future (for example when new providers will be added). Adding new Chains is now really easy, thanks to `BasicChain` and `BaseHandler`. 

What other solutions would you suggest for our case and why? We’re always happy to learn new things! 

**Special thanks to the reviewer of this post: Jakub Flasiński.**
