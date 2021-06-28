---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 5.4: Dictionaries"
categories: code processing python
image: /img/pitl03/iteration-for-loop-adaption.png
description: A series of tutorials on Processing.py, introducing non-programmers to the fundamentals of computer programming in a visual context.
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

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

You now understand the syntactical differences between lists and dictionaries. Dictionaries also possess their own set of methods. Many list methods -- such as `append()`, `extend()`, `index()`, `insert()`, and `remove()` -- will not work on dictionaries. There are few important dictionary methods you'll need in this lesson, which are covered below. For more methods, refer to any decent Python reference.

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

This method is especially useful for iterating dictionaries (as you'll soon see). Be warned, though: it may return values in a seemingly arbitrary order, i.e. not always the order in which they appeared when defining the dictionary. This has to do with how Python stores dictionaries (a topic beyond the scope of these tutorials).

Round brackets denote a *tuple*. Tuple can be pronounced as "too-ple" or "tuh-ple" depending on who you want to annoy. Tuples are not covered in this lesson, but for now, consider them as interchangeable with lists. For example:

{% highlight py %}
items = studentdict.items()
print( items[0] )             # ('name', 'Sam')
print( items[0][0] )          # name
{% endhighlight %}

Note how tuple elements are also numerically indexed, and how list syntax is used to retrieve values. In a nutshell, the key difference is that tuples, once defined, cannot be modified. For more information, refer to the Processing [reference](https://py.processing.org/reference/tuple.html).
</dd>

### Modifying Dictionaries

Dictionaries are dynamic structures. You can add and modify key-value pairs whenever you please. To change an existing value, simply reassign it as you'd a list element. Of course, you'll use a key name as opposed to a numeric index.

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

As with lists, there are many scenarios where you'll want to loop through dictionaries. Considering that a dictionary can hold thousands or even millions of key-value pairs, this is a powerful feature. Because of the key-value system, though, iterating dictionaries is a little different than lists. You can iterate a dictionary's keys, iterate its values, or iterate its key-value pairs. This is where the `keys()`, `values()`, and `items()` methods prove particularly handy. We'll explore an example of each approach. First, let's print `studentdict` to see what we are dealing with:

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

The `values()` method can be used similarly to the `keys()`. Of course, this returns just the item values.

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

In this task, you'll combine dictionaries, a list, and a loop. The result is a chart illustrating different [types of coffee](https://realcoffee.co.nz/wp-content/uploads/2016/05/Fotolia_109706822_Subscription_Monthly_M.jpg) -- that's, the amount of espresso, hot-water, steamed-milk, and foamed-milk that comprise each type.

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

At this point, the `coffees` variable is nothing more than a list of names. Replace this with the list of dictionaries below. It's easiest to copy and paste over the existing `coffees` list.

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

This code can easily be adapted to include as many coffee types as you desire, each with its own mug. However, the process of having to write and format the `coffees` data using Python syntax leaves room for improvement. In the next section, you'll look at how Python can read in data from external files.

<p style="text-align:right" markdown="1">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
