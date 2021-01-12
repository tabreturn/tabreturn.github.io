---
layout: post
comments: true
title: "Converting CSS Colour to Greyscale"
categories: code html javascript
---

This post discusses how RGB colour is converted to greyscale. Two formulae are presented here, along with techniques to implement them using a combination of HTML and JavaScript.

## Introduction

I've been playing around with colour conversion and comparison lately, and as a side-project decided to write a script that [converts HTML elements (and web-pages) to greyscale](https://github.com/tabreturn/pensioner). Altering colours using JavaScript is easy enough for anyone with some front-end development experience, but the algorithms for converting RGB colours to greyscale made for some interesting research. To begin, consider how monitors display shades of grey.

## So, How Do Monitors Display Greys?

Simple -- the same way they display colour. As explained in a [older post]({% post_url 2016-12-10-comparing_colours-_an_intro_to_colour_distance %}), screens rely on three primary colours: red, green, and blue. Bright red, for example, is mixed using the following values:

<div style="background-color:red; display:inline-block; width:80px; height:2em"></div>  
red: 100%  
green: 0%  
blue: 0%

Should you change the red value to 0%, you're left with black; change all the values to 100% and you get white. Black and white lie at either end of the greyscale gamut -- and as you've probably figured out already -- three equivalent RGB values will result in some shade of grey. For example:

<div style="background-color:#444444; display:inline-block; width:80px; height:2em"></div>  
red: 25%  
green: 25%  
blue: 25%

<div style="background-color:#CCCCCC; display:inline-block; width:80px; height:2em"></div>  
red: 75%  
green: 75%  
blue: 75%

## CSS Colour Values

CSS allows for various means of denoting RGB colour. <span style="color:red">Red</span> is one of the standard CSS colour names, so you could simply type "`red`". Alternatively, CSS allows you to write it out as:

`rgb(100%, 0%, 0%)`

Of course, the keyword "`red`" refers to a very specific shade of red, which may not suit your design. If you wished for a slightly darker red, you could use `rgb(90%,0%,0%)`. Other named colours include: <span style="color:blue">blue</span>, which is `rgb(0%,100%,0%)`; or <span style="color:orange">orange</span>, which is `rgb(100%,60%,0%)`; and so forth. In these examples, each RGB value is represented using percentile measurements, but there are more popular ways to describe colour when programmings websites and applications. [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) representation is likely to be the format you encounter most. In hexadecimal, red is:

`#FF0000`

There are six digits and a hash symbol (`F` is actually a digit, but more on that later). Or more correctly speaking -- there are *three pairs* of digits representing red, green, and blue, respectively:

red: FF  
green: 00  
blue: 00

Notice that instead of 100% for red, there's an `FF`; and that the 0%'s are now padded to `00` in order to fill two places. We can therefore surmise that *100%* is equal to FF, which is actually equal to **255** ... but, why not 100, or 99?

To explain this as simply as possible: humans use a *base 10* (decimal) counting system. This system works nicely for counting on ten fingers -- but using *base 16* (hexadecimal) is like counting on sixteen fingers. To make up those extra digits (fingers?), hexadecimal adds a few letters. Below is a comparison: the first line counts up using decimal; the line below it's the equivalent in hexadecimal:

`0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 ... 255`

`0 1 2 3 4 5 6 7 8 9 A  B  C  D  E  F  10 11 12 ... FF`

Using just two digits, hexadecimal can therefore represent a maximum value of 255, whereas decimal tops-out at 99.

### RGB 0--255 Notation

When extracting colour values from HTML elements using JavaScript, the browser returns RGB values using another form of CSS notation: `rgb(0-255,0-255,0-255)`. These are decimal values, as opposed to hexadecimal or percentile. To see behaviour this in action, consider the following HTML:

{% highlight html %}
<div id="alert" style="color:#FF0000">
  warning!!!
</div>
{% endhighlight %}

To retrieve the colour of the "warning!!!" text -- in this case, a red -- one would make use of the the following JavaScript code:

{% highlight js %}
var alert = document.getElementById('alert');
var style = window.getComputedStyle(alert, null);
console.log(style.color);
{% endhighlight %}

The `console.log(style.color)` returns the colour value -- originally specified in hexadecimal as `#FF0000`-- logging the following line in the developer console:

`rgb(255, 0, 0)`

## Greyscale Conversion

With the necessary colour, CSS, and JavaScript concepts introduced, it's time to focus on the conversion algorithms. Two methods are presented here, although the second is essentially a tweaked improvement of the first.

### The Averaging Method

Having extracted the RGB value -- in this case a <span style="color:rgb(255,0,0)">red</span> of `rgb(255,0,0)` -- the next step is to convert it to a grey. It has been established that greys are an equal mix of red, green, and blue, and for this method all three values are added together then averaged out. The formula can be expressed as:

`(red + green + blue) ÷ 3 = grey`

Substituting in the red values results in:

`(255 + 0 + 0) ÷ 3 = 85`

Therefore, the greyscale equivalent of `rgb(255,0,0)` is `rgb(85,85,85)`, as presented using the pair of swatches below:

<div style="background-color:rgb(255,0,0); float:left; width:80px; height:2em"></div>
<div style="background-color:rgb(85,85,85); float:left; width:80px; height:2em"></div>
<div style="clear:both; height:1.5em"></div>  

However, it's difficult to gauge how 'correct' this conversion is, but a spectrum of colours should help contextualise the result. To accomplish this, I wrote some JavaScript that converts raster images (GIF, JPG, and PNG files) into an array of `div` elements, each with a background-colour corresponding to its source pixel. Pixel art is well-suited to the task at hand -- allowing for more discernible areas of colour -- so to see this script in action, let's begin with this image of [Nyan Cat](https://en.wikipedia.org/wiki/Nyan_Cat):

<img src="{{ site.url }}/img/ccctg/nyancat-original.png" style="width:auto" />

Firstly, the image is a bit small. However, the script accepts a parameter for scaling, and in this case I've used a factor of 3. The averaged conversion has then been placed alongside the original colours to provide a comparison:

<figure>
  <img src="{{ site.url }}/img/ccctg/nyancat-colour-to-averaged.png" />
  <figcaption>Greyscale conversion using the averaged formula.</figcaption>
</figure>

The result is satisfactory, although there's room for improvement -- most notably, the <span style="color:#63F">purple</span> and <span style="color:#09F">blue</span> bands of the rainbow appear in the same shade of grey. This is, in some cases, unavoidable. After all, each RGB channel has 256 (0-255) levels, and as there are three, that's 16,777,216 (256 × 256 × 256) possible colours to be converted to just 256 possible greys. As a case in point, here's the math behind how the purple and blue land up the same:

* The <span style="color:#63F">purple</span> RGB value is `rgb(102,51,255)`, so  
  `(102 + 51 + 255) ÷ 3 = 136`  
  Therefore, the averaged grey RGB value is  
  `rgb(136, 136, 136)`
* The <span style="color:#09F">blue</span> RGB value is `rgb(0,153,255)`, so  
  `(0 + 153 + 255) ÷ 3 = 136`  
  Therefore, the averaged grey RGB value is also   
  `rgb(136, 136, 136)`

To take things a step further, I decided to throw a few more colours into the image, substituting the standard background for a rainbow gradient. In this case the shortcomings of the averaging method are more apparent -- just observe how the greyscale background is seemingly comprised of the same shades of grey repeating themselves:

<figure>
  <img src="{{ site.url }}/img/ccctg/nyancat-colour-to-averaged-rainbow.png" />
  <figcaption>Greyscale conversion using the averaged formula, on a rainbow background.</figcaption>
</figure>

This issue has something to do with how the [human eye is more sensitive to certain colours]({% post_url 2016-12-10-comparing_colours-_an_intro_to_colour_distance %}), but to address this, the next method takes human physiology into account to provide improved results.

### The Luminosity Method

The luminosity method incorporates the same coefficients as those implemented in GIMP's ([an open source Photoshop alternative](https://www.gimp.org/)) greyscale algorithm:

`(red × 0.3 + green × 0.59 + blue × 0.11) = grey`

'Coefficients' in this context refer to: *the weighting of the red, green, and blue channels when converting to a shade of grey*. Recall that the *averaging* method blended the RGB channels using a straight-forward **1:1:1** ratio -- that's 1 part red, to every 1 part green, and 1 part blue, respectively. However, because the human eye is most sensitive to green, and least sensitive to blue, the ratio should be **0.89 : 1.77 : 0.33**. The *averaged* and *luminosity* pie charts below illustrate this concept as applied for the colour <span style="color:#63F">`rgb(102,51,255)`</span>:

<figure>
  <img src="{{ site.url }}/img/ccctg/coefficient-charts.svg" />
  <figcaption>Averaged proportions (left) versus the luminosity proportions (right) for the colour purple.</figcaption>
</figure>

As you can see, the green 'slice' is heavily weighted in the luminosity (right) pie chart, occupying around 213 degrees. So even though it contains a fraction of the total green that could be applied, green is as prominent as the blue. Factoring in this coefficient produces more accurate results, as seen in the luminosity conversion below. Take note of the background rainbow in particular -- especially how the blue section of spectrum is clearly darker than the green:

<figure>
  <img src="{{ site.url }}/img/ccctg/nyancat-colour-to-luminosity-rainbow.png" />
  <figcaption>Greyscale conversion using the luminosity formula.</figcaption>
</figure>

## Doing it with JavaScript

It's probably simplest to test this out using something like [JSFiddle](https://jsfiddle.net/). Start by adding the following HTML code:

{% highlight html %}
<div id="alert" style="background-color:red">
  ... a red div ...
</div>
{% endhighlight %}

The background colour for the div should currently appear red (if you're using JSFiddle, you'll have to click "Run"). Next, add the JavaScript:

{% highlight js %}
// use either 'averaged' or 'luminosity'
var algorithm = 'luminosity';
// the selector ID you want to affect
var selector = document.getElementById('alert');

var style = window.getComputedStyle(selector, null);
var bgcolor = style.backgroundColor;
var rgba = bgcolor.match(/[0-9\.]+/g);

if (rgba) {
  var sum = 0;

  switch (algorithm) {
    case 'averaged':
      sum += parseInt(rgba[0]);
      sum += parseInt(rgba[1]);
      sum += parseInt(rgba[2]);
      break;

    case 'luminosity':
      sum += parseFloat(rgba[0]*0.89);
      sum += parseFloat(rgba[1]*1.77);
      sum += parseFloat(rgba[2]*0.33);
      break;
    }

  var g = Math.ceil(sum/3);
  var gray = 'rgb('+g+','+g+','+g;

  if (rgba[3]) {
    gray += ','+rgba[3];
  }

  gray += ')';
  selector.style.backgroundColor = gray;
}
{% endhighlight %}

The red background colour is now converted to a shade of grey (if you're using JSFiddle, don't forget to click "Run" again).

You may have noticed the script's provision for the `rgba()` and `rgb()` CSS colour notation. RGBA takes a fourth value between 0 and 1 to indicate a level of opacity (alpha). This is maintained if necessary, so that a semi-opaque colour, i.e.<span style="color:rgba(253,55,55,0.75)"> `rgba(253,55,55,0.75)`</span>, is converted to a <span style="color:rgba(121,121,121,0.75)">semi-opaque grey</span>.

This is a simple example, but you can fiddle with it some more -- or better yet, checkout the [GitHub repo](https://github.com/tabreturn/pensioner) for something more fully-featured.

## Further Reading

This post covered two common formulae for converting colour to greyscale. However, there are more, and if you're interested in reading further, I highly recommend [Tanner Helland's blog post]( http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/) on the topic.

*End*

## References

* http://gimp-savvy.com/BOOK/index.html?node54.html
* http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/
