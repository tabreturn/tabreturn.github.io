---
layout: post
comments: true
title: "Blender Creative Coding – part 3 of 3"
categories: code blender python
published: false
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a>
</p>

In this, part 3 of an introduction to Blender creative coding, you'll learn some Blender scripting basics---like how to address, manipulate, and add 3D objects using code. I'll review the all-important `bpy` module, and some of the attributes and methods on offer. You use these to

Before proceeding, open Blender (using the [command line]({% post_url 2020-06-06-blender_creative_coding--part_1_of_3 %}#launching-blender-using-the-command-line)). If you have it open already, create a new Blender file using *File* > *New* > *General*. You're looking at a new scene with a cube located at an x-y-z coordinate of (0, 0, 0).



## Importing bpy

this makes the magic happen, etc.

{% highlight py %}
import bpy
{% endhighlight %}





.delete()
removing the cube?





mathutils?





executing scripts direct from command line (blender --python script_name.py)


mention python comments


## Addressing Objects


*  Copy Data Path (from properties editor)

You've used the Python Console to affect the object you have selected in the 3D viewport. More often, though, you'll want to address objects via Python scripts without relying on what's selected in the GUI. You can use Python to select objects by name, their position in a sequence of objects, or some other property.

The *Outliner* lists the data in your scene. You can use it to select, organise, hide, show, and delete objects. In the default scene, the Outliner lists a Camera, Cube, and Light (Figure 1.2.7):

<figure>
  <img src="{{ site.url }}/img/bcc01/scripting-basics-addressing-objects-outliner.png" class="fullwidth" />
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
  <img src="{{ site.url }}/img/bcc01/scripting-basics-attributes-and-methods-location.png" class="fullwidth" />
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
  <img src="{{ site.url }}/img/bcc01/scripting-basics-attributes-and-methods-location-and-scale.png" class="fullwidth" />
  <figcaption>Figure 1.2.9: Manipulating the cube's location and scale attributes</figcaption>
</figure>

Now that you used a few different attributes, let's look at some methods.

### Methods

Methods are like functions that belong to objects. You can list the `Object` methods using the Python Console. Enter:

```
`D.objects['Cube'].`
```

The methods are listed among the attributes; they're also covered in the [bpy.types.Object documentation](https://docs.blender.org/api/blender2.8/bpy.types.Object.html). You can distinguish methods by the parentheses on the end. See if you can spot the `select_set` method:

```
>>> D.objects['Cube'].
                      ...
                      select_set(
                      ...
```

This `select_set` method selects or deselects objects in the viewport. Deselect the Cube using:

```
`D.objects['Cube'].select_set(False)`
```

To select the Cube again, use an argument of `True`.

To recap, you've use the Python Console to work with the `data` and `context` modules. You know how to address objects via Python code, and manipulate


https://docs.blender.org/api/current/info_tips_and_tricks.html






### Using Another Code Editor

You might prefer to write your code in a different editor. This is simple enough. Save the script (with a .py extension), then open it in your preferred code editor. I've used [Atom](https://atom.io/) in this example, as depicted in Figure 1.2.11. I've edited the `print()` argument and saved the changes, which prompts the Blender editor to display a *resolve conflict* button (a red book icon with a question mark on its cover).

<figure>
  <img src="{{ site.url }}/img/bcc01/scripting-tools-external-editor.png" class="fullwidth" />
  <figcaption>Figure 1.2.11: The icon to resolve conflicts is highlighted in green</figcaption>
</figure>

If you click that button, there's a *Reload from disk* option; this will update Blender's Text Editor to reflect the changes you've made in your external editor (Atom?). There's also an option to *Make text internal*, which saves the Blender version of the script in the .blend file (along with the models, materials, and scene data). I prefer to store Python scripts in separate files so that I have the option of working with code using external tools.




PNGQUANT images
ADD scripts to blender code repo


## Lesson Summary

...


# Resources


If you're looking for more on the topic, you can try the following GitHub topic searches:

* https://github.com/topics/blender-python
* https://github.com/topics/blender-scripts

You can find some inspiring work at:

* https://blog.lightprocesses.com/
* https://github.com/a1studmuffin/SpaceshipGenerator
* https://github.com/manujarvinen/Blender-Python-scripts

For assistance, try:

* https://blender.stackexchange.com/questions/tagged/scripting




*End*

<p style="text-align:right" markdown="1">
[Complete list of Blender Creative Coding lessons]({{ site.baseurl }}/#blender-reverse)
</p>

## References

These Blender creative coding tutorials were put together with help from these valuable sources:

* http://web.purplefrog.com/~thoth/blender/python-cookbook/
* https://blenderscripting.blogspot.com/
* https://cgcookie.com/articles/blender-2-8-python-scripting-superpowers-for-non-programmers
* https://docs.blender.org/api/blender2.8/
* https://docs.blender.org/api/master/
* https://github.com/iklupiani/blenderscriptingwithpython
* https://github.com/njanakiev/blender-scripting
* https://github.com/zeffii/BlenderPythonRecipes/wiki
* https://medium.com/@behreajj/creative-coding-in-blender-a-primer-53e79ff71e
* https://towardsdatascience.com/@5agado
