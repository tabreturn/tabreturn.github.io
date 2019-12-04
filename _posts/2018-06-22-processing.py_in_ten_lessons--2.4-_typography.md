---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 2.4: Typography"
categories: code processing python
---

<p style="text-align:right" markdown="1">
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)<br />
<a href="{{ page.previous.url }}">&laquo; {{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }} &raquo;</a>
</p>

## Typography

With a good grasp of strings, you can move onto displaying text in the display window.

*Typography* refers to the arranging and styling of text (or, more correctly, *type*) to make it more legible, readable, and aesthetically appealing. Typographical treatment can truly make or break a design. Headings work best if they stand-out from the rest of your text; letter-spacing should be tighter than word-spacing; cursive fonts are not ideal for road signs.

### Fonts

Early computer fonts were pixel-based, which required variant glyph sets for each font-size. However, modern fonts are vector-based, which is why you can scale text as large as you like without encountering any pixelation. Fonts must be loaded into Processing, but there's a default *sans-serif* font should you not load any.

If you are unfamiliar with font classifications, *serifs* are the small lines attached to the tips of characters. By prefixing a term with "Sans", one implies an absence of whatever follows it; hence a *sans-serif* fonts have no serifs.

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-font-types.png" />
</figure>

Monospaced fonts may also be serifed, but what defines them is how each character occupies the same amount of horizontal space. To make text more legible, (variable-width) fonts include metrics to specify how far a given character should sit from any neighbours. For example, having an "i" and "m" character occupy the same size container results in some awkward spacing issues -- which many monospaced fonts attempt to resolve by adding enlarged serifs to the "i" and cramping the "m":

*monospaced*  
`mmm`  
`iii`

*variable-width*  
mmm  
iii

That said, monospace fonts are more legible in certain situations -- for instance, when it's helpful to have characters line-up in columns:

*monospaced*  
`sam | jan | amy | tim`  
`99  | 359 | 11  | 3`

*variable-width*  
sam       | jan | amy      | tim  
99&nbsp;  | 359 | 11&nbsp; | 3

This makes monospaced fonts preferable for source code, which is why the default font for the Processing editor (and every other code editor) is monospace.

### Typography Sketch

Create a new sketch and save it as "typography". Setup your sketch using the following code:

{% highlight py %}
size(500, 500)
background('#004477')
fill('#FFFFFF')
stroke('#0099FF')
strokeWeight(3)
{% endhighlight %}

Now add a string variable (note: the line must not wrap):

{% highlight py %}
razor = 'Never attribute to malice that which is adequately explained by stupidity.'
{% endhighlight %}

When you run the sketch, an empty blue display window appears. What follows below are descriptions for several typographic functions, along with some code to add to your working sketch. Feel free to experiment with the arguments to see how things respond.

### `text()`
<dd markdown="1">
Draws text to the display window, the colour of which is determined by the active `fill()`. The arguments represent the string value, x-coordinate, and y-coordinate respectively. Additional third and fourth argument can be added to specify a width and height for the text area.  
*Reference link:*  [`text()`](http://py.processing.org/reference/text.html)

{% highlight py %}
text(razor, 0,50)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-text.png" />
</figure>
</dd>

### `textSize()`
<dd markdown="1">
Sets the font size (in pixels) to be used in all subsequent `text()` functions.  
*Reference link:*  [`textSize()`](http://py.processing.org/reference/textSize.html)

{% highlight py %}
textSize(20)
text(razor, 0,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textsize.png" />
</figure>
</dd>

### `createFont()`
<dd markdown="1">
Converts a font to the format used by Processing. The two arguments represent the font name and size, respectively. For a list of fonts available on your computer, use `PFont.list()`. It's probably a good idea to place the font files (TTF or OTF) in the sketch's "data" directory, as not every computer is likely to have the font you've used installed. If you are loading fonts from the data directory, use the full file name (including the extension).  
*Reference link:*  [`createFont()`](http://py.processing.org/reference/createFont.html)

{% highlight py %}
print( PFont.list() )
timesroman = createFont('Times-Roman', 20)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-pfontlist.png" class="fullwidth" />
  <figcaption>Printing a list of available fonts using <code>PFont.list()</code></figcaption>
</figure>
</dd>

### `textFont()`
<dd markdown="1">
Sets the font for any subsequent `text()` functions.  
*Reference link:*  [`textFont()`](http://py.processing.org/reference/textFont.html)

{% highlight py %}
...
timesroman = createFont('Times-Roman', 20)
textFont(timesroman)
text(razor, 0,150)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textfont.png" />
</figure>
</dd>

### `textLeading()`
<dd markdown="1">
Sets the line-spacing (in pixels) for any subsequent `text()` functions.  
*Reference link:*  [`textLeading()`](http://py.processing.org/reference/textLeading.html)

{% highlight py %}
textLeading(10)
text(razor, 0,200, 250,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textleading.png" />
</figure>
</dd>

### `textAlign()`
<dd markdown="1">
Sets the text-alignment for any subsequent `text()` functions. Accepts the arguments `LEFT`, `CENTER`, or `RIGHT`.  
*Reference link:*  [`textAlign()`](http://py.processing.org/reference/textAlign.html)

{% highlight py %}
textAlign(RIGHT)
text(razor, 0,250, 250,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textalign.png" />
</figure>
</dd>

### `textWidth()`
<dd markdown="1">
Calculates and returns the width of any string.  
*Reference link:*  [`textWidth()`](http://py.processing.org/reference/textWidth.html)

{% highlight py %}
textAlign(LEFT)
hanlons = '- Hanlon\'s'
razor = 'razor'
text(hanlons + ' ' + razor, 0,350)
line(
  textWidth(hanlons), 0,
  textWidth(hanlons), height
)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl02/typography-textwidth.png" />
</figure>
</dd>

**Begin Lesson 2.5** [Apple Logo Task]({% post_url 2018-06-23-processing.py_in_ten_lessons--2.5-_apple_logo_task %})

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
