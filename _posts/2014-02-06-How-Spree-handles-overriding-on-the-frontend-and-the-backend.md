---
title: How Spree handles overriding on the frontend and the backend
description: >-
  We're going to take a look into some of the issues we've faced, and how we
  overcame them while using Spree - the most popular e-commerce Ruby on Rails
  platform.
slug: spree-override-views
date: '2014-02-06 10:38:01 +0000'
category: Spree development
author: Mateusz Barczak
avatar: mateusz.png
image: spreecomerce.jpg
text-preview: >-
  Couple months ago, after signing a contract to build an unusual e-commerce
  site, we were forced to make a choice. We’d build the site either from scratch
  or on top of existing solution. After a few days of getting our heads around
  the topic, we decided to take on the latter option.
tags:
  - Spree development
  - Ruby on Rails development
---

Couple months ago, after signing a contract to build an unusual e-commerce site, we were forced to make a choice. We’d build the site either from scratch or on top of existing solution. After a few days of getting our heads around the topic, we decided to take on the latter option.

Since we cherish Ruby, we chose the most popular Ruby based e-commerce engine: Spree.

We’ve downloaded the code and within minutes the app was up and running. Here is where we’ve spotted first rocks on the road...

Overriding controller actions
-----------------------------

Spree provides tools for tweaking controller’s action behaviour. You can change its response using `respond_override` method. However it affects only methods which use `respond_with` and yes, not everywhere `respond_with` is used. Since it is basically designed to change the output of an action, we can do something like:

```ruby

Spree::ProductsController.class_eval do
		respond_override index: { html: { success: lambda { redirect_to spree.root_path } } }
end
```

It’s fine if that’s all you need. If, however, you’d like to apply some changes to the object/collection, doing it within the method’s body is not the best idea.

Salvation comes with callbacks. Before and after each database interaction (in controllers) you can invoke callbacks to adjust the object you are working with. All you need to do is extend the controller with decorators (more on that later), add `create.after :some_method` and `some_method` will be called. It's self explanatory, ain’t it? Strange thing is, there’s no mention about this feature in official Spree docs.

Let me show a quick example that will help you understand what I mean. If for whatever reason, you’d have a `has_many  :users` relation to Product model and would like to initiate that relation instead of copying the whole action you’d have to do something like this:

```ruby
Spree::Admin::ProductsController.class_eval do
	create.before :product_users

	private

	def product_users
		@object.users.build params[object_name]
	end
end

```

This is elegant enough and can be used in various contexts, e.g. before or after creating an object.

Hint: `object_name` is a function inherited from ResourceController. It returns a string containing current object name, which, in this case, will be “product”.

More on decorators
------------------

Decorators can be actually used to adjust any method, no matter if it’s in a model or controller. They are easy to use, all you’ve got to do is:

1. go to a directory where the file we want to extend is placed, e.g. `app/models`,
2. create a file matching the following pattern:`#{file_name}_decorator.rb`,
3. put a piece of code inside:

```ruby
Spree::Product.class_eval do
		# code
end
```

and you are ready to rock this house.

By using this piece of code we make `Spree::Product` model and all its methods and associations available for tweaking. We can add new methods and override existing ones. Removing is not allowed, but you can always override a method with an empty one, right?

Anyway, overriding whole methods may be easy, adjusting their behaviour is less elegant though. You need to copy method’s body and make the change inside. Luckily Spree’s methods are usually small, but once in a while you may come across a whale-method and there’s not much you can do about it. Just copy, adjust and forget. Real life example? We had to omit one step in the checkout process, which is handled in Spree by `state_machine`. To achieve this we had to copy the whole configuration and ...comment ONE line!

Adjusting views like a ninja
--------------------------

On the frontend things do look much better. Overriding whole views is not necessary, because Spree was equipped with a great tool called “Deface”. It gives a lot of power to the frontend developer, who can:
*	change parts of HTML or CSS code in any view,
*	remove HTML or CSS code,
* wrap divs, spans, classes or other elements into his own divs, spans and whatnots.

Check this:
```
Deface::Override.new( name: ‘assasinate_the_spree_logo’,
			  virtual_path: ‘spree/shared/_header’,
				replace_contents: ‘#logo’,
				text: “<%= image_tag ‘logo.png’ %>”)
```

All you need to do is put this piece of code into any `.rb` file in `app/overrides` directory. Spree will load it automagically. You can put the whole overriding code in one file as well. We chose to name the files accordingly to our views e.g. `products_show.rb`, `admin_products_index.rb`.

There is another way of handling these overrides, this one will force you to keep the proper directory structure. Let’s give it a try and use `Deface::Override` example for this. Here’s what you need to do:

1.	first, in your `app/overrides` directory create the following directories: `spree/shared/_header/`,
2.	then create a file named `obliterate_the_spree_logo.html.erb.deface` in `_header` folder. A piece of advice: name it whatever you want, but remember that it should not collide with `Deface::Override` engine. And don’t forget about `.deface` extension!
3. put this markup inside:

```ruby
	<!-- replace_contents "#logo" namespaced -->
	<%= image_tag "logo.png" %>
```

And that’s it! You’ll get the same result as in the previous example.

Please note the “namespaced” option in the code. This should prevent name conflicts. And one last thing: naming files accordingly to views names will result in automagical view override.

You are not alone in the wilderness
-------------------------------

Spree offers the power of quick setup, but don’t get yourself fooled. Before you go down the rabbit hole:
*  read the code
*  read the documentation
*  analyze if extending the platform with your planned modules/features won’t be too much of a problem

Make the “Enter the Wonderland” decision a concious one.

Of course there’s plenty of gems and add-ons available. As well as content on stackoverflow. Help is around, but if you plan to change Spree’s flow and functionality strongly, I’d suggest creating the app from scratch instead.

Till next time!
