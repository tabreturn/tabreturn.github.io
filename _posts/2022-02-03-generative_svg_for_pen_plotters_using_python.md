---
layout: post
comments: true
title: "Generative SVG for Pen Plotters using Python"
categories: code python svg thonny
image: /img/gsfppup/plot-banner.png
description: Using py5, vpype, Blender (bpy), and other Python tools to generate plotter art.
---

I recently acquired access to a pen plotter, which I'm excited to report makes a fantastic hardware addition to my growing suite of creative coding toys. Python has plenty to offer the plotter enthusiast -- from powerful SVG optimisation tools like [vpype](https://github.com/abey79/vpype) to [Blender scripting](https://docs.blender.org/manual/en/latest/advanced/scripting/index.html) for SVG renders, and more.

<figure>
<img src="{{ site.url }}/img/gsfppup/plot-banner.png" class="fullwidth" />
</figure>

I've been working extensively with [py5](http://py5.ixora.io/) for generative art projects and investigating it seriously as a tool for learning & teaching to code in a more visual context. I recently delivered a [CC Fest](https://ccfest.rocks/) presentation on my SVG+plotter adventures and discoveries using py5, the resources for which I've posted on GitHub --

[https://github.com/tabreturn/cc-fest-plotter](https://github.com/tabreturn/cc-fest-plotter)

Additionally, the presentation delves into some Blender techniques and even a few code-less generative SVG tools. The recording of the session covers three tasks -- two I predicted I'd cover adequately and a third task I had to rush through. But, there are links to four tasks in all (a commented file for each).


## Task 1: SVG concepts

In the first task ([01-svg_concepts.svg](https://github.com/tabreturn/cc-fest-plotter/blob/main/tasks/01-svg_concepts.svg?short_path=b06e63b)), I cover some SVG essentials -- that is, document structure and drawing a square and line using `<rect>` and `<line>` tags (Figure 1).

<figure>
<img src="{{ site.url }}/img/gsfppup/task-1-svg.png" class="fullwidth" />
<figcaption>Figure 1: Understanding SVG code</figcaption>
</figure>

I don't go into great detail about SVG, but once you get the gist of it -- specifically, how the *elements* and *attributes* work -- it's relatively straightforward to find what you need using a decent SVG reference. I recommend the Mozilla developer docs:

* MDN's [SVG element reference](https://developer.mozilla.org/docs/Web/SVG/Element#svg_elements_by_category)
* MDN's [SVG attribute reference](https://developer.mozilla.org/docs/Web/SVG/Attribute#svg_attributes_by_category)

This cursory introduction to SVG markup leads into generating SVGs with py5.


## Task 2: py5 SVG

This is really the focus of the presentation -- generating SVG files with py5 code for plotting art. I use the Thonny IDE for this section with the [py5mode plug-in](https://pypi.org/project/thonny-py5mode/). The [02-py5_svg.py](https://github.com/tabreturn/cc-fest-plotter/blob/main/tasks/02-py5_svg.py) file steps through:

1. creating an SVG file in py5 (and by extension, Processing);
2. splitting different sections of a sketch into separate SVG files for multi-colour plots using different pens;
3. combining those separate SVG files into a single, layered Inkscape file (and reviewing the attributes that control how Inkscape groups elements into layers);
4. suppressing the py5/Processing display window, favouring hot-reloading of SVG files (in an image viewer) for preview purposes.

Then, I move into vpype (Figure 2) for:

5. visualising the drawing routes the plotter must follow (where it will pick up the pen or lower it to draw);
6. optimising the drawing route so that shapes and lines plot in the most efficient order;
7. the *occult* plug-in for vpype to remove occulted lines (think: the lowermost shapes won't show through the ones overlapping them).

<figure>
<img src="{{ site.url }}/img/gsfppup/task-2-py5.png" class="fullwidth" />
<figcaption>Figure 2: Generating SVG files with py5 and optimising them with vpype. Note the effect of occult on the squares with blue outlines (compared to the ones on the white background).</figcaption>
</figure>

There's far too much vpype awesomeness to cover in such a short time, and I point to some additional features ([`linesimplify`](https://vpype.readthedocs.io/en/stable/reference.html#linesimplify), [`linemerge`](https://vpype.readthedocs.io/en/stable/reference.html#linemerge), [`multipass`](https://vpype.readthedocs.io/en/stable/reference.html#multipass)) and other plug-in (for [pixel art](https://github.com/abey79/vpype-pixelart) and [hatching](https://github.com/plottertools/hatched)).


## Task 3: Blender SVG

If you haven't heard, Blender has a Python scripting API that makes for a powerful [3D creative coding environment]({% post_url 2020-06-06-a_quick_intro_to_blender_creative_coding--part_1_of_3 %}). What's more, the Blender *Freestyle* add-on enables SVG rendering/export capability. This means that you can program Blender to render SVG artwork for plotting (Figure 3.1). There are many line options to play with -- silhouette-style, wireframe-style, and so on.

<figure>
<img src="{{ site.url }}/img/gsfppup/plot-blender.png" class="fullwidth" />
<figcaption>Figure 3.1: A plot generated with a Blender Python script</figcaption>
</figure>

The [03-blender_svg.py](https://github.com/tabreturn/cc-fest-plotter/blob/main/tasks/03-blender_svg.py) file task steps through:

1. setting up an empty Blender scene to populate with code-generated 3D forms that will render as SVG outlines;
2. writing Python code to generate a cone and some metaballs;
3. running Blender 'headless' to render images straight from scripts (without opening Blender).

<figure>
<img src="{{ site.url }}/img/gsfppup/task-3-bpy.png" class="fullwidth" />
<figcaption>Figure 3.2: Running Python code to generate a Blender SVG render</figcaption>
</figure>

The [fake-bpy-module](https://pypi.org/project/fake-bpy-module-2.90/) is helpful to add Blender (bpy module) code-completion to your Python editor.

<blockquote markdown="1">
NOTE: you could also use Blender's built-in code editor. I often prefer to write my code in a dedicated Python editor.
</blockquote>

Once again, vpype will prove very useful for cleaning up and optimising your Blender-generated SVG files. 


## Task 4: Codeless SVG

(As initially anticipated) I don't reach this far in my presentation session. The [04-codeless_svg.md](https://github.com/tabreturn/cc-fest-plotter/blob/main/tasks/04-codeless_svg.md?plain=1) file contains a set of steps (in markdown) for generating SVGs in the UJI web-app (Figure 4.1) and using Inkscape's L-System feature (Figure 4.2).

<figure>
<img src="{{ site.url }}/img/gsfppup/task-4-uji.png" class="fullwidth" />
<figcaption>Figure 4.1: UJI interface</figcaption>
</figure>

<figure>
<img src="{{ site.url }}/img/gsfppup/task-4-inkscape.png" class="fullwidth" />
<figcaption>Figure 4.2: L-system rules to generate a Hilbert curve in Inkscape</figcaption>
</figure>

Yeah, I know -- not exactly 'Python', but these make for some cool plotter artwork and are great fun for playing around. Also, if you get creative, you might combine/augment the results you generate with these tools using Python scripts ...


## In Closing

There was a big turnout for this Virtual edition of CC Fest, with a broad variety of sessions for attendees to join. It's worthwhile tracking down the other talk recordings and accompanying materials. There's always some Python representation at the events, and I'd encourage you to propose your own Python/Processing/etc. sessions. Reach out to me if you'd like some guidance and mentorship with this.

If you're new to plotter art, I included some [links to some inspiring artwork/artists](https://github.com/tabreturn/cc-fest-plotter#inspiration).

*End*


## References

* http://py5.ixora.io/
* https://doersino.github.io/uji/
* https://github.com/abey79/vsketch
* https://github.com/LoicGoulefert/occult
* https://github.com/tabreturn/thonny-py5mode
