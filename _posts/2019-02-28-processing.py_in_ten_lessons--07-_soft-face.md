---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 07: Soft-Face"
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#mouse-interaction"><em>mouse interaction</em></a> /
<a href="#keyboard-interaction"><em>keyboard interaction</em></a> /
<a href="#controlp5"><em>controlp5</em></a>

---
&nbsp;  
It is time to look at interactivity in Processing. You can program Processing to work with a range of input, such as microphones, cameras, or even something you have built with an Arduino board. For this lesson, though, we'll stick to plain-old keyboard and mouse input. Most of the upcoming sketches are purely playful, but you'll also look and building a basic painting application. You will discover that standard Processing functions were not purpose-designed for building user interfaces. But, the lesson includes an introductory tutorial that incorporates the *controlP5* graphical user interface library. This library includes a suit of essential input elements, such as buttons, checkboxes, sliders, toggles, and textfields.

[Complete list of Processing lessons]({{ site.baseurl }}/#processing-reverse)

### Some User Interface History

It may hard to believe, but there was a time when computers had no video displays. We'll skip over that early punch-card-and-blinking-lights-and-teleprinters chapter of computing history, though, and begin at the *Command Line Interface* (CLI). Early computer with monitors couldn't display much more than text and basic graphics but this was enough to support a handy CLI. By typing a series of commands, one could instruct a computer to perform its various functions. The CLI, however, is far from dead an buried. While it may no longer be the predominant means of interfacing with computing devices, system administrators and programmers still rely on it for many daily computing tasks. Indeed, you are likely to be surprised by how much can be accomplished just typing instructions. If you have mastered the command line, you will also find it more efficient in certain situations, particularly where repetitive tasks and batch processing are involved.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-terminal-wget.png" class="fullwidth" />
  <figcaption>Linux command line.</figcaption>
</figure>

In the above example, you can spot two `$` symbols; each is referred to as a *prompt*, although the symbol will vary between operating systems. The prompt signifies that the computer is ready to accept input. Two commands have been used here: `cd` for changing directory; and `wget` for downloading a file from a web server. In this case, I'm downloading the command-line version of Processing.py to my Desktop. That's right -- Processing can be run without opening the editor.

A Text-based User Interface (TUI) is a kind of blend between the CLI and modern graphical interface. For example, `w3m` is a text-mode web browser. Using the arrow keys and various one-character keyboard commands one can navigate websites, albeit in with limited styling and no images.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-terminal-w3m.png" class="fullwidth" />
  <figcaption>
    Browsing <a href="http://duckduckgo.com">duckduckgo.com</a> using w3m, a text-mode web browser.
  </figcaption>
</figure>

For richer text-based interfaces, many old systems included *semigraphics*. You can think of semigraphics as extra characters that allow you to 'draw' with type. Many of these characters have been adopted in modern systems; for instance, you can copy-paste these symbols straight from your web browser into any text document: &#9824; &#9829; &#9830; &#9827;. Additionally, Unicode includes over a hundred box-drawing characters for constructing TUI interfaces.

<figure>
  <code>┘ ┐┌└ ┼ ─ ├ ┤ ┴ ┬ │</code>
  <figcaption>
    A partial selection of Unicode box-drawing characters.
  </figcaption>
</figure>

In text-mode, a computer display is measured in characters as opposed to pixels. For instance, the [ZX Spectrum](https://en.wikipedia.org/wiki/ZX_Spectrum), released in 1982, managed 32 columns × 24 rows of characters on a screen with a resolution of 256×192 pixels. Because text-mode environments rely on [mono-spaced]({% post_url 2018-06-19-processing.py_in_ten_lessons--02-_bezier,_catmull_and_rom_walk_into_a_bar %}#fonts) characters, box-drawing characters can always align perfectly.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-terminal-mc.png" class="fullwidth" />
  <figcaption>Midnight Commander running in a hundred-column (approx.) display.</figcaption>
</figure>

It is important to mention, though, that many CLI- and TUI-based operating systems were not incapable of rendering raster graphics. There were text and graphic modes that the systems could switch between. Take games for example. Of course, text-mode games -- like the dungeon crawler, [Netchack](https://en.wikipedia.org/wiki/NetHack) -- operate in text mode, but for games with graphics the computer switches to addressing individual pixels. Even today, PCs still boot in text mode.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-text-and-graphic-modes.png" class="fullwidth" />
  <figcaption>
    Text-mode vs graphical games. Left: Netchack; right: Micropolis.
  </figcaption>
</figure>

A Graphical User Interface (GUI) allows for interaction though the manipulation of graphical elements. You routinely make of such interfaces to interact with your computer, web-pages, application software, and mobile phone. To narrow down GUIs a bit, I'd like to focus on WIMP interfaces. The Windows/Icons/Menus/Pointer paradigm was developed by Xerox PARC in 1973 and popularised by Apple's Macintosh in 1984. This approach has been massively influential on graphical user interface design, and the WIMP-meets-desktop environment has remained fundamentally unchanged since it's inception. The desktop metaphor was particularly intuitive as it mimicked the very items that computers sought to replace -- documents, folders, notepads, and the trashcan. Commands were replaced with gestures and operations listed within menus. For example, rather than typing `mv` commands, user can drag-and-drop files to move them between folders (directories).

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-gem.png" />
  <figcaption>
    The OpenGEM GUI. The GEM Desktop 1.0 was released in February 1985. Apple Computer sued the developers (DRI) for copying their Macintosh interface.
  </figcaption>
</figure>

Apple licensed certain GUI features to Microsoft for use in Windows 1.0, but sued them when features like overlapping windows appeared in Windows 2.0. The district court ruled in favour of Microsoft. Regardless, Windows 1.x and 2.x were slow, clumsy, and poorly received. Most Microsoft users stuck with the CLI environment, MS-DOS. With VGA-colour, fonts, mouse support, and lightning-fast performance thanks to text-mode, MS-DOS TUIs grew to become remarkably advanced.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-dos-tui.png" />
  <figcaption>
    <a href="http://www.adlibtracker.net/">Adlib Tracker II</a>, a TUI music tracker (software for creating music) for Microsoft DOS.
  </figcaption>
</figure>

Many important hard- and software developments paved the way for WIMP environments. Arguably, though, it was the invention of the mouse set that the process in motion. It was Douglas Engelbart -- in collaboration with computer engineer, Bill English -- who created the first mouse prototype in 1964.

<figure>
  <img src="{{ site.url }}/img/pitl07/wikimedia-backup/SRI_Computer_Mouse.jpg" />
  <figcaption>
    SRI's first computer mouse prototype.<br />
    SRI International [<a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>], <a href="https://commons.wikimedia.org/wiki/File:SRI_Computer_Mouse.jpg">via Wikimedia Commons</a>
  </figcaption>
</figure>

In reality, the development of GUIs involved many people over many years. As the field developed, it spawned new disciplines. *Human Computer Interaction* (HCI) researchers emerged in the early 1980s. Bill Moggridge and Bill Verplank coined *Interaction Design* (IxD) in the mid-1980s to describe the practice of designing interactive digital products -- Moggridge felt this was an improvement over his earlier term, *Soft-Face*. Since then, *User Experience* (UX) designers, *User Interface* (UI) designers, *Information Architects* (IA) have all entered the scene. I'd imagine that some mutant Venn diagram exists that helps explain how all of these disciplines relate to one another.

Of course, the advances in interaction design are not limited to software. Touchpads found their niche in for laptops (as well as MP3 players and nifty music synthesisers). Touchscreens hit it big with tablets and smartphones. Then there is gesture recognition, force feedback, GPS, and augmented reality. Voice recognition has gained newfound traction thanks to enhanced natural language processing. In some respects, we've come full circle -- instead of typing in commands at the CLI, we now issue them with voice!

We will program our own GUI in this lesson. We will stick to keyboard/mouse, but you are encouraged to explore other means of interaction in your own time. GUI programming features prominently in many software and web development projects, so there are plenty of GUI toolkits out there. HTML is purpose-built for constructing web-pages. You'll discover that programming basic buttons without any readymade widgets is painful enough, not to mention constructing checkboxes, sliders, drop-down lists, text fields, and windows. I'll try to provide a few tips on good user interface design in the process, but this is an area the requires another book(s) to cover in any proper detail.

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

Run the sketch and move your mouse pointer about the display window. The `print` function uses the `mouseX` and `mouseY` system variables to print the x/y-coordinates to the Console. The x/y position of the `ellipse` (circles) are also governed by `mouseX` and `mouseY`.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-circles.png" />
</figure>

The `frameRate` is relatively slow (20 fps) so that rapid mouse movement results in circles distributed at larger intervals. There will always be a circle in the top-left corner because the pointer is assumed to be at (0,0) until the pointer moves into the display window.

The `pmouseX` and `pmouseY` system variables hold the mouse's x/y position from the previous frame. In other words, if the `mouseX` is equal to the `mouseY` you know the mouse has not moved. As per the code below, add the two new global variables (`rainbow` and `sw`), comment out the previous `draw` lines, and add the four new lines at the bottom:

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

The `stroke()` line selects a new rainbow colour each time a new frame is drawn. The `line()` function draws a line between the current and previous frame's mouse coordinates. Recall that moving the mouse quickly increases distance between the x/y coordinates captured in successive frames. Run the sketch. As you move your mouse about a multicoloured line traces your path; you are able read the speed of movement by the length of each alternating band of rainbow colour.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-lines.png" />
</figure>

You currently have no way of controlling the flow of colour. Beginning at the top-left corner, the code continuous to connect your mouse locations with colourful lines. To 'turn' the flow on and off, we will activate the tool only while the mouse left-click button is depressed. If any mouse button is currently pressed, the `mousePressed` system variable is equal to `True`; the `mouseButton` will be equal to either `LEFT`, `RIGHT`, or `CENTER`, depending on which button it is that has been clicked. However, the `mousePressed` variable reverts to `False` once you have released, but `mouseButton` retains its value until another button is clicked. For this reason, its best to use these two variables in combination. Now, insert an `if` statement to control the `line` function.

{% highlight py %}
    ...
    strokeWeight(sw)

    if mousePressed and mouseButton == LEFT:
        line(mouseX,mouseY, pmouseX,pmouseY)
{% endhighlight %}

Run the sketch and test the left mouse button.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-left-button.png" />
  <figcaption>You can determine the speed at which I drew by the colour intervals.</figcaption>
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
    Middle click sets the stroke-weight to 3; right-click increases it by 1-pixel with each click.<br />
    Can you figure out if I drew these lines left-to-right or vice versa? <span style="font-style:normal">🤔</span>
  </figcaption>
</figure>

The shapes need not persist. Play around to see what interesting effects you can create. As an example I have added this code to the `draw` function.

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

The background now changes colour as you move towards different corners; the x mouse position shifts the hues while the y position adjusts the saturation. Rectangles appear as you move the mouse about then fade progressively as the frames advance. The [`noCursor()`](https://py.processing.org/reference/noCursor.html) function hides the mouse pointer in the display window.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-squares.png" />
</figure>

The right- and centre-click functions should still be operational so that you can increase the size of the squares by adjusting the stroke weight.

### Paint App

Processing offers a selection of mouse *functions* -- which somewhat overlap in functionality with the mouse variables -- but, are placed outside of the `draw()` function. These are:
[`mousePressed()`](https://py.processing.org/reference/mousePressed.html),
[`mouseReleased()`](https://py.processing.org/reference/mouseReleased.html),
[`mouseWheel()`](https://py.processing.org/reference/mouseWheel.html),
[`mouseClicked()`](https://py.processing.org/reference/mouseClicked.html),
[`mouseDragged()`](https://py.processing.org/reference/mouseDragged.html), and
[`mouseMoved()`](https://py.processing.org/reference/mouseMoved.html).
We will combine the first three to create a simple paint app that features a panel for selecting and adjusting brush properties. Once you've grasped a few mouse functions, it's easy enough to [look up](https://py.processing.org/reference/) and figure out the others. We will also be controlling Processing's `draw()` behaviour manually.

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

The [`noLoop()`](https://py.processing.org/reference/noLoop.html) function prevents Processing continually executing code within `draw()`. If you run the sketch, the Console displays a single "`1`", confirming that the `draw` ran just once. This may seem odd to you. After all, if you wanted to avoid frames, why would you include a `draw()` at all? Well, there is also a [`loop()`](https://py.processing.org/reference/loop.html) function to reactivate the standard `draw` behaviour. As you will come to see, controlling the loop behaviour with mouse functions is a neat approach to building the interface.

Add some global variables. It shouldn't matter if you place these above or below the `setup()` code, as long the lines are flush against the left-edge. These variables will be used to adjust and monitor the state of the brush.

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

The [`mousePressed()`](https://py.processing.org/reference/mousePressed.html) function is called once with every press of a mouse button. If you need to establish which button has been pressed you can use it in combination with the `mouseButton` variable. Add the code below. Ensure that the lines are flush left and that you have not placed the code within the `setup()` or `draw()`.

{% highlight py %}
def mousePressed():
    if mouseButton == LEFT:
        loop()
{% endhighlight %}

Run the sketch. The moment you left-click within the display window frame numbers begin to count-up in the Console. To stop these once the mouse button has been released, use a The [`mouseReleased()`](https://py.processing.org/reference/mousePressed.html) function, which is called once with every release of a mouse button.

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
  <figcaption>Note the straight lines drawn between where you stop and start painting again.</figcaption>
</figure>

The first point you lay is connected to the top-left corner via a straight line. This is because `pmouseX` and `pmouseY` grabbed their last x/y coordinates on frame 1, before your moused reached into the display window -- hence, the line's initial position of (0,0). Also, if you paint for a bit then release the mouse button, then click again to paint elsewhere, a straight line is drawn from where you last left-off to your new starting position. This is because the `draw()` code ceases to execute while the mouse button is lifted, so `pmouseX` and `pmouseY` hold coordinates captured prior to the loop's suspension. As per the code below, make the relevant adjustments to resolve these bugs.

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

Run the sketch to confirm that everything works. Read over these edits while simulating the process process in your mind paying careful attention to when `painting` is in a true/false state. The `if` statement draws a line from the *current* x/y coords to the *current* x/y coords (not previous) if `painting` is set to `False`. The `frameCount > 1` part solves the initial (0,0) problem. The `paintmode` will become relevant later when we begin add different paint-modes.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-first-paint-resolved.png" />
  <figcaption>Painting separate lines with no interconnecting straight lines.</figcaption>
</figure>

It is now time to create a panel from which the user can select colours and other brush features. Begin by adding a black panel and selectable colour swatches based on the rainbow list. The code must be added to the `draw` loop.

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

By drawing the panel after the paint lines you avoid any strokes appearing over it.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-panel.png" />
  <figcaption>The panel is drawn over any painted elements.</figcaption>
</figure>

Selecting buttons is where things get a little clumsy. When you are programming with widget toolkits, every element in your interface is something to which you can attach an event handler. Consider your red button:

{% highlight py %}
fill(rainbow[0]); rect(0,0, 30,30)
{% endhighlight %}

Now suppose that you were using some GUI coding toolkit. The same code might look something like this:

{% highlight py %}
redbutton = createButton(0,0, 30,30, rainbow[0])
{% endhighlight %}

The position, size, and fill parameters are all handled in a single `createButton` function. That's neat, but it gets better. To add click events, there will be dedicated methods. For example, something like a `click()` method that acts upon the button you have already created:

{% highlight py %}
redbutton.click( setBrushColor(rainbow[0]) )
{% endhighlight %}

No matter where you place the button, clicking it will set the brush colour to red. To stress: this is not real code. However, we will look at controlP5 further into the lesson. The point is that there's no need to detect where the mouse is as this it's handled by the GUI library.

The approach here will be similar to that of the [four-square task]({% post_url 2018-07-01-processing.py_in_ten_lessons--03-_randomly-generated-lesson-title %}#four-square-task) in lesson 03, detecting where the pointer is and within which square that is located. Add the the global line and everything beneath it to your `mousePressed()` function:

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

The parent `< 30` and `< 60` conditions separate the two columns; the sub-conditions isolate the row. Run the sketch. You can now select different colours during your paint session.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-colour-selection.png" />
  <figcaption>Paint colours are selected from the palette at the top-left.</figcaption>
</figure>

Next, we will add a feature for resizing the brush; this will be mapped to the scroll wheel. We will include a preview of the brush in the panel; this will indicate the colour, size, and shape. Locate the last line you wrote in the `draw()` function, and add everything from brush comment and onward:

{% highlight py %}
    ...
    fill(rainbow[5]); rect(30,60,30,30)

    # brush preview
    fill(brushcolor)
    if brushshape == ROUND:
        ellipse(30,123, brushsize,brushsize)
    paintmode = 'free'
{% endhighlight %}

The last line does nothing for now, but it will be important for the next (sizing) step. The app now renders a brush preview in the panel. Although the size cannot be adjusted yet, the colour of the dot changes as you select different swatches.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-brush-preview.png" />
  <figcaption>The yellow dot in the left panel indicates the brush shape and colour.</figcaption>
</figure>

The [`mouseWheel()`](https://py.processing.org/reference/mouseWheel.html) function returns positive or negative values, depending on the direction you rotate the scroll wheel. Add the following lines to the very bottom of your code:

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

Okay -- so there's a fair amount to explain here. Firstly, the `mouseWheel()` function has an argument of `e`. You may use any name you like for this argument; it is a variable to which all of the event's details are assigned. Printing `e` displays something like this in the Console:

`<MouseEvent WHEEL@407,370 count:1 button:0>`

From this line, one can establish the type of mouse event (`WHEEL`), the x/y coordinates at which it occurred (`@407,370`), and the number of scroll increments (`count:1`). If you added an `e` argument to one the other mouse functions, the `button` value would be some other integer. For example, a `mousePressed(e)` upon left-click would display something like `<MouseEvent PRESS@407,370 count:1 button:37>`.

We do not want to paint while adjusting brush size, so the `paintmode` is switched to `select`. This way, it can be switched back once the adjustment is complete. Recall that the switch-back happens in the `draw` loop.

The `e.count` is used to retrieve the number of scroll increments from the mouse event. However, some there are some checks in place (`if` statements) to ensure that the size remains within a range of between `3` and `45`.

The [`redraw()`](https://py.processing.org/reference/redraw.html) function executes the `draw()` code just once -- in contrast to a `loop()`, which will set it off continuously again.

Run the sketch to confirm that you can resize the brush using the scroll wheel.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-brush-preview-sized.png" />
  <figcaption>The green circle in the left panel indicates the brush shape and colour.</figcaption>
</figure>

This does cause a new problem, though. The pointer whenever you click, so when selecting swatches with a large brush leaves discernible blobs to that extend into the canvas area.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-brush-preview-bug.png" />
  <figcaption>A blue blob is painted as I click to select the blue swatch.</figcaption>
</figure>

To resolve this issue, add an `if` statement to the `draw()` that disables any painting while the mouse is over the panel, using the `paintmode` variable:

{% highlight py %}
def draw():
    print(frameCount)
    global painting, paintmode

    if mouseX < 60:
        paintmode = 'select'

    ...
{% endhighlight %}

Next, we will add a clear button that wipes everything from the canvas.

{% highlight py %}
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

clearall = False

def mousePressed():
    ...
    global clearall
        if mouseY > height-30:
            clearall = True
            redraw()
{% endhighlight %}


The clear button has no hover effect. That is to say, when you position the mouse cursor above it there is no visible change.

<figure>
  <img src="{{ site.url }}/img/pitl07/paint-app-clear.png" />
  <figcaption>No hover effect for the clear button.</figcaption>
</figure>

It's good practice to always provide mouse hovering and pressed states for clickable interface elements. This provides visual feedback to the user indicating when he or she has something activated or is about to select something. A 'while pressing' state may seem redundant, but most buttons fire-off instructions when a user *releases* the click. In other words, you can click on any interface element -- and provided you keep your mouse button held down -- can then move out of the clickable zone and release without triggering anything. Try it on this link:

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

<a id="testlink" onmouseup="alert('You released while above me!\nTry again -- but this time click, hold, and release somewhere off to the side.')">some link</a>

We *could* add hover effects to this paint app's interface, but it is going to get messy. I've tried to keep things orderly but it's beginning to turn into [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code) already. Once again, this is where it helps to use a proper user interface markup language or GUI library.

## Keyboard Interaction

Computers inherited their keyboard designs from typewriters. In the process, though, keyboards picked-up various new keys -- like, the arrow keys for navigating text-based interfaces, escape and function keys, and a number pad for more efficient numeric entry. Of course, computers could perform a more diverse range of tasks, and this warranted the inclusion of further modifier keys (*Alt*, *Ctrl*, *⌘*, *Fn*) to be used in conjunction with character keys for performing specific operations. The Z, X, C, and V keys, for example, when combined with Ctrl or ⌘, perform undo/copy/cut/paste operations. Each modifier key, essentially, doubles the range of input without doubling the number of keys. The typewriter's *shift* key, however, could be credited as the original modifier key. The key got its name from how it physically shift-ed a substantial part of the typewriting mechanism into a position transferring capital letters.

Over the years, keyboard layout and usage has evolved in interesting ways. The QWERTY arrangement was devised to avoid characters jamming on mechanical typewriters, so arguably there is room for optimisation in computer designs. On a typewriter, *backspace* literally tracked backwards a space so that diacritical marks could be placed above letters, i.e. typing **e**, then backspace, then **´**, resulted in **é**. On computers, the backspace key deletes characters to the left of the cursor; conversely, the *delete* key eliminates characters to the right (although, it formerly punched holes in stiff paper cards). To make things confusing, the backspace key is often labelled 'delete'. The *escape* (Esc) key was originally included for controlling devices using "escape sequences", but application programmers commandeered it to stop or abort ('escape from') an active process. Arrow keys were popular for early computer games, but as more titles began to combine the mouse and keyboard, developers and players discovered that a *WASD* configuration provided a more ergonomic arrangement for right-handed mouse users. Today, keyboard manufacturers offer a plethora of gaming-specific designs, including single-handed variations with less than half the usual compliment of keys.

Keyboard input can be utilised in creative ways. For example, the rhythm game, [*Frets on Fire*](http://fretsonfire.sourceforge.net/), relies on the F1--F5 and Enter keys to emulate the form of a guitar. The mascot on the game's menu screen provides a good idea of how the keyboard is to be held.

<figure>
  <img src="{{ site.url }}/img/pitl07/wikimedia-backup/Frets_on_fire_man.svg" style="width:155px;float:left" />
  <img src="{{ site.url }}/img/pitl07/keyboard-frets-on-fire.png" style="width:245px" />
  <br style="clear:both" />
  <figcaption>
    Left: Frets on Fire mascot. Right: gampeplay screenshot. The game was developed in Python using the <a href="https://www.pygame.org/news">Pygame</a> library.<br />
    Unreal Voodoo (game author) [<a href="http://www.gnu.org/licenses/gpl.html">GPL</a>], <a href="https://commons.wikimedia.org/wiki/File:Frets_On_Fire_-_logo.png">via Wikimedia Commons</a>
  </figcaption>
</figure>

In <a href="https://juegosrancheros.itch.io/fantastic-arcade-2016">ALPHABET</a>, a game by Keita Takahashi and Adam Saltsman, each letter is controlled by its corresponding key. The goal is to get all of the letters to the end of a whacky obstacle course.

<figure>
  <img src="{{ site.url }}/img/pitl07/keyboard-alphabet.png" />
  <figcaption>
    <a href="https://juegosrancheros.itch.io/fantastic-arcade-2016">ALPHABET</a> screenshot.
  </figcaption>
</figure>

Keyboard interaction in Processing works similarly to mouse interaction. There are a series of system variables -- [key](https://py.processing.org/reference/key.html/), [keyCode](https://py.processing.org/reference/keyCode.html), and [keyPressed](https://py.processing.org/reference/keyPressed_var.html) -- as well as listening functions -- [keyPressed()](https://py.processing.org/reference/keyPressed.html), [keyReleased()](9https://py.processing.org/reference/keyReleased.html), [keyTyped()](https://py.processing.org/reference/keyTyped.html).

We will create a simple game that controls a simple character using keyboard input. The closest game I can think of is *Snake*, although "Snake" is really more of a genre than a game. Many (most?) people are familiar with the game, largely thanks to the version Nokia preinstalled on its hugely successful mobile phones of the late nineties. Our game will be far simpler, though. It will be missing a number of key features so I have decided to name it, *Sna*.

Create a new sketch and save it as "sna". Add the following setup code.
{% highlight py %}
def setup():
    size(600,600)
    background('#004477')

def draw():
    pass
{% endhighlight %}

https://py.processing.org/reference/pass.html

explain functions, then have reader go back to paint app and add functions as per shortcuts in panel

...

a word about games

collision detection

delta time

<figure>
  <img src="{{ site.url }}/img/pitl07/delta-time-nsnake.png" />
  <figcaption>
    <a href="https://github.com/alexdantas/nSnake">nSnake</a>, a classic snake game with text-based interface.
  </figcaption>
</figure>



## controlP5

...


## Lesson 08

...

**Begin Lesson 08:** `parameterize(*args)` *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing-reverse)

## References

* http://www.designinginteractions.com/
* https://www.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/human-computer-interaction-brief-intro
