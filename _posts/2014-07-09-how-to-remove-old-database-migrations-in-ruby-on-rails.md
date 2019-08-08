---
title: How to remove old database migrations in Ruby on Rails
description: >-
  In this step-by-step tutorial, we've explained how to remove old database
  migrations in Ruby on Rails. With our guide, it's easier than you think!
slug: remove-old-migrations-ruby-on-rails
twitter-card: summary_large_image
date: '2019-01-11 10:38:01 +0200'
category: Ruby on Rails development
author: Jacek Hiszpański
avatar: jacek.png
image: migrations.jpg
text-preview: >-
  Recently we’ve overtaken a big project for maintenance and further
  development. It’s a Rails application with many models, controllers and of
  course lots of database migrations.
tags:
  - Ruby on Rails development
---

Recently we’ve overtaken a big project for maintenance and further development. It’s a Rails application with many models, controllers and of course lots of database migrations. There were about one hundred files in db/migrate directory. The question is: how can we setup development environment with current database structure? Running `rake db:migrate` would just be a suicide. It won’t simply work, because these migrations were written long time ago and the current code and models implementation don’t fit them. Instead let’s load `schema.rb` file using this command:
```console
rake db:schema:load
```
It will create all needed tables for models and also a special table `schema_migrations` to track migrations. Selecting all rows you will see something like this:
```ruby
select * from schema_migrations order by version;
    version
----------------
 20120327182713
 20120415183320
 20130815194056
 ...
 20140418200422
 20140427072247
 20140427083434
(94 rows)
```
So, how can we use this special table to get rid of smelly migration files?

The solution
------------

We can just create new migration and copy all add/create statements from `schema.rb`

```console
rails g migration CreateStructure
```

The migration can look like this:
```ruby
class CreateStructure < ActiveRecord::Migration
  def change
    create_table "users", force: true do |t|
      t.string   "name"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.text     "track_ids"
      t.integer  "team_id"
    end

    ...

    create_table "teams", force: true do |t|
      t.string   "name"
      t.string   "slug"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
  end
end
```
Then we need to change it a little bit, because we don’t won’t to lose any data while deploying new migration to staging or/and production environment. Just remove `force: true` option to make sure we will never lose any data by recreating tables. So let’s try to run this new migration:

```console
rake db:migrate

== 20140705105820 CreateStructure: migrating ==================================
-- create_table("users")

rake aborted!

StandardError: An error has occurred, this and all later migrations canceled:

PG::DuplicateTable: ERROR:  relation "users" already exists
```

Yes, well, it didn’t work, because we’ve already loaded `schema.rb` and all our tables are already there. So what can we do? We can use the latest version of migration from our `schema_migrations` and rename the new one:

```console
mv db/migrate/20140705105820_create_structure.rb db/migrate/20140427083434_create_structure.rb
```
Finally, we can remove all migrations excluding the current one:

```console
cd db/migrate/ && ls | grep -v '20140427083434_create_structure' | xargs rm
```

Now, if we run `db:migrate` we won’t see any results or errors because we’ve have already migrated the database. However, if we have to setup a new environment we can run all (one) our migrations without any problems.

What’s left?
------------

There is a small problem with this solution. If you have migrations which are modifying data like adding admin account or so, you need to find them manually and copy the code to our structure migration or add a new migration. The data is not included in `schema.rb`

Ending…
-------

We just removed all migrations by adding new one with the whole structure. We can now continue hacking and adding new migrations in normal way. Above steps can be repeated any time we want. So, you can keep small number of migrations. Just be careful when you have new migrations on your local branch, but they are not deployed to staging or production yet. It won’t work. You need too rollback your local migrations until it matches staging/production and then copy `schema.rb`

Thanks all for now. Thank you and bye :)
