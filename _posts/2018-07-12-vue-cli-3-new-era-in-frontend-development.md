---
title: 'Vue CLI 3: New Era in Frontend Development'
description: >-
  Vue.js gets better and better with each update but this time, the inclusion of
  zero config setup for Vue apps in Vue CLI 3 sets a new standard in the
  industry.
slug: vue-cli-3-overview
layout: post
date: '2018-07-23 12:26:02 +0000'
category: JavaScript development
author: Tomasz Żdanuk
avatar: tomasz.jpg
image: vue-js-cli.jpg
text-preview: >-
  Vue.js gets better and better with each update but this time, the inclusion of
  zero config setup for Vue apps in Vue CLI 3 sets a new standard in the
  industry.
tags:
  - Vue CLI
  - Vue js development
  - JavaScript development
---
Not so long ago, **Vue CLI** finally changed status from '_Beta_' to '_Release Candidate_', so now it's a great time to take a deeper look at all the new features the current version has to offer.

### Why was the change needed?

During Vuejs meeting in Amsterdam February of 2018, Evan You, the creator of Vue have pointed few problems with previous versions of the Vue CLI.

<center><iframe width="100%" height="450" src="https://www.youtube.com/embed/TRJMT9yjONQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></center>

According to his talk, those problems were:

* Templates are not upgradable,
* Naked configuration are intimidating and difficult to understand,
* Template maintenance difficulty with interweaving features,
* Forked templates need to constantly sync with upstream.

If you are interested in these problems, I recommend you watch the video, Evan is explaining them in more details.

## New features

The new CLI is an answer to the problems pointed by Evan. The goal of the **Vue CLI 3** is to provide a way for developers to get their Vue applications up and running as fast as possible, without thinking about configuration.

Here are some of the new features I find really interesting in the new Vue CLI 3.

### Plug-and-play structure

One of the biggest innovation coming with **Vue CLI 3** is a plugin-based architecture. Thanks to that, applications created in **Vue CLI 3** are flexible and extensible. You can easily add any plugin you need at any time of an app’s lifecycle. When you add a plugin to an existing project, the new CLI will change the core webpack configuration and create all required files for you.

Vue CLI 3 comes with a list of a few the most useful/popular plugins like 'vuex' or 'router' by default, but, of course, you are also allowed to create and use your own plugins.

### Built-in features

As mentioned earlier, new Vue CLI provides you with a list of the most useful plugins with support out of the box.

All you have to do is to just check plugins that you find interesting in creation process or run _`vue add < plugin name >`_ in existing app. Thanks to that you can set up your new app really fast, especially when you create your own preset with your the most favorite plugins.

Plugins which you can choose:

* Babel
* TypeScript
* PWA Support
* Router
* Vuex
* CSS Pre-processors
* Linter
* Unit Testing
* E2E Testing

![vue-cli-3-built-in-features](/_assets/images/vue-cli-3-built-in-features.jpg)

### No need to eject

‘No need to "eject"’ is another great feature of the new **Vue CLI 3**.

Vue CLI, like others modern CLIs, was built to help you quickly setup your app with no configuration. No config setup is great, at least as long as you don't need to change anything there, in real life, it's almost impossible. That's why CLI for React decided to create "ejecting" mechanism, and there's where "ejecting" terminology comes from.

Here's how ejecting is described in the ‘Create React Native App’ documentation:

> **Ejecting**
>
>  is the process of setting up your own custom builds for your CRNA (Create React Native App) app. It can be necessary to do if you have needs that aren't covered by CRNA, but please note that aside from the use of version control systems (git, hg, etc.) **it is not reversible.**

_'It is not reversible'_ that's the point why Vue’s ‘_no need to eject_’ is a great option.

Irreversibility makes your app inflexible because it prevents you from being able to receive upgrades to the script.

New Vue CLI 3 is giving you tools to create your own custom builds without ejecting, all thanks to the plugin structure. That makes Vue CLI 3 apps much more flexible and upgradable. All configuration is made from a vue.config.js file.

### Instant prototyping

New CLI is giving you the ability to prototype components without creating a new app and thinking about configuration. What you have to think about is your code only. Vue CLI 3 takes care of preparing your Webpack, Babel, and everything that is necessary to serve a simple app.

Globally installed Vue CLI 3 allows you to serve .js or .vue files, just using '_vue serve_' command.

### GUI

Quite a cool feature in the new CLI is also Graphical User Interface. If you are not a huge fan of typing in the console and you prefer more "windows" style configuration that's probably a great feature for you.

![vue-cli-3-gui](/_assets/images/vue-cli-3-gui.jpg)

### Environment Variables and Modes

Every project needs at least 2 environments: development and production. At Naturaily, we prefer the 3-environmental approach with an additional staging step. All environments always need different variables, called Environment Variables. Vue CLI 3 gives us out of the box built in tool to easily manage those variables.

You specify 'env' variables by simply placing \[them] in proper files, with '.env' name and eventual mode name.

Here's file description from Vue CLI docs.

```shell
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

Vue CLI have three modes by default: '_development_', '_production_' and '_test_', but you can easily also create other modes, just remember to use '_\--mode_' flag.

### Webpack configurations

Webpack is great, as long as when it is working and you don't need to configure it. According to 'zero config setup' idea, default Webpack configuration is also created by CLI.

First time with a new CLI app can be confusing, mainly because there is no Webpack config file. It doesn’t mean that there is no way to change that! All changes are made in _`vue.config.js`_ file.

If you are curious how your Webpack (and other plugins) configuration looks like, all you have to do is run '_vue inspect_' command. I suggest dumping that output into a file so that it will be easier to "inspect".  _`vue inspect > dump.js`_ will do the trick.

### PWA support

Last but surely not least feature coming to Vue CLI 3 is Progressive Web App support.

PWA is trending approach to create a Web application, if you're not familiar with that term, without doubt, you have to take a look at that! PWA support is a default but optional plugin in the new CLI. When you decide to add this plugin to your app it will build a PWA essence skeleton.

PWA support creates files such as: _`manifest.json`_, _`registerServiceWorker.js`_, and adds all required dependencies like workbox for Service Workers. All you have to do to make your app PWA is to add Service Worker and configure manifest.json.

Stay tuned, I'm gonna create a tutorial on how to do it!

### Build Targets

The new CLI gives you an opportunity to build your app in few different modes. Default and probably the most popular mode is the ‘app mode’. It's a typical build in the production version. A bit more interesting are two other modes: Library and Web Component.

According to their names it's gonna build Library and Web Component from your code.

To build your code to in certain mode use this command:

```shell
vue-cli-service build --target <target-name> --name <name> [entry]
```

You can choose: `app`, `lib`, `wc` or `wc-async`.

Library mode will build you several files, for different use cases, i.e `*.common.js` file for CommonJS bundle, `*.umd.js` for UMD bundle, `*.umd.min.js` as minified version of UMD bundle, and extract your css's to `*.css` file.

**NOTE:** Be aware that in lib mode, Vue is externalized!

Web components can be build in two different modes: as normal wc, or as asynchronous web component. Web component mode will produce a single JavaScript file, which you can later resue on your another app.

For more informations visit [Vue CLI official docs](https://cli.vuejs.org/guide/build-targets.html#app)

### Conclusion

**Vue CLI 3** has a lot of great new features which can ensure a **rapid and smooth development process**. Features shown in this article are probably just a small fraction of the new CLI and I’m sure that there are quite a few other features which you may find useful.

I really like the plugin structure and all the advantages coming from that architecture. Commercial projects have a tendency to change requirements and the ability to easily add some features such as eg. PWAs in an existing project is a huge advantage.

Out of the box, PWA support is an amazing feature and an opportunity to create this type of apps more often. Thanks to CLI 3, you can focus only on the most important things, and let the CLI do the rest of tiring configuration work for you.

### Sources

“_Ejecting from Create React Native App_” <strong>|</strong> <https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md>

05.04.2018 Obaseki Nosa <strong>|</strong> “_Vue CLI 3 — the deep dive_” <strong>|</strong> <https://blog.logrocket.com/vue-cli-3-the-deep-dive-41dff070ac4a>

26.03.2018 Anthony Gore <strong>|</strong> “_Vue CLI 3: A Game Changer For Frontend Development_” <strong>|</strong> <https://vuejsdevelopers.com/2018/03/26/vue-cli-3/>

01.03.2018 <strong>|</strong> “_Evan You - State of VueJS 2018 <strong>|</strong> Vue.js Amsterdam Conference_” <strong>|</strong> <https://www.youtube.com/watch?v=TRJMT9yjONQ>

30.03.2018 <strong>|</strong> “_How Vue-Cli 3 Will Shape Our Future_” <strong>|</strong> <https://medium.com/vuetify/how-vue-cli-3-will-shape-our-future-eb7c01f4a241>

“_Plugins and Presets_” <strong>|</strong> <https://cli.vuejs.org/guide/plugins-and-presets.html#plugins>

22.07.2016 Dan Abramov <strong>|</strong> “_Create Apps with No Configuration_” <strong>|</strong> <https://reactjs.org/blog/2016/07/22/create-apps-with-no-configuration.html>
