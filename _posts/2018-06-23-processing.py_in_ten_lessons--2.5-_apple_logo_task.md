---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 2.5: Apple Logo Task"
categories: code processing python
---

## Apple Logo Task

Here's the final challenge before moving onto lesson 3.

The first incarnation of the iconic apple logo was rainbow-coloured (although the bands are incorrectly ordered). One common rumour around the bite involves computer pioneer, Alan Turing -- a man who is widely considered to be the father of theoretical computer science and artificial intelligence. Among his many accomplishments, Turing managed to crack the Enigma cypher used to encrypt Nazi communications during World War II. When authorities discovered in 1952 that he was gay, Turing was forced to undergo hormonal treatment. Two years later he was found dead, having committed suicide by biting into a poisoned apple.

You'll recreate the logo in Processing, such that the final result looks this:

<figure>
  <img src="{{ site.url }}/img/pitl02/apple.png" />
  <figcaption>
    The Apple Computer rainbow colour logo, in use from 1977&ndash;1999.<br />
    Rob Janoff [Public domain], <a href="https://commons.wikimedia.org/wiki/File:Apple_Computer_Logo_rainbow.svg">via Wikimedia Commons</a>
  </figcaption>
</figure>

Create a new sketch and save it as "apple_logo". Within a "data" sub-folder, add the grid.png image, along with this apple.png file:

<a href="{{ site.url }}/img/pitl02/apple.png" download>apple.png</a>

Add the following code to get things started:

{% highlight py %}
size(800,850)
background('#004477')

grid = loadImage('grid.png')
image(grid, 0, 0)
logo = loadImage('apple.png')
image(logo, 0, 0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/apple-start.png" />
</figure>

To assist you in approximating the positions of the anchor and control points, here's an image split into an in-progress and complete version:

<figure>
  <img src="{{ site.url }}/img/pitl02/apple-clue.png" />
  <figcaption>In progress (left) and complete version (right).</figcaption>
</figure>

Notice how straight-line connections between pairs of control points ensure smooth curves along the perimeter of the apple. Conversely, the leaf handles are bent in different directions resulting in a sharp tip.

## Lesson 3

That's it for lesson 2. I hope it was enjoyable if a little tedious. If you are familiar with any markup languages -- such as HTML, XML, or SVG in particular -- you've probably been cruising through the tutorials thus far. In lesson 3 we'll begin to look at what really separates a programming language from markup; this includes topics like conditional statements and iteration. You'll also explore randomness -- one of the most powerful and exciting tools in the creative programmer's tool-set. For now, though, take a break -- you deserve it!

**Begin Lesson 3.1:** [Control Flow]({% post_url 2018-07-01-processing.py_in_ten_lessons--3.1-_control_flow %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

## References

* http://bezier.method.ac/
* http://py.processing.org/reference/
* https://vimeo.com/106757336
