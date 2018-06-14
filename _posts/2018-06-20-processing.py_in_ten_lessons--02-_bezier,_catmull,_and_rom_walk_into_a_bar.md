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

Processing deals with two types of curves: *Bézier* and *Catmull-Rom*. Both are named after the people who developed them and both involve some complicated math. Fortunately, the complex calculus is handled by the various curve functions, leaving you to deal with the coordinates of a few control points.

## Curves

The best way to grasp curves is to draw a few, then manipulate their control points. Create a new sketch and save it as "curves". This section will be coordinate-intensive; so, to make things easier, download this "grid.png" file and save/move it to a sub-folder within your sketch named "data":

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

stroke('#0099FF') # pale blue
line(100,100, 400,400)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line.png" />
</figure>

As one would expect, a line is drawn between the pairs of x/y coordinates specified. Now comment out the `line()` function and replace it with a `curve()`:

{% highlight py %}
stroke('#0099FF') # pale blue
#line(100,100, 400,400)
curve(0,0, 100,100, 400,400, 500,500)
{% endhighlight %}

The result is exactly the same. If you study the `curve()` arguments, you will notice that the four middle match those of the `line()`:

<code>line(<b>100,100, 400,400</b>)</code>  
<code>curve(0,0, <b>100,100, 400,400</b>, 500,500)</code>

The extra `0,0` and `500,500` arguments represent the control point coordinates, but more on those shortly. Set the stroke to yellow and add another `curve()` function:

{% highlight py %}
...

stroke('#0099FF') # pale blue
#line(100,100, 400,400)
curve(0,0, 100,100, 400,400, 500,500)

stroke('#FFFF00') # yellow
curve(0,250, 100,100, 400,400, 500,250)
{% endhighlight %}

Note that, in this instance, the control point coordinates have been tweaked -- resulting in a yellow curve with a slight S-bend:

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line-curved.png" />
  <figcaption>The green (semi-)circles indicate the control point coordinates (<code>0,250</code>) and (<code>500,250</code>).</figcaption>
</figure>

Now for the part where it all makes sense! To provide a clearer idea of how the control points work, add the following code:

{% highlight py %}
...

stroke('#FF9900') # orange
# curve control point 1
curve(0,250, 0,250, 100,100, 400,400)
# curve control point 2
curve(100,100, 400,400, 500,250, 500,250)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line-control-points.png" />
</figure>

It should now be evident from the additional control points curves just how the `curve()` function operates. You can experiment with different control point coordinates.

The `curveTightness()` function determines how the curve fits. It accepts values ranging from `-5.0` to `5.0`, with `0` being the default. To experiment with it, place it above the the `stroke('#FFFF00')` line, so as to affect all of the curves beneath it.

{% highlight py %}
...
curve(0,0, 100,100, 400,400, 500,500)

curveTightness(0) # try values between -0.5 and 0.5
stroke('#FFFF00') # yellow
...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-tightness.png" />
  <figcaption>
    Clockwise from the top-left:
    <code>curveTightness(-1)</code>;
    <code>curveTightness(0)</code>;
    <code>curveTightness(1)</code>;
    <code>curveTightness(5)</code>.
  </figcaption>
</figure>

### Bézier Curves

French engineer, Pierre Bézier popularised, but did not actually create the Bézier curve. He used them in his of design automobile bodies at Renault, devising a system whereby the shape of a curve is controlled by series of anchor and control points. If you have any experience with vector graphics drawing software -- such as Adobe Illustrator, or Inkscape -- these will look familiar.

<figure>
  <img src="{{ site.url }}/img/pitl02/bezier-inkscape.png" class="fullwidth" />
  <figcaption>Inkscape in path-editing mode.</figcaption>
</figure>

Bézier curves are widely used in computer graphics. Their ability to model smooth curves makes them fundamental to vector graphics, animation paths, and fonts. Vector graphics have the ability to scale to any size -- referred to as *resolution-independence*. Consider a digital photograph: as you zoom further and further in toward a given point, discernible squares of colour appear. Popular photographic formats, such as JPG and PNG, are comprised of a pixel grid, the dimensions of which limit the resolution. However, in the case of vector-based graphics, the points along a Bézier curve can be recalculated to fit any resolution.

<figure>
  <img src="{{ site.url }}/img/pitl02/bezier-raster-vector.png" class="fullwidth" />
  <figcaption>Left: editing a vector version of the Twitter logo in Adobe Illustrator. Right: editing a JPG version of the same logo in Photoshop.</figcaption>
</figure>

The `bezier()` function takes the following arguments, expanded across multiple lines here for easier comprehension:

{% highlight py %}
arc(
  anchor_point_1_x, anchor_point_1_y,
  control_point_1_x, control_point_1_y,
  anchor_point_2_x, anchor_point_2_y,
  control_point_2_x, control_point_2_y
)
{% endhighlight %}

Yikes! That's are a lot of arguments. Add some code to draw a Bézier curve, but use four variables to isolate the control points:

{% highlight py %}
...

stroke('#FF99FF') # pink
cp1x = 250
cp1y = 250
cp2x = 250
cp2y = 250
bezier(400,100, cp1x,cp1y, cp2x,cp2y, 100,400)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/bezier-line.png" />
  <figcaption>Left: editing a vector version of the Twitter logo in Adobe Illustrator. Right: editing a JPG version of the same logo in Photoshop.</figcaption>
</figure>

Notice how all of the `cp__` variables reference the centre of the display window (`250, 250`), meaning that all of the control points currently lie where the yellow and pale pink line cross. To visualise how the curve is manipulated, add a red line connecting the first anchor and control point. Adjust the `cp1y` variable to add some curve:

{% highlight py %}
...

cp1y = 200
...
bezier(400,100, cp1x,cp1y, cp2x,cp2y, 100,400)

stroke('#FF0000') # red
line(400,100, cp1x,cp1y)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/bezier-control-point.png" />
  <figcaption>The anchor and control points are indicated in green.</figcaption>
</figure>

The `bezier()` and `line()` functions now share the control point's x/y-coordinates. Making any adjustments to `cp1y` and `cp1x`, therefore, affects both functions.

{% highlight py %}
...
cp2x = 320
cp2y = 350
...
bezier(400,100, cp1x,cp1y, cp2x,cp2y, 100,400)

stroke('#FF0000') # red
line(400,100, cp1x,cp1y)
line(100,400, cp2x,cp2y)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/bezier-control-points.png" />
</figure>

Observe how the red handles 'magnetically' draw the line toward the control point. Getting the hang of where to place the anchor- and control points for a desired curve takes some practice. Perhaps try the Bézier Game to help you get the hang of it:

[bezier.method.ac](http://bezier.method.ac/)

You can also develop your Bézier skills using [Inkscape](https://inkscape.org/) (free), Illustrator, or some similar vector graphics drawing software.

## Vertices

You can think of vertices like the dots in a connect-the-dots style drawing puzzle. A triangle requires three vertices; a pentagon, five; and so forth. By connecting vertices together using lines and curves, the shape possibilities become limitless. A *vertex* (singular) is not limited to two-dimensional space -- for example, Blender's Suzanne (a monkey head) has around five-hundred vertices positioned in 3D space:

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-blender.png" class="fullwidth" />
  <figcaption>Four &ndash; of the five-hundred, or so &ndash; vertices circled in green.</figcaption>
</figure>

Create a new sketch and save it as "vertices". Within the new vertices folder, add a "data" folder containing the <a href="{{ site.url }}/img/pitl02/grid.png">grid.png</a> from your last sketch.

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-data-folder.png" />
</figure>

{% highlight py %}
size(800,800)
grid = loadImage('grid.png')
image(grid, 0, 0)
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

Now draw a square using vertices:

{% highlight py %}
...
strokeWeight(3)

beginShape() # begins recording vertices for a shape ...
vertex(100,100)
vertex(200,100)
vertex(200,200)
vertex(100,200)
endShape()   # stops recording
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-square.png" />
</figure>

The `beginShape()` and `endShape()` functions should be self-explanatory. However, the shape will not automatically close unless you use `endShape(CLOSE)`. There are also various parameters one can provide the `beginShape()` function to determine how the vertices are connected, if at all:

{% highlight py %}
...
strokeWeight(3)

beginShape(POINTS) # begins recording vertices for a shape ...
...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-beginshape.png" />
  <figcaption>Left: <code>beginShape(POINTS)</code>; right: <code>beginShape(LINES)</code></figcaption>
</figure>

There are a few other `beginShape()` parameters, for which you can consult the [reference](http://py.processing.org/reference/beginShape.html).

### Bézier Vertices

The `bezierVertex()` function allows one to create curved lines. There is also a [`curveVertex()`](http://py.processing.org/reference/curveVertex.html) for Catmull-Rom-type curves, but this lesson will focus on the Bézier kind, as these allow for greater control and more graceful curves.

The `bezierVertex()` function takes the following arguments, expanded across multiple lines here for easier comprehension:

{% highlight py %}
bezierVertex(
  control_point_1_x, control_point_1_y,
  control_point_2_x, control_point_2_y,
  anchor_point_x, anchor_point_y
)
{% endhighlight %}


<a href="{{ site.url }}/img/pitl02/vertices.png">vertices.png</a>

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices.png" />
  <figcaption>Left: <code>beginShape(POINTS)</code>; right: <code>beginShape(LINES)</code></figcaption>
</figure>



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

* https://vimeo.com/106757336
