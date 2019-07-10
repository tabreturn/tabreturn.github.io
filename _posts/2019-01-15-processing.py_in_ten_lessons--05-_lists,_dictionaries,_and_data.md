---
layout: post
comments: false
title: "Processing.py in Ten Lessons – 05: Lists, Dictionaries, and Data"
categories: code processing python
---

***Covered in this lesson:***  
<a href="#lists"><em>Lists</em></a> /
<a href="#dictionaries"><em>Dictionaries</em></a> /
<a href="#data-visualisation"><em>Data Visualisation</em></a> /
<a href="#external-data"><em>External Data</em></a>

---
&nbsp;  
This tutorial introduces Python *lists* and *dictionaries*. These datatypes will unlock powerful ways to manage and manipulate collections of elements as opposed to individual values. Following a review of the basics, you'll look at employing these techniques to visualise data, and reading in values from external files.

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

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

Moreover, lists (and dictionaries) are particularly powerful when combined with loop statements. Performing repetitive operations on diverse datasets is a common programming challenge. As an example: you are tasked with generating a population pyramid for each of the world's (195, or so) countries. Provided that you can write some loop that plots the chart using a list of Chinese population figures, the list values can be switched out for Transnistria.

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

Maybe this syntax remind you of [slice notation]({% post_url 2018-06-19-processing.py_in_ten_lessons--02-_bezier,_catmull,_and_rom_walk_into_a_bar %}#slice-notation)? Well, it works the same way! For example, the last element can be accessed using `-1`, while a subset of elements can be extracted using a colon. Add the following code:

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

I am assuming you have played some variant of this game and are probably aware that, upon destruction, select bricks drop power-ups. Moreover, bricks come in different colours, some may be invisible, and others take multiple hits to destroy. These additional properties can all be programmed using lists of lists. Yes -- lists can contain other lists, which can, in turn, can contain further nested lists ... but more on that later.

To modify an existing element, reassign a new value like you would any other variable but include the index in square brackets. Take a practical example: red must replace blue as the first value in the rainbow list. To accomplish this, add the following lines to the bottom of your "rainbow_list" sketch:

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
Returns the index (position as an integer) for the argument provided; if there are multiple matches, this represents the lowest/first instance. If there is no matching value, the Console reports a `ValueError` message.

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

Time to consolidate what has been covered thus far. In this challenge, you will apply various list techniques to shuffle the colour bands of an incorrectly sequenced rainbow (orange, followed by violet, then blue, red, yellow, green, and indigo). Wait -- what the heck is indigo, anyway? According to the [dictionary](https://en.wiktionary.org/wiki/indigo), indigo is a "purplish-blue colour", and violet is a "blueish-purple colour" 😕. On that point, why is there no purple band in the rainbow?

<figure style="word-spacing:0">
<div style="background-color:indigo; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:darkviolet; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:purple; display:inline-block; width:80px; height:2.5em"></div>
<figcaption>From left to right: indigo, dark-violet, and purple. According to your web browser.</figcaption>
</figure>

Purple is a combination of two *spectral* colours. There is no wavelength of purple light -- it only exists as a combination of red and blue waves. Violet, however, is an actual spectral colour with its own wavelength of approximately 380–420 nanometres. Indigo is positioned somewhere between blue and violet, but exactly where -- or if at all -- is a matter for debate. In his famous prism experiments, Isaac Newtown defined seven rainbow colours, squeezing indigo in just before violet. You may wonder, why seven colours from a blended array spanning the visible spectrum? This because seven had occult significance. It's no coincidence that there are seven colours in the rainbow, seven days of the week, and seven musical notes that make up the Western major scale. Today, though, colour scientists are inclined to divide the spectrum at violet and blue, leaving no room for indigo.

In these lessons, we will drop indigo in favour of a six colour rainbow (just like Pink Floyd did).

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

Once complete, be sure to save this file. You will be editing it further in the next challenge.

### Loops + Lists

Loops can be programmed to work with lists, potentially saving on countless lines of manual instruction. As a case a point, let us return to the *Breakout* game example. Rendering each brick requires at least as many lines of code as there are elements. For example:

{% highlight py %}
fill(bricks[0]);  rect(0,  0, 30,10) # brick A1
fill(bricks[1]);  rect(30, 0, 30,10) # brick A2
fill(bricks[2]);  rect(60, 0, 30,10) # brick A3
...
fill(bricks[59]); rect(270,50,30,10) # brick F10
{% endhighlight %}

This is hardly efficient, nor can it handle a list that is continually adapting in length. In a previous lesson covering [for loops]({% post_url 2018-07-01-processing.py_in_ten_lessons--03-_control_flow_and_randomness %}#for-loops), you looked at iterating integer values using a `range()` function. To perform something similar on a list, you will first need to determine its current length.

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

Recall, though, that `i` and `v` are variable names. Use whatever you feel is most descriptive -- for example:

{% highlight py %}
for number,colour in enumerate(rainbow):
    print( ('%s: %s') % (number, colour) )
{% endhighlight %}

In this instance, I have opted for the British spelling of col<ins>ou</ins>r to avoid confusing the variable with Processing's [`color()`](https://py.processing.org/reference/color.html) function.

No single approach (range, range-less, or enumerate) is necessarily better than another. What you elect to use will depend on your coding style and what you need to accomplish.

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

## Data Visualisation

Data visualisation is a recurring theme in these lessons. It relates neatly to a lot of the coding content and makes for some intriguing -- and often, enlightening -- visual output. Writing Processing code provides you with full control over visual output, so you're longer limited to whatever Excel can conjure. Instead, you get to explore novel ways to visualise data -- ranging from highly abstract (like something you'd see in an art gallery) to highly informative, or anything in between.

At various points, you'll be provided brief introductions to useful 'data viz' concepts. Lists-of-lists are a means of managing multidimensional data, so now seems an opportune time to review the role of dimension in data visualisation. Before moving onto writing any code, though, we'll look at a hypothetical scenario demonstrating how list data translates into visual output.

### Introduction

Computers are remarkably efficient data processing tools. It's not surprising to discover that *VisiCalc*, a spreadsheet application released in 1979, is considered the world's first [killer application](https://en.wikipedia.org/wiki/Killer_application). Killer applications lead consumers to adopt new hard- or software platforms. Video game examples include the Atari 2600 port of *Space Invaders*, which the quadrupled console's sales. *Tetris* is credited as the Nintendo *Gameboy*'s killer app and to date remains the product line's top-selling game of all time.

Email is another killer app, albeit more of a messaging protocol. Before email, many people felt they didn't need an Internet connection, or even a computer for that matter. Shortly after email went mainstream, web browsers converted many remaining online holdouts. Websites have been tracking visitor traffic since the early days of the Web. Nowadays, smart devices gather information from machines, animals, and people. We gather ever vaster quantities of data, yet much of it remains unused. Data visualisation presents opportunities to better utilise it -- conveying concepts in a more accessible manner and even providing inputs to experiment with different scenarios.

Raw data is typically structured in a tabular type arrangement. It can be handwritten or captured electronically (CSV files, databases, etc.), but ultimately, can be dumped into a spreadsheet without too much hassle. However, scrolling through endless rows and columns is hardly an effective or engaging approach to analysis. Graphs help by presenting data more insightfully, also making it easier to present findings to others. *Lotus 1-2-3*, VisiCalc's usurper, introduced several graphing features, which have been common spreadsheet fixtures ever since. If your spreadsheet software lacks the chart you need, you'll likely find an app/web-app or programming library suited to the task. [Plotly](https://plot.ly/create/) and [matplotlib](https://matplotlib.org/) are well worth exploring.

### Visualising Tetris Scores

In this section, we'll be analysing some gameplay data. The focus is the visualisation of this data. There is no need to write any code, but you will need to read through some. In the next section, you will apply this theory in Processing.

In 2010, the inaugural *Classic Tetris World Championship* (CTWC) took place in Los Angeles, California. The organisers opted for the NES (8-bit Nintendo Entertainment System) version of Tetris, played on original hardware connected to a CRT television screen. The event has run annually ever since, although the venue has moved to Portland, Oregon. In 2017, one could [qualify with a score of around 500,000](https://youtu.be/9RaqVGzhQTM?t=1640). Now, suppose you wished to enter the upcoming CTWC. You’ve bought a console, cartridge, and CRT television, and have trained for months. However, your high scores seem to have plateaued. To help analyse and (hopefully) improve your scores, you decide to visualise your performance using Python.

To begin, you create a list containing all the dates you have played.

{% highlight py %}
dates = [ 'Jan 28', 'Feb 04', ... ]
{% endhighlight %}

You then write some code that plots these values along a single axis labelled "Date".

<figure>
  <img src="{{ site.url }}/img/pitl05/dimension-1-dimensional.svg" />
</figure>

From this one-dimensional plot, you can determine how frequently you play. For a solid blue line of dots, you'd have to have been playing daily. There are significant gaps on either end (you purchased the equipment in late January; now it's almost mid-May) as well as irregular intervals of non-play, but more prominently so towards the start. On average, you are playing around six days a month, and this is increasing. Statisticians would refer to this as an example of *univariate* analysis because we are concerned with a single variable (the dates you have played). Such analysis is useful for describing features like central tendency (mean, median, mode) and dispersion (range, variance, standard deviation).

*Bivariate* analysis is the simultaneous analysis of two variables; this helps identify relationships (if any) between them. In this instance, we will explore the correlation between dates and scores.

You decide to add another *dimension* to your list (a list in a list) so that each element contains two values: a date, and the highest score you accomplished that day. Think of it like this: you added a ("score") dimension to your data that is now mirrored in your code. Programmers will often refer to 1-dimensional, 2-dimensional -- or other higher dimensional -- lists to describe the formations of multidimensional arrays.

{% highlight py %}
scores = [
  ['Jan 28', 120000],
  ['Feb 04', 80000],
  ...
]
{% endhighlight %}

To visualise this, you must add a dimension to your plot. You elect to use a *scatterplot*, placing each dot against a horizontal ("Date") and vertical ("Score") axis.

<figure>
  <img src="{{ site.url }}/img/pitl05/dimension-2-dimensional.svg" />
</figure>

It would appear that playing more frequently leads to more erratic high scores. Perhaps, what is most noteworthy, is that you perform best after stretches of no play (about week's break). The good news is that your all-time high scores do seem to be improving.

You have recorded a lot of data -- including the time of day, environmental factors, and more ... most of it superfluous -- but while poring over these details you realise that there may be a third variable in play: coffee. You add another value to your sub-lists; this is analogous to adding a column to an existing spreadsheet or table. The additional value indicates how many millilitres of coffee you drank (up to 2 cups, or 500ml) before posting a high score for that day.

{% highlight py %}
scores = [
  ['Jan 28', 120000, 220],
  ['Feb 04', 80000,  260],
  ...
]
{% endhighlight %}

To visually accommodate the new coffee values, one can simulate *depth*. You add a third ("Coffee") axis to the scatterplot.

<figure>
  <img src="{{ site.url }}/img/pitl05/dimension-3-dimensional-depth.svg" />
</figure>

Some interesting diagonal patterns have appeared, but gauging the positions of the dots is tricky. Moreover, should the data grow more *multivariate* -- i.e. another variable is introduced -- you face the problem of having to visualise a fourth spatial dimension. But, there are other visual notions to leverage. Consider, *facets*. Imagine the three-dimensional scatterplot as a cube (six-sided) with transparent walls. If you held it in your hand, it could be rotated to reveal a distinct graph on each side. Now, suppose that you 'unfolded' this cube and it laid flat, then separated each facet and arranged them on a grid. The result is a *scatterplot matrix* -- or, acronymically, a SPLOM.

<figure>
  <img src="{{ site.url }}/img/pitl05/dimension-3-dimensional-facets.svg" class="fullwidth" />
  <figcaption>The orange facet of the 3D scatterplot (left) corresponds to the orange subplot in the SPLOM (right).</figcaption>
</figure>

A three-dimensional SPLOM is three rows wide and three columns high. Should you wish to add further variables to the dataset, the matrix can expand to accommodate them.

<figure>
  <img src="{{ site.url }}/img/pitl05/wikimedia-backup/2000px-ScagnosticsExampleSplom.svg.png" />
  <figcaption>
    A scatterplot matrix of scagnostics measures for the Boston Housing data set. Note that each sub-plot need not be represented as a scatterplot. Within the matrix, one can <a href="{{ site.url }}/img/pitl05/dimension-code/t-piece-splom.png">select a mix</a> of bar, line, scatterplot, and other chart types.<br />
    Sigbert [<a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>], <a href="https://commons.wikimedia.org/wiki/File:ScagnosticsExampleSplom.svg">from Wikimedia Commons</a>
  </figcaption>
</figure>

Facets are but one notion, though. *Size* is another option. You decide to revert to the two-dimensional scatterplot, then represent the "Coffee" dimension by adjusting the size of each dot accordingly.

<figure>
  <img src="{{ site.url }}/img/pitl05/dimension-3-dimensional-scale.svg" />
</figure>

However, each does not have to be circular. By including a variety of different *shapes*, one can convey even more information. Then, there's *colour*. Your friend Sam -- who is also an avid coffee drinker -- plans to enter the tournament, too. To compare your progress, you plot Sam's scores in orange.

<figure>
  <img src="{{ site.url }}/img/pitl05/dimension-4-dimensional-colour.svg" />
  <figcaption>Your high scores are plotted in blue; Sam's in orange.</figcaption>
</figure>

Alas, in focussing on visualisation we have drifted away from code snippets. So, how exactly would one structure a Python list to accommodate the scatterplot above? One approach is a 3-dimensional list:

{% highlight py %}
scores = [
  # your scores
  [
    ['Jan 28', 120000, 220],
    ['Feb 04', 80000,  260],
    ...
  ],
  # sam's scores
  [
    ['Feb 07', 145000, 150],
    ['Feb 09', 80100,  170],
    ...
  ]
]
{% endhighlight %}

In this way, each player is a list element containing other nested lists. To return to the spreadsheet analogy: instead of adding another column, you have added a new sheet -- that is, one sheet for yourself and one for Sam.

Now look at a 2-dimensional alternative:

{% highlight py %}
scores = [
  ['me', 'Jan 28', 120000, 220],
  ['me', 'Feb 04', 80000,  260],
  ...
  ['Sam', 'Feb 07', 145000, 150],
  ['Sam', 'Feb 09', 80100,  170],
  ...
]
{% endhighlight %}

In the three-dimensional version, your lists had been contained within one element, and Sam's within another. Now, each entry must include a name. The result is a lot of repetition. Less repetition is usually better.

If you really wanted to give yourself a headache, you could opt for a 1-dimensional list:

{% highlight py %}
scores = [
  'me', 'Jan 28', 120000, 220, 'me', 'Feb 04', ...
]
{% endhighlight %}

Values within the same category are now placed four positions apart from one another. Sure, you could write some loop that works with this ... but, eeew! Right?

Interestingly, the number of dimensions you express visually does not always reflect the number of dimensions that comprise your list. In fact, it's advisable to avoid using anything beyond a three-dimensional list. To return to the spreadsheet analogy one last time: consider adding another column to your existing sheets instead of creating more spreadsheet files.

Effective data visualisation requires the application of art and science to represent multidimensional information structures within two-dimensional visual displays. These displays could be sheets of paper or computer screens. Additionally, though, screens cater to *time*. As an example, charts and figures can animate while you view them. Using mouse, keyboard, touch, speech, gesture and other input, viewers can explore data in an *interactive* fashion. For some inspiration, take a look at Fathom's [project showcase](https://fathom.info/projects/#visualization). Ben Fry, the principal of Fathom, is also one of Processing's co-developers.

## Lists of Lists

While this may seem complicated at first, appropriately nested lists make complex data sets easier to manage. In this practical exercise, you will create a bar chart; roughly speaking, something resembling the illustration below.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-bar-chart.svg" />
  <figcaption>Bar chart outline. The final result will include additional features such as colour.</figcaption>
</figure>

Create a new sketch and save it as "lists_of_lists". Add the following setup code:

{% highlight py %}
size(500,380)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)

h = 50
translate(100,40)
{% endhighlight %}

This is the start of a rainbow-coloured bar chart. The `h` variable and `translate()` function define the first bar's height and starting position, respectively. You will begin with some '0-dimensional' data, working your way up to a 3-dimensional list as you progress. To begin, here is a single integer value:

{% highlight py %}
...
# 0-dimensional
bands = 6
rect(0,0, 40,h*bands)
{% endhighlight %}

Add the above code and run the sketch. The result is a vertical bar representing the *number of bands* in the rainbow sequence. If `bands` were equal to seven, the bar would extend beyond the bottom of the display window.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-0-dimensional.png" />
</figure>

An additional dimension is required to describe the colour of each band. A 1-dimensional variable may be expressed as a list. Add the following lines to the bottom of your working code:

{% highlight py %}
# 1-dimensional
bands = [
  '#FF0000',
  '#FF9900',
  '#FFFF00',
  '#00FF00',
  '#0099FF',
  '#6633FF'
]
{% endhighlight %}

To render the bands, include a loop statement:

{% highlight py %}
for i in range(len(bands)):
    fill(bands[i])
    rect(0,i*h, 40,h)
{% endhighlight %}

Run the sketch. The new strip is drawn precisely over the original bar but is divided into six blocks of colour.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-1-dimensional.png" />
</figure>

The next step is to extend each block of colour, so as to form the horizontal bars. The width of each bar is to be determined by the brightness of its respective colour. To calculate brightness, one can add the red, green, and blue values together. For example, consider white -- it is the brightest 'colour' on your screen; is represented in hexadecimal as `#FFFFFF`; and if converted to percentile values, is expressed as 100% red, 100% green, 100% blue. That is an overall brightness of 300%, or if you prefer to average it out, 300 divide by 3 = 100%.

To manage the colours in as RGB percentages, one must substitute each hexadecimal string with a list of integers. The result is list of lists -- a 2-dimensional array:

{% highlight py %}
# 2-dimensional
bands = [
  [ 100, 0, 0   ],
  [ 100, 60, 0  ],
  [ 100, 100, 0 ],
  [ 0, 100, 0   ],
  [ 0, 60, 100  ],
  [ 40, 20, 100 ]
]
{% endhighlight %}

 Add the code above to the end of your working sketch. To access a list element within another list, include a second pair of square brackets. For example, to retrieve the percentage of green in the second (orange) band, its:

{% highlight py %}
print( bands[1][1] )    # displays 60
{% endhighlight %}

Now, set the `colorMode` to use values between zero and one hundred, and add a loop to draw the bars:

{% highlight py %}
colorMode(RGB, 100)

for i in range(len(bands)):
    r = bands[i][0]
    g = bands[i][1]
    b = bands[i][2]
    sum = r + g + b
    avg = sum / 3
    fill(avg, avg, avg)
    rect(0,i*h, sum,h)
{% endhighlight %}

Run the sketch. The width of each bar is governed by brightness -- that is, the sum of the `r`, `g`, and `b` values. The bars are filled with greys to indicate the relative brightness of each colour.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-2-dimensional-grey.png" />
</figure>

Oddly, the green bar (fourth from the top) is equivalent in brightness/darkness to the red (top) bar. To recall, here is a colour swatch of each:

<figure style="word-spacing:0">
<div style="background-color:#FF0000; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:#00FF00; display:inline-block; width:80px; height:2.5em"></div>
</figure>

This has to do with how the human eye perceives colour. We have a greater number of green receptors, so green light appears more prominent. There are ways to [compromise for this]({% post_url 2017-01-26-converting_css_colour_to_greyscale %}), but for now, our averaging formula will suffice.

Adapt the existing loop, so that each bar indicates the quantities of primary colour that comprise it:

{% highlight py %}
    ...
    b = bands[i][2]
    #sum = r + g + b
    #avg = sum / 3
    #fill(avg, avg, avg)
    #rect(0,i*h, sum,h)
    fill('#FF0000')
    rect(0,i*h, r,h)
    fill('#00FF00')
    rect(0+r,i*h, g,h)
    fill('#0099FF')
    rect(0+r+g,i*h, b,h)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-2-dimensional-colour.png" />
</figure>

Labels will help elucidate things. To add some to the dataset, one could go another list deeper, for example:

{% highlight py %}
bands = [
  [ [ 100, 0, 0  ], 'red'    ],
  [ [ 100, 60, 0 ], 'orange' ],
  ...

print( bands[1][0][1] ) # displays 60
{% endhighlight %}

However, the above code just overcomplicates matters. Adding another dimension is overkill; a fourth element is all that is required. Adapt your code as below:

{% highlight py %}
bands = [
  [100, 0, 0, 'red'],
  [100, 60, 0, 'orange'],
  ...

for i in range(len(bands)):
    ...
    fill('#FFFFFF')
    textAlign(RIGHT)
    text(bands[i][3], -20,i*h+30)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-complete.png" />
  <figcaption>Completed graph, with labels.</figcaption>
</figure>

Many lists work just fine with a single dimension -- take, for instance, a shopping list. You can think of a two-dimensional list as a grid or table. This makes them useful for plotting 2D graphics. Three- and other higher-dimensional arrays have their place, but before employing such a structure, consider whether adding another position to your 2D array may be more sensible.

### Breakout Task

In this challenge, you will recreate a Breakout level. Some code will be provided to work with, and this will include a three-dimensional array. Working with such a list requires a nested loop -- that is, a loop inside another loop.

Create a new sketch and save it as "breakout"; then, copy-paste in the code below:

{% highlight py %}
size(600,600)
noStroke()
background('#000000')

# ball and paddle
fill('#FFFFFF')
ellipse(350,440, 18,18)
rect(300,520, 190,40)

r = '#FF0000' # red
o = '#FF9900' # orange
y = '#FFFF00' # yellow
g = '#00FF00' # green
b = '#0099FF' # blue
p = '#6633FF' # violet

bricks = [
  [ [0,r,1], [1,o,1], [2,y,1], [3,g,1] ], # row 0
  [ [0,o,1], [1,y,1], [2,g,1], [3,b,1] ], # row 1
  [ [0,y,1], [1,g,1], [2,b,1], [3,p,1] ], # row 2
  [ [0,g,1], [1,b,2], [2,p,2], [3,b,1] ], # row 3
  [ [0,b,1], [1,p,2],          [3,g,1] ], # row 4
  [ [0,p,1],                   [3,y,1] ], # row 5
  [                            [3,o,1] ], # row 6
  [ [0,g,1]                            ]  # row 7
]
{% endhighlight %}

In an attempt to make the code more readable, the `bricks` list has been typed-out in a fashion that reflects the visual positioning of each brick. In the following order, each brick contains a: column-number; fill-colour; and hit-count (indicating how many hits are required to destroy it). Take the first brick as an example:  
{% highlight py %}
[0,r,1]
{% endhighlight %}
The brick is positioned in column 0, has a fill of red, and requires one (remaining) hit to destroy. Of course, one can infer the row position from the list in which the brick resides. Add two `print()` statements to confirm this information:

{% highlight py %}
...
print( bricks[0] )       # displays the first row of bricks
print( bricks[0][0] )    # displays the first brick
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-breakout-print.png" class="fullwidth" />
</figure>

Should you wish to retrieve the colour of the first brick, it's:

{% highlight py %}
print( bricks[0][0][1] ) # displays #FF0000
{% endhighlight %}

Now, you must complete the task as per the result below. Bricks with a hit-count of `2` have a shine effect.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-breakout-result.png" />
  <figcaption>The correctly completed task. Note that the three centre bricks have a shine.</figcaption>
</figure>

As mentioned already, you will need to employ a nested loop. If you are stumped, perhaps these few lines will get you going?

{% highlight py %}
for row,bricks in enumerate(bricks):

    for brick in bricks:
        x = brick[0]*150
        ...
{% endhighlight %}

If you are more comfortable with a `range()` style approach, that should work fine too.

## Dictionaries

Dictionaries can be thought of as an extension to the Python list concept. Now that you understand lists, grasping dictionaries should be easy. In a list, each value corresponds to a number indicating its position. One can, therefore, describe lists as *numerically indexed*. With dictionaries, each value is instead associated with a keyword. Dictionaries, therefore, are collections of *key-value pairs*.

If you want to experiment with the dictionary code that follows, create a new "dictionary" sketch now. However, you may find that reading over the content is enough to grasp it. Then you can begin coding again when you encounter the coffee chart task.

### Creating New Dictionaries

Whereas lists are defined within square brackets, dictionaries rely on `{` braces `}`. The code below contrasts a list and a dictionary used to store an individual student's details.

{% highlight py %}
# list
studentlist = ['Sam', 24]

# dictionary
studentdict = {'name':'Sam', 'age':24}
{% endhighlight %}

Preceding each dictionary value is a key (in quotes) and a colon. Separating each key-value pair is a comma. You may store as many key-value pairs as you like in a dictionary -- although, technically speaking, this is limited by how much free RAM/memory is available on your computer.

### Accessing Dictionaries

To access a dictionary item, specify its key within square brackets.

{% highlight py %}
print( studentdict['name'] )  # displays Sam
print( studentdict['age'] )   # displays 24
{% endhighlight %}

To print the entire dictionary, omit the square brackets and key, leaving just the variable name.

{% highlight py %}
print( studentdict )          # {'name': 'Sam', 'age': 24}
{% endhighlight %}

You now understand the syntactical differences between lists and dictionaries. Dictionaries also possess their own set of methods. Many list methods -- such as `append()`, `extend()`, `index()`, `insert()`, and `remove()` -- will not work on dictionaries. There are few important dictionary methods you will need in this lesson, which are covered below. For more methods, refer to any decent Python reference.

#### `.keys()`
<dd markdown="1">
The keys method will return a list of all the dictionary's keys.

{% highlight py %}
print( studentdict.keys() )   # ['name', 'age']
{% endhighlight %}
</dd>

#### `.values()`
<dd markdown="1">
The values method will return a list of all the dictionary's values.

{% highlight py %}
print( studentdict.values() ) # ['Sam', 24]
{% endhighlight %}
</dd>

#### `.items()`
<dd markdown="1">
The `.items()` method returns a list of all the dictionary's key-value pairs.

{% highlight py %}
print( studentdict.items() )  # [('name', 'Sam'), ('age', 24)]
{% endhighlight %}

This method is especially useful for iterating dictionaries (as you will soon see). Be warned, though: it may return values in a seemingly arbitrary order, i.e. not always the order in which they appeared when defining the dictionary. This has to do with how Python stores dictionaries (a topic beyond the scope of these tutorials).

Round brackets denote a *tuple*. Tuple can be pronounced as "too-ple" or "tuh-ple" depending on who you want to annoy. Tuples are not covered in this lesson, but for now, consider them as interchangeable with lists. For example:

{% highlight py %}
items = studentdict.items()
print( items[0] )             # ('name', 'Sam')
print( items[0][0] )          # name
{% endhighlight %}

Note how tuple elements are also numerically indexed, and how list syntax is used to retrieve values. In a nutshell, the key difference is that tuples, once defined, cannot be modified. For more information, refer to the Processing [reference](https://py.processing.org/reference/tuple.html).
</dd>

### Modifying Dictionaries

Dictionaries are dynamic structures. You can add and modify key-value pairs whenever you please. To change an existing value, simply reassign it as you would a list element. Of course, you will use a key name as opposed to a numeric index.

{% highlight py %}
studentdict['age'] = 25
print(studentdict)
# {'name': 'Sam', 'age': 25}
{% endhighlight %}

To add a new key-value pair, follow the same process.

{% highlight py %}
studentdict['id'] = 19011501
print( studentdict )
# {'name': 'Sam', 'id': 19011501, 'age': 25}
{% endhighlight %}

To remove a key-value pair, use the `del` statement.

{% highlight py %}
del studentdict['age']
print(studentdict)
# {'name': 'Sam', 'id': 19011501}
{% endhighlight %}

If you need to add/combine one dictionary with another, refer to the [`update()`](https://py.processing.org/reference/dict_update.html) method.

### Nested Dictionaries

As with lists, dictionary values may comprise a mix of data types and can even include other dictionaries or lists.

{% highlight py %}
# dictionary of lists
students = {
  'names':['Sam', 'Lee'],
  'ages':[24, 18]
}
print( students['names'][1] ) # displays Lee
{% endhighlight %}

Lists can also contain dictionaries.

{% highlight py %}
# list of dictionaries
students = [
  {'name':'Sam', 'age':24},
  {'name':'Lee', 'age':18}
]
print( students[1]['name'] )  # displays Lee
{% endhighlight %}

What you name your keys -- i.e. name and age -- and how you nest collections of elements should help relate your data to real-world models.

### Loops + Dictionaries

As with lists, there are many scenarios where you will want to loop through dictionaries. Considering that a dictionary can hold thousands or even millions of key-value pairs, this is a powerful feature. Because of the key-value system, though, iterating dictionaries is a little different than lists. You can iterate a dictionary's keys, iterate its values, or iterate its key-value pairs. This is where the `keys()`, `values()`, and `items()` methods prove particularly handy. We will explore an example of each approach. First, let's print `studentdict` to see what we are dealing with:

{% highlight py %}
print(studentdict)
# {'name': 'Sam', 'id': 19011501}
{% endhighlight %}

Because the `keys()` method returns a list, you can use it to iterate a dictionary's keys.

{% highlight py %}
for k in studentdict.keys():
    print(k)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/dictionaries-loop-keys.png" class="fullwidth" />
  <figcaption>The Console displays:<br />
    <code>name<br />id</code>
  </figcaption>
</figure>

On the first iteration, the `print` line displays the value of `studentdict.keys()[0]`, and on the second iteration, `studentdict.keys()[1]`. This is confirmed in the Console, which displays "name" then "id". Key iteration, however, automatically occurs when you combine a loop and a dictionary. If you omit the `keys()` method in the previous example, the result is the same.

{% highlight py %}
#for k in studentdict.keys():
for k in studentdict:
    print(k)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/dictionaries-loop-keys-methodless.png" class="fullwidth" />
  <figcaption>The Console displays:<br />
    <code>name<br />id</code>
  </figcaption>
</figure>

If you prefer a more explicit coding style, stick with the `keys()` method.

The `values()` method can be used similarly to the `keys()`. Of course, this returns just the element values.

{% highlight py %}
for v in studentdict.values():
    print(v)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/dictionaries-loop-values.png" class="fullwidth" />
  <figcaption>The Console displays:<br />
    <code>Sam<br />19011501</code>
  </figcaption>
</figure>

If you need to retrieve keys and values, use the `items()` method. In the example below, the loop prints a tuple holding the current iteration's key-value pair. Because the `items()` method returns both a key and a value, you must include two variable names (between the `for` and `in` of the statement). You may name these whatever you like, but the order of assignment is always: key first, value second.

{% highlight py %}
for k,v in studentdict.items():
    print(k,v)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/dictionaries-loop-items.png" class="fullwidth" />
  <figcaption>The Console displays:<br />
    <code>('name', 'Sam')<br />('id', '19011501')</code>
  </figcaption>
</figure>

If you want the loop to retrieve the keys in alphanumerical order, use the `sorted()` function.

{% highlight py %}
for k,v in sorted( studentdict.items() ):
    print(k,v)
# prints:
# ('id', 19011501)
# ('name', 'Sam')
{% endhighlight %}

The "id" tuple now appears first in the Console (before "name"). The `sorted()` function accepts additional arguments (such as `reverse` ordering). The Processing [reference](https://py.processing.org/reference/sorted.html) includes more information.

## Coffee Chart Task

In this task, you will combine dictionaries, a list, and a loop. The result is a chart illustrating different [types of coffee](https://realcoffee.co.nz/wp-content/uploads/2016/05/Fotolia_109706822_Subscription_Monthly_M.jpg) -- that is, the amount of espresso, hot-water, steamed-milk, and foamed-milk that comprise each type.

Create a new sketch and save it as "coffee_chart". Add the following setup code:

{% highlight py %}
size(800,800)
background('#004477')

mug = 110
col = 1
row = 1
coffees = [
  'cafe con leche', 'espresso', 'demi-creme',
  'americano', 'capucchino', 'latte',
  'ristretto', 'macchiato', 'flat white'
]

for coffee in coffees:
    x = width/4*col
    y = height/4*row

    # mug
    stroke('#FFFFFF')
    strokeWeight(4)
    noFill()
    arc(x+55,y, 40, 40, -HALF_PI, HALF_PI)
    arc(x+55,y, 65, 65, -HALF_PI, HALF_PI)
    rect(x-mug/2,y-mug/2, mug,mug)

    if col%3 == 0:
        row += 1
        col = 1
    else:
        col += 1
{% endhighlight %}

Run the sketch; it renders nine empty mugs.

<figure>
  <img src="{{ site.url }}/img/pitl05/coffee-chart-empty-mugs.png" />
</figure>

At this point, the `coffees` variable is nothing more than a list of names. Replace this with the list of dictionaries below. It is easiest to copy and paste over the existing `coffees` list.

<div style="font-size: 0.7em; line-height: 2em" markdown="1">
{% highlight py %}
...
row = 1
coffees = [
  { 'name':'cafe con leche','espresso':50, 'hotwater':0, 'steamedmilk':30,'foamedmilk':0  },
  { 'name':'espresso',      'espresso':60, 'hotwater':0, 'steamedmilk':0, 'foamedmilk':0  },
  { 'name':'demi-creme',    'espresso':40, 'hotwater':0, 'steamedmilk':40,'foamedmilk':0  },
  { 'name':'americano',     'espresso':60, 'hotwater':30,'steamedmilk':0, 'foamedmilk':0  },
  { 'name':'capucchino',    'espresso':40, 'hotwater':0, 'steamedmilk':30,'foamedmilk':30 },
  { 'name':'latte',         'espresso':35, 'hotwater':0, 'steamedmilk':10,'foamedmilk':30 },
  { 'name':'ristretto',     'espresso':30, 'hotwater':0, 'steamedmilk':0, 'foamedmilk':0  },
  { 'name':'macchiato',     'espresso':40, 'hotwater':0, 'steamedmilk':0, 'foamedmilk':60 },
  { 'name':'flat white',    'espresso':40, 'hotwater':0, 'steamedmilk':60,'foamedmilk':0  }
]
...
{% endhighlight %}
</div>

The challenge is to fill each mug with the relevant proportions of ingredients. Begin with the labels (beneath each mug). The finished result looks like this:

<figure>
  <img src="{{ site.url }}/img/pitl05/coffee-chart-complete.png" class="fullwidth" />
  <figcaption>
    <span style="color:#322; text-shadow:1px 1px 1px #000">&#9632;</span> espresso &nbsp;
    <span style="color:#09F; text-shadow:1px 1px 1px #000">&#9632;</span> hot-water &nbsp;
    <span style="color:#FFF; text-shadow:1px 1px 1px #000">&#9632;</span> steamed-milk &nbsp;
    <span style="color:#DDD; text-shadow:1px 1px 1px #000">&#9632;</span> foamed-milk
  </figcaption>
</figure>

This code can easily be adapted to include as many coffee types as you desire, each with its own mug. However, the process of having to write and format the `coffees` data using Python syntax leaves room for improvement. In the next section, you will look at how Python can read in data from external files.

## External Data

You have already utilised external data in the form of images in your Processing sketches. Python -- and by extension, Processing -- can handle many additional file types. For instance, you could create a game using Processing that incorporates various audio and video files, storing these multimedia assets in your sketch's "data" directory. For now, though, we will look at text-based files.

<sup markdown="1">Processing is **not** that great for developing games. There are plenty of better options out there. [LÖVE](https://love2d.org/) is a neat little 2D-engine programmed in a language called Lua. For something Python-based, you could try [Pygame](https://www.pygame.org/news).</sup>

A *file format* is a standardised means of encoding information for storage on a digital medium. There are many such formats, each interpreted differently. For example, applications are encoded in executable formats, such as APK for Android or EXE for Windows. Then, there are multimedia formats, like MP3 for music or JPG for images. You can identify a file's format by its file extension. Frustratingly, many operating systems hide file extensions -- but, if you dig around in your [Windows](https://support.microsoft.com/en-nz/help/4479981/windows-10-common-file-name-extensions) or Mac Finder settings, you can get them to show in your file manager. File extensions are (most commonly) three letters in length, always preceded by a full-stop/period, and tacked onto the end of a file name. In the screenshot below, the file manager reveals the extensions of three files: an audio (`.mp3`), plain text (`.txt`) and image (`.jpg`) file.

<figure>
    <img src="{{ site.url }}/img/pitl05/data-file-extensions.png" />
</figure>

Your system relies on the file extensions to open files with an appropriate app, and also to generate icons. If you remove or rename a file extension, this association is lost. Perhaps you have tried to open an MP3 (or JPG) file in a text editor? If so, you'll know that all you get is a bunch of garbled characters:

<figure>
    <img src="{{ site.url }}/img/pitl05/data-file-extensions-garbled.png" class="fullwidth" />
    <figcaption>An MP3 file opened with Atom (a code editor).</figcaption>
</figure>

Atom is designed for editing text-encoded files, and therefore attempts to interpret the audio data as characters. While you might spot some intelligible metadata in there somewhere, it's 99% gobbledygook. Yet, if you open this same file in iTunes, Windows Media Player, or VLC, you hear music.

Some file formats are text-based; this means that you can open them in any text or code editor (like Atom) and make some sense of the content. To clarify: by text-based, I mean *plain text* -- as in, not a Word document. "Plain" means no bold, no italic, no varied fonts, etc. If you have written HTML before, you know what I'm talking about. So -- you may be wondering -- what is plain text good for? Well, shopping lists ... and HTML, XML, CSV, JSON, and programming code, among other things. For instance, Processing files are plain text, albeit with a `.pyde` file extension.

Suppose that you wish to share a music playlist on your blog. For sharing playlists, many media players provide an 'export to XML' feature of some sort. XML (eXtensible Markup Language) files have a `.xml` extension. To give an idea of what [VLC](https://www.videolan.org/vlc/) generates, here is a snippet of XML code:

<div style="font-size: 0.7em; line-height: 2em" markdown="1">
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<playlist version="1" xmlns="http://xspf.org/ns/0/">
  <title>Pink Floyd Playlist</title>
  <trackList>
    <track>
      <location>file:///music/SpeakToMe.mp3</location>
      <title>Speak to Me</title>
      <creator>Pink Floyd</creator>
      <album>The Dark Side of the Moon</album>
      <trackNum>1</trackNum>
    </track>
    <track>
      <location>file:///music/Breathe.mp3</location>
      <title>Breathe</title>
      <creator>Pink Floyd</creator>
      <album>The Dark Side of the Moon</album>
      <trackNum>2</trackNum>
    </track>
    ...
{% endhighlight %}
</div>

It is not important to understand XML for this lesson -- but, although you may never have written or viewed any XML before, you can likely make some sense of the playlist's contents? Contained within an opening and closing pair of track tags (`<track>...</track>`), you can discern the details of each song. Without getting into the technical details, it is relatively easy to parse this content using JavaScript so that it displays in a webpage (your blog).

Alternatively, you could elect to use *JavaScript Object Notation*. JSON files are named with a `.json` extension. The syntax closely resembles that of Python dictionaries:

<div style="font-size: 0.7em; line-height: 2em" markdown="1">
{% highlight json %}
{
  "playlist" : {
    "title"    : "Pink Floyd Playlist",
    "track"    : [
      {
        "location"    : ["file:///music/SpeakToMe.mp3"],
        "title"       : "Speak to Me",
        "creator"     : "Pink Floyd",
        "album"       : "The Dark Side of the Moon"
        "trackNum"    : "1"
      },
      {
        "location"    : ["file:///music/Breathe.mp3"],
        "title"       : "Breathe",
        "creator"     : "Pink Floyd",
        "album"       : "The Dark Side of the Moon"
        "trackNum"    : "2"
      },
      ...
{% endhighlight %}
</div>

XML and JSON are excellent formats for exchanging information between applications. Consequently, many programming languages (including Python) provide libraries for generating and parsing XML and JSON files.

To keep things simple, we will look at reading in data from another text-type format: CSV. *Comma-Separated Value* files are, perhaps, the simplest means of formatting plain-text data. The file extension is -- yup, you guessed it -- `.csv`. Because of CSV's simplicity, you can often forgo using a library. Each line of a CSV file is an entry. Each entry consists of one or more fields, separated by commas. Here is the same abridged playlist in CSV format:

<div style="font-size: 0.7em; line-height: 2em" markdown="1">
{% highlight csv %}
location,title,creator,album,trackNum
file:///music/SpeakToMe.mp3,Speak to Me,Pink Floyd,The Dark Side of the Moon,1
file:///music/Breathe.mp3,Breathe,Pink Floyd,The Dark Side of the Moon,2
...
{% endhighlight %}
</div>

The first line of the file contains the field headings. Lines two and three provide the details of tracks 1 and 2 respectively. You will find that your spreadsheet software (Microsoft Excel, LibreOffice Calc, or similar) will associate itself with any files bearing the extension `.csv`. Opening any CSV file in a spreadsheet displays the information in the typical row-and-column arrangement. This is useful for preparing CSV data -- but be aware that none of the styling (cell-sizes, font colours, etc.) will be retained once saved back to CSV.

<figure>
    <img src="{{ site.url }}/img/pitl05/data-csv-spreadsheet.png" class="fullwidth" />
    <figcaption>Opening the playlist.csv file in LibreOffice Calc.</figcaption>
</figure>

CSV files do not always rely on a comma to delimit each field. For instance, tab and space-separated values are standard, too.

To read in text-based files, Processing uses a `loadStrings()` function. If you want to experiment with the CSV code that follows, you can create a new "csv" sketch now. However, you may find that reading over the content is enough to grasp it. Then, you can begin coding again when you encounter the Game Sales Chart task.

As with all external assets, the <a href="{{ site.url }}/img/pitl05/playlist.csv" download>playlist.csv</a> must be placed in the "data" sub-directory of your sketch. The `loadStrings()` function accepts a single argument: the path of your text file. It returns this file as a list of strings, each representing an individual line.

{% highlight py %}
csv = loadStrings('playlist.csv')
print(csv)
{% endhighlight %}

<figure>
    <img src="{{ site.url }}/img/pitl05/data-csv-loadstrings.png" class="fullwidth" />
    <figcaption>The entire <code>csv</code> list printed to the Console.</figcaption>
</figure>

To separate out each line (the list's elements) use a loop.

{% highlight py %}
csv = loadStrings('playlist.csv')
#print(csv)

for entry in csv:
    print(entry)
{% endhighlight %}

<figure>
    <img src="{{ site.url }}/img/pitl05/data-csv-lines.png" class="fullwidth" />
    <figcaption>The playlist.csv file printed line-by-line using a loop.</figcaption>
</figure>

The [`split()`](https://py.processing.org/reference/string_split.html) method can now be used to dice up each line into further lists. This works using the delimiter argument of your preference -- in this case, a comma.

{% highlight py %}
csv = loadStrings('playlist.csv')
#print(csv)

for entry in csv:
    #print(entry)
    print( entry.split(',') )
{% endhighlight %}

<figure>
    <img src="{{ site.url }}/img/pitl05/data-csv-split.png" class="fullwidth" />
    <figcaption>Each entry printed as a list of strings (note the square brackets at the start and end of each line).</figcaption>
</figure>

The `u` tags indicate *unicode* character representation. This is not important for now; unicode is effectively string data and everything will behave the same, regardless. To print the title of each track, retrieve the field with an index of `[1]`.

{% highlight py %}
csv = loadStrings('playlist.csv')
#print(csv)

for entry in csv:
    #print(entry)
    #print( entry.split(',') )
    print( entry.split(',')[1] )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/data-csv-split-index.png" class="fullwidth" />
</figure>

CSV, JSON, and XML each have their strengths and weaknesses. The beauty of CSV lies in its simplicity, but it does not support hierarchically-structured data. XML is an established, widely-supported, and flexible data exchange format, but it can turn out overly-complex and bloated at times. JSON is somewhat of a middle-ground, with a syntax that's more compact than XML; JSON is also growing increasingly popular on the Web. You should weigh up the relative merits of each when considering what is best for your projects.

### Game Sales Chart Task

In this final challenge, you will generate a bar chart of the best selling games of all time. Create a new sketch and save it as "game_sales_chart".

The games list has been sourced from a [Wikipedia article](https://en.wikipedia.org/wiki/List_of_best-selling_video_games) (which may well have shuffled since) and converted from an HTML table to a tab-delimited CSV file. Download a copy for your sketch and place it in the "data" sub-directory:

<a href="{{ site.url }}/img/pitl05/list_of_best-selling_video_games.csv" download>list_of_best-selling_video_games.csv</a>

Add some basic setup code:

{% highlight py %}
size(800,800)
background('#004477')
noStroke()
csv = loadStrings('list_of_best-selling_video_games.csv')
{% endhighlight %}

I have opted for tab-separated values. It's highly unlikely that any game titles or studio/publisher names will contain tab characters, but there may be commas that could interfere with the `split()` step. Here are the first few lines of the of the CSV file; the tabs do not always form perfect columns, but, more importantly, there is a single (invisible) tab character between each field.

<div style="font-size: 0.7em; line-height: 2em" markdown="1">
{% highlight csv %}
Rank 	Sales 	Title 	Developer 	Publisher
1 	170000000 	Tetris 	Elektronorgtechnica 	Spectrum HoloByte
2 	144000000 	Minecraft  	Mojang 	Mojang
...
{% endhighlight %}
</div>

You may want to open the CSV file for yourself to inspect the values. There are fifty games in all. The respective sales figure will determine the width of each bar in your chart. You will need to perform some mathematical calculation to scale the bars relative to the display window -- but, while the "Sales" figures appear to be numbers, they are actually stored as 'text'. In other words, you cannot perform mathematical operations on *string* data. To demonstrate, add this code to the bottom of your sketch:

{% highlight py %}
tetrisentry = csv[1].split('\t')
tetrissales = tetrisentry[1]
print( tetrissales )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/game-sales-chart-print-string.png" class="fullwidth" />
  <figcaption>The Console displays: 170000000</figcaption>
</figure>

Okay, so everything seems fine, for now. You retrieved the Tetris sales figure and printed it to the Console. Next, try some arithmetic:

{% highlight py %}
...
print( tetrissales + 1 )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl05/game-sales-chart-print-error.png" class="fullwidth" />
  <figcaption>TypeError: cannot concatenate 'unicode' and 'int' objects</figcaption>
</figure>

As reported in the Console, Python is unable to add together the unicode and integer data. Fortunately, there is an easy fix. One must convert the unicode data to something numeric. The `int()` and `float()` functions convert various data types to integer and floating point values, respectively.

{% highlight py %}
...
print( int(tetrissales) + 1 )
{% endhighlight %}

Run the sketch. The Console is now error-free and displays `170000001`.

Now, complete the chart as per the screenshot below.

<figure>
  <img src="{{ site.url }}/img/pitl05/game-sales-chart-complete.png" class="fullwidth" />
</figure>

Begin with a loop that prints each entry. Then, get the labels displaying (before the bars). Once you have labels, add plain white bars of the correct width, then finish off with the rainbow sequence effect.

## Lesson 06

That's it for lesson 05! Lists and dictionaries are relatively straight-forward, though combining collections of values with loops is a trickier concept to grasp. That said, what you have learned here is vital for what lies ahead -- both in these lessons and beyond. In the next tutorial, we'll zoom-in further, like, to pixel level. You'll pick up some neat new skills, like how to read values off pixels to create your very own Photoshop-esque filters.

**Begin Lesson 06:** [Pixels and Graphics]({% post_url 2019-02-08-processing.py_in_ten_lessons--06-_pixels_and_graphics %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

## References

* https://en.wikipedia.org/wiki/List_of_best-selling_video_games
* http://isabelmeirelles.com/book-design-for-information/
* http://lgames.sourceforge.net/
* https://py.processing.org/reference/
* https://towardsdatascience.com/the-art-of-effective-visualization-of-multi-dimensional-data-6c7202990c57
* https://www.python.org/dev/peps/pep-0020/
