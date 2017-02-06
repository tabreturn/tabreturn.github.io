---
layout: post
comments: true
title: "Converting CSS Colour to Greyscale"
categories: code html javascript
---

This post discusses how RGB colour can be converted to greyscale.

## Introduction

I've been playing around with colour conversion and comparison lately, and decided to write a script that [converts HTML elements (and web-pages) to greyscale](https://github.com/tabreturn/pensioner). Altering colours using JavaScript is easy enough for anyone with some front-end development experience, but the algorithms for converting RGB colours to greyscale makes for some interesting research. To begin, some introduction to displaying shades of grey (and colours) is required.

## So, How Do Monitors Display Greys?

Simple -- the same way they display colour. As explained in a [older post]({% post_url 2016-12-10-comparing_colours %}), screens rely on three primary colours: red, green, and blue. For example, bright red is mixed using the following values:

<div style="background-color:red; display:inline-block; width:80px; height:2em"></div>  
red: 100%  
green: 0%  
blue: 0%

Changing the red value above to 0% leaves you with black, as there is no (red, green, or blue) light. Change all the values to 100% and you get white. Black and white lie at either end of the greyscale gamut -- and as you've probably figured out already -- three equivalent RGB values will result in some shade of grey. For example:

<div style="background-color:#444444; display:inline-block; width:80px; height:2em"></div>  
red: 25%  
green: 25%  
blue: 25%

<div style="background-color:#888888; display:inline-block; width:80px; height:2em"></div>  
red: 50%  
green: 50%  
blue: 50%

## Colour Values

Using CSS, one could specify <span style="color:red">red</span> by writing it out as:

`rgb(100%, 0%, 0%)`

<span style="color:blue">Blue</span> is `rgb(0%, 100%, 0%)`; <span style="color:orange">orange</span> is `rgb(100%, 60%, 0%)`; and so forth.

Here, each RGB value is represented using percentile measurements, but there are more common ways to describe colour when programmings websites and applications. [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) representation is likely to be the format you encounter most. In hexadecimal, red is:

`#FF0000`

Three pairs of digits represent red, green, and blue, respectively. The first step to decoding the value is to split it:

red: FF  
green: 00  
blue: 00

Notice that instead of 100% for red, there is an `FF`; and that the 0%'s are now `00`. *100%* is therefore equal to FF, which is actually equal to **255** ... but, why not 100? To explain this as simply as possible: humans use a *base 10* (decimal) counting system. This system works nicely for counting on ten fingers -- but using *base 16* (hexadecimal) is like counting on sixteen fingers. To make up those extra digits, hexadecimal adds a few letters. As a comparison, the first line counts up using decimal; and below it is the equivalent in hexadecimal:

`0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 ... 255`

`0 1 2 3 4 5 6 7 8 9 A  B  C  D  E  F  10 11 12 ... FF`

Using just two digits, hexadecimal can therefore represent an equivalent of 255, whereas the maximum two-digit decimal value is 99.

When extracting colour values from HTML elements using JavaScript, the browser returns RGB values in a 0-255. Consider the following HTML example using red text:

{% highlight html %}
<div id="alert" style="color:#FF0000">
  warning!!!
</div>
{% endhighlight %}

Using JavaScript, one can retrieve the colour of the warning text using the following code:

{% highlight js %}
var alert = document.getElementById('alert');
var style = window.getComputedStyle(alert, null);
console.log(style.color);
{% endhighlight %}

The `console.log(style.color)` line returns the colour value. Interestingly, it does not use hexadecimal or percentile, but instead, decimal values:

`rgb(255, 0, 0)`

## Greyscale Conversion

Two formulas are presented here, although the second is essentially a tweaked improvement of the first.

### The Averaging Method

Having extracted the RGB value -- in this case a red of `rgb(255, 0, 0)` -- the next step is to convert it to a grey. It has been established that greys are an equal mix of red, green, and blue, and one approach is to add up the three values and then average them out. For example:

`(red + green + blue) ÷ 3 = grey`

in this instance, this result is:

`(255 + 0 + 0) ÷ 3 = 85`

Therefore the greyscale equivalent of `rgb(255, 0, 0)` is `rgb(85, 85, 85)`, for which the two swatches below provide a visual comparison:

<div style="background-color:rgb(255,0,0); float:left; width:80px; height:2em"></div>
<div style="background-color:rgb(85,85,85); float:left; width:80px; height:2em"></div>
<div style="clear:both; height:1.5em"></div>  

However, it's difficult to gauge how correct this is, and for this purpose a spectrum of colours helps contextualise the result. To accomplish this, I wrote a script that converts raster images (GIF, JPG, and PNG files) to an array of `div` elements, each with a background-color corresponding to a source pixel. Pixel art is well-suited to that task at hand, and to see this in action, let's begin with this image of [Nyan Cat](https://en.wikipedia.org/wiki/Nyan_Cat):

![nyan cat original]({{ site.url }}/img/ccctg-nyancat-original.png)

It's a bit small, so the script allows for scaling, in the case by a factor of about 3. The averaged conversion has been now been placed alongside it, with a red band in the rainbow that is `rgb(255, 0, 0)`:

![nyan cat original scaled]({{ site.url }}/img/ccctg-nyancat-colour-to-averaged.png)

The result is satisfactory, although there is room for improvement -- most notably, the <span style="color:#63F">purple</span> and <span style="color:#09F">blue</span> bands of the rainbow appear in the same shade of grey. This is, in some cases, unavoidable. After all, each RGB channel has 256 (0-255) levels, and there are three; so that's 256 × 256 × 256 = 16,777,216 possible colours to be converted to just 256 possible greys. As a case in point, here's the math behind how the purple and blue land up the same:

* the <span style="color:#63F">purple</span> RGB value is `rgb(102, 51, 255)`, so  
  `(102 + 51 + 255) ÷ 3 = 136`  
  therefore, the averaged grey RGB value is  
  `rgb(136, 136, 136)`
* and the <span style="color:#09F">blue</span> RGB value is `rgb(0, 153, 255)`, so  
  `(0 + 153 + 255) ÷ 3 = 136`  
  therefore, the averaged grey RGB value is also   
  `rgb(136, 136, 136)`

To take things a step further, I decided to throw more colours into the image, substituting the standard background for a rainbow gradient. In this instance the shortcomings of the averaging method are more apparent -- the greyscale rainbow is seemingly comprised of the same shades of grey repeating themselves:

![nyan cat original scaled]({{ site.url }}/img/ccctg-nyancat-colour-to-averaged-rainbow.png)

This has to with how the [human eye is more sensitive to certain colours]({% post_url 2016-12-10-comparing_colours %}), but the next method takes our physiology into account to provide improved results.

### The 'GIMP' Method

Firstly, I've titled this the *GIMP method* for lack of a better term, as it incorporates the same coefficients as those implemented in GIMP's ([an open source Photoshop alternative](https://www.gimp.org/)) greyscale algorithm. What exactly do I mean by 'coefficients'? The weighting of the red, green, and blue channels when converting to a shade of grey.

There are different ways to explain the coefficient, but being a fan of visual explanations, I'll illustrate the concept using a pie chart and ratios. The *averaging* method blended the RGB channels using a simple **1:1:1** ratio -- that's 1 part red, 1 part green, 1 part blue. However, because the eye is most sensitive to green, and least sensitive to blue, the ratio should be **0.89:1.77:0.33**. A <span style="color:#63F">purple / `rgb(102, 51, 255)`</span> pie chart for the *averaged* (left) and *GIMP* (right) methods look something like this:

![nyan cat original scaled]({{ site.url }}/img/ccctg-coefficient-charts.svg)

As you can see, green is heavily weighted, occupying around 213 degrees of the pie chart. Factoring in this coefficient produces improved results, but you can decide for yourself in the GIMP-style conversion below. Take note of the background rainbow in particular; how the blue section of spectrum is clearly darker than the green:

![nyan cat original scaled]({{ site.url }}/img/ccctg-nyancat-colour-to-gimp-rainbow.png)

# Doing it with JavaScript



{% highlight html %}
<div id="alert" style="background-color:red">
  ... a red div ...
</div>
{% endhighlight %}

... explain rgba ...


{% highlight js %}
// use either 'avg' or 'gimp'
var algorithm = 'gimp';
// the selector ID you wish to affect
var selector = document.getElementById('alert');

var style = window.getComputedStyle(selector, null);
var bgcolor = style.backgroundColor;
var rgba = bgcolor.match(/[0-9\.]+/g);

if (rgba) {
  var sum = 0;

  switch (algorithm) {
    case 'avg': // averaging
      sum += parseInt(rgba[0]);
      sum += parseInt(rgba[1]);
      sum += parseInt(rgba[2]);
      break;

    case 'gimp': // gimp
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


This is a simple example, but you can [checkout](https://github.com/tabreturn/pensioner) the ...

# Further Reading

I've covered two common algorithms for converting colour to greyscale. There are other algorithms, and if you're interested in reading more about them, I highly recommend [Tanner Helland's blog post]( http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/).


<figure>
  <img
  src='{{ site.url }}/img/ccctg-nyancat-colour-to-averaged.png'>
  <figcaption>The discourse logo</figcaption>
</figure>

# References

* http://gimp-savvy.com/BOOK/index.html?node54.html
* http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/
