---
layout: post
comments: true
title: "Processing.py in Ten Lessons – Resources"
categories: code processing python
---

I've created two new resources to help Processing.py users -- **a website for browsing code examples** and a **cheat sheet for beginners**. If you're keen to learn more about Python Mode for Processing, I've written a [series of lessons]({{ site.baseurl }}/#processing-reverse). I've also got a book out, [Learn Python Visually](https://nostarch.com/Learn-Python-Visually), published by No Starch Press.

## 1. A Website for Browsing Code Examples


[PYDE.ORG](http://pyde.org/) hosts a collection of short, prototypical programs exploring the basics of programming with Processing.py.

<figure>
  <img class="fullwidth" style="outline:1px solid #BBB" src="https://raw.githubusercontent.com/tabreturn/pyde.org/master/screenshot.png" />
  <figcaption>
    The PYDE.ORG landing page displaying the examples listing
  </figcaption>
</figure>

So far, I've worked on porting the examples bundled with Processing's Python Mode (ordinarily accessible in the Processing IDE via the *File > Examples...* menu). Each entry displays a sketch that runs in the web browser along with its source code.

<small markdown="1">
You can find the source code for the website on [GitHub](https://github.com/tabreturn/tabreturn.pyde). I built it using [Jinja2](https://jinja.palletsprojects.com/) for templating and [pyp5js](https://berinhard.github.io/pyp5js/) to transcribe processing.py files to p5.js. It uses a modified [Pygments](https://pygments.org/) lexer for syntax highlighting.
</small>

## 2. A Processing Python Mode / Processing.py Cheat Sheet for Beginners

I put together a Processing.py / Python Mode cheat sheet for beginners. If that sounds useful, you can [download the cheat sheet here](https://raw.githubusercontent.com/tabreturn/processing.py-cheat-sheet/master/p.py_cc.pdf).

<figure>
  <img class="fullwidth" style="outline:1px solid #BBB" src="https://raw.githubusercontent.com/tabreturn/processing.py-cheat-sheet/master/img/page_1.png" />
  <figcaption>
    Page 1 of the 2-page cheat sheet
  </figcaption>
</figure>

I figured a simple 2-pager works best (a single sheet of paper, printed on both sides). Once the user outgrows this cheat sheet, the official [Python Mode reference](https://py.processing.org/reference/) is probably more helpful than a cheat sheet with several more pages.

<small markdown="1">
The source files are on [GitHub](https://github.com/tabreturn/processing.py-cheat-sheet). Add to- or edit as you please. I designed the cheat sheet using [Scribus](https://www.scribus.net/) and [Inkscape](https://inkscape.org/).
</small>

## 3. Other Useful Resources

Alexandre Villares has compiled an excellent list of resources for teaching artists, designers, and architects to code with Python. Also, you should check out his impressive *sketch-a-day* repo:

* [https://github.com/villares/Resources-for-teaching-programming](https://github.com/villares/Resources-for-teaching-programming)
* [https://github.com/villares/sketch-a-day](https://github.com/villares/sketch-a-day)

As an alternative to Processing 3D, you might try:

* [Blender scripting](https://tabreturn.github.io/#blender-reverse)
* [GlowScript](https://www.glowscript.org/)

For general Python usage, here's a Processing-less beginner Python cheat sheet by Eric Matthes:

* [https://github.com/ehmatthes/pcc/blob/master/cheat_sheets/beginners_python_cheat_sheet_pcc.pdf](https://github.com/ehmatthes/pcc/blob/master/cheat_sheets/beginners_python_cheat_sheet_pcc.pdf)

*End*
