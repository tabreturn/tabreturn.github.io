---
layout: post
comments: true
title: "Generative SVG for Pen Plotters using Python"
categories: code python thonny
image: /img/gsfppup/plot-banner.png
description: Using py5, vpype, Blender (bpy), and other Python tools to generate plotter art.
---

I've been working extensively with [py5](http://py5.ixora.io/) for creative coding projects and investigating it seriously as a tool for learning & teaching to code in a more visual context. I recently acquired access to a pen plotter, which I'm excited to report makes a fantastic hardware addition to my growing suite of creative coding toys. And Python has to offer the pen plotter enthusiast -- from powerful SVG optimisation tools like [vpype](https://github.com/abey79/vpype) to scripted Blender 3D graphics for plotting using ([bpy](https://docs.blender.org/manual/en/latest/advanced/scripting/index.html)), and more.

I recently delivered a [CC Fest](https://ccfest.rocks/) presentation on my Python+SVG+plotter adventures and discoveries, the resources for which I've posted on GitHub. I even included some coverage of code-less generative SVG tools --

https://github.com/tabreturn/cc-fest-plotter

The recording of the session covers three tasks -- two I predicted I'd cover adequately, and a third I had to rush through. But, there are four tasks in all, with a commented file for each.



## Task 1: SVG concepts

In the first task (*01-svg_concepts.svg*), I cover some SVG essentials -- that's document structure and adding a square and line using `<rect>` and `<line>` tags (Figure 1).

<figure>
<img src="{{ site.url }}/img/gsfppup/task-1-svg.png" class="fullwidth" />
<figcaption>Figure 1: Writing SVG code</figcaption>
</figure>

I don't go into great detail about SVG, but once you get the gist of it -- specifically, how the *elements* and *attributes* work -- it's relatively straightforward to find what you need in a decent SVG reference. I recommend the Mozilla (MDN) developer docs:

* [SVG elements](https://developer.mozilla.org/docs/Web/SVG/Element#svg_elements_by_category)
* [SVG attributes](https://developer.mozilla.org/docs/Web/SVG/Attribute#svg_attributes_by_category)

An understanding of SVG code is just a platform to move into generating SVGs with py5.


## Task 2: py5 SVG

This is really the focus of the presentation -- generating SVG files with py5 code to plot art. I use the Thonny IDE for this section with a [py5mode plug-in](https://pypi.org/project/thonny-py5mode/). The *02-py5_svg.py* task steps through:

1. creating an SVG file in py5 (and by extension, Processing);
2. creating multiple SVG files for multi-colour plots using different pens;
3. combining multiple SVG files into a single, layered Inkscape file (and reviewing the attributes that control how Inkscape groups elements into layers);
4. suppressing the py5/Processing display window, favouring hot-reloading SVG files for preview.

Then, I move into vpype (Figure 2) for:

1. visualising the drawing routes the plotter must follow (where it will pick up the pen or lower it to draw);
2. optimising the drawing route so that shapes and lines plot in the most efficient order;
3. the occult add-on to remove lines occulted lines.

<figure>
<img src="{{ site.url }}/img/gsfppup/task-2-py5.png" class="fullwidth" />
<figcaption>Figure 2: Generating SVG files with py5, and optimising them with vpype</figcaption>
</figure>

There's far too much vpype awesomeness to cover in the short time available, and I point to some additional features (`linesimplify`, `linemerge`, `multipass`) and other add-ons (for pixel art and hatching).


## Task 3: Blender SVG

If you haven't heard, Blender has a Python scripting API that makes for a powerful [3D creative coding environment]({% post_url 2020-06-06-a_quick_intro_to_blender_creative_coding--part_1_of_3 %}). What's more, the Blender Freestyle add-on enables SVG export capability. This means that you can program Blender to render SVG artwork for plotting (Figure 3.1).

<figure>
<img src="{{ site.url }}/img/gsfppup/plot-blender.png" class="fullwidth" />
<figcaption>Figure 3.1: A plot generated with a Blender Python script</figcaption>
</figure>

The *03-blender_svg.py* (Figure 3.2) task steps through:

1. setting up an empty Blender scene to populate with code-generated forms that will render those as SVG outlines;
2. writing Python code to generate a cone and some metaballs;
3. running Blender 'headless' to render images straight from scripts (without opening Blender).

<figure>
<img src="{{ site.url }}/img/gsfppup/task-3-bpy.png" class="fullwidth" />
<figcaption>Figure 3.2: Running Python code to generate a Blender SVG render</figcaption>
</figure>

The [fake-bpy-module](https://pypi.org/project/fake-bpy-module-2.90/) is helpful to add code-completion to your Python editor. Once again, vpype will prove very useful for cleaning up and optimising your Blender-generated SVG files.


## Task 4: Codeless SVG

(As initially anticipated) I don't reach this far in the presentation. The *04-codeless_svg.md* file contains a set of steps (in markdown) for generating SVGs in UJI (Figure 4.1) and using Inkscape's L-System feature (Figure 4.2).

<figure>
<img src="{{ site.url }}/img/gsfppup/task-4-uji.png" class="fullwidth" />
<figcaption>Figure 4.1: UJI interface</figcaption>
</figure>

<figure>
<img src="{{ site.url }}/img/gsfppup/task-4-inkscape.png" class="fullwidth" />
<figcaption>Figure 4.2: A Hilbert curve generated in Inkscape</figcaption>
</figure>

Yeah -- not exactly 'Python', but they make for some cool plotter artwork and are great fun for play. Also, if you get creative, you might combine/augment results you generate with these tools using Python scripts ... 


## In Closing

There was a big turnout for this Virtual edition of CC Fest, with a broad range of sessions. It's worthwhile tracking down the other talk recordings and accompanying materials. There's always some Python representation at the events, and I'd encourage you to propose your own Python/Processing/etc. sessions. Reach out to me if you'd like some guidance and mentorship with this. 

I included some [links to plotter artwork/artists](https://github.com/tabreturn/cc-fest-plotter#inspiration) for inspiration. Happy plotting!

*End*


## References

* http://py5.ixora.io/
* https://doersino.github.io/uji/
* https://github.com/abey79/vsketch
* https://github.com/LoicGoulefert/occult
* https://github.com/tabreturn/thonny-py5mode
