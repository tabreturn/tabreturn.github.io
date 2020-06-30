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
  <figcaption>Figure 1.2.2: The Info area highlighted in green</figcaption>
</figure>

What you see in the Info editor is the Python code to perform that move operation. For now, it's not important to know how this code works. You'll use it to repeat the operation using the Python Console.

## The Python Console

The Python Console is in the area just above the Info editor. You can use it to enter commands to execute them immediately. In other words, without having to write some code in the Text editor then run it. This is useful if to run commands in a line-by-line fashion, which handy for testing bits of code you might add to a larger script.

You'll run the line from the Info editor in the Python Console. Right-click on the code in your Info editor and select *copy*. Alternatively, you can copy my code:

~~~
bpy.ops.transform.translate(value=(1.4942, 3.95293, 0.462441), orient_type='GLOBAL', orient_matrix=((1, 0, 0), (0, 1, 0), (0, 0, 1)), orient_matrix_type='GLOBAL', mirror=True, use_proportional_edit=False, proportional_edit_falloff='SMOOTH', proportional_size=1, use_proportional_connected=False, use_proportional_projected=False)
~~~

Note that this is one long, wrapped line (not multiple lines). Paste it into the Python Console and hit enter (Figure 1.2.3). This will rerun the move operation; Blender moves the cube another 'increment', the same distance and direction you first moved it.

<figure>
  <img src="{{ site.url }}/img/bcc01/console-copy-paste.png" class="fullwidth" />
  <figcaption>Figure 1.2.3: The Info area highlighted in green</figcaption>
</figure>

Most of the time, however, you'll type code into the Python Console (rather than paste it in).

> NOTE: To change the font-size in the Python console, hold the `ctrl` key while scrolling the mouse-wheel. Alternatively, you can click *View* then *Zoom In* or *Zoom Out*.

The Python Console includes an auto-completion feature that assists you with typing in commands. Type `bpy` followed by a dot, then hit the `tab` key for the auto-completion to list the options (Figure 1.2.4).

<figure>
  <img src="{{ site.url }}/img/bcc01/console-auto-complete.png" class="fullwidth" />
  <figcaption>Figure 1.2.4: Using the <code>tab</code> key to auto complete</figcaption>
</figure>

Now everything that begins with `bpy.` is listed in the console. Type `d`, then hit tab again; you get `bpy.data`. The `bpy.data` module provides access to all of the data in your working file. That includes any objects, textures, and scenes. To list the objects in your scene, use `bpy.data.objects`. When you hit enter, you should see:

~~~
<bpy_collection[3], BlendDataObjects>
~~~

The `bpy_collection[3]` part indicates a list of three objects---the camera, cube, and a light. I'll get into more detail about `bpy.data` shortly. It's something you'll use a lot---so often that Blender provides a *convenience variable*, `D`, to save you having to write out `bpy.data` in full each time. As an example, `D.objects` is the same as writing `bpy.data.objects`.

> NOTE: You can press the up-arrow key to repeat anything you typed in the Console. Keep pressing up to cycle through every line you've entered.

There's another convenience variable that you should know about, `C`. This is equivalent to writing `bpy.context`. You can use it to access an active/selected object via `C.object`. For example, ensure that the cube is selected in the 3D viewport, then type:

~~~
C.object.location = (0, 0, 0)
~~~

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

You know from the earlier example that this a method you use for moving objects.

## Addressing Objects

You've used the Python code to affect the object you have selected in the 3D viewport. More often, though, you'll want to address objects via Python; in other words, select objects by name, order, or some other property.

The *Outliner* lists the data in your scene. You can use it to select different objects, hide or show them, delete objects, and more. In the default scene, the Outliner lists a Camera, Cube, and Light (Figure 1.2.7):

<figure>
  <img src="{{ site.url }}/img/bcc01/addressing-objects-outliner.png" class="fullwidth" />
  <figcaption>Figure 1.2.7: The Outliner (listing a Camera, Cube, and Light)</figcaption>
</figure>

You've seen that entering `D.objects` into the Python Console displays `<bpy_collection[3], BlendDataObjects>`. Those three objects are the same three objects listed in the Outliner. Use the Python `list()` function to display each item. Enter `list(D.objects)` into the Python Console and hit enter; it should display the following output:

~~~
[bpy.data.objects['Camera'], bpy.data.objects['Cube'], bpy.data.objects['Light']]
~~~

You can now address each item using a key or index---for example, reposition the cube in the centre of the scene using `D.object['Cube'].location = (0, 0, 2)` or `D.object[1].location = (0, 0, 2)`. Note, however, that the ordering may shift as you add or remove objects, so indices aren't as reliable.

also, there's `bpy.data.objects.get('Cube')`

These objects are all children of a single *collection*, named *Collection* in this instance. You can use collections to help organise your Blender.
~~~

The python `list()` function creates a list object (maybe example with string?).

now: `list(bpy.data.objects)` to get:
```
[bpy.data.objects['Camera'], bpy.data.objects['Cube'], bpy.data.objects['Light']]
```






...

type: `bpy.data.objects['` then press tab to get:
```
>>> bpy.data.objects['
                      Camera']
                      Cube']
                      Light']
```
sc  
alternatively, you could use: `bpy.data.objects[1]`,

try: `bpy.data.objects['Cube'].` then tab for a long list of attributes and methods
you can find the corresponding documentation here: https://docs.blender.org/api/blender2.8/bpy.types.Object.html
how did i know that? `type(bpy.data.objects['Cube'])`

try: `bpy.data.objects['Cube'].sca` then press tab to get `.scale`, then tab again to get `[0 1 2]`
those are for the x/y/z-scale respectively
double the size of the x-scale: `bpy.data.objects['Cube'].scale[0] = 2`

now move the location. all of these lines will work:
```
bpy.data.objects['Cube'].location = Vector((0, 0, 5))
bpy.data.objects['Cube'].location = (0, 0, 5)
bpy.data.objects['Cube'].location = 0, 0, 5
bpy.data.objects['Cube'].location.z = 5
```
...


```
ob = bpy.data.objects.get('c')
ob.location = (x, 0, 0)
```






## Importing bpy

this makes the magic happen, etc.

* `import bpy`





## Using Another Editor

...




removing the cube?




## Templates

Templates > Exmaples
For more examples, the text menu has a templates section where some example operators can be found.










<p style="text-align:right" markdown="1">
<em>next lesson coming soon</em><br />
<!--
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
-->
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
