---
layout: post
comments: true
title: "Overview of Tools Combining Processing and Python"
categories: code processing python
image: /img/ootcpap/siggraph-video.png
description: Demystifying the Python-Processing Landscape.
published: false
---

A while ago, I was reading over (and responding to) a thread on the [Processing forums](https://discourse.processing.org). The thread itself discussed the future of Processing [Python Mode / Processing.py](https://py.processing.org/), but that's not exactly why I'm writing this post. The comment from *Setsuna* read:

*"py5, p5py, and now pyp5js... Is the community trying to get the newbies confused? Because it's working"*  
-- Setsuna, from the [Processing forums](https://discourse.processing.org/t/what-is-the-future-of-processing-python-mode/35009/20)

Setsuna makes a valid point -- one we should listen too as people involved in developing and promoting Python implementations of Processing. This is something I've been thinking about for a while. [py5](https://py5.ixora.io/), [p5py](https://p5.readthedocs.io/), and [pyp5js](https://berinhard.github.io/pyp5js/) are all great approaches to combining Python and Processing. Then, there's [Shoebot](http://shoebot.net/), [DrawBot](https://www.drawbot.com/), and similar tools that incorporate Processing ideas in to a Python solution, albeit in ways that deviate more from the familiar functions and workings of Processing.

I believe that a large part of [Processing](https://processing.org/)'s (and by extension, [p5.js](https://p5js.org/)) success is its appeal to creatives and first-time coders. But, in my opinion, Python is a better language for those people (better than Java and JS). Even Ben Fry thinks that ["Python is terrific"](https://github.com/processing/processing4/wiki/Processing-4#goodbye-java).

##

https://dl.acm.org/doi/10.1145/3532836.3536231

##




## A Word on py5

I must disclose that I'm involved in py5 project, so I'm likely biased.


a bundled IDE (or one-click plugin) that won't require installing packages, runtimes, etc. Beginners and teachers don't want to wrestle with that stuff. The beginner documentation should match that IDE (think screenshots, instructions, etc.).
Also, consider that beginners can't differentiate a library from a language from an IDE. "Processing" is just "Processing", IDE and all. "Python Mode" is a plugin, and nobody needs to know it's Jython+whatever. Can py5 be the name for a library and an IDE/plugin? Just something to think about.

I must mention that, since I produced the video for SIGGRAPH, the [Processing Foundation has invited [Tushar Gupta](https://medium.com/processing-foundation/announcing-google-summer-of-code-2022-projects-and-a-few-more-77043ab4d0b4) to work on integrating [Skia](https://skia.org/) as a 2D back-end renderer for p5py -- which will provide a significant performance boost and enhance several aspects of the project.



have a low floor and high ceiling. I think it is important to provide a learning path that provides beginners with an avenue to achieve something that motivates them. For example, Scratch is good for beginners, but you can't really go very far with it, so people might not want to invest a lot of time and effort into learning it. Python and py5 can go very far, so beginners can see a path from their first steps to something more ambitious, such as a program that combines py5 with Python ML tools.


Jupyter. There are Jupyter kernels for Java. One could build a custom Java kernel that did the processing specific tasks. And the great thing about that is that you'd constantly get updates because of other people's contributions.





Coming back to Ben Fry's [comments on Python](https://github.com/processing/processing4/wiki/Processing-4#goodbye-java) (with reference to Processing.py's Jython implementation), he goes on to say, "but it'd be awesome to have available NumPy and all those other things that make Python wonderful." Hello py5!

https://github.com/villares/Resources-for-teaching-programming





## 1st heading

...

*End*

## References

* https://discourse.processing.org/t/what-is-the-future-of-processing-python-mode/35009/20
* https://github.com/villares/Resources-for-teaching-programming
