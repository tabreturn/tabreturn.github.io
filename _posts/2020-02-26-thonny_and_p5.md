---
layout: post
comments: true
title: "Portable Thonny and p5"
categories: code python
---

You can combine *Thonny* and *p5* for a Processing-esque, Python 3 development environment that runs off a USB drive. There are situations where you may prefer to use p5 over Processing Python Mode / processing.py, which I discuss in this post. This Thonny-p5 combo is also handy for teaching programming in computer labs where students cannot install software, or any situation where you'd prefer to run an application in a portable fashion.

<figure>
  <img src="{{ site.url }}/img/tap/header.png" class="fullwidth" />
</figure>

This post covers how to roll-your-own portable Thonny + p5 IDE for Windows computers. The process is similar for Mac and Linux setups, although I will not cover the procedure for these platforms.

## Thonny

If you haven't heard about [Thonny](https://thonny.org/), it's a Python IDE catering to any beginners looking to dabble in Python. Thonny offers a quick and easy way to get coding in Python. In a downloadable zip file, less than 30 MB in size, you get a neat editor bundled with Python (version 3.7 at the time of writing). The Thonny user interface is stripped back, but you can display several extra panels, like a panel to list your variables, an outline panel for your functions, an object inspector, an interactive debugger, a shell, a plotter, and more. It's multi-platform (Windows, Mac, Linux), open-source, and there's a *portable* version too.

## Portable Applications

A 'portable' application is one that does not include an installer. It's a stand-alone program that you simply run directly off your USB drive, or from wherever you choose to copy it to your computer (i.e. the Desktop).

## p5

[p5](https://github.com/p5py/p5) -- not to be confused with p5.js -- is a Python package based on the core ideas of [Processing](https://processing.org/). There's also a [Python Mode](https://py.processing.org/) for Processing, which I have [written about]({{ site.baseurl }}/#processing-reverse) extensively. So, you may wonder: what's the difference between p5 and Processing's Python Mode? Python Mode 'speaks' directly to Processing; it's as close as you can get to pure Processing without writing Java, because all of your Python instructions are translated into instructions for *Processing* to carry out.

p5 is sort of Python 'clone' of Processing, that doesn't actually use Processing to generate visual output. Rather, p5 is a recreation of Processing that's running on pure Python with no Processing/Java layer under the hood. This approach has it's advantages and disadvantages.

Unlike Processing's Python mode, p5 is compatible with Python 3 and Python libraries that use C extensions (e.g. Numpy). But, because p5 is a recreation of the Processing API, it's far more limited, hasn't been in development for very long, and cannot leverage the Processing library ecosystem.

## Combining Thonny and p5

To begin, download the portable version of Thonny from [https://github.com/thonny/thonny/releases/](https://github.com/thonny/thonny/releases/).

<figure>
  <img src="{{ site.url }}/img/tap/thonny-download.png" class="fullwidth" />
  <figcaption>At the time of writing, version 3.2.6 is the latest release</figcaption>
</figure>

Extract the zip file you've downloaded, then run the *thonny.exe* file to launch Thonny:

<figure>
  <img src="{{ site.url }}/img/tap/thonny-extract.png" class="fullwidth" />
</figure>

At the first prompt, you may change the *Language setting*, but stick with the default *Initial Settings* (of *Standard*):

<figure>
  <img src="{{ site.url }}/img/tap/thonny-splash.png" style="max-width:330px" />
</figure>

Test out Thonny with a simple `print('hello world')`. You use the run button (green circle with the ▶ icon) to run your script. If you hover over any button, a tool-tip will display its associated keyboard shortcut (*F5* in this case). The first time you run a new script, Thonny will ask you to save the file. Thereafter, it auto-saves each time you run.

<figure>
  <img src="{{ site.url }}/img/tap/thonny-hello-world.png" class="fullwidth" />
</figure>

Next, you must install the p5 packages. You want these packages to install to your Thonny application folder; this way, when you copy your Thonny folder to your USB drive, it will include the p5 packages. To do this, select *Tools > Open system shell...*

<figure>
  <img src="{{ site.url }}/img/tap/p5-package.png" class="fullwidth" />
</figure>

This will display a console window. Type `pip install p5` into the console and hit enter. This will install p5 and its dependencies (glfw, triangle, vispy, numpy, Pillow, freetype-py).

<figure>
  <img src="{{ site.url }}/img/tap/p5-pip.png" class="fullwidth" />
</figure>

Close the console window once this is done. If there's some "`... Microsoft Visual C++ ...`" error, you'll need to [install the necessary build tools](https://www.scivision.dev/python-windows-visual-c-14-required/) then run the pip command again. Note that once you've successfully completed this step, you no longer require Microsoft Visual C++. Moreover, your portable Thonny + p5 will run on Windows computers without Microsoft Visual C++ package.

p5 uses VisPy, which requires GLFW. GLFW is an open-source library for OpenGL, OpenGL ES and Vulkan. Download the Windows pre-compiled binaries for GLFW from [https://www.glfw.org/download.html](https://www.glfw.org/download.html). I had issues using the 64-bit binaries, so I'm directing you to use the 32-bit version:

<figure>
  <img src="{{ site.url }}/img/tap/glfw-download.png" class="fullwidth" />
  <figcaption>The 32-bit binaries will run fine on 64-bit Windows</figcaption>
</figure>

Open the GLFW download (a zip file), then navigate to the *lib-mingw* folder; there are three files within this (*glfw3.dll*, *libglfw3.a*, and *libglfwdll.a*). Copy/move these three files into your Thonny application folder, so that they reside in the same location as your *thonny.exe* file:

<figure>
  <img src="{{ site.url }}/img/tap/glfw-copy-in.png" class="fullwidth" />
</figure>

You have to tell VisPy where to find this *glfw3.dll* file. Navigate deeper into your Thonny folder -- into a folder named *Lib*, then into *site-packages*, then into *vispy*, then into *ext*. Open the *glfw.py* file in any text/code editor:

<figure>
  <img src="{{ site.url }}/img/tap/glfw-locate.png" class="fullwidth" />
</figure>

Locate the line that reads: `# Else, we failed and exit`  
Insert the following two lines above it:
~~~
import sys
_glfw_file = sys.executable.replace('python.exe', 'glfw3.dll')
~~~

<figure>
  <img src="{{ site.url }}/img/tap/glfw-edit.png" class="fullwidth" />
  <figcaption>I'm using Atom, but you may use any code/text editor you prefer</figcaption>
</figure>

Save this edit. You can now run p5 sketches in Thonny!

<figure>
  <img src="{{ site.url }}/img/tap/done.png" class="fullwidth" />
</figure>

Check out the [p5 reference](https://p5.readthedocs.io) for more on how to use it.

## Thonny + p5 on da USB Drive

You can now copy your Thonny application folder to your USB drive. It may be quicker to zip/compress the folder first; this is also better for distributing it across the Web or a LAN.

<sup markdown="1">If you wish to, you can delete all of the *.pyc* files and *\__pycache\__* directories before you zip/compress the Thonny application folder. If you don't know how to do this, or what this even means -- don't worry about it, it's not a critical step.</sup>

For more on p5, Processing, processing.py, and Thonny, refer to the links below.

## References

* https://github.com/p5py/p5
* https://processing.org
* https://py.processing.org
* https://thonny.org
* https://www.glfw.org
