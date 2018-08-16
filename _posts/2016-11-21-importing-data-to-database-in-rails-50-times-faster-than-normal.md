---
title: Importing data to database in Rails 50 times faster than normal
description: >-
  Have you noticed how time-consuming is saving records to Ruby on Rails
  database using ActiveRecord? With this tutorial, you can do it much faster!
slug: ruby-on-rails-fast-data-import
date: '2016-11-21 10:38:01 +0000'
category: Ruby on Rails development
author: Mikołaj Grygiel
avatar: /assets/images/claus.jpg
image: /assets/images/speed_up.jpg
text-preview: >-
  Have you ever needed to save lots of records with unique attribute to database
  using ActiveRecord? Have you noticed how time consuming such task is? I would
  like to show you how to do it quickly.
tags:
  - Ruby on Rails development
---



Have you ever needed to save lots of records with unique attribute to database using ActiveRecord? Have you noticed how time consuming such task is? I would like to show you how to do it quickly.

I've prepared simple users table with columns: ```first_name```, ```last_name```, uid. The ```uid``` value needs to be unique.

```ruby
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.integer :uid
    end
    add_index :users, [:uid], unique: true
  end
end
```

In ```User``` model I added just one validation:

```ruby
class User < ActiveRecord::Base
  validates :uid, uniqueness: true
end
```

I will test importing data from the CSV file. I’ve prepared the file with 100,000 records. There are 10,000 records from the file in database already, just to make things more realistic. A small preview of the data:

```plaintext
...
Nicholas,Bates,252
Leona,Ryan,253
Mark,Bass,254
Eliza,Keller,255
Scott,Lloyd,256
Rosalie,McCormick,257
Derrick,Armstrong,258
Gilbert,Green,259
Olivia,Daniels,260
Ella,Newton,261
Devin,Vaughn,262
Cody,Newton,263
...
```

For measuring purposes I will use standard Ruby module called [Benchmark](http://ruby-doc.org/stdlib-2.3.1/libdoc/benchmark/rdoc/Benchmark.html). I will measure only time of saving records to database, without processing CSV file. Each method will be wrapped in benchmark service:

```ruby
require 'csv'

class SaveMethodBenchmark < BaseService
  CSV_FILE = "#{Rails.root}/tmp/users.csv".freeze


  def call
    # load users data
    users = CSV.read(CSV_FILE)


    # clear database and save 10% of users
    PrepareDatabase.call(users)


    # measure time of records saving
    puts Benchmark.measure { User.save_method(users) }
  end
end
```

<div class="warning-block">

  <h2>WARNING!</h2>


  <p>In my examples I only want to measure time of saving data into database. I don’t want to show how to import data from CSV file to database. I use CSV files as a simple source of data for my examples.</p>

  <p><strong>Be careful, load all data from csv file at once by <code>CSV.read(CSV_FILE)</code> method can be dangerous, your server would run out of memory if the file is too big. You should load data in small chunks.</strong></p>

</div>

## 1. The basic method

  In basic method I use pure ```ActiveRecord```. I load all the data from the file, convert it to array of hashes:

  ```ruby
  [
    { first_name: Lida, last_name: Atkins, uid: 1 },
    { first_name: Jorge, last_name: Carson, uid: 2 },
    ...
  ]
  ```

  ...and pass the array to ```User.create``` method.

  ```ruby
  class User < ActiveRecord::Base
    class << self
      def basic_method(users)
        create users
      end
    end
  end
  ```

   For this method I received the following result:

  ```bash
  basic_method  210,824696s real time
  ```

  ```210,82s``` - Is it a lot or not? It’s more than 3 minutes. Can we do it faster? Let's look closely at how this method works. For each record we get following queries:

  ```bash
    (0.2ms)  BEGIN
  User Exists (3.6ms)  SELECT  1 AS one FROM "users" WHERE "users"."uid" = 1 LIMIT 1
  SQL (7.7ms)  INSERT INTO "users" ("first_name", "last_name", "uid") VALUES ($1, $2, $3) RETURNING "id"  [["first_name", "Lida"], ["last_name", "Atkins"], ["uid", 1]]
     (6.4ms)  COMMIT
  ```

  The SQL code above exposes 3 main disadvantages of the basic method:

  1. We create separate SQL transaction for each record - ```BEGIN … COMMIT``` block. It means that Rails needs to connect to database for each record, so we end up with 100,000 connections.
  2. We want to check if each user has unique uuid, so we execute ```SELECT``` query for each record, it gives us 100,000 queries.
  3. If the uuid of user is unique we saves the record into database with next query ```INSERT INTO```, there are next 100,000 queries.

  100,000 SQL transactions and 200,000 SQL queries - this certainly affects the importing time of our data.

## 2. The basic method wrapped in one transaction

  First we will try to decrease number of transactions. We will wrap all of our queries in one transaction.

  ```ruby
  def basic_method_with_transaction(users)
    transaction do
      create users
    end
  end
  ```

  Now we have ```148,876s```. It’s about 1 min faster than our first attempt. A small step forward...

  ```
  basic_method_with_transaction  148,876361s real time
  ```

  Now we can see that we still have a lot of queries but we do not commit the transaction after each record:

  ```
    (0.3ms)  BEGIN
  User Exists (0.4ms)  SELECT  1 AS one FROM "users" WHERE "users"."uid" = 1 LIMIT 1
  SQL (6.9ms)  INSERT INTO "users" ("first_name", "last_name", "uid") VALUES ($1, $2, $3) RETURNING "id"  [["first_name", "Lida"], ["last_name", "Atkins"], ["uid", 1]]

  User Exists (0.5ms)  SELECT  1 AS one FROM "users" WHERE "users"."uid" = 2 LIMIT 1
  SQL (0.3ms)  INSERT INTO "users" ("first_name", "last_name", "uid") VALUES ($1, $2, $3) RETURNING "id"  [["first_name", "Jorge"], ["last_name", "Carson"], ["uid", 2]]


  ...
  ```




## 3. Bulk insert

  Let’s decrease the number of SQL queries. In SQL we can pass multiple values to ```INSERT INTO``` query, why then ActiveRecord (in our example) creates a new query for each value? Unfortunately I don’t know why, but if we want to save all of our data in one query we need to use extra gem [activerecord-import](https://github.com/zdennis/activerecord-import). It adds import method to our models which can take an array of column names and an array of arrays (array with our data).

  ```
  def import_users(users)
    transaction do
      import([:first_name, :last_name, :uid], users)
    end
  end
  ```

  This method was performed by ```80,004s```. It’s two times faster than previous attempt. It looks impressive, it seems that the number of queries is the primary cause of a long runtime of previous methods.

  ```
  import_users  80,004497s real time
  ```

  Below you can see an example of SQL code for two records generated by our method. We can see that all queries are wrapped by one transaction, for each record we have ```SELECT``` query which checks if ```uid``` is unique and we have one ```INSERT INTO``` query with all records at the end.

  ```
    (0.1ms)  BEGIN
  User Exists (11.7ms)  SELECT  1 AS one FROM "users" WHERE "users"."uid" = 1 LIMIT 1
  User Exists (0.3ms)  SELECT  1 AS one FROM "users" WHERE "users"."uid" = 2 LIMIT 1
  Class Create Many Without Validations Or Callbacks (5.8ms)  INSERT INTO "users" ("first_name","last_name","uid") VALUES ('Lida','Atkins',1),('Jorge','Carson',2)RETURNING id
     (5.1ms)  COMMIT
  ```

## 4. Bulk insert with validation on database side

  There is one more thing which we can change - decrease the number of ```SELECT``` queries. They check if users’ uuids are unique. I have one idea how we can do away with tons of ```SELECT``` queries. We can omit rails validations which generate those queries and can use SQL unique index instead. Remember the ```CreateUsers``` migration? Particularly the following line:

  ```
  add_index :users, [:uid], unique: true
  ```

  This method is based on this line. Recently [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html#SQL-ON-CONFLICT) provided ```INSERT ... ON CONFLICT``` functionality (only available in 9.5 and higher). It allows us to define what should be done when the record is not unique. With activerecord-import we will [ignore duplicated keys](https://github.com/zdennis/activerecord-import/wiki/On-Duplicate-Key-Ignore).

  ```
  def import_users_without_validations(users)
    transaction do
      import(COLUMNS, users, validate: false, on_duplicate_key_ignore: true)
    end
  end
  ```

  Yes, we got it! We've saved all records during the ```4.213s```. It’s twenty times faster than the previous method, it’s fifty times faster than the first method. I’m proud of it.

  ```
  import_users_with_sql_validation  4.212681s real time
  ```

  In the simplest case when we have two users to save and one of them doesn’t have unique uuid, generated SQL code would look like below. We have only one ```INSERT INTO``` query, that’s all. It’s amazing that in all cases there would be 1 SQL query and 1 transactions, no matter how many records we would save, in first method there was 200,000 queries and 100,000 transactions.

  ```
    (0.7ms)  BEGIN
  Class Create Many Without Validations Or Callbacks (0.7ms)  INSERT INTO "users" ("first_name","last_name","uid") VALUES ('Lida','Atkins',1),('Jorge','Carson',2) ON CONFLICT DO NOTHING RETURNING id
     (2.0ms)  COMMIT

  ```

## CONCLUSION

I know Ruby on Rails is a high level web framework and I love Rails for that. But it’s important to know how things work at deep level. When we learn how Rails and ActiveRecord magic works we can speed up the import of records to database a lot.

Ok, but my engineerial soul has one more question: Will the last method always be the best choice? What if we have less than 100,000 records? I checked it:


|                                   | 10       | 100      | 1000     | 10000    | 100000   |
| --------------------------------- |:---------|:---------|:---------|:---------|:---------|
| basic method                      | 0,099s   | 0,277s   | 2,614s   | 23,608s  | 210,825s |
| basic method with transaction     | 0,022s   | 0,207s   | 1,907s   | 14,326s  | 148,876s |
| import users                      | 0,073s   | 0,160s   | 1,200s   | 7,443s   | 80,004s  |
| import users with sql validations | 0,002s   | 0,005s   | 0,0480s  | 0,376s   | 4,213s   |

![timesaved](/assets/images/time-saving-stats.png "Time saved")


Table and chart show that the best way is using ```ActiveRecord::Import``` with validations on database side.


I know it’s a really simple case, without any other validations, but you can treat it as a hint how to use SQL validations to speed up saving data to database.
