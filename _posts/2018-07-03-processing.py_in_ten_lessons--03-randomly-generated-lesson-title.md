---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 03: &lt;randomly generated lesson title>"
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#conditional-statements"><em>conditional statements</em></a> /
<a href="#iteration"><em>iteration</em></a> /
<a href="#randomness"><em>randomness</em></a>

---
&nbsp;  
The programs you have written thus far execute line-by-line, beginning at the top of the code and ending at the bottom. You can visualise this sequential flow as a set of steps chained together in a linear arrangement. However, a programmer can redefine the order in which code is run, writing various calls and conditions to control the flow -- a concept referred to as *control flow* -- thereby allowing the program to skip, jump to, and repeat lines.

<figure>
  <img src="{{ site.url }}/img/pitl03/intro-flowchart.svg" />
  <figcaption>Sequential (left) versus control-flowed execution (right).</figcaption>
</figure>

Control flow allows for more 'intelligent' programs. As an example: consider that you wish to fill the display window with circles.

<figure>
  <img src="{{ site.url }}/img/pitl03/intro-circles.svg" />
  <figcaption>9-circle (left) and 81-circle (right) layouts.</figcaption>
</figure>

A 9-circle arrangement requires writing nine `ellipse` functions; this is manageable enough. However, writing eighty-one `ellipse` lines is tedious. Using control flow statements, one can instead instruct Processing to add as many circles as are required, ceasing once done. This allows for more dynamic code, i.e. you specify the size of circles and the program calculates how many columns and rows are required. Additionally, this approach can better cater for any random diameter value.

This lesson covers topics involving conditional statements and iteration. Implementing such logic may require you to think in new ways. If you find yourself struggling with something, do not stress, that's normal! with a little perseverance you'll soon grasp whatever has you snagged.

You will also explore randomness -- one of the most powerful and exciting tools in the creative programmer's tool-set.

## Conditional Statements

Conditional statements are used to check conditions and provide appropriate responses. You can think of this as asking a *question*; receiving an *answer*; then performing an *action* in response the answer. For example:

*Question:* Is the ball red?

*Answer:* Yes.

*Action:* Place it in the bucket labelled "red balls".

To explore Python's various conditional statements, create a new sketch and save it as "conditional_statements". Add the following code:

{% highlight py %}
size(600,400)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

### Boolean Datatype

At this point you are familiar with three datatypes: string, integer, and float. Before moving onto conditional statements, you require an introduction to a fourth type: *boolean*.

A boolean can represent one of two possible states: `True` or `False`. Note that when writing these values, the first letter is always uppercase and no quotation marks are used (as this would make the value a string). Add the following code:

{% highlight py %}
...

ball_is_red = True
ball_is_blue = False
print(ball_is_red)
print(ball_is_blue)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/conditional-statements-booleans.png" class="fullwidth" />
</figure>

### Relational Operators

Relational operators determine the relationship between two operands. Consider this basic example:  
`3 > 2`  
In this case, `3` and `2` are the *operands*. The `>` sign is the *operator*. Three is greater than two, so this statement is true. To see how this works in Python, add the following code to your "conditional_statements" sketch:

{% highlight py %}
...

x = 2
print( x > 1 )        # displays: True
print( x < 1 )        # displays: False
{% endhighlight %}

Take note of how the relational operations return a boolean value. This will be important in the next section. Here is a list of Python's various relational operators:

`>    ` greater-than  
`<    ` less than  
`>=   ` greater-than-or-equal-to  
`<=   ` less-than-or-equal-to  
`==   ` equal-to  
`!=   ` not-equal

The `==` and `!=` operators have the ability to operate on both numbers and strings:

{% highlight py %}
...
print( x == 2 )       # displays: True
name = 'Jo'
print( name == 'Jo' ) # displays: True
print( name != 'Em' ) # displays: True
{% endhighlight %}

Relational operators are particularly useful when combined with `if` and other conditional statements.

### If Statements

If statements are one of the most essential and basic means of introducing logic to your program. Add this basic example to your working sketch:

{% highlight py %}
...

mark = 60

if mark >= 50:
    print('PASS')
{% endhighlight %}

The code awards a PASS grade for any mark greater-than-or-equal-to fifty. In the above case the `mark >= 50` returns `True`; so the `print('PASS')` line is executed. It is vital that you indent the `print` line, for which you may use a tab or space characters. It does not matter how many spaces -- although, four or two is most common -- but you must be consistent throughout your code. Everything indented beneath the `if` line is executed upon the condition returning `True`. For example, this code will print "PASS" and "Well done!" for any mark greater-than-or-equal-to fifty:

{% highlight py %}
mark = 60

if mark >= 50:
    print('PASS')
    print('Well done!')
{% endhighlight %}

However, this code would print "Well done!" regardless of whether or not the mark exceeds fifty:

{% highlight py %}
mark = 20

if mark >= 50:
    print('PASS')
print('Well done!')
{% endhighlight %}

To nest an if statement within another if statement, increase the indentation accordingly:

{% highlight py %}
mark = 60
language = 'ES'

if mark >= 50:
    print('PASS')

    if language == 'EN':
        print('Well done!')

    if language == 'ES':
        print('Bien Hecho!')
{% endhighlight %}

This displays "Bien Hecho!".

#### Else-If Statements

Currently, the grading program can only award a PASS. Ideally, it should assign letter grades (A/B/C/...). This requires additional if statements. Adapt you code for this:

{% highlight py %}
mark = 60

if mark >= 50:
    print('C')

if mark >= 65:
    print('B')
{% endhighlight %}

As you would expect, the console displays a "C". But there is an issue -- a mark of `70` results in a "C" and "B":

{% highlight py %}
mark = 70

if mark >= 50:
    print('C')

if mark >= 65:
    print('B')
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/conditional-statements-if-cb.png" class="fullwidth" />
</figure>

The problem here is that both if statements operate independently of one another. If the grade is awarded a "B" then there is no need to check the C condition. This requires an `elif` (else-if) statement, as well as a little reordering of your code:

{% highlight py %}
mark = 70

if mark >= 65:
    print('B')

elif mark >= 50:
    print('C')
{% endhighlight %}

This correctly displays a "B" in the Console. Because the `if` line returns `True`, the `elif` is skipped. This is why the correct ordering of `if`/`elif` statements is vital; should the C condition to come first, every mark greater-than-or-equal-to 50 is awarded a C-grade, as the B condition will be skipped.

Chain another `elif` statement to the code, and adjust the mark to test a few different cases:

{% highlight py %}
mark = 77

if mark >= 80:
    print('A')
elif mark >= 65:
    print('B')
elif mark >= 50:
    print('C')
{% endhighlight %}

To visually group the connected if/elif statements, the empty line between each has been removed; this is a matter of style, but you are welcome to add as many empty lines as you see fit. You may add as many additional `elif` statements as you need.

A mark below `50` passes through all of the if/elif statements without invoking any action. To handle FAIL cases, one can use the `else` statement.

#### Else Statements

Else statements handle any condition that does not match that specified by in the `if` statement (or an `if`/`elif` grouping). Add an `else` statement to your code:

{% highlight py %}
mark = 49

if mark >= 80:
    print('A')
elif mark >= 65:
    print('B')
elif mark >= 50:
    print('C')
else:
    print('FAIL')
{% endhighlight %}

The else statement need not follow an `elif`. For example:

{% highlight py %}
if mark >= 50:
    print('PASS')
else:
    print('FAIL')
{% endhighlight %}

Of course, this all depends on the logic you wish to implement.

#### Logical Operators

Thus far, each of the `if`/`elif` statements have been based on the outcome of a single relational operation; for example:  
*is the mark greater-than-or-equal-to fifty?*

However, there are many occasions where multiple relational operations must be evaluated within a single condition; for example:  
*is the mark greater-than-or-equal-to forty-five AND less-than fifty?*

For these purposes, Python provides three logical operators:

`and   ` returns true if both operands are true  
`or    ` returns true if at least one operand is true  
`not   ` reverses the boolean (true becomes false and vice-versa)

Add an `and` condition to handle marks in the RESUBMIT range:

{% highlight py %}
mark = 49

if mark >= 80:
    print('A')
elif mark >= 65:
    print('B')
elif mark >= 50:
    print('C')
elif mark >= 45 and mark < 50:
    print('RESUBMIT')
else:
    print('FAIL')
{% endhighlight %}

Now add an `or` condition to catch marks outside of the valid range:

{% highlight py %}
mark = 105

if mark < 0 or mark > 100:
    print('INVALID MARK')
elif mark >= 80:
    print('A')
elif mark >= 65:
    print('B')
elif mark >= 50:
    print('C')
elif mark >= 45 and mark < 50:
    print('RESUBMIT')
else:
    print('FAIL')
{% endhighlight %}

The `not` operator has its uses, but is awkward to apply in the working example. Instead, here is a one line example of what it does:

`print( not(False) )   # displays: True`

## Four-Square Task

In this challenge, you will apply conditional statements to a visual task. Create a new sketch and save it as "four_square". Add the following code:

{% highlight py %}
size(600,600)
noFill()
noStroke()

fill('#FF0000') # red quadrant
rect(width/2,0, width/2,height/2)

fill('#004477') # blue quadrant
rect(0,0, width/2,height/2)

fill('#6633FF') # purple quadrant
rect(0,height/2, width/2,height/2)

fill('#FF9900') # orange quadrant
rect(width/2,height/2, width/2,height/2)
{% endhighlight %}

This divides the display window into four quadrants:

<figure>
  <img src="{{ site.url }}/img/pitl03/four-square-quadrants.png" />
</figure>

Next, place a character at some location determined by an x- and y-coordinate variable:

{% highlight py %}
...
rect(width/2,height/2, width/2,height/2)

x = 400
y = 100
txt = '?'

fill('#FFFFFF')
textSize(40)
textAlign(CENTER, CENTER)
text(txt, x,y)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/four-square-qmark.png" />
</figure>

Your challenge is to write conditional statements to replace the `?` character with an `R`, `B`, `P`, or `O` to match the colour beneath it. This way, one can adjust the `x` and `y` values and the character changes accordingly:

<figure>
  <img src="{{ site.url }}/img/pitl03/four-square-four-up.png" />
  <figcaption>Listed counter-clockwise from the top-right, the (x,y) coordinates of each letter:
  R = (400,100);
  B = (38,121);
  P = (289,485);
  O = (338,485).
  </figcaption>
</figure>

To start you off, here is the code for the red condition:

{% highlight py %}
...

x = 400
y = 100
txt = '?'

if x >= width/2:
    txt = 'R'

fill('#FFFFFF')
...
{% endhighlight %}

However, if you change the `y` value to `400`, an "R" is displayed over the orange quadrant. Begin by correcting this, then address the other quadrants.

## Iteration

Consider that you wish to tile a floor. Starting in one corner, you place a single tile. Next, you place another tile alongside that, repeating the process until you have reached the opposite wall; after which point you move down a row and continue. In this scenario, the placing of an individual tile is referred to as an *iteration*. In many iterative processes, the result of a previous iteration defines the starting point of another -- in this instance, the position of each tile is advanced by the one laid before it.

Tasks like tiling can be a tedious work, though. Humans are exemplary in reasoning and creative thought, and if not sufficiently stimulated, loose interest performing such repetitive tasks. Computers, however, excel in performing tasks rapidly and accurately -- especially where numbers are involved. Interestingly, though, the term "computer" originally referred to a person who performed mathematical calculations. Much of the work performed by 'human computers' involved calculating *mathematical tables*. These tables of numbers would be compiled into printed volumes that were used to simplify and speed-up other computations. As an example, *logarithm tables* were used extensively in sciences, engineering, and navigation.

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/APN2002_Table_1%2C_1000-1500.agr.tiff/lossless-page1-789px-APN2002_Table_1%2C_1000-1500.agr.tiff.png" />
  <figcaption>
    A page from a table of common logarithms.<br />
    https://en.wikipedia.org/wiki/File:APN2002_Table_1,_1000-1500.agr.tiff
  </figcaption>
</figure>

Rather than perform tedious multiplication and division operations by hand, logarithm tables provide lists of pre-computed answers -- like a more advanced version of the multiplication tables children are required to memorise in school. The forerunner of the modern computer, the *Difference Engine*, was built in the 1820s by Charles Babbage to automate the work of human computers. By devising a machine built of cogs and other moving parts, Babbage sought to automate the task of producing mathematical tables, while also providing more accurate results. Due to funding difficulties, a full-scale version of the machine was never completed -- but its mechanical inner-workings paved the way for more complex electronic computers.

To begin exploring iteration in Processing, create a new sketch and save it as "concentric_circles". Add the following code:

{% highlight py %}
size(500,500)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)

ellipse(width/2,height/2, 30,30)
ellipse(width/2,height/2, 60,60)
ellipse(width/2,height/2, 90,90)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-manual.png" />
</figure>

I'm sure you can see where this is heading -- filling the display window requires many more `ellipse` lines. Instead of adding these manually, you will make use of Python's `while` loop to add them iteratively.

### While Loops

The `while` loop statement looks and behaves much like the `if`. However, the key difference is that the while continues to execute the lines indented beneath it, *until* the condition is no longer true.

Comment out your ellipse lines and add a basic `while` structure:

{% highlight py %}
'''
ellipse(width/2,height/2, 30,30)
ellipse(width/2,height/2, 60,60)
ellipse(width/2,height/2, 90,90)
'''

i = 0

while i < 24:
    print(i)
{% endhighlight %}

Running the sketch prints an endless lines of `0` digits to the Console.

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-crash.png" class="fullwidth" />
  <figcaption>Notice the length of the scroll track, and how the display window fails to display the background colour.</figcaption>
</figure>

This code has crashed your program by sending it into an infinitive loop. To explain, `i` is equal to zero, and therefore less-than to `24`. But, unlike an if statement, the `while` repeatedly executes the `print` line until value of `i` exceeds twenty-three -- which is never.

To increment `i` by one each time the line is printed, add one to it with each iteration of the loop:

{% highlight py %}
i = 0

while i < 24:
    print(i)
    i = i + 1
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-increment.png" class="fullwidth" />
</figure>

You may name this `i` variable whatever you wish, but it is a popular convention to represent the *iterator* value using `i`.

The final line states that `i` is equal to itself plus one. Once `i` reaches twenty-four, the program can continue with any other code that follows. To draw twenty-four circles, place a `ellipse` function within the loop:

{% highlight py %}
i = 0

while i < 24:
    print(i)
    ellipse(width/2,height/2, 30,30)
    i = i + 1
{% endhighlight %}

Run the code. It appears that you have drawn a single circle:

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-stacked-circles.png" />
</figure>

However, what you are actually is seeing twenty-four circles of the same size drawn in the same location. Adapt the ellipse, using the `i` value as a multiplier for the width and height arguments:

{% highlight py %}
i = 0

while i < 24:
    print(i)
    ellipse(width/2,height/2, 30*i,30*i)
    i = i + 1
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-concentric-circles.png" />
</figure>

It should be pointed-out that the width/height arguments (`30*i`) of the first iteration are multiplied by `0`, so the first circle is placed in the very centre of the display window, but is effectively invisible. The other twenty-three happen to be enough to fill the 500 by 500 pixel area -- but by changing the condition, you can draw as many (or as few circles) as you wish.

### Augmented Assignment Operators

You are already familiar with the `=` operator, but not its arithmetic variants. In the "concentric_circles" example, the `i` was incremented using this line of code:  
`i = i + 1`  
To simplify this statement, one can instead write:  
`i += 1`  

Other similar operators include:  
`i -= 1 ` is equivalent to&nbsp; `i = i + 1`  
`i *= 1 ` is equivalent to&nbsp; `i = i * 1`  
`i /= 1 ` is equivalent to&nbsp; `i = i / 1`

For anybody familiar with other programming languages, Python does not make use of `--` and `++` in/de-crement operators.

### Rows of Circles Task

Time for another challenge!

Using a while loop, you will recreate this arrangement:

<figure>
  <img src="{{ site.url }}/img/pitl03/rows-of-circles.png" />
</figure>

To begin, create a new sketch and save it as "rows_of_circles". Add the following code to get started:

{% highlight py %}
size(500,500)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)
ellipse(100,100, 80,80)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/rows-of-circles-start.png" />
</figure>

The following sequence of steps outlines the simplest approach to begin tackling this task:

1. create a `while` structure that loops twelve times (perhaps using a `print()` to monitor your iterator);
2. using the loop, place the circles in one long row, extending past the right-edge of the display window;
3. once the above is working, use an `if` statement within the loop to detect when the second row must begin.

It's up to you to figure out the rest. Oh -- and remember that [modulo operator (%)]({% post_url 2018-06-12-processing.py_in_ten_lessons--01-_hello_world %}#modulo-operator)? This may prove handy here.

### For Loops

When programming a loop structure, you are not limited to `while` statements. The `for` loop operates in a similar manner, and depending on the scenario, you may elect to use one over the other. Perhaps the easiest way to explain a `for` loop is to convert something you have already written.

Create a new sketch and save it as "for_loop". Add the following the code form your "concentric_circles" sketch:

{% highlight py %}
size(500,500)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)

i = 0

while i < 24:
    print(i)
    ellipse(width/2,height/2, 30*i,30*i)
    i += 1
{% endhighlight %}

Notice how the `i` variable is created to serve as an iterator. With each iteration of the loop, it is vital that you increment this to avoid entering an endless loop. The `for` loop does away with the need for iterator variables. Adapt your code:

{% highlight py %}
size(500,500)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)

for i in range(24):
    print(i)
    ellipse(width/2,height/2, 30*i,30*i)
{% endhighlight %}

Notice how the `i = 0` line has been removed, along with the line to increment it (`i += 1`). However, the result remains the same:

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-for-loop-adaption.png" class="fullwidth" />
</figure>

The `range()` function generates a list of values that the `for` then iterates over. With each iteration the active `range` value is assigned to the variable `i` -- although you may name this whatever you wish. For twenty-four iterations, the range function requires an argument of `24`; but the end value of twenty-four is never part of the generated list. The is because the first iteration begins at `0`.

The range function can handle between one and three parameters. Provide two arguments for a start and end value:

{% highlight py %}
for i in range(8,12):
    print(i)
    ellipse(width/2,height/2, 30*i,30*i)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-for-loop-2-args.png" />
</figure>

Provide three arguments for a start, end, and step-size:

{% highlight py %}
for i in range(0,24,2):
    print(i)
    ellipse(width/2,height/2, 30*i,30*i)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-for-loop-3-args.png" class="fullwidth" />
</figure>

Any iterable object may be used in combination with a `for`, meaning the `range()` function is not always necessary. This concept is explored in the upcoming lessons dealing with lists and dictionaries (or "arrays" if you are familiar with other programming languages).

### For Loops Task

In this challenge you will recreate these three patterns using `for` loops:

<figure>
  <img src="{{ site.url }}/img/pitl03/iteration-for-loops-task.png" />
  <figcaption>The <span style="color:#0099FF">pale blue</span> lines and coordinates indicate the line drawn on the first iteration of each loop.</figcaption>
</figure>

You will be referencing this image repeatedly during the task, so it may be useful to <a href="{{ site.url }}/img/pitl03/iteration-for-loop-challenges.png" download>save a copy</a> and open a preview of it alongside your Processing editor.

To begin, create a new sketch and save it as "for_loops_task". Add the following setup code:

{% highlight py %}
size(600,600)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

Here are a few clues to help you approach each pattern:

* *Top-left pattern:* you should manage this without any hints; it has twelve lines, if you must know.
* *Top-right pattern:* the line spacing increases by a multiple of `1.5` with each iteration.
* *Bottom-centre pattern*: consider using a modulo operator to establish `if` the iterator is odd or even.

## Randomness

The best computers can do is simulate randomness. Think about this for a moment: if you request a random number from a computer it will need to run some non-random set of instructions to pull a value. That said, computers are able to do to a pretty good job of this, relying on algorithms that generate *pseudorandom* numbers whose sequential appearance is statistically similar enough to a truly random sequence. This is okay for shuffling through your music collection, but best avoided for gambling and security applications.

For 'true' random numbers, computers can rely on things like key-stroke timings. For example, you may have pressed your last key 0.654 milseconds past the tick of the previous second. In the quest for true randomness, researchers have relied on everything from dice to roullette wheels, and between the mid-1920s and 50s one could even purchase special books full of random numbers. If you are really serious about plucking random numbers from the universe, there are hardware devices that rely on various quantum phenomena, like [radioactive decay](https://www.youtube.com/watch?v=SxP30euw3-0). However, for most applications, pseudorandomness will suffice.

So, what do random sequences look like? First, consider *Perlin noise*. In 1983, Ken Perlin developed an algorithm for synthesizing organic textures and forms -- like terrains, fire, smoke, and clouds. The graphs below plot random points over fixed intervals of time. The upper line represents a sequence of 'purely' random points, whereas the lower line charts values generated with Perlin noise. From this, you can visually appreciate why the 'smoother' Perlin noise is better suited for generating something like a mountain range.

<figure>
  <img src="{{ site.url }}/img/pitl03/random-random-v-noise.png" class="fullwidth" />
  <figcaption>Random (top) verse Perlin noise (bottom) sequences.</figcaption>
</figure>

Processing has functions for Perlin noise, but this lesson will focus on the `random()` and `randomSeed()` funtions.

### Random Functions

Create a new sketch and save it as "random_functions". Add the following setup code:

{% highlight py %}
size(600,600)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

The `random()` function takes one or two arguments. One arguments defines an upper limit:

{% highlight py %}
...

x = random(5)
print(x)
{% endhighlight %}

The above code will display a random floating point value between `0` and `5`. Two arguments represent an upper- and lower-limit respectively:

{% highlight py %}
x = random(5)
print(x)
x = random(5,10)
print(x)
{% endhighlight %}

The above code will display a random floating point value between `5` and `10`. If you are after a random integer, use the `int()` function to convert the floating point value:

{% highlight py %}
x = random(5)
print(x)
x = random(5,10)
print(x)
print( int(x) ) 
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/random-prints.png" class="fullwidth" />
  <figcaption>Given that the values are random, the Console output will appear different each time you run the sketch.</figcaption>
</figure>

The next step is to generate one hundred random values. Rather than displaying them as a long list in the Console area, plot them in a line in the display window:

{% highlight py %}
...

for i in range(100):
    point( random(width), height/2 )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/random-points-1d.png" />
</figure>

Now edit the loop. Change the range to `1000` and plot the `point` using both a random x- and y-coordinate:

{% highlight py %}
for i in range(1000):
    point( random(width), random(height) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl03/random-points-2d.png" />
</figure>

Each time the code is run, it results in a slightly different random pattern. Recall that ... pseudorandom ...




* Looped pattern task (progressively jittery quads)
* Read up on [break](http://py.processing.org/reference/break.html); and [continue](http://py.processing.org/reference/continue.html) statements

## Lesson 04

...

**Begin lesson 04:** fps > 12 == φ *(coming soon)*
{% comment %}
...
{% endcomment %}

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* https://www.youtube.com/watch?v=SxP30euw3-0
