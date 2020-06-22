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

## The Info Editor Type

The The Scripting workspace---which you can switch to using the *Scripting* tab---positions the Info area at the bottom-left of the Blender window (Figure 1-2).

<figure>
  <img src="{{ site.url }}/img/bcc01/info-area.png" class="fullwidth" />
  <figcaption>Figure 1-2: The Info area highlighted in green</figcaption>
</figure>


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


## The Console

quick, useful interface for one-liners
great for inspecting the api (it has autocompletion)

type: `bpy`, then hit tab to get:

```
>>> bpy.
        app
        context
        data
        msgbus
        ops
        path
        props
        types
        utils
```


now: `bpy.data.objects` to get:
```
<bpy_collection[3], BlendDataObjects>
```

The python `list()` function creates a list object (maybe example with string?).

now: `list(bpy.data.objects)` to get:
```
[bpy.data.objects['Camera'], bpy.data.objects['Cube'], bpy.data.objects['Light']]
```

pressing up to repeats a command


## Addressing Objects (Accessing Members in a Collection)
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
