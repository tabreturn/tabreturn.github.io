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
In this lesson you get to make things move. The content of this lesson focuses primarily on animation, but to make things more fun, introduces transformations, time and date features, and a bit of trigonometry. As you will discover, blending animation with math produces some interesting results.

Before proceeding, though, consider how motion is perceived. The brain is fed a snapshot from your retina around ten times each second. The speed at which objects appear to be moving (or not moving) is determined by the difference between successive snapshots. So, provided your screen can display a sequence of static images at a rate exceeding ten cycles per second, the viewer will experience the illusion of smooth flowing movement. This illusion is referred to as *Beta movement* and occurs at framerates of around 10-12 images per second (hence the lesson title), although higher framerates will appear smoother. That said, there is more to motion perception than frames per second (fps).

Take a moment to note the numbering of the circles in the illustration below.

<figure>
  <img src="{{ site.url }}/img/pitl04/sequence.svg" />
</figure>

Consider that you displayed just circle 1 for for a full two seconds, followed by just circle 5 for another two seconds, looping the sequence indefinitely (effectively 0.5 fps). The result, most people would agree, is a circle placed in two different positions. If you to speed up the framerate to, say 5 fps, you begin to interpret the sequence as a circle bouncing between two points. Speed up the framerate even further, and two flickering circles seemingly appear at the same time. 

<figure>
  <img src="{{ site.url }}/img/pitl04/sequence-timings.gif" class="fullwidth" />
  <br />
  <figcaption>From left to right: 0.5 fps; 5 fps; 25 fps; 2 fps; 50fps</figcaption>
</figure>

The two ring-of-circles animations run at 2- and 50 fps. In the left instance, the circles appear appear to move -- jumping in to fill the void left by the vacant circle (if you didn't see it before, you should now). In the rightmost animation, a phantom white dot appears to obsure the circles beneath it as it zips around the circle.

## Animation Functions

To get animating in Processing all you need is two functions.
By default, draw() executes around 60 f.p.s. (frames per second)
However, as complexity of an animation increases, the frame rate may also drop.

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
