---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 01: Getting Started"
categories: code processing python
published: false
---

***covered in this lesson:***  
*intro to processing / colour / drawing / variables / arithmetic operators*

---
&nbsp;  
This series of lesson posts covers *Processing.py*, with the purpose of introducing non-programmers to the fundamentals of computer programming in a visual context. If you're an artist, student, designer, researcher, or just somebody who is keen on learning how to code, Processing is a great place to start.

## Intro to Processing

Processing has been around since the early 2000's and is comprised of a programming language, and an editor for writing and compiling code (IDE). The original programming language component is based on Java, but several other variants have been developed. These include a JavaScript ([p5.js](https://p5js.org/)), Ruby ([JRubyArt](https://ruby-processing.github.io/JRubyArt/)), and Python ([Processing.py](http://py.processing.org/)) version.

As somebody teaching programming fundamentals to creative students -- who will proceed to take courses in web, game, and interactive design & development -- combining Processing with Python provides an ideal learning tool. What's more, Processing costs nothing, is open source; and runs on Windows, Mac, and Linux.

### Setup Processing

Before you can write any code, you will need to download Processing. Head-over to the Processing download page, and download the relevant version (Windows/Mac/Linux):

[processing.org/download](https://processing.org/download/)

Run the application. Note that the default mode is "Java". To follow along, you'll need to switch to Python mode.

Click on the down arrow next to "Java" and select **Add Mode...** . Then, from the *Contribution Manager* window, select **Python Mode for Processing 3**. Finally, click **Install**.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/setup-add-python-mode.png" class="fullwidth" />
  <figcaption>Adding/installing Python mode.</figcaption>
</figure>

Once this is complete, you can switch to Python mode.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/setup-switch-to-python-mode.png" class="fullwidth" />
  <figcaption>Switching to Python mode.</figcaption>
</figure>

You are now ready to write your first line of code! If you would like to see examples of some code in action, perhaps take a look through the examples (**File > Examples...**). If you are ready to begin writing your own code, move onto the next section.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/setup-examples.png" class="fullwidth" />
  <figcaption>Use the &#9654; button to run any code.</figcaption>
</figure>

### Hello World

Processing refers to programs as "sketches". Given the visual and artistic nature of what you are likely to produce, it's a fitting term. Create a new sketch by selecting **File > New**, or using the associated keyboard shortcut (which is listed alongside the File menu entry).

### Processing Functions

Type in the following lines of code:

{% highlight py %}
size(500, 500)
print('hello world')
{% endhighlight %}

Using **File > Save as...** save the sketch (to wherever it is you wish to store it) and name it "hello_world". You will notice that each sketch is saved as a new folder. Within this folder are two files: *hello_world.pyde* and *sketch.properties*. You may also add other assets to your sketch folder, such as images and fonts -- but more on that later.

Hit the &#9654; button to execute the code. Better yet, use the associated keyboard shortcut: **Ctrl+R** for Windows; or **&#8984;+R** for Mac.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/hello-world-run.png" class="fullwidth" />
  <figcaption>A grey 500×500 pixels display window (left) appears when you run your sketch.</figcaption>
</figure>

You have used two Processing *functions* here -- `size()` and `print()`. Functions consist of a function name followed by an opening and closing paren (or round bracket, if you prefer). Within these brackets, you supply *arguments*. For example, the `size()` function takes two *arguments*: the first represents the width of your sketch; the second, the height. In this case, the display window is 500 pixels wide by 500 pixels high.

The `print()` function writes to the console area -- the black rectangle at the bottom of the editor. It takes a single argument; in this case, the phrase `'hello world'`. Because this is text -- or more correctly speaking, *string* data -- it must be wrapped in quotation marks. You may use single- or double-quotes, but be sure to close-off using the same type you have opened with.

What separates Processing.py from Python are the functions. The `size()` function is Processing-specific. In other words, it will not work outside of the Processing environment. The `print()` function, on the other hand, is a built-in standard of the Python programming language, and will therefore work in any Processing.py or Python application.

#### Processing Reference

For a complete list of Processing.py functions and the arguments they require, you can refer to the online reference:

[py.processing.org/reference](http://py.processing.org/reference/)

Note that the reference also includes many standard Python language structures, keywords, and functions.

### Comments

Comments can be used to leave notes for yourself or anybody else editing your code. These come in two types: single- and multi-line. Use a `#` character for single-line comments, and `'''` or `"""` for multi-line comments. Add some comments to your current sketch to see how they work:

{% highlight py %}
# dimension of the display window in units of pixels
size(500, 500)

print('hello world') # writes hello world to the console area

'''
This is a mult-line comment.
Any code between the opening and closing set of triple-quotes is ignored.
'''
{% endhighlight %}

While working through these lessons, add your own comments to remind you of what you have learnt.

### Whitespace

Python, and by extension Processing.py, is whitespace-sensitive. As an example, add a few space characters at the beginning of the `size()` line; then run your sketch.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/whitespace-error.png" class="fullwidth" />
  <figcaption>Console displaying errors.</figcaption>
</figure>

Because Python relies on indentation to distinguish blocks of code, the indented line breaks the program. Processing displays an error in the console, as well as highlights the line on which the problem was encountered.

You will understand more about when and where to use indentation as you progress through these lessons. You may even be familiar with some language that uses braces (`{` and `}`) to define blocks. For now, though, be aware that you need to pay careful attention to any space and tab characters that affect the indentation of your code.

### Errors

Whitespace errors are not the only type logged in the console. You are likely to miss-out the odd paren, comma, or quote mark, especially when starting out. Remove the closing bracket/paren on your size function:

{% highlight py %}
# dimension of the display window in units of pixels
size(500, 500

...
{% endhighlight %}

Now run the code and observe the console output:

<figure>
  <img src="{{ site.url }}/img/pitl01gs/error-unclosed-paren.png" class="fullwidth" />
  <figcaption>"Maybe there's an unclosed paren or quote mark somewhere before this line?"</figcaption>
</figure>

Note the white-on-red suggestion. Pretty smart, huh? To be honest, the console is not always so clear or correct, but it usually provides a clue as to where to start looking for bugs.

## Colour

There are various way to specify colour in Processing. To keep things simple, we will stick with hexadecimal values to begin with. If you are familiar with graphics software like Adobe Photoshop, Illustrator, Inkscape, or Gimp, you will have seen these values in your colour mixer. Processing includes its own colour selector. To access this, select **Tools > Color Selector...***

<figure>
  <img src="{{ site.url }}/img/pitl01gs/colour-selector.png" />
  <figcaption>The Processing colour selector. The hexadecimal value is the one prefixed with a <code>#</code>.</figcaption>
</figure>

Screens rely on 3 primaries to mix colours, namely <span style="color:red">red</span>, <span style="color:lime">green</span>, and <span style="color:blue">blue</span>. A hexadecimal colour value is comprised of 3 pairs, with each pair corresponding to a primary value. In the case of red (or `#FF0000`) the `FF` represents red; the middle `00` green; and right-most `00` blue. For reasons I won't get into here, `FF` is the equivalent of `100%`. Also, remember that you are mixing light, so `#FFFFFF` is white, and `#000000` is black.

The `fill()` function sets the colour used to fill shapes. It accommodates up to four arguments, depending on the colour system you are using. For hexadecimal, use the 6-digit value prefixed with a `#` and wrap it in quotes:

{% highlight py %}
...

fill('#FF0000')
{% endhighlight %}

To see the fill colour in effect, add a rectangle. The `rect()` function is used to draw rectangles (or squares) and takes four arguments:

`rect(x-coordinate, y-coordinate, width, height)`

The x-coordinate values begin at the right-edge of the display window; the y-coordinate from the top-edge. Add the following code to your "hello_world" sketch; then run it to confirm that the output matches the image below:

{% highlight py %}
...

fill('#FF0000')
rect(100, 150, 200, 300)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01gs/colour-fill-rect.png" />
  <figcaption>The green lines and numbers represent the <code>rect()</code>'s four arguments.</figcaption>
</figure>

Processing's `rect()` is one of its many drawing functions. You will be introduced to others further into this lesson.

### Fills and Strokes

When use a `fill()` function, every shape thereafter is filled in the specified colour -- that is, up until the point where you write that another `fill()` line. If you wish to disable the fill altogether, use `noFill()`. In this way, Processing is like painting: you grab a brush and dip it in some paint, then everything you paint is influenced by the brush and colour you last selected. When you wish to paint in a different style or colour, you simply change-out your brush or dip it in different pot.

Add the following code to your "hello_world" file. Note that comments have been added to give you a better idea of what each chunk is doing:

{% highlight py %}
...

# red rectangles
fill('#FF0000')
rect(100,150, 200,300)
rect(10,15, 20,30)

# orange square
fill('#FF9900')
rect(50,100, 150,150)

# fill-less square
noFill()
rect(250,100, 150,150)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01gs/colour-fill-additional-rect.png" />
</figure>

"Stroke" is another term for "outline". There are three stroke functions you are likely to make frequent use of: `stroke()` to change the colour; `strokeWeight()` to change the width; and `noStroke()` to disable the stroke altogether. Like `fill()` an `noFill()`, the stroke functions affect everything below them. For a white stroke, three-pixels in width, add the following code (above the shapes):

{% highlight py %}
...

stroke('#FFFFFF');
strokeWeight(3)

# red rectangles
fill('#FF0000')
...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01gs/colour-stroke.png" />
  <figcaption>Placing the stroke functions above the <code>rect()</code> lines affects everything you have drawn.</figcaption>
</figure>

To specify if stroke corners and tips should rounded or sharp, consult the relevant reference entries:  
[`strokeCap()`](http://py.processing.org/reference/strokeCap.html)  
[`strokeJoin()`](http://py.processing.org/reference/strokeJoin.html)

### Background

To change the background colour use the `background()` function.

{% highlight py %}
...
rect(250,100, 150,150)

background('#004477')
{% endhighlight %}

Run the sketch and notice how everything has disappeared, but the whole display window is a flat shade of blue. This because the `background('#004477')` draws over everything before it. This is useful for when you get to animation, but for now, ensure that you place your background function somewhere near the top of your code:

{% highlight py %}
...
size(500, 500)
background('#004477')

...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01gs/colour-blue-background.png" />
</figure>


### Color Mode

You have been using hexadecimal values to represent colour thus far. We will stick to them for the rest of the lesson, but before moving along, here is a quick introduction to some other approaches.

For various reasons, you may wish to express things in something other than hexadecimal. Here is one such a scenario: you wish to write some code that makes the bright red fill darker. Firstly, consider that this shade of red:  
`fill('#FF0000')`  
can also be represented as:  
`fill(255, 0, 0, 0)`  
As you can probably deduce, `255` is equivalent to `FF` (which itself is equivalent to 100%, as previously explained). The darken make the red half as bright, you can simply subtract `127.5` from `255`. However, trying to subtract `127.5` from `FF` is more tricky because you are now dealing with a mix of hexadecimal and decimal numbers.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/colour-gimp-mixer.png" />
  <figcaption>The GIMP colour mixer. The "H" field corresponds to ring of colours around the saturation("S") / brightness("V") triangle.</figcaption>
</figure>

In the previous scenario, the `colorMode()` was set to `RGB`. In this mode, each value represents one the screen's primary colours. You didn't need to specify this, though, as it is the default mode. There is another mode you can make use of: `HSB`. Once set to HSB, one enters three values representing Hue, Saturation, and Brightness respectively. To mimic the GIMP mixer above, one would use:  
`colorMode(HSB, 360, 100, 100)`  
`HSB` represents the mode. `360` represents the range of degrees, and the two `100` arguments a range of 0--100 for saturation and brightness respectively. A red fill would now be written as:  
`fill(360, 100, 100)`  
and a dark-greyish purple as:  
`fill(270, 50, 50)`  

<figure>
  <img src="{{ site.url }}/img/pitl01gs/colour-gimp-mixer-purple.png" />
  <figcaption>A dark-greyish purple mixed in HSB.</figcaption>
</figure>

Shifting along the colour spectrum -- from red to orange to yellow to green, etc. -- is now a matter of adding or subtracting from the H-value.

There will be more on colour in this lessons to come. If you need to find out more before then, consult the relevant reference entries:  
[`colorMode()`](http://py.processing.org/reference/colorMode.html)  
[`fill()`](http://py.processing.org/reference/fill.html)

## Drawing

In this section you will look at a number of drawing functions.

Begin a new sketch (**File > New**) and then save it as "drawing" (**File > Save As**...). Add some code to set things up before proceeding to get the sketch setup:

{% highlight py %}
size(500, 500)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

When you run the sketch, an empty blue display window appears. Most of the functions are fairly self-explanatory, so what follows is an example of each function and a link to the reference. Add them to your working sketch and feel free to experiment with the arguments to see how thing change.

### Point

Draws a point, the width of which is determined by the `strokeWeight()`. The arguments represent the x- and y-coordinates respectively.  
*Reference link:*  [`point()`](http://py.processing.org/reference/point.html)

{% highlight py %}
point(100, 25)
point(200, 25)
point(150, 75)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01gs/drawing-point.png" />
</figure>

### Triangle

Draws a triangle. The six arguments represent three x/y-coordinate pairs.   
*Reference link:* [`triangle()`](http://py.processing.org/reference/triangle.html)

{% highlight py %}
triangle(100,25, 200,25, 150,75)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01gs/drawing-triangle.png" />
</figure>

### Ellipse

Draws an ellipse, with the x/y-coordinate as its centre-point. The first pair of arguments represent the x/y coordinates; the second are the width and height.  
*Reference link:* [`ellipse()`](http://py.processing.org/reference/ellipse.html)

{% highlight py %}
ellipse(100,100, 100,50)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01gs/drawing-ellipse.png" />
</figure>

### Quad

Draws a quadrilateral (a for-sided polygon). The eight arguments represent four x/y-coordinate pairs.  
*Reference link:* [`quad()`](http://py.processing.org/reference/quad.html)

{% highlight py %}
quad(250,250, 350,300, 380,400, 260,380)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01gs/drawing-quad.png" />
</figure>


### Ellipse and Rect Modes

You have seen how rectangles are drawn from the top-left corner, and ellipses are centred on the x/y coordinate. You can change this behaviour using the following functions:  
[`ellipseMode()`](http://py.processing.org/reference/ellipseMode.html)  
[`rectMode()`](http://py.processing.org/reference/rectMode.html)



## Variables

...


## Arithmetic Operators

...





## Further Reading

This post covered two common formulae for converting colour to greyscale. However, there are more, and if you're interested in reading further, I highly recommend [Tanner Helland's blog post]( http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/) on the topic.

## References

* http://py.processing.org/reference/
* ...
