---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 6.6: Tint and Transparency"
categories: code processing python
mathml: true
image: /img/pitl03/iteration-for-loop-adaption.png
description: A series of tutorials on Processing.py, introducing non-programmers to the fundamentals of computer programming in a visual context.
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

## Tint and Transparency

Processing's [`tint()`](https://py.processing.org/reference/tint.html) function tints images using a specified colour. This is like taking a sheet of colour transparency film and placing it over a given image. It's simple enough to use and best explained with few code snippets.

Create a new sketch and save it as "tints". Download this guardian lion photograph (Forbidden City, Beijing) and place it your sketch's "data" sub-directory.

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/guardian-lion.png" download>guardian-lion.png</a>

Setup the sketch with the following code:

{% highlight py%}
size(1050,500)
background('#004477')
noStroke()
img = loadImage('guardian-lion.png')
image(img, 0,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/tint-and-transparency-setup.png" />
  <figcaption>
    A forbidden city imperial guardian lion.<br />
    Tang Zu-Ming [Public domain], <a href="https://commons.wikimedia.org/wiki/File:Beijing_Forbidden_City_Imperial_Guardian_Lions.jpg">via Wikimedia Commons</a>
  </figcaption>
</figure>

The tint function accepts three `0`--`255` (RGB) values as arguments.

{% highlight py%}
tint(255,153,0)
image(img, width/3,0)
{% endhighlight %}

Alternatively, you could use a single argument of the `color()` data type:

{% highlight py%}
#tint(255,153,0)
orange = color(255,153,0)
tint(orange)
image(img, width/3,0)
{% endhighlight %}

Run the code to confirm that the tint is working.

<figure>
  <img src="{{ site.url }}/img/pitl06/tint-and-transparency-orange.jpg" />
</figure>

The `tint` function can accept a fourth `0`--`255` argument for transparency (*alpha*). Create a new `orange50` variable, with an opacity of 50%, then add a new `tint` line followed by a second instance of the `image`.

{% highlight py%}
orange50 = color(255,153,0, 128) # 255 ÷ 2 ≈ 128
tint(orange50)
image(img, width/3*2,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/tint-and-transparency-orange-alpha.jpg" />
  <figcaption>Left to right: no tint; orange tint; orange tint with 50% alpha.</figcaption>
</figure>

If you need to affect the image transparency but retain the colour, use a white tint and your desired alpha value. Once you've set a tint it remains in effect for any further images, unless you include a subsequent `tint()` line or a [`noTint()`](https://py.processing.org/reference/noTint.html).

If you are wondering to yourself, "this looks a lot like a multiply blend mode", you'd be correct. The effect can be replicated manually by using the loop arrangements from the "blend_modes" exercises. This would entail an additional alpha argument in the `colorMode()` function and some adapted loop code. For example:

{% highlight py%}
colorMode(RGB, 1,1,1,1)

...

    layer1 = get(x,y)
    r = red(orange50) * red(layer1)
    g = green(orange50) * green(layer1)
    b = blue(orange50) * blue(layer1)
    a = alpha(orange50)
    fill( color(r,g,b,a) )
    rect(x+width/3*2, y, 1, 1)
{% endhighlight %}

The [`alpha()`](https://py.processing.org/reference/alpha.html) function is used to separate out an alpha channel from a `color` value.

## Lesson 7

That concludes another lesson. You now understand how to manage colour on a channel and bit-level, and have gained insights into how popular image formats work along the way.

In lesson 7, you'll look at interactivity in Processing. As you'll see, Processing is great for mouse, keyboard, and other interaction, but rather clumsy for building user interfaces. If you've any experience with programming interfaces in other languages (perhaps some JavaScript, etc.), you'll quickly realise what I mean. However, some useful Processing libraries provide an extended set of turnkey GUI features.

<p style="text-align:right" markdown="1">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>

## References

* http://setosa.io/ev/image-kernels/
* https://medium.freecodecamp.org/best-image-format-for-web-in-2019-jpeg-webp-heic-avif-41ba0c1b2789
* https://en.wikipedia.org/wiki/Blend_modes
* https://en.wikipedia.org/wiki/Kernel_(image_processing)
