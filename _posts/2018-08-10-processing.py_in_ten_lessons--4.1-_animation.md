---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 4.1: Animation"
categories: code processing python
mathml: true
---

In this tutorial, you get to make things move. The content focuses primarily on animation, but also covers transformations, time & date functions, and some trigonometry. As you'll discover, blending motion with math produces some exciting results.

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

## Animation

Before writing any animation code, consider how motion is perceived. The brain is fed a snapshot from your retina around ten times each second. The speed at which objects appear to be moving (or not moving) is determined by the difference between successive snapshots. So, provided your screen can display a sequence of static images at a rate exceeding ten cycles per second, the viewer will experience the illusion of smooth flowing movement. This illusion is referred to as *Beta movement* and occurs at frame rates of around 10-12 images per second -- although higher frame rates will appear even smoother. That said, there's more to motion perception than frames per second (fps).

Take a moment to note the numbering sequence of the circles in the illustration below.

<figure>
  <img src="{{ site.url }}/img/pitl04/sequence.svg" style="max-width:280px;" />
</figure>

Consider that you displayed just circle 1 for a full four seconds, followed by just circle 5 for another four seconds, looping the sequence indefinitely (an effective frame rate of 0.25 fps). The result, most observers would agree, is a pair of alternating images depicting circles in different positions. However, speed up the frame rate to around 2.5 fps, and one begins to interpret the sequence as a circle bouncing between two points. Speed up the frame rate further, and the two circles seemingly flicker in sync.

<figure>
  <script>
    var gifanimation1 = '{{ site.url }}/img/pitl04/sequence-timings.gif';
    var gitposter1 = '{{ site.url }}/img/pitl04/sequence-timings-poster.gif';
  </script>
  <img src="{{ site.url }}/img/pitl04/sequence-timings-poster.gif" class="fullwidth" style="cursor:pointer"
       onclick="this.src = this.src == gitposter1 ? gifanimation1 : gitposter1;" />
  <figcaption>
    <strong>Click the image to start the animation.</strong><br/>
    Frame rates from left to right: 0.25 fps; 2.5 fps; 12 fps; 1 fps; 25 fps
  </figcaption>
</figure>

The two rightmost animations (rings of circles) run at 1 and 25 fps. In the left/slower instance, the circle just ahead of a gap appears to jump into the void left by the vacant circle (if you didn't see it this way before, you should now). In the more rapid animation, a phantom white dot appears to obscure the circles beneath it as it races around the ring -- an illusion referred to as the *phi phenomenon*.

### Animation Functions

All that's required to get animating in Processing are the `setup()` and `draw()` functions. Create a new sketch; save it as "beta_movement"; then add the following code:

{% highlight py %}
def setup():
    size(500,500)
    background('#004477')
    noFill()
    stroke('#FFFFFF')
    strokeWeight(3)
{% endhighlight %}

The code resembles just about every other sketch you've set up thus far, excepting the `def setup()` line. Everything indented beneath the setup() is called once when the program starts. This area is used to define any initial properties, such as the display window `size`. Conversely, code indented beneath a `draw()` function is invoked with each new frame. Add a `draw()` function to see how this operates:

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

With the `frameRate` set to `2.5`, the draw line runs two-and-a-half times every second; this means each frame is 400 milliseconds (0.4 of a second) in duration. Because the `print` line executes on every second frame, a new line appears in the Console every 800 milliseconds:

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

So why does the circle not disappear on odd frames? The reason is that everything in Processing persists after being drawn -- so, every second frame another circle is drawn atop the existing 'pile'. The background colour is defined within the `setup()` section, and is therefore drawn once; as it's drawn first, it's also the bottommost layer of this persistent arrangement. To 'wipe' each frame before drawing the next, simply move the `background('#004477')` line to your `draw()` section:

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

You'll notice that the `setup()` and `draw()` functions are preceded by the `def` keyword. You'll come to understand why this is in future lessons, but for now, need to be aware that variables cannot be directly shared between these two sections of code. Global variables address this challenge.

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

The `y` variable is defined within the `setup()` function. As such, `y` is only accessible among the indented lines of this block. The variable *scope* is therefore said to be *local* to `setup()`. Alternatively, one can place this variable line outside of the `setup()` function -- thereby setting it in the *global scope*. This permits either function to read it. Stop writing code for a moment and consider the scenarios that follow.

Adding the `y = 1` line to the top of the code places the variable in the global scope, making it accessible to the `setup()` and `draw()` functions:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-top-line.png" class="fullwidth" />
</figure>

However, this global `y` variable can be overridden on a local level by another variable named `y`. In the example below, the `setup()` function displays a `1`, whereas the `draw()` function displays zeroes:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-local-override.png" class="fullwidth" />
  <figcaption>The sketch has been run then stopped almost immediately. You'll need to scroll to the very top line of the Console area to view the <code>1</code>.</figcaption>
</figure>

While you can override a global variable, you'll find that you cannot write/reassign a value to it:

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-error-no-global.png" class="fullwidth" />
</figure>

This is the point where the `global` keyword is useful. Edit your code, moving the `y = 1` line to the top of your code (into the global scope). Then, to modify this variable from within the `draw()` function, bind it to the `draw`'s local scope using the `global` keyword:

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

The global `y` variable is now incremented by `1` with each new that's frame drawn.

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

Processing provides two functions to save frames as image files: `save()` and `saveFrame()`. The latter is more versatile, so I won't cover `save()`.

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

If you wish to save the file using a different name, and/or in some format other than TIFF -- such as JPEG, PNG, or TARGA -- refer to the [saveFrame()](http://py.processing.org/reference/saveFrame.html) reference entry.

## DVD Screensaver Task

DVD players commonly feature a bouncing DVD logo as a screensaver, appearing after a given period of inactivity. You may also have seen some variation of this on another digital device, albeit with a different graphic. Intriguingly, people often find themselves staring at the pointless animation in the hope of witnessing the logo land perfectly in the corner of the screen. If you're interested to know how long you can expect to wait for such an occurrence, refer to this excellent [Lost Math Lessons article](http://lostmathlessons.blogspot.com/2016/03/bouncing-dvd-logo.html).

Create a new sketch and save it as "dvd_screensaver". Within this, create a "data" folder. Download this "dvd-logo.png" file and place it in the data folder:

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
  <figcaption>
    The motion trail indicates the left-to-right movement of the DVD logo.<br />
    DVD Forum [Public domain / filled in blue], <a href="https://commons.wikimedia.org/wiki/File:DVD_logo.svg">from Wikimedia Commons</a>
  </figcaption>
</figure>

The logo should begin moving at an angle, rebounding off every wall it encounters. Your challenge is to complete the task.

<figure>
  <img src="{{ site.url }}/img/pitl04/dvd-logo-bounce.png" />
</figure>

Perhaps consider randomising the starting angle.

**Begin Lesson 4.2:** [Transformations]({% post_url 2018-08-11-processing.py_in_ten_lessons--4.2-_transformations %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
