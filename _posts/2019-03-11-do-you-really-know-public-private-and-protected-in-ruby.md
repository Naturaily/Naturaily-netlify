---
title: 'Do you really know public, private and protected in Ruby?'
description: >-
  Public, private and protected access - all of the programmers are familiar
  with that concept. Nothing special, we work with them on a daily basis.
  However, as Ruby programmers, do we really know the details?
slug: public-private-protected-ruby
layout: post
twitter-card: summary_large_image
date: '2019-03-18 09:30:43 +0200'
category: Ruby on Rails development
author: Błażej Pichur
avatar: blazej.png
image: public-private-protected-ruby.jpg
text-preview: >-
  Public, private and protected access - all of the programmers are familiar
  with that concept. Nothing special, we work with them on a daily basis.
  However, as Ruby programmers, do we really know the details?
tags:
  - Ruby on Rails development
---
**Public, private and protected access** - all of the programmers are familiar with that concept. Nothing special, we work with them on a daily basis. However, as Ruby programmers, do we **really** know the details?

You can check yourself with these five statements. Try to answer: TRUE or FALSE.

### Statements:

1. Public methods have no access control - they can be called from the outside of the class definition by the instance of that class or it's subclasses.
2. Both protected and private methods cannot be called from the outside of the defining class.
3. Protected methods are accessible from the subclass and private methods are not.
4. Private methods of the defining class can be invoked by any instance of that class.
5. Public access is the default one.

We will back to the correct answers at the end of this article. For now let’s go deeper into some nuances of **public, private and protected access control**. To make it more practical I prepared sample code to play with. I recommend cloning this [repo](https://github.com/blazeP/ruby-access-control) to make continuing with the article easier. It’s just one file. If you would like to think of the solution first, then hold off running the code.

Here is the sample code:

```ruby
class Region
 attr_accessor :name

 def initialize(name, population, area_size, continent)
   self.name = name
   self.population = population
   self.area_size = area_size
   self.continent = continent
 end

 def greeting
   puts name_info + population_info
 end

 def more_densely_populated?(other_region)
   result = population_density > other_region.population_density ? 'more' : 'less'
   puts "#{name} is #{result} densely populated than #{other_region.name}."
 end

 def the_same_continent?(other_region)
   if continent.eql?(other_region.continent)
     puts "#{name} and #{other_region.name} lie in the same continent."
   else
     puts "#{name} and #{other_region.name} lie in the different continents."
   end
 end

 def can_be_crowdy?
   if self.consider_as_densely_populated?
     puts "#{name} can be crowdy."
   else
     "There is enough space in the #{name}."
   end
 end

 protected

 attr_accessor :continent

 def name_info
   "Hello, I'm #{name}!"
 end

 private

 attr_accessor :population, :area_size

 def population_info
   " #{population} people live here."
 end

 def population_density
   population / area_size
 end

 def consider_as_densely_populated?
   population_density > self.class::HIGH_POPULATION_DENSITY
 end
end

class Country < Region
 HIGH_POPULATION_DENSITY = 300

 def own_greeting
   puts "The country name: #{name}." + population_info
 end
end

class City < Region
 HIGH_POPULATION_DENSITY = 3000

 def own_greeting
   puts name_info + " The population: #{population} people."
 end
end

# initialization
wroclaw = City.new('Wrocław', 638_000, 293, 'Europe')
san_francisco = City.new('San Francisco', 884_000, 121, 'Northern America')
poland = Country.new('Poland', 38_000_000, 312_000, 'Europe')

# I section
wroclaw.greeting
poland.greeting

# II section
wroclaw.name_info
wroclaw.population_info

# III section
wroclaw.own_greeting
poland.own_greeting

# IV section
wroclaw.more_densely_populated?(san_francisco)
wroclaw.the_same_continent?(san_francisco)
san_francisco.can_be_crowdy?
```

You can see the base class `Region` here along with two child classes: `Country` and `City`. `City` and `Country` inherit from `Region`. Inheritance is used to demonstrate the **public, private and protected** details. At the end of the file, we can find initialization part and 4 sections which we’ll discuss below. Take a look at the file to get familiar with the code.

Ok, let’s start! In the 3rd section of the initialization, the following objects are created - `wroclaw`, `san_francisco` and `poland`. These objects will be used for demonstration purposes in the upcoming sections. I suggest treating all these segments separately. You can comment out the particular section before you go to the next one. In that way, errors won’t block the rest of the output.

### I Section
*Topic*: **Public access.**

In the first section `greeting` method is invoked twice: by the `wroclaw` and by the `poland` objects. Nothing special here. Public access is straightforward. The `greeting` is accessible for its class’s object (`poland`) and for its child-class’s object (`wroclaw`).

```
Hello, I'm Wrocław! 638000 people live here.
Hello, I'm Poland! 38000000 people live here.
```

*Conclusion*: Public access is evident and intuitive. There are no restrictions. Also, it is the **default access modifier**.

### II Section
*Topic*: Access to the **private and protected methods from the outside** of the defining class.

There are two important methods in that section: protected `name_info` and private `population_info`. The result seems to be intuitive again. `wroclaw` object has no access to neither the private methods nor the protected ones. In both cases `NoMethodError` is thrown.

```
protected method `name_info' called for #<City:0x...> (NoMethodError)
private method `population_info' called for #<City:0x...> (NoMethodError)
```

*Conclusion*: **Private and protected methods cannot be called from the outside** of the class. Access is restricted.

### III Section
*Topic*: Access to **private and protected methods from the inside** of the defining class.

This time we have `City::own_greeting` which uses inherited protected method inside (`name_info`) and `Country::own_greeting` which uses inherited private method inside (`population_info`). Both private and protected methods (even if they are inherited) are accessible inside the class. So it’s not the point which distinguishes private from protected access.

```
Hello, I'm Wrocław! The population: 638000 people.
The country name: Poland. 38000000 people live here.
```

*Conclusion*: **Private and protected methods can be called from the inside** of the defining class. Access is allowed.


### IV Section
*Topic*: Actual **difference between private and protected** methods.

IV Section - More unexpected rules can start appearing here.
You can see 3 public methods there:
* `more_densely_populated?(other_region)` - it uses private `population_density` inside.
* `the_same_continent?(other_region)` - it uses protected `continent` inside.
* `can_be_crowdy?` - it uses private `consider_as_densely_populated?` inside.


Let’s go through the code step by step:

**more_densely_populated?(other_region)**
```
wroclaw.more_densely_populated?(san_francisco)

=> private method `population_density' called for #<City:0x...> (NoMethodError)
```

Hmm, that’s interesting. **Private** method `Region::population_density` hasn’t been called, even though it is implemented inside the `Region` class. The similar scenario has been worked in the III section...

**the_same_continent?(other_region)**
```
wroclaw.the_same_continent?(san_francisco)

=> Wrocław and San Francisco lie in the different continents.
```

This one works. Any difference here? Right, `the_same_continent?` uses **protected** attribute - `continent`. Ok, let’s continue.

**can_be_crowdy?**
```
san_francisco.can_be_crowdy?

=> private method `consider_as_densely_populated?' called for #<City:0x...> (NoMethodError)
```

`NoMethodError` again. Hmm, `can_be_crowdy?` also uses **private** `consider_as_densely_populated?` method. Similar situation was working fine in the III section. So what’s going on here?

It’s all about **the receiver**.

Basically **the receiver is the object whose method is invoked**. Let’s go straight to the examples:

* `other_region.population_density ?` - The receiver is `other_region`.
* `other_region.continent` - The receiver is `other_region`.
* `self.consider_as_densely_populated?` - The receiver is `self`.

And here is **the important stuff**, remember **that rule**:
> Private methods cannot be called with an explicit receiver.

Pay attention to the word '**explicit**' here. Simplifying this statement - you cannot call private method by writing the invocation like this - `object.some_method`. You need to use pure `some_method`. In the latter case Ruby uses the implicit receiver, which is always `self`. Regardless of that fact, you still cannot call a private method by `self.some_method`, cause it’s still **an explicit receiver**, and rules are rules :)

Going back to our methods:
* `other_region.population_density ?` - **The explicit receiver** is present and the method is **private** - `NoMethodError`
* `other_region.continent` - **The explicit receiver** is present and the attribute is **protected** - **OK**
* `self.consider_as_densely_populated?` - **The explicit receiver** is present and the method is **private** - `NoMethodError`

*Conclusion*: This is the actual distinction between private and protected. **Private methods cannot be called with an explicit receiver and protected ones can**. Based on my experience, protected methods are rarely used among Ruby code lines, but they can be useful while comparing parameters, for example, when we want to restrict access to the attribute but still want to use it in the comparison method.

I hope that the access control rules are much more clear now. I encourage you to get your hands dirty with the [code](https://github.com/blazeP/ruby-access-control) if you hadn’t done it already. Theory tends to get forgotten if it isn't proofed.   

In the end, as I promised - answers to the statements:

1. TRUE
2. TRUE
3. FALSE
4. FALSE
5. TRUE

### Summary

I’ve written this article because for me it was also surprising how **public, private and protected access actually work** in Ruby. The simplest things are the hardest to understand, or at least they can be. I really hope that this article was helpful for you. Or perhaps, you were aware of the access rules before reading it. Share your thoughts in the comments, I’m very curious of them. You can take a look at the  [docs](https://ruby-doc.com/docs/ProgrammingRuby/html/tut_classes.html) too. You will find all these details there :)
