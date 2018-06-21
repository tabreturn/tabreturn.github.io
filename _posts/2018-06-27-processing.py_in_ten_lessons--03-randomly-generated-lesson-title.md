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
<a href="#random"><em>random</em></a>

---
&nbsp;  
The programs you have written thus far execute line-by-line, beginning at the top of the code and ending at the bottom. You can visualise this sequential flow as a set of steps chained together in a linear arrangement. However, a programmer can redefine the order in which code is run, writing various calls and conditions to control the flow -- a concept that is referred to as *control flow* -- thereby allowing the program to skip, jump to, and repeat lines. Visualised, this looks like a series of branching and reconnecting paths.

<figure>
  <img src="{{ site.url }}/img/pitl03/intro-flowchart.svg" />
  <figcaption>Sequential (left) versus control-flowed execution (right).</figcaption>
</figure>

Control flow allows for more 'intelligent' programs. For example: if you wished to fill the display window with circles, you could write and individually place each circle using an `ellipse` function; or, using control flow statements, instruct Processing to fill the display window row-by-row and stop once it's done.

## Conditional Statements

Conditional statements are used to check conditions and provide appropriate responses. You can think of this as asking a *question*; receiving an *answer*; then perform an *action* in response the answer. For example:

*Question:* Is the ball red?

*Answer:* Yes.

*Action:* Place it in the bucket labelled "red balls".

To explore Python's various conditional statements, create a new sketch and save it as "conditional statements".

Add the following code:

{% highlight py %}
size(600,400)
background('#004477')
noFill()
stroke('#FFFFFF')
strokeWeight(3)
{% endhighlight %}

### Boolean Datatype

You are now familiar with three types of datatypes: string, integer, and float. Before moving onto conditional statements, you need an introduction to a fourth type: boolean.

A boolean can represent one of two possible states: `True` or `False`. Note that when using these values, the first letter is always uppercase, and no quotation marks are used (as this would make the value a string). Add the following code:

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

Relational operators determine the relationship between two operands. For example: is `x` greater than `1`? If you wrote this out out using the mathematical notation with which you are already familiar, you would likely use a greater-than sign. Python uses the same symbols. Add the following examples:

{% highlight py %}
...

x = 2
print( x > 1 )        # displays: True
print( x < 1 )        # displays: False
{% endhighlight %}

Notice how the result of the relational operators returns a boolean value. This will be important in the next section. Here is a list of Python's various relational operators:

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

Relational operators are particularly useful when combined with `if`, and other conditional statements.

### If Statements

If statements are one of the most essential and basic means of introducing logic to your program. Add this basic example to your code:

{% highlight py %}
...

mark = 60

if mark >= 50:
  print('PASS')
{% endhighlight %}

This hypothetical program looks at the `mark` variable and assigns a grade. In the above case the `mark >= 50` returns `True`; so the `print('PASS')` line is executed.

It is vital that you indent accordingly. You may use tabs or spaces. It does not matter how many spaces -- four and two are probably the most popular conventions -- but you must be consistent throughout your code. The `print` line is executed only upon the `if` statement evaluating as true because it is indented beneath it. For example, this code will print "PASS" and "Well done!" if the mark is over 49:

{% highlight py %}
mark = 60

if mark >= 50:
  print('PASS')
  print('Well done!')
{% endhighlight %}

-- but this would print "Well done!" every time:

{% highlight py %}
mark = 20

if mark >= 50:
  print('PASS')
print('Well done!')
{% endhighlight %}

Were you to nest an if statement within another if statement, the lines indent further

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

The above prints `Bien Hecho!`


#### Else Statements

...


## Iteration

...

## Random

...

## Lesson 04

...

**Begin lesson 04:** fps > 12 == φ *(coming soon)*
{% comment %}
...
{% endcomment %}

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* ...
