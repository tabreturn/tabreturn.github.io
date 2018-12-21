---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 05: Art of the State"
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#lists"><em>lists</em></a> /
<a href="#dictionaries"><em>dictionaries</em></a> /
<a href="#external-data"><em>external data</em></a> /
<a href="#pixels"><em>pixels</em></a>

---
&nbsp;  
This tutorial introduces Python *lists* and *dictionaries*. These datatypes will unlock powerful ways to manage and manipulate collections of elements, as opposed to individual values.
Following a review of the basics, you'll look at visualising data, reading in values from external files, and generating your very own 'Photoshop' filters.

## Lists

Unlike the datatypes you have encountered thus far, lists hold multiple values. To illustrate, consider these two variables:

{% highlight py %}
student = 'Sam'
age = 24
{% endhighlight %}

Here, `'Sam'` represents a student name -- or more technically speaking, some string data. Recording Sam's age requires an additional `age` variable. However, one can assign both values to a single variable using a list-type approach:

{% highlight py %}
student = ['Sam', 24]
{% endhighlight %}

The square-brackets contain both the string and integer values. You may never have used a list before, but can likely make some sense of the syntax? More on syntax shortly, though. You may also be wondering: wouldn't it be simpler to stick with the two separate variables? Perhaps. It really depends on the application. Lists are ordered, and ordering is significant in many situations -- for example, in this sequence of rainbow colours:

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


Moreover, lists (and dictionaries) are particularly powerful when combined with loop statements.

### Working with Lists

To familiarise yourself with defining, accessing, and modifying lists, create a new sketch. Save this as "rainbow_list" and add the following code:

{% highlight py %}
rainbow = ['blue', 'orange', 'yellow']
print(rainbow)
{% endhighlight %}

Our rainbow is currently missing a few colours, and the sequence is incorrect, but this will be amended as we progress. Run the code and observe the Console output:

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-new-list.png" class="fullwidth" />
</figure>

Printing the `rainbow` variable displays all three values (along with square brackets and commas). In many instances, though, it's an individual element that you wish to retrieve. To display a given value, specify it's position in square brackets. Begin by printing the first element. Note, however, that Python list indices begin at zero:

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

Maybe this syntax remind you of [slice notation]({% post_url 2018-06-19-processing.py_in_ten_lessons--02-_bezier,_catmull_and_rom_walk_into_a_bar %}#slice-notation)? Well, it works the same way! For example, the last element can be accessed using `-1`, while a subset of elements can be extracted using a colon. Add the following code:

{% highlight py %}
...
print(rainbow[-1])  # displays yellow
print(rainbow[-2])  # displays orange
print(rainbow[0:2]) # displays ['blue', 'orange']
{% endhighlight %}

Should you specify an index beyond the bounds of the list -- say, `rainbow[3]` or greater -- the Console will display an `IndexError`.

### Modifying lists

Many lists are dynamic in nature. Consider a game like *Breakout* (image below). A list stores the bricks comprising the wall; hitting a brick removes it from this list. In some levels, additional bricks may appear during play, thereby inserting new elements.

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Screenshot-LBreakout2.jpg" />
  <figcaption>
    LBreakout2 &ndash; an open source Breakout clone.<br />
    source: <a href="https://commons.wikimedia.org/wiki/File:Screenshot-LBreakout2.jpg">Wikimedia Commons</a>
  </figcaption>
</figure>

I'm assuming you have played some variant of this game and are probably aware that, upon destruction, select bricks drop power-ups. Moreover: bricks come in different colours; some may be invisible; others take multiple hits to destroy. This can all be programmed using lists of lists. Yes -- lists can contain other lists, which can, in turn, can contain further nested lists ... but more on that later.

To modify an existing element, reassign a new value like you would any other variable but include the index in square brackets. Take a practical example: red must replace blue as the first value in the rainbow list. To accomplish this, add the following lines to the bottom of your "rainbow_list" sketch:

{% highlight py %}
rainbow[0] = 'red'
print(rainbow)      # ['red', 'orange', 'yellow']
{% endhighlight %}

The Processing [reference](https://py.processing.org/reference/) includes a number of *List Methods*.  Correctly speaking, these are standard (as opposed to Processing.py) Python features, functional in any Python environment. What follows below are descriptions for several such methods, along with code to add to your working sketch. Each example builds on the code before it, so you’ll need to work through all of them, entering each line as you progress.

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
Adds one list to the end of another.

{% highlight py %}
colors = ['indigo', 'violet']
rainbow.extend(colors)
print(rainbow)
# red, orange, yellow, blue, indigo, violet
{% endhighlight %}
</dd>

#### `.index()`
<dd markdown="1">
Returns the index (position as an integer) for the argument provided; if there are multiple matches, this is the lowest/first instance. If there is no matching value, the Console reports a `ValueError`.

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

Python does offer other list methods but the above should suffice, for now at least. Any decent Python reference should cover the others; failing that, there's always your favourite search engine. If you are looking to reorder list elements, there are the [`reverse()`](https://py.processing.org/reference/list_reverse.html) and alphanumerical [`sort()`](https://py.processing.org/reference/list_sort.html) methods.

### Rainbow Sequence Task

Time to consolidate what has been covered thus far. In this challenge you will apply various list techniques to shuffle the colour bands of an incorrectly sequenced rainbow (orange, followed by violet, then blue, red, yellow, green, and indigo). Wait -- what the heck is indigo, anyway? According to the [dictionary](https://en.wiktionary.org/wiki/indigo), indigo is a "purplish-blue colour", and violet is a "blueish-purple colour" 😕. On that point, why is there no purple band in the rainbow? Okay, let's just merge indigo and violet into purple, and stick with a six colour rainbow.

<figure style="word-spacing:0">
<div style="background-color:indigo; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:violet; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:purple; display:inline-block; width:80px; height:2.5em"></div>
<figcaption>From left to right: indigo, violet, and purple. According to your web browser.</figcaption>
</figure>

Create a new sketch and save it as "rainbow_sequence". Add the following code:

{% highlight py %}
size(500,500)
noStroke()
background('#004477')

bands = [
  '#FF9900', # orange
  '#6633FF', # purple
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

Now, insert the following code just above fill/rect lines:

{% highlight py %}
'''# move purple
purple = bands[_]
bands.append(purple)
bands.remove(purple)'''

'''# move blue
blueindex = bands.index('_______')
bands.insert(4, bands.pop(blueindex))'''

'''# switch orange and red
bands.insert(bands.index('_______'), bands.___(_))'''

fill(bands[0]); rect(0,100, width,50)
...
{% endhighlight %}

Remove the multi-line commented blocks (`'''`) a section time. The goal is to figure out what values and methods replace the underscores. The finished result looks like this:

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-rainbow-methods-result.png" />
</figure>

Once complete, save this file. You will be editing it further in the next challenge.

### Loops + Lists

Loops can be programmed to work with lists, potentially saving on countless lines of manual instruction. As a case a point, let us return to the *Breakout* game example. Rendering each brick requires at least as many lines of code as there are elements. For example:

{% highlight py %}
fill(color); rect(x, y, w, h) # brick A1
fill(color); rect(x, y, w, h) # brick A2
fill(color); rect(x, y, w, h) # brick A3
...
fill(color); rect(x, y, w, h) # brick J12
{% endhighlight %}

This is hardly efficient, nor can it handle a list that is constantly adapting in length. In a previous lesson covering [for loops]({% post_url 2018-07-01-processing.py_in_ten_lessons--03-_randomly-generated-lesson-title %}#for-loops), you looked at iterating integer values using a `range()` function. To perform something similar on a list, you will first need to determine the list's length.

Create a new sketch and save it as "iterating_lists". Add the following code:

{% highlight py %}
rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
print( len(rainbow) )
{% endhighlight %}

The `len()` accepts a list as an argument, and returns it's length. Run the sketch to confirm this.

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

Run the sketch. With each iteration of the loop, `i` is incremented by 1. On the first iteration, the `print` line displays `rainbow[0]`, followed by `rainbow[1]` on the second, and so on through to `rainbow[5]`.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-loop-range.png" class="fullwidth" />
</figure>

Your loops from previous lessons have relied on a `range()` function, and using again it here makes the code more relatable. However, Python regards loops as inherently iterable, and and the range can be omitted altogether. Comment out the previous loop, replacing it with a non-range alternative:

{% highlight py %}
'''
for i in range( len(rainbow) ):
    print(rainbow[i])
'''
for band in rainbow:
    print(band)
{% endhighlight %}

Run the code. The Console prints the same list of values. But, what if you wished to print this output?

~~~
0: red
1: orange
2: yellow
3: green
4: blue
5: purple
~~~

Without the `i` variable from the first version of the loop, you have just the element value but no count. One approach is to adapt the earlier loop. For example:

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

No specific approach is necessarily better than another. What you elect to use will depend on your coding style and the application at hand.

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

Enumerate is, perhaps, the more 'elegant' approach -- but, ultimately, it's your choice as a coder.


### Lists of Lists

multi-dim arrays? placing bricks (color, x, y)

### Breakout Challenge

...



??? EXTRA ??? comprehensions, tuples

## Dictionaries

...

## External Data

...

## Pixels

...






## Lesson 06

...

...

**Begin lesson 06:** Art of the State *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* https://py.processing.org/reference/
