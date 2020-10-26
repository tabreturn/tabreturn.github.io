---
layout: post
comments: true
title: "Blender Creative Coding – part 4"
categories: code blender python
published: false
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a><br />
</p>





https://docs.blender.org/api/current/info_tips_and_tricks.html






### Using Another Code Editor

You might prefer to write your code in a different editor. This is simple enough. Save the script (with a .py extension), then open it in your preferred code editor. I've used [Atom](https://atom.io/) in this example, as depicted in Figure 1.2.11. I've edited the `print()` argument and saved the changes, which prompts the Blender editor to display a *resolve conflict* button (a red book icon with a question mark on its cover).

<figure>
  <img src="{{ site.url }}/img/bcc01/scripting-tools-external-editor.png" class="fullwidth" />
  <figcaption>Figure 1.2.11: The icon to resolve conflicts is highlighted in green</figcaption>
</figure>

If you click that button, there's a *Reload from disk* option; this will update Blender's Text Editor to reflect the changes you've made in your external editor (Atom?). There's also an option to *Make text internal*, which saves the Blender version of the script in the .blend file (along with the models, materials, and scene data). I prefer to store Python scripts in separate files so that I have the option of working with code using external tools.


## Lesson 1 Summary

...
You can write your code in Blender or using an external code editor.
...




https://www.youtube.com/watch?v=XqX5wh4YeRw

PNGQUANT images
ADD scripts to blender code repo

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





<p style="text-align:right" markdown="1">
[Complete list of Blender Creative Coding lessons]({{ site.baseurl }}/#blender-reverse)
</p>
