---
layout: post
comments: true
title: "Blender Creative Coding – 1.2: Blender Scripting Basics"
categories: code blender python
published: false
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

In this lesson, you'll learn some Blender scripting basics, like how to address, manipulate, and add 3D objects using code. You'll use Python commands to execute operations that you might otherwise perform with mouse clicks and keyboard shortcuts. You'll use the *Info* editor to glean what Python commands are associated with the different actions you perform using the graphic interface. I'll also introduce the Blender *Console*, a handy editor for entering line-by-line Python commands that apply immediately to your scene.

## The Info Editor

The Info editor will log any warnings or error messages. It also logs the Python code for the operations you perform in Blender. In the Scripting workspace, you can locate the Info editor at the bottom-left of the Blender window (Figure 1.2.1).

<figure>
  <img src="{{ site.url }}/img/bcc01/info-area-layout.png" class="fullwidth" />
  <figcaption>Figure 1.2.1: The Info area highlighted in green</figcaption>
</figure>

Select the cube in the 3D viewport (so it's outlined orange), and press the `G` key on your keyboard. You can now move the cube to a new position. When you place the cube (using your left-mouse click), the Info editor will display something like the code highlighted in Figure 1.2.2:

<figure>
  <img src="{{ site.url }}/img/bcc01/info-area-operation.png" class="fullwidth" />
  <figcaption>Figure 1.2.2: The code for the move operation (highlighted green)</figcaption>
</figure>

What you see in the Info editor is the Python code to perform that last move operation. In the next section, you'll use it to repeat the operation using the Python Console. For now, it's not important to know how this code works.

## The Python Console

The Python Console is located in the area just above the Info editor. You can use it to enter commands to execute them immediately---in other words, without having to write some code in the Text editor then run it. This is useful if to run commands in a line-by-line fashion, handy for testing bits of code you might add to a larger script.

You'll use the Python Console to run the move code a second time. Right-click on the code in your Info editor and select *copy*. Alternatively, you can copy my code:

```
bpy.ops.transform.translate(value=(1.4942, 3.95293, 0.462441), orient_type='GLOBAL', orient_matrix=((1, 0, 0), (0, 1, 0), (0, 0, 1)), orient_matrix_type='GLOBAL', mirror=True, use_proportional_edit=False, proportional_edit_falloff='SMOOTH', proportional_size=1, use_proportional_connected=False, use_proportional_projected=False)
```

Note that this is one long, wrapped line (not multiple lines). Paste it into the Python Console and hit enter (Figure 1.2.3). This will rerun the move operation; Blender moves the cube another 'increment', the same distance in the same direction you moved it the first time.

<figure>
  <img src="{{ site.url }}/img/bcc01/console-copy-paste.png" class="fullwidth" />
  <figcaption>Figure 1.2.3: Copy the code from the Info editor and paste it into the Python Console</figcaption>
</figure>

Most of the time, you'll type code into the Python Console (rather than paste it in). If the font is too small for you, you can change the size by holding the `ctrl` key and scrolling the mouse wheel. Alternatively, you can click *View* then *Zoom In* or *Zoom Out*.

> NOTE: You can press the up-arrow key to repeat anything you typed in the Console. Keep pressing up to cycle through every line you've entered.

The Python Console includes an auto-completion feature that assists you with typing in commands. Type `bpy` followed by a dot, then hit the `tab` key for the auto-completion to list options. Now everything that begins with `bpy.` is listed in the console (Figure 1.2.4).

<figure>
  <img src="{{ site.url }}/img/bcc01/console-auto-complete.png" class="fullwidth" />
  <figcaption>Figure 1.2.4: Using the <code>tab</code> key to auto complete</figcaption>
</figure>

Type `d`, then hit tab again; you get `bpy.data`.

The `bpy.data` module provides access to all of the data in your working file. That includes any objects, textures, and scenes. To list the objects in your scene, use `bpy.data.objects`. When you hit enter, you should see:

```
<bpy_collection[3], BlendDataObjects>
```

The `bpy_collection[3]` part indicates there are three objects---the camera, cube, and a light. I'll get into more detail about `bpy.data` shortly. It's something you'll use a lot---so often that Blender provides a *convenience variable*, `D`, to save you having to write out `bpy.data` in full each time. As an example, `D.objects` is the same as writing `bpy.data.objects`.

There's another convenience variable that you should know about, `C`. This is equivalent to writing `bpy.context`. You can use it to access an active/selected object via `C.object`. Ensure that the cube is selected in the 3D viewport, then type:

```
C.object.location = (0, 0, 0)
```

Hit enter, and this will reposition the cube in the centre of the scene.

## Python Tooltips

If you'd like to know what Python methods are associated with the different buttons in the Blender GUI, you can enable *Python Tooltips*. From the top-bar of the application, select *Edit > Preferences > Interface*; you should see a checkbox labelled *Python Tooltips* (Figure 1.2.5).

<figure>
  <img src="{{ site.url }}/img/bcc01/python-tool-tips-preferences.png" class="fullwidth" />
  <figcaption>Figure 1.2.5: Enabling Python Tooltips in the Blender preferences</figcaption>
</figure>

Once you've enabled the Python tooltips, they'll appear when you hover over a button. For example, the *Move* option (under the *Object* menu) displays a `bpy.ops.transform.translate()` tooltip in (Figure 1.2.6):

<figure>
  <img src="{{ site.url }}/img/bcc01/python-tool-tips-active.png" class="fullwidth" />
  <figcaption>Figure 1.2.6: The Python Tooltip for <i>Move</i></figcaption>
</figure>

You know from an earlier example that this a method you use for moving objects.

## Addressing Objects

You've used the Python Console to affect the object you have selected in the 3D viewport. More often, though, you'll want to address objects via Python scripts without relying on what's selected in the GUI. You can use Python to select objects by name, their position in a sequence of objects, or some other property.

The *Outliner* lists the data in your scene. You can use it to select, organise, hide, show, and delete objects. In the default scene, the Outliner lists a Camera, Cube, and Light (Figure 1.2.7):

<figure>
  <img src="{{ site.url }}/img/bcc01/addressing-objects-outliner.png" class="fullwidth" />
  <figcaption>Figure 1.2.7: The Outliner (listing a Camera, Cube, and Light)</figcaption>
</figure>

You've seen that entering `D.objects` into the Python Console displays `<bpy_collection[3], BlendDataObjects>`. Those three objects are the same three objects listed in the Outliner. Use the Python `list()` function to display each item with its name. Enter `list(D.objects)` into the Python Console and hit enter; it should display the following output:

```
[bpy.data.objects['Camera'], bpy.data.objects['Cube'], bpy.data.objects['Light']]
```

You can now address any item using its key (item name) or index (order in the sequence). In Python, index values begin at zero---so the camera is item `0`, and the cube is item `1`. You can reposition the cube in the centre of the scene using:

`D.objects['Cube'].location = (0, 0, 2)`  
*or*  
`D.objects[1].location = (0, 0, 2)`

If you add or remove objects, the ordering of may shift, so indices may not be as reliable as keys. Another advantage of using keys is the auto-completion support. For instance, you can type:  

```
D.objects['
```

Then press tab to get the list of options:

```
>>> D.objects['
               Camera']
               Cube']
               Light']
```

Now, all you do to address the Cube is add `Cu` and hit tab again.

## Attributes and Methods

If you're familiar with any object-oriented programming language, you've encountered attributes and methods before. Moreover, you've likely identified a few different attributes and methods in the code you've encountered thus far.

I won't review every attribute and method in the Blender scripting API---there are just too many for that. Rather, I'll use an example here to help you discover what's available and how you can locate the relevant API documentation.

### Attributes

Attributes are like variables that belong to objects. An object's data type determines its attributes. For example, the Cube---a three-dimensional "primitive" mesh, composed of vertices---has includes attributes for its dimensions, location, scale, and so on. The Cube data type is `bpy_types.Object`; you can confirm this using `type(D.objects['Cube'])`.

You'll explore some of the `Object` attributes using the Python Console. To begin, enter:

```
`D.objects['Cube'].`
```

Then, press tab for a long, alphabetically arranged list of attributes (and methods). See if you can spot the `location` attribute (you'll probably need to scroll up/back through the output):

```
>>> D.objects['Cube'].
                      ...
                      location
                      ...
```

You can you can find the relevant documentation for the `location` attribute here:

*[https://docs.blender.org/api/current/bpy.types.Object.html](https://docs.blender.org/api/blender2.8/bpy.types.Object.html)*

You can use your web browser's search function (`Ctrl+F` or `Cmd+F`) to quickly get to the `location` entry; there are multiple mentions of "location" on the page and it's about the fifth from the top (Figure 1.2.8).

<figure>
  <img src="{{ site.url }}/img/bcc01/attributes-and-methods-location.png" class="fullwidth" />
  <figcaption>Figure 1.2.8: The <code>location</code> entry in the online reference</figcaption>
</figure>

Take note of the URL, specifically, everything after the last slash. There's `bpy` then `types` then `Object`. Using this pattern, it's easy enough to guess what the URL for the `context` module is (*/bpy.types.Context.html*). You can also navigate the reference using the search feature and links in the left column.

As the documentation indicates, the `location` attribute takes three floating-point values (an x, y, and z coordinate, respectively). Move the Cube to a position five units above the centre of the scene:

```
D.objects['Cube'].location = (0, 0, 5)
```

Alternatively, you could use any of the following lines:

```
D.objects['Cube'].location = 0, 0, 5
D.objects['Cube'].location = Vector((0, 0, 5))
D.objects['Cube'].location.z = 5
```

Now try a `scale` attribute. Type `D.objects['Cube'].scale` then press tab. The auto-complete option are `[0]`, `[1]`, or `[2]`; those indices represent the x, y, and z-scale respectively. Enter `D.objects['Cube'].scale[0] = 2` to double the width of the cube using the x-axis (Figure 1.2.9).

<figure>
  <img src="{{ site.url }}/img/bcc01/attributes-and-methods-location-and-scale.png" class="fullwidth" />
  <figcaption>Figure 1.2.9: Manipulating the cube's location and scale attributes</figcaption>
</figure>

Now that you used a few different attributes, let's look at some methods.

### Methods



```
>>> D.objects['Cube']transform.
                              ...
                              translate()
                              ...
```





To recap, you've use the Python Console to work with the `data` and `context` modules. You know how to address objects via Python code, and manipulate

## Importing bpy

this makes the magic happen, etc.

{% highlight py %}
import bpy
{% endhighlight %}


## Using Another Editor

...




removing the cube?




## Templates

Templates > Exmaples
For more examples, the text menu has a templates section where some example operators can be found.






PNGYU images



<p style="text-align:right" markdown="1">
<em>next lesson coming soon</em><br />
<!--
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
-->
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
