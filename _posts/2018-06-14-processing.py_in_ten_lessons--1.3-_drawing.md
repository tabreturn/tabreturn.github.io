---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 1.3: Drawing"
categories: code processing python
---

<p style="text-align:right" markdown="1">
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse) <br />
<a href="{{ page.previous.url }}">&laquo; {{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }} &raquo;</a>
</p>

## Drawing

In this section, you'll look at a number of drawing functions.

Begin a new sketch (**File > New**) and then save it as "drawing" (**File > Save As**...). Add some code to set things setup before proceeding:

{% highlight py %}
size(500, 500)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

When you run the sketch, an empty blue display window appears. What follows below are descriptions for several drawing functions, along with some code to add to your working sketch. Feel free to experiment with the arguments to see how things respond. Each example builds on the code before it, so you'll need to work through all of them, entering each line as you progress.

### `point()`
<dd markdown="1">
Draws a point, the width of which is determined by the `strokeWeight()`. The arguments represent the x- and y-coordinates respectively.  
*Reference link:*  [`point()`](http://py.processing.org/reference/point.html)

{% highlight py %}
point(100, 25)
point(200, 25)
point(150, 75)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-point.png" />
</figure>
</dd>

### `triangle()`
<dd markdown="1">
Draws a triangle. The six arguments represent three x/y-coordinate pairs.   
*Reference link:* [`triangle()`](http://py.processing.org/reference/triangle.html)

{% highlight py %}
triangle(100,25, 200,25, 150,75)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-triangle.png" />
</figure>
</dd>

### `ellipse()`
<dd markdown="1">
Draws an ellipse. The first pair of arguments represent an x/y coordinate that marks the centre of the ellipse; the second pair of arguments represent its width and height.  
*Reference link:* [`ellipse()`](http://py.processing.org/reference/ellipse.html)

{% highlight py %}
ellipse(100,100, 100,50)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-ellipse.png" />
</figure>
</dd>

#### Ellipse and Rect Modes

You've seen how rectangles are drawn from the top-left corner, and ellipses are centred on the x/y coordinate. If you wish to change this behaviour -- for example, have the `rect` function draw from the center -- refer to the following functions:  
[`ellipseMode()`](http://py.processing.org/reference/ellipseMode.html)  
[`rectMode()`](http://py.processing.org/reference/rectMode.html)

### `quad()`
<dd markdown="1">
Draws a quadrilateral (a four-sided polygon). The eight arguments represent four x/y-coordinate pairs.  
*Reference link:* [`quad()`](http://py.processing.org/reference/quad.html)

{% highlight py %}
quad(250,250, 350,300, 380,400, 260,380)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-quad.png" />
</figure>
</dd>

### `line()`
<dd markdown="1">
Draws a straight line between two points. The first pair of arguments represent the starting x/y coordinates; and the second pair, the ending x/y coordinates.  
*Reference link:* [`line()`](http://py.processing.org/reference/line.html)

{% highlight py %}
line(390,380, 460,320)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-line.png" />
</figure>
</dd>

## Rainbow Task

Time for a challenge!

Begin a new sketch (**File > New**) and then save it as "rainbow" (**File > Save As**...).

Add some code to get started:

{% highlight py %}
size(600, 600)
background('#004477')
noStroke()
{% endhighlight %}

Using what you've learnt thus far, complete the rainbow below:

<figure>
  <img src="{{ site.url }}/img/pitl01/drawing-rainbow.png" />
</figure>

Clue: you can overlap shapes to mask-off others.

**Begin Lesson 1.4:** [Variables]({% post_url 2018-06-15-processing.py_in_ten_lessons--1.4-_variables %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
