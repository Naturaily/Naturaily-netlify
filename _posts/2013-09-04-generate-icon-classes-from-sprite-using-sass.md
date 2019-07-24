---
title: Generate icon classes from sprite using SASS
description: >-
  This tutorial shows you how to shorten your code by automatic icon class
  generation for grid based sprites.
slug: sprite-icon-classes-sass
date: '2013-09-04 10:38:01 +0000'
category: Frontend development
author: Maciej Kucharski
avatar: /assets/images/maciek.png
image: /assets/images/sass.jpg
text-preview: >-
  While we mostly use sass for it's variables, nesting and mixins, the language
  itself is way more powerful. A lot of features may not be used on your
  everyday site, but there are times when they come in handy. Let's take a look
  on how one would approach automatic class generation for any grid based
  sprites and how this could vastly shorten your code.
tags:
  - Frontend development
  - Sass
---

While we mostly use sass for it's variables, nesting and mixins, the language itself is way more powerful. A lot of features may not be used on your everyday site, but there are times when they come in handy. Let's take a look on how one would approach automatic class generation for any grid based sprites and how this could vastly shorten your code.

*A little heads up: this won't be very useful with shorthand, no-braces sass syntax (.sass) since it doesn't support multi-line lists. For this reason all code below will actually be SCSS.*

What we will be making
----------------------
We will write a SASS mixin that will take a list of icons we specify and then create a set of classes for us to use in HTML. The purpose of this exercise is to learn more about SASS - it's built in functions, constructs and advanced use of variables.

Let's go.

Basic information about sprite
------------------------------
This is the simplest use of SASS variables - holding single value. First we create a configuration section for our generator.
```scss
$class-prefix: "custom-icon--";
$sprite-image-url: "images/sprite.png @path %}';
$sprite-grid-size: 20px;
```
With this configuration we are letting SASS know that our sprite is located in images/sprite.png and is made up of 20px by 20px grid. We also want all our classes to be prefixed with `custom-icon--`, ie. `custom-icon--settings`.


General icon styles
-------------------
Now that we know how generated classes will be named, we apply some styling to all icons:

```scss
[class*='#{$class-prefix}'] {
    display: inline-block;
    width: $sprite-grid-size;
    height: $sprite-grid-size;

    line-height: $sprite-grid-size;

    background-image: url(#{$sprite-image-url});
    background-repeat: no-repeat;
}
```
Styles for single icon
----------------------
We are going to use a small mixin, that will take $row and $column at which the icon is positioned in sprite and appropriately move icon's background. To simplify, we assume that rows and columns are 0-indexed.

```scss
@mixin icon($row, $column) {
    background-position: -$column*$sprite-grid-size -$row*$sprite-grid-size;
}
```
Because each cell of our grid has equal height and width, we can get away with this fairly simple code. If that was not the case, like when we would need to specify custom offsets for each icon, we could refactor this logic into a function, for example:

```scss
@function getPosition($move, $amout, $offset) {
    @return (-$move * $amount) + $offset;
}
```

List of icons
-------------
Variables in SASS can contain lists of values separated by either spaces or commas and optionally surrounded by parenthesis. Thanks to that we can create a simple data structure that will hold information about an icon:

```scss
$icon: ("<name>", <row>, <column>)
```
Extending this idea let`s us create a list of similar data structures that would describe all icons we want to define:

```scss
$icon-list: (
    ("settings", 0, 0)
    ("account", 0, 1)
    ("mail", 1, 0)
    ("picture", 1, 1)
);
```
Please note that in this case, the outermost parenthesis are not optional.

Creating icons
--------------
We'll write a snippet that will iterate over all icons in `$icon-list`, pluck variables from it, create a class and call `icon` mixin to style it.
```scss
@each $icon in $icon-list {
    // pluck $icon variables
    $name: nth($icon, 1);
    $row: nth($icon, 2);
    $column: nth($icon, 3);

    // create class
    .#{$class-prefix}#{name} {
        // style it
        @include icon($row, $column);
    }
}
```
We need to use built-in `nth` function to tell sass which value form list we want, because, sadly, there are no associative lists/arrays yet.

Wrapping it all together
------------------------
SASS lets us refactor a lot of repeatable code into a single list. Utilizing lists, `nth`, `@each` and mixins we were able to significantly reduce the number of code lines. Still, there is a lot room for improvement - we could account for different size icons, not square grid, scoping variables to reuse the code inside `@each` to create many sets of icons and so on.

Main point of this post is that SASS is so much more than just CSS that allows nesting and that we shouldn`t miss out on these exciting features.

Complete listing of code:

```scss
$class-prefix: "custom-icon--";
$sprite-image-url: "images/sprite.png @path %}';
$sprite-grid-size: 20px;

$icon-list: (
    ("settings", 0, 0)
    ("account", 0, 1)
    ("mail", 1, 0)
    ("picture", 1, 1)
);

@mixin icon($row, $column) {
    background-position: -$column*$sprite-grid-size -$row*$sprite-grid-size;
}

[class*='#{$class-prefix}'] {
    display: inline-block;
    width: $sprite-grid-size;
    height: $sprite-grid-size;

    line-height: $sprite-grid-size;

    background-image: url(#{$sprite-image-url});
    background-repeat: no-repeat;
}



@each $icon in $icon-list {
    $name: nth($icon, 1);
    $row: nth($icon, 2);
    $column: nth($icon, 3);

    .#{$class-prefix}#{name} {
        @include icon($row, $column);
    }
}
```
