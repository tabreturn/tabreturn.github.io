---
layout: post
comments: false
title: "Processing.py in Ten Lessons -- 02: Bézier, Catmull, and Rom walk into a bar ..."
categories: code processing python
---

***Covered in this lesson:***  
<a href="#curves"><em>Curves</em></a> /
<a href="#vertices"><em>Vertices</em></a> /
<a href="#strings"><em>Strings</em></a> /
<a href="#typography"><em>Typography</em></a>

---
&nbsp;  
[Lesson 01]({% post_url 2018-06-12-processing.py_in_ten_lessons--01-_hello_world %}) introduced a number of 2d primitives, namely: arcs, ellipses, lines, points, quads, rectangles, and triangles. However, many shapes do not fit into any such category -- like hearts (♥), stars (★), octagons, and Pikachu silhouettes, to name just a few. In this tutorial, you will look at drawing with points and curves, as opposed to more restrictive shape functions. Fonts also rely on curves to describe each glyph, and the latter part of this tutorial delves into Typography (and by extension, strings). Be forewarned: this lesson may be a little tedious, but is necessary to lay down important programming and drawing fundamentals for future lessons.

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

Processing deals with two types of curves: *Bézier* and *Catmull-Rom*. Both are named after the people who developed them, and both involve some complicated math. Fortunately, the complex underlying calculus is handled by Processing's various curve functions, leaving you to deal with just the coordinates of a few control points.

## Curves

The best way to grasp curves is to draw a few, then manipulate their control points. Create a new sketch and save it as "curves". This section will be coordinate-intensive; so, to make things easier, download this "grid.png" file:

<a href="{{ site.url }}/img/pitl02/grid.png" download>grid.png</a>

Additional sketch assets (images, fonts, and other media) always belong in a sub-folder named "data". Create a new data folder within your curves sketch now and place the grid.png within it:

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-data-folder.png" />
  <figcaption>Note that the assets sub-folder is always named "data".</figcaption>
</figure>

Frustratingly, many operating systems hide file extensions -- that is, the `.png` part of the file. However, if you dig around in your [Windows](https://support.microsoft.com/en-nz/help/4479981/windows-10-common-file-name-extensions) or Mac Finder settings, you can get extensions to show in your file manager.

This grid will lie beneath everything you draw, assisting you in gauging x/y-coordinates. Setup your sketch using the following code:

{% highlight py %}
size(500,500)
grid = loadImage('grid.png')
image(grid, 0, 0)
noFill()
strokeWeight(3)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-grid.png" />
</figure>

Note that it is essential to include the file extension (`'grid.png'`) when referencing the image file.

### Catmull-Rom Splines

The Processing `curve()` function is an implementation of Catmull-Rom splines (named after Edwin Catmull and Raphael Rom). Once visualised, the operation of these curves is intuitive.

Add a diagonal line to your "curves" sketch:

{% highlight py %}
...

stroke('#0099FF') # pale blue
line(100,100, 400,400)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line.png" />
</figure>

A line is drawn between the pairs of x/y coordinates specified, corresponding to the relevant lines on the grid. Now comment out the `line()` function and replace it with a `curve()`:

{% highlight py %}
stroke('#0099FF') # pale blue
#line(100,100, 400,400)
curve(0,0, 100,100, 400,400, 500,500)
{% endhighlight %}

The visual result is exactly the same. If you study the `curve()` arguments, you will notice that the four middle values match those of the `line()`:

<code>#line(<b>100,100, 400,400</b>)</code>  
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

In this instance, the control point coordinates have been tweaked -- resulting in a yellow curve with a slight S-bend:

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line-curved.png" />
  <figcaption>The green (semi-)circles indicate the control point coordinates (<code>0,250</code>) and (<code>500,250</code>).</figcaption>
</figure>

Now for the part where it all makes sense! To provide a clearer idea of how the control points work, add the following code:

{% highlight py %}
...

stroke('#FF9900') # orange
# control point 1:
curve(0,250, 0,250, 100,100, 400,400)
# control point 2:
curve(100,100, 400,400, 500,250, 500,250)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/curves-line-control-points.png" />
</figure>

With the control point curves visualised, it should be evident how these determine the direction and amount of curvature. If you have ever used a flexible curve, this will look familiar. If you're interested to know how smooth curves were ever drawn without computers, then [look these up](https://en.wikipedia.org/wiki/Flat_spline).

The `curveTightness()` function determines how the curve fits, as if you were replacing it with a less/more elastic material. The function accepts values ranging from `-5.0` to `5.0`, with `0` being the default. To experiment, add a `curveTightness()` line above the `stroke('#FFFF00')`, so as to affect all of the curves beneath it.

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

French engineer, Pierre Bézier popularised, but did not create the Bézier curve. He used them in his of design automobile bodies at Renault, devising a system whereby the shape of a curve is controlled by series of anchor and control points. If you have any experience with vector graphics drawing software, these will look familiar. Popular such applications include Adobe Illustrator and Inkscape, where Bézier curves are commonly referred to as "paths".

<figure>
  <img src="{{ site.url }}/img/pitl02/bezier-inkscape.png" />
  <figcaption>Inkscape in path-editing mode.</figcaption>
</figure>

Bézier curves are widely used in computer graphics. Their ability to model smooth curves makes them fundamental to vector graphics, animation paths, and fonts. Vector graphics (such as SVG files) can scale to any size -- making them *resolution-independent*. Consider a digital photograph: as you zoom further and further in toward a given point, discernible squares of colour appear. Popular photographic file formats, such as JPG and PNG, are comprised of a pixel grid, the dimensions of which limit the overall resolution. However, in the case of vector-based graphics, the points along a Bézier curve can be recalculated to fit any resolution.

<figure>
  <img src="{{ site.url }}/img/pitl02/bezier-raster-vector.png" class="fullwidth" />
  <figcaption>Left: editing a vector version of the Twitter logo in Adobe Illustrator. Right: editing a JPG version of the same logo in Photoshop.</figcaption>
</figure>

The `bezier()` function takes the following arguments, expanded across multiple lines here for easier comprehension:

{% highlight py %}
bezier(
  vertex_point_1_x, vertex_point_1_y,
  control_point_1_x, control_point_1_y,
  control_point_2_x, control_point_2_y,
  vertex_point_2_x, vertex_point_2_y
)
{% endhighlight %}

Yikes! That's a lot of arguments. Add some code to draw a Bézier curve, but use four variables to represent the control points:

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
  <figcaption>A straight, pale pink Bézier 'curve'.</figcaption>
</figure>

Notice how all of the `cp__` variables reference the centre of the display window (`250, 250`), meaning that all of the control points currently lie where the yellow and pale pink lines cross. To visualise how the curve is manipulated, add a red line connecting the first vertex and control point. Adjust the `cp1y` variable to add some curve:

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
  <figcaption>The vertex and control points circled in green.</figcaption>
</figure>

The `bezier()` and `line()` functions now share the control point's x/y-coordinates. Making any adjustments to `cp1y` and `cp1x`, therefore, affects both functions. Add another red line to connect the lower/second vertex and control point:

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

Observe how the red handles 'magnetically' draw the line toward the control point. Getting the hang of where to place the vertex- and control points for any desired curve takes some practice. Perhaps try the *Bézier Game* to hone your skills:

[bezier.method.ac](http://bezier.method.ac/)

You can also develop your Bézier skills using [Inkscape](https://inkscape.org/) (free), Illustrator, or other similar vector graphics drawing software. It is usually easier to draw shapes using such software, then gauge the relevant control points for Processing -- which is how the tasks for this tutorial were devised ;)

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

The `bezierVertex()` function allows one to create curved shape lines. There is also a [`curveVertex()`](http://py.processing.org/reference/curveVertex.html) for Catmull-Rom-type curves, but this lesson will focus on the Bézier type, as these allow for greater control and more graceful curves.

The `bezierVertex()` function takes the following arguments, expanded across multiple lines here for easier comprehension:

{% highlight py %}
bezierVertex(
  control_point_1_x, control_point_1_y,
  control_point_2_x, control_point_2_y,
  vertex_point_2_x, vertex_point_2_y
)
{% endhighlight %}

To get a better grip on how this function works, we'll work toward completing the remaining shapes depicted below. The <span style="color:#0099FF">pale blue</span> lines/circles provide a visual indication of where the handles and control-points lie (so there is no need to recreate them).

<figure>
  <img src="{{ site.url }}/img/pitl02/vertices.png" />
</figure>

You will be referencing this image repeatedly through this section. It may be useful to <a href="{{ site.url }}/img/pitl02/vertices-s-bend.png" download>save a copy</a> and open a preview of it alongside your Processing editor.

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

All that is left for you to do is complete the right-half of the heart. Add a second `bezierVertex()` line and fill-in the arguments:

{% highlight py %}
beginShape()
vertex(600,400)
bezierVertex(420,300, 550,150, 600,250)
bezierVertex(___,___, ___,___, 600,400)
endShape()
{% endhighlight %}



#### Chinese Coin

Round metal coins with square holes in the centre were first introduced in China many centuries ago. The violet-filled shape resembles such a coin, albeit with none of the relief/engraving. Its form requires that one shape be subtracted from another. Processing provides the `beginContour()` and `endContour()` functions for this purpose.

The first challenge is the outer circle. The contour functions are used within a `beginShape()` and `beginShape()`, so using an `ellipse` function is not an option. However, circles can be drawn using Bézier curves:

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

With the circle in place, you can go about removing a square from the middle. This is a relatively straightforward exercise, but there is one crucial thing to be aware of: one must use *reverse winding* for the subtracted shape. Read through the circle code again and notice how all of the vertices are plotted in a clockwise manner; this means that the *square*'s vertices must be plotted counter-clockwise, i.e. opposite to the winding of the shape from which it will subtract.

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

When you run the sketch, you will see four Bézier curves. Recreate them using `bezierVertex()`.

<figure>
  <img src="{{ site.url }}/img/pitl02/beziers-start.png" />
</figure>

The curves need not be pixel-perfect replicas, as this is just something to get you used to working with them.

## Strings

Before looking at Processing's functions for drawing text, an introduction to *strings* is required. This section covers some essential Python string operations.

In programming terminology, text is referred to as string data. More correctly, on could refer to a string as a series of characters. You have already encountered this data type in lesson 01, and know that strings are to be wrapped in quotation marks. One may use single- or double-quotes, but always ensure that you close-off using the same type with which you opened.

Create a new sketch and save it as "strings". Add the following code to get started:

{% highlight py %}
size(500, 500)
background('#004477')

hello = 'hello world'
print(hello)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/string-hello-world.png" class="fullwidth" />
  <figcaption>The print function writes "hello world" to the Console area</figcaption>
</figure>

Add another string variable:

```
...
whatsup = 'what's up!'
```

Because of the apostrophe in `what's`, the string is closed before the `s`, leaving a dangling third quote with no closing counterpart. Run the sketch and observe the error message:

<figure>
  <img src="{{ site.url }}/img/pitl02/string-quote-error.png" class="fullwidth" />
</figure>

There are a few ways to fix this. One can opt for double quotation marks:  
`whatsup = "what's up!"`  
or *escape* the apostrophe character using a backslash:  
`whatsup = 'what\'s up!`  

Amend your `whatsup` variable, and add another line using nested single- and double-quotes:

{% highlight py %}
...
whatsup = "what\'s up!"
question = 'is your name really "world"?'
print(whatsup)
print(question)
{% endhighlight %}

### Concatenation and Formatting

The `+` operator performs arithmetic addition on numbers (integers and floats). However, it becomes a concatenation operator when provided string operands. To *concatenate* means to connect together, or link, in a series or chain. Try this example:

{% highlight py %}
...

all = hello + whatsup + question
print(all)
{% endhighlight %}

This displays the following line in the Console:

`hello worldwhat's up!is your name really "world"?`

Note how concatenating joins strings together exactly as they are defined, with no additional space characters. Spaces -- along with any other punctuation you desire -- must be explicitly included. Edit your code:

{% highlight py %}
hello + '. ' + whatsup + ' ' + question
print(all)
{% endhighlight %}

The Console now displays:

`hello world. what's up! is your name really "world"?`

An alternative to concatenating is string formatting, for which Python provides the `%` operator. This works by substituting placeholder symbols with the relevant string values, as opposed to chaining them together in a sequence with other characters. As an example, here is the same line constructed using the `%` operator:

`all = ('%s. %s %s') % (hello, whatsup, question)`

This approach has its advantages, but for this lesson, we'll stick to the concatenate operator (`+`). For more on this string formatting, consult the [reference](http://py.processing.org/reference/string_formatting.html).

What follows below are descriptions for several string manipulation functions and methods, along with some code that you can add to your working sketch. Feel free to experiment with the arguments to see how things respond. Each demonstration acts on the `all` variable which, to restate, now represents:

`hello world. what's up! is your name really "world"?`

### Length

The `length` function returns the total number of characters of any string within the parentheses.

{% highlight py %}
print( len(all) )  # displays total number of characters (52)
{% endhighlight %}

### Slice Notation

Python slice notation (`[]`) provides a simple, yet powerful means of extracting characters from strings. Add this basic example to your code:

{% highlight py %}
print( all[0] )    # displays the first character (h)
{% endhighlight %}

The position (*index*) of the character you intend to retrieve is placed within the square brackets. Take note that the indexing system is *zero-based*, meaning that the character indices begin at `0` (and not `1`).

{% highlight py %}
print( all[1] )    # displays character at index 1 (e)
print( all[4] )    # displays character at index 4 (o)
{% endhighlight %}

A colon (`:`) can be used to specify a range of characters. It operates in a few different ways. Add a number to the right of it, and it will return all of the characters *up to but not including* the specified index:

{% highlight py %}
print( all[:4] )   # displays: hell
{% endhighlight %}

Add numbers to both the left and right of the colon, and it will return all of the characters beginning at the left index up to, but not including, the right:

{% highlight py %}
print( all[1:4] )  # displays: ell
{% endhighlight %}

A single value to the left of the colon returns everything from the given index to the end of the string:

{% highlight py %}
print( all[4:] )   # displays: o world...
{% endhighlight %}

You may also include negative values:

{% highlight py %}
'''
[:-x] returns everything from index 0
up to but not including the fourth last character
'''
print( all[:-4] )  # ...our name really "wor

'''
[-x:] returns everything from the fourth last character
to the end of the string
'''
print( all[-4:] )  # ld"?

'''
[x:-y] returns everything from index 4
up to but not including the fourth last character
'''
print( all[4:-4] ) # o world. ...eally "wor
{% endhighlight %}

There are a few other ways in which the colon operator can slice strings, but these should be sufficient for now.

You will reencounter this notation in future lessons dealing with lists and dictionaries.

### String Methods

A Python *method* looks and behaves much like a function. With no knowledge of object-oriented programming, it's difficult to explain exactly why methods are methods. However, all that you need to understand for now is the syntactical differences between the two, i.e. how you write a method versus a function. To contrast the two approaches -- take the length function as an example:  
`len(all)`  
Were the length function a method, it would be instead be written as:  
`all.len()`  
Of course, `len()` is not a method, so this would result in an error. What is important to note, however, is how the method begins with a period (`.`) and is appended to the variable.

What follows below are descriptions for several string methods, along with some code to add to your working sketch. Each example builds on the code before it, so you'll need to work through all of them, entering each line as you progress.

#### `.upper()`
<dd markdown="1">
Returns a version of the string with all lowercase characters converted to uppercase.

{% highlight py %}
print( all.upper() )         # HELLO WO...Y "WORLD"?
{% endhighlight %}
</dd>

#### `.title()`
<dd markdown="1">
Returns a version of the string in title case (the first letter of each word in uppercase).

{% highlight py %}
print( all.title() )         # Hello Wo...y "World"?
{% endhighlight %}
</dd>

#### `.count()`
<dd markdown="1">
Returns the total of times the character/character-sequence appears in the given string.

{% highlight py %}
print( all.count('o') )      # 4
print( all.count('or') )     # 2
{% endhighlight %}
</dd>

#### `.find()`
<dd markdown="1">
Returns the index of where the term (first) appears in the string. If the substring is not found, returns `-1`.

{% highlight py %}
print( all.find('world') )   # 6
print( all.find('lemon') )  # -1
{% endhighlight %}

If the term appears multiple times, one can provide a second argument indicating the index from which the search should begin:

{% highlight py %}
print( all.find('world'),7 ) # 45
{% endhighlight %}

A third argument can be provided to indicate where along the string the search terminates.
</dd>

## String Task

Time for a challenge!

Using just the `all` variable, produce a Console output that reads:

`Hello. What is your name?`

To start you off, here is a snippet of the solution:

{% highlight py %}
print( all[0:5].title() + ...
{% endhighlight %}

To successfully complete the task, you will need to combine various string methods.

## Typography

With a good grasp of strings, you can move onto displaying text in the display window.

*Typography* refers to the arranging and styling of text (or, more correctly, *type*) to make it more legible, readable, and aesthetically appealing. Typographical treatment can truly make or break a design. Headings work best if they stand-out from the rest of your text; letter-spacing should be tighter than word-spacing; cursive fonts are not ideal for road signs.

### Fonts

Early computer fonts were pixel-based, which required variant glyph sets for each font-size. However, modern fonts are vector-based, which is why you can scale text as large as you like without encountering any pixelation. Fonts must be loaded into Processing, but there is a default *sans-serif* font should you not load any.

If you are unfamiliar with font classifications, *serifs* are the small lines attached to the tips of characters. By prefixing a term with "Sans", one implies an absence of whatever follows it; hence a *sans-serif* fonts have no serifs.

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-font-types.png" />
</figure>

Monospaced fonts may also be serifed, but what defines them is how each character occupies the same amount of horizontal space. To make text more legible, (variable-width) fonts include metrics to specify how far a given character should sit from any neighbours. For example, having an "i" and "m" character occupy the same size container results in some awkward spacing issues -- which many monospaced fonts attempt to resolve by adding enlarged serifs to the "i" and cramping the "m":

*monospaced*  
`mmm`  
`iii`

*variable-width*  
mmm  
iii

That said, monospace fonts are more legible in certain situations -- for instance, when it is helpful to have characters line-up in columns:

*monospaced*  
`sam | jan | amy | tim`  
`99  | 359 | 11  | 3`

*variable-width*  
sam       | jan | amy      | tim  
99&nbsp;  | 359 | 11&nbsp; | 3

This makes monospaced fonts preferable for source code, which is why the default font for the Processing editor (and every other code editor) is monospace.

### Typography Sketch

Create a new sketch and save it as "typography". Setup your sketch using the following code:

{% highlight py %}
size(500, 500)
background('#004477')
fill('#FFFFFF')
stroke('#0099FF')
strokeWeight(3)
{% endhighlight %}

Now add a string variable (note: the line must not wrap):

{% highlight py %}
razor = 'Never attribute to malice that which is adequately explained by stupidity.'
{% endhighlight %}

When you run the sketch, an empty blue display window appears. What follows below are descriptions for several typographic functions, along with some code to add to your working sketch. Feel free to experiment with the arguments to see how things respond.

### `text()`
<dd markdown="1">
Draws text to the display window, the colour of which is determined by the active `fill()`. The arguments represent the string value, x-coordinate, and y-coordinate respectively. Additional third and fourth argument can be added to specify a width and height for the text area.  
*Reference link:*  [`text()`](http://py.processing.org/reference/text.html)

{% highlight py %}
text(razor, 0,50)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-text.png" />
</figure>
</dd>

### `textSize()`
<dd markdown="1">
Sets the font size (in pixels) to be used in all subsequent `text()` functions.  
*Reference link:*  [`textSize()`](http://py.processing.org/reference/textSize.html)

{% highlight py %}
textSize(20)
text(razor, 0,50)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textsize.png" />
</figure>
</dd>

### `createFont()`
<dd markdown="1">
Converts a font to the format used by Processing. The two arguments represent the font name and size, respectively. For a list of fonts available on your computer, use `PFont.list()`. You can also place font files (TTF or OTF) in the sketch's "data" directory.  
*Reference link:*  [`createFont()`](http://py.processing.org/reference/createFont.html)

{% highlight py %}
print( PFont.list() )
timesroman = createFont('Times', 20)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-pfontlist.png" class="fullwidth" />
  <figcaption>Printing a list of available fonts using <code>PFont.list()</code></figcaption>
</figure>
</dd>

### `textFont()`
<dd markdown="1">
Sets the font for any subsequent `text()` functions.  
*Reference link:*  [`textFont()`](http://py.processing.org/reference/textFont.html)

{% highlight py %}
...
timesroman = createFont('Times-Roman', 20)
textFont(timesroman)
text(razor, 0,150)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textfont.png" />
</figure>
</dd>

### `textLeading()`
<dd markdown="1">
Sets the line-spacing (in pixels) for any subsequent `text()` functions.  
*Reference link:*  [`textLeading()`](http://py.processing.org/reference/textLeading.html)

{% highlight py %}
textLeading(10)
text(razor, 0,200, 250,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textleading.png" />
</figure>
</dd>

### `textAlign()`
<dd markdown="1">
Sets the text-alignment for any subsequent `text()` functions. Accepts the arguments `LEFT`, `CENTER`, or `RIGHT`.  
*Reference link:*  [`textAlign()`](http://py.processing.org/reference/textAlign.html)

{% highlight py %}
textAlign(RIGHT)
text(razor, 0,250, 250,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textalign.png" />
</figure>
</dd>

### `textWidth()`
<dd markdown="1">
Calculates and returns the width of any string.  
*Reference link:*  [`textWidth()`](http://py.processing.org/reference/textWidth.html)

{% highlight py %}
textAlign(LEFT)
hanlons = '- Hanlon\'s'
razor = 'razor'
text(hanlons + ' ' + razor, 0,350)
line(
  textWidth(hanlons), 0,
  textWidth(hanlons), height
)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textwidth.png" />
</figure>
</dd>

## Apple Logo Task

Here is the final challenge before moving onto lesson 03.

The first incarnation of the iconic apple logo was rainbow-coloured (although the bands are incorrectly ordered). One common rumour around the bite involves computer pioneer, Alan Turing -- a man who is widely considered to be the father of theoretical computer science and artificial intelligence. Among his many accomplishments, Turing managed to crack the Enigma cypher used to encrypt Nazi communications during World War II. When authorities discovered in 1952 that he was gay, Turing was forced to undergo hormonal treatment. Two years later he was found dead, having committed suicide by biting into a poisoned apple.

You will recreate the logo in Processing, such that the final result looks this:

<figure>
  <img src="{{ site.url }}/img/pitl02/apple.png" />
  <figcaption>
    The Apple Computer rainbow colour logo, in use from 1977&ndash;1999.<br />
    Rob Janoff [Public domain], <a href="https://commons.wikimedia.org/wiki/File:Apple_Computer_Logo_rainbow.svg">via Wikimedia Commons</a>
  </figcaption>
</figure>

Create a new sketch and save it as "apple_logo". Within a "data" sub-folder, add the grid.png image, along with this apple.png file:

<a href="{{ site.url }}/img/pitl02/apple.png" download>apple.png</a>

Add the following code to get things started:

{% highlight py %}
size(800,850)
background('#004477')

grid = loadImage('grid.png')
image(grid, 0, 0)
logo = loadImage('apple.png')
image(logo, 0, 0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/apple-start.png" />
</figure>

To assist you in approximating the positions of the anchor and control points, here is an image split into an in-progress and complete version:

<figure>
  <img src="{{ site.url }}/img/pitl02/apple-clue.png" />
  <figcaption>In progress (left) and complete version (right).</figcaption>
</figure>

Notice how straight-line connections between pairs of control points ensure smooth curves along the perimeter of the apple. Conversely, the leaf handles are bent in different directions resulting in a sharp tip.

## Lesson 03

That's it for lesson 02. I hope it was enjoyable if a little tedious. If you are familiar with any markup languages -- such as HTML, XML, or SVG in particular -- you have probably been cruising through the tutorials thus far. In lesson 03 we'll begin to look at what really separates a programming language from markup; this includes topics like conditional statements and iteration. You will also explore randomness -- one of the most powerful and exciting tools in the creative programmer's tool-set. For now, though, take a break -- you deserve it!

**Begin Lesson 03:** [Control Flow and Randomness]({% post_url 2018-07-01-processing.py_in_ten_lessons--03-_control_flow_and_randomness %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

## References

* http://bezier.method.ac/
* http://py.processing.org/reference/
* https://vimeo.com/106757336
