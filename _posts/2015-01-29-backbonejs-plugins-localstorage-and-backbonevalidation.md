---
title: 'Backbone.js plugins: Local.Storage and Backbone.validation'
description: >-
  See what Backbone Local Storage and Backbone Validation is, how to implement
  them and what are the common validation errors while using Backbone.js
  plugins.
slug: backbone-plugins-local-storage-backbone-validation
date: '2015-01-29 10:38:01 +0000'
category: JavaScript development
author: Agnieszka Bugajska
avatar: /assets/images/aga.png
image: /assets/images/backbone_lol.png
text-preview: >-
  What is Backbone Local.Storage? Backbone Local.Storage is a method which helps
  frontend developers to store the data locally. When someone starts making a
  new application and they need to save some data that they added in their
  project, and still, they do not have any information downloaded from the
  backend, they can use Local.Storage.
tags:
  - JavaScript development
  - Backbone js development
---





What is Backbone Local.Storage? Backbone Local.Storage is a method which helps frontend developers to store the data locally. When someone starts making a new application and they need to save some data that they added in their project, and still, they do not have any information downloaded from the backend, they can use Local.Storage.
Storing data in Local.Storage may be more secure than storing it in cookies. Furthermore, Local.Storage never transfers data to the server and it has more space (at least 5mb) where we can save our database. Developers can choose if they are willing to store database with it's expiration date (Session Storage - whole database will disappear after closing/refreshing a page) or without, where page can persist it’s refreshing(Local.Storage).

How to implement Backbone Local.Storage?
----------------------------------------

To implement the plugin to our application we just need to download it and add the code below:

```javascript
    var exampleStorage = new Backbone.LocalStorage("ourCollectionName");
```

where our Backbone Collection now looks like this:


```javascript
    var ourCollectionName = Backbone.Collection.extend({
        localStorage: exampleStorage
    });
```

What functions can we use in Backbone Local.Storage?
----------------------------------------------------

Local.Storage gives us an opportunity to:

set ("setItem" function, which stores data),
get ("getItem" function, which retrieves data from the server)
delete items ("removeItem" function, which removes item from the database).


If we want to delete all the data from the server we just need to use clear() function. Local Storage uses "key" values which are stored as strings:

```javascript
    localStorage.getItem("key_word");
    localStorage.setItem("key_word");
    localStorage.removeItem("key_word");
```

Local.Storage can be used per one domain. All the pages from the same domain, can access the same database. Also, it is possible to work with Local.Storage without internet connection. Local.Storage allows the fastest access to database and it reduces a number of requests from the server to minimum.

Backbone.Validation
-------------------

Backbone.Validation is another Backbone.js plugin. It can validate models in your code. Of course, it is also possible to set validation without the plugin, but it will take unnecessarily too much time and too many implemented "if" statements, when Backbone.Validation simplifies our work.

How to implement Backbone.Validation?
-------------------------------------

Before we implement Backbone.Validation in our app, we need to attach Backbone.js. Afterwards, we are ready to add our plugin. First of all, we need to add this line of code:

```javascript
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
```

to extend our model with Backbone.Validation plugin. Secondly, in our Backbone.Model we should listed all the attributes we want to validate. All attributes are saved as an object and it should look like this:

```javascript
    var nameModel = Backbone.Model.extend({
        validation: {
            name: {
                required: true
            },
            address.zip: {
                length: 4
            },
            age: {
                range: [1, 80]
            },
            email: {
                pattern: "email"
            },
            difficulty: {
                oneOf: ["easy", "normal", "hard"]
            }
        }
    });
```

Every attribute owes its properties which have to be fulfilled when we add information to our inputs. In the first attribute, "name" , we’ve put requirement value which is set to true. It says that this field cannot be left empty. We can add this value to every attribute we use in our validation. In the second attribute we assigned "length" value which is set to 4. It suggests that the zip code should contain only 4 numbers. "Range" value, in the age attribute, informs us that we can set our age from 1 to 80, but this field is not required. Pattern("email") value underlines that in the email form input we should use only an email form, which will be recognised. In the last example which is difficult, "oneOf" value confines us to only three possibilities which are allowed (["easy", "normal", "hard"]). We cannot use any other answer because submission will not be accepted. There are many more available values which can be set to validate elements in the input forms (check https://github.com/thedersen/backbone.validation).

Validation errors
-----------------
To display validation errors, for example, we can implement [bootstrap](http://getbootstrap.com/) classes which will style our inputs {https://gist.github.com/driehle/2909552}. It is possible to specify an error message by adding an array of validators like in the example below:

```javascript
    modelName = Backbone.Model.extend({
        validation: {
            age:  [{
                required: true,
                msg: "enter Your age",
                oneOf: [18, 100]
            },{
                msg: "Age is invalid"
            }]
        }
    });
```

The msg (message) value can also be a function which returns a string.
Validation Binding
------------------
Backbone.Validation does not implement any automatic/two-way binding between a model and a view. This is up to you to include it. We can bind view with a model or view with a collection. The first option, binding view with a model, allows us to override Backbone "validate" and "isValid" methods where we can provide some extra features. The view must contain an instance of a model.
In the second option, we need a new instance of a collection. Models from our collection can be bound or unbound properly.

Custom validation
-----------------
If we do not prefer default settings of Backbone.Validation, we can customize it’s logic. Like it is done in the example:

```javascript
    _.extend(Backbone.Validation.validators, {
        myValidator: function(value, attr, customValue, model) {
            if(value !== customValue){
                return 'error';
            }
        },
    });
```

```javascript
    var Model = Backbone.Model.extend({
        validation: {
            age: {
                myValidator: 1
            }
        }
    });
```

 where "myValidator" is a custom modification. When we set a valid value, we receive nothing, but when the value is invalid it should present an error information. Default error messages or patterns (e.g. email pattern) can also be customised.

Conclusion
----------

I highly recommend both of the plugins. Why do I use them? Because they shorten developer’s work and they are very easy and useful. We can work without backend, so we can create our own database.
