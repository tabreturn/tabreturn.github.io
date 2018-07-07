---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 04:<code> β = fps > 12</code>"
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#animation-functions"><em>animation functions</em></a> /
<a href="#transformations"><em>transformations</em></a> /
<a href="#time-and-date"><em>time and date</em></a> /
<a href="#animated-trigonometry"><em>animated trigonometry</em></a>

---
&nbsp;  
In this lesson you get to make things move. The content of this lesson focuses primarily on animation, but also covers transformations, time and date features, and a bit of trigonometry. As you will discover, blending motion with math produces some interesting results.

Before proceeding, though, consider how motion is perceived. The brain is fed a snapshot from your retina around ten times each second. The speed at which objects appear to be moving (or not moving) is determined by the difference between successive snapshots. So, provided your screen can display a sequence of static images at a rate exceeding ten cycles per second, the viewer will experience the illusion of smooth flowing movement. This illusion is referred to as *Beta movement* and occurs at frame rates of around 10-12 images per second (hence the lesson title), although higher frame rates will appear even smoother. That said, there is more to motion perception than frames per second (fps).

Take a moment to note the numbering of the circles in the illustration below.

<figure>
  <img src="{{ site.url }}/img/pitl04/sequence.svg" />
</figure>

Consider that you displayed just circle 1 for a full four seconds, followed by just circle 5 for another four seconds, looping the sequence indefinitely (an effective frame rate of 0.5 fps). The result, as most observers would agree, is a pair of alternating images with circles in different positions. However, speed up the frame rate to around 2.5 fps, and one begins to interpret the sequence as a circle bouncing between two points. Speed up the frame rate even further, and two flickering circles seemingly flicker at the same time. 

<figure>
  <img src="{{ site.url }}/img/pitl04/sequence-timings.gif" class="fullwidth" />
  <figcaption>Frame rates from left to right: 0.25 fps; 2.5 fps; 12 fps; 1 fps; 25 fps</figcaption>
</figure>

The two ring-of-circles animations run at 1 and 25 fps. In the left/slower instance, the circles appear appear to move -- jumping in to fill the void left by the vacant circle (if you didn't see it this way before, you should now). In the rightmost animation, a phantom white dot appears to obsure the circles beneath it as it races around the circle -- an illusion referred to as the *phi phenomenon*.

To introduce Processing's animation functions, you will setup a new sketch to experiment with motion. 

## Animation Functions

All that is required to get animating in Processing are the `setup()` and `draw()` functions. Create a new sketch; save it as "beta_movement"; then add the following code:

{% highlight py %}
def setup():
    size(500,500)
    background('#004477')
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)
{% endhighlight %}

This should look like just about every other sketch you have set up thus far, excepting the `def setup()` line. Indented beneath the `setup()` is that is called once, at the point which the program starts. The code indneted beneth it is used to define any initial properties, such as screen `size`. Conversely, code indented beneath a `draw()` function is invoked repeatedly. Add some `draw()` code to see how this operates:

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

The `frameCount` is a system variable containing the number of frames displayed since starting the sketch. With each frame, the `draw()` function now prints the current frame-count to the Console:

<figure>
  <img src="{{ site.url }}/img/pitl04/animation-functions-framecount.png" class="fullwidth" />
</figure>

By default, the `draw()` executes at around 60 fps -- but as the complexity of an animation increases, the frame rate is likely to drop. Adjust the the frame rate using the `frameRate()` function (within the indented `setup` code), and add a condition to print on even frames only:

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

With the `frameRate` set to `2.5`, the draw line executes two-and-a-half times every second. This means each frame is 4000 milliseconds (0.4 of a second) in length. Because the `print` line executes on every second frame, an new line appears in the Console every 8000 milliseconds:

<figure>
  <img src="{{ site.url }}/img/pitl04/animation-functions-framecount-evens.png" class="fullwidth" />
</figure>

Draw a circle with on every even frame by adding an `ellipse()` line:

{% highlight py %}
def draw():
    if frameCount%2 == 0:
        #print(frameCount)
        ellipse(250,140, 47,47)
{% endhighlight %}

When running this code, you may be surprised to find that the circle does not blink:

<figure>
  <img src="{{ site.url }}/img/pitl04/animation-functions-ellipse-even.png" />
</figure>

The circle does not dissapear on odd frames as in everything Processing persists after being drawn. Because the background color is defined within the setup, it is effectively the bottommost layer of this persistent arrangement. To 'wipe' each frame before drawing the next, simply move the `background('#004477')` to your `draw()` code:

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

This results in a blinking circle; add another with which it alternates:

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

Rather than flashing alternating shapes at different moments in time, the animation should ideally draw a frame-by-frame sequence of circles to smoothly transition between the upper and lower positions. To accomplish this without having to write out each position line-by-line, one requires a variable.

### Global Variables

You will notice that the `setup()` and `draw()` functions are preceeded by a `def`. You will come understand exactly why this is in future lessons, but for now you need to be aware that this presents an additional challenge when dealing with variables. The concept is best explained through a practical example.

Create a new sketch and save it as "global_variables". Add the following code:

{% highlight py %}
def setup():
    size(500,500)
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)
    x = 1

def draw():
    background('#004477')
    print(x)
{% endhighlight %}

Run the sketch and note the error message:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-error.png" class="fullwidth" />
  <figcaption>"NameError: global name 'x' is not defined"</figcaption>
</figure>

Because the `x` variable is defined within the `setup()` function, it is only accessible within the `setup` function (among its indented lines of code). The variable *scope* is therefore said to be *local*. Alternatively, you can place this variable line outside of the `setup()` function -- thereby placing it in the *global scope*. This permits either function to read it. Stop writting code for a moment and consider the following scenarios.

Adding the `x = 1` line to the top of the code places the variable in the global scope, making it accessible to the `setup()` and `draw()` functions:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-top-line.png" class="fullwidth" />
  <figcaption><code>1</code> is displayed by the <code>setup()</code> just once, then repeatedly by the <code>draw()</code> function.</figcaption>
</figure>

However, this global `x` variable can be overridden on a local level by another variable named `x`. In the example below, the `setup()` function displays a `1`, whereas the `draw()` function displays a `0` thereafter:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-local-override.png" class="fullwidth" />
  <figcaption>To capture this Console output, the sketch has been stopped almost immediately after starting it.</figcaption>
</figure>

While you can override the global variable, you cannot write/reassign a value to it:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-error-no-global.png" class="fullwidth" />
</figure>

At this point, the `global` keyword requires an introduction. Edit your code, moving the `x = 1` line into the global scope. Then, to modify this variable from within the `draw()` function, bind it to the local scope using the `global` keyword:

{% highlight py %}
x = 1

def setup():
    size(500,500)
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)
    print(x)

def draw():
    global x
    background('#004477')
    x += 1
    print(x)
{% endhighlight %}

The `x` variable is now incremented by `1` with each frame drawn.

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-global-keyword.png" class="fullwidth" />
</figure>

Add an `ellipse()` function to create an animated circle, the x-coordinate of which is controlled by the `x` variable:

{% highlight py %}
def draw():
    global x
    background('#004477')
    x += 1
    print(x)
    ellipse(x,height/2, 47,47)
{% endhighlight %}

A motion trail has been added to convey the direction of the motion.

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-ellipse.png" />
  <figcaption>The motion trail indicates left-to-right movement.</figcaption>
</figure>

### Saving Frames

Processing provides two functions to save frames as image files: `save()` and `saveFrame()`.

Each time the `saveFrame()` function is called it saves a TIFF (.tif) file in the sketch folder, naming it using the current frame count. Add the following code to save every hundredth frame:

{% highlight py %}
def draw():
    global x
    background('#004477')
    x += 1
    print(x)
    ellipse(x,height/2, 47,47)
    
    if frameCount % 100 == 0:
        saveFrame()
{% endhighlight %}

Run the sketch and watch the sketch folder. As every hundredth frame is encountered, a new file appears named "screen-" followed by a four digit frame count (padded with leading zeros).

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-saveframe-folder.png" />
</figure>

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-saveframe-frames.png" />
  <figcaption>Arranged left-to-right, top-to-bottom: frames 100, 200, 300 and 400.</figcaption>
</figure>

If you wish to save the file in some format other than TIFF -- such as JPEG, PNG, or TARGA -- refer to the relavent [reference entry](http://py.processing.org/reference/saveFrame.html).

The [`save()`](http://py.processing.org/reference/save.html) function differs from `saveFrame()` in that it accepts a file-name argument -- but it does not automatically append frame count digits.

## DVD Screensaver Task

DVD players commonly feature a bouncing DVD logo as a screensaver, appearing after a given period of inactivity. You may also have seen some variation of this on another digital device, albeit with and different graphic. Intriguingly, people often find themselves staring at the pointless animation in the hope of witnessing the logo land perfectly in the corner of the screen. If you're interested to know how long you can expect to wait for such an occurance, refer to this excellent [Lost Math Lessons article](http://lostmathlessons.blogspot.com/2016/03/bouncing-dvd-logo.html).

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

The only the unfamilair line is the `logo = None`. This defines the `logo` variable as an empty container in the global scope, which is then assigned in the `setup()` function. the Run the sketch.

<figure>
  <img src="{{ site.url }}/img/pitl04/dvd-logo-setup.png" />
  <figcaption>The motion trail indicates left-to-right movement.</figcaption>
</figure>

Your challenge is to complete the task. The logo should begin moving at an angle, bouncing every wall it encounters thereafter. Perhaps consider randomising the starting angle.

<figure>
  <img src="{{ site.url }}/img/pitl04/dvd-logo-bounce.png" />
</figure>

## Transformations

Processing's transformation functions provide a convenient means of dealing with complex geometric operations. Such operations would include scaling, rotation, shearing, and translation. These are especially useful for shapes comprised of vertices. Consider that you wished to scale and rotate the star shape depicted at the top-left, such that it results in bottom-right:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-star.png" />
</figure>

Firstly, consider that the code for the untransformed star's ten vertices looks something like this:

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

To calculate the coordinates for the new vertex positions, a *matrix* is required.

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

Being that digital images are comprised of rectangular grids of pixels, it is easy to imagine why matrices are used extensively in graphics processing. Nevertheless, they can be found applied in various fields of mathematics and other sciences.

To step you though how matrices operate, we'll take a look at a few practical examples. This is all rather mathematical, but the idea is to grasp a matrix as a concept. Following this section, you will be introduced to Processing's built-in matrix functions -- meaning you will no longer need to perform the calculations yourself.

Create a new sketch and save it as "matrices". Within the sketch's folder, create a "data" sub-folder containing a copy of the grid.png and grid-overlay.png files:

<a href="{{ site.url }}/img/pitl04/grid.png" download>grid.png</a>  
<a href="{{ site.url }}/img/pitl04/grid-overlay.png" download>grid-overlay.png</a>

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-folder.png" />
</figure>

Add the following code:

{% highlight py %}
size(800, 800)
grid = loadImage('grid.png')
image(grid, 0, 0)
noFill()
stroke('#FFFFFF')
strokeWeight(3)

x = 400; y = 200
w = 200; h = 200

rect(x, y, w, h)
{% endhighlight %}

In Python, semicolons (`;`) are used as a substitute for new lines. The `x`/`y`/`w`/`h` variable assignments have been arranged like this as a matter of style. The `x`/`y` values represent the top-left corner of the square, and the `w`/`h` variables its width and height. If you wish to avoid the semicolons, you may write each variable on its own line. Run the sketch and confirm that your display window matches that below.

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-setup.png" />
</figure>

Matrices operate on vertices, whereas the `rect()` function does not. To move forward, substitute the `rect()` function with `quad()`

{% highlight py %}
#rect(x, y, w, h)
quad(
  x, y,
  x, y+h, 
  x+w, y+h, 
  x+w, y
)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-quad.png" />
  <figcaption>Vertices labelled according to the above variables.</figcaption>
</figure>

The output appears the same, but is now based on vertices. Of course, this code does not make use of Processing's `vertex()` functions, but each pair of values comprises a vertex nonetheless.

#### Translate

The first transformation you will perform is a *translate*. This involves moving the shape a given distance in some direction. This is easy to perform without a matrix -- for example, to move the square one hundred pixels to right, all that one needs to do is add `100` to each vertice's x-coordinates. However, you will perform this using a matrix.

Firstly, take note how the top-left vertex `(x, y)` determines the positions of the other three vertices. This means that the only matrix operation you need perform is on the top-left vertex -- the remaining vertices can be calcuated by adding the relevant `w` and `h` values. The matrix is you are manipulating can therefore be expressed as:

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

Or, if you subsitute the variables with their corresponding values:

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

To translate this matrix, add (or subtract) another matrix. To perform a matrix addition, add each of the top values of each matrix; then the bottom values:

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

Add some new code to the bottom of your existing sketch -- namely: two new variables representing values `a` and `b`; a yellow stroke; and a new `quad()` that integrates the matrix calculations within its arguments:

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

Run the sketch. The new yellow square is drawn `100` pixels further right and `80` pixels higher than the original. 

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-translate.png" />
</figure>

#### Scale

To scale a shape, one must *multiply* the matrix you wish to transform by one describing a translation. In mathematical notation, this can be represented as: 

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

And this is the point where the power of matrices becomes evident! Depending on the values you subsitute for `a`, `b`, `c`, and `d`, the result will be a either scale, reflect, squeeze, rotate, or shear operation. Take note of how a matrix multiplication is performed:

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

To scale the square, `a` multiplies the width, and `d` multiplies the height. Add some code that draws a new orange square that is half the size of the white one:

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

Run the sketch. The orange square is half the szie of the white square, but the position has changed:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-scale.png" />
</figure>

To reveal why the position changes, add the grid-overlay.png file to your code, but halve its size using a third and fourth `image()` argument:

{% highlight py %}
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

When one performs a scale transformation, the entire grid upon which the shape is plotted scales toward the orgin (0,0) -- as evidenced by the visual ouput:

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

Reflecting a shape is a matter of scaling one axis by a negative value; and multpiplying the other by `0`.

For a horizontal refelection use:

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

And for a vertical refelection:

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

Beware aware, though: when reflection operations are relative to the orgin (0,0). As an example, add a new red square that is a horzontal reflection of the white orginal:

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

The result is a square with a witdth of `-200`, drawn from a starting coordinate of `(-400,200)`. As this lies beyond left edge of the display window, it cannot be seen. 

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-reflect.png" class="fullwidth" />
  <figcaption>The green line indicates the axis of horizontal reflection.</figcaption>
</figure>

#### Rotate

Rotation transformations require the trigonometric functions `cos()` and `sin()`. Recall, though, that Processing deals in radians, rather than degrees. Any arguments you pass these functions must therefore be expressed in radians.

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

The result is a 'top-left'/beginning coordinate of roughly (141,424).

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
  <figcaption>The green line indicates the axis of horizontal reflection.</figcaption>
</figure>

As with the other transformations, the axis is (0,0). To better visualise this, here is the rotation represented with a grid-overlay:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-rotate-overlay.png" />
</figure>

#### Shear

Shearing a shape slants, or skews, the it along the horizontal or vertical axis. The area, however, remains constant.

For a horizontal refelection use:

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

And for a vertical refelection:

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





...
Matrices are a deep and complex area of mathematics, of which we have barely scratched the surface. Python's *NumPy* libarary ...

Yet, this section has provided some insight into the inner-workings of Processing's transformation functions to be reviewed next.


#### Processing Transform Functions

...














## Time and Date

## Animated Trigonometry

## Lesson 04

That’s it for lesson 04.
...

**Begin lesson 05:** Art of the State *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* http://lostmathlessons.blogspot.com/2016/03/bouncing-dvd-logo.html
* https://commons.wikimedia.org/wiki/File:DVD_logo.svg
* https://en.wikipedia.org/wiki/Beta_movement

