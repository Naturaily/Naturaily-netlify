---
title: Rails on a diet
description: >-
  So you're working with Ruby on Rails but you don't know how to make it more
  'lightweight'? In this Ruby on Rails tutorial, we are going to take Rails on a
  diet.
slug: diet-rails
date: '2014-08-19 10:38:01 +0000'
category: Ruby on Rails development
author: Przemysław Świercz
avatar: /assets/images/swierszcz.png
image: /assets/images/railsondiet.jpg
text-preview: >-
  More and more apps are being created with an API support. Growing popularity
  of Angular.js and Backbone.js makes it even more important part of new
  projects. Why is that? There is a trend to seperate backend from frontend not
  only in terms of logic but also to split the project into two seperate ones -
  pure API backend and client-side-only frontend. What's all the fuss about? It
  is simple - you have a nice and clear API for a javascript webapplication and
  therefore you do not need to worry about the assets pipeline and other
  full-stack projects related issues. And you get an API for mobile devices. For
  free.
tags:
  - Ruby on Rails development
---


More and more apps are being created with an API support. Growing popularity of Angular.js and Backbone.js makes it even more important part of new projects. Why is that? There is a trend to seperate backend from frontend not only in terms of logic but also to split the project into two seperate ones - pure API backend and client-side-only frontend. What's all the fuss about? It is simple - you have a nice and clear API for a javascript webapplication and therefore you do not need to worry about the assets pipeline and other full-stack projects related issues. And you get an API for mobile devices. For free.

Rails is a huge framework. It supports almost everything you need and more. You get nice templating engine with partials, cookies and flashes support, static assets and other goodies. However, when you are developing a pure API backend you do not need most of these.


## Rails-api

There is a nice gem called [rails-api](https://github.com/rails-api/rails-api) which is sufficient for most of your needs. You can grab more details on this from this [railscast](http://railscasts.com/episodes/348-the-rails-api-gem?view=asciicast). Here we want to digg into the internals of the default rails configuration and tune it for API purposes so we won't use rails-api gem.

## Middlewares

Rails applications have few middlewares enabled by default. For Rails 4.1.4 these are:
```ruby
    Rack::Sendfile
    ActionDispatch::Static
    Rack::Lock
    #<ActiveSupport::Cache::Strategy::LocalCache::Middleware:0x007ff931376400>
    Rack::Runtime
    Rack::MethodOverride
    ActionDispatch::RequestId
    Rails::Rack::Logger
    ActionDispatch::ShowExceptions
    ActionDispatch::DebugExceptions
    BetterErrors::Middleware
    ActionDispatch::RemoteIp
    ActionDispatch::Reloader
    ActionDispatch::Callbacks
    ActionDispatch::Cookies
    ActionDispatch::Session::CookieStore
    ActionDispatch::Flash
    ActionDispatch::ParamsParser
    Rack::Head
    Rack::ConditionalGet
    Rack::ETag
    YouApp::Application.routes
```
You can check enabled middlewares on your own by running **rake middleware**. As you can see almost all of these are classes. Only LocalCache is an object so you wll have a different address here.

We won't need all of these so let's get rid of the unnecessary ones. It is a good thing to keep middlewares configuration in a seperate file so we create **config/middlewares.rb** and put the following code in here:

```ruby
    # load rb files from app/middlewares directory
    # these are our custom middlewares
    Dir[Rails.root.join('app/middlewares/*.rb')].each{|f| require f}

    Rails.application.config.tap do |config|
      # disable unnecessary default middlewares
      config.middleware.delete ::Rack::Sendfile
      config.middleware.delete ::ActionDispatch::Static
      config.middleware.delete ::ActionDispatch::RequestId
      config.middleware.delete ::ActionDispatch::Cookies
      config.middleware.delete ::ActionDispatch::Session::CookieStore
      config.middleware.delete ::ActionDispatch::Flash
      config.middleware.delete ::ActionDispatch::Http::Headers
      config.middleware.delete ::Rack::ETag

      # remove headers: X-Frame-Options, X-XSS-Protection, X-Content-Type-Options
      config.action_dispatch.default_headers = {}
    end
```
You can drop a different set of middlewares if you want to.
Next, we need to load this file from **config/environment.rb**

    # load middlewares config file
    require File.expand_path('../middleware', __FILE__)


Now, you can put your custom middlewares in **app/middlwares** directory. But remember to load them from **config/middleware.rb** e.g. if we want not to return **X-Runtime** header in every single response we need to manually hide it using a custom middleware. Deleting **Rack::Runtime** will fail in this case. In this situation you should insert your hiding middleware using:
```ruby
    # remove X-Runtime header
    config.middleware.insert_before(::Rack::Runtime, ::HideRuntime)
```
The code for app/middlewares/hide_runtime.rb may look like this:
```ruby
    class HideRuntime
      def initialize(app)
        @app = app
      end
      def call(env)
        status, headers, body = @app.call(env)
        headers.delete('X-Runtime')
        [status, headers, body]
      end
    end
```
## Rails frameworks

OK, so we have dropped some unnecessary middlewares so far. The next thing to consider is to choose which of the default Rails frameworks we actually need. Let's take a look at **config/application.rb**.
```ruby
    require File.expand_path('../boot', __FILE__)

    # Pick the frameworks you want:
    require 'active_model/railtie'
    require 'active_record/railtie'
    require 'action_controller/railtie'
    require 'action_mailer/railtie'
    require 'action_view/railtie'
    require 'sprockets/railtie'
    require 'rails/test_unit/railtie'

    # Require the gems listed in Gemfile, including any gems
    # you've limited to :test, :development, or :production.
    Bundler.require(*Rails.groups)

    module MyApp
      class Application < Rails::Application
        # Settings in config/environments/* take precedence over those specified here.
        # Application configuration should go into files in config/initializers
        # -- all .rb files in that directory are automatically loaded.

        # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
        # Run 'rake -D time' for a list of tasks for finding time zone names. Default is UTC.
        # config.time_zone = 'Central Time (US & Canada)'

        # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
        # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
        # config.i18n.default_locale = :de
      end
    end
```
You can freely comment out some of *require* statements. We will not need *action_view* orsprocets. If you prefer RSpec you can also drop *test_unit*. ActiveRecord is kinda fat so if you are going to use some NoSQL database you should check out MongoDB and its Mongoid framework. For SQL databases check out the DataMapper framework. Mongoid still depends on ActiveModel so we can leave it uncommented. If you are not planning to send emails from within your application then you should comment action_mailer and remember to drop config statements from files in **config/environments** directory. Finally we can end up with something like this:
```ruby
    # Pick the frameworks you want:
    require 'active_model/railtie'
    # require 'active_record/railtie'
    require 'action_controller/railtie'
    # require 'action_mailer/railtie'
    # require 'action_view/railtie'
    # require 'sprockets/railtie'
    # require 'rails/test_unit/railtie'
```
## Gemfile

In your Gemfile do not hestitate to use groups. Every gem which is essential only in development and/or test should be put in its group e.g. capistrano or pry-byebug should be wrapped in development group
```ruby
    group :development do
      gem 'better_errors'
      gem 'binding_of_caller'
      gem 'pry-byebug'
      gem 'capistrano'
      # ...
    end
```
This will prevent from loading extra code in your staging/production environments. Also feel free to use *require: false* for gems you do not want to be automatically loaded from your **config/application.rb** file.
```ruby
    gem 'koala', require: false
```
It means that if you want to use that gem you should first require it on top of your file - like in pure ruby code. It may be inconvinient but should speed up your application.


## Api Controller

The most important part of your application. Since it's an API project we don't call it *ApplicationController*. It's just *ApiController*. First, don't declare this class as inherited from *ActionController::Base*. We don't want that. We don't need that. Use *ActionController::Metal* instead which is more lightweight and add only the modules you need.

OK, so now you have two strategies to follow. You can either *include what you want* or *exclude what you don't want*. I personally prefer the second approach. Notice that if you're using rabl or jbuilder templates you probably want to have rendering stuff included. Your *ApiController* should be something like this:
```ruby
    module Api
      class ApiController < ActionController::Metal
        WITHOUT = [
          AbstractController::Translation,
          AbstractController::AssetPaths,
          ActionController::UrlFor,
          ActionController::Redirecting,
          ActionController::Renderers::All,
          ActionController::ConditionalGet,
          ActionController::Caching,
          ActionController::MimeResponds,
          ActionController::Cookies,
          ActionController::Flash,
          ActionController::RequestForgeryProtection,
          ActionController::ForceSSL,
          ActionController::Streaming,
          ActionController::DataStreaming,
          ActionController::HttpAuthentication::Basic::ControllerMethods,
          ActionController::HttpAuthentication::Digest::ControllerMethods,
          ActionController::HttpAuthentication::Token::ControllerMethods,
          ActionController::Instrumentation,
          ActionController::ParamsWrapper
        ]

        ActionController::Base.without_modules(*WITHOUT).each do |el|
          include el
        end

        prepend_view_path 'app/views'
      end
    end
```
If ou want your views to load correctly remember to set the view path as above. Keep in mind that if you don't like *excluding approach* you can always take a look into *ActionController::Base* class and include only those modules you really need. Here's the array of all the modules included in *ActionController::Base* by default:
```ruby
    MODULES = [
      AbstractController::Rendering,
      AbstractController::Translation,
      AbstractController::AssetPaths,

      Helpers,
      HideActions,
      UrlFor,
      Redirecting,
      ActionView::Layouts,
      Rendering,
      Renderers::All,
      ConditionalGet,
      RackDelegation,
      Caching,
      MimeResponds,
      ImplicitRender,
      StrongParameters,

      Cookies,
      Flash,
      RequestForgeryProtection,
      ForceSSL,
      Streaming,
      DataStreaming,
      HttpAuthentication::Basic::ControllerMethods,
      HttpAuthentication::Digest::ControllerMethods,
      HttpAuthentication::Token::ControllerMethods,

      # Before callbacks should also be executed the earliest as possible, so
      # also include them at the bottom.
      AbstractController::Callbacks,

      # Append rescue at the bottom to wrap as much as possible.
      Rescue,

      # Add instrumentations hooks at the bottom, to ensure they instrument
      # all the methods properly.
      Instrumentation,

      # Params wrapper should come before instrumentation so they are
      # properly showed in logs
      ParamsWrapper
    ]
```
## Dependencies

Whan using the described setup you should be aware of the fact that you can get errors if some of your gems are using something you dropped from your application. As an example you may take *Draper* (decorators framework) which won't work untill you have  *ActionDispatch::RequestId* middleware laoded.

## Next?

From now on it's all up to you. If you've chosen only those middlewares and frameworks you need your application should be lighter, cleaner and even faster comapring to full Rails setup.

That's all for now. Till next time.
