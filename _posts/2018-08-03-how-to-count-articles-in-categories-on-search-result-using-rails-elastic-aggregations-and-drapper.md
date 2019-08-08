---
title: Count articles by category on search in Ruby on Rails
description: >-
  Have you ever wanted to calculate how many articles will be left in a certain
  category after search? Elasic aggregations and Drapper are significant in a
  Ruby on Rails development, find out why!
slug: rails-elastic-aggregation-drapper
layout: post
date: '2018-08-27 11:55:08 +0200'
category: Ruby on Rails development
author: Arek Poczobut
avatar: arek.jpg
image: rails-elastic-aggregation-drapper.jpg
text-preview: >
  Have you ever wanted to calculate how many articles will be left in a certain
  category after search? In this blogpost, I will show you how to use elastic
  aggregations to achieve this.
tags:
  - Ruby on Rails development
---
Have you ever wanted to count how many articles will be left in a certain category after search? To give you an idea of what I mean, as an example let’s use the application that will be the outcome of this tutorial. Our database contains music albums which are categorized by the genre and subgenre.

After searching for, let’s say ‘Miles’ the album count in a category will change according to how many articles (albums in this case) meet the search requirement.

My solution utilizes Ruby on Rails elastic aggregations and Drapper. The best thing about it is that it doesn’t make additional requests to the database. Elastic makes the searching process much easier and faster. A solution on the basis of a database is much more time-consuming to develop and heavier on the server than mine.

The only downside I can think of is that you need to create an additional service.

### Steps

I'll skip steps taken to create the app and to add some layout. I'll use controller articles with action index for listing and search.

### Install prerequisites:

* elastic search or use docker image,
* add these gems to the Gemfile:
  * gem 'elasticsearch-model'
  * gem 'elasticsearch-rails'
  * gem 'draper'
* github: 'drapergem/draper'
* bundle install
* add elastic initializer to point elastic host


```ruby
 config = {
    host: 'http://elasticsearch:9200',
    transport_options: {
      request: { timeout: 5 }
    }
  }
  Elasticsearch::Model.client = Elasticsearch::Client.new(config)
```

### Create models:

```ruby
   rails g model category name:string
    rails g model author name:string
    rails g model article name:string author:references
    rails g model article_category article:references category:references
    rake db:migrate
    rails generate draper:install
```

### Create a decorator for the Category:

```ruby
rails generate decorator Category
```

Add `attr_accessor :article_count` to the decorator of the class.

### Create collection decorator

Add an `apply_counts` method  with a `buckets_counts` argument.

```ruby
   class CategoriesDecorator < Draper::CollectionDecorator
      def apply_counts(buckets_counts)
        each { |obj| obj.article_count = buckets_counts[obj.id] }
      end
    end
```

Later this will allow to set the `article_count` based on aggregations.

### Add module `Searchable` to `concerns`

```ruby
 module Searchable
      extend ActiveSupport::Concern

      included do
        include Elasticsearch::Model
        include Elasticsearch::Model::Callbacks

        def index_document
          __elasticsearch__.index_document
        end
      end

      module ClassMethods
        def recreate_index!
          __elasticsearch__.create_index! force: true
          __elasticsearch__.refresh_index!
        end
      end
    end
```

## The Article model

Include `Searchable`:

Add associations:

```ruby
has_many :article_categories
  has_many :categories, through: :article_categories
```

Delegate `author_name`:

```ruby
 delegate :name, to: :author, prefix: true
```

In the `models` folder create `Articles::Index` module to define the elastic index:

```ruby
module Articles
    module Index
    extend ActiveSupport::Concern
      included do
        index_name "article-#{Rails.env}"
        settings index: { number_of_shards: 1 } do
          mappings dynamic: 'false' do
            indexes :name, type: :text, analyzer: 'english'
            indexes :author_name, type: :text, analyzer: 'english'
            indexes :category_names, type: :text, analyzer: 'english'
            indexes :category_ids, type: :integer
          end
        end
      end
      def as_indexed_json(*)
        {
          name: name,
          author_name: author_name,
          category_names: category_names,
          category_ids: category_ids
        }
      end
      private
      def category_names
        categories.pluck(:name).compact.uniq
      end
      def category_ids
        categories.pluck(:id).compact.uniq
      end
    end
  end
```

`type: :text` is for thetext search.

`indexes :category_ids` and `type: :integer` will allow to aggregate the results by category.

Include the `Articles::Index` in Article model.

### Seed data

I've prepared the seed with some jazz albums with assigned jazz sub-genres.

```ruby
jazz = Category.create(name: 'jazz')
fusion = Category.create(name: 'jazz fusion')
bebop = Category.create(name: 'bebop')
cool = Category.create(name: 'cool jazz')

author = Author.create(name: 'Miles Davis')
['Bitches Brew', 'A Tribute to Jack Johnson', 'Miles In The Sky', 'Pangaea'].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: fusion, article: article)
end

['Kind of Blue', 'Sketches Of Spain', 'Birth of the Cool', 'Porgy And Bess'].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: cool, article: article)
  ArticleCategory.create(category: bebop, article: article)
end

author = Author.create(name: 'Sonny Rollins')
['Sonny Rollins With The Modern Jazz Quartet'].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: cool, article: article)
end

['Next Album', 'Easy Living', 'The Way I Feel ', "Don't Stop the Carnival"].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: fusion, article: article)
end

['Saxophone Colossus', 'Plus Three'].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: bebop, article: article)
end

author = Author.create(name: 'Chet Baker')
['Chet', 'My Funny Valentine'].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: cool, article: article)
end

author = Author.create(name: 'Paul Desmond')
['Feeling Blue', 'Bossa Antigua', "We're all together again"].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: cool, article: article)
end

author = Author.create(name: 'Dave Brubeck')
['Concord on a Summer Night', 'Time Further Out', "Time Out"].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: cool, article: article)
end

author = Author.create(name: 'The Mahavishnu Orchestra')
['Birds Of Fire', 'Between Nothingness & Eternity', 'The Inner Mounting Flame'].each do |title|
  article = Article.create(name: title, author: author )
  ArticleCategory.create(category: jazz, article: article)
  ArticleCategory.create(category: fusion, article: article)
end

Article.recreate_index!
Article.import
```

The last two lines in the seed create the index in elastic, so:

```ruby
rake db:seed
```

Now we can take care of searching and aggregates.

### Oh look! We're halfway through the post! Here's a picture of a cute kitten:

![cate](/_assets/images/kitten.jpg)

Add a simple class for the search form:

```ruby
class SearchForm
  include ActiveModel::Model

  attr_reader :search_text

  def initialize(search_text)
    @search_text = search_text
  end
end
```

Add search query object:

```ruby
class SearchQuery
  def initialize(search_form)
    @search_form = search_form
  end

  def call
    Article.search(search_text).records.to_a
  end

  private

  attr_reader :search_form

  delegate :search_text, to: :search_form
end
```

Search with elastic could be as simple as `Article.search(search_text).records.to_a` but we can ask elastic to count something for us in one go.

To do this we will need a little bit more complex query which we'll prepare using elastic DSL and put as an argument to the search method.

### All methods beneath are private.

Search definition object will do almost the same thing as the search above.

```ruby
def query
      {
        size: 100,
        from: 0,
        query: simple_query
      }
    end

    def match_all
      { match_all: {} }
    end

    def simple_query
      return match_all if search_text.blank?
      {
        query_string: {
          query: add_wildcards(search_text)
        }
      }
    end

    def add_wildcards(text)
      text.split(' ').map { |el| "*#{el}*" }.join(' ')
    end
```

Attributes `:size`, `:from` are for paging, default elastic page size is 10.

How to add aggregations? Using elastic DSL allows us to define aggs criteria:

```ruby
     def aggs_categories
        {
          by_categories:{
            terms:{
              field: :category_ids
            }
          }
        }
      end
```

and add them to search definition object:

```ruby
     def query
        {
          size: 100,
          from: 0,
          query: simple_query,
          aggs: aggs_categories
        }
      end
```

Result of our query object at the end should look like a.e.

```ruby
{
    :size => 100,
    :from => 0,
    :query => {
      :query_string => {
        :query => "*miles*"
        }
      },
    :aggs => {
      :by_categories => {
        :terms=> { :field =>: category_ids }
      }
    }
  }
```

When we assign a search object to a search variable as `search = Article.search(query)` then we check `search.response` on search object which should look like this:

```ruby
    {
        "took"=>62,
        "timed_out"=>false,
        "_shards"=>{"total"=>1, "successful"=>1, "skipped"=>0, "failed"=>0},
        "hits"=> {
          "total"=> 8,
          "max_score" => 1.0,
          "hits" => [
            {"_index"=>"article-development", "_type"=>"article", "_id"=>"1", "_score"=>1.0, "_source"=>{"name"=>"Bitches Brew", "author_name"=>"Miles Davis", "category_names"=>["jazz", "jazz fusion"], "category_ids"=>[1, 2]}},
            {"_index"=>"article-development", "_type"=>"article", "_id"=>"2", "_score"=>1.0, "_source"=>{"name"=>"A Tribute to Jack Johnson", "author_name"=>"Miles Davis", "category_names"=>["jazz", "jazz fusion"], "category_ids"=>[1, 2]}},
            {"_index"=>"article-development", "_type"=>"article", "_id"=>"3", "_score"=>1.0, "_source"=>{"name"=>"Miles In The Sky", "author_name"=>"Miles Davis", "category_names"=>["jazz", "jazz fusion"], "category_ids"=>[1, 2]}},
            {"_index"=>"article-development", "_type"=>"article", "_id"=>"4", "_score"=>1.0, "_source"=>{"name"=>"Pangaea", "author_name"=>"Miles Davis", "category_names"=>["jazz", "jazz fusion"], "category_ids"=>[1, 2]}},
            {"_index"=>"article-development", "_type"=>"article", "_id"=>"5", "_score"=>1.0, "_source"=>{"name"=>"Kind of Blue", "author_name"=>"Miles Davis", "category_names"=>["jazz", "bebop", "cool jazz"], "category_ids"=>[1, 3, 4]}},
            {"_index"=>"article-development", "_type"=>"article", "_id"=>"6", "_score"=>1.0, "_source"=>{"name"=>"Sketches Of Spain", "author_name"=>"Miles Davis", "category_names"=>["jazz", "bebop", "cool jazz"], "category_ids"=>[1, 3, 4]}},
            {"_index"=>"article-development", "_type"=>"article", "_id"=>"7", "_score"=>1.0, "_source"=>{"name"=>"Birth of the Cool", "author_name"=>"Miles Davis", "category_names"=>["jazz", "bebop", "cool jazz"], "category_ids"=>[1, 3, 4]}},
            {"_index"=>"article-development", "_type"=>"article", "_id"=>"8", "_score"=>1.0, "_source"=>{"name"=>"Porgy And Bess", "author_name"=>"Miles Davis", "category_names"=>["jazz", "bebop", "cool jazz"], "category_ids"=>[1, 3, 4]}}
          ]
        },
        "aggregations" => {
          "by_categories" => {
            "doc_count_error_upper_bound"=>0,
            "sum_other_doc_count"=>0,
            "buckets"=>[
              {"key"=>1, "doc_count"=>8},
              {"key"=>2, "doc_count"=>4},
              {"key"=>3, "doc_count"=>4},
              {"key"=>4, "doc_count"=>4}
            ]
          }
        }
      }
```

In `aggregations` => `by_categories` we can find `buckets` and that's what we're interested in! Key `buckets` contain counts for `category_ids`.

Extract them:

```ruby
 def buckets_categories_counts
    @categories_counts ||= search.response
       .deep_symbolize_keys[:aggregations][:by_categories][:buckets]
       .map{ |bucket| OpenStruct.new(bucket) }
  end
```

map `categories_ids`:

```ruby
 def buckets_categories_ids
    buckets_categories_counts.map(&:key)
  end
```

prepare the bucket hash:

```ruby
 def buckets_hash
    buckets_categories_counts.each_with_object({}) do |bucket, obj|
      obj[bucket.key]= bucket.doc_count
    end
  end
```

Find categories, decorate the collection and apply counts:

```ruby
 def categories
    ::CategoriesDecorator.decorate(
      Category.where(id: buckets_categories_ids)
    ).apply_counts(buckets_hash)
  end
```

Update public method call:

```ruby
    def call
       OpenStruct.new(
         categories: categories,
         articles: search.records.order('articles.name asc').includes(:author).to_a
       )
     end
```

We will return object with categories and articles.

### Last step is to add some logic to `ArticlesController`

```ruby
  class ArticlesController < ApplicationController
     def index
       @search_form = SearchForm.new(search_text)
       result = SearchQuery.new(@search_form).call
       @articles = result.articles
       @categories = result.categories
     end

     private

     def search_text
       params.dig(:search_form, :search_text)
     end
   end
```

### Working app

That's all, you can check working example downloading repo:

* clone or [download](https://github.com/Naturaily/elastic-aggs){:rel=nofollow} repo,
* install docker if needed,
* run.


```ruby
  docker-compose build
  docker-compose run web bundle install
  docker-compose run web rake db:create db:migrate db:seed
```
