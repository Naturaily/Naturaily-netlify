---
title: >-
  Ruby on Rails implementation of a ranking system using PostgreSQL window
  functions
description: >-
  This tutorial will show you how you can easily implement tracking
  functionality in your Ruby on Rails project using PostgreSQL window functions.
slug: ranking-system-implementation-postgresql
date: '2016-10-11 10:38:01 +0000'
category: Ruby on Rails development
author: Patryk Szeliga
avatar: /assets/images/ciabos.jpg
image: /assets/images/rails-elephant.jpg
text-preview: >-
  Hello, this article will show, how easily you can add ranking functionality to
  your project.
tags:
  - Ruby on Rails development
---

Hello, this article will show, how easily you can add ranking functionality to your project.
We will accomplish it, with the use of ```ntile()``` window function.
I will be using Ruby on Rails for my application, with PostgreSQL database.

We will need:

 - a model with integer attribute, by which we want to make the ranking (in my case, it’s ```visit_count```). Here is an exemplary migration for Post model:

```ruby
class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|

      t.timestamps
      t.string :title
      t.integer :visit_count
      t.string :description
    end
  end
end
```

 - controller,

```ruby
class PostsController < ApplicationController
  def index
    @posts = # We will retrieve our collection here, but not now, we will get back to this later
  end
end
```

 - route for resource,

```ruby
Rails.application.routes.draw do
  resources :posts, only: :index
end
```

 - view for our index action and partial for post

```erb
# index.html.erb
<h1>Posts:</h1>
<%= render @posts %>
```

```erb
# partial _post.html.erb
<h3>
  Title: <%= post.title %>
  Description: <%= post.description %>
  Visit count: <%= post.visit_count %>
  Popularity: <%= post.popularity %> # I will explain later, what is 'popularity'
</h3>
```


Here I won’t implement increment functionality for ```visit_count```, because it's not the case of this article. We will just generate data by ourselves. For example by running this in Rails console:

```ruby
20.times do |n|
	Post.create(title: "Post nr#{n}", description: "Some description", visit_count: [*1..100].sample)
end
```

Instead of adding method to Post model, I will just create Query Object called ```PostWithPopularityQuery```, under ```app/query_objects/```, to keep the model slim.

```ruby
 class PostWithPopularityQuery
  POPULARITY_RANGES = 5

  def self.call
    Post.find_by_sql ['
      SELECT
        id, title, visit_count, description,
      ntile(?) OVER (
        ORDER BY visit_count ASC
      ) AS popularity
      FROM posts', POPULARITY_RANGES]
  end
end
```

You can see constant ```POPULARITY_RANGES```. This will be the number of 'levels' of popularity/ranking you want. Let's say it's 5. The ```ntile()``` window function will then apply value in range 1-5 to each record. In other words, it will divide it in ```n-tiles```.

About the public static ```.call``` method itself: first, we call method ```.find_by_sql``` on model (in this case it's Post), and we just open quotes and write SQL.

What about the SQL? We specify which columns we want to retrieve, then we use the ```ntile(?)``` with ```OVER``` - this will be the criteria for ranking, visit_count exactly.
We also have to use ```order by```, it is required for using ntile.
There is also something called ```popularity``` in here. I named it this way, but you can name it as you want. By this name, you will retrieve it’s ranking value, by calling it on instance of record (in my case, it’s ```post.popularity```)

And now, how do we know what popularity value (between 1 and 5) does each Post have? Simply call ```.popularity``` on ```Post``` instance retrieved by Query Object method.

How our controller will look like now?
Simple:

```ruby
class PostsController < ApplicationController
  def index
    @posts = PostWithPopularityQuery.call
  end
end
```

With templates specified earlier, we see something like this when we visit our ```Posts#index```:

![ranking-1](/assets/images/ranking-1.png "ranking-1")

Of course you might want something prettier than plain number.
With a little effort, you can change it to something cool, for example stars.
I decided to add gem ```font-awesome-rails``` for this article demo.
With one small change in our partial file ```_post.html.erb```, like this:

```erb
<h3>
  Title: <%= post.title %>
  Description: <%= post.description %>
  Visit count: <%= post.visit_count %>
  Popularity: <%- post.popularity.times do %>
    <%= fa_icon "star-o" %>
  <% end %>
</h3>
```

I've achieved result like this:

![ranking-2](/assets/images/ranking-2.png "ranking-2")

Pros of this approach:

- clean and tidy,
- fast-working (SQL window function is very efficient),
- quick to add,
- little code.

Cons:
  You tell me. Are there any?
