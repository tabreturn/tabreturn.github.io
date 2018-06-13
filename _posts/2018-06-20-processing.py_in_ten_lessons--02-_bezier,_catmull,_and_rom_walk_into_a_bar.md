---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 02: Bézier, Catmull, and Rom walk into a bar ..."
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#curves"><em>curves</em></a> /
<a href="#vertices"><em>vertices</em></a> /
<a href="#text"><em>text</em></a> /
<a href="#typography"><em>typography</em></a>

---
&nbsp;  
[Lesson 01]({% post_url 2018-06-12-processing.py_in_ten_lessons--01-_hello_world %}) introduced a number of 2d primitives, namely: arcs, ellipses, lines, points, quads, rectangles, and triangles. However, many shapes do not fit into any of these categories -- to name just a few: hearts (♥), stars (★), octagons, and duck silhouettes. In this lesson you will look at drawing with points and curves, as opposed to more restrictive shape functions.

## Curves

Processing deals with two types of curves: *Bézier* and *Catmull-Rom*. Both are named after the people who developed them and both involve some complicated math. Fortunately, the complex calculus is handled by the various curve functions, leaving you to deal with the coordinates of a few control points. If you have any experience with vector graphics drawing software -- such as Illustrator or Inkscape -- these will look familiar.

The best way to grasp curves is to draw a few, then manipulate their control points. Create a new sketch and save it as "curves".

This section will be coordinate-intensive; so, to make things easier, download this "grid.png" file and save/move it to a sub-folder within your sketch named "data":

<a href="{{ site.url }}/img/pitl02/grid.png">grid.png</a>

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-data-folder.png" />
  <figcaption>Place any additional sketch assets (images, fonts, and other media) in a folder named "data".</figcaption>
</figure>

This grid will lie beneath everything you draw. Setup your sketch using the following code:

{% highlight py %}
size(500,500)
grid = loadImage('grid.png')
image(grid, 0, 0)
noFill()
strokeWeight(3)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-grid.png" />
  <figcaption>Using the grid, you can better approximate the coordinates of your shapes.</figcaption>
</figure>

### Catmull-Rom Splines

The Processing `curve()` function an implementation of Catmull-Rom splines. It is named after Edwin Catmull and Raphael Rom. Once visualised, the operation of these curves is very intuitive.

Add a line a diagonal line to your "curves" sketch:

{% highlight py %}
...

stroke('#0099FF')
line(100,100, 400,400)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line.png" />
</figure>

As one would expect, a line is drawn between the pairs of x/y coordinates specified. Now comment out the `line()` function and replace it with a `curve()`:

{% highlight py %}
stroke('#0099FF')
#line(100,100, 400,400)
curve(0,0, 100,100, 400,400, 500,500)
{% endhighlight %}

The result is exactly the same. If you study the `curve()` arguments, you will notice that the four middle match those of the `line()`:

<code>line(<b>100,100, 400,400</b>)</code>  
<code>curve(0,0, <b>100,100, 400,400</b>, 500,500)</code>

The extra `0,0` and `500,500` arguments represent the control point coordinates, but more on those shortly. Set the stroke to yellow and add another `curve()` function:

{% highlight py %}
...

stroke('#0099FF')
#line(100,100, 400,400)
curve(0,0, 100,100, 400,400, 500,500)

stroke('#FF0000')
curve(0,250, 100,100, 400,400, 500,250)
{% endhighlight %}

Note that, in this instance, the control point coordinates have been tweaked -- resulting in a yellow curve with a slight S-bend:

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line-curved.png" />
  <figcaption>The green semicircles indicate the control point coordinates (<code>0,250</code>) and (<code>500,250</code>).</figcaption>
</figure>

Now for the part where it all makes sense! To provide a clearer idea of how the control points work, add the following code:

{% highlight py %}
...

stroke('#FF9900')
# curve control point 1
curve(0,250, 0,250, 100,100, 400,400)
# curve control point 2
curve(100,100, 400,400, 500,250, 500,250)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line-control-points.png" />
</figure>

It should now be evident from the additional control points curves how the `curve()` function operates. You can experiment with different control point coordinates and curve-tightness. The `curveTightness()` function determines how the curve fits, ranging from `-5.0` to `5.0`; `0` is the default:

{% highlight py %}
...
curve(0,0, 100,100, 400,400, 500,500)

curveTightness(0) # try values between -0.5 and 0.5
stroke('#FFFF00')
...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-tightness.png" />
  <figcaption>
    Clockwise from the top-left:
    <code>curveTightness(-1)</code>;
    <code>curveTightness(0)</code>;
    <code>curveTightness(1)</code>;
    <code>curveTightness(5)</code>;
  </figcaption>
</figure>






Vector graphics, blah

## Vertices

...

## Text

...

## Typography

...

## Lesson 03

That's it for lesson 02. I hope it was enjoyable, if somewhat challenging. Take a break -- you deserve it! When you are ready to move onto lesson 02, use the link below. If you are familiar with vector graphics (Adobe Illustrator, Inkscape, etc.), you'll be gaining some new insight into their inner-workings.

**Begin lesson 03:** \<randomly generated lesson title\> *(coming soon)*
{% comment %}
**Begin lesson 03:** [\<randomly generated lesson title\>]({% post_url 2018-06-20-processing.py_in_ten_lessons--02-_bezier,_catmull,_and_rom_walk_into_a_bar %})
{% endcomment %}

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* ...
