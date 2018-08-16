---
title: A definitive guide to responsive text
description: >-
  Creating a responsive web design can sometimes make us forget about webpage's
  most important piece - the text. Check out our guide to responsive text!
slug: responsive-text-guide
date: '2014-01-28 10:38:01 +0000'
category: Frontend development
author: Maciej Kucharski
avatar: /assets/images/maciek.png
image: /assets/images/responsivetext.jpg
text-preview: >-
  When thinking RWD most of you picture fluid grids and responsive images,
  forgetting a quite important piece of the puzzle - the content. *Since content
  is king* and most probably your content is mostly text, the text is king.
  Let’s see what we can do to display text properly on vast range of devices.
tags:
  - Frontend development
---

When thinking RWD most of you picture fluid grids and responsive images, forgetting a quite important piece of the puzzle - the content. *Since content is king* and most probably your content is mostly text, the text is king. Let’s see what we can do to display text properly on vast range of devices.

The basics
----------
Obviously you want your text to be read. And all this article is about is readability. Studies that have been quoted plenty of times show that 45 to 75 characters per line are optimal for best readability. The smaller the screen, the fewer glyphs per line should be used. No big deal, right? Just get the page width, divide it by approximate glyph width and, volia, your done! Except you’re NOT! You actually have no idea how wide the page is, what device user is using or what the browser settings are. You’ve only got assumptions. We are here to help, so let’s start with units.

### Em vs rem vs % ###
Why are we even writing about this? Ems/rems/%s are relative size units that are hard to calculate, but, believe me, you’ll prefer these calculations over calculating pixels to set font size for multiple elements for each media query. Math 101 formula for calculating ems:
```scss
size_in_ems = size_in_pixels / base_size
```

It’s as straightforward as it could humanly be and with such calculation you should change all text related values in your css from pixels to a relative units. But what’s the base size? For percents and em it’s the font size in parent element. This generally works well, but there is a caveat you have to watch out for. Let’s say you wanted a list with slightly bigger type than the default one. You could just write:
```css
li {
	font-size: 1.2em; // or 120%
}
```


And this is fine, until you nest lists. The base level’s font size is obviously 120% of the default size, but each subsequent level of nesting increases it by another 20%, which probably isn’t desired. A workaround? Just remember to set size in the CSS for the nested elements:
```css
li {
	font-size: 1.2em; // or 120%
}

li li {
	font-size: 1em; // or 100%
}
```

Or use `rems`. The ‘r’ stands for ‘root’, which means you have to calculate for one base - the font size set on top element - the html tag.

### Use percent for base and em/rem for everything else ###
Aside from your desired way of displaying text on your website, situations occur when your users decide to change its size using browser’s features. You shouldn’t try to prevent such possibility by setting a hard value on html font-size property. You should definitely allow it and handle in a responsive way. That of course means using relative units even when setting the root element’s text size. In this case the base size would be set to browser’s default value or value set by the user.

Why percent for base though? This is to prevent IE6 and IE7 from going absolutely nuts with font sizes when user changes the default browser setting. If you are not planning to support IE6 & 7 then you can just happily go with ems or rems for all the values.

Choosing between ems and rems is a question of difficulty of calculating vs browser support. While ems are slightly harder to handle because of the nesting issue, they are also supported far more widely than rems. Rems are not available in IE lower than 9. Even newest versions of Opera Mini don’t support them. They are also not very SmartTV friendly, but we can expect this to change soon.

### I hate maths, too ###
So, here you’ve got couple mixins that will help you scale text effortlessly. All modern browsers use 16px as the default font size, so we’ll just use this as a calculation base. User changing that setting is not a concern, because this value is only used as a placeholder for calculation and all text will scale accordingly.

We can use functions in SASS to calculate the value:
```sass
pxToEm($desired_value, $base_value: 16px ) {
	@return $desired_value/$base_value * 1em;
}
pxToPercent($desired_value, $base_value: 16px ) {
	@return $desired_value/$base_value * 100%;
}
```
Sadly, there are no functions in LESS, so we have to use mixins:
```sass
.pxToEm(@desired_value, @base_value: 16px) {
	font-size: @desired_value/@base_value * 1em;
}

.pxToPercent(@desired_value, @base_value: 16px) {
	font-size: @desired_value/@base_value * 100%;
}
```

You get the picture.

Getting fancy with titles
-------------------------
While 45 to 75 characters per line may be good for regular text, the title of the page is a different story. You may want it to be as big as possible, taking the whole width of the container. This is possible with some additional JavaScript code. jQuery plugins like FitText and SlabText make this atrociously easy:
```javascript
$(‘.resposive-title’).fitText();
```
Bam, that’s it, you’re done! Just make sure you are not using this on your regular text. While it may be tempting to do so to avoid the hassle with relative units, the performance impact on slower devices may be huge and ...deadly.

Truly responsive content
------------------------
What if your content just doesn’t scale correctly despite all your efforts and hard work? You could make it adapt to device it’s viewed on. This can be achieved by a mix of HTML and CSS code, like this:
```html
<p> this is some crucial information <span class=’hide-for-small’>this is some additional info</span></p>
```
Couple lines of CSS code will hide everything that has .hide-for-small class on small screens. However, if you have more complicated case or are using this trick tons of times you might be better off with some Javascript. Plugins like intention.js or L20n let you decide what is shown where based on variables like screen dimensions or even time of the day. While the latter is primarly a localization tool, the responsive features are not to be scoffed at.

The simplest example, straight from L20n:
```html
<formFactor($n) { $n.px < 480 ? "portraitPhone" :
               	$n.px < 768 ? "landscapePhone" :
                 	$n.px < 980 ? "landscapeTablet" :
                   	$n.px < 1200 ? "desktop" :
                     	"large" }>

<data[formFactor(@screen.width)] {
*large: "Hello, dear Maciej",
 landscapePhone: "Hi, Maciej",
 portraitPhone: "Hi"
}>
```

It will of course output different text size depending on width of the screen it’s viewed on.

Closing thoughts
----------------
The responsive text approach is fairly simple - use relative units everywhere and don’t overdo it with JavaScript. In fact, it’s so simple that you can’t afford not to do it.

That would be all for now. Till next time!
