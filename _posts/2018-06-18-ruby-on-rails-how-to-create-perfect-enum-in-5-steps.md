---
title: Ruby on Rails - how to create perfect enum in 5 steps
description: >-
  In this tutorial you'll learn how to create perfect enum in just 5 steps! Read
  on to find out how to better implement enums in Ruby on Rails.
slug: ruby-on-rails-enum
date: '2018-06-18 10:00:00 +0000'
category: Ruby on Rails development
author: Błażej Pichur
avatar: /assets/images/blazej.png
image: /assets/images/perfect-enum.jpg
text-preview: >-
  When your project starts you probably design ERD diagram or a similar one.
  Then, each time when a client passes new requirements to you it’s necessary to
  modify it. That process helps to understand the specific domain and mirrors
  the reality.
tags:
  - Ruby on Rails development
---


When your project starts you probably design ERD diagram or a similar one. Then, each time when a client passes new requirements to you it’s necessary to modify it. That process helps to understand the specific domain and mirrors the reality. Entities that you model contain many attributes of various types. A quite popular requirement is to create an attribute that can be assigned to one of a few available values. In programming, that type is called **enumeration** or just **enum**.

  As an example, that could be a type of delivery: "courier", "parcel station" or "personal". Rails supports **enums** from version **4.1**.

This article consists of 3 sections:

1. Basic solution - introduce `ActiveRecord::Enum`, as simple as possible
2. 5 various steps to improve **enums** functioning
3. Ultimate solution - wrap all improvements into one implementation

To better understand the topic let’s add some real background. In our recent project, we worked on a system related to artworks. `Artworks` were collected into `Catalogs`. The catalog was one of the biggest models in our app. Among many attributes, we had 4 of the **enum** type.

`state: ["incoming", "in_progress", "finished"]`

`auction_type: ["traditional", "live", "internet"]`

`status: ["published", "unpublished", "not_set"]`

`localization: ["home", "foreign", "none"]`

## Basic Solution

Adding enum to an existing model is a really simple task. First of all, you need to create an appropriate migration. Notice that column type is set to integer and this is how Rails keeps **enums** values in the database.

`rails g migration add_status_to_catalogs status:integer`
```
class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def change
    add_column :catalogs, :status, :integer
  end
end
```
Next step is to declare **enum** attribute in the model.
```
class Catalog < ActiveRecord::Base
  enum status: [:published, :unpublished, :not_set]
end
```
Run the migrations and that’s it! From now you can take advantage of the whole bunch of extra methods.

For example, you can check if the current status is set to a specific value:

`catalog.published? # false`

or change the status to other value:

```
catalog.status = "published" # published
catalog.published! # published
```

List all published catalogs:

`Catalog.published`

To see all provided methods check [ActiveRecord::Enum](http://api.rubyonrails.org/v5.1/classes/ActiveRecord/Enum.html).

This simple solution is great for a start, but you may run into some troubles when your project will grow. To be prepared, you can implement a few improvements making your **enums** easier to maintain:

## 1. Declare enum as a Hash not Array

**Vulnerability before change:** Mapping between declared values and integers kept in the database is based on order in the array.

In this example mapping would be as follow:

```
class Catalog < ActiveRecord::Base
  enum localization: [:home, :foreign, :none]
end
```
```
0 -> home
1 -> foreign
2 -> none
```
That approach is not flexible at all. Imagine that requirements just have changed. From now "foreign" localization should be split into "America" and "Asia". In that case, you should remove old value and add two new ones. But... you cannot remove unused "foreign" type, because it violates an order of remaining values. To avoid this situation you should declare your **enum** as a `Hash`. There is not much to do:

```
class Catalog < ActiveRecord::Base
  enum localization: { home: 0, foreign: 1, none: 2 }
end
```
This declaration doesn’t depend on an order so you will be able to implement the changes and get rid of unused **enum** value.

## 2. Integrate ActiveRecord::Enum with PostgreSQL enum

**Vulnerability before change:** Meaningless integer values in the database.

Working with attributes representing by integers in the database can be annoying. Imagine that you want to query something in `rails console` or even you need to create a scope based on your **enum** field. Backing to our background, let's suppose that we want to return all `Catalogs` which are still up to date. So we can write a `where clause` like this:

`Catalog.where.not(“state = ?”, “finished”)`

We got an error as we expected:

```
ActiveRecord::StatementInvalid: PG::InvalidTextRepresentation:
ERROR: invalid input syntax for integer: "finished"
```
This problem occurs only in the array format of `where clause` because the second value is put directly into `SQL where clause` and obviously "finished" is not an integer.

A similar case can appear when you implement complex `SQL query` omitting `ActiveRecord` layer. When the query hasn’t access to the model then you lose meaningful information about values and stay with pure integers without sense. In that case, you need to put an extra effort to make these integers meaningful again.

Another annoying situation can take place when you work with a legacy database like this. You have access to the database and you are interested only in the data kept there. You are not able to get immediate information from what you see. Always need to map these numbers into real values from the domain.

It’s worth to remember that when integer **enum** is split from its model like in the examples above then we lose information, unfortunately.

To convince you even more, there is also safety point. When declaring `ActiveRecord::Enum` there is no guarantee that your data will be restricted only to provided values. Changes could be made by any SQL insertions. On the other hand, when you declare `PostgreSQL enum` you gain constraint on database level. You need to decide how confident you want to be.

**PostgreSQL** is commonly used as a database in **Ruby on Rails** projects. You can use `PostgreSQL enum` as a type of an attribute in the database table.

Let’s see how it looks this time.

`rails g migration add_status_to_catalogs status:catalog_status`

You need to change attribute type. I don’t recommend creating types like "status". It is likely that another status will appear in the future.
Next, you need to change migration a little. Most of all it must be **reversible** and could **execute SQL**.

```
class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def up
    execute <<-SQL
      CREATE TYPE catalog_status AS ENUM ('published', 'unpublished', 'not_set');
    SQL
    add_column :catalogs, :status, :catalogs_status
  end

  def down
    remove_column :catalogs, :status
    execute <<-SQL
      DROP TYPE catalog_status;
    SQL
  end
end
```

Declaration is similar to the previous one:

```
class Catalog < ActiveRecord::Base
  enum status: { published: "published", unpublished: "unpublished", not_set: "not_set" }
end
```

## 3. Add an index to enum attribute

**Vulnerability before change:** Queries performance.

This point is a simple one. It’s highly probable that your **enum** attribute is what can distinguish objects within a particular model. Like with our status: some `Catalogs` are published and others are not. As a consequence, searching or filtering by that attribute will be a quite frequent task, so it is worth to **add an index** to that field. Let's modify our migration:

```
class AddIndexToCatalogs < ActiveRecord::Migration
  def change
    add_index :catalogs, :status
  end
end
```

## 4. Use prefix or suffix option in your enums

**Vulnerabilities before change:**
- Unintuitive scopes

- Bad readability of helper methods

- Prone to errors

Referring to our recent project again, we had a few **enums** in our `Catalog` model:

`state: ["incoming", "in_progress", "finished"]`

`auction_type: ["traditional", "live", "internet"]`

`status: ["published", "unpublished", "not_set"]`

`localization: ["home", "foreign", "none"]`

  To **add prefix or suffix to enum** it’s enough to add that option to the declaration, like so:

```
class Catalog < ActiveRecord::Base
  enum status: { published: "published", unpublished: "unpublished", not_set: "not_set" }, _prefix: :status
  enum auction_type: { traditional: "traditional", live: "live", internet: "internet" }, _suffix: true
end
```

Let's see why it can be so helpful. In `Catalog` model, we have 4 **enums** and 12 values among them. It creates 12 scopes, very unintuitive scopes.

```
Catalog.not_set
Catalog.live
Catalog.unpublished
Catalog.in_progress
```
Can you say with ease what these methods return? No, you need to remember all the time how the scopes look. It may be annoying, really.

```
Catalog.status_not_set
Catalog.live_auction_type
Catalog.status_unpublished
Catalog.state_in_progress
```
That looks much better.

Let's suppose now that you need to add one more **enum** to your model. It should keep information about the order of each catalog inside the global catalog. The order of some catalogs may not be specified. Most important is to know which one is first and which is last. We can create another **enum**:
```
class Catalog < ActiveRecord::Base
  enum order: { first: "first", last: "last", other: "other", none: "none" }
end
```
Let's open `rails console` to test new scopes:

`Catalog.order`

We got an error. It’s self-explanatory.

```
 ArgumentError: You tried to define an enum named "order" on
 the model "Catalog", but this will generate a class method
 "first", which is already defined by Active Record.
```
Ok, we can fix it:

```
class Catalog < ActiveRecord::Base
  enum order: { first_catalog: "first_catalog", last_catalog: "last_catalog", other: "other", none: "none" }
end
```
And again, another error:

```
ArgumentError (You tried to define an enum named "order" on the
model "Catalog", but this will generate an instance method
"none?", which is already defined by another enum.)
```

Ok, that is obvious too. We forgot that value "none" was declared in another attribute as well.

Prefix or suffix options are a perfect fit to avoid these kinds of troubles. We can declare values just like we want, there is no reason to change words which are most descriptive. In that approach, scopes are more intuitive and meaningful. According to new attribute, the declaration should look like this:

```
class Catalog < ActiveRecord::Base
  enum order: { first: "first", last: "last", other: "other", none: "none" }, _prefix: :order
end
```

## 5. Implement Value Object to handle an enum

**Vulnerability before change:** Fat model

I can recommend extracting **enum** attribute into separated **Value Object** in two cases:

1. **Enum attribute** is used among many models (at least 2)
2. **Enum attribute** has specific logic that complicates a model.

Ok, let’s introduce sample situation. In our project auction houses (where artworks are sold) are placed all over the country. Poland divides into 16 regions, called voivodeships. Each `AuctionHouse` model has specific `Address` that contains `Voivodeship` attribute. You can imagine that for some reason there will be a necessity to list only northern auction houses or these from most popular voivodeships. In that case it is necessary to put extra logic into our model what makes it fatter. To avoid it you can extract that logic into another class making it **reusable** and **cleaner**.

```
class Voivodeship
  VOIVODESHIPS = %w(dolnoslaskie kujawsko-pomorskie lubelskie    lubuskie lodzkie
    malopolskie mazowieckie opolskie podkarpackie podlaskie
    pomorskie slaskie swietokrzyskie warminsko-mazurskie
    wielkopolskie zachodnio-pomorskie).freeze
  NORTHERN_VOIVODESHIPS = %w(warminsko-mazurskie pomorskie zachodnio-pomorskie podlaskie).freeze
  MOST_POPULAR_VOIVODESHIPS = %w(dolnoslaskie mazowieckie slaskie malopolskie).freeze

  def initialize(voivodeship)
    @voivodeship = voivodeship
  end

  def northern?
    NORTHERN_VOIVODESHIPS.include? @voivodeship
  end

  def popular?
    MOST_POPULAR_VOIVODESHIPS.include? @voivodeship
  end

  def eql?(other)
    to_s.eql?(other.to_s)
  end

  def to_s
    @voivodeship.to_s
  end
end
```

Then in your corresponding model, you need to overwrite this attribute. In our project it is `Address` model. `array_to_enum_hash` is just helper method converting the `Array` of **enum** values into a `Hash`.

```
class Address < ApplicationRecord
  enum voivodeship: array_to_enum_hash(Voivodeship::VOIVODESHIPS), _sufix: true

  def voivodeship
    @voivodeship ||= Voivodeship.new(read_attribute(:voivodeship))
  end
end
```

Here is what you achieved. Entire logic related to voivodeships is encapsulated into a single class. You can extend it as you want and `Address` model stayed **thick**.

Now, when you want to get voivodeship attribute, the object of `Voivodeship` class is returned. This is your **Value Object**.

```
voivodeship_a = Address.first.voivodeship
# #<Voivodeship:0x000000000651eef0 @voivodeship="pomorskie">

voivodeship_b = Address.second.voivodeship
# #<Voivodeship:0x00000000064e9cf0 @voivodeship="pomorskie">

voivodeship_c = Address.third.voivodeship
# #<Voivodeship:0x000000000641ef00 @voivodeship="lodzkie">
```

Take a look that both voivodeships have the same value, but as objects, they aren’t equal. Thanks to our helper method we can check the equality in that way:

```
voivodeship_a.eql? voivodeship_b
# true

voivodeship_a.eql? voivodeship_c
# false
```

And what is most powerful you can take advantage of all defined methods that representing requirements we specified earlier.

```
voivodeship_a.northern? # true
voivodeship_a.popular? # false

voivodeship_c.northern? # false
voivodeship_c.popular? # false
```

## Ultimate solution

Ok, you have passed through **5 enum improvements**. Now it’s time to sum up all steps and create **ultimate solution**. As an example, let's take `status attribute` from `Catalog` model. Implementation can look like this:

**Migration Generation:**

`rails g migration add_status_to_catalogs status:catalog_status`

**Migration:**

```
class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def up
    execute <<-SQL
      CREATE TYPE catalog_status AS ENUM ('published', 'unpublished', 'not_set');
    SQL
    add_column :catalogs, :status, :catalog_status
    add_index :catalogs, :status
  end

  def down
    remove_column :catalogs, :status
    execute <<-SQL
      DROP TYPE catalog_status;
    SQL
  end
end
```

**ValueObject:**

```
class CatalogStatus
  STATUSES = %w(published unpublished not_set).freeze

  def initialize(status)
    @status = status
  end

  # what you need here
end
```

**Catalog model & enum declaration:**

```
class Catalog
  enum status: array_to_enum_hash(CatalogStatus::STATUSES), _sufix: true

  def status
    @status ||= CatalogStatus.new(read_attribute(:status))
  end
end
```

## Conclusion

That’s all - **5 steps** to build a better implementation of **enums** in Rails.

Sometimes all steps will be necessary and another time only a few of them. You can adjust this solution to your needs. Hope that you have found something useful in this article. Let me know in the comments what’s your opinions about **enums**. Maybe you can recommend any further improvements?
