---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 5.1: Lists"
categories: code processing python
---

<p style="text-align:right" markdown="1">
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)<br />
<a href="{{ page.previous.url }}">&laquo; {{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }} &raquo;</a>
</p>

This tutorial introduces Python *lists* and *dictionaries*. These datatypes will unlock powerful ways to manage and manipulate collections of elements as opposed to individual values. Following a review of the basics, you'll look at employing these techniques to visualise data, and reading in values from external files.

## Lists

Unlike the datatypes you've encountered thus far, lists hold multiple values. To illustrate, consider these two variables:

{% highlight py %}
student = 'Sam'
age = 24
{% endhighlight %}

Here, `'Sam'` represents a student name -- or more technically speaking, some string data. Recording Sam's age requires an additional `age` variable. However, one can assign both values to a single variable using a list-type approach:

{% highlight py %}
student = ['Sam', 24]
{% endhighlight %}

The square brackets contain both the string and integer values. You may never have used a list before, but can likely make some sense of the syntax? More on syntax shortly, though. You may also be wondering: wouldn't it be simpler to stick with the two separate variables? Perhaps. It really depends on the application. Lists are ordered, and ordering is significant in many situations -- for example, in this sequence of rainbow colours:

{% highlight py %}
rainbow = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet'
]
{% endhighlight %}

Moreover, lists (and dictionaries) are particularly powerful when combined with loop statements. Performing repetitive operations on diverse data sets is a common programming challenge. As an example: you are tasked with generating a population pyramid for each of the world's (195, or so) countries. Provided that you can write some loop that plots the chart using a list of Chinese population figures, the list values can be switched out for Transnistria.

### Working with Lists

To familiarise yourself with defining, accessing, and modifying lists, create a new sketch. Save this as "rainbow_list" and add the following code:

{% highlight py %}
rainbow = ['blue', 'orange', 'yellow']
print(rainbow)
{% endhighlight %}

The rainbow is currently missing a few colours, and the sequence is incorrect, but this will be amended as we progress. Run the code and observe the Console output:

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-new-list.png" class="fullwidth" />
</figure>

Printing the `rainbow` variable displays all three values (along with square brackets and commas). In many instances, though, it's an individual element that you wish to retrieve. To display a given value, specify its position (*index*) in square brackets. Begin by printing the first element. Note, however, that Python list indices begin at zero:

{% highlight py %}
...
print(rainbow[0])
{% endhighlight %}

Run the sketch to confirm that the Console displays `blue`.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-index.png" class="fullwidth" />
</figure>

One can think of each element's position as its offset from the start of the list. The second element, `orange`, has an index of `1`. The last element in this list, `yellow`, has an index of `2`.

{% highlight py %}
...
print(rainbow[1])   # displays orange
print(rainbow[2])   # displays yellow
{% endhighlight %}

Maybe this syntax remind you of [slice notation]({% post_url 2018-06-21-processing.py_in_ten_lessons--2.3-_strings %}#slice-notation)? Well, it works the same way! For example, the last element can be accessed using `-1`, while a subset of elements can be extracted using a colon. Add the following code:

{% highlight py %}
...
print(rainbow[-1])  # displays yellow
print(rainbow[-2])  # displays orange
print(rainbow[0:2]) # displays ['blue', 'orange']
{% endhighlight %}

Should you specify an index beyond the bounds of the list -- say, `rainbow[3]` or greater -- the Console will display an `IndexError` message.

### Modifying lists

Many lists are dynamic in nature. Consider a game like *Breakout* (image below). A list stores the bricks comprising the wall; hitting a brick removes it from this list. In some levels, additional bricks may appear during play, thereby inserting new list elements.

<figure>
  <img src="{{ site.url }}/img/pitl05/wikimedia-backup/Screenshot-LBreakout2.jpg" />
  <figcaption>
    LBreakout2 &ndash; an open source Breakout clone.<br />
    Wilinckx [<a href="http://www.gnu.org/licenses/gpl.html">GPL</a>], <a href="https://commons.wikimedia.org/wiki/File:Screenshot-LBreakout2.jpg">from Wikimedia Commons</a>
  </figcaption>
</figure>

I am assuming you've played some variant of this game and are probably aware that, upon destruction, select bricks drop power-ups. Moreover, bricks come in different colours, some may be invisible, and others take multiple hits to destroy. These additional properties can all be programmed using lists of lists. Yes -- lists can contain other lists, which can, in turn, can contain further nested lists ... but more on that later.

To modify an existing element, reassign a new value like you'd any other variable but include the index in square brackets. Take a practical example: red must replace blue as the first value in the rainbow list. To accomplish this, add the following lines to the bottom of your "rainbow_list" sketch:

{% highlight py %}
rainbow[0] = 'red'
print(rainbow)      # ['red', 'orange', 'yellow']
{% endhighlight %}

The Processing [reference](https://py.processing.org/reference/) includes a number of *List Methods*. Correctly speaking, these are standard (as opposed to Processing.py) Python features, functional in any Python environment. What follows below are descriptions for several such methods along with code to add to your working sketch. Each example builds on the code before it, so you’ll need to work through all of them, entering each line as you progress.

#### `.append()`
<dd markdown="1">
Adds an element to the end of a list.

{% highlight py %}
rainbow.append('blue')
print(rainbow)      # red, orange, yellow, blue
{% endhighlight %}
</dd>

#### `.extend()`
<dd markdown="1">
Adds one list to the end of another list.

{% highlight py %}
colors = ['indigo', 'violet']
rainbow.extend(colors)
print(rainbow)
# red, orange, yellow, blue, indigo, violet
{% endhighlight %}
</dd>

#### `.index()`
<dd markdown="1">
Returns the index (position as an integer) for the argument provided; if there are multiple matches, this represents the lowest/first instance. If there's no matching value, the Console reports a `ValueError` message.

{% highlight py %}
yellowindex = rainbow.index('yellow')
print(yellowindex)  # 2
{% endhighlight %}
</dd>

#### `.insert()`
<dd markdown="1">
The insert method accepts two arguments: the first is the index/position to insert the element; the second is the value.

{% highlight py %}
rainbow.insert(3, 'green')
print(rainbow)
# red, orange, yellow, green, blue, indigo, violet
{% endhighlight %}
</dd>

#### `.pop()`
<dd markdown="1">
The pop method accepts a single argument: the index/position of an element to remove. The pop-ed value is returned, should you need to utilise it for some other operation.

{% highlight py %}
i = rainbow.pop(5)  # removes indigo and assigns it to i
'''
or, to just remove indigo:
rainbow.pop(5)
'''
print(i)            # indigo
print(rainbow)
# red, orange, yellow, green, blue, violet
{% endhighlight %}

However, the argument is optional. If you provide none, Python removes the last element.

{% highlight py %}
rainbow.pop()       # removes violet
print(rainbow)
# red, orange, yellow, green, blue
{% endhighlight %}
</dd>

#### `.remove()`
<dd markdown="1">
Removes the first element with a value that matches the argument.

{% highlight py %}
rainbow.extend(colors)
print(rainbow)
# red, orange, yellow, green, blue, indigo, violet
rainbow.remove('indigo')
print(rainbow)
# red, orange, yellow, green, blue, violet
{% endhighlight %}
</dd>

Python does offer other list methods, but the above should suffice, for now at least. Any decent Python reference should cover the others -- failing that, there's always your favourite search engine. If you are looking to reorder list elements, there are the [`reverse()`](https://py.processing.org/reference/list_reverse.html) and alphanumerical [`sort()`](https://py.processing.org/reference/list_sort.html) methods.

### Rainbow Sequence Task

Time to consolidate what has been covered thus far. In this challenge, you'll apply various list techniques to shuffle the colour bands of an incorrectly sequenced rainbow (orange, followed by violet, then blue, red, yellow, green, and indigo). Wait -- what the heck is indigo, anyway? According to the [dictionary](https://en.wiktionary.org/wiki/indigo), indigo is a "purplish-blue colour", and violet is a "blueish-purple colour" 😕. On that point, why is there no purple band in the rainbow?

<figure style="word-spacing:0">
<div style="background-color:indigo; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:darkviolet; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:purple; display:inline-block; width:80px; height:2.5em"></div>
<figcaption>From left to right: indigo, dark-violet, and purple. According to your web browser.</figcaption>
</figure>

Purple is a combination of two *spectral* colours. There's no wavelength of purple light -- it only exists as a combination of red and blue waves. Violet, however, is an actual spectral colour with its own wavelength of approximately 380–420 nanometres. Indigo is positioned somewhere between blue and violet, but exactly where -- or if at all -- is a matter for debate. In his famous prism experiments, Isaac Newtown defined seven rainbow colours, squeezing indigo in just before violet. You may wonder, why seven colours from a blended array spanning the visible spectrum? It's because seven had occult significance. It's no coincidence that there are seven colours in the rainbow, seven days of the week, and seven musical notes that make up the Western major scale. Today, though, colour scientists are inclined to divide the spectrum at violet and blue, leaving no room for indigo.

In these lessons, we'll drop indigo in favour of a six colour rainbow (just like Pink Floyd did).

<figure>
  <img src="{{ site.url }}/img/pitl05/wikimedia-backup/Dark_Side_of_the_Moon.png" />
  <figcaption>
    <em>The Dark Side of the Moon</em> album cover depicts a prism splitting a beam of white light into its constituent colours. Pink Floyd's designer, Storm Thorgerson, opted for a six-colour, indigo-less rainbow.<br />
    Capitol Records [Copyright], <a href="http://www.pinkfloyd.com/">from pinkfloyd.com</a>, <a href="https://en.wikipedia.org/wiki/File:Dark_Side_of_the_Moon.png">via Wikipedia</a>
  </figcaption>
</figure>

Create a new sketch and save it as "rainbow_sequence". Copy-paste in the following code:

{% highlight py %}
size(500,500)
noStroke()
background('#004477')

bands = [
  '#FF9900', # orange
  '#6633FF', # violet
  '#0099FF', # blue
  '#FF0000', # red
  '#FFFF00', # yellow
  '#00FF00', # green
]

fill(bands[0]); rect(0,100, width,50)
fill(bands[1]); rect(0,150, width,50)
fill(bands[2]); rect(0,200, width,50)
fill(bands[3]); rect(0,250, width,50)
fill(bands[4]); rect(0,300, width,50)
fill(bands[5]); rect(0,350, width,50)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-rainbow-methods-challenge.png" />
  <figcaption>Incorrectly sequenced rainbow.</figcaption>
</figure>

Now, insert the following code just above `fill`/`rect` lines:

{% highlight py %}
'''# move violet
violet = bands[_]
bands.append(violet)
bands.remove(violet)'''

'''# move blue
blueindex = bands.index('_______')
bands.insert(4, bands.pop(blueindex))'''

'''# switch orange and red
bands.insert(bands.index('_______'), bands.___(_))'''

fill(bands[0]); rect(0,100, width,50)
...
{% endhighlight %}

Remove the multi-line commented blocks (`'''`) a section time. The goal is to figure out what values and methods replace the underscores. The correct result looks like this:

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-rainbow-methods-result.png" />
</figure>

Once complete, be sure to save this file. You'll be editing it further in the next challenge.

### Loops + Lists

Loops can be programmed to work with lists, potentially saving on countless lines of manual instruction. As a case a point, let us return to the *Breakout* game example. Rendering each brick requires at least as many lines of code as there are elements. For example:

{% highlight py %}
fill(bricks[0]);  rect(0,  0, 30,10) # brick A1
fill(bricks[1]);  rect(30, 0, 30,10) # brick A2
fill(bricks[2]);  rect(60, 0, 30,10) # brick A3
...
fill(bricks[59]); rect(270,50,30,10) # brick F10
{% endhighlight %}

This is hardly efficient, nor can it handle a list that's continually adapting in length. In a previous lesson covering [for loops]({% post_url 2018-07-03-processing.py_in_ten_lessons--3.3-_iteration %}#for-loops), you looked at iterating integer values using a `range()` function. To perform something similar on a list, you'll first need to determine its current length.

Create a new sketch and save it as "iterating_lists". Add the following code:

{% highlight py %}
rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'violet']
print( len(rainbow) )
{% endhighlight %}

The `len()` function accepts a list as an argument and returns its length. Run the sketch to confirm this.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-loop-len.png" class="fullwidth" />
  <figcaption>
    The <code>len()</code> function returns a list length of <code>6</code>.
  </figcaption>
</figure>

As the `len()` function returns an integer -- in this case, six -- it can serve as an argument for a `range()` function. Add this for loop to the bottom of your code:

{% highlight py %}
...

for i in range( len(rainbow) ):
    print(rainbow[i])
{% endhighlight %}

Run the sketch. With each iteration of the loop, `i` is incremented by 1. On the first iteration, the `print` line displays the value of `rainbow[0]`, followed by `rainbow[1]` on the second iteration, and so on until reaching `rainbow[5]`.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-loop-range.png" class="fullwidth" />
</figure>

Thus far, your loops have relied on the `range()` function. It's employed again here to make the code more relatable. However, Python regards loops as inherently iterable, meaning that one can omit the range function altogether. Comment out the previous loop and replace it with a `range`-less alternative:

{% highlight py %}
'''
for i in range( len(rainbow) ):
    print(rainbow[i])
'''
for band in rainbow:
    print(band)
{% endhighlight %}

Run the code. The Console prints the same list of values. But, what if you wished to display this output instead?

~~~
0: red
1: orange
2: yellow
3: green
4: blue
5: violet
~~~

Without the `i` variable from the first version of the loop, you've just the element value but no count. One approach is to adapt the earlier loop. For example:

{% highlight py %}
for i in range( len(rainbow) ):
    print( ('%s: %s') % (i, rainbow[i]) )
{% endhighlight %}

This way, the `i` value is used to print the index and retrieve values from the list. However, Python offers another approach using an `enumerate()` function. This is best explained using a practical example. Add the following to the bottom of your working code:

{% highlight py %}
for i,v in enumerate(rainbow):
    print( ('%s: %s') % (i, v) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-loop-enumerate.png" class="fullwidth" />
</figure>

Recall, though, that `i` and `v` are variable names. Use whatever you feel is most descriptive -- for example:

{% highlight py %}
for number,colour in enumerate(rainbow):
    print( ('%s: %s') % (number, colour) )
{% endhighlight %}

In this instance, I have opted for the British spelling of col<ins>ou</ins>r to avoid confusing the variable with Processing's [`color()`](https://py.processing.org/reference/color.html) function.

No single approach (range, enumerate, etc.) is necessarily better than another. What you elect to use will depend on your coding style and what you need to accomplish.

### Rainbow Sequence Loop Task

Reopen your "rainbow_sequence" task from earlier. Your challenge is to convert the following code into something that uses a loop instead:

{% highlight py %}
...

fill(bands[0]); rect(0,100, width,50)
fill(bands[1]); rect(0,150, width,50)
fill(bands[2]); rect(0,200, width,50)
fill(bands[3]); rect(0,250, width,50)
fill(bands[4]); rect(0,300, width,50)
fill(bands[5]); rect(0,350, width,50)
{% endhighlight %}

Ensure that the visual result remains the same:

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-rainbow-loop.png" />
</figure>

An `enumerate()` is, perhaps, the more elegant solution. If you ever find yourself weighing-up different approaches, take a quick read through [The Zen of Python](https://www.python.org/dev/peps/pep-0020/) -- a list of 19 one-line principles to help guide your coding.

After grasping the fundamentals of Python lists, the next step is to tackle lists of lists.

**Begin Lesson 5.2:** [Data Visualisation]({% post_url 2019-01-16-processing.py_in_ten_lessons--5.2-_data_visualisation %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
