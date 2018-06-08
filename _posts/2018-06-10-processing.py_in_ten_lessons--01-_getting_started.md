---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 01: Getting Started"
categories: code processing python
published: false
---

***# covered in this lesson:***  
*Intro to Processing / Colour / Drawing / Variables / Arithmetic Operators*

---
&nbsp;  
This series of lesson posts covers *Processing.py*, with the purpose of introducing non-programmers to the fundamentals of computer programming in a visual context. If you're an artist, student, designer, researcher, or just somebody who is keen on learning how to code, Processing is a great place to start.

## Intro to Processing

Processing has been around since the early 2000's and is comprised of a programming language, and an editor for writing and compiling code (IDE). The original programming language component is based on Java, but several other variants have been developed. These include a JavaScript ([p5.js](https://p5js.org/)), Ruby ([JRubyArt](https://ruby-processing.github.io/JRubyArt/)), and Python ([Processing.py](http://py.processing.org/)) version.

As somebody teaching programming fundamentals to creative students -- who will proceed to take courses in web, game, and interactive design & development -- combining Processing with Python provides an ideal learning tool. What's more, Processing costs nothing, is open source; and runs on Windows, Mac, and Linux.

### Setup Processing

Before you can write any code, you will need to download Processing. Head-over to the Processing download page, and download the relevant version (Windows/Mac/Linux):

[processing.org/download](https://processing.org/download/)

Run the application. Note that the default mode is "Java". To follow along, you'll need to switch to Python mode.

Click on the down arrow next to "Java" and select **Add Mode...** . Then, from the *Contribution Manager* window, select **Python Mode for Processing 3**. Finally, click **Install**.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/setup-add-python-mode.png" class="fullwidth" />
  <figcaption>Adding/installing Python mode.</figcaption>
</figure>

Once this is complete, you can switch to Python mode.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/setup-switch-to-python-mode.png" class="fullwidth" />
  <figcaption>Switching to Python mode.</figcaption>
</figure>

You are now ready to write your first line of code! If you would like to see examples of some code in action, perhaps take a look through the examples (**File > Examples...**). If you are ready to begin writing your own code, move onto the next section.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/setup-examples.png" class="fullwidth" />
  <figcaption>Use the &#9654; button to run any code.</figcaption>
</figure>

### Hello World

Processing refers to programs as "sketches". Given the visual and artistic nature of what you are likely to produce, it's a fitting term. Create a new sketch by selecting **File > New**, or using the associated keyboard shortcut (which is listed alongside the File menu entry).

#### Processing Functions

Type in the following lines of code:

{% highlight py %}
size(500, 500)
print('hello world')
{% endhighlight %}

Using **File > Save as...** save the sketch (to wherever it is you wish to store it) and name it "hello_world". You will notice that each sketch is saved as a new folder. Within this folder are two files: *hello_world.pyde* and *sketch.properties*. You may also add other assets to your sketch folder, such as images and fonts -- but more on that later.

Hit the &#9654; button to execute the code. Better yet, use the associated keyboard shortcut: **Ctrl+R** for Windows; or **&#8984;+R** for Mac.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/hello-world-run.png" class="fullwidth" />
  <figcaption>A grey 500×500 pixels display window (left) appears when you run your sketch.</figcaption>
</figure>

You have used two Processing *functions* here -- `size()` and `print()`. Functions consist of a function name followed by an opening and closing paren (or round bracket, if you prefer). Within these brackets, you supply *arguments*. For example, the `size()` function takes two *arguments*: the first represents the width of your sketch; the second, the height. In this case, the display window is 500 pixels wide by 500 pixels high.

The `print()` function writes to the console area -- the black rectangle at the bottom of the editor. It takes a single argument; in this case, the phrase `'hello world'`. Because this is text -- or more correctly speaking, *string* data -- it must be wrapped in quotation marks. You may use single- or double-quotes, but be sure to close-off using the same type you have opened with.

What separates Processing.py from Python are the functions. The `size()` function is Processing-specific. In other words, it will not work outside of the Processing environment. The `print()` function, on the other hand, is a built-in standard of the Python programming language, and will therefore work in any Processing.py or Python application.

#### Processing Reference

For a complete list of Processing.py functions and the arguments they require, you can refer to the online reference:

[py.processing.org/reference](http://py.processing.org/reference/)

*Note that the reference also includes many standard Python language structures, keywords, and functions.*

### Comments

Comments can be used to leave notes for yourself or anybody else editing your code. These come in two types: single- and multi-line. Use a `#` character for single-line comments, and `'''` or `"""` for multi-line comments. Add some comments to your current sketch to see how they work:

{% highlight py %}
# dimension of the display window in units of pixels
size(500, 500)

print('hello world') # writes hello world to the console area

'''
This is a mult-line comment.
Any code between the opening and closing set of triple-quotes is ignored.
'''
{% endhighlight %}

While working through these lessons, add your own comments to remind you of what you have learnt.

### Whitespace

Python, and by extension Processing.py, is whitespace-sensitive. As an example, add a few space characters at the beginning of the `size()` line; then run your sketch.

<figure>
  <img src="{{ site.url }}/img/pitl01gs/whitespace-error.png" class="fullwidth" />
  <figcaption>Console displaying errors.</figcaption>
</figure>

Because Python relies on indentation to distinguish blocks of code, the indented line breaks the program. Processing displays an error in the console, as well as highlights the line on which the problem was encountered.

You will understand more about when and where to use indentation as you progress through these lessons. You may even be familiar with some language that uses braces (`{` and `}`) to define blocks. For now, though, be aware that you need to pay careful attention to any space and tab characters that affect the indentation of your code.

### Errors

Whitespace errors are not the only type logged in the console. You are likely to miss-out the odd paren, comma, or quote mark, especially when starting out. Remove the closing bracket/paren on your size function:

{% highlight py %}
# dimension of the display window in units of pixels
size(500, 500

...
{% endhighlight %}

Now run the code and observe the console output:

<figure>
  <img src="{{ site.url }}/img/pitl01gs/error-unclosed-paren.png" class="fullwidth" />
  <figcaption>"Maybe there's an unclosed paren or quote mark somewhere before this line?"</figcaption>
</figure>

Note the white-on-red suggestion. Pretty smart, huh? To be honest, the console is not always so clear or correct, but it usually provides a clue as to where to start looking for bugs.

## Colour

...

## Drawing

...

## Variables

...


## Arithmetic Operators

...





## Further Reading

This post covered two common formulae for converting colour to greyscale. However, there are more, and if you're interested in reading further, I highly recommend [Tanner Helland's blog post]( http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/) on the topic.

## References

* http://py.processing.org/reference/
* ...
