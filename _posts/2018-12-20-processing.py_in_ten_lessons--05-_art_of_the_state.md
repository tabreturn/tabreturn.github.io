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

Time to consolidate what has been covered thus far. In this challenge you will apply various list techniques to shuffle the colour bands of an incorrectly sequenced rainbow (orange, followed by violet, then blue, red, yellow, green, and indigo). Wait -- what the heck is indigo, anyway? According to the [dictionary](https://en.wiktionary.org/wiki/indigo), indigo is a "purplish-blue colour", and violet is a "blueish-purple colour" 😕. On that point, why is there no purple band in the rainbow?

<figure style="word-spacing:0">
<div style="background-color:indigo; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:darkviolet; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:purple; display:inline-block; width:80px; height:2.5em"></div>
<figcaption>From left to right: indigo, dark-violet, and purple. According to your web browser.</figcaption>
</figure>

Purple is a combination of two *spectral* colours. There is no wavelength of purple light -- it only exists as a combination of red and blue waves. Violet, however, is an actual spectral colour, with its own wavelength of approximately 380–420 nanometres. Indigo is positioned somewhere between violet and blue, but exactly where -- or if at all -- is a matter for debate. In his famous prism experiments, Isaac Newtown defined seven rainbow colours, squeezing indigo in just before violet. You may wonder, why seven colours from a graduated array spanning the visible spectrum? Seven had occult significance. It's no coincidence that there are seven colours in the rainbow, seven days of the week, and seven musical notes that define the western major scale. Today, though, colour scientists are inclined to divide the spectrum at violet and blue, leaving no room for indigo.

In these lessons, we drop indigo for a six colour rainbow (just like Pink Floyd did).

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png" />
  <figcaption>
    <em>The Dark Side of the Moon</em> album cover depicts a prism splitting a beam of white light into its constituent colours. Pink Floyd's designer, Storm Thorgerson, opted for a six-color, indigo-less rainbow.<br />
    source: <a href="https://en.wikipedia.org/wiki/File:Dark_Side_of_the_Moon.png">Wikipedia</a>

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

Now, insert the following code just above fill/rect lines:

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
rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'violet']
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

No specific approach is necessarily better than another. What you elect to use will depend on your coding style and the application at hand.

Recall, though, that `i` and `v` are variable names. Use whatever you feel is most descriptive -- for example:

{% highlight py %}
for number,colour in enumerate(rainbow):
    print( ('%s: %s') % (number, colour) )
{% endhighlight %}

In this instance, I have opted for the British spelling of col<ins>ou</ins>r to avoid confusing the variable with Processing's [`color()`](https://py.processing.org/reference/color.html) function.

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

An `enumerate()` is, perhaps, the more elegant solution. If you ever find yourself weighing-up different approaches, read through [The Zen of Python](https://www.python.org/dev/peps/pep-0020/) -- a list of 19 one-line principles to help guide your coding.


### Lists of Lists

Lists may contain other lists. While this may sound complicated at first, appropriately nested lists make complex data sets easier to manage. Programmers will often refer to 1-dimensional, 2-dimensional -- or other higher dimensional -- lists to describe the formations of multidimensional arrays. To introduce this concept, we will create a bar chart. Roughly speaking, something resembling the illustration below.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-bar-chart.svg" />
  <figcaption>Bar chart outline. The final result will include additional features such as colour.</figcaption>
</figure>

Create a new sketch and save it as "lists_of_lists". Add the following setup code:

{% highlight py %}
size(500, 380)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)

h = 50
translate(100,40)
{% endhighlight %}

This is the start of a rainbow-coloured bar chart. The `h` variable and `translate()` function define the first bar's height and starting position, respectively. You will begin with some 0-dimensional data, working your way up to a 3-dimensional list as you progress. To begin, here is a 0-dimensional integer value:

{% highlight py %}
...
# 0-dimensional
bands = 6
rect(0,0, 40,h*bands)
{% endhighlight %}

Run the sketch. The result is a vertical bar representing the *number of bands* in the rainbow sequence.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-0-dimensional.png" />
</figure>

If `bands` was equal to seven, the bar would extend beyond the bottom of the display window. In order to describe the colour of each band, an additional dimension is required. A 1-dimensional variable can be expressed as a list. Add the following lines to the bottom of your working code:

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

Run the sketch. The new strip is drawn precisely over the original bar, but is divided into six blocks of colour.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-1-dimensional.png" />
</figure>

The next step is to extend each block of colour, so as to form the horizontal bars. The width of each is to be determined by the brightness its respective colour. To calculate brightness, one can add the red, green, and blue values together. For example, consider white -- it is the brightest 'colour' on your screen; is represented in hexadecimal as `#FFFFFF`; and if converted to percentile values, is expressed as 100% red, 100% green, 100% blue. That is an overall brightness of 300%, or if you prefer to average it out, 300 divide by 3 = 100%.

To manage the colours in as RGB percentages, one must substitute each hexadecimal string with a list of integers. The result is list of list elements -- a 2 dimensional array:

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

One you have added the above code, set the `colorMode` accordingly, and add a loop to draw the bars.

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

Run the sketch. The width of each bar is governed by brightness -- that is, the sum of the `r`, `g`, and `b` values. The bars are filled in grey, so as to better indicate the relative brightness of each colour.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-of-lists-2-dimensional-grey.png" />
</figure>

Oddly, the green bar (fourth from the top) is equivalent in brightness/darkness to red (top bar). To recall, here is a colour swatch of each:

<figure style="word-spacing:0">
<div style="background-color:#FF0000; display:inline-block; width:80px; height:2.5em"></div
><div style="background-color:#00FF00; display:inline-block; width:80px; height:2.5em"></div>
</figure>

This has to do with how the human eye perceives colour. We have a greater number of green receptors, so green is more prominent. There a ways to [compromise for this]({% post_url 2017-01-26-converting_css_colour_to_greyscale %}), but for now, our averaging formula will suffice. Adapt the existing loop so that the bars indicate the quantities of each primary colour that comprises them:

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
  <figcaption>..............................................</figcaption>
</figure>

Labels


















In fact, you can see the trend -- the next colour, violet, has no green

[][] syntax

### Breakout Task

In this challenge you will recreate a Breakout level. Some code will be provided to work from, and this include a three-dimensional array. Working with such a list requires a nested loop -- that is, a loop inside another loop.

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

In an attempt to make the code more readable, the `bricks` list has been typed-out in a fashion that reflects the positioning of each brick. In the following order, each brick contains a column-number, fill-colour, hit-count (for indicating how many hits are required to destroy it). Take the first brick as an example:  
{% highlight py %}
[0,r,1]
{% endhighlight %}
The brick is positioned in column 0, has a fill of red, and requires one (more) hit to destroy. Of course, the row position can be inferred from the list in which it resides. Add two `print()` statements to confirm this information:

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

Now, you must complete the task, as per the result below. Bricks with a hit-count of `2` have an additional shine effect.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-breakout-result.png" />
  <figcaption>The three centre bricks have a shine.</figcaption>
</figure>

As mentioned already, you will need employ a nested loop. If you are stumped, perhaps these few lines will get you going?

{% highlight py %}
for row,bricks in enumerate(bricks):

    for brick in bricks:
        x = brick[0]*150
        ...
{% endhighlight %}

If you are more comfortable with a `range()` type of approach, that should work fine too.

### EXTRA
??? comprehensions, tuples

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

* http://lgames.sourceforge.net/

* https://py.processing.org/reference/

* https://www.python.org/dev/peps/pep-0020/
