---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 6.2: Colour Channels"
categories: code processing python
mathml: true
---

<p style="text-align:right" markdown="1">
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)<br />
<a href="{{ page.previous.url }}">&laquo; {{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }} &raquo;</a>
</p>

## Colour Channels

Each pixel on your screen is mixed using three primary colours: red, green, and blue. Another way to think of this is three monochrome images (or *channels*) that control the levels of each primary, combined into one image.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-channels.png" class="fullwidth" />
  <figcaption>
    August Macke's <q>Modefenster</q> separated into red, green, and blue channels.<br />
  </figcaption>
</figure>

Notice how the whiter areas of *Modefenster*, such as the foreground woman's face, appear solid for every channel. Recall that, to produce white, the red, green, and blue channels must combine at full intensity.

Sometimes it's preferable to work with four channels. For instance, you may need an alpha channel for transparency. Another scenario is print design. Colour printers use a four-colour *CMYK* model: <span style="color:#0EE">cyan</span>, <span style="color:magenta">magenta</span>, <span style="color:#EE0">yellow</span>, and **black**. If you've ever replaced ink cartridges in your printer, you've probably noticed this. For CMYK, desktop publishing file formats can handle 32-bit colour values. For instance, a blue mixed with 100% cyan and 50% appears as:

<div style="background-color:#0067A4; display:inline-block; width:80px; height:2.5em; margin-bottom:1em"></div>

In hexadecimal notation, it's:

<code><span style="color:#0EE">FF</span><span style="color:magenta">80</span><span style="color:#EE0">00</span><span style="color:black">00</span></code>

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-cmyk.png" class="fullwidth" />
  <figcaption>
  Mixing CMYK colours using <a href="https://krita.org">Krita</a>. The painting is Hokusai's <q><a href="https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg">The Great Wave off Kanagawa</a></q>.
  </figcaption>
</figure>

Observe Krita's *Channels* panel to the lower-right; whiter areas indicate higher values for the respective channel. For instance, the Cyan channel's bright regions correspond to the blue areas in the wave. The Magenta channel appears like a duller copy of the Cyan channel; the predominant blue is mostly a mix of around 100% cyan and 50% magenta. By manipulating colour channels, you can control the overall hue, saturation, and lightness. If you are familiar with software like GIMP or Photoshop, or perhaps more basic image editing software, you've likely performed such operations before.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-gimp.png" class="fullwidth" />
  <figcaption>GIMP's Hue-Saturation tool. In this instance, the saturation has been reduced to <code>-85</code>. GIMP's Channels panel (to the lower right) separates the image into its Red, Green, Blue, and Alpha channels.</figcaption>
</figure>

Processing has various functions for manipulating colour channels. Experimenting with these reveals the inner workings of applications like Photoshop.

### RGB Channels

 Create a new sketch and save it as "colour_channels". Download this copy of August Macke's *Modefenster* and place it your sketch's "data" sub-directory:

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/modefenster.png" download>modefenster.png</a>

Add the following setup code:

{% highlight py %}
size(1000,720)
background('#004477')
noStroke()
modefenster = loadImage('modefenster.png')
image(modefenster, 0,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-setup.jpg" />
</figure>

We'll be sampling parts of the painting and placing the processed output in the empty blue area to the right. The first function you need to know is the [`get()`](https://py.processing.org/reference/get.html). This is used to read the colours of pixels that lie within the display window. First, grab a section of pixels by adding a `get()` to the bottom of your code:

{% highlight py %}
grab = get(0,0, 200,200)
{% endhighlight %}

The arguments are the same as those of the `rect()` function; the variable `grab` is assigned a copy of all the pixels within a rectangular area beginning at the top left (`0,0 ...`) and extending 200 pixels across and 200 pixels down (`... 200,200`). Add an `image()` function to draw the pixels into the empty area on the right:

{% highlight py %}
grab = get(0,0, 200,200)
image(grab, 600,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-area.jpg" />
</figure>

Alternatively, you can make use of the [`copy()`](https://py.processing.org/reference/copy.html) function which additionally accepts arguments for the destination coordinates and scale.

{% highlight py %}
#    src. coords --> dest. coords
copy(0,0,200,200,    600,600,100,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-copy.jpg" />
  <figcaption>A copy and scale (shrink) in one function.</figcaption>
</figure>

To retrieve a single pixel's colour, use a `get()` function without width and height arguments. If any pixel sampled lies outside of the image window, the `get()` returns black.

{% highlight py %}
singlepixel = get(190,200)
fill(singlepixel)
rect(700,300, 200,200)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-single.jpg" />
  <figcaption>A square filled with the colour sampled from a single pixel.</figcaption>
</figure>

Intriguingly, if you print the `singlepixel` variable a (negative) integer appears; this is how Processing stores colours in memory. You do not need to understand how this works because there are functions for converting these integer-based data types to standard hexadecimal and RGB.

{% highlight py %}
print(singlepixel) # -248525
{% endhighlight %}

We can now build a duplicate image on the right by sampling each pixel and placing its clone 500 pixels (half the width of the display window) to the right. Sure, it would be easier to grab the whole area of the painting, but the pixel-by-pixel approach is necessary for the upcoming steps. Add this loop to the end of your code:

{% highlight py %}
halfwidth = width/2
x = 0
y = 0

for i in range(halfwidth*height):

    if i%halfwidth==0 and i!=0:
        y += 1
        x = 0
    x += 1

    pixel = get(x,y)
    set(x+halfwidth, y, pixel)
{% endhighlight %}

You should be quite comfortable with loops now. In this instance, the `range` is half the display window's width by the full height. In a pixel-by-pixel, row-by-row manner, the loop `get`s each pixel and `set`s its clone accordingly. The `set()` function accepts three arguments: an x-coordinate, then y-coordinate, then colour. Run the sketch. Your earlier experiments are drawn over with new pixels.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-set.jpg" />
</figure>

With each iteration, we'll now separate the pixel values into the independent R, G, and B channels.  Comment out the existing `set()` line and add a `red()`, `green()` and `blue()` function to extract the three channel values.

{% highlight py %}
    ...

    pixel = get(x,y)
    #set(x+halfwidth, y, pixel)

    r = red(pixel)
    g = green(pixel)
    b = blue(pixel)
{% endhighlight %}

With each pixel sampled, variables `r`, `g`, and `b` are each assigned a value between `0` and `255`. Excellent! That's a familiar range, right? Remember, `255` equals `FF` equals `11111111`.

The [`color()`](https://py.processing.org/reference/color.html) function converts RGB values into the integer types that `get()` and `set()` work with (the way Processing stores colours in memory). Add the following lines to the end of your loop:

{% highlight py %}
    rgb = color(r, g, b)
    set( x+halfwidth, y, rgb )
{% endhighlight %}

Run the sketch. The result is the same as before. We have split the colour into its R/G/B constituents then merged them back together using the `color()` function.

Now, let's visualise the channels beginning with red. Recall that the Channels panels in both Krita and GIMP (and Photoshop, for that matter) display greyscale thumbnails. Greys are an equal mix of red, green, and blue -- therefore, to represent a red channel in greyscale, use the red value for all three `color` arguments.

{% highlight py %}
    #rgb = color(r, g, b)
    set( x+halfwidth, y, color(r,r,r) )
{% endhighlight %}

If the current iteration's pixel is bright red, the `color(r, r, r)` line is equivalent to `color(255, 255, 255)`. This means that the most vivid reds will appear as white, that no red is black, and that everything else is some shade of grey. Run the code.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-red.jpg" />
  <figcaption>Red channel (right).</figcaption>
</figure>

Note how the red "MODE" sign registers as white; this indicates red values of near 100%. The yellow stripes in the awning over the window are also white; this is because yellow is mixed using 100% red and 100% green. Comment out the red `set()` line and try a green channel instead.

{% highlight py %}
    #set( x+halfwidth, y, color(r,r,r) )
    set( x+halfwidth, y, color(g,g,g) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-green.jpg" />
  <figcaption>Green channel (right).</figcaption>
</figure>

The green channel confirms the prominence of green in the awning. The sign, however, has very little green -- or blue, for that matter. You can try a `set()` line for blue if you wish to confirm this. Any area in the original image that's grey, white, or black, will possess equal quantities of red, green, and blue.

To convert the image to greyscale, rather than greyscale representations of each channel, average out the three values.

{% highlight py %}
...
channelavg = (r + g + b) / 3
greyscale = color(channelavg, channelavg, channelavg)
set( x+halfwidth, y, greyscale )
{% endhighlight %}

Include the following coefficients to accommodate the greater number of green receptors in the human eye. The yellows will, otherwise, not appear bright enough.

{% highlight py %}
channelavg = (r*0.89 + g*1.77 + b*0.33) / 3
{% endhighlight %}

In the image below, the area within the green brackets exhibits the calibrated values. Note how the awning's bright yellow and darker orange strip appear as the same shade of grey with the straightforward averaged values.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-greyscale.jpg" />
  <figcaption>Greyscale conversion (right). Note the more pronounced stripes within the green brackets.</figcaption>
</figure>

To invert the colours (like a [film negative](https://en.wikipedia.org/wiki/Negative_(photography))), subtract each `r`/`g`/`b` value from its maximum channel value of 255.

{% highlight py %}
...
invcolour = color(255-r, 255-g, 255-b)
set( x+halfwidth, y, invcolour )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-invert.jpg" />
  <figcaption>Inverted image channels (right).</figcaption>
</figure>

See if you can work out how to create an inverted greyscale version.

### HSB Channels

Lesson 1 introduced Processing's various [colour modes]({% post_url 2018-06-13-processing.py_in_ten_lessons--1.2-_colour %}#colour-mode). The colour mixing scheme can be switched from RGB to HSB (Hue, Saturation, Brightness) using the `colorMode()` function. You can think of HSB as an alternative set of channels that may be more appropriate for what you need to accomplish. Switch the `colorMode` to HSB and add a new loop to the end of your existing "colour_channels" code. If you wish to, you can comment out the previous loop -- or instead, not bother and just allow the new loop to draw over what's there already.

{% highlight py %}
colorMode(HSB, 360, 100, 100)
x = 0
y = 0

for i in range(halfwidth*height):

    if i%halfwidth==0 and i!=0:
        y += 1
        x = 0
    x += 1
{% endhighlight %}

Working in HSB makes it far easier to shift hues, adjust saturation, and alter brightness. The `colorMode()` arguments have now set Processing to operate like the GIMP colour mixer depicted below.

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-gimp-mixer.png" />
  <figcaption>GIMP colour mixer with the HSB values highlighted.</figcaption>
</figure>

Use the `hue()`, `saturation()`, and `brightness()` functions to separate the pixel values into three HSB channels.

{% highlight py %}
    ...
    pixel = get(x,y)
    h = hue(pixel)
    s = saturation(pixel)
    b = brightness(pixel)
{% endhighlight %}

To create an exact copy of the painting, use a `set()` line with the `h`/`s`/`b` variables as arguments:

{% highlight py %}
    set( x+halfwidth,y, color(h, s, b) )
{% endhighlight %}

Adjusting the hue involves taking a pixel's hue value and rotating the GIMP mixer triangle to produce a new rotation value between 0 and 360 degrees. This is akin to shifting a hue slider in GIMP or Photoshop.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-gimp-hs.png" class="fullwidth" />
  <figcaption>Adjusting the Hue slider.</figcaption>
</figure>

But simply adding degrees of rotation to the `h` variable is problematic. For example, what if the `h` is `40` and we subtracted `50`. The result is 40 - 50 = -10 degrees, which lands outside of the permitted range. Instead, rotating past 0 or 360 should reset the degrees to zero, then subtract/add the remaining difference. This way 40 - 50 = 350 degrees. This is an example of *clock arithmetic*. The 'wrap-around' concept is nothing new to you. If it's currently three AM, and somebody asks what time was it four hours ago, you'dn't say "minus one AM"? Clock arithmetic is an application of *modular arithmetic* -- the favourite pastime of our good friend the modulo operator! Add a new `set()` line that subtracts `50` from the hue and performs a `%360` on the result.

{% highlight py %}
    #set( x+halfwidth,y, color(h, s, b) )
    set( x+halfwidth,y, color((h-50)%360, s, b) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-hue.jpg" />
  <figcaption>Rotating/shifting the hue channel by 50°.</figcaption>
</figure>

To invert the colour, but keep the same brightness, pick the colour on the opposite side of the colour wheel by adding 180°.

{% highlight py %}
    set( x+halfwidth,y, color((h+180)%360, s, b) )
{% endhighlight %}

For the most vivid colours possible, set the saturation value to maximum (100%) for every pixel.

{% highlight py %}
    set( x+halfwidth,y, color(h, 100, b) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-saturation.jpg" />
  <figcaption>The hue remains the same, but the saturation has been pushed to maximum.</figcaption>
</figure>

You are now familiar with colour channel management. You can apply this theory to all sorts of colour adjustment. These principles also lay the foundation for the next sections where we look at filter effects. There are a few other functions for the colour data type that we did not cover. These omissions include:

* [`alpha()`](#tint-and-transparency), for extracting alpha (transparency) values;
* [`blendColor()`](https://py.processing.org/reference/blendColor.html), for blending two colours using a selection of modes;
* [`lerpColor()`](https://py.processing.org/reference/lerpColor.html), for calculating the colour(s) that lie between two other colours;
* [`loadPixels()`](https://py.processing.org/reference/lerpColor.html), [`pixels()`](https://py.processing.org/reference/pixels.html), and [`updatePixels()`](https://py.processing.org/reference/updateYixels.html), which work together to load and manipulate pixels in the display window. This is a faster, albeit more complicated, alternative to using `get()` and `set()`.

**Begin Lesson 6.3:** [Halftones]({% post_url 2019-02-09-processing.py_in_ten_lessons--6.3-_halftones %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
