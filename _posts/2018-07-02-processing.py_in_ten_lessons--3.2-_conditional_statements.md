---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 3.2: Conditional Statements"
categories: code processing python
---

<p style="text-align:right" markdown="1">
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)<br />
<a href="{{ page.previous.url }}">&laquo; {{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }} &raquo;</a>
</p>

## Conditional Statements

Conditional statements are used to check conditions and provide appropriate responses. You can think of this as asking a *question*; receiving an *answer*; then performing an *action* in response to the answer. For example:

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

At this point, you are familiar with three datatypes: string, integer, and float. Before moving onto conditional statements, you require an introduction to a fourth type: *boolean*.

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

Take note of how the relational operations return a boolean value; this will be important in the next section. Here's a list of Python's various relational operators:

`>    ` greater-than  
`<    ` less-than  
`>=   ` greater-than-or-equal-to  
`<=   ` less-than-or-equal-to  
`==   ` equal-to  
`!=   ` not-equal-to

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

If statements are one of the essential means of introducing logic to your program. Add this basic example to your working sketch:

{% highlight py %}
...

mark = 60

if mark >= 50:
    print('PASS')
{% endhighlight %}

The code awards a PASS grade for any mark greater-than-or-equal-to fifty. In the above case the `mark >= 50` returns `True`; so the `print('PASS')` line is executed. It's vital that you indent the `print` line, for which you may use a tab or space characters. It does not matter how many spaces -- although, four or two is most common -- but you must be consistent throughout your code. Everything indented beneath the `if` line is executed upon the condition returning `True`. For example, the following code will print "PASS" and "Well done!" for any mark greater-than-or-equal-to fifty:

{% highlight py %}
mark = 60

if mark >= 50:
    print('PASS')
    print('Well done!')
{% endhighlight %}

But, the following code will print "Well done!" regardless of whether or not the mark exceeds fifty:

{% highlight py %}
mark = 20

if mark >= 50:
    print('PASS')
print('Well done!')
{% endhighlight %}

To nest an `if` statement within another `if` statement, increase the indentation accordingly:

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

The above displays "Bien Hecho!".

If you are evaluating a boolean value you may leave out the `==` operator. For example:

{% highlight py %}
ball_is_green = True

if ball_is_green == True:
    print('The ball is green')

# is the same as:

if ball_is_green:
    print('The ball is green')
{% endhighlight %}

The `ball_is_green` variable is equal to `True`, so typing `ball_is_green == True` is equivalent to `True == True`. Either way, the answer is `True`! Still, if you find it helps to be more explicit, you can use the first version.

#### Else-If Statements

Currently, the grading program can only award a PASS. Ideally, it should assign letter grades (A/B/C/...). This requires additional if statements. Adapt your code:

{% highlight py %}
mark = 60

if mark >= 50:
    print('C')

if mark >= 65:
    print('B')
{% endhighlight %}

As you'd expect, the console displays a "C". But there's an issue -- a mark of `70` results in a "C" and "B":

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

The problem here's that both `if` statements operate independently of one another. If the grade is awarded a "B" then there's no need to check the C condition. An `elif` (else-if) statement is required, along with some reordering of your code:

{% highlight py %}
mark = 70

if mark >= 65:
    print('B')

elif mark >= 50:
    print('C')
{% endhighlight %}

This correctly displays a "B" in the Console. Because the `if` line returns `True`, the `elif` is skipped. This is why the correct ordering of `if`/`elif` statements is vital; should the C condition to come first, every mark greater-than-or-equal-to 50 is awarded a C-grade, as the B condition is skipped.

Chain another `elif` statement to the code, adjusting the mark to test three different cases:

{% highlight py %}
mark = 77

if mark >= 80:
    print('A')
elif mark >= 65:
    print('B')
elif mark >= 50:
    print('C')
{% endhighlight %}

To visually group the connected `if`/`elif` statements, the empty line between each has been removed; this is a matter of style, but you are welcome to add as many blank lines as you see fit. You may add as many additional `elif` statements as you need.

A mark below `50` passes through all of the `if`/`elif` statements without invoking any action. To handle FAIL cases, one can employ the `else` statement.

#### Else Statements

Else statements handle any condition that does not match that specified in the `if` statement (or `if`/`elif` grouping). Add an `else` statement to your code:

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

The `else` statement need not necessarily follow an `elif`. For example:

{% highlight py %}
if mark >= 50:
    print('PASS')
else:
    print('FAIL')
{% endhighlight %}

Of course, this all depends on the logic you intend to implement.

#### Logical Operators

Thus far, each of the `if`/`elif` statements have been based on the outcome of a single relational operation; for instance:  
*is the mark greater-than-or-equal-to fifty?*

However, there are many occasions where multiple relational operations must be evaluated within a single condition; for example:  
*is the mark greater-than-or-equal-to forty-five AND less-than fifty?*

For these purposes, Python provides three logical operators:

`and   ` returns `True` if both operands are true  
`or    ` returns `True` if at least one operand is true  
`not   ` reverses the boolean (`True` becomes `False` and vice-versa)

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

The `not` operator has its uses but is awkward to apply in the working example. Instead, here's a one-line example of it in action:

`print( not False )   # displays: True`

## Four-Square Task

In this challenge, you'll apply conditional statements to a visual task. Create a new sketch and save it as "four_square". Add the following code:

{% highlight py %}
size(600,600)
noFill()
noStroke()

fill('#FF0000') # red quadrant
rect(width/2,0, width/2,height/2)

fill('#004477') # blue quadrant
rect(0,0, width/2,height/2)

fill('#6633FF') # violet quadrant
rect(0,height/2, width/2,height/2)

fill('#FF9900') # orange quadrant
rect(width/2,height/2, width/2,height/2)
{% endhighlight %}

The above code divides the display window into four quadrants:

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

Your challenge is to write conditional statements to replace the `?` character with an `R`, `B`, `P`, or `O` to match the colour beneath it. This way, one can adjust just the `x` and `y` values and the character changes accordingly:

<figure>
  <img src="{{ site.url }}/img/pitl03/four-square-four-up.png" />
  <figcaption>Listed counter-clockwise from the top-right, the (x,y) coordinates of each letter are:
  R = (400,100);
  B = (38,121);
  P = (250,485);
  O = (338,485).
  </figcaption>
</figure>

To start you off, here's the code for the red (`R`) condition:

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

**Begin Lesson 3.3:** [Iteration]({% post_url 2018-07-03-processing.py_in_ten_lessons--3.3-_iteration %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
