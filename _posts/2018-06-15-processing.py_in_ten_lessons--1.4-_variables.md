---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 1.4: Variables"
categories: code processing python
image: /img/pitl03/iteration-for-loop-adaption.png
description: A series of tutorials on Processing.py, introducing non-programmers to the fundamentals of computer programming in a visual context.
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

## Variables

Variables are placeholders for information -- much like when you use letters in algebra to represent a value. In fact, Python variables look and behave similarly.

Begin a new sketch and then save it as "variables". To keep things simple, we'll print to the Console area. Add the following code:

{% highlight py %}
size(600, 400)
background('#004477')

print(width)
print(height)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/variables-width-height.png" class="fullwidth" />
</figure>

`width` and `height` are system variables that store the dimensions of the display window. However, you are not limited to system variables. When declaring your own variables, you assign a value using an `=` sign (assignment operator). Try this out with a new variable named "x":

{% highlight py %}
...

x = 1
print(x) # displays 1 in the console
{% endhighlight %}

You may name your variables whatever you wish, provided the name: contains only alpha-numeric and underscore characters; does not begin with a number; and does not clash with a reserved Python keyword or variable (like `width`). For example:

{% highlight py %}
playerlives = 3  # correct
playerLives = 3  # correct
player_lives = 3 # correct
player lives = 3 # incorrect (contains a space)
player-lives = 3 # incorrect (contains a hyphen)
{% endhighlight %}

Whether you should name a variable using camelCase, underscores, or some other convention is a matter of style (and vociferous debate). However, it's good to decide upon and stick to a naming convention, as you'll make extensive use of variables in Processing. Add three more variables to your script, using them as arguments in a `rect()` function:

{% highlight py %}
...

x = 1
print(x) # displays 1 in the console
y = 30
w = 20
h = w
rect(x,y, w,h)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/variables-rect.png" class="fullwidth" />
  <figcaption>Note how the <code>w</code> variable has been assigned to <code>h</code>, resulting in a square.</figcaption>
</figure>

<p style="text-align:right" markdown="1">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
