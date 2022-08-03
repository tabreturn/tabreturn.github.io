---
layout: post
comments: true
title: "Overview of Tools Combining Processing and Python"
categories: code processing python
image: /img/ootcpap/siggraph-video.png
description: Demystifying the Python-Processing Landscape.
published: false
---

A while ago, I was reading over (and responding to) a post on the [Processing forums](https://discourse.processing.org). The thread discussed the future of Processing [Python Mode / Processing.py](https://py.processing.org/), but that's not exactly why I'm writing this blog post. What inspired me was one particular comment from *Setsuna* that read:

<em style="font-weight:bold; font-size:1.5em">py5, p5py, and now pyp5js... Is the community trying to get the newbies confused? Because it's working."</em>
<p><em>-- Setsuna, from the <a href="https://discourse.processing.org/t/what-is-the-future-of-processing-python-mode/35009/20">Processing forums</a></em></p>

Setsuna makes a valid point. People involved in developing Python implementations of Processing should take note. [Processing.py](https://py.processing.org/), [py5](https://py5.ixora.io/), [p5py](https://p5.readthedocs.io/), and [pyp5js](https://berinhard.github.io/pyp5js/) are all great tools that combine Python and Processing. Then, there's [Shoebot](http://shoebot.net/), [DrawBot](https://www.drawbot.com/), and similar projects that incorporate Processing ideas into a Python solution, albeit in ways that deviate more from the typical functions and workings of Processing. Each tool offers unique abilities and advantages (and trade-offs), creating a richer Python creative coding ecosystem. However, it's easy to overwhelm a would-be creative coder, educator, or anybody else interested in exploring Python as a language for learning programming and creative computing applications.

## A Video Explanation to Try Clarify Everything

Enough introduction already!

I presented at [SIGGRAPH 2022](https://s2022.siggraph.org/) on Python-Processing tools, and you can view the presentation at [https://dl.acm.org/doi/10.1145/3532836.3536231](https://dl.acm.org/doi/10.1145/3532836.3536231) (the recording is under the *Supplemental Material* heading)

The talk maps out the Python-Processing landscape, offering insight into the different options and providing direction for beginners, teachers, and more accomplished programmers keen to explore Python as a tool for creative coding projects.

<figure>
  <a href="https://dl.acm.org/doi/10.1145/3532836.3536231"><img src="{{ site.url }}/img/ootcpap/siggrap-video.png" class="fullwidth" /></a>
  <figcaption>Watch the video at <a href="https://dl.acm.org/doi/10.1145/3532836.3536231">https://dl.acm.org/doi/10.1145/3532836.3536231</a></figcaption>
</figure>

The presentation begins with a light introduction to Processing, focusing on how Python Mode (also referred to as Processing.py) leverages Jython to interface with Processing's Java core. The explanation for how this works is the basis for describing the workings of several other Python-Processing tools.

I mention this in the video, but I'll state it here -- I consider Alexandre Villares' [*Processing + Python tools table*](https://abav.lugaralgum.com/Resources-for-teaching-programming/) the most well-maintained and concise summary of tools that combine Python and Processing. The webpage also lists other related tools (Shoebot, Blender's bpy, and more).

<figure>
  <a href="https://abav.lugaralgum.com/Resources-for-teaching-programming/"><img src="{{ site.url }}/img/ootcpap/villares-table.png" class="fullwidth" /></a>
  <figcaption>Alexandre Villares' resources for teaching programming</figcaption>
</figure>

I must also note that, since I produced the video for SIGGRAPH, the [Processing Foundation has invited Tushar Gupta](https://medium.com/processing-foundation/announcing-google-summer-of-code-2022-projects-and-a-few-more-77043ab4d0b4) to work on integrating [Skia](https://skia.org/) as a 2D back-end renderer for p5py. This will provide a significant performance boost and enhance several aspects of the project.

## Why Python?

I believe that a large part of the success of [Processing](https://processing.org/) (and by extension, [p5.js](https://p5js.org/)) is its appeal to creatives and first-time coders. But, in my opinion, Python is a better language (than Java or JavaScript) for those users -- Python can do more than a single line than most other languages, and there's less having to tell beginners, "don't worry about that part, I'll explain it later." Even Ben Fry, Processing co-creator, [thinks that "Python is terrific."](https://github.com/processing/processing4/wiki/Processing-4#goodbye-java)

Brian Kernighan, the co-author of the influential book *C Programming Language*, provides some interesting opinions about first-time programming languages in a [Computerphile interview](https://www.youtube.com/watch?v=h8LTEFNLZ6M). Of course, I'm (more than a little 😉) inclined to agree that Python is an excellent entry into programming, but it's also an in-demand language for professional work. This 'low floor, high ceiling' quality of Python is immensely beneficial to learning environments, too, for students who enter courses with prior programming knowledge and experience and those who desire to explore beyond the course content in their project work. What I'm looking for in a teaching setting is the most effective language to teach 'creative' students transferable concepts and programming skills (for multimedia, web-app, and games programming) down the line. In reality, they'll have to learn several languages through a degree programme, but Python seems the best fit to start that journey.

Kernighan's point on 'instant gratification' is poignant -- something that Processing does so well by generating graphic output with little more effort than opening the pared-down coding environment and typing a line or two of code. Moreover, visually-oriented programming tasks fit excellently into a degree catering to students of creative technologies.

## A Word on py5

I must disclose that I'm involved in the py5 project, so I'm more-than-likely biased.

In addition, I'm working on a [py5 plug-in for the Thonny IDE](https://github.com/tabreturn/thonny-py5mode) that transforms [Thonny](https://thonny.org/) into a Processing PDE alternative for creative coding with Python. Consider that beginners can't differentiate a library from a language from an IDE. "Processing" is just "Processing", IDE and all (as opposed to an IDE combined with the Processing library, requiring users to express themselves in Java). Thonny-py5mode aims to emulate the Python Mode plug-in experience from Processing's PDE -- simple, integrated, with a selection of useful menu items, and beginner-friendly.

<figure>
  <a href="https://github.com/tabreturn/thonny-py5mode"><img src="{{ site.url }}/img/ootcpap/thonny-py5-mode.png" class="fullwidth" /></a>
  <figcaption>The thonny-py5mode plug-in</figcaption>
</figure>

Unlike Processing's Python Mode / Processing.py, py5 supports Python 3 and works with other popular Python libraries and tools such as Jupyter, NumPy, and Pillow. Picking up an earlier point about low floors and high ceilings, here's another [great quote from py5 creator, Jim Schmitz](https://github.com/py5coding/py5generator/discussions/21#discussioncomment-913097) --

<em>"Scratch is good for beginners, but you can't really go very far with it, so people might not want to invest a lot of time and effort into learning it. Python and py5 can go very far, so beginners can see a path from their first steps to something more ambitious, such as a program that combines py5 with Python ML tools."</em>

Did I mention py5 also supports Jupyter Notebook environments?

<figure>
  <a href="https://github.com/tabreturn/thonny-py5mode"><img src="{{ site.url }}/img/ootcpap/py5-jupyter.png" class="fullwidth" /></a>
  <figcaption>py5 running in Jupyter Notebooks</figcaption>
</figure>

To close on another [Ben Fry quote on Python](https://github.com/processing/processing4/wiki/Processing-4#goodbye-java) (with reference to Processing.py's Jython implementation): "it'd be awesome to have available NumPy and all those other things that make Python wonderful." Hello py5!


*End*

## References

* https://discourse.processing.org/t/what-is-the-future-of-processing-python-mode/35009/20
* https://github.com/villares/Resources-for-teaching-programming
* https://py5.ixora.io/
