---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 1.5: Arithmetic Operators"
categories: code processing python
---

<p style="text-align:right" markdown="1">
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse) <br />
<a href="{{ page.previous.url }}">&laquo; {{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }} &raquo;</a>
</p>

## Arithmetic Operators

Variables are far more useful when you perform arithmetic operations using them. Add the following code to your "variables" sketch:

{% highlight py %}
...
rect(x,y, w,h)

print(x + 2)
{% endhighlight %}

I'm guessing that did exactly what you expected? You can also subtract:

{% highlight py %}
...
rect(x,y, w,h)

print(x + 2)       # displays 3
print(x - 2)       # displays -1
{% endhighlight %}

Multiplication is performed using the `*` operator:

{% highlight py %}
...
print(x * 5)       # displays 5
{% endhighlight %}

Now add the code below, but before hitting run, see if you can predict what the total is:

{% highlight py %}
...
print(1 + 2 * 3)   # displays ???
{% endhighlight %}

The console displays a `7` -- and not a `9` -- because multiplication occurs before addition. Certain operators take precedence over others. Remember BEDMAS? Or BODMAS (depending on where you're from)? It's an acronym to help you recall the [order of operations](https://en.wikipedia.org/wiki/Order_of_operations). If you want to override this order, use brackets:

{% highlight py %}
...
print(1 + 2 * 3)   # displays 7
print((1 + 2) * 3) # displays 9
{% endhighlight %}

For division, use a forward-slash:

{% highlight py %}
...
print(4 / 2)       # displays 2
{% endhighlight %}

Be aware, though, that dividing two integers always produces an integer result (integers are 'whole' numbers, as opposed to those with a decimal point). For example:

{% highlight py %}
...
print(3 / 2)       # displays 1
{% endhighlight %}

Python discards any decimal digits, effectively 'rounding-down' the result. To allow decimal results, define at least one of your operands using a decimal point:

{% highlight py %}
...
print(3 / 2.0)     # displays 1.5
{% endhighlight %}

Decimal numbers are usually referred to as *floating point*, or *float* values, in programming terminology.

Of course, [division by zero](https://en.wikipedia.org/wiki/Division_by_zero) operations will result in errors:

<figure>
  <img src="{{ site.url }}/img/pitl01/arithmetic-operators-division-by-zero.png" class="fullwidth" />
</figure>

### Modulo Operator

The modulo operator is written as a percentage sign (`%`). It calculates the remainder of a division operation. Take *five divided by two* as an example:
* one could say the answer is `2.5`;
* or, that the answer is `2` remainder `1`, because two 'goes into' five twice with one left over.

The modulo operator performs the latter. Here's some code contrasting a division and modulo operation:

{% highlight py %}
print(5.0 / 2)     # displays 2.5
print(5.0 % 2)     # displays 1
{% endhighlight %}

It may not be evident why this is operator useful. However, many important algorithms -- such as those used in cryptography -- make use of it. For now, consider that modulo operations resulting in a `0` indicate that numbers divide exactly. Among other uses, this is handy for establishing whether a number is odd or even:

{% highlight py %}
print(7 % 2)       # displays 1, therefore 7 is odd
print(6 % 2)       # displays 0, therefore 6 is even
{% endhighlight %}

You'll be making use of modulo operators in future lessons.

## Image Reveal Task

Time for another challenge!

The idea here's to follow the instructions to reveal a symbol. Create a new sketch and save it as "symbol_reveal". Add some code to get started:

{% highlight py %}
size(600, 740)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)

xco = 400
yco = 440
{% endhighlight %}

To begin revealing the symbol, follow instruction steps 1 to 6. To get you started, here's the first instruction, along with the correct code:

1. Draw a line beginning at an x-coordinate of half the display window `width`, and y-coordinate of a third of the window `height`. The endpoint must have an x/y-coordinate equal to `xco` & `yco`.

-- which will be coded as follows:

{% highlight py %}
line(width/2,height/3, xco,yco)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl01/arithmetic-operators-symbol-reveal.png" />
  <figcaption>Instruction 1 of 6.</figcaption>
</figure>

Now, carry-out the rest of the instructions:

<ol start="2">
<li>
Draw a centred ellipse with a width that's an eleventh of the display window <code>width</code>, and a height that's a fourteenth of the window <code>height</code>.
</li>
<li>
Draw a centred ellipse with a width that's a nineteenth of the display window <code>width</code>, and a height that's a twenty-second of the window <code>height</code>.
</li>
<li>
Draw a line beginning at an x/y-coordinate equal to <code>xco</code> & <code>yco</code> respectively. The endpoint must have an x-coordinate of the display window <code>width</code> minus <code>xco</code>, and a y-coordinate equal to <code>yco</code>.
</li>
<li>
Draw a line beginning at an x-coordinate of the display window <code>width</code> minus <code>xco</code>, and y-coordinate equal to <code>yco</code>. The endpoint must have an x-coordinate of half the display window <code>width</code>, and a y-coordinate of a third of the window <code>height</code>.
</li>
<li>
Draw a centred ellipse with a width that's a fifth of the display window <code>width</code>, and height that's a twelfth of the display window <code>height</code>.
</li>
</ol>

Clue: if this seems like a conspiracy, you may be on the right track.

**Begin Lesson 1.6:** [Disk Space Analyser Task]({% post_url 2018-06-17-processing.py_in_ten_lessons--1.6-_disk_space_analyser_task %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

## References

* http://py.processing.org/reference/
