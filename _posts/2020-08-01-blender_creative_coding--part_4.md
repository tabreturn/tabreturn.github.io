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






PNGQUANT images
ADD scripts to blender code repo

*End*

<p style="text-align:right" markdown="1">
[Complete list of Blender Creative Coding lessons]({{ site.baseurl }}/#blender-reverse)
</p>
