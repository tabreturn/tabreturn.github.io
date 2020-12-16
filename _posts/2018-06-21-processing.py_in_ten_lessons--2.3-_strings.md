---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 2.3: Strings"
categories: code processing python
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

## Strings

Before looking at Processing's functions for drawing text, an introduction to *strings* is required. This section covers some essential Python string operations.

In programming terminology, text is referred to as string data. More correctly, one could refer to a string as a series of characters. You've already encountered this data type in lesson 1, and know that strings are to be wrapped in quotation marks. One may use single- or double-quotes, but always ensure that you close-off using the same type with which you opened.

Create a new sketch and save it as "strings". Add the following code to get started:

{% highlight py %}
size(500, 500)
background('#004477')

hello = 'hello world'
print(hello)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/string-hello-world.png" class="fullwidth" />
  <figcaption>The print function writes "hello world" to the Console area</figcaption>
</figure>

Add another string variable:

```
...
whatsup = 'what's up!'
```

Because of the apostrophe in `what's`, the string is closed before the `s`, leaving a dangling third quote with no counterpart. Run the sketch and observe the error message:

<figure>
  <img src="{{ site.url }}/img/pitl02/string-quote-error.png" class="fullwidth" />
</figure>

There are a few ways to fix this. One can opt for double quotation marks:  
`whatsup = "what's up!"`  
or *escape* the apostrophe character using a backslash:  
`whatsup = 'what\'s up!`  

Amend your `whatsup` variable, and add another line using nested single- and double-quotes:

{% highlight py %}
...
whatsup = "what\'s up!"
question = 'is your name really "world"?'
print(whatsup)
print(question)
{% endhighlight %}

### Concatenation and Formatting

The `+` operator performs arithmetic addition on numbers (integers and floats). However, it becomes a concatenation operator when provided string operands. To *concatenate* means to connect together, or link, in a series or chain. Try this example:

{% highlight py %}
...

all = hello + whatsup + question
print(all)
{% endhighlight %}

This displays the following line in the Console:

`hello worldwhat's up!is your name really "world"?`

Note how concatenating joins strings together exactly as they are defined, with no additional space characters. Spaces -- along with any other punctuation you desire -- must be explicitly included. Edit your code:

{% highlight py %}
all = hello + '. ' + whatsup + ' ' + question
print(all)
{% endhighlight %}

The Console now displays:

`hello world. what's up! is your name really "world"?`

An alternative to concatenating is string formatting, for which Python provides the `%` operator. This works by substituting placeholder symbols with the relevant string values, as opposed to chaining them together in a sequence with other characters. As an example, here's the same line constructed using the `%` operator:

`all = ('%s. %s %s') % (hello, whatsup, question)`

This approach has its advantages, but for this lesson, we'll stick to the concatenate operator (`+`). For more on this string formatting, consult the [reference](http://py.processing.org/reference/string_formatting.html).

What follows below are descriptions for several string manipulation functions and methods, along with some code that you can add to your working sketch. Feel free to experiment with the arguments to see how things respond. Each demonstration acts on the `all` variable which, to restate, now represents:

`hello world. what's up! is your name really "world"?`

### Length

The `length` function returns the total number of characters of any string within the parentheses.

{% highlight py %}
print( len(all) )  # displays total number of characters (52)
{% endhighlight %}

### Slice Notation

Python slice notation (`[]`) provides a simple, yet powerful means of extracting characters from strings. Add this basic example to your code:

{% highlight py %}
print( all[0] )    # displays the first character (h)
{% endhighlight %}

The position (*index*) of the character you intend to retrieve is placed within the square brackets. Take note that the indexing system is *zero-based*, meaning that the character indices begin at `0` (and not `1`).

{% highlight py %}
print( all[1] )    # displays character at index 1 (e)
print( all[4] )    # displays character at index 4 (o)
{% endhighlight %}

A colon (`:`) can be used to specify a range of characters. It operates in a few different ways. Add a number to the right of it, and it will return all of the characters *up to but not including* the specified index:

{% highlight py %}
print( all[:4] )   # displays: hell
{% endhighlight %}

Add numbers to both the left and right of the colon, and it will return all of the characters beginning at the left index up to, but not including, the right:

{% highlight py %}
print( all[1:4] )  # displays: ell
{% endhighlight %}

A single value to the left of the colon returns everything from the given index to the end of the string:

{% highlight py %}
print( all[4:] )   # displays: o world...
{% endhighlight %}

You may also include negative values:

{% highlight py %}
'''
[:-x] returns everything from index 0
up to but not including the fourth last character
'''
print( all[:-4] )  # ...our name really "wor

'''
[-x:] returns everything from the fourth last character
to the end of the string
'''
print( all[-4:] )  # ld"?

'''
[x:-y] returns everything from index 4
up to but not including the fourth last character
'''
print( all[4:-4] ) # o world. ...eally "wor
{% endhighlight %}

There are a few other ways in which the colon operator can slice strings, but these should be sufficient for now.

You'll reencounter this notation in future lessons dealing with lists and dictionaries.

### String Methods

A Python *method* looks and behaves much like a function. With no knowledge of object-oriented programming, it's difficult to explain exactly why methods are methods. However, all that you need to understand for now is the syntactical differences between the two, i.e. how you write a method versus a function. To contrast the two approaches -- take the length function as an example:  
`len(all)`  
Were the length function a method, it would be instead be written as:  
`all.len()`  
Of course, `len()` is not a method, so this would result in an error. What is important to note, however, is how the method begins with a period (`.`) and is appended to the variable.

What follows below are descriptions for several string methods, along with some code to add to your working sketch. Each example builds on the code before it, so you'll need to work through all of them, entering each line as you progress.

#### `.upper()`
<dd markdown="1">
Returns a version of the string with all lowercase characters converted to uppercase.

{% highlight py %}
print( all.upper() )         # HELLO WO...Y "WORLD"?
{% endhighlight %}
</dd>

#### `.title()`
<dd markdown="1">
Returns a version of the string in title case (the first letter of each word in uppercase).

{% highlight py %}
print( all.title() )         # Hello Wo...y "World"?
{% endhighlight %}
</dd>

#### `.count()`
<dd markdown="1">
Returns the total of times the character/character-sequence appears in the given string.

{% highlight py %}
print( all.count('o') )      # 4
print( all.count('or') )     # 2
{% endhighlight %}
</dd>

#### `.find()`
<dd markdown="1">
Returns the index of where the term (first) appears in the string. If the substring is not found, returns `-1`.

{% highlight py %}
print( all.find('world') )   # 6
print( all.find('lemon') )   # -1
{% endhighlight %}

If the term appears multiple times, one can provide a second argument indicating the index from which the search should begin:

{% highlight py %}
print( all.find('world',7) ) # 45
{% endhighlight %}

A third argument can be provided to indicate where along the string the search terminates.
</dd>

## String Task

Time for a challenge!

Using just the `all` variable, produce a Console output that reads:

`Hello. What is your name?`

To start you off, here's a snippet of the solution:

{% highlight py %}
print( all[0:5].title() + ...
{% endhighlight %}

To successfully complete the task, you'll need to combine various string methods.

<p style="text-align:right" markdown="1">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
