---
title: Value based pagination in Ruby on Rails
description: >-
  This is a quick tutorial that will show you how to handle properly value-based
  pagination in Ruby on Rails and where to use it.
slug: value-based-pagination-rails
layout: post
date: '2018-09-03 09:29:02 +0200'
category: Ruby on Rails development
author: Tomasz Żdanuk
avatar: /assets/images/tomasz.jpg
image: /assets/images/value-based-pagination.jpg
text-preview: >-
  This is a quick tutorial that will show you how to properly handle value-based
  pagination in Ruby on Rails and where to use it.
tags:
  - Ruby on Rails development
---
Have you ever had a situation like this: You are browsing the Internet, and on the page number 889 you find a bunch of great articles, which you want to share with your friends or just save in your browser tab to read it later. Seems like a good idea, right? Unfortunately, after few hours/days/month/decades, you realize that the link you have saved is now pointing to a completely different content! What a shame!

Value-based pagination in Ruby on Rails to the rescue! In this article, you'll find the solution on how to prevent your users from getting that awkward feeling! Go grab a cup of coffee and stay/bear with me, it won't take long!

## Typical OFFSET pagination in Ruby on Rails

### How does it work (and when it can cause troubles)?

There are a few different gems which can be used to paginate your content.

The most popular ones, among the Ruby on Rails community, are:

* [kaminari](https://github.com/kaminari/kaminari)
* [will_paginate](https://github.com/mislav/will_paginate)

The main principle of their work is quite simple: get _n_ records with _m_ offset, or in other words get first/second/… page containing _n_ records, where _n_ and _m/page number_ is set by user or developer. We used to call it _offset pagination_.

## Issues with ‘offset’ pagination

<img src="/assets/images/value-based-pagination-offset.png @path %}' alt="value-based-pagination-offset" height="100%" width="100%">

For many basic situations this approach is good enough so don't be afraid to use it in your projects if it suits your needs! But... (there is always ‘a but’) in situations when:

* you want to have a consistent content regardless of when you are visiting the link or your content is changing so quickly, 
* there is high probability that your API call for the next page doesn't return you expected content, etc., 

then classical pagination is not for you! This article is!

Unfortunately, the fun doesn’t end there. There is a third issue, which, depending on what you want to achieve, may even be far more important to you than the two previous ones. 

SQL `OFFSET` is a very time-consuming method, the more records your database contains, the more time your offset method needs to get requested records. Selecting records using `WHERE` method is way much more effective. If you are interested in benchmarks and fancy graphs, you can easily find them using Google.

One more real-life situation, where value-based pagination in Rails fits perfectly is SPA chat messages infinite scroll. In a situation when new messages arrive constantly without reloading the page, traditional pagination may have a problem with getting proper results on the first shot. I have tested this in real life app! Time based pagination seems to work really good in this scenario, at least it is much more reliable than a traditional pagination, for sure!

 <img src="/assets/images/value-based-pagination-where.png @path %}' alt="value-based-pagination-where" height="100%" width="100%"> 

I've made a very simple benchmark of these two methods to test how big of a time difference we are talking about.

I've created 2 milion simple records which was used to this test.

In the first scenario, I was requesting the last page in offset pagination, and some randomly selected records for value based pagination.

In **value based pagination** loading data time is constant, just take a look at screenshots.

![value-based-pagination-offset-1](/assets/images/value-based-pagination-value-1.png)

![value-based-pagination-offset-2](/assets/images/value-based-pagination-value-2.png)

![value-based-pagination-offset-3](/assets/images/value-based-pagination-value-3.png)

As you've probably guessed, **offset pagination** is dependent on the amount and the location of data. 

If it is located at the end of the data set then the database has to go through the whole set which is very time-consuming. 

If the data is right at the beginning then the pagination can access it right away.

![value-based-pagination-offset-1](/assets/images/value-based-pagination-offset-1.png)

![value-based-pagination-offset-2](/assets/images/value-based-pagination-offset-2.png)

![value-based-pagination-offset-3](/assets/images/value-based-pagination-offset-3.png)

As you can see from the screenshots, for the very first pages, offset pagination has very similar results as the value based pagination. The biggest differences are on the end of the collection, to retrieve the last 200 elements, **offset pagination needed 262ms**, where `WHERE` pagination had constant **0.5ms results**. The difference is **huge**.

If you are interested in this type of pagination you can easily find much better documents and benchmarks about it. 

**NOTE:** _To be well understood: `kaminari` or `will_paginate` are great tools in terms of what they do. I also use them often because they are making pagination easier and faster to develop, but in some situations, they are just not good enough! The approach presented in this article isn't the Holy Grail of pagination, it's just another kind of pagination technique, so as always, choose your tools and techniques wisely and situation-wise._

## Solution using value-based pagination in Rails

### How should a good pagination in Ruby on Rails look like?

There are few requirements which should be met, in my opinion, to make pagination really useful.

Pagination should be:

* **Easily accessible**, you should be able to easily use your pagination method on every records collection.
* **Safe**, because it will be working with user input, so every parameter should be sanitized.
* **Customizable**, because you don’t want to always paginate your content by the default **created_at** attribute.
* \[        ] This is a place for your ideas! If you have, any more ideas what other requirements should be satisfied, drop me the line in the comments section below!

## How did I meet the requirements stated above?

1. **Ease of Access.** To achieve easy and global access to my pagination method, I’ve decided to extend the `ApplicationRecord` class. Every Ruby on Rails* model should extend this class, thanks to that I'm sure that this method will be accessible by every registered model objects collection. Thanks to `ApplicationRecord` I can also be sure that I'm not shadowing any other method in the model by using `ActiveRecord::Base`, for example in gems.
2. **Safety.** The main parameters used here will be: `id`, `value`, `column`, `limit`.
   * `id` - id parameter is useful in case when more than one record has the bound value, this parameter help ensure that we have all records included, without duplication.
   * `value` - this parameter should represent the upper bound value before which all records should be returned. In my case, I chose `timestamp`, because it fits my purposes the best and it simplifies the whole thing a bit. Because of that my `value` has to be time type, the easiest way to achieve and ensure this is to parse input to `Time` class.
   * `column` - this parameter says what column will be used to paginate our content. This column should exist in our model, to check this I used `columns_hash` method. To be sure that column name is properly quoted string, I've used `ActiveRecord::Base.connection.quote_column_name` method.
   * `limit` - last, but not least, the parameter should specify the upper limit of returned records (the upper limit, because in some cases, like the last page, there could be fewer records returned), `limit` always should be a positive integer number.
3. **Customization.** Every essential parameters are taken as attributes, so I can easily change column or direction of pagination.

**NOTE:** _ApplicationRecord appears in Ruby on Rails 5, if you have older Ruby on Rails version you can try to extend ActiveRecords::Base, or simply choose another method to include this method to your codebase_

## Stop talking! Give me the solution!

**NOTE:** _Order clause is a part of preparing data, if you have properly ordered data, feel free to remove it. Ordering is always the most time consuming part in all SQL queries_

```ruby
# ./models/application_record.rb

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  class << self
    def start_at(id: 1, timestamp: Time.now, column: :created_at, limit: 10)
      params = parsed_params(id, timestamp, column, limit)
      where("#{table_name}.#{params[:column_name]} < :value OR\
               (#{table_name}.#{params[:column_name]} = :value AND id > :id)",
            value: params[:timestamp], id: params[:id])
        .order(column => :desc)
        .limit(params[:limit])
    rescue ArgumentError
      order(created_at: :desc).first(params[:limit])
    end

    private

    def parsed_params(id, timestamp, column, limit)
      parsed_id = id.to_i
      parsed_timestamp = Time.parse timestamp.to_s
      column_type = columns_hash[column.to_s].type
      raise ArgumentError unless [:date, :datetime, :time, :timestamp].include?(column_type)
      parsed_limit = [limit.to_i, 1].max
      column_name = ActiveRecord::Base.connection.quote_column_name(column)

      {
        id: parsed_id,
        timestamp: parsed_timestamp,
        column_name: column_name,
        limit: parsed_limit
      }
    end
  end
end
```

## Conclusion

There is still much room for improvement, anyway I think that this solution is a good point to start with. As mentioned earlier, presented solution is not the Holy Grail of value-based pagination in Rails, it means that in some situations it will fit better, in others it will be the worst solution ever, so choose wisely!

To check this type of pagination in practice take a look at [Gizmodo](https://gizmodo.com/) site and focus your attention at address bar when clicking `More stories` button.

**What are yours experiences with pagination in Ruby on Rails?** Do you have any suggestions regarding my solution? Let me know in the comments down below! 

Thanks for reading!

Sources:

[The art of pagination – Offset vs. value based paging ](https://blog.novatec-gmbh.de/art-pagination-offset-vs-value-based-paging/){:rel="nofollow"}
