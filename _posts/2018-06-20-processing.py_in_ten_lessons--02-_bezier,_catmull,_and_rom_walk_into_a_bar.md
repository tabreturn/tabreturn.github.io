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
[Lesson 01]({% post_url 2018-06-12-processing.py_in_ten_lessons--01-_hello_world %}) introduced a number of 2d primitives, namely: arcs, ellipses, lines, points, quads, rectangles, and triangles. However, many shapes do not fit into any of these categories -- to name just a few: hearts (♥), stars (★), octagons, ... and duck silhouettes. In this lesson you will look at drawing with points and curves, as opposed to more restrictive shape functions.

Processing deals with two types of curves: *Bézier* and *Catmull-Rom*. Both are named after the people who developed them and both involve some complicated math. Fortunately, the complex calculus is handled by the various curve functions, leaving you to deal with the coordinates of a few control points.

## Curves

The best way to grasp curves is to draw a few, then manipulate their control points. Create a new sketch and save it as "curves". This section will be coordinate-intensive; so, to make things easier, download this "grid.png" file and save/move it to a sub-folder within your sketch named "data":

<a href="{{ site.url }}/img/pitl02/grid.png" download>grid.png</a>

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

French engineer, Pierre Bézier popularised, but did not actually create the Bézier curve. He used them in his of design automobile bodies at Renault, devising a system whereby the shape of a curve is controlled by series of anchor and control points. If you have any experience with vector graphics drawing software, these will look familiar. Popular such applications include Adobe Illustrator and Inkscape, where Bézier curves are commonly referred to as "paths".

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
  vertex_point_1_x, vertex_point_1_y,
  control_point_1_x, control_point_1_y,
  vertex_point_2_x, vertex_point_2_y,
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

Notice how all of the `cp__` variables reference the centre of the display window (`250, 250`), meaning that all of the control points currently lie where the yellow and pale pink line cross. To visualise how the curve is manipulated, add a red line connecting the first vertex and control point. Adjust the `cp1y` variable to add some curve:

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
  <figcaption>The vertex and control points are indicated in green.</figcaption>
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

Observe how the red handles 'magnetically' draw the line toward the control point. Getting the hang of where to place the vertex- and control points for a desired curve takes some practice. Perhaps try the Bézier Game to help you get the hang of it:

[bezier.method.ac](http://bezier.method.ac/)

You can also develop your Bézier skills using [Inkscape](https://inkscape.org/) (free), Illustrator, or some similar vector graphics drawing software. It is usually easier to draw shapes using such software, then reference the relevant control points. This is how the tasks for this lesson were devised.

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

The `beginShape()` and `endShape()` functions should be self-explanatory. However, the shape will not automatically close unless you use `endShape(CLOSE)`. However, an active `fill()` will fill a shape however it can:

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-fill.png" class="fullwidth" />
</figure>

There are also various parameters one can provide the `beginShape()` function to determine how the vertices are connected, if at all:

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
  vertex_point_x, vertex_point_y
)
{% endhighlight %}

To get a better grip on how this works, we'll work toward completing the remaining shapes depicted below. The <span style="color:#0099FF">pale blue</span> lines/circles provide a visual indication of where the handles and control-points lie (so there is no need to recreate them).

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices.png" />
</figure>

You will be referencing this image repeatedly in this section. It may be useful to <a href="{{ site.url }}/img/pitl02/vertices-s-bend.png" download>save a copy</a> and open a preview of it alongside your Processing editor.

#### S-Bend

The S-bend is comprised of two vertices, both of which are attached to control points. When using a `bezierVertex()`, the starting point is always a `vertex()`. In fact, one can mix `bezierVertex()`, `curveVertex()` and `vertex()` however necessary to complete a shape. Begin a new shape and place the starting (in this case, upper) vertex:

{% highlight py %}
...
endShape(CLOSE)

beginShape()
vertex(400,200) # starting (upper) vertex
endShape()
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-vertex.png" />
  <figcaption>As there is no second vertex with which to form a line, the isolated vertex appears as a point.</figcaption>
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

I'll admit, it's a bit confusing. But, with the positions of the vertices layed-out for you in the reference image, it's really just a matter of writing the coordinates into the correct sequence of arguments.

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-s-bend.png" />
  <figcaption>Completed S-bend.</figcaption>
</figure>

#### Heart

You can think of the heart shape as two lines connecting two vertices. To begin, draw one half:

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
  <figcaption>Half completed heart shape.</figcaption>
</figure>

All that is left for you to do is complete the right-half of the heart. Add a second `bezierVertex()` line and fill-in the arguments:

{% highlight py %}
beginShape()
vertex(600,400)
bezierVertex(420,300, 550,150, 600,250)
bezierVertex(___,___, ___,___, 600,400)
endShape()
{% endhighlight %}



#### Chinese Coin

Round metal coins with square holes in the centre were first introduced in China many centuries ago. The purple-filled shape resembles one, albeit with none of the relief/engraving. Its form requires that one shape be subtracted from another. Processing provides the `beginContour()` and `endContour()` for this purpose.

The first challenge is the circle shape. The contour functions are used within a `beginShape()` and `beginShape()`, so using an `ellipse` function is not an option. However, circles can be drawn using Bézier curves:

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-bezier-circle.png" />
  <figcaption>An Inkscape circle object converted to a path.</figcaption>
</figure>

You can begin by forming a circle using a diamond shape:

{% highlight py %}
...
bezierVertex(650,150, 780,300, 600,400)
endShape()

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

With your vertices in place, you can convert the `vertex()` functions to `bezierVertex()` functions. Remember, though, that the first point must be a `vertex()`:

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

And to save you having to workout where the control points lie, here are the missing arguments:

{% highlight py %}
bezierVertex(100,545, 145,500, 200,500)
bezierVertex(255,500, 300,545, 300,600)
bezierVertex(300,655, 255,700, 200,700)
bezierVertex(145,700, 100,655, 100,600)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices-coin-circle.png" />
</figure>

With the circle in place, you can go about removing a square from the middle. This is a fairly simple exercise, but there is one crucial thing to be aware of: one must use *reverse winding* for the subtracted shape. Read through the circle code again and notice how all of the the vertices are plotted in a clockwise manner. This means that the square's vertices must be plotted counter-clockwise, i.e. opposite to the winding of the shape from which it will subtract. The square's vertices must also be placed within `beginContour()` and `endContour()` function. Of course, you cannot observe the effect unless you add a fill:

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

Create a new sketch and save it as "bezier_task". Within the sketch folder, create a data folder and add a copy of the grid.png file as well as this Béziers image:

<a href="{{ site.url }}/img/pitl02/beziers.png" download>beziers.png</a>

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

There are four Bézier curves to recreate:

<figure>
  <img src="{{ site.url }}/img/pitl02/beziers-start.png" />
</figure>

The curves need not be pixel-perfect replicas, as this is just something to get you used to working with them.

## Text

Before looking at Processing's functions for displaying text, an introduction to *strings* is required. This section covers some common Python string operations.

### Strings

Text is referred to a string data in programming terminology. More correctly, on could refer to a string as a series of characters. You have already encountered this data type in lesson 01, and know that strings must be wrapped in quotation marks -- for which one may use single- or double-quotes, ensuring to close-off using the same type with which you opened.

Create a new sketch and save it as "text". Add the following code to get started:

{% highlight py %}
size(500, 500)
background('#004477')
fill('#FFFFFF')
stroke('#0000FF')
strokeWeight(3)

hello = 'hello world'
print(hello)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/text-hello-world.png" class="fullwidth" />
  <figcaption>The print function writes "hello world" to the Console area</figcaption>
</figure>

Add another string variable:

{% highlight py %}
...
print(hello)
whatsup = 'what's up!'
{% endhighlight %}

Because of the apostrophe in `what's`, the string is closed before the `s`, leaving a rogue third quote with no closing counterpart. Run the sketch to observe the error:

<figure>
  <img src="{{ site.url }}/img/pitl02/text-quote-error.png" class="fullwidth" />
</figure>

There a few ways to fix this. One can opt for double quotation marks:  
`whatsup = "what's up!"`  
or *escape* the character using a backslash:  
`whatsup = 'what\'s up!`  

Amend your `whatsup` variable, and add another example using a alternative quotes:

{% highlight py %}
...
whatsup = "what\'s up!"
question = 'is your name really "world"?'
print(whatsup)
print(question)
{% endhighlight %}

### Concatenation and Formatting

To *concatenate* means to connect or link in a series or chain. The `+` operator performs arithmetic addition on numbers (integers and floats). However, it becomes a concatenation operator when provided string operands.

{% highlight py %}
...
print(question)

all = hello + whatsup + question
print(all)
{% endhighlight %}

This displays the following line in the Console:

`hello worldwhat's up!is your name really "world"?`

Note how the concatenation adds no additional space characters. These will need to be explicitly included (along with any other punctuation you desire):

{% highlight py %}
hello + '. ' + whatsup + ' ' + question
print(all)
{% endhighlight %}

Now displays:

`hello world. what's up! is your name really "world"?`

An alternative to concatenating is string formatting, for which Python provides the `%` operator. This works by substituting placeholder symbols. For example, here is the implementation of your working example:

`all = ('%s. %s %s') % (hello, whatsup, question)`

This approach has its advantages, but for this lesson, we'll stick to the concatenate operator (`+`). To specify if stroke corners and tips should rounded or sharp, consult the reference entry on [`String Formatting`](http://py.processing.org/reference/string_formatting.html).


## Typography

Fonts are vector based ...

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