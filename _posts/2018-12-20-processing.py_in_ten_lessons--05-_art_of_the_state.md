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

The square-brackets contain both the string and integer values. You may never have used a list before, but can likely make some sense of the syntax? More on syntax shortly, though. You may also be wondering: wouldn't it be simpler to stick with the two separate variables? Perhaps -- it really depends on the application. Lists are ordered, and ordering is significant in many situations -- for example, this sequence of rainbow colours:

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
size(500,500)
noStroke()
background('#004477')

rainbow = ['blue', 'orange', 'yellow']
print(rainbow)
{% endhighlight %}

Run the code and observe the Console output:

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-new-list.png" class="fullwidth" />
</figure>

Printing the `rainbow` variable displays all three values (along with square brackets and commas). In many instances, though, it's an individual element that you wish to retrieve. To display a given value, specify it's position in square brackets. Note, however, that Python lists begin at zero:

{% highlight py %}
...
print(rainbow[0])
{% endhighlight %}

Run the sketch to confirm that the Console displays `blue`.

<figure>
  <img src="{{ site.url }}/img/pitl05/lists-index.png" class="fullwidth" />
</figure>

The second element, `orange`, has an index of `1`.  
The last element in this list, `yellow`, has an index of `2`.

{% highlight py %}
...
print(rainbow[1])   # displays orange
print(rainbow[2])   # displays yellow
{% endhighlight %}

This may remind you of string [slice notation]({% post_url 2018-06-19-processing.py_in_ten_lessons--02-_bezier,_catmull_and_rom_walk_into_a_bar %}#slice-notation)? Well, it works the same way! For example, the last element can be accessed using `-1`, while ranges of elements can be extracted using a colon. Try adding the following code:

{% highlight py %}
...
print(rainbow[-1])  # displays yellow
print(rainbow[-2])  # displays orange
print(rainbow[0:2]) # displays ['blue', 'orange']
{% endhighlight %}

Should you specify an index beyond the bounds of the list -- in this case, `rainbow[3]` or greater -- the Console will display an `IndexError`.

### Modifying lists

To modify an existing element, assign a new value like you would any other variable but include the index. Overwrite the first value of the rainbow list, changing blue to red by adding the following code:

{% highlight py %}
...
rainbow[0] = 'red'
print(rainbow)      # ['red', 'orange', 'yellow']
{% endhighlight %}

The Processing [reference](https://py.processing.org/reference/) includes a number of Python *List Methods*. Correctly speaking, these are standard Python methods, so they will work in any Python environment. What follows below are descriptions for several list methods, along with some code to add to your working sketch.

#### `.append()`
<dd markdown="1">
Adds an element to the end of a list.

{% highlight py %}
rainbow.append('blue')
print(rainbow)      # ['red', 'orange', 'yellow', 'blue']
{% endhighlight %}
</dd>

#### `.extend()`
<dd markdown="1">
Adds one list to the end of another.

{% highlight py %}
colors = ['indigo', 'violet']
rainbow.extend(colors)
print(rainbow)
# ['red', 'orange', 'yellow', 'blue', 'indigo', 'violet']
{% endhighlight %}
</dd>

#### `.index()`
<dd markdown="1">
Returns the index for the argument provided; if there are multiple matches, it represents the first. If there is no such element, the Console reports a `ValueError`.

{% highlight py %}
yellowindex = rainbow.index('yellow')
print(yellowindex)  # 2
{% endhighlight %}
</dd>

#### `.insert()`
<dd markdown="1">
This insert method accepts two arguments: the first is the position at you wish to insert the element; the second is the value itself.

{% highlight py %}
rainbow.insert(3, 'green')
print(rainbow)
# ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
{% endhighlight %}
</dd>

#### `.pop()`
<dd markdown="1">
The argument specifies an element to be removed from the list.

{% highlight py %}
rainbow.pop(5)      # removes blue
print(rainbow)
# ['red', 'orange', 'yellow', 'green', 'blue', 'violet']
{% endhighlight %}

However, the argument is optional. Should you provide none, the last element is removed.

{% highlight py %}
rainbow.pop()       # removes violet
print(rainbow)
# ['red', 'orange', 'yellow', 'green', 'blue']
{% endhighlight %}
</dd>

#### `.remove()`
<dd markdown="1">
The argument specifies an element to be removed from the list.

{% highlight py %}
rainbow.insert(0, 'red')
print(rainbow)
# ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
rainbow.remove('violet')
print(rainbow)
# ['red', 'orange', 'yellow', 'green', 'blue', 'indigo']
{% endhighlight %}
</dd>




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
