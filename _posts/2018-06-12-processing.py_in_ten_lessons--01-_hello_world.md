---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 01: Hello World"
categories: code processing python
---

***Covered in this lesson:***  
<a href="#intro-to-processing"><em>intro to processing</em></a> /
<a href="#colour"><em>colour</em></a> /
<a href="#drawing"><em>drawing</em></a> /
<a href="#variables"><em>variables</em></a> /
<a href="#arithmetic-operators"><em>arithmetic-operators</em></a>

---
&nbsp;  
This series of lesson posts covers *Processing.py*, with the purpose of introducing non-programmers to the fundamentals of computer programming in a visual context. If you're an artist, student, designer, researcher, or just somebody who is keen on learning how to code, Processing is a great place to start.

I would estimate each lesson to take around 2--4 hours to complete, of which a large part of that time will be spent on the tasks/challenges. The speed at which you get through the lessons is likely to be influenced by your prior experience in relatable areas. That said, it is not a race -- enjoy the ride and stop for breaks wherever. Hey, if you're really feeling inspired, feel free to head off-road!

## Intro to Processing

Processing has been around since the early 2000's and is comprised of a programming language and an editor for writing and compiling code (IDE). The original programming language component is based on Java, but several other variants have been developed. These include a JavaScript ([p5.js](https://p5js.org/)), Ruby ([JRubyArt](https://ruby-processing.github.io/JRubyArt/)), and Python ([Processing.py](http://py.processing.org/)) version.

As somebody teaching programming fundamentals to creative students -- who will proceed to take courses in web, game, and interactive design & development -- combining Processing with Python provides an ideal learning tool. What's more, Processing costs nothing, is open source; and runs on multiple platforms, including Windows, Mac, and Linux.

You can think of Processing as a kind-of extension of the Python programming language, with all sorts of drawing features and an editor rolled-in. Sometimes it may seem that these notes use the terms "Processing" and "Python" interchangeably. I will usually refer to Processing-exclusive features in the context of "Processing"; and standard Python features in relation with the term Python. If this confusing you, just think of them as one and the same! At this point, it is not important that you are able to distinguish Processing from Python, although you will come to understand the differences in time.

### Setup Processing

Before you can write any code, you will need to download Processing. Head over to the Processing download page, and download the relevant version (Windows/Mac/Linux):

[processing.org/download](https://processing.org/download/)

Run the application. Note that the default mode is "Java". As these lessons cover the Python variant, you'll need to switch to Python mode.

Click on the down arrow next to "Java" and select **Add Mode...** . Then, from the *Contribution Manager* window that appears, choose **Python Mode for Processing 3**. Finally, click **Install**.

<figure>
  <img src="{{ site.url }}/img/pitl01/intro-to-processing-add-python-mode.png" class="fullwidth" />
  <figcaption>Adding/installing Python mode.</figcaption>
</figure>

Once this is complete, you can switch to Python mode.

<figure>
  <img src="{{ site.url }}/img/pitl01/intro-to-processing-switch-to-python-mode.png" class="fullwidth" />
  <figcaption>Switching to Python mode.</figcaption>
</figure>

You are now ready to write your first line of code! If you would like a demonstration of what can be accomplished, perhaps take a look through the examples (**File > Examples...**) included with Processing.py. If you are ready to begin writing your own code, move onto the next section.

<figure>
  <img src="{{ site.url }}/img/pitl01/intro-to-processing-examples.png" class="fullwidth" />
  <figcaption>Use the &#9654; button to run any code.</figcaption>
</figure>

### Hello World

Processing refers to programs as "sketches". Given the visual and artistic nature of what you are likely to produce, it's a fitting term. Create a new sketch by selecting **File > New**, or using the associated keyboard shortcut (which is listed alongside the menu entry).

### Processing Functions

Type in the following lines of code:

{% highlight py %}
size(500, 500)
print('hello world')
{% endhighlight %}

Using **File > Save as...** save the sketch (to wherever it is you wish to store it) and name it "hello_world". You will notice that each sketch is saved as a new folder -- in this case, a folder named "hello_world". Within this are two files: *hello_world.pyde* and *sketch.properties*.

<figure>
  <img src="{{ site.url }}/img/pitl01/intro-to-processing-folder-structure.png" />
</figure>

You may also add other assets to your sketch folders, such as images and fonts -- but more on that later.

Hit the &#9654; button to execute the code. Better yet, use the associated keyboard shortcut: **Ctrl+R** for Windows and Linux; or **&#8984;+R** for Mac.

<figure>
  <img src="{{ site.url }}/img/pitl01/intro-to-processing-hello-world-run.png" class="fullwidth" />
  <figcaption>A grey 500×500 pixels display window (left) appears when you run your sketch.</figcaption>
</figure>

You have used two Processing *functions* here -- `size()` and `print()`. Functions consist of a function name followed by an opening and closing paren (or round bracket, if you prefer). Within these brackets, you supply *arguments*. The `size()` function takes two arguments: the first represents the width of your sketch; and the second, the height. In this case, the display window is 500 pixels wide by 500 pixels high. For reference purposes, you could write out the size function with the required arguments named according to the values they accept:

`size(width, height)`

Throughout these notes, you will find functions presented in this manner to explain their operation.

The `print()` function writes to the *Console* area -- the black rectangle at the bottom of the editor. Print takes a single argument; in this case, the phrase `'hello world'`. Because this is text -- or, more correctly speaking, *string* data -- it must be wrapped in quotation marks. You may use single- or double-quotes, but be sure to close-off using the same type with which you have opened.

What separates Processing.py code from Python code are the functions. The `size()` function is Processing-specific. In other words, it will not work outside of the Processing environment. The `print()` function, on the other hand, is a built-in part of the standard Python programming language. It will, therefore, work in any Processing.py or Python application.

#### Processing Reference

For a complete list of Processing.py functions and the arguments they require, you can refer to the online reference:

[py.processing.org/reference](http://py.processing.org/reference/)

Note that the reference also includes many standard Python language structures, keywords, and functions -- most of which we will cover along with the Processing functions.

### Comments

Comments can be used to leave notes to yourself or anybody else editing your code. These come in two types: single- and multi-line. Use a `#` character for single-line comments, and `'''` or `"""` for multi-line comments. Add some comments to your current sketch to see how they work:

{% highlight py %}
# dimension of the display window in units of pixels
size(500, 500)

print('hello world') # writes hello world to the console area
'''
This is a multi-line comment.
Any code between the opening and closing triple-quotes is ignored.
'''
print('how are you?')
{% endhighlight %}

While working through these lessons, add your own comments to remind you of what you have learnt. You can also comment out select lines of code, which can prove useful when debugging.

### Whitespace

Python, and by extension Processing.py, is whitespace-sensitive. As an example, add a few space characters at the beginning of the `size()` line; then run your sketch.

{% highlight py %}
# dimension of the display window in units of pixels
    size(500, 500)

...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/intro-to-processing-whitespace-error.png" class="fullwidth" />
  <figcaption>Console displaying errors.</figcaption>
</figure>

Because Python relies on indentation to distinguish blocks of code, the indented line breaks the program. Processing displays an error in the Console, as well as highlights the line on which the problem was encountered.

You will come to understand more about when and where to use indentation as you progress through these lessons. You may even be familiar with some programming language that uses braces (`{` and `}`) to define blocks, in which case: Python replaces the need for these using indentation. For now, though, be aware that you need to pay careful attention to any space and tab characters that affect the indentation of your code.

### Errors

Whitespace errors are not the only type logged in the console. You are likely to miss-out the odd paren, comma, or quote mark, especially when starting out. Remove the closing bracket/paren on your size function:

{% highlight py %}
# dimension of the display window in units of pixels
size(500, 500

...
{% endhighlight %}

Now run the code and observe the console output:

<figure>
  <img src="{{ site.url }}/img/pitl01/intro-to-processing-unclosed-paren.png" class="fullwidth" />
  <figcaption>"Maybe there's an unclosed paren or quote mark somewhere before this line?"</figcaption>
</figure>

Note the white-on-red suggestion. Pretty smart, huh? To be honest, the console is not always so clear or correct, but it usually provides a clue as to where to start looking for bugs.

## Colour

There are various ways to specify colour in Processing. To keep things simple, we will stick with hexadecimal values for the first lesson. If you are familiar with graphics software like Adobe Photoshop, Illustrator, Inkscape, or Gimp, you will have seen these values in your colour mixer. Processing includes its own colour selector. To access this, select **Tools > Color Selector...**

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-selector.png" />
  <figcaption>The Processing Colour Selector. The hexadecimal value is the one prefixed with a <code>#</code>.</figcaption>
</figure>

Screens rely on three primaries to mix colours, namely <span style="color:red">red</span>, <span style="color:lime">green</span>, and <span style="color:blue">blue</span>. A hexadecimal colour value is comprised of 6 hexadecimal digits (`0,1,2` ... `E,F`) and can be split into three pairs. Each pair corresponds to a primary colour. In the case of red:  
<code>#</code><code style="color:red">FF</code><code style="color:lime">00</code><code style="color:blue">00</code>  
-- the `FF` represents red; the middle `00` green; and right-most `00` blue. For reasons I won't get into here, `FF` is the equivalent of `100%`. Also, remember that you are mixing light, so `#FFFFFF` is white, and `#000000` is black.

The `fill()` function sets the colour used to fill shapes. It accommodates up to four arguments, depending on the colour system you are using. For hexadecimal use the 6-digit value prefixed with a `#` and wrap it in quotes:

{% highlight py %}
...

fill('#FF0000')
{% endhighlight %}

To see the fill colour in effect, add a rectangle. The `rect()` function is used to draw rectangles (or squares) and takes four arguments:

`rect(x_coordinate, y_coordinate, width, height)`

The x-coordinate values begin at the right-edge of the display window; and the y-coordinate from the top edge. Add the following code to your "hello_world" sketch; then run it to confirm that the output matches the image below:

{% highlight py %}
...

fill('#FF0000')
rect(100, 150, 200, 300)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-fill-rect.png" />
  <figcaption>The green lines and numbers represent the <code>rect()</code>'s four measurements/arguments. Note that top-left corner of the rectangle is placed at the x/y coordinate.</figcaption>
</figure>

Processing's `rect()` is one of its many drawing functions. You will be introduced to some others soon.

### Fills and Strokes

When you write a `fill()` function, every shape after that is filled in the specified colour -- that is, up until the next `fill()` line. If you wish to disable the fill altogether, use `noFill()`. In this way, Processing is like painting: you grab a brush and dip it in some paint, then everything you paint is influenced by the brush and colour you last selected. When you wish to paint in a different style or colour, you simply change-out your brush or dip it in a different pot.

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
  <img src="{{ site.url }}/img/pitl01/colour-fill-additional-rect.png" />
</figure>

"Stroke" is another term for "outline". There are three stroke functions you are likely to make frequent use of: `stroke()` to change the colour; `strokeWeight()` to change the width; and `noStroke()` to disable the stroke altogether. Like `fill()` and `noFill()`, the stroke functions affect everything below them. For a white stroke, three-pixels in width, add the following code (above the existing shapes):

{% highlight py %}
...

stroke('#FFFFFF');
strokeWeight(3)

# red rectangles
fill('#FF0000')
...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-stroke.png" />
  <figcaption>Placing the stroke functions above all of your <code>rect()</code> lines affects everything you have drawn.</figcaption>
</figure>

To specify if stroke corners and tips should rounded or sharp, consult the relevant reference entries: [`strokeCap()`](http://py.processing.org/reference/strokeCap.html) and [`strokeJoin()`](http://py.processing.org/reference/strokeJoin.html)

### Background

To change the background colour use the `background()` function. Add a background line to the end of your sketch:

{% highlight py %}
...
rect(250,100, 150,150)

background('#004477')
{% endhighlight %}

Run the sketch and notice how everything has disappeared and the whole display window is a flat shade of blue. This because the `background('#004477')` draws over everything before it. This is useful for when you get to animation, but for now, ensure that you place your background function somewhere near the top of your code:

{% highlight py %}
...
size(500, 500)
background('#004477')

...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-blue-background.png" />
</figure>


### Color Mode

You have been using hexadecimal values to represent colour thus far. We will stick to them for the rest of the lesson, but before moving along, here is a quick introduction to some other approaches. There is no need to write any code for this section -- just read through it to gain a basic grasp of the concepts involved.

For various reasons, you may wish to express colours in something other than hexadecimal. Here is one such scenario: you wish to write some code that darkens the bright red fill. Firstly, consider that this shade of red:  
`fill('#FF0000')`  
can also be represented as:  
`fill(255, 0, 0)`  
As you can probably deduce, `255` is equivalent to `FF` (which itself is equivalent to 100%, as previously explained). To make the red half as bright, you can simply subtract `127` from `255`. However, trying to subtract `127` from `FF` is more tricky because you are dealing with a mix of hexadecimal and decimal numbers.

In the previous scenario, the Processing `colorMode()` was set to `RGB`. You didn't need to specify this, though, as it is the default mode. In this mode, values represent the screen's primary colours. However, there is another mode you can make use of: `HSB`. Once set to HSB, one enters values representing Hue, Saturation, and Brightness.

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-gimp-mixer.png" />
  <figcaption>The GIMP colour mixer with the HSB values outlined in green. The "H" field corresponds to Hue ring, which encircles the Saturation("S") and Brightness/Value("V") triangle.</figcaption>
</figure>

To mimic the GIMP mixer above, one must first set the colour mode accordingly using:  
`colorMode(HSB, 360, 100, 100)`  
To explain: `HSB` represents the mode; `360` represents the range of degrees; and the two `100` arguments a range of 0--100% for saturation and for brightness. You would now write a read fill as:  
`fill(360, 100, 100)`  
This is because red lies at 360 degrees of rotation on the Hue ring (which begins at 'East' in the GIMP mixer) with the saturation and brightness set to 100%:

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-gimp-mixer-red.png" />
</figure>

For a dark-greyish purple, one could use:  
`fill(270, 50, 50)`  

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-gimp-mixer-purple.png" />
</figure>

In HSB mode, shifting along the colour spectrum -- from red to orange to yellow to green, etc. -- is a matter of adding or subtracting from the H-value. Attempting the same in RGB mode is more complicated as you need to manage the quantities of each primary.

There will be more on colour in this lessons to come. Until then, you can consult the relevant reference entries should you need more detail:  
[`colorMode()`](http://py.processing.org/reference/colorMode.html)  
[`fill()`](http://py.processing.org/reference/fill.html)

## Drawing

In this section, you will look at a number of drawing functions.

Begin a new sketch (**File > New**) and then save it as "drawing" (**File > Save As**...). Add some code to set things setup before proceeding:

{% highlight py %}
size(500, 500)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

When you run the sketch, an empty blue display window appears. What follows below are descriptions for several drawing functions, along with some code that you can add to your working sketch. Feel free to experiment with the arguments to see how things respond.

### Point

Draws a point, the width of which is determined by the `strokeWeight()`. The arguments represent the x- and y-coordinates respectively.  
*Reference link:*  [`point()`](http://py.processing.org/reference/point.html)

{% highlight py %}
point(100, 25)
point(200, 25)
point(150, 75)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-point.png" />
</figure>

### Triangle

Draws a triangle. The six arguments represent three x/y-coordinate pairs.   
*Reference link:* [`triangle()`](http://py.processing.org/reference/triangle.html)

{% highlight py %}
triangle(100,25, 200,25, 150,75)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-triangle.png" />
</figure>

### Ellipse

Draws an ellipse. The first pair of arguments represent an x/y coordinate that marks the centre of the ellipse; the second pair of arguments represent its width and height.  
*Reference link:* [`ellipse()`](http://py.processing.org/reference/ellipse.html)

{% highlight py %}
ellipse(100,100, 100,50)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-ellipse.png" />
</figure>

#### Ellipse and Rect Modes

You have seen how rectangles are drawn from the top-left corner, and ellipses are centred on the x/y coordinate. If you wish to change this behaviour -- for example, have rect function draw from the center -- refer to the following functions:  
[`ellipseMode()`](http://py.processing.org/reference/ellipseMode.html)  
[`rectMode()`](http://py.processing.org/reference/rectMode.html)

### Quad

Draws a quadrilateral (a four-sided polygon). The eight arguments represent four x/y-coordinate pairs.  
*Reference link:* [`quad()`](http://py.processing.org/reference/quad.html)

{% highlight py %}
quad(250,250, 350,300, 380,400, 260,380)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-quad.png" />
</figure>

### Line

Draws a straight line between two points. The first pair of arguments represent the starting x/y coordinates; and the second pair, the ending x/y coordinates.  
*Reference link:* [`line()`](http://py.processing.org/reference/line.html)

{% highlight py %}
line(390,380, 460,320)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-line.png" />
</figure>

## Rainbow Task

Time for a challenge!

Begin a new sketch (**File > New**) and then save it as "rainbow" (**File > Save As**...).

Add some code to get started:

{% highlight py %}
size(600, 600)
background('#004477')
noStroke()
{% endhighlight %}

Using what you've learnt thus far, complete the rainbow below:

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-rainbow.png" />
</figure>

Clue: you can overlap shapes to mask-off others.

## Variables

Variables are placeholders for information -- much like when you use letters in algebra to represent a value. In fact, Python variables look and behave similarly.

Begin a new sketch and then save it as "variables". To keep things simple, we'll print to the Console area. Add the following code:

{% highlight py %}
size(600, 400)
background('#004477')

print(width)
print(height)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/variables-width-height.png" class="fullwidth" />
</figure>

`width` and `height` are system variables that store the dimensions of the display window. However, you are not limited to system variables. When declaring your own variables, you assign a value using an `=` sign (assignment operator). Try this out with a new variable named "x":

{% highlight py %}
...

x = 1
print(x) # displays 1 in the console
{% endhighlight %}

You may name your variables whatever you wish, provided the name: contains only alpha-numeric and underscore characters; does not begin with a number; and does not clash with a reserved Python keyword or variable (like `width`). For example:

{% highlight py %}
playerlives = 3  # correct
playerLives = 3  # correct
player_lives = 3 # correct
player lives = 3 # incorrect (contains a space)
player-lives = 3 # incorrect (contains a hyphen)
{% endhighlight %}

Whether you should name a variable using camelCase, underscores, or some other convention is a matter of style (and vociferous debate). However, it is good to decide upon and stick to a naming convention, as you will make extensive use of variables in Processing. Add three more variables to your script, using them as arguments in a `rect()` function:

{% highlight py %}
...

x = 1
print(x) # displays 1 in the console
y = 30
w = 20
h = w
rect(x,y, w,h)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/variables-rect.png" class="fullwidth" />
  <figcaption>Note how the <code>w</code> variable has been assigned to <code>h</code>, resulting in a square.</figcaption>
</figure>

## Arithmetic Operators

Variables are far more useful when you perform arithmetic operations using them. Add the following code to your "variables" sketch:

{% highlight py %}
...
rect(x,y, w,h)

print(x + 2)
{% endhighlight %}

I'm guessing that did exactly what you expected? You can also subtract:

{% highlight py %}
...
rect(x,y, w,h)

print(x + 2)       # displays 3
print(x + 2)       # displays 3
print(x - 2)       # displays -1
{% endhighlight %}

Multiplication is performed using the `*` operator:

{% highlight py %}
...
print(x * 5)       # displays 5
{% endhighlight %}

Now add the code below, but before hitting run, see if you can predict what the total is:

{% highlight py %}
...
print(1 + 2 * 3)   # displays ???
{% endhighlight %}

The console displays a `7` -- and not a `9` -- because multiplication occurs before addition. Certain operators take precedence over others. Remember BEDMAS? Or BODMAS (depending on where you're from)? It is an acronym to help you recall the [order of operations](https://en.wikipedia.org/wiki/Order_of_operations). If you wish to override this order, use brackets:

{% highlight py %}
...
print(1 + 2 * 3)   # displays 7
print((1 + 2) * 3) # displays 9
{% endhighlight %}

For division, use a forward-slash:

{% highlight py %}
...
print(4 / 2)       # displays 2
{% endhighlight %}

Be aware, though, that dividing two integers always produces an integer result (integers are 'whole' numbers, as opposed to those with a decimal point). For example:

{% highlight py %}
...
print(3 / 2)       # displays 1
{% endhighlight %}

Python discards any decimal digits, effectively 'rounding-down' the result. To allow decimal results, define at least one of your operands using a decimal point:

{% highlight py %}
...
print(3 / 2.0)     # displays 1.5
{% endhighlight %}

Decimal numbers are usually referred to as *floating point*, or *float* values, in programming terminology.

Of course, [division by zero](https://en.wikipedia.org/wiki/Division_by_zero) operations will result in errors:

<figure>
  <img src="{{ site.url }}/img/pitl01/arithmetic-operators-division-by-zero.png" class="fullwidth" />
</figure>

## Image Reveal Task

Time for another challenge!

The idea here is to follow the instructions to reveal a symbol. Create a new sketch and save it as "symbol_reveal". Add some code to get started:

{% highlight py %}
size(600, 740)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)

xco = 400
yco = 440
{% endhighlight %}

To begin revealing the symbol, follow instruction steps 1 to 6. To get you started, here is the first instruction, along with the correct code:

1. Draw a line beginning at an x-coordinate of half the display window `width`, and y-coordinate of a third of the window `height`. The endpoint must have an x/y-coordinate equal to `xco` & `yco`.

-- which will be coded as follows:

{% highlight py %}
line(width/2,height/3, xco,yco)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/arithmetic-operators-symbol-reveal.png" />
  <figcaption>Instruction 1 of 6.</figcaption>
</figure>

Now, carry-out the rest of the instructions:

<ol start="2">
<li>
Draw a centred ellipse with a width that is an eleventh of the display window <code>width</code>, and a height that is a fourteenth of the window <code>height</code>.
</li>
<li>
Draw a centred ellipse with a width that is a nineteenth of the display window <code>width</code>, and a height that is a twenty-second of the window <code>height</code>.
</li>
<li>
Draw a line beginning at an x/y-coordinate equal to <code>xco</code> & <code>yco</code> respectively. The endpoint must have an x-coordinate of the display window <code>width</code> minus <code>xco</code>, and a y-coordinate equal to <code>yco</code>.
</li>
<li>
Draw a line beginning at an x-coordinate of the display window <code>width</code> minus <code>xco</code>, and y-coordinate equal to <code>yco</code>. The endpoint must have an x-coordinate of half the display window <code>width</code>, and a y-coordinate of a third of the window <code>height</code>.
</li>
<li>
Draw a centred ellipse with a width that is a fifth of the display window <code>width</code>, and height that is a twelfth of the display window <code>height</code>.
</li>
</ol>

Clue: if this seems like a conspiracy, you may be on the right track.

## Disk Space Analyser Task

Here is the final challenge before moving onto lesson 2. However, before tackling this one, you will need an introduction to drawing arcs.

The `arc()` function is used to draw elliptical arcs. It's best to try out a few examples to see how it works. Create a new sketch and save it as "disk_space_analyser". Add some code to get things started:

{% highlight py %}
size(600,700)
background('#004477')
stroke('#FFFFFF')
strokeWeight(3)
noFill()
{% endhighlight %}

The `arc()` function takes the following arguments, expanded across multiple lines here for easier comprehension:

{% highlight py %}
arc(
  x_coordinate, y_coordinate,
  width, height,
  start_angle, end_angle
)
{% endhighlight %}

Add an arc to your sketch using a *`start_angle`* of **`0`** and *`end_angle`* of **`2`**

{% highlight py %}
...
noFill()
arc(width/2,height/2, 200,200, 0,2)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/arithmetic-arc.png" />
  <figcaption><code>arc(width/2,height/2, 200,200, 0,2)</code></figcaption>
</figure>

The green overlay helps illustrate how things work. The arc is drawn along the perimeter of an invisible ellipse that is centered on the given x/y coordinates. An angle of `0` is positioned at 'East', which then opens clockwise to an angle of `2` -- which looks more like, around, 115 degrees of rotation? The reason for this is that Processing uses *radians* and not degrees. Why radians? Well, to answer a question with a question: why are there 360 degrees in a whole circle, anyhow? I mean, why not 500 or 100, or 1 million degrees? In fact, while we're on the topic, why are there 60 minutes in an hour? Or 24 hours in a day? The answer has to do with influences from ancient civilisations and is beyond what you need to know for now. What you *do* need to know is that radians are a standard unit of angular measure used in many areas of mathematics. Rather than try explain in writing how large/small a radian is, here is a neat animation from Wikipedia:

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Circle_radians.gif" />
  <figcaption>
    The SI symbol for radian is <b>rad</b>.<br />
    https://en.wikipedia.org/wiki/Radian#/media/File:Circle_radians.gif
  </figcaption>
</figure>

There are plenty of online degree-to-radian converters out there, but it's good to know a few key measurements. For starters, zero degrees is equal to zero radians, and 180 degrees is equal to approximately 3.142 radians. You recognise that number? Yep, it's pi! Therefore, 360 degress is equal to 2π. Add the following code:

{% highlight py %}
...
noFill()
arc(width/2,height/2, 200,200, 0,2)
arc(width/2,height/2, 300,300, 0,PI)   # half-circle
arc(width/2,height/2, 400,400, 0,PI*2) # full-circle
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/arithmetic-arcs.png" />
  <figcaption><code>PI</code> is a Processing variable representing π to 20 decimals places.</figcaption>
</figure>

To close an arc, so as to form a 'slice', add an additional `PIE` parameter:

{% highlight py %}
...
noFill()
arc(width/2,height/2, 200,200, 0,2)
arc(width/2,height/2, 300,300, 0,PI)   # half-circle
arc(width/2,height/2, 400,400, 0,PI*2) # full-circle
arc(width/2,height/2, 350,350, 3.4,(PI*2)-(PI/2), PIE)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/arithmetic-arc-pie.png" />
</figure>

A *disk usage analyser* presents a graphical representation of what is on a disk drive. The Linux *[GNOME Disk Usage Analyzer](https://en.wikipedia.org/wiki/Disk_Usage_Analyzer)* is one example of such software. You will recreate the storage ring-chart below. The text and number labels have been added to assist you; *you need not add them to your recreation*.

<figure>
  <img src="{{ site.url }}/img/pitl01/arithmetic-disk-space-analyser.png" class="fullwidth"/>
</figure>

## Lesson 02

That's it for lesson 01. I hope it was enjoyable, if somewhat challenging. Take a break -- you deserve it! When you are ready to move onto lesson 02, use the link below. If you are familiar with vector graphics (Adobe Illustrator, Inkscape, etc.), you'll be gaining some new insight into their inner-workings.

**Begin lesson 02:** Bézier, Catmull, and Rom walk into a bar ... *(coming soon)*
{% comment %}
**Begin lesson 02:** [Bézier, Catmull, and Rom walk into a bar ...]({% post_url 2018-06-20-processing.py_in_ten_lessons--02-_bezier,_catmull,_and_rom_walk_into_a_bar %})
{% endcomment %}

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* http://py.processing.org/reference/
* https://en.wikipedia.org/wiki/Radian#/media/File:Circle_radians.gif
