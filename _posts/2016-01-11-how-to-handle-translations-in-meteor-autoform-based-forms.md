---
title: How to handle translations in Meteor AutoForm-based forms
description: >-
  We have been working on a project that required i18n support for forms
  generated with AutoForm. In this Meteor.js tutorial you'll learn how to handle
  translations.
slug: meteor-autoform-translations
date: '2016-01-11 10:38:01 +0000'
category: JavaScript development
authors:
  label: Jan Wieczorkowski
  value: author-8
  avatar: /assets/images/janpol.png

image: /assets/images/meteor3.png
text-preview: >-
  In one of the projects I've been recently working on I needed i18n support for
  forms generated with AutoForm. For those who don’t know: Autoform is
  [schema-based](https://github.com/aldeed/meteor-simple-schema) form generator.
tags:
  - Meteor js development
  - JavaScript development
---



In one of the projects I've been recently working on I needed i18n support for forms generated with AutoForm. For those who don’t know: Autoform is [schema-based](https://github.com/aldeed/meteor-simple-schema) form generator.
​
Since Meteor ecosystem ain’t mature yet, this turned out to be an interesting task which ended up with creating a new package that we’ve published for the benefit of the Meteor community.
​
To give you more detailed information on post contents:
* You’ll start with creating a simple Meteor application and adding translations ([tap:i18n package](https://atmospherejs.com/tap/i18n)).
* Next you’ll take care of labels and error messages translations.  There are two ways here:
  * First which utilizes [tap:i18n](https://atmospherejs.com/tap/i18n) and [naturaily:simple-schema-translations](https://atmospherejs.com/naturaily/simple-schema-translations) packages. You'll find detailed instructions in Readme file in Naturaily's package.
  * Second which utilizes tap:i18n and some additional coding
* Finally you’ll take care of displaying server-side error messages.

What you will need to install:
* [Meteor](https://www.meteor.com/) - JavaScript platform for building web and mobile apps. You probably have it on your machine.
* [AutoForm](https://github.com/aldeed/meteor-autoform) - Meteor package for [schema-based](https://github.com/aldeed/meteor-simple-schema) form generation.

OK, let’s start.

## Sample application without translations
Create a simple application that utilizes AutoForm for custom login and signup forms. Follow the steps below or just copy the code from [repo](https://github.com/Naturaily/meteor-autoform-tutorial).
​
  * Get Meteor
  * Create a new application
    `meteor create myAwesomeApp`
  * Install AutoForm
    `meteor add aldeed:autoform`
  * Add a user account system with password support
    `meteor add accounts-password`
  * Add bootstrap (app will look a bit better)
    `meteor add twbs:bootstrap`
  * Create LoginSchema and RegistrationSchema.
    Firstly, clear *.js file. Next, add the code below:

    ```javascript
      LoginSchema = new SimpleSchema({
        login: {
          type: String
        },
        password: {
          type: String,
          autoform: {
            afFieldInput: {
              type: 'password'
            }
          }
        }
      });
    ```

    ```javascript
      RegistrationSchema = new SimpleSchema({
        username: {
          type: String
        },
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email
        },
        password: {
          type: String,
          autoform: {
            afFieldInput: {
              type: 'password'
            }
          }
        },
        passwordConfirmation: {
          type: String,
          autoform: {
            afFieldInput: {
              type: 'password'
            }
          },
          custom: function() {
            if (this.isSet && this.value !== this.field('password').value) {
              return 'invalidPasswordConfirmation';
            }
          }
        }
      });
    ```

  * Change default templates.
    Your *.html file should look like this one:

    ```hbs

      <head>
        <title>meteortranslations</title>
      </head>

      <body>
        <div class="container">
          <h1>Welcome to Meteor!</h1>
          {% raw %}
          {{#if currentUser}}
            {{> forLoggedIn}}
          {{else}}
            {{> forLoggedOut}}
          {{/if}}
          {% endraw %}
        </div>
      </body>
  ​
      <template name="forLoggedIn">
        <a id="logout" href="#" class="btn btn-default">
          logout
        </a>
      </template>

      <template name="forLoggedOut">
        <h2>Sign in</h2>
        {% raw %}
          {{> quickForm id="signInForm" schema="LoginSchema"}}
        {% endraw %}

        <h2>Sign up</h2>
        {% raw %}
        {{> quickForm id="signUpForm" schema="RegistrationSchema"}}
        {% endraw %}
      </template>

    ```

  * Events handlers.
    Also we need to handle forms and logout button events.
    So add the code below to your *.js file:

    ```javascript
      if (Meteor.isClient) {
        AutoForm.hooks({
          signUpForm: {
            onSubmit: function(data) {
              this.event.preventDefault();
              Accounts.createUser(data, this.done);
            }
          },
          signInForm: {
            onSubmit: function(data) {
              this.event.preventDefault();
              Meteor.loginWithPassword(data.login, data.password, this.done);
            }
          }
        });
  ​
        Template.forLoggedIn.events({
          'click #logout': function (e) {
            e.preventDefault();
            Meteor.logout();
          }
        });
      }
    ```

  * Remove *.css file. We don't need this right now.
  Aaand done! We have a sample app :)

## Add translations
From a few i18n packages available I chose tap:i18n. It’s not a requirement, but if you’ll choose a different package you won’t be able to use [naturaily:simple-schema-translations](https://atmospherejs.com/naturaily/simple-schema-translations).

* Add tap:i18n
  `meteor add tap:i18n`
* Add tap:i18n-ui
  `meteor add tap:i18n-ui`
* Create `i18n` directory
  `mkdir i18n`
* Create files with translations (english and polish in my case)
​
  ```json-doc
    // i18n/en.i18n.json
    {
      "title" : "Welcome to Meteor!",
      "signUp" : "Sign up",
      "signIn" : "Sign in",
      "logout" : "logout"
    }
  ```

  ```json-doc
    // i18n/pl.i18n.json
    {
      "title" : "Witaj!",
      "signUp" : "Zarejestruj się",
      "signIn" : "Zaloguj się",
      "logout" : "Wyloguj się"
    }
  ```

* Use translations in your HTML file.
  Replace

  ```html
    <h1>Welcome to Meteor!</h1>
​
    <a id="logout" href="#">
      logout
    </a>
​
    <h2>Sign in</h2>
​
    <h2>Sign up</h2>
  ```

  with

  ```hbs
    <h1>{% raw %}{{_ 'title'}}{% endraw %}</h1>
​
    <a id="logout" href="#">
    {% raw %}{{_ 'logout'}}{% endraw %}
    </a>
​
    <h2>{% raw %}{{_ 'signIn'}}{% endraw %}</h2>
​
    <h2>{% raw %}{{_ 'signUp'}}{% endraw %}</h2>
  ```

* Add a dropdown `<select>` list of available languages.
  Paste the code below after `h1` tag:

  `{% raw %}{{> i18n_dropdown}}{% endraw %}`

And now you can change language on your site. Check it out!

## Translate labels and error messages

OK, all happy now? Not really… There are still English labels and error messages that we need to handle somehow. We have two options here, as mentioned before:
* use naturaily:simple-schema-translations if you decided to utlizie tap:i18n earlier,
* handle translations on your own, with two options for labels and one for error messages. This will work with tap:i18n or any other reactive translations library.

### Translate labels

#### First approach - simple, universal, with code repeats
Just use `label` option in your schema and use your translation library:

  ```javascript
    LoginSchema = new SimpleSchema({
      login: {
        type: String,
        label: function() {
          YourLibrary.translate('key');
        }
      },
    //...
    })
  ```

Some libraries need to receive language key on the server:

  ```javascript
    label: function () {
      if (Meteor.isClient) {
        YourLibrary.translate('key');
      } else if (Meteor.isServer) {
        YourLibrary.translate('key', 'en');
      }
    }
  ```

#### Second approach - fancy, DRY, all schemas in one namespace
We want to use function `labels` from `aldeed:simple-schema`. In this example I
will use `tap:i18n` but you can use any reactive translation library.
Firstly, we will need a namespace for all our schemas.

  ```javascript
    Schemas = {
      LoginSchema: new SimpleSchema({
        //...
      }),
      RegistrationSchema: new SimpleSchema({
        //...
      })
    };
  ```

Next, we have to add some translations:

  ```json-doc
    {
      //...
      "labels" : {
        //...
        "login" : "Nazwa użytkownika lub email",
        "password" : "Hasło",
        "passwordConfirmation" : "Powtórz hasło"
      }
    }
  ```
Next, we need something like this:

  ```javascript
    if (Meteor.isClient) {
      Meteor.startup(function () {
        // TAPi18n.__ returns key instead of object by default
        TAPi18next.init({
          objectTreeKeyHandler: function (key, value) {
            return value;
          }
        });
    ​
        Tracker.autorun(function () {
          translateLabels(TAPi18n.__("labels"));
        });
      });
    }
  ```

As you can see `translateLabels` function will be invoked each time when language
will be changed. And now we have to implement this function :) We need to remember
that SimpleSchema needs empty string to set default label.

  ```javascript
    function translateLabels(labels) {
      Schemas.forEach(function (schema) {
        var labelsWithDefaults = _.tap({}, function(object) {
          schema._schemaKeys.forEach(function(key) {
            object[key] = labels[key] || '';
          });
        });
        schema.labels(labelsWithDefaults);
      });
    }
  ```

And that's it!

### Translate error messages

This one’s pretty easy. Just cache default messages and change global messages every time language is changed.

  ```javascript
    if (Meteor.isClient) {
      Meteor.startup(function () {
        var defaultMessages = _.clone(SimpleSchema._globalMessages);
    ​
        Tracker.autorun(function () {
          function translateErrorMessages(translations) {
            var messages = _.extend({}, defaultMessages, translations);
            SimpleSchema.messages(messages);
          }(TAPi18n.__("errors"));
        })
      })
    }
  ```

## Translate and display server-side error messages
Server-side error messages are handled separately thanks to hooks provided by AutoForm. You can use onError hook to catch server error and add it to the form.

  ```javascript
    if (Meteor.isClient) {
      // I think that this function explains itself :)
      function parseError(error) {
        var errors = {
          'User not found': [
            {
              name: 'login',
              type: 'incorrect'
            }
          ],
          'Incorrect password': [
            {
              name: 'password',
              type: 'incorrect'
            }
          ],
          'Username already exists.': [
            {
              name: 'username',
              type: 'taken'
            }
          ],
          'Email already exists.': [
            {
              name: 'email',
              type: 'taken'
            }
          ]
        };
    ​
        return errors[error.reason];
      }
      // add hooks to every form generated by AutoForm
      AutoForm.addHooks(null, {
        onError: function (e, error) {
          var errors = parseError(error);

          if (errors) {
            var names = _.map(errors, function(error) {
              return error.name;
            });
    ​
            errors.forEach(function(error) {
              this.addStickyValidationError(error.name, error.type);
            }.bind(this));

            this.template.$('form').on('input', 'input', function(event) {
              var name = event.target.name;
    ​
              if (_.contains(names, name)) {
                this.removeStickyValidationError(name);
              }
            }.bind(this));
          }
        }
      });
    }
  ```

As you can see I use `addStickyValidationError` instead of non-sticky errors.
Why? Because form is often revalidated and then custom errors will disappear.
It's annoying. Really.

## Resources

* [complete code in the repository on GitHub](https://github.com/Naturaily/meteor-autoform-translations-tutorial)
* [live application demo](https://naturaily.meteor.com)
* [naturaily:simple-schema-translations package](https://atmospherejs.com/naturaily/simple-schema-translations)
* [tap:i18n package](https://atmospherejs.com/tap/i18n)
* [AutoForm](https://atmospherejs.com/aldeed/autoform)
* [SimpleSchema](https://atmospherejs.com/aldeed/simple-schema)


## Conclusion
I hope this was helpful. Please feel free to comment. Until next time!
