---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 04:<code> β = fps > 12</code>"
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#animation"><em>animation</em></a> /
<a href="#transformations"><em>transformations</em></a> /
<a href="#time-and-date"><em>time and date</em></a> /
<a href="#animated-trigonometry"><em>animated trigonometry</em></a>

---
&nbsp;  
In this lesson, you get to make things move. The content focuses primarily on animation, but also covers transformations, time & date functions, and some trigonometry. As you will discover, blending motion with math produces some exciting results.

## Animation

Before writing any animation code, consider how motion is perceived. The brain is fed a snapshot from your retina around ten times each second. The speed at which objects appear to be moving (or not moving) is determined by the difference between successive snapshots. So, provided your screen can display a sequence of static images at a rate exceeding ten cycles per second, the viewer will experience the illusion of smooth flowing movement. This illusion is referred to as *Beta movement* and occurs at frame rates of around 10-12 images per second (hence the lesson title) -- although higher frame rates will appear even smoother. That said, there is more to motion perception than frames per second (fps).

Take a moment to note the numbering sequence of the circles in the illustration below.

<figure>
  <img src="{{ site.url }}/img/pitl04/sequence.svg" />
</figure>

Consider that you displayed just circle 1 for a full four seconds, followed by just circle 5 for another four seconds, looping the sequence indefinitely (an effective frame rate of 0.25 fps). The result, most observers would agree, is a pair of alternating images depicting circles in different positions. However, speed up the frame rate to around 2.5 fps, and one begins to interpret the sequence as a circle bouncing between two points. Speed up the frame rate further, and the two circles seemingly flicker in sync.

<figure>
  <img src="{{ site.url }}/img/pitl04/sequence-timings.gif" class="fullwidth" />
  <figcaption>Frame rates from left to right: 0.25 fps; 2.5 fps; 12 fps; 1 fps; 25 fps</figcaption>
</figure>

The two rightmost animations (rings of circles) run at 1 and 25 fps. In the left/slower instance, the circle just ahead of a gap appears to jump into the void left by the vacant circle (if you didn't see it this way before, you should now). In the more rapid animation, a phantom white dot appears to obscure the circles beneath it as it races around the ring -- an illusion referred to as the *phi phenomenon*.

### Animation Functions

All that is required to get animating in Processing are the `setup()` and `draw()` functions. Create a new sketch; save it as "beta_movement"; then add the following code:

{% highlight py %}
def setup():
    size(500,500)
    background('#004477')
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)
{% endhighlight %}

The code resembles just about every other sketch you have set up thus far, excepting the `def setup()` line. Everything indented beneath the setup() is called once when the program starts. This area is used to define any initial properties, such as the display window `size`. Conversely, code indented beneath a `draw()` function is invoked with each new frame. Add a `draw()` function to see how this operates:

{% highlight py %}
def setup():
    size(500,500)
    background('#004477')
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)

def draw():
    print(frameCount)
{% endhighlight %}

The `frameCount` is a system variable containing the number of frames displayed since starting the sketch. With each new frame, the `draw()` function calls the print function, which in-turn displays the current frame-count in the Console:

<figure>
  <img src="{{ site.url }}/img/pitl04/animation-functions-framecount.png" class="fullwidth" />
</figure>

By default, the `draw()` executes at around 60 fps -- but as the complexity of an animation increases, the frame rate is likely to drop. Adjust the frame rate using the `frameRate()` function (within the indented `setup` code), and add a condition to print on even frames only:

{% highlight py %}
def setup():
    frameRate(2.5)
    size(500,500)
    background('#004477')
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)

def draw():
    if frameCount%2 == 0:
        print(frameCount)
{% endhighlight %}

With the `frameRate` set to `2.5`, the draw line runs two-and-a-half times every second. This means each frame is 4000 milliseconds (0.4 of a second) in duration. Because the `print` line executes on every second frame, a new line appears in the Console every 8000 milliseconds:

<figure>
  <img src="{{ site.url }}/img/pitl04/animation-functions-framecount-evens.png" class="fullwidth" />
</figure>

To draw a circle on every even frame, add an `ellipse()` line:

{% highlight py %}
def draw():
    if frameCount%2 == 0:
        #print(frameCount)
        ellipse(250,140, 47,47)
{% endhighlight %}

Now run the code. You may be surprised to find that the circle does not blink:

<figure>
  <img src="{{ site.url }}/img/pitl04/animation-functions-ellipse-even.png" />
</figure>

So why does the circle not disappear on odd frames? The reason is that everything in Processing persists after being drawn -- so, every second frame another circle is drawn atop the existing 'pile'. The background colour is defined within the `setup()` section, and is therefore drawn once; as it is drawn first, it is also the bottommost layer of this persistent arrangement. To 'wipe' each frame before drawing the next, simply move the `background('#004477')` line to your `draw()` section:

{% highlight py %}
def setup():
    frameRate(2.5)
    size(500,500)
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)

def draw():
    background('#004477')
    if frameCount%2 == 0:
        #print(frameCount)
        ellipse(250,140, 47,47)
{% endhighlight %}

The result is a blinking circle. Using an `else` statement, add another circle with which this alternates:

{% highlight py %}
def draw():
    background('#004477')
    if frameCount%2 == 0:
        #print(frameCount)
        ellipse(250,140, 47,47)
    else:
        ellipse(250,height-140, 47,47)
{% endhighlight %}

You can now adjust the frame rate to test the effects.

For a more convincing effect, the animation should fill-in the intermediate frames.

<figure>
  <img src="{{ site.url }}/img/pitl04/animation-functions-tween.svg" />
  <figcaption>The onionskin rendition is used to indicate the frame positions.</figcaption>
</figure>

To accomplish this without having to write out each frame position, one requires a variable to store and update the circle's `y` value.

### Global Variables

You will notice that the `setup()` and `draw()` functions are preceded by the `def` keyword. You will come to understand why this is in future lessons, but for now, need to be aware that variables cannot be directly shared between these two sections of code. Global variables address this challenge.

Create a new sketch and save it as "global_variables". Add the following code:

{% highlight py %}
def setup():
    size(500,500)
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)
    y = 1

def draw():
    background('#004477')
    print(y)
{% endhighlight %}

Run the sketch and note the error message:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-error.png" class="fullwidth" />
  <figcaption>"NameError: global name 'y' is not defined"</figcaption>
</figure>

The `y` variable is defined within the `setup()` function. As such, `y` is only accessible among the indented lines of this block. The variable *scope* is therefore said to be *local* to `setup()`. Alternatively, one can place this variable line outside of the `setup()` function -- thereby placing it in the *global scope*. This permits either function to read it. Stop writing code for a moment and consider the scenarios that follow.

Adding the `y = 1` line to the top of the code places the variable in the global scope, making it accessible to the `setup()` and `draw()` functions:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-top-line.png" class="fullwidth" />
</figure>

However, this global `y` variable can be overridden on a local level by another variable named `y`. In the example below, the `setup()` function displays a `1`, whereas the `draw()` function displays zeroes:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-local-override.png" class="fullwidth" />
  <figcaption>To capture this Console output, the sketch has been stopped almost immediately after running it. The lines of zeroes would otherwise soon scroll the <code>1</code> out of view.</figcaption>
</figure>

While you can override a global variable, you will find that you cannot write/reassign a value to it:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-error-no-global.png" class="fullwidth" />
</figure>

This is where the `global` keyword is useful. Edit your code, moving the `y = 1` line to the top of your code (into the global scope). Then, to modify this variable from within the `draw()` function, binding it to the `draw`'s local scope using the `global` keyword:

{% highlight py %}
y = 1

def setup():
    size(500,500)
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)
    print(y)

def draw():
    global y
    background('#004477')
    y += 1
    print(y)
{% endhighlight %}

The global `y` variable is now incremented by `1` with each new that is frame drawn.

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-global-keyword.png" class="fullwidth" />
</figure>

Add an `ellipse()` function to create an animated circle, the y-coordinate of which is controlled by the `y` variable:

{% highlight py %}
def draw():
    global y
    background('#004477')
    y += 1
    print(y)
    ellipse(height/2,y, 47,47)
{% endhighlight %}

Run the code. In the graphic below, a motion trail has been added to convey the direction of motion.

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-ellipse.png" />
</figure>

### Saving Frames

Processing provides two functions to save frames as image files: `save()` and `saveFrame()`

Each time the `saveFrame()` function is called it saves a TIFF (.tif) file within the sketch folder, naming it using the current frame count. Add the following code to save every hundredth frame:

{% highlight py %}
    ...
    ellipse(height/2,y, 47,47)

    if frameCount % 100 == 0:
        saveFrame()
{% endhighlight %}

Run the code and monitor the sketch folder. As every hundredth frame is encountered, a new file appears named &ldquo;screen-&rdquo; followed by a four-digit frame count padded with a leading zero(s).

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-saveframe-folder.png" />
</figure>

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-saveframe-frames.png" />
  <figcaption>Arranged left-to-right, top-to-bottom: frames 100, 200, 300 and 400.</figcaption>
</figure>

If you wish to save the file in some format other than TIFF -- such as JPEG, PNG, or TARGA -- refer to the [saveFrame()](http://py.processing.org/reference/saveFrame.html) reference entry.

The [`save()`](http://py.processing.org/reference/save.html) function differs from `saveFrame()` in that it accepts a file-name argument -- however, it does not automatically append frame count digits.

## DVD Screensaver Task

DVD players commonly feature a bouncing DVD logo as a screensaver, appearing after a given period of inactivity. You may also have seen some variation of this on another digital device, albeit with and different graphic. Intriguingly, people often find themselves staring at the pointless animation in the hope of witnessing the logo land perfectly in the corner of the screen. If you're interested to know how long you can expect to wait for such an occurrence, refer to this excellent [Lost Math Lessons article](http://lostmathlessons.blogspot.com/2016/03/bouncing-dvd-logo.html).

Create a new sketch and save it as "dvd_screensaver". Within this, create a "data" folder. Download this “dvd-logo.png” file and place it in the data folder:

<a href="{{ site.url }}/img/pitl04/dvd-logo.png" download>dvd-logo.png</a>

Add the following code:

{% highlight py %}
x = 0
xspeed = 2
logo = None

def setup():
    global logo
    size(800,600)
    logo = loadImage('dvd-logo.png')

def draw():
    global x, xspeed, logo
    background('#000000')
    x += xspeed
    image(logo, x,100)
{% endhighlight %}

The only the unfamiliar line is the `logo = None`. This line defines the `logo` variable as an empty container in the global scope, which is then assigned a graphic in `setup()` function. Run the sketch.

<figure>
  <img src="{{ site.url }}/img/pitl04/dvd-logo-setup.png" />
  <figcaption>The motion trail indicates the left-to-right movement.</figcaption>
</figure>

The logo should begin moving at an angle, rebounding off every wall it encounters. Your challenge is to complete the task.

<figure>
  <img src="{{ site.url }}/img/pitl04/dvd-logo-bounce.png" />
</figure>

Perhaps consider randomising the starting angle.

## Transformations

Processing's transform functions provide a convenient means of dealing with complex geometric transformations. Such operations include scaling, rotation, shearing, and translation. Suppose that you wish to rotate and scale the star shape depicted at the top-left, such that it results in the bottom-right:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-star.png" />
</figure>

The code for the *untransformed* star's ten vertices look something like this:

{% highlight py %}
beginShape()
vertex(190,66)
vertex(220,155)
vertex(310,155)
vertex(238,210)
vertex(264,298)
vertex(190,246)
vertex(114,298)
vertex(140,210)
vertex(68,155)
vertex(158,155)
endShape(CLOSE)
{% endhighlight %}

To calculate the coordinates for the *rotated + scaled* vertex positions, a *matrix* is required.

### Matrices

In mathematics, a matrix (plural: matrices) is a rectangular array of values. As an example, here is a two-by-three matrix (2 rows, 3 columns):

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>2</mn></mtd>
        <mtd><mn>5</mn></mtd>
        <mtd><mn>12</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>19</mn></mtd>
        <mtd><mn>9</mn></mtd>
        <mtd><mn>7</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Given that digital images are essentially rectangular grids of pixels, it is easy to imagine how matrices are used extensively in graphics processing. That said, matrices are applied in various fields of mathematics and other sciences.

To step you through how matrices operate, we'll take a look at a few practical examples. Things get pretty mathematical here, but the idea is to grasp a matrix as a concept. Following this section, you will be introduced to Processing's built-in matrix functions -- meaning you will no longer need to perform the calculations yourself.

Create a new sketch and save it as "matrices". Within the sketch's folder, create a "data" subfolder containing a copy of the grid.png and grid-overlay.png files:

<a href="{{ site.url }}/img/pitl04/grid.png" download>grid.png</a>  
<a href="{{ site.url }}/img/pitl04/grid-overlay.png" download>grid-overlay.png</a>

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-folder.png" />
</figure>

Add the following code:

{% highlight py %}
size(800, 800)
grid = loadImage('grid.png')
image(grid, 0,0)
noFill()
stroke('#FFFFFF')
strokeWeight(3)

x = 400; y = 200
w = 200; h = 200

rect(x,y, w,h)
{% endhighlight %}

In Python, semicolons (`;`) serve as a substitute for new lines. The `x`/`y`/`w`/`h` variable assignments have been arranged in the above manner as a matter of style. If you wish to avoid the semicolons, you may write each variable on its own line. The `x`/`y` values represent the coordinates for the top-left corner of the square; the `w`/`h` variables, its width and height. Run the sketch and confirm that your display window matches the image below.

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-setup.png" />
</figure>

Matrices operate on vertices, whereas the `rect()` function does not. To move forward, substitute the `rect()` function with a `quad()`.

{% highlight py %}
#rect(x,y, w,h)
quad(
  x, y,
  x, y+h,
  x+w, y+h,
  x+w, y
)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-quad.png" />
  <figcaption>Vertices labelled according to their <code>quad()</code> arguments.</figcaption>
</figure>

The output appears the same but is now based on vertices. Of course, this code does not make use of Processing's `vertex()` function, but each x-y pair of values comprises a vertex nonetheless.

#### Translate

The first transformation you will perform is a *translation*. This involves moving the square a given distance in some direction. It's an easy enough task to accomplish without a matrix, but also ideal for introducing how matrices work.

Firstly, take note of how the top-left vertex `(x, y)` determines the positions of the other three vertices. This means that the only matrix operation you need to perform is on the top-left vertex -- the remaining vertices can be calculated by adding the relevant `w` and `h` values. The matrix you are manipulating can, therefore, be expressed as:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Or, if you substitute the variable values:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

To translate a matrix, add (or subtract) another matrix. To perform a matrix addition, add-up the values of each row:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>+</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>a</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>b</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mi>x</mi>
          <mo>+</mo>
          <mi>a</mi>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>y</mi>
          <mo>+</mo>
          <mi>b</mi>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Append the following code -- namely: two new variables representing values `a` and `b` (the distance the shape must move horizontally and vertically); a yellow stroke; and a new `quad()` that integrates the matrix calculations within its arguments:

{% highlight py %}
a = 100; b = -80
stroke('#FFFF00')
quad(
  x+a, y+b,
  x+a, y+h+b,
  x+w+a, y+h+b,
  x+w+a, y+b
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>+</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>100</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>-80</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mn>400</mn>
          <mo>+</mo>
          <mn>100</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>200</mn>
          <mo>+</mo>
          <mn>-80</mn>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Run the sketch. The new yellow square is drawn `100` pixels further right and `80` pixels closer to the top-edge than the original.

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-translate.png" />
</figure>

#### Scale

To scale a shape, one must *multiply* the matrix you wish to transform by one describing a transformation. In mathematical notation, this can be expressed as:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>a</mi></mtd>
        <mtd><mi>b</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>c</mi></mtd>
        <mtd><mi>d</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

And this is the point where the power of matrices becomes evident! Depending on the values you substitute for `a`, `b`, `c`, and `d`, the result will be either a scale, reflect, squeeze, rotate, or shear operation. Take a moment to study how a matrix multiplication is performed:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>a</mi></mtd>
        <mtd><mi>b</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>c</mi></mtd>
        <mtd><mi>d</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mi>x</mi>
          <mi>a</mi>
          <mo>+</mo>
          <mi>y</mi>
          <mi>b</mi>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>x</mi>
          <mi>c</mi>
          <mo>+</mo>
          <mi>y</mi>
          <mi>d</mi>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

To perform a scale, value `a` multiplies the width, and value `d` multiplies the height. To half the square's width and height, use a matrix where both `a` and `d` are equal to `0.5`:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>0.5</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>0.5</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>   
  <mo>=</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0.5</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>  
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0.5</mn>
          </mfenced>  
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Add some code that draws a new orange square half the size of the white one:

{% highlight py %}
a = 0.5; b = 0
c = 0; d = 0.5
stroke('#FF9900')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Run the sketch. The orange square is half the size of the white square, but the position has also changed:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-scale.png" />
</figure>

To reveal why the position changes, add the grid-overlay.png file to your code -- but halve its size using a third and fourth `image()` argument:

{% highlight py %}
...

grido = loadImage('grid-overlay.png')
image(grido, 0,0, 800/2,800/2)

a = 0.5; b = 0
c = 0; d = 0.5
stroke('#FF9900')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

As evidenced by the grid overlay, when one performs a scale transformation, the entire grid upon which the shape is plotted scales toward the origin (0,0).

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-scale-grid-overlay.png" />
  <figcaption>The <span style="color:#0099FF">brighter blue</span> lines and numbers are those of the grid-overlay.png file.</figcaption>
</figure>

Scaling need not be proportionate. Comment out the grid-overlay image, and adjust your `a` and `b` variables for a distorted square:

{% highlight py %}
grido = loadImage('grid-overlay.png')
#image(grido, 0,0, 800/2,800/2)

a = 0.3; b = 0
c = 0;   d = 1.8
stroke('#FF9900')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>0.3</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1.8</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>   
  <mo>=</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0.3</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>  
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>1.8</mn>
          </mfenced>  
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-scale-disproportionate.png" />
</figure>

#### Reflect

Reflecting a shape is a matter of scaling one axis by a negative value; and multiplying the other by `1`.

For a horizontal reflection use:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mo>-</mo><mi>a</mi></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

And for a vertical reflection:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mo>-</mo><mi>d</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Beware aware, though: reflection operations are relative to the origin (0,0). As an example, add a new red square that is a horizontal reflection of the white original:

{% highlight py %}
a = -1; b = 0
c = 0;  d = 1
stroke('#FF0000')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>-1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>   
  <mo>=</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>-1</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>  
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>1</mn>
          </mfenced>  
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

The result is a square with a width of `-200`, drawn from a starting coordinate of `(-400,200)`. As this lies beyond left-edge of the display window, it cannot be seen.

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-reflect.png" class="fullwidth" />
  <figcaption>The green line indicates the axis of horizontal reflection.</figcaption>
</figure>

#### Rotate

Rotation transformations require the trigonometric functions `cos()` and `sin()`. Recall, though, that Processing deals in radians rather than degrees, so any arguments you pass these functions must be expressed in radians.

Add a pink version of the white square, rotated 45 degrees (roughly `0.785` radians).

{% highlight py %}
a = cos(0.785); b = -sin(0.785)
c = sin(0.785); d = cos(0.785)
stroke('#00FF00')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>cos(0.785)</mn></mtd>
        <mtd><mn>-sin(0.785)</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>sin(0.785)</mn></mtd>
        <mtd><mn>cos(0.785)</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

The result is a 'top-left' coordinate of roughly (141, 424).

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mn>282.96</mn>
          <mo>+</mo>
          <mn>-141.37</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>282.73</mn>
          <mo>+</mo>
          <mn>141.47</mn>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mn>141.58</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>424.2</mn>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-rotate.png" />
  <figcaption>With the square rotated 45 degrees, the top-left corner appears in a top-centre position.</figcaption>
</figure>

As with the other transformations, the axis runs through (0,0). To better visualise this, here is the rotation represented with a grid-overlay graphic:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-rotate-overlay.png" />
</figure>

#### Shear

Shearing a shape slants, or skews, it along the horizontal or vertical axis. The area (or volume), however, remains constant.

To shear horizontally, use:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mi>b</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

And for a vertical shear:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mi>c</mi></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>


Add a red version of the white square, sheared vertically using a coefficient of `0.4`.

{% highlight py %}
a = 1;   b = 0
c = 0.4; d = 1
stroke('#FF0000')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0.4</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open = "[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>1</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>  
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0.4</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>1</mn>
          </mfenced>  
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Below is the result, along with a grid-overlay and x-y coordinate label:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-shear.png" />
  <figcaption>A vertically-sheared red square.</figcaption>
</figure>

This section has introduced some fundamental transformation concepts using matrices, while avoiding anything larger than 2 × 2 matrix. If you wish to handle larger matrices, take a look at Python's *NumPy* library.

Next up: performing all of the above transformations without having to worry about the math!

#### Processing Transform Functions

After having done transformations the hard way, grasping Processing's transform functions is a breeze.

Create a new sketch and save it as "transform_functions". Within the sketch's folder, create a "data" subfolder containing a copy of the grid.png and grid-overlay.png files:

<a href="{{ site.url }}/img/pitl04/grid.png" download>grid.png</a>  
<a href="{{ site.url }}/img/pitl04/grid-overlay.png" download>grid-overlay.png</a>

Add the following setup code (note that grid-overlay.png is loaded but not drawn):

{% highlight py %}
size(800,800)
noFill()
stroke('#FFFFFF')
strokeWeight(3)
grid = loadImage('grid.png')
image(grid, 0,0)
grido = loadImage('grid-overlay.png')
{% endhighlight %}

Add a white rectangle, drawn in the same position as that of the last sketch. Because you will be using Processing's built-in transform functions, a `rect()` will work fine, i.e. there is no need to use a `quad()` unless you prefer to.

{% highlight py %}
x = 400; y = 200
w = 200; h = 200
rect(x,y, w,h)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-setup.png" />
</figure>

Add a `translate(100,-80)` function and a duplicate `rect()` in yellow:

{% highlight py %}
...
x = 400; y = 200
w = 200; h = 200
rect(x,y, w,h)

translate(100,-80)
stroke('#FFFF00')
rect(x,y, w,h)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-translate.png" />
</figure>

Add a square, 100 × 100 pixels in width/height, with an x-y coordinate of zero:

{% highlight py %}
...
stroke('#FF0000')
rect(0,0, 100,100)
{% endhighlight %}

Run the sketch. The red square can be seen cut-off near the top-left of the display window. This is because the shapes do not change position; rather it is the coordinate system that does. To better visualise this behaviour, draw the grid-overlay.png after the `translate()` function:

{% highlight py %}
...
x = 400; y = 200
w = 200; h = 200
rect(x,y, w,h)

translate(100,-80)
image(grido, 0,0)
stroke('#FFFF00')
rect(x,y, w,h)
stroke('#FF0000')
rect(0,0, 100,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-functions-translate-overlay.png" />
</figure>

To return the red square to the top-left corner, one could add a `translate(-100,80)` to offset the prior one -- or better yet, isolate the translation. Wrap the `translate`, `image`, and yellow square code in a `pushMatrix()` and `popMatrix()` function. These will create a new matrix stack within which only the nested shapes (a yellow square, for now) are translated:

{% highlight py %}
...
x = 400; y = 200
w = 200; h = 200
rect(x,y, w,h)

pushMatrix()
translate(100,-80)
image(grido, 0,0)
stroke('#FFFF00')
rect(x,y, w,h)
popMatrix()

stroke('#FF0000')
rect(0,0, 100,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-functions-translate-matrix.png" />
</figure>

This can be a useful way to approach drawing -- moving the coordinate system to avoid keeping track using variables, then adding a `popMatrix()` to return to the original coordinate system. It ultimately depends on what works best for what you are drawing.

In addition to `translate()`, Processing's 2D transform functions include, [rotate()](http://py.processing.org/reference/rotate.html), [scale()](http://py.processing.org/reference/scale.html), [shearX()](http://py.processing.org/reference/shearX.html), and [shearY()](http://py.processing.org/reference/shearY.html).

What is more, you may combine these as you wish. Add further transform functions to the existing matrix stack:

{% highlight py %}
pushMatrix()
translate(100,-80)
rotate(0.785)
shearY(0.4)
image(grido, 0,0)
stroke('#FFFF00')
rect(x,y, w,h)
popMatrix()
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-functions-multiple.png" />
</figure>

You will be using a mix of these techniques in the tasks to come.

## Time and Date

There are twenty-four hours in a day. But why is this not ten, twenty, a hundred, or some other more 'rounded' number? To make things more confusing, these twenty-four hours are then split into twelve AM and twelve PM hours. To understand why this is, one must look back to where the system first originated -- around Mesopotamia and Ancient Egypt, circa 1500 BC. These civilisations relied on sundials and water-clocks for day- and night-time timekeeping, which explains the need for the two (AM/PM) cycles. The twelve hour figure arises from the finger-counting system, where one would use the thumb to count up to twelve on the three bones of each finger.

<figure>
  <img src="{{ site.url }}/img/pitl04/time-dozen-counting.svg" />
</figure>

Not only does this explain the origins of 12-hour clock, but also the twelve months of the year and the *dozen* grouping system. Twelve also happens to have the most divisors of any number below eighteen.

If the twelve-hour (AM/PM) clock makes time tricky to deal with, time zones only complicate matters further. Given that the earth is a spinning ball circling the sun, it's always noon across some longitudinal arc of the planet's surface. Because the earth must rotate a full 360 degrees to complete one day, 'noon' moves across the planet's surface at 15 degrees (360 ÷ 24) each hour. This gives us 24 *solar* time zones. But whether or not your watch reads 12:00 depends on the *local* time zone in which you find yourself. For example, Australia has three such local time zones whereas China has one, despite the latter straddling four solar time zones.

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Standard_World_Time_Zones.png/1024px-Standard_World_Time_Zones.png" class="fullwidth" />
  <figcaption>
    Standard world time zones.<br />
    source: <a href="https://en.wikipedia.org/wiki/File:Standard_World_Time_Zones.png">Wikipedia</a>
  </figcaption>
</figure>

Then there are day-light savings hours to contend with (where one day in each year must be 23 hours long; and another, 25). Never mind that each year is comprised of 52 weeks, 12 months (of varying lengths), 365 days ... oh, and what about leap years? All of these factors make handling time a complicated task -- but, fortunately, Processing provides a number of functions that perform the tricky calculations for you.

Firstly, though, an introduction to UTC (Coordinated Universal Time) will help make time zones more manageable. UTC -- which is interchangeable with GMT -- lies on zero degrees longitude and is never adjusted for daylight savings. Local time zones can be expressed using a UTC offset, for example:

| China:   | UTC+08:00 |
| India:   | UTC+05:30 |
| Uruguay: | UTC-03:00 |
|||

The Python `datetime` library provides a `utcnow()` method for retrieving UTC timestamps:

{% highlight py %}
import datetime
timestamp = datetime.datetime.utcnow()
# 2018-08-06 07:57:22.817889
{% endhighlight %}

Unix timestamps represent the number of seconds that have elapsed since 00:00:00, January 1st, 1970 (UTC):

{% highlight py %}
import time
timestamp = time.time()
# 1533715946.817889
{% endhighlight %}

The `datetime` and `time` libraries include a complete set of functions for manipulating and managing time data, and depending on what you wish to accomplish, you may elect one toolset over the other. However, Processing's built-in functions that may prove easier to use.

### Processing Date and Time Functions

To begin exploring Processing time and date functions, create a new sketch and save it as "date_and_time". Add the following code:

{% highlight py %}
y = year()
m = month()
d = day()
print('{}-{}-{}'.format(y,m,d))

h = hour()
m = minute()
s = second()
print('{}:{}:{}'.format(h,m,s))
{% endhighlight %}

The date and time functions above communicate with your computer clock (local time). Each function returns and integer value, as your Console output will confirm. The *string interpolation* approach cuts-out the need for multiple `+` operators, instead replacing each pair of `{}` braces with its respective `.format()` argument. Of course, the figures in your Console will reflect the point in time at which your run your sketch.

<figure>
  <img src="{{ site.url }}/img/pitl04/time-date-time.png" class="fullwidth" />
  <figcaption>The Console reads:<br />
    <code>2018-8-6</code><br />
    <code>7:57:22</code>
  </figcaption>
</figure>

Unlike the functions above, `millis()` does not fetch date and time values from your clock -- but instead returns the number of milliseconds (thousands of a second) that have elapsed since starting the program. Add the following code:

{% highlight py %}
ms = millis()
print(ms)
{% endhighlight %}

Run this code. You will likely see a below `700`. However, the number of milliseconds printed to Console will vary depending on the code that precedes it. For example, place a for loop above the `millis()` function call, and have it draw a million squares:

{% highlight py %}
...

for i in range(1000000):
    rect(10,10,10,10)

ms = millis()
print(ms)
{% endhighlight %}

The `ms` value is now likely to exceed `1000`. I say "likely", because your computer specs and any processes running in the background will have an influence. As a case in point, running this code on my laptop while transcoding a video file added around another thousand milliseconds to the readout.

The `millis()` function operates independently of frame rate. To monitor how many frames have elapsed, use the `frameCount` system variable.

### Sprite Sheet Animation

A *sprite* is a single graphic comprised of pixels. Multiple sprites can be combined to create a scene like that of this *Mario Bros.* level:

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/en/c/cf/Mario_Bros._Gameplay.gif" />
  <figcaption>
    Mario Bros.<br />
    Source: <a href="https://en.wikipedia.org/wiki/Mario_Bros">Wikipedia</a>
  </figcaption>
</figure>

Study the screenshot above; notice how the blue bricks are all clones of one another. Rather place a completed environment image in the scene, the developer repeats a single blue tile in the positions necessary to form the platforms. The red ground is also formed from repeating tile. Mario, the turtle, and the fireball are also sprites, although, unlike the environmental sprites, they are all animated. Each animated sprite frame can be packed into a single *sprite sheet* -- like in this Nyan Cat example:

<figure>
  <img src="{{ site.url }}/img/pitl04/nyancat-spritesheet.gif" class="fullwidth" />
  <figcaption>
    Source: <a href="https://www.youtube.com/watch?v=QH2-TGUlwu4">Nyan Cat</a>
  </figcaption>
</figure>

By packing every frame into a single image, the developer need only load a single sprite sheet graphic, thus reducing memory and processing overhead. Typically, all of the background elements are also packed into a separate sprite sheet. The technique dates back to early video game development but has been utilised in other domains, such as web development.

To create a sprite sheet animation of your own, create a new sketch and save it as "spritesheet_animation". Within this, create a "data" folder. Download a copy of the Nyan Cat sprite sheet and place it in the data folder:

<a href="{{ site.url }}/img/pitl04/nyancat-spritesheet.gif" download>nyancat-spritesheet.gif</a>  

Add the following code:

{% highlight py %}
def setup():
    size(300,138)
    frameRate(12)

def draw():
    background('#004477')
    nyan = loadImage('nyancat_spritesheet.gif')
    xpos = 0
    image(nyan, xpos,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/time-spritesheet.png" class="fullwidth" />
</figure>

The sprite sheet must move about within a containing box, as if behind a sort of mask. In this instance, the display window will serve as that 'mask'. The *nyancat-spritesheet.gif* is 1500 pixels wide and 138 pixels high. This means each sprite is 300 pixels wide (1500 ÷ 5), hence the `size(300,138)` line. To advance a frame, the *nyancat-spritesheet.gif* graphic needs to be shifted 300 pixels further left with each new `draw`. This can be controlled using `frameCount`, but combined with a modulo operation to bring it back to zero every fifth frame:

{% highlight py %}
def setup():
    size(300,138)
    frameRate(12)

def draw():
    background('#004477')
    nyan = loadImage('nyancat_spritesheet.gif')
    xpos = (frameCount % 5) * 300 * -1
    image(nyan, xpos,0)
{% endhighlight %}

Run the sketch to verify that Nyan Cat loops seamlessly.

This was a *very* basic introduction to sprite sheets. It's hardly an ideal approach (that modulo operation only grows more demanding as the `frameCount` increases). Should you wish to create 2D game -- using Processing or another platform -- you will want to research this topic further.

## Animated Trigonometry

It is assumed that you possess some (if only a very little bit of) trigonometry knowledge. What follows is a practical and visual introduction to trigonometry in motion. Clock, metronome, and piston mechanisms all exhibit elegant rhythms that can be reproduced using sine and cosine functions.

### Analog Clock Task

Trigonometry focuses on triangles, but is also associated with circles. A solid grasp of radians is required before venturing further, and what better way to link angles and circles than analog clocks?

Creating a digital clock in Processing is a simple matter of combining time and text functions. For an analog clock, however, one must convert the hours, minutes, and seconds into angles of rotation. As with the [disk space analyser task]({% post_url 2018-06-12-processing.py_in_ten_lessons--01-_hello_world %}#disk-space-analyser-task), you will be dealing in radians.

Create a new sketch and save it as "analog_clock". To help you out, begin with some code that prints out Processing's pi constants:

{% highlight py %}
print(PI)
print(TWO_PI)
print(TAU)
print(HALF_PI)
print(QUARTER_PI)
{% endhighlight %}

These will prove handy for programming your clock. For example, rather than entering `PI/2` each time you wish to rotate something 90 degrees, you can instead use `HALF_PI`. Regarding `TAU` ... well, there is this big, nerdy mathematician war raging over whether it is better to use pi or *tau*. Basically, 2π tends to spring up in formulae all over the place i.e. there are 2π radians in a circle. In 2001 it was proposed that a new constant be devised to represent a circle; in 2010 it was decided that this value be represented using the tau symbol (τ). The table below represents equivalent expressions using `TAU` and `PI` constants, additionally listing their approximate decimal values:

| `TAU`   | ` `=` ` | `TWO_PI`     | ` `=` ` | 6.284 |
| `TAU/2` | ` `=` ` | `PI`         | ` `=` ` | 3.142 |
| `TAU/4` | ` `=` ` | `HALF_PI`    | ` `=` ` | 1.571 |
| `TAU/8` | ` `=` ` | `QUARTER_PI` | ` `=` ` | 0.785 |
|||

To begin the clock, draw the face and hour hand:

{% highlight py %}
...

def setup():
    size(600,600)
    noFill()
    stroke('#FFFFFF')

def draw():
    background('#004477')
    translate(width/2, height/2)
    strokeWeight(3)
    ellipse(0,0, 350,350)

    strokeWeight(10)
    line(0,0, 100,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/trigonometry-clock-face.png" />
</figure>

The hour hand rests along zero radians. Recall that when drawing `arc`s, one begins at 'East' then progresses clockwise (southward) as the angle increases. This is a problematic starting position, as our clock will be offset by three hours should the hand begin from the 3 o'clock position. Correct this using a `rotate()` function:

{% highlight py %}
    ...

    rotate(-HALF_PI)

    strokeWeight(10)
    line(0,0, 100,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/trigonometry-clock-12.png" />
</figure>

The next step is to calculate many radians the hour hand advances with each hour. Consider that a complete rotation is tau radians; therefore one hour equals tau over `__`? Multiply this by the `hour()` function and use a translation matrix to perform the rotation; then add the minute and second hands. Your finished clock will look something like this:

<figure>
  <img src="{{ site.url }}/img/pitl04/trigonometry-clock-complete.png" />
  <figcaption>Your hands will reflect the time of <b>your</b> computer clock.</figcaption>
</figure>

With a good grasp on radians, it is time to begin with trigonometric functions.

## SOH-CAH-TOA

Remember "[sohcahtoa](https://en.wikipedia.org/wiki/Mnemonics_in_trigonometry)"? That mnemonic device to help you remember the sine, cosine, and tangent ratios? You thought you'd never use it again after leaving school? To refresh your memory, it stands for:

| <b>s</b>ine    | ` `=` ` | <b>o</b>pposite ÷ <b>h</b>ypotenuse |
| <b>c</b>osine  | ` `=` ` | <b>a</b>djacent ÷ <b>h</b>ypotenuse |
| <b>t</b>angent | ` `=` ` | <b>o</b>pposite ÷ <b>a</b>djacent   |

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/TrigonometryTriangle.svg" />
  <figcaption>
    Source: <a href="https://en.wikipedia.org/wiki/Trigonometry">Wikipedia</a>
  </figcaption>
</figure>

Remember *unit circles*? They look like this:

<figure>
  <img src="{{ site.url }}/img/pitl04/trigonometry-unit-circle.svg" />
</figure>

{% comment %}

### Engines task

Time for a final trig challenge!

...


## Lesson 04

That's it for lesson 04.
... definitely more mathematical than most

**Begin lesson 05:** Art of the State *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* http://lostmathlessons.blogspot.com/2016/03/bouncing-dvd-logo.html
* https://commons.wikimedia.org/wiki/File:DVD_logo.svg
* https://en.wikipedia.org/wiki/Beta_movement

{% endcomment %}
