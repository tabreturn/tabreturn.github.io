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

In this lesson, you'll learn some Blender scripting basics---how to address, manipulate, and add 3D objects using code. You'll use Python commands to execute operations that you might otherwise perform with mouse clicks and keyboard shortcuts. You'll use the *Info* editor to glean what Python commands are associated with the different actions you perform using the graphic interface. I'll also introduce the Blender *Console*, a handy editor for entering line-by-line Python commands that apply immediately to your scene.

## The Info Editor

The Info editor will log any warnings or error messages. In addition, it logs the Python code for the operations you perform in Blender. In the Scripting workspace, You can locate the the Info area at the bottom-left of the Blender window (Figure 1.2.1).

<figure>
  <img src="{{ site.url }}/img/bcc01/info-area-layout.png" class="fullwidth" />
  <figcaption>Figure 1.2.1: The Info area highlighted in green</figcaption>
</figure>

Select the cube in the 3D viewport (so it's outlined orange), and press the `G` key on your keyboard. You can now move the cube to a new position. When you place the cube (using your left-mouse click), the Info editor will display something like the code highlighted in Figure 1.2.2:

<figure>
  <img src="{{ site.url }}/img/bcc01/info-area-operation.png" class="fullwidth" />
  <figcaption>Figure 1.2.2: The Info area highlighted in green</figcaption>
</figure>

For now, it's not important to know how this code works. But, you'll use it to repeat the operation using the Python Console.

## The Python Console

The Python Console is in the area just above the Info editor. You can use it to enter commands to execute them immediately. In other words, without having to write some code in the Text editor then run it. This is useful if to run any commands in a line-by-line fashion, which handy for testing code you might add to a larger script.

You'll run the line from the Info editor in the Python Console. Right-click on the code in your Info editor and select *copy*. Alternatively, you can copy my code:

~~~
bpy.ops.transform.translate(value=(1.4942, 3.95293, 0.462441), orient_type='GLOBAL', orient_matrix=((1, 0, 0), (0, 1, 0), (0, 0, 1)), orient_matrix_type='GLOBAL', mirror=True, use_proportional_edit=False, proportional_edit_falloff='SMOOTH', proportional_size=1, use_proportional_connected=False, use_proportional_projected=False)
~~~

This is one long line, not multiple. Paste this into the Python Console and hit enter (Figure 1.2.3). This will rerun the last move operation, repositioning the cube by the same increment as before.

<figure>
  <img src="{{ site.url }}/img/bcc01/console-copy-paste.png" class="fullwidth" />
  <figcaption>Figure 1.2.3: The Info area highlighted in green</figcaption>
</figure>

Most of the time, however, you'll type code into the Python Console (rather than paste it in).

> To change the font-size in the Python console, hold the `ctrl` key while scrolling the mouse-wheel. Alternatively, you can click *View* then *Zoom In* or *Zoom Out*.

To assist you, there's an auto-completion feature. Type `bpy.` into the console, then hit the `tab` key to get Blender to list the auto-complete options (Figure 1.2.4).

<figure>
  <img src="{{ site.url }}/img/bcc01/console-auto-complete.png" class="fullwidth" />
  <figcaption>Figure 1.2.4: Using the `tab` key to auto complete</figcaption>
</figure>

Now type `d`, then hit tab again. This will auto-complete to give you `bpy.data`. This module provides access to all of the data in your working file. That includes objects, textures, and scenes.

To list the objects in your scene, type in `bpy.data.objects`. Whe you hit enter, you should see:

~~~
<bpy_collection[3], BlendDataObjects>
~~~

That's a list of three objects---the camera, cube, and a light. I'll get into more detail about `bpy.data` shortly. It something you'll use extensively. In fact, Blender provides a *convenience variable*, `D`, to save you having to write out `bpy.data` in full. For example, `D.objects` is the same as writing `bpy.data.objects`.

There's another convenience variable that you should know about, `C`. This is equivalent to writing `bpy.context`. This is useful because it give you access to the active or selected object via `C.object`. For example, ensure that the cube is selected in the 3D viewport, then type:

~~~
C.object.location = (0, 0, 0)
~~~

This will reposition the cube in the centre of the scene.

## Addressing Objects (Accessing Members in a Collection)


The python `list()` function creates a list object (maybe example with string?).

now: `list(bpy.data.objects)` to get:
```
[bpy.data.objects['Camera'], bpy.data.objects['Cube'], bpy.data.objects['Light']]
```

pressing up to repeats a command


...

type: `bpy.data.objects['` then press tab to get:
```
>>> bpy.data.objects['
                      Camera']
                      Cube']
                      Light']
```
sc  
alternatively, you could use: `bpy.data.objects[1]`, but index/ordering may shift
also, there's `bpy.data.objects.get('Cube')`

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







## Importing bpy

this makes the magic happen, etc.

* `import bpy`


## Addressing an Object

...
show the an image of the outliner (noting object names)
...

```
ob = bpy.data.objects.get('c')
ob.location = (x, 0, 0)
```


## Using Another Editor

...




removing the cube?




## Templates

Templates > Exmaples
For more examples, the text menu has a templates section where some example operators can be found.









## Application Modules

https://docs.blender.org/api/blender2.8
see heading *Application Modules*

these are the nine main application modules of bpy

* **app**: contains application values that remain unchanged during runtime  
  https://docs.blender.org/api/blender2.8/bpy.app.html

* **context**: context members available depend on the area of Blender which is currently being accessed, context values are read-only  
  https://docs.blender.org/api/blender2.8/bpy.context.html

* **data**: used for all blender/python access  
  https://docs.blender.org/api/blender2.8/bpy.data.html

* **msgbus**: message bus system, can be used to receive notifications when properties of blender datablocks are changed via the data api  
  https://docs.blender.org/api/blender2.8/bpy.msgbus.html

* **ops**: provides python access to calling operators, this includes operators written in c, python or macros  
  https://docs.blender.org/api/blender2.8/bpy.ops.html

* **path**: similar scope to os.path, containing utility functions for dealing with paths in blender  
  https://docs.blender.org/api/blender2.8/bpy.path.html

* **props**: defines properties to extend blender's internal data; results of these functions used to assign properties to classes registered with blender and can't be used directly  
  https://docs.blender.org/api/blender2.8/bpy.props.html

* **types**: every data type that exists in blender  
  https://docs.blender.org/api/blender2.8/bpy.types.html

* **utils**: contains utility functions to handle custom previews; behaves as a high-level ‘cached’ previews manager
  https://docs.blender.org/api/blender2.8/bpy.utils.html


## Standalone Modules

https://docs.blender.org/api/blender2.8
see heading *Standalone Modules*

* **mathutils**: provides access to math operations  
  https://docs.blender.org/api/blender2.8/mathutils.html

* **freestyle**:  provides data types of view map components (0D and 1D elements), base classes for defining line stylization rules (predicates, functions, chaining iterators, and stroke shaders), as well as helper functions for style module writing  
  https://docs.blender.org/api/blender2.8/freestyle.html

* **bgl**: wraps opengl constants and functions, making them available from within blender python  
  https://docs.blender.org/api/blender2.8/bgl.html

* **blf**: provides access to blender text drawing functions  
  https://docs.blender.org/api/blender2.8/blf.html

* **imbuf**: provides access to blender image manipulation api  
  https://docs.blender.org/api/blender2.8/imbuf.html

* **gpu**: provides python wrappers for the gpu implementation in blender  
  https://docs.blender.org/api/blender2.8/gpu.html

* **gpu_extras**: gpu utilities  
  https://docs.blender.org/api/blender2.8/gpu_extras.html

* **aud**: audaspace (pronounced "outer space") is a high level audio library  
  https://docs.blender.org/api/blender2.8/aud.html

* **bpy_extras**: extra utilities  
  https://docs.blender.org/api/blender2.8/bpy_extras.html

* **idprop.types**: id property access  
  https://docs.blender.org/api/blender2.8/idprop.types.html

* **bmesh**: provides access to blenders bmesh data structures  
  https://docs.blender.org/api/blender2.8/bmesh.html


<p style="text-align:right" markdown="1">
<em>next lesson coming soon</em><br />
<!--
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
-->
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
