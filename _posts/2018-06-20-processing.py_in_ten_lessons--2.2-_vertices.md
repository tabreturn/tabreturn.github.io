---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 2.2: Vertices"
categories: processing python
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

## Vertices

You can think of vertices as the dots in a connect-the-dots style drawing puzzle. A triangle requires three vertices; a pentagon, five; a five-pointed star (★), ten; and so forth. By connecting vertices using lines and curves, the shape possibilities become limitless. A *vertex* (singular) is not limited to two-dimensional space -- for instance, Blender's Suzanne (a monkey head) has around five-hundred vertices positioned in 3D space.

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-blender.png" class="fullwidth" />
  <figcaption>Four &ndash; of the five-hundred, or so &ndash; vertices circled in green.</figcaption>
</figure>

Create a new sketch and save it as "vertices". Within the new vertices folder, add a "data" folder containing the <a href="{{ site.url }}/img/pitl02/grid.png" download>grid.png</a> file from your last sketch.

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

The `beginShape()` and `endShape()` functions should be self-explanatory. But, the shape will not automatically close unless you use `endShape(CLOSE)`. However, an active `fill()` will fill a shape however it can:

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-fill.png" class="fullwidth" />
</figure>

There are also various parameters one can provide the `beginShape()` function to determine how the enclosed vertices are connected, if at all:

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

For other `beginShape()` parameters, consult the [reference](http://py.processing.org/reference/beginShape.html).

### Bézier Vertices

The `bezierVertex()` function allows one to create curved shape lines. There's also a [`curveVertex()`](http://py.processing.org/reference/curveVertex.html) for Catmull-Rom-type curves, but lesson 2 will focus on the Bézier type, as these allow for greater control and more graceful curves.

The `bezierVertex()` function takes the following arguments, expanded across multiple lines here for easier comprehension:

{% highlight py %}
bezierVertex(
  control_point_1_x, control_point_1_y,
  control_point_2_x, control_point_2_y,
  vertex_point_2_x, vertex_point_2_y
)
{% endhighlight %}

To get a better grip on how this function works, we'll work toward completing the remaining shapes depicted below. The <span style="color:#0099FF">pale blue</span> lines/circles provide a visual indication of where the handles and control-points lie (so there's no need to recreate them).

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices.png" />
</figure>

You'll be referencing this image repeatedly through this section. It may be useful to <a href="{{ site.url }}/img/pitl02/vertices-s-bend.png" download>save a copy</a> and open a preview of it alongside your Processing editor.

#### S-Bend

The S-bend is comprised of two vertices, both of which are attached to control points. Of course, this is a curve, so you could draw it using a `bezier()` function. However, the purpose of this section is to introduce shapes. Within a `beginShape()`, you can mix `bezierVertex()`, `curveVertex()` and `vertex()` however necessary. But, the first time a `bezierVertex()` is used, it must be prefaced with a `vertex()`. Begin a new shape and place the first (in this case, upper) vertex:

{% highlight py %}
...
endShape(CLOSE)

beginShape()
vertex(400,200) # starting (upper) vertex
endShape()
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-vertex.png" />
  <figcaption>As there's no second vertex with which to form a line, the isolated vertex appears as a point.</figcaption>
</figure>

Now add the second vertex using `bezierVertex()`:

{% highlight py %}
...
endShape(CLOSE)

beginShape()
vertex(400,200) # starting (upper) vertex
bezierVertex(
  300,300, # control point for the starting vertex
  500,500, # control point for the second (lower) vertex
  400,600  # second (lower) vertex coordinates
)
endShape()
{% endhighlight %}

I'll admit, it's a bit confusing. But, with the positions of the vertices presented for you in the reference image, it's really just a matter of writing in the correct sequence of coordinates.

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-s-bend.png" />
  <figcaption>Completed S-bend.</figcaption>
</figure>

#### Heart

You can think of the heart shape as two lines connecting two vertices. To begin, draw one half of the shape:

{% highlight py %}
  ...
)
endShape()

beginShape()
vertex(600,400)
bezierVertex(420,300, 550,150, 600,250)
endShape()
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-heart.png" />
  <figcaption>Half-complete heart shape.</figcaption>
</figure>

All that's left for you to do is complete the right-half of the heart. Add a second `bezierVertex()` line and fill-in the arguments:

{% highlight py %}
beginShape()
vertex(600,400)
bezierVertex(420,300, 550,150, 600,250)
bezierVertex(___,___, ___,___, 600,400)
endShape()
{% endhighlight %}

#### Chinese Coin

Round metal coins with square holes in the centre were first introduced in China many centuries ago. The violet-filled shape resembles such a coin, albeit with none of the relief/engraving. Its form requires that one shape be subtracted from another. Processing provides the `beginContour()` and `endContour()` functions for this purpose.

The first challenge is the outer circle. The contour functions are used within a `beginShape()` and `endShape()`, so using an `ellipse` function is not an option. However, circles can be drawn using Bézier curves:

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-bezier-circle.png" />
  <figcaption>An Inkscape circle object converted to a path, indicating how Bézier curves are positioned to form a circle.</figcaption>
</figure>

You can begin by forming a circle using a diamond shape:

{% highlight py %}
...

beginShape()
vertex(100,600)
vertex(200,500)
vertex(300,600)
vertex(200,700)
vertex(100,600)
endShape()
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-coin-diamond.png" />
</figure>

With your vertices in place, you can now convert the `vertex()` functions to `bezierVertex()` functions. Remember, though: the first point must be a `vertex()`.

{% highlight py %}
...

beginShape()
vertex(100,600)
bezierVertex(___,___, ___,___, 200,500) # vertex(200,500)
bezierVertex(___,___, ___,___, 300,600) # vertex(300,600)
bezierVertex(___,___, ___,___, 200,700) # vertex(200,700)
bezierVertex(___,___, ___,___, 100,600) # vertex(100,600)
endShape()
{% endhighlight %}

To save you having to workout where the control points lie, here are the missing arguments:

{% highlight py %}
bezierVertex(100,545, 145,500, 200,500)
bezierVertex(255,500, 300,545, 300,600)
bezierVertex(300,655, 255,700, 200,700)
bezierVertex(145,700, 100,655, 100,600)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-coin-circle.png" />
</figure>

With the circle in place, you can go about removing a square from the middle. This is a relatively straightforward exercise, but there's one crucial thing to be aware of: one must use *reverse winding* for the subtracted shape. Read through the circle code again and notice how all of the vertices are plotted in a clockwise manner; this means that the *square*'s vertices must be plotted counter-clockwise, i.e. opposite to the winding of the shape from which it will subtract.

Place the square's vertices within a `beginContour()` and `endContour()` function. Of course, you cannot observe the effect unless you add a fill:

{% highlight py %}
fill('#6633FF')
beginShape()
vertex(100,600)
bezierVertex(100,545, 145,500, 200,500)
bezierVertex(255,500, 300,545, 300,600)
bezierVertex(300,655, 255,700, 200,700)
bezierVertex(145,700, 100,655, 100,600)
beginContour()
vertex(180,580)
vertex(180,620)
vertex(220,620)
vertex(220,580)
endContour()
endShape()
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-contour.png" />
</figure>

## Bézier Task

Time for a challenge!

Create a new sketch and save it as "bezier_task". Within the sketch's folder, create a "data" sub-folder and add a copy of the grid.png, along well as this image file:

<a href="{{ site.url }}/img/pitl02/beziers.png" download>beziers.png</a>

Add the following setup code:

{% highlight py %}
size(800,800)
grid = loadImage('grid.png')
beziers = loadImage('beziers.png')
image(grid, 0, 0)
image(beziers, 0, 0)
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

When you run the sketch, you'll see four Bézier curves. Recreate them using `bezierVertex()`.

<figure>
  <img src="{{ site.url }}/img/pitl02/beziers-start.png" />
</figure>

The curves need not be pixel-perfect replicas, as this is just something to get you used to working with them.

<p style="text-align:right" markdown="1">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
