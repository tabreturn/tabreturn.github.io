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
<a href="#drawing-app"><em>drawing app</em></a> /
<a href="#controlp5"><em>controlp5</em></a>

---
&nbsp;  
It is time to look at interactivity in Processing. You can program Processing to work with a range of input, such as microphones, cameras, or even something you have built with an Arduino board. For this lesson, though, we'll stick to plain-old keyboard and mouse input. Most of the upcoming sketches are purely playful, but you'll also look and building a basic drawing application. You will discover that standard Processing functions were not purpose-designed for building user interfaces. But, the lesson includes an introductory tutorial that incorporates the *controlP5* graphical user interface library. This library includes a suit of essential input elements, such as buttons, checkboxes, sliders, toggles, and textfields.

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

Processing provides five system variables for retrieving mouse attributes. These are: [`mouseX`](https://py.processing.org/reference/mouseX.html), [`mouseY`](https://py.processing.org/reference/mouseY.html), [`pmouseX`](https://py.processing.org/reference/pmouseX.html), [`pmouseY`](https://py.processing.org/reference/pmouseY.html), [`mousePressed`](https://py.processing.org/reference/mousePressed_var.html), and [`mouseButton`](https://py.processing.org/reference/mouseButton.html). We will combine them all in one playful sketch.

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

The `frameRate` is relatively slow (20 fps) so that rapid mouse movement results in circles distributed at larger intervals. There will always be a circle in the top-left corner because the pointer is assumed to be at (0, 0) until the pointer moves into the Display window.

The `pmouseX` and `pmouseY` system variables hold the mouse's x/y position from the previous frame. As per the code below, add the two new global variables (`rainbow` and `sw`), comment out the previous `draw` lines, and add the four new lines at the bottom:

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
    line( mouseX,mouseY, pmouseX,pmouseY )
{% endhighlight %}

The `stroke()` line selects a new rainbow colour each time a new frame is drawn. The `line()` function draws a line between the current and previous frame's mouse coordinates. Recall that moving the mouse quickly increases distance between the x/y coordinates captured in successive frames. Run the sketch. As you move your mouse about a multicoloured line traces your path; you are able read the speed of movement by the length of each alternating band of rainbow colour.

<figure>
  <img src="{{ site.url }}/img/pitl07/mouse-interaction-lines.png" />
</figure>

You currently have no way of controlling the flow of colour. Beginning at the top-left corner, the code continuous to connect your mouse locations with colourful lines. To 'turn' the flow on and off, we will activate the tool only while the mouse left-click button is depressed. If any mouse button is currently pressed, the `mousePressed` system variable is equal to `True`; the `mouseButton` will be equal to either `LEFT`, `RIGHT`, or `CENTER`, depending on which button it is that has been clicked. However, the `mousePressed` variable reverts to `False` once you have released, but `mouseButton` retains its value until another button is clicked. For this reason, its best to use these two variables in combination.

pmouse ... previous frame; if mouse==pmouse then no movement

## Keyboard Interaction

...

## Drawing App

...

## controlP5

...


## Lesson 08

...

**Begin Lesson 08:** `parameterize(*args)` *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing-reverse)

## References

* http://www.designinginteractions.com/
* https://www.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/human-computer-interaction-brief-intro
