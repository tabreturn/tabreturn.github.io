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

A motion trail has been added to many of animated results in these lessons in order to convey a sense of the motion.

<figure>
  <img src="{{ site.url }}/img/pitl04/global-variables-ellipse.png" />
</figure>


## Transformations

## Time and Date

## Animated Trigonometry

## Lesson 04

That’s it for lesson 04.
...

**Begin lesson 05:** Art of the State *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* https://en.wikipedia.org/wiki/Beta_movement
