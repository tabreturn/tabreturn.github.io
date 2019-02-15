---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 07: Soft-Faces"
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#..."><em>...</em></a> /
<a href="#..."><em>...</em></a>

---
&nbsp;  
It is time to look at interactivity in Processing. You can programme Processing to work with a range of input, such as microphones, cameras, or even something you have built with an Arduino board. For this lesson, though, we'll stick to plain-old keyboard and mouse input. Most of the sketches are purely playful, but you'll also look and building a basic drawing application. You will discover that standard Processing functions were not purpose-designed for building interfaces, but there are is an introductory tutorial included that incorporates the *controlP5* graphical interface library.

### Interfaces

It may hard to believe, but there was a time when computers had no video displays. We'll skip over that early punch-card-and-blinking-lights chapter of computing history, though, and begin at the *Command Line Interface* (CLI). Early computer with monitors couldn't display much more than text and basic graphics but this was enough to support a handy CLI. By typing a series of commands, one could instruct a computer to perform its various functions. The CLI, however, is far from dead an buried. While it may no longer be the predominant means of interfacing with computing devices, system administrators and programmers still rely on it for many daily computing tasks. Indeed, you are likely to be surprised by how much can be accomplished just typing instructions. If you have mastered the command line, you will also find it more efficient in certain situations, particularly where repetitive tasks and batch processing are involved.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-terminal-wget.png" class="fullwidth" />
  <figcaption>Linux command line.</figcaption>
</figure>

In the above example, you can spot two `$` symbols; each is referred to as a *prompt*, although the symbol will vary between operating systems. The prompt signifies that the computer is ready to accept input. Two commands have been used here: `cd` for changing directory; and `wget` for downloading a file from a web server. In this case, I'm downloading the command-line version of Processing.py to my Desktop. That's right -- Processing can be run without opening the editor.

A Text-based User Interface (TUI) is a kind of blend between the CLI and modern graphical interface. For example, `w3m` is a text-mode web browser. Using the arrow keys and various one-character keyboard commands one can navigate websites, albeit in with limited styling and no images.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-terminal-w3m.png" class="fullwidth" />
  <figcaption>
    Visiting <a href="http://duckduckgo.com">DuckDuckGo</a> using w3m, a text-mode web browser.
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

It is important to mention, though, that many CLI- and TUI-based computers were not incapable of rendering raster graphics. There were text and graphic modes that the systems could switch between. Take games for example. Of course, text-mode games -- like the dungeon crawler, [Netchack](https://en.wikipedia.org/wiki/NetHack) -- operate in text mode, but for games with graphics the computer switches to addressing individual pixels.

<figure>
  <img src="{{ site.url }}/img/pitl07/interface-text-and-graphic-modes.png" class="fullwidth" />
  <figcaption>
    Text-mode vs graphical games. Left: Netchack; right: Micropolis.
  </figcaption>
</figure>

A Graphical User Interface (GUI) allows for interaction though the manipulation of graphical elements. You routinely make of such interfaces to interact with your computer, web-pages, software, and mobile phone. To narrow down GUIs a bit, I'd like to focus on WIMP interfaces. The Windows/Icons/Menus/Pointer paradigm was developed by Xerox PARC and popularised by Apple. This approach has been massively influential on graphical user interface design, and the WIMP-meets-Desktop metaphor environment has not fundamentally changed since it's inception.

...



..





If you have any experience with programming interfaces in other languages (perhaps some JavaScript, etc.), you'll quickly realise what I mean.

<figure>
  <img src="{{ site.url }}/img/pitl07/wikimedia-backup/SRI_Computer_Mouse.jpg" />
  <figcaption>
    SRI's first computer mouse prototype.<br />
    SRI International [<a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>], <a href="https://commons.wikimedia.org/wiki/File:SRI_Computer_Mouse.jpg">via Wikimedia Commons</a>
  </figcaption>
</figure>


<!--
* HCI
 * CLIs, GUIs
 * GOMS and KLM
 * Desktop metaphor
 * Skeuomorph
 * Affordance
* Principles of interaction design (Tognazzini)
* Graphic art software
 * Interface history
 * Shift to digital illustration
* Drawing machines
 * Harold Cohen, Paul Henry Desmond
 * Other drawing machines

* Mouse interaction
 * mouseX, mouseY, mouseButton
 * mousePressed(), mouseReleased(), mouseMoved(), mouseDragged()
 * Drawing with the mouse
 * Drag and drop
* Keyboard interaction
 * keyPressed(), keyReleased()
 * key, keyCode
* Drawing app
 * Drawing with dynamic brushes
-->

## Lesson 08

...

**Begin Lesson 08:** `parameterize(*args)` *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing-reverse)

## References

* ...
