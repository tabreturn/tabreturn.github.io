---
layout: post
comments: false
title: "Processing.py in Ten Lessons -- 07: Mouse and Keyboard Interaction"
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#mouse-interaction"><em>Mouse Interaction</em></a> /
<a href="#keyboard-interaction"><em>Keyboard Interaction</em></a> /
<a href="#controlp5"><em>ControlP5</em></a>

---
&nbsp;  
It is time to look at interactivity in Processing. You can program Processing to work with a range of input devices, such as microphones, cameras, gamepads, or even something you have built with an [Arduino](https://www.arduino.cc/) board. For this lesson, though, we'll stick to plain-old keyboard and mouse input. You will look and building basic interfaces for painting freely and drawing faces. In the process, you will discover that Processing's standard functions are not exactly purpose-designed for constructing user interfaces. However, the lesson also includes an introduction to the *ControlP5* graphical user interface library. ContolP5 provides a suite of essential control widgets, such as buttons, checkboxes, sliders, toggles, and text-fields, thereby saving you the time and effort of having to create them from scratch.

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

We will also touch on a few game development concepts, specifically *collision detection* and *delta time*.

### Some User Interface History

It may hard to believe, but there was a time when computers had no video displays. We'll skip over that early chapter of computing history, though, and begin at the *Command Line Interface* (CLI). The first computer monitors couldn't display much more than text and basic graphics, but this was enough to support a handy CLI. By typing a series of commands, one could instruct a computer to perform its various functions.

<figure>
  <img src="{{ site.url }}/img/pitl07/wikimedia-backup/RT-11_help.jpg" />
  <figcaption>
    A VT100 computer (released 1978) displaying a list of commands.<br />
    Autopilot [<a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>], <a href="https://commons.wikimedia.org/wiki/File:RT-11_help.jpg">via Wikimedia Commons</a>
  </figcaption>
</figure>

You may be surprised to hear that the CLI is far from dead and buried. While it may no longer be the predominant means of interfacing with computing devices, system administrators and programmers still rely on it for many daily computing tasks. Furthermore, you are likely to be surprised by how much can be accomplished just typing instructions. As anybody who has mastered the command line can testify, it's more efficient in various situations, particularly where repetitive tasks and batch processing are involved.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-terminal-wget.png" class="fullwidth" />
  <figcaption>Modern Linux command line.</figcaption>
</figure>

In the above example, you can spot two `$` symbols; each is referred to as a *prompt*, although the symbol displayed can vary between operating systems. The prompt signifies that the computer is ready to accept input. Two commands have been used here: `cd` for changing directory; and `wget` for downloading a file from a web server. In this case, I'm downloading the command-line version of Processing.py to my Desktop. That's right -- you can run Processing sketches from the command line without opening the editor.

A Text-based User Interface (TUI) is a kind of blend between the CLI and modern graphical interface. For example, take `w3m` -- a text-mode web browser. Using the arrow keys one can navigate websites, albeit in with limited styling and no images.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-terminal-w3m.png" class="fullwidth" />
  <figcaption>
    Browsing <a href="http://duckduckgo.com">duckduckgo.com</a> using w3m, a text-mode web browser.
  </figcaption>
</figure>

For richer text-based interfaces, many old systems included *semigraphics*. You can think of semigraphics as extra characters that allow you to 'draw' with type. Modern systems have adopted many of these characters; for instance, you can copy-paste these symbols straight from your web browser into any text document: &#9824; &#9829; &#9830; &#9827;. Additionally, *Unicode* (basically, a collection of all of the characters a computer can display) includes over a hundred box-drawing characters for constructing TUI interfaces.

<figure>
  <code>┘ ┐┌└ ┼ ─ ├ ┤ ┴ ┬ │</code>
  <figcaption>
    A partial selection of Unicode box-drawing characters.
  </figcaption>
</figure>

In text-mode, computer displays are measured in characters as opposed to pixels. For instance, the [ZX Spectrum](https://en.wikipedia.org/wiki/ZX_Spectrum), released in 1982, managed 32 *columns* by 24 *rows* of characters on a screen with a resolution of 256×192 pixels. Because text-mode environments rely on [mono-spaced]({% post_url 2018-06-19-processing.py_in_ten_lessons--02-_bezier,_catmull,_and_rom_walk_into_a_bar %}#fonts) characters, box-drawing characters will always align perfectly.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-terminal-mc.png" class="fullwidth" />
  <figcaption>Midnight Commander running in a hundred-column (approx.) display.</figcaption>
</figure>

It is important to mention, though, that many CLI- and TUI-based systems were not incapable of rendering raster graphics. There were text and graphics modes that a system could switch between. Take games for instance. Of course, text-mode games -- like the dungeon crawler, [NetHack](https://en.wikipedia.org/wiki/NetHack) -- operate in text mode, but for games with graphics, the computer would switch to addressing individual pixels. Even today, PCs still boot in text mode, before shifting to graphics mode to load the desktop environment.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-text-and-graphic-modes.png" class="fullwidth" />
  <figcaption>
    Text-mode vs graphical games. Left: NetHack; right: Micropolis.
  </figcaption>
</figure>

A Graphical User Interface (GUI) allows for interaction through the manipulation of graphical elements. You routinely make use of such interfaces to interact with your file manager, web-pages, application software, and mobile phone. To narrow down GUIs a bit, I'd like to focus on WIMP interfaces. The Windows/Icons/Menus/Pointer paradigm was developed by Xerox PARC in 1973 and popularised by Apple's Macintosh in 1984. This has been massively influential on graphical user interface design, and the WIMP-meets-desktop environment has remained fundamentally unchanged since it's inception. The desktop metaphor was particularly intuitive as it mimicked the very items that computers sought to replace -- documents, folders, notepads, and the forgiving trashcan for retrieving deleted files. With a GUI, gestures and menus replace CLI commands. For example, rather than typing "`mv`" commands, a user can drag-and-drop files to move them between folders (directories).

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-gem.png" />
  <figcaption>
    The OpenGEM GUI. DRI released GEM Desktop 1.0 in February 1985. Apple Computer sued the developers for copying their Macintosh interface.
  </figcaption>
</figure>

Apple licensed certain GUI features to Microsoft for use in Windows 1.0 but sued them when features like overlapping windows appeared in Windows 2.0. The district court ruled in favour of Microsoft. Regardless of the legal outcome, Windows 1.x and 2.x were slow, clumsy, and poorly received. Most Microsoft users elected to stick with the Microsoft text-mode environment, MS-DOS. With VGA-colour, fonts, mouse support, and lightning-fast performance thanks to text-mode, MS-DOS TUIs grew to become remarkably advanced.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-dos-tui.png" />
  <figcaption>
    <a href="http://www.adlibtracker.net/">Adlib Tracker II</a>, a TUI music tracker (software for creating music) for Microsoft DOS.
  </figcaption>
</figure>

Many significant hard- and software developments paved the way for WIMP environments. Arguably, though, it was the invention of the mouse set that the process in motion. It was Douglas Engelbart -- in collaboration with computer engineer, Bill English -- who created the first mouse prototype in 1964.

<figure>
  <img src="{{ site.url }}/img/pitl07/wikimedia-backup/SRI_Computer_Mouse.jpg" />
  <figcaption>
    SRI's first computer mouse prototype.<br />
    SRI International [<a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>], <a href="https://commons.wikimedia.org/wiki/File:SRI_Computer_Mouse.jpg">via Wikimedia Commons</a>
  </figcaption>
</figure>

In reality, the development of GUIs involved many people over many years. As the field developed, it spawned new disciplines. *Human-Computer Interaction* (HCI) researchers emerged in the early 1980s. Bill Moggridge and Bill Verplank coined *Interaction Design* (IxD) in the mid-1980s to describe the practice of designing interactive digital products -- Moggridge felt this was an improvement over his earlier term, *Soft-Face*. Since then, *User Experience* (UX) designers, *User Interface* (UI) designers, and *Information Architects* (IA) have all entered the scene. I'd imagine that some labyrinthine, mutant Venn diagram exists somewhere to help explain how all of these disciplines relate to one another.

Of course, advances in interaction design are not limited to software. Touchpads found their niche in laptops (as well as MP3 players and nifty music synthesisers). Touchscreens hit it big with tablets and smartphones. Then there is gesture recognition, force feedback, GPS, and augmented reality. Voice recognition has gained newfound traction thanks to enhanced natural language processing. In some respects, speech interfaces represent a coming full circle -- instead of typing in commands at the CLI, we now issue them with our voice!

Although we will stick to keyboard/mouse input in this lesson, you are encouraged to explore other means of interaction in your own time. GUI programming features prominently in many software and web development projects, so there are plenty of GUI toolkits out there. HTML, for example, is purpose-built for constructing web-pages. For Python, there's [PyQT](https://www.riverbankcomputing.com/software/pyqt/intro), [Tkinter](https://en.wikipedia.org/wiki/Tkinter), and [Kivy](https://kivy.org/), to name but a few. You'll discover that programming basic buttons without any readymade widgets is painful enough, not to mention checkboxes, sliders, drop-down lists, text-fields, and windows. I'll try to provide a few tips on good user interface design in the process, but this field really requires another book(s) to cover in any proper detail.

## Mouse Interaction

Processing provides five system variables for retrieving mouse attributes. These are:
[`mouseX`](https://py.processing.org/reference/mouseX.html),
[`mouseY`](https://py.processing.org/reference/mouseY.html),
[`pmouseX`](https://py.processing.org/reference/pmouseX.html),
[`pmouseY`](https://py.processing.org/reference/pmouseY.html),
[`mousePressed`](https://py.processing.org/reference/mousePressed_var.html), and
[`mouseButton`](https://py.processing.org/reference/mouseButton.html).
We will combine them all in one playful sketch.

Create a new file and save it as "mouse_toy". Add the following setup code:

{% highlight py %}
def setup():
    size(600,600)
    background('#004477')
    frameRate(20)

def draw():
    print('x:%s, y:%s' % (mouseX, mouseY))
    fill('#FFFFFF')
    ellipse(mouseX,mouseY, 20,20)
{% endhighlight %}

Run the sketch and move your mouse pointer about the display window. The `print` function uses the `mouseX` and `mouseY` system variables to print the x/y-coordinates to the Console. These same values govern the x/y position of each `ellipse` (circle) drawn.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-circles.png" />
</figure>

The `frameRate` is relatively slow (20 fps), so rapid mouse movement results in circles distributed at larger intervals. There will always be a circle in the top-left corner because the pointer is assumed to be at (0,0) until the mouse moves into the display window.

The `pmouseX` and `pmouseY` system variables hold the pointer's x/y position from the previous frame. In other words, if the `mouseX` is equal to the `mouseY` you know that the mouse hasn't moved since the last frame. As per the code below: add the two new global variables (`rainbow` and `sw`), comment out the previous `draw` lines, and add the four new lines at the bottom of the `draw`.

{% highlight py %}
    ...

rainbow = [
  '#FF0000', '#FF9900', '#FFFF00',
  '#00FF00', '#0099FF', '#6633FF'
]
sw = 7

def draw():
    #print('x:%s, y:%s' % (mouseX, mouseY))
    #fill('#FFFFFF')
    #ellipse(mouseX,mouseY, 20,20)

    global sw
    stroke( rainbow[frameCount % len(rainbow)] )
    strokeWeight(sw)
    line(mouseX,mouseY, pmouseX,pmouseY)
{% endhighlight %}

The `stroke()` line rotates the stroke colour each new frame. The `line()` function draws a line between the current and previous frame's mouse coordinates. Recall that rapid mouse movement increases the distance between the x/y coordinates captured in successive frames. Run the sketch. As you move your mouse about a multicoloured line traces your path; you can gauge the speed of mouse movement by the length of each alternating band of rainbow colour.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-lines.png" />
</figure>

Currently, you have no means of controlling the flow of colour. To turn the brush on and off, we will add some code that activates it only while the mouse's left-click button is held down.

While any mouse button is held down, the `mousePressed` system variable is equal to `True`. The `mouseButton` variable can be used to determine which button that is -- either `LEFT`, `RIGHT`, or `CENTER`. However, the `mousePressed` variable reverts to `False` once you have released, but `mouseButton` retains its value until another is clicked. For this reason, it's best to use these two variables in combination with one another. Insert the following `if` statement to control when the `line` function is active.

{% highlight py %}
    ...
    strokeWeight(sw)

    if mousePressed and mouseButton == LEFT:
        line(mouseX,mouseY, pmouseX,pmouseY)
{% endhighlight %}

Run the sketch to test how the left mouse button works.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-left-button.png" />
  <figcaption>You can determine how I slowed down after each corner of the triangle (by the colour intervals).</figcaption>
</figure>

Now restructure the `if` statement to accommodate a centre-click that sets the stroke-weight to 3, and a right-click that incrementally increases the stroke thickness.

{% highlight py %}
    ...
    strokeWeight(sw)

    if mousePressed:
        if mouseButton == LEFT:
            line(mouseX,mouseY, pmouseX,pmouseY)
        if mouseButton == CENTER:
            sw = 3
        if mouseButton == RIGHT:
            sw += 1
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-lines-variable.png" />
  <figcaption>
    Centre-click sets the stroke-weight to 3; right-click increases it by a pixel with each press.<br />
    Can you figure out if I drew these lines left-to-right or right-to-left? <span style="font-style:normal">🤔</span>
  </figcaption>
</figure>

The lines need not persist. Play around to see what interesting effects you can create. As an example, I have added this code to the `draw` function.

{% highlight py %}
    # variable background colours
    colorMode(HSB, 360,100,100,100)
    h = float(mouseX)/width*360
    s = float(mouseY)/height*100
    b = 100
    a = 15
    fill(h,s,b,a)
    rect(-50,-50, width+100,height+100)

    # rectangles
    noCursor()
    rectMode(CORNERS)
    fill( rainbow[frameCount % len(rainbow)] )
    rect( mouseX,mouseY, pmouseX,pmouseY )
{% endhighlight %}

The background now changes colour as you move towards different corners; the *x* mouse position shifts the hues while the *y* position adjusts the saturation. Colourful rectangles appear as you move the mouse about then fade progressively as the frames advance. The [`noCursor()`](https://py.processing.org/reference/noCursor.html) function hides the mouse pointer while it is over the display window.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-squares.png" />
</figure>

The right- and centre-click functions will adjust of the squares.

### Paint App

Processing offers a selection of mouse *event* functions -- which somewhat overlap in functionality with the mouse variables -- but, are placed outside of the `draw()` function. These are:
[`mousePressed()`](https://py.processing.org/reference/mousePressed.html),
[`mouseReleased()`](https://py.processing.org/reference/mouseReleased.html),
[`mouseWheel()`](https://py.processing.org/reference/mouseWheel.html),
[`mouseClicked()`](https://py.processing.org/reference/mouseClicked.html),
[`mouseDragged()`](https://py.processing.org/reference/mouseDragged.html), and
[`mouseMoved()`](https://py.processing.org/reference/mouseMoved.html).
We will combine the first three to create a simple paint app that features a panel for selecting and adjusting brush properties. These functions listen for specific mouse events, and once triggered, execute some code in response. Once you've grasped a few event functions, it's easy enough to [look up](https://py.processing.org/reference/) and figure out the others. We will also be controlling Processing's `draw()` behaviour manually as opposed to having it automatically repeat per the frame rate.

Create a new sketch and save it as "paint_app". Download the font, *Ernest* (by Marc André 'mieps' Misman) from DaFont; extract it; then place the "Ernest.ttf" file in your data sub-directory.  
[https://www.dafont.com/ernest.font](https://www.dafont.com/ernest.font)  

Add the following setup code:

{% highlight py %}
def setup():
    size(600,600)
    background('#004477')
    ernest = createFont('Ernest.ttf', 20)
    textFont(ernest)
    noLoop()

def draw():
    print(frameCount)
{% endhighlight %}

The [`noLoop()`](https://py.processing.org/reference/noLoop.html) function prevents Processing continually executing code within the `draw()` function. If you run the sketch, the Console displays a single "`1`", confirming that the `draw` ran just once. This may seem odd to you. After all, if you wanted to avoid frames why would you include a `draw()` at all? Well, there is also a [`loop()`](https://py.processing.org/reference/loop.html) function to reactivate the standard `draw` behaviour. As you will come to see, controlling the `draw` behaviour with mouse functions makes for a neat approach to building the app.

Add some global variables. It shouldn't matter if you place these above or below the `setup()` code, as long the lines are flush against the left edge of the editor. These variables will be used to adjust and monitor the state of the brush. Perhaps somewhere near the top of your code makes more sense?

{% highlight py %}
rainbow = [
  '#FF0000', '#FF9900', '#FFFF00',
  '#00FF00', '#0099FF', '#6633FF'
]
brushcolor  = rainbow[0]
brushshape  = ROUND
brushsize   = 3
painting    = False
paintmode   = 'free'
{% endhighlight %}

The [`mousePressed()`](https://py.processing.org/reference/mousePressed.html) function is called once with every press of a mouse button. If you need to establish which button has been pressed, you can use it in combination with the `mouseButton` variable. Add the code below. Ensure that the lines are flush left and that you have not placed it within the `setup()` or `draw()`.

{% highlight py %}
def mousePressed():
    if mouseButton == LEFT:
        loop()
{% endhighlight %}

Run the sketch. The moment you left-click within the display window numbers begin to count-up in the Console. To stop this upon release of the mouse button, use a [`mouseReleased()`](https://py.processing.org/reference/mousePressed.html) function; this is called once every time a mouse button is released.

{% highlight py %}
def mouseReleased():
    noLoop()
{% endhighlight %}

When you run the sketch, the frame-count only counts-up in the Console while you are holding the left mouse button down. Excellent! Now add some painting code to the `draw` function.

{% highlight py %}
def draw():
    print(frameCount)
    stroke(brushcolor)
    strokeCap(brushshape)
    strokeWeight(brushsize)
    line(mouseX,mouseY, pmouseX,pmouseY)
{% endhighlight %}

Run the sketch and have a play. It works, but there are some issues.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-first-paint.png" />
  <figcaption>Note the straight lines drawn between where you stop and resume painting again.</figcaption>
</figure>

The first point you lay connects to the top-left corner via a straight line. This is because `pmouseX` and `pmouseY` grabbed their last x/y coordinates on frame 1 before your moused reached into the display window -- hence, the line's initial position of (0,0). Also, if you paint for a bit then release the mouse button, then click again to paint elsewhere, the app draws a straight line from where you last left-off to your new starting position. While the mouse button is raised, the `draw()` code ceases to execute, so `pmouseX` and `pmouseY` hold coordinates captured prior to the loop's suspension. Make the necessary adjustments to resolve these bugs:

{% highlight py %}
def draw():
    print(frameCount)
    global painting, paintmode

    if paintmode == 'free':
      if not painting and frameCount > 1:
          line(mouseX,mouseY, mouseX,mouseY)
          painting = True
      elif painting:
          stroke(brushcolor)
          strokeCap(brushshape)
          strokeWeight(brushsize)
          line(mouseX,mouseY, pmouseX,pmouseY)

...

def mouseReleased():
    noLoop()
    global painting
    painting = False
{% endhighlight %}

Run the sketch to confirm that everything works. Read over these edits while simulating the process in your mind, paying careful attention to when `painting` is in a true or false state. The `if not painting…` statement draws a line from the *current* x/y coords to the *current* x/y coords (not previous) if `painting` is `False`. The `frameCount > 1` part solves the initial (0,0) problem. The `paintmode` variable will become relevant later when we begin adding different paint-modes.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-first-paint-resolved.png" />
  <figcaption>Painting separate lines with no interconnecting straight lines.</figcaption>
</figure>

The next step is to provide a panel from which the user can select colours and other brush features. Add the code below to the `draw()` loop. It places a black panel against the left edge, and within it, selectable colour swatches based on the `rainbow` list.

{% highlight py %}
        ...
        line(mouseX,mouseY, pmouseX,pmouseY)

    # black panel
    noStroke()
    fill('#000000');  rect(0,0, 60,height)

    # color palette
    fill(rainbow[0]); rect(0,0,  30,30)
    fill(rainbow[1]); rect(0,30, 30,30)
    fill(rainbow[2]); rect(0,60, 30,30)
    fill(rainbow[3]); rect(30,0, 30,30)
    fill(rainbow[4]); rect(30,30,30,30)
    fill(rainbow[5]); rect(30,60,30,30)
{% endhighlight %}

The panel code is placed below the paint code. In this way, Processing draws the panel last so that no paint strokes appear over it.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-panel.png" />
  <figcaption>The panel conceals any paint strokes below it.</figcaption>
</figure>

Selecting buttons is where things get a little clumsy. When you are programming with GUI libraries, every element in your interface is something to which you can attach an *event handler*. Consider your red button:

{% highlight py %}
fill(rainbow[0]); rect(0,0, 30,30)
{% endhighlight %}

Now suppose that you were using some GUI library. The same code might look something like this:

{% highlight py %}
redbutton = createButton(0,0, 30,30, rainbow[0])
{% endhighlight %}

The position, size, and fill parameters are all handled in a single `createButton` function. That's neat, but it gets better! There will be dedicated methods that listen for events. For example, something like a `click()` method that can be attached to any buttons you have created:

{% highlight py %}
redbutton.click( setBrushColor(rainbow[0]) )
{% endhighlight %}

To reiterate: this is not real code. However, we will look at one such library (ControlP5) further into this lesson. What I wish to highlight here is that there is no need to detect the mouse position when event listeners are handling things for you. As this sketch employs no such library, we will adopt a similar approach to that of the [four-square task]({% post_url 2018-07-01-processing.py_in_ten_lessons--03-_control_flow_and_randomness %}#four-square-task) (lesson 03); that is, detecting within which square a pointer is positioned. Overhaul your `mousePressed()` function.

{% highlight py %}
def mousePressed():
    if mouseButton == LEFT:
        loop()

        global brushcolor, brushshape, brushsize

        if mouseX < 30:
            if mouseY < 30:
                brushcolor = rainbow[0]
            elif mouseY < 60:
                brushcolor = rainbow[1]
            elif mouseY < 90:
                brushcolor = rainbow[2]
        elif mouseX < 60:
            if mouseY < 30:
                brushcolor = rainbow[3]
            elif mouseY < 60:
                brushcolor = rainbow[4]
            elif mouseY < 90:
                brushcolor = rainbow[5]
{% endhighlight %}

The outer `< 30` and `< 60` conditions separate the area into two columns; the sub-conditions isolate the row. Run the sketch. You can now select different colours for painting.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-colour-selection.png" />
  <figcaption>Select paint colours from the palette at the top-left.</figcaption>
</figure>

Next, we will add a feature for resizing the brush, mapping the function to the scroll wheel. In addition, there will be a profile of the brush below the swatches. This profile will reflect the active brush's colour, size, and shape. Locate the last line you wrote in the `draw()` function, and add the brush preview code the `draw` block.

{% highlight py %}
    ...
    fill(rainbow[5]); rect(30,60,30,30)

    # brush preview
    fill(brushcolor)
    if brushshape == ROUND:
        ellipse(30,123, brushsize,brushsize)
    paintmode = 'free'
{% endhighlight %}

The last line does nothing for now, but it will be important for the next (sizing) step. The app now renders a brush preview in the panel. Although the size cannot be adjusted yet, the colour of the dot changes as you click different swatches.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-brush-preview.png" />
  <figcaption>The yellow dot in the left panel indicates the brush shape and colour.</figcaption>
</figure>

The [`mouseWheel()`](https://py.processing.org/reference/mouseWheel.html) event function returns positive or negative values depending on the direction the scroll wheel is rotated. Add the following lines to the very bottom of your code.

{% highlight py %}
def mouseWheel(e):
    print(e)
    global brushsize, paintmode

    paintmode = 'select'
    brushsize += e.count

    if brushsize < 3:
        brushsize = 3
    if brushsize > 45:
        brushsize = 45

    redraw()
{% endhighlight %}

This code requires some explanation. Firstly, there is the `e` argument within `mouseWheel()` brackets. You may use any name you like for this argument; it serves as a variable to which all of the event's details are assigned. Note how the Console displays something like this each time the scroll wheel rotates:

`<MouseEvent WHEEL@407,370 count:1 button:0>`

From this output, one can establish the type of mouse event (`WHEEL`), the x/y coordinates at which it occurred (`@407,370`), and the number of scroll increments (`count:1`). If you added an `e` argument to one the other mouse functions -- i.e. `mousePressed()` or `mouseReleased()` -- the `button` value would be some integer. For example, a `mousePressed(e)` upon left-click would hold something like `<MouseEvent PRESS@407,370 count:1 button:37>`

We do not want to paint while adjusting the brush size, so the `paintmode` is switched to `select`. This way, it can be switched back once the adjustment is complete. The switch-back happens inside the `draw` loop.

The `e.count` is used to retrieve the number of scroll increments from the mouse event. It is necessary, however, to include some checks (`if` statements) to ensure that the new size remains within a range of between `3` and `45`.

The [`redraw()`](https://py.processing.org/reference/redraw.html) function executes the `draw()` code just once -- in contrast to a `loop()` that would set it to repeat continuously.

Run the sketch to confirm that you can resize the brush using the scroll wheel.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-brush-preview-sized.png" />
  <figcaption>The green circle in the left panel indicates the brush shape and colour.</figcaption>
</figure>

There is one problem, though. When selecting swatches with a large brush a discernible blob of colour extends into the canvas area.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-brush-preview-bug.png" />
  <figcaption>Selecting a swatch with a large brush.</figcaption>
</figure>

To resolve this issue, add an `if` statement to the `draw()` that disables painting while the mouse is over the panel. Use the `paintmode` variable to control this.

{% highlight py %}
def draw():
    print(frameCount)
    global painting, paintmode

    if mouseX < 60:
        paintmode = 'select'

    ...
{% endhighlight %}

Next, add a clear button that wipes everything from the canvas. This requires a new `clearall` variable, as well as some additional code for the `draw()` and `mousePressed()` blocks.

{% highlight py %}
...
clearall = False

def draw():
    ...

    # clear button
    global clearall
    fill('#FFFFFF')
    text('clear', 10,height-12)

    if clearall:
        fill('#004477')
        rect(60,0, width,height)
        clearall = False

def mousePressed():
    ...
    global clearall
    if mouseY > height-30:
        clearall = True
        redraw()
{% endhighlight %}


The clear button has no hover effect. That is to say, when you position the mouse cursor above it, there is no visible change.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-clear.png" />
  <figcaption>No hover effect for the clear button.</figcaption>
</figure>

It's good practice always to provide mouse hover and pressed states for clickable interface elements. This provides visual feedback to the user indicating when he or she has something activated or is about to select something. A 'while pressed/pressing' state may seem redundant, but most buttons fire-off instructions when a user *releases* the click. In other words, you can click on any interface element -- and provided you keep your mouse button held down -- can then move out of the clickable zone and release without triggering anything. Try it on this link:

<style>
#testlink {
  background-color: #BBB;
  border: 4px solid #666;
  border-left-color: #DDD;
  border-top-color: #DDD;
  color: #000;
  display: inline-block;
  font-family: sans-serif;
  padding: 10px 20px;
  text-decoration: none;
}
#testlink:hover {
  background-color: #CCC;
  border: 4px solid #777;
  border-left-color: #EEE;
  border-top-color: #EEE;
}
#testlink:active {
  background-color: #888;
  border: 4px solid #DDD;
  border-left-color: #666;
  border-top-color: #666;
}
</style>

<a id="testlink" onmouseup="alert('You released while above me!\nTry again -- but this time click, hold, and release somewhere outside of the button.')">some link</a>

We *could* add hover effects to this paint app's interface, but it's going to get too messy. I've tried to keep things orderly, but the code is beginning to turn into [spaghetti](https://en.wikipedia.org/wiki/Spaghetti_code). Once again, this is where it helps to use a proper user-interface toolkit, markup language, or GUI library.

Another small tweak that will improve the interface is a custom mouse cursor. Processing's [`cursor()`](https://py.processing.org/reference/cursor.html) function can switch the standard pointer for an image. Download the PNG file below and add it to your data sub-directory.

<a href="{{ site.url }}/img/pitl07/brush-cursor.png" download>brush-cursor.png</a>

Then add the following code to the end of your `draw()` function:

{% highlight py%}
    if brushsize < 15:
        cursor(CROSS)
    else:
        mousecursor = loadImage('brush-cursor.png')
        mousecursor.resize(brushsize, brushsize)
        cursor(mousecursor)
{% endhighlight %}

There are six predefined cursor arguments: `ARROW`, `CROSS`, `HAND`, `MOVE`, `TEXT`, and `WAIT`. In this case, a crosshair (`CROSS`) will appear for any brush sized less than 15 pixels. For anything larger, the PNG image cursor (an empty circle) appears instead to help gauge the brush size.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-cursor.png" />
</figure>

The appearance of the predefined cursors will vary depending on your operating system. If you ever need to hide the mouse cursor altogether, use the [`noCursor()`](https://py.processing.org/reference/noCursor.html) function.

In the next section, you will explore keyboard interaction. After that, you may want to add some shortcut keys to your drawing app and maybe even some new features?

## Keyboard Interaction

Computers inherited their keyboard designs from typewriters. In adapting, keyboards spawned various new keys -- like, the arrows for navigating text-based interfaces, escape and function keys, and a number pad for more efficient numeric entry. Of course, computers could also perform a more diverse range of tasks, and this warranted the inclusion of further modifier keys (*Alt*, *Ctrl*, *⌘*, *Fn*) to be used in conjunction with existing keys to perform specific operations. The Z, X, C, and V keys, for example, when combined with Ctrl or ⌘, perform undo/copy/cut/paste operations. Each modifier key, essentially, doubles the range of input with the addition of a single key. The typewriter's *shift* key, though, could be credited as the original modifier key. The key got its name from how it physically shift-ed a substantial part of the typewriting mechanism into a position for transferring capital letters.

Over the years, keyboard layout and usage has evolved in interesting ways. The ubiquitous QWERTY arrangement was devised to avoid characters jamming on mechanical typewriters, so arguably there is room for some optimisation in computer designs. On a typewriter, *backspace* literally tracked backwards a space for placing diacritical marks above letters, i.e. typing **e**, then backspace, then **´**, resulted in an **é**. On computers, however, the backspace key deletes characters to the left of the cursor; conversely, the *delete* key eliminates characters to the right of the cursor (although, it formerly punched holes in stiff paper cards). Furthermore, to make things confusing, the backspace key is often labelled 'delete'. The *escape* (Esc) key -- originally included for controlling devices using "escape sequences" -- was commandeered by programmers looking to stop or abort ('escape from') an active process.

Arrow keys were popular for early computer games, but as more titles began to combine the mouse and keyboard, players discovered that a *WASD* configuration provided a more ergonomic arrangement for right-handed mouse users. Today, keyboard manufacturers offer a plethora of gaming-specific designs, including single-handed variations with less than half complement of standard keys.

One can utilise keyboard input in many creative ways. For example, the rhythm game, [*Frets on Fire*](http://fretsonfire.sourceforge.net/), relies on the F1--F5 and Enter keys to emulate the form of a guitar. The mascot on the game's menu screen provides a good idea of how to hold the keyboard.

<figure>
  <img src="{{ site.url }}/img/pitl07/wikimedia-backup/Frets_on_fire_man.svg" style="width:155px;float:left" />
  <img src="{{ site.url }}/img/pitl07/keyboard-frets-on-fire.png" style="width:245px" />
  <br style="clear:both" />
  <figcaption>
    Left: Frets on Fire mascot. Right: gameplay screenshot. The game was developed in Python using the <a href="https://www.pygame.org/news">Pygame</a> library.<br />
    Unreal Voodoo (game author) [<a href="http://www.gnu.org/licenses/gpl.html">GPL</a>], <a href="https://commons.wikimedia.org/wiki/File:Frets_On_Fire_-_logo.png">via Wikimedia Commons</a>
  </figcaption>
</figure>

In <a href="https://juegosrancheros.itch.io/fantastic-arcade-2016">ALPHABET</a>, a game by Keita Takahashi and Adam Saltsman, each letter is controlled by its corresponding key. The goal is to get all of the letters to the end of a wacky obstacle course.

<figure>
  <img src="{{ site.url }}/img/pitl07/keyboard-alphabet.png" />
  <figcaption>
    <a href="https://juegosrancheros.itch.io/fantastic-arcade-2016">ALPHABET</a> screenshot.
  </figcaption>
</figure>

Keyboard interaction in Processing works similarly to mouse interaction. There are a series of system variables -- [`key`](https://py.processing.org/reference/key.html), [`keyCode`](https://py.processing.org/reference/keyCode.html), and [`keyPressed`](https://py.processing.org/reference/keyPressed_var.html) -- as well as event functions -- [`keyPressed()`](https://py.processing.org/reference/keyPressed.html), [`keyReleased()`](https://py.processing.org/reference/keyReleased.html), [`keyTyped()`](https://py.processing.org/reference/keyTyped.html).

We will create a simple game that controls a basic character using keyboard input. The closest game I can think of is *Snake*, although "Snake" is really more of a genre than a game. Many (most?) people are familiar with this game, largely thanks to the version Nokia preinstalled on its hugely successful mobile phones of the late nineties. Our game will be far simpler though, missing many key features. For this reason, it will be named *Sna*.

<figure>
  <img src="{{ site.url }}/img/pitl07/delta-time-nsnake.png" />
  <figcaption>
    <a href="https://github.com/alexdantas/nSnake">nSnake</a>, a text-based snake game. <br />
    Have you ever tried to type "play snake" into Google's search engine?
  </figcaption>
</figure>

Create a new sketch and save it as "sna". Create a "data" sub-directory and place a copy of the [Ernest](https://www.dafont.com/ernest.font) font within it. Add the following code to get started.

{% highlight py %}
def setup():
    size(400,300)
    frameRate(30)
    background('#004477')
    noStroke()
    ernest = createFont('Ernest.ttf', 30)
    textFont(ernest)
    textAlign(CENTER)

playerx = 195
playery = 145
xspeed = 0
yspeed = 0

def draw():
    global playerx, playery, xspeed, yspeed
    playerx += xspeed
    playery += yspeed

    fill(0x66004477)
    rect(0,0, width,height)

    fill('#FFFFFF')
    rect(playerx, playery, 10, 10)
{% endhighlight %}

Run the sketch. Confirm that you have a white square sitting in the middle of a blue background.

<figure>
  <img src="{{ site.url }}/img/pitl07/keyboard-sna-stage.png" />
</figure>

To control the movement of the square -- or if you use your imagination, the 'snake' -- we'll use keyboard input. Add a [`keyTyped()`](https://py.processing.org/reference/keyTyped.html) function; this will be called every-time any key is pressed. Holding down a key results in repeated calls, the frequency of which is determined by your operating system. From here you can establish exactly which key been pressed by printing the [`key`](https://py.processing.org/reference/key.html) system variable; this always holds the most recent key you have used (whether currently pressed or released).

{% highlight py %}
def keyTyped():
    print(key)
{% endhighlight %}

Run the sketch. Whichever key you press appears in the Console. However, there will be specific keys that fail to register, and these include the arrow keys. You will see why this is and how to work around it shortly.

<figure>
  <img src="{{ site.url }}/img/pitl07/keyboard-sna-keytyped.png" class="fullwidth" />
  <figcaption>Any keys you press appear in the Console, although some do not register properly (e.g. arrow keys).</figcaption>
</figure>

For now, though, we will use the W key for moving up. One approach is to place a [`keyPressed`](https://py.processing.org/reference/keyPressed_var.html) system variable inside of the `draw` loop, then use an `if` statement to monitor when it's `True`. Instead, though, we'll employ a [`keyPressed()`](https://py.processing.org/reference/keyPressed.html) event function. Think of it this way: `mousePressed` is to `mousePressed()` what `keyPressed` is to `keyPressed()`.

 Add the following code the end of your working file:

{% highlight py %}
def keyPressed():
    global xspeed, yspeed

    if key == 'w':
        yspeed = -4
{% endhighlight %}

Ensure that this code is flush against the left-edge (not indented within another function). The `if` statement tests the `key` variable to determine if it is equal to `'w'`. Run the sketch. Pressing the w-key sends the 'snake' heading off in an upward direction. The `yspeed` variable -- formerly equal to zero -- is assigned a value of `-4`, which is in turn added to the `y` coordinate with each new frame drawn.

<figure>
  <img src="{{ site.url }}/img/pitl07/keyboard-sna-up.png" />
</figure>

The square passes straight through the top of the display window never to be seen again. We will add some wrap-around walls so that, if the square exits at a given edge, it reappears on the opposite side. Add some `if` statements to the `draw()` function to reposition the cube upon breaching the boundary.

{% highlight py %}
def draw():
    ...
    rect(playerx, playery, 10, 10)

    if playerx > width:
        playerx = 0
    if playerx < 0:
        playerx = width
    if playery < 0:
        playery = height
    if playery > height:
        playery = 0
{% endhighlight %}

Test the game. The cube will now teleport as it exits the display window. Adding left/right/down movement shouldn't be a challenge for you. But, rather than relying on A/D/S, we will employ the arrow keys. Recall that the `key` variable registers any letter-keys, but ignores the arrow- and some other special keys. For detecting these, one uses the [`keyCode`](https://py.processing.org/reference/keyCode.html) system variable. Add a line to print key-codes.

{% highlight py %}
def keyPressed():
    ...
    print(keyCode)
{% endhighlight %}

Run the sketch. Every key that you press produces a corresponding number. The arrow codes range from `37` to `40`.

<figure>
  <img src="{{ site.url }}/img/pitl07/keyboard-sna-keycode.png" class="fullwidth" />
  <figcaption>As indicated in the Console, the arrow keys range from 37 to 40.</figcaption>
</figure>

You can now use these numbers with `if` statements to check for special keys. To make things more readable, Processing provides some keyword alternatives to the number codes, such as `ALT`, `CONTROL`, `SHIFT`, `LEFT`, `RIGHT`, `UP`, and `DOWN`. Add some code for arrow-key movement.

{% highlight py %}
def keyPressed():
    ...
    if keyCode == UP:
        xspeed = 0
        yspeed = -4

    elif keyCode == DOWN:
        xspeed = 0
        yspeed = 4

    elif keyCode == LEFT:
        xspeed = -4
        yspeed = 0

    elif keyCode == RIGHT:
        xspeed = 4
        yspeed = 0
{% endhighlight %}

The game can now handle four-way (but not diagonal) movement.

<figure>
  <img src="{{ site.url }}/img/pitl07/keyboard-sna-four-way.png" />
</figure>

Note, however, that `BACKSPACE`, `DELETE`, `ENTER`, `ESC`, `RETURN`, and `TAB` are not 'special' keys, and therefore held by the `key` variable (along with other 'non-special' keys). If you wish to, you can add the following code to your `keyPressed()` function to test this out.

{% highlight py %}
    if (
         key == BACKSPACE or key == DELETE
         or key == ENTER  or key == ESC
         or key == TAB    or key == RETURN
       ):
        print('you pressed:')
        print('backspace, delete, enter, esc, return, or tab')
{% endhighlight %}

<sup markdown="1">By using a pair of round brackets with the `if` statement, one can break-up conditional expressions across multiple lines. This technique can help improve code readability.</sup>

So far, it's not the most advanced game. Each feature we add must be programmed from the bottom-up, whereas a proper game framework would typically include (at the very least) a built-in selection of pre-programmed rendering, physics, collision detection, audio, animation, and perhaps AI features. Processing has the renderer already, as well as some support for other essentials, like event handlers and graphics. What it lacks, though, can be made up through the inclusion of various [libraries](https://processing.org/reference/libraries/).

In my experience, many people get excited about developing a game when introduced to handling mouse and keyboard interaction. So, we will press on a little further, adding some simple collision detection the Sna sketch. This will (a) provide insight into some further game programming concepts, and (b) help you appreciate all the heavy-lifting a game library can do for you.

### Collision Detection

To establish if two or more shapes have intersected within a game, one performs *collision detection* tests. There are many algorithms for this -- the more accurate types, though, are more demanding on your system (and coding skills). We'll look at one of the most basic forms of collision detection techniques, namely, *axis-aligned bounding boxes* (or AABBs).

With AABB collision testing, a rectangular *bounding box* encapsulates each collide-able element. Of course, many games assets are not perfectly rectangular, so one must sacrifice some accuracy.

<figure>
  <img src="{{ site.url }}/img/pitl07/collision-detection-bounding-boxes.png" />
  <figcaption>Invader: "What? Dude! That sooo didn't hit me!"</figcaption>
</figure>

We can attempt to improve the perceived accuracy by shrinking the bounding box, using multiple boxes, or employing a different yet comparably performant shape -- like, a circle. You could even combine bounding- boxes and circles. Be aware, though, that each obstacle, item, and enemy on screen is tested for collisions with every other obstacle, item, and enemy. Complex bounding volumes can cause a significant increase in processing overhead, and as a result, slow or jerky performance.

<figure>
  <img src="{{ site.url }}/img/pitl07/collision-detection-bounding-volumes.png" />
  <figcaption>Left to right: a smaller bounding box; multiple bounding boxes; a bounding circle.</figcaption>
</figure>

In a few chapters time, we will take a look at circular collision volumes. For even greater accuracy, there are polygonal bounding volumes that can accommodate just about any shape, but these require a heap of involved math!

To begin with AABBs, add a collectable item -- a red square -- to the stage:

{% highlight py %}
def draw():
    ...
    itemx = 300
    itemy = 60
    fill('#FF0000')
    rect(itemx, itemy, 10, 10) # red item
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl07/collision-detection-collectable-item.png" />
</figure>

The collision test will be handled using a single `if` statement and we will build-up the conditional expression one piece at a time. The snake's trail will not trigger any collisions, just the solid white square at its 'head'. Add a new `if` statement to the `draw()` function:

{% highlight py %}
    ...
    rect(itemx, itemy, 10, 10) # red item

    if (
          playerx+10 >= itemx
       ):
        fill('#00FF00')
        text('hit!', 373,28)
{% endhighlight %}

If part of the head is anywhere to the right of the red square, a hit is registered. The `rect()` draws squares from the top-left corner across-and-down, so it is necessary to use `x+10` (the x-coordinate plus the width of the head) to ascertain the x-coordinate of the head's right edge. Run the sketch to confirm that this is working. Watch for the "HIT!" that appears in the top-left corner of the display window. The shaded green area in the image below highlights the 'collision' zone as it operates currently.

<figure>
  <img src="{{ site.url }}/img/pitl07/collision-detection-aabb-1.png" />
  <figcaption>The shaded green area highlights the effective 'collision' zone.</figcaption>
</figure>

To refine this further, expand on the condition to test whether the player has ventured too far rightwards to trigger any possible collision.

{% highlight py %}
    ...
    rect(itemx, itemy, 10, 10) # red item

    if (
          playerx+10 >= itemx and playerx <= itemx+10
       ):
        fill('#00FF00')
        text('hit!', 373,28)
{% endhighlight %}

To explain:  
`playerx+10 >= itemx`  
checks if the *right edge of the head* is overlapping the *left edge of the red item*;  
`playerx <= itemx+10`  
checks if the *left edge of the head* is overlapping the *right edge of the red item*.

This constrains the hit-zone to a vertical band as wide as the item.

<figure>
  <img src="{{ site.url }}/img/pitl07/collision-detection-aabb-2.png" />
  <figcaption>Anywhere within the shaded green strip registers as a hit.</figcaption>
</figure>

The head no longer registers a hit once it has passed the right edge of the item. However, as indicated by the green area in the image, anywhere directly above or below the item reports a collision. To resolve this, add additional checks for the y-axis.

{% highlight py %}
    ...
    rect(itemx, itemy, 10, 10) # red item

    if (
         playerx+10 >= itemx and playerx <= itemx+10
     and playery+10 >= itemy and playery <= itemy+10
       ):
        fill('#00FF00')
        text('hit!', 373,28)
{% endhighlight %}

The result is an axis-aligned bounding-box that conforms perfectly to the red item.

<figure>
  <img src="{{ site.url }}/img/pitl07/collision-detection-aabb-3.png" />
</figure>

The collision detection is now functioning correctly. From here, you could make the item disappear and apply power-up. For example, perhaps the snake's speed could increase when upon collecting the red square? Then maybe after a short period, a new item could appear at some random new location? Before you begin trying anything, though, let's look at one another important game programming concept: *delta time*.

### Delta Time

Films run at a constant frame rate. Games attempt to run at a constant frame rate, yet there is often fluctuation. Your Sna game is ticking over at 30 fps, as specified in the `setup` function. Your computer is powerful enough to check for key input, render the snake's new position, and detect possible collisions -- each and every frame -- without producing any noticeable lag. However, there are instances where a game must perform many additional interframe computations. For example, there may be twenty collectable items scattered about the stage; in such a scenario, a further nineteen AABB collision tests must take place before a new frame can be displayed. More likely, though, it would take thousands of collision tests per frame to produce any perceivable slow-down.

Edit the `yspeed` variable so that the snake immediately heads upward when the sketch runs. In addition to this edit, add an `if` statement to the bottom of your draw function to record the total milliseconds elapsed upon the snake reaching the top edge.

{% highlight py %}
...
yspeed = -2

def draw():
    ...
    if playery > 145:
        fill('#00FF00')
        text(millis(), width/2,28)
        noLoop()
{% endhighlight %}

Run the sketch. The snake heads-off as soon as the display window opens. Upon reaching the top-edge, the `noLoop()` halts everything and the millisecond count is displayed.

<figure>
  <img src="{{ site.url }}/img/pitl07/delta-time-normal.png" />
  <figcaption>The quickest time that my computer managed was 2833 milliseconds. Your computer may be somewhat slower or faster.</figcaption>
</figure>

The fastest possible time that the snake can reach the boundary is 2500 milliseconds. My computer managed 2833 milliseconds, but your system could be slower or faster. The snake has 300 ÷ 2 = 150 pixels to cover, travelling at a speed of 2 pixels-per-frame. So, that's 150 pixels ÷ 2 pixels-per-frame = 75 frames to reach the edge. Recall that the game is running at 30 frames per second. Therefore, 75 total frames ÷ 30 fps = 2.5 seconds, or, 2500 milliseconds. Why can't it manage 2500 milliseconds flat? Well, the very first frame takes some extra time because Processing needs to setup a few things.

To measure the time elapsed between the drawing of each new frame, add the following code:

{% highlight py %}
...
lastframe = 0

def draw():
    global currframe, lastframe
    currframe = millis()
    deltatime = currframe - lastframe
    print(deltatime)

    ...

    lastframe = currframe
{% endhighlight %}

The `currframe` variable is used to record the current time -- which can then compared with the `lastframe` variable. The difference between these two values is assigned to the `deltatime` variable. Run the sketch. Once the snake has reached the top edge, scroll back up through the Console output. The `deltatime` averages around 33 milliseconds -- because 1000 milliseconds divided by 30 (the frame rate) is 33.3 recurring. The exception is the very first value, as the first frame takes significantly longer to process.

<figure>
  <img src="{{ site.url }}/img/pitl07/delta-time-delayed-frame-1.png" class="fullwidth" />
  <figcaption>The <code>deltatime</code> averages around 33 milliseconds, but the first value is much larger.</figcaption>
</figure>

To emulate some heavier processing loads, as if there were thousands of collisions to test, add a highly demanding (if pointless) computational task to the end of your `draw` loop just before the `lastframe = currentframe` line:

{% highlight py %}
def draw():
    ...
    for i in range(ceil(random( 900 ))):
            for j in range(i):
                atan(12345*i) * tan(67890*i)

    lastframe = currentframe
{% endhighlight %}

This new `for` loop does nothing useful. It performs a bunch of intense trigonometry calculations only to discard the values when complete. All of this extra trig-crunching should slow things down. Run the sketch to see what happens.

<figure>
  <img src="{{ site.url }}/img/pitl07/delta-time-slowest-time.png" />
  <figcaption>With the extra processing load, the game runs noticeably slower.</figcaption>
</figure>

You should experience a noticeable reduction in frame rate. Note, however, that the loop employs a random function. The lag effect is, hence, erratic as the loop may run anywhere between zero and 900 times in a single `draw`. In other words, the snake will move smoothly, but then randomly struggle before speeding up again. My computer clocked 5985 milliseconds for the boundary sprint, but yours could be much slower or faster. If you find that your computer is grinding to a near-halt, reduce the `900` to something a bit more manageable. Conversely, if everything seems to be running about as smoothly as before, try doubling this value. You'll want to find some number that, roughly speaking, halves the snake's average speed.

You will also notice that the `deltatime` (the milliseconds elapsed between each frame) values are now far more erratic and generally larger.

<figure>
  <img src="{{ site.url }}/img/pitl07/delta-time-delayed-900.png" class="fullwidth" />
  <figcaption>The <code>deltatime</code> values are larger and more erratic.</figcaption>
</figure>

This is where the *delta time* proves useful. The time between frames can be used to calculate where the snake's head should be, as opposed to where it managed to reach. To calculate the projected `playery` position, multiply it by `deltatime` divided by the sketch frame rate.

{% highlight py %}
    ...
    playery += yspeed * (deltatime/30)
    ...
{% endhighlight %}

Run the sketch. The snake reaches the top-edge in around 2500 milliseconds, even slightly under, as if there were no lag at all. However, rather than rendering each successive head two-pixels apart, the head 'leaps' in larger, unevenly-sized increments. The size of each leap is dependant on how much time is required to catch up. This results in a longer trail, as the starting position in now fewer frames from the ending position. Moreover, some discernible gaps may appear in the trail, although this will depend on how much your system struggles to match 30 frames per second.

<figure>
  <img src="{{ site.url }}/img/pitl07/delta-time-applied.png" />
  <figcaption>Factoring in delta time, the snake reaches the top-edge 'on time', but leaves a longer trail that may contain gaps.</figcaption>
</figure>

You can now adjust the loop's `900` value as you wish and the snake still reaches the top edge in around 2500 milliseconds (give or take a few hundred).

Delta time, thus, helps maintain a constant game speed despite variations in frame rate. We are 'dropping' frames to keep apace, but, ultimately, delta time helps smooth out the movement values. It can also be used to limit frame rates in cases where a game may run too fast. Generally speaking, the motions of any positioning, rotation, and scaling operations should incorporate delta time. On the other hand, games can behave very strangely if physics calculations mix with variable frame rates. Many game engines, hence, include fixed- and variable time-step functions -- like `draw()` -- to separate out physics and graphics code.

That is as deep as we will venture into game development concepts. If it's games you are serious about, then you'll need to explore further using other resources. That said, the concepts and techniques covered in the previous and upcoming tutorials are integral to any journey towards game development.

## ControlP5

*ControlP5* is a feature-packed GUI library, full of options for building and customising user interfaces. It provides an extensive set of control widgets that include buttons, sliders, knobs, toggles, textfields, checkboxes, accordions, charts, timers, drop-downs, tab- and window-interfaces, and more.

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-controllers-range.png" />
  <figcaption>
    Just some of controllers that ControlP5 offers.<br />
    Andreas Schlegel [Copyright], <a href="https://github.com/sojamo/controlp5">via Github</a>
  </figcaption>
</figure>

To begin using ControlP5, one must first install it. From the Processing menu bar, select **Sketch > Import Library... > Add Library...**

This raises the Contribution Manager window; under the *Libraries* tab, locate and install ControlP5.

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-install-library.png" />
</figure>

Once you have the library installed, create a new sketch named "identikit". An identikit -- or *facial composite* -- is a portrait image reconstructed from the memory of one or many eyewitnesses. You have probably seen criminal identikits in police stations or on the news. These are rendered in various ways, namely: by sketch artists; or using a system of overlaid transparencies; or with computer software. Our identikit program will be no use for any real-world application, but fun to play with, nonetheless. To get started, add the following code.

{% highlight py %}
add_library('controlP5')

def setup():
    size(720,485)
    global cp5
    cp5 = ControlP5(this)

def draw():
    background('#004477')
    stroke('#FFFFFF')
    strokeWeight(3)
    axis = 250

    # face
    noFill()
    ellipse(axis,220, 370,370)
{% endhighlight %}

Processing requires the `add_library()` line for loading in ControlP5. A new ControlP5 instance is then assigned to a variable named `cp5`. From here on, any ContolP5 features can be accessed with a `cp5.` prefix; this will make sense a little further along when we begin to add controllers. The `axis` coordinate runs through the centre of the `ellipse` below, in other words it is the lies on horizontal centre of the 'face'. The face is positioned to the left of display in order to make room for control widgets on the right.

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-identikit-start.png" />
  <figcaption>
    The circle will serve as the outline of the face. The empty area to the right is for control widgets.
  </figcaption>
</figure>

The first widget will be a textfield. Add the controller in `setup()` function. The brackets surrounding the `addTextfield()` lines may look odd, but this is necessary to break the chain of [methods]({% post_url 2018-06-19-processing.py_in_ten_lessons--02-_bezier,_catmull,_and_rom_walk_into_a_bar %}#string-methods) over multiple lines. Alternatively, you could write this on a single line but likely won't find it as readable. Whenever you create a new controller, specify a name in the first argument -- in this case, I have used `'alias'`. This name is used to reference the controller further along, as well as the default label for the field.

{% highlight py %}
def setup():
    ...
    (cp5.addTextfield('alias')
        .setPosition(500,20)
        .setSize(200,25)
    )
{% endhighlight %}

In the `draw` function, retrieve the captured input and render it using a `text()` function. The `getController()` method is used to access the properties of any `cp5` controller (by its name), while the `getText()` chained onto it isolates the text value specifically.

{% highlight py %}
def draw():
    ...
    # alias
    fill('#FFFFFF')
    textSize(20)
    textAlign(CENTER)
    alias = cp5.getController('alias').getText()
    text(alias, axis,450)
    noFill()
{% endhighlight %}

Test out the input field. The alias you enter will appear beneath the face.

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-identikit-textfield.png" />
</figure>

Next, we will a number of widgets for controlling the eyes. The additional methods, `setRange()` and `setValue()`, set the lower/upper value range and in the initial position, respectively.

{% highlight py %}
def setup():
    ...
    (cp5.addSlider('eye distance')
        .setPosition(500,80)
        .setSize(200,20)
        .setRange(30,120)
        .setValue(80)
    )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-identikit-slider-default-label.png" />
</figure>

The problem is that the default position for any slider label is to the right of the widget, which doesn't fit nicely in this layout. Add some code that adjusts the alignment and padding so that the label is repositioned at the bottom left.

{% highlight py %}
        ...
        .setValue(80)
    )
    (cp5.getController('eye distance')
        .getCaptionLabel()
        .align(ControlP5.LEFT, ControlP5.BOTTOM_OUTSIDE)
        .setPaddingX(0)
    )
{% endhighlight %}

Before drawing the eyes on the face, add three more control widgets -- a knob and two toggles:

{% highlight py %}
def setup():
    ...
    (cp5.addKnob('eye size')
        .setPosition(515,135)
        .setRadius(35)
        .setRange(10,60)
        .setValue(50)
    )

    (cp5.addToggle('heavy brow')
        .setPosition(635,138)
        .setSize(20,20)
    )

    (cp5.addToggle('sleepless')
        .setPosition(635,185)
        .setSize(20,20)
    )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-identikit-eye-widgets.png" />
  <figcaption>Click and hold down the knob, then pull left and right to adjust the values</figcaption>
</figure>

To draw the eyes, add the following lines to your `draw` function. You will notice that the `getController()` is used to retrieve each of the controller properties -- but, unlike the text-field --- `getValue()` methods have been used in place of `getText()`.

{% highlight py %}
def draw():
    ...
    # eyes
    eyedistance = cp5.getController('eye distance').getValue()
    eyesize = cp5.getController('eye size').getValue()
    ellipse(axis-eyedistance,180, eyesize,eyesize)
    ellipse(axis+eyedistance,180, eyesize,eyesize)

    if cp5.getController('heavy brow').getValue():
        fill('#004477'); stroke('#004477')
        rect(100,180-eyesize/2, 300,eyesize/2)
        stroke('#FFFFFF')
        line(
          axis-eyedistance-eyesize/2-5, 180,
          axis+eyedistance+eyesize/2+5, 180
        )

    if cp5.getController('sleepless').getValue():
        noFill()
        arc(axis-eyedistance,190, eyesize,eyesize, 0,HALF_PI)
        arc(axis+eyedistance,190, eyesize,eyesize, HALF_PI,2.5)
        fill('#004477')
{% endhighlight %}

Run the sketch a have a play with the various eye features.

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-identikit-eye-adjustments.png" />
</figure>

For the nose, we will add a 2D slider. For the mouth, we will use a standard slider but with tick marks for set increments.

{% highlight py %}
def setup():
    ...
    (cp5.addSlider2D('nose position')
        .setPosition(500,240)
        .setSize(200,100)
        .setMinMax(-30,-20,30,20)
        .setValue(0,0)
    )

    (cp5.addSlider('mouth width')
        .setPosition(500,375)
        .setSize(200,20)
        .setRange(10,200)
        .setValue(124)
        .setNumberOfTickMarks(6)
        .setSliderMode(Slider.FLEXIBLE)
    )
    (cp5.getController('mouth width')
        .getCaptionLabel()
        .align(ControlP5.LEFT, ControlP5.BOTTOM_OUTSIDE)
        .setPaddingX(0)
        .setPaddingY(12)
    )

def draw():
    ...
    # nose
    noseposition = cp5.getController('nose position')
    nosex = noseposition.getArrayValue()[0]
    nosey = noseposition.getArrayValue()[1]
    line(axis-10+nosex,180+nosey, axis-10+nosex,300+nosey)
    line(axis-10+nosex,300+nosey, axis-10+nosex+30,300+nosey)

    # mouth
    mouthwidth = cp5.getController('mouth width').getValue()
    line(axis-mouthwidth/2,340, axis+mouthwidth/2,340)
{% endhighlight %}

The 2D slider holds two values in a list, hence the `.getArrayValue()` and square brackets. If you are confused about what the different methods control, try adjusting the the arguments to see what effect this has.

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-identikit-nose-and-mouth.png" />
</figure>

We will add one final button widget. This will save the image to a TIFF file. Event handlers can be added like any other method. However, this requires a `lambda`. Lambdas are not reviewed in these lessons, but if you wish to explore them further, wait until after the next lesson on functions (they'll make far more sense, then). For now, all you need to know is where to write it, and the the `e` variable serves the same purpose its namesake in the mouse event examples from earlier. That is, you can name it whatever you wish, and it holds all of the properties related to the event (in this case, an `.onClick`). To provide some insight into what these are, we will begin by printing them to the console.

{% highlight py %}
(cp5.addButton('save image')
    .setPosition(500,440)
    .setSize(200,25)
    .onClick( lambda e: println(e.getController().getInfo()) )
)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-identikit-lambda.png" class="fullwidth" />
  <figcaption>Clicking the SAVE IMAGE button produces the following Console output.</figcaption>
</figure>

Of course, we wish to save an image. Change the lambda line, replacing everything after the colon with `save()` function that uses the alias input for a filename.

    .onClick( lambda e: save(cp5.getController('alias').getText()) )

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-identikit-save.png" class="fullwidth" />
  <figcaption>The SAVE IMAGE button now saves a .tif file using the alias as a filename.</figcaption>
</figure>

That is as far as we will venture into ControlP5. There's plenty more to explore, though. For instance,  controllers can be moved about the screen using the *Alt* key while click-and-dragging with the mouse. You can also hide the all of the controllers using *Alt+Shift+H*. To activate these shortcut features, add a `cp5.enableShortcuts()` line to the setup block.

{% highlight py %}
def setup():
    ...
    cp5.enableShortcuts()
{% endhighlight %}

For more examples of how to use ControlP5, refer to the **File > Examples...** menu. In the window that pops-up, you'll find an extensive selection of sample sketches. Be warned though: almost all of these are written in Processing's Java language. In spite of this, it should be similar enough for you to understand and translate to Pyhton.

<figure>
  <img src="{{ site.url }}/img/pitl07/controlp5-examples.png" />
</figure>

That's all for this lesson. You are encouraged to experiment and add additional features to the interfaces of the tasks you have completed.

## Lesson 08

You will often find that you repeat the same, or very similar, lines of code within the same sketch. As your programs grow more complex, repetition tends to creep in more and more. For more modular and reusable code, one can employ *functions*. In the next chapter, you will look at how to define and work with functions. As a concept, you should grasp functions without much effort, especially considering what has been covered thus far. Nevertheless, there will be some crunchy tasks to keep you challenged.

**Begin Lesson 08:** Functions *(coming soon)*

**In development**  
*Lesson 08: Functions*  
*Lesson 09: Object-Orientation*  
*Lesson 10: Some Physics*  
*Bonus Lesson: 3D and Shaders*  

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

## References

* http://www.designinginteractions.com/
* http://www.sojamo.de/libraries/controlP5
* https://developer.mozilla.org/Games/Techniques/2D_collision_detection
* https://www.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/human-computer-interaction-brief-intro
