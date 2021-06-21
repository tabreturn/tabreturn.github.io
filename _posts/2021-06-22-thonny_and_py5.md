---
layout: post
comments: true
title: "Portable Thonny and py5"
categories: code python
published: false
---

I very recently stumbled upon [py5](http://py5.ixora.io/), a Python version of Processing for Python 3.8+ that uses Processing's core libraries under the hood (thanks to some [JPype](http://www.jpype.org) magic).

Previously, I wrote a post on [combining the Thonny editor and p5]({% post_url 2020-02-26-thonny_and_p5 %}). *p5* is a sort of Python 'clone' of Processing, that doesn't actually use Processing to generate visual output. But *py5* is quite different. As its creator, Jim Schmitz, [explains](http://py5.ixora.io/about/) --

*"Processing.py is the spiritual ancestor to and inspiration for py5. Py5 is similar to Processing.py in that both use Python syntax but their implementations are very different. Processing.py and py5 do not share any code but py5 benefits from code in the Processing core libraries written to accommodate Processing.py."*

I've been involved with [Processing.py](https://py.processing.org/) for some time, and I got excited when I read this. Promptly, I set out to see if I could combine py5 with [Thonny](https://thonny.org/), a fantastic Python IDE for beginners. I'm delighted with the result (Figure 1).

<figure>
  <img src="{{ site.url }}/img/tapy5/banner.png" class="fullwidth" />
  <figcaption>Figure 1: A faux <a href="https://py.processing.org/">Processing.py/Python Mode</a> IDE set up with Thonny and py5</figcaption>
</figure>

I prefer to run applications in a 'portable' fashion where I can. This is useful for different reasons, including that it's easier to distribute something that beginners can simply click and run. In other words, if you're on a system like mine (Debian-based Linux, in this case), I can zip up the files and send the archive to you; all you need to do is extract and run it! No installation process required.

This post covers how to roll your own portable Thonny + py5 IDE on Linux (Mint, specifically, in my case). Ubuntu and other Debian distros should work with these instructions. The process is similar for Mac and Linux setups, although I will not cover the procedure for these platforms.

I'll also provide a quick-start guide to writing py5 code with Thonny.


## Installing py5 and Thonny

Note that you're creating a portable IDE. There are other ways to [install py5](http://py5.ixora.io/install/) -- with Python, Anaconda, and for Jupyter notebooks. The aim here's a self-contained bundle that runs even if the user's computer is missing Python, Java, or any other packages that py5 or Thonny ordinarily require.

To begin, open your terminal. At the time of writing, Thonny (at version [3.3.10](https://github.com/thonny/thonny/releases/tag/v3.3.10)) comes bundled with Python 3.7.9. However, py5 requires Python 3.8 or higher. But, there are "alt-variants" of Thonny that use Python 3.9 instead of 3.7, which you'll use instead.

**Step 1** -- Start by installing a few Python 3.9 packages. This is necessary to build py5; you can remove them later.
```
sudo apt-get install python3.9 python3.9-dev python3.9-venv
```

**Step 2** -- Now, set up a new folder/directory named *thonny_py5* for your Thonny + py5 install. Recall that this is a portable setup -- you can move it anywhere you like later. I've decided to create this folder on my Desktop:
```
cd ~/Desktop
mkdir thonny_py5
cd thonny_py5
```

You've now changed to the *thonny_py5* directory; your terminal prompt should reflect this. All of the commands that follow run relative to this location.

**Step 3** -- Download and extract the alt-variant of Thonny (that includes Python 3.9):
```
wget https://github.com/thonny/thonny/releases/download/v3.3.7/thonny-3.3.7-x86_64-alt.tar.gz
tar -xzvf thonny-3.3.7-x86_64-alt.tar.gz
rm thonny-3.3.7-x86_64-alt.tar.gz
```

**Step 4** -- Set up a virtual environment to install the py5 packages; to install those packages in Thonny's built-in Python location, there's a symlink. Once you've installed the necessary package(s), the commands delete the virtual environment:
```
python3.9 -m venv tempenv
cd tempenv/lib/python3.9
rm -r site-packages
ln -s ../../../thonny/lib/python3.9/site-packages site-packages
cd ../../../
source tempenv/bin/activate
pip install py5==0.4a2
deactivate
rm -r tempenv
```

Note that this has explicitly installed py5 version 0.4a2. At the time of writing, this the latest version. This is to ensure that these instructions work a year from now. You can omit the `==0.4a2` to install the most recent version, which you'd ideally use ... but there's no guarantee it'll be compatible with these instructions.

**Step 5** -- py5 requires Java 11 (for running Processing core libraries). OpenJDK 11 works fine, so let's use that:
```
wget https://download.java.net/openjdk/jdk11/ri/openjdk-11+28_linux-x64_bin.tar.gz
tar -xzvf openjdk-11+28_linux-x64_bin.tar.gz
rm openjdk-11+28_linux-x64_bin.tar.gz
```

This extracts OpenJDK in your *thonny_py5* directory, alongside thonny:
```
thonny_py5
└─ jdk-11
└─ thonny
```

Enter this command that sets the Java environmental variable upon starting Thonny, so that your computer knows where to find Java when it runs your py5 programs/sketches:
```
sed -i '2iexport JAVA_HOME=$PWD/../../jdk-11/' ./thonny/bin/thonny
```

Technically speaking, step 5 isn't required if you have an existing Java runtime installed. But, remember, we're aiming for a portable IDE.

**Step 6** -- Finally, create a *run* file in the root of your *thonny_py5* directory to start Thonny:
```
printf '#!/bin/bash\ncd thonny/bin;./thonny' > run
chmod +x run
```

**Cleaning up** -- If you'd like, you can remove the Python 3.9 packages from your system:
```
sudo apt-get remove --purge python3.9 python3.9-dev python3.9-venv
sudo apt-get autoremove --purge
```

You can now move *thonny_py5* folder anywhere you like on your system, copy it to other Linux computers, and so on. It's a self-contained app with Python, the py5 libraries, and Java.

You're ready to test out Thonny and py5.


## Running Thonny

Double-click your *run* file to start Thonny. If your system gives you the option to Run in Terminal / Display / Cancel / Run, select **Run**. It's also handy to add this as an app to your 'start' menu.

When you run Thonny for the first time, there's a simple configuration step (Figure 2), after which Thonny will open, and you're ready to write code (Figure 3).

<figure>
  <img src="{{ site.url }}/img/tapy5/configuration-start.png" style="border:1px solid black" />
  <figcaption>Figure 2: When starting Thonny for the first time, you must complete this simple configuration step. Select <b>Standard</b> for the Initial settings option.</figcaption>
</figure>

<figure>
  <img src="{{ site.url }}/img/tapy5/standard-editor.png" class="fullwidth" />
  <figcaption>Figure 3: Thonny's standard appearance</figcaption>
</figure>

If you've already installed another Thonny instance on your machine, it'll skip the configuration step and load your default preferences.

### Customising Thonny's Appearance

To make everything more Processing-esque, you can change the Thonny theme by selecting **Tools > Options...**, then select the **Theme & Font** tab where you can change the *UI theme* and *Syntax theme* as you please (Figure 4).

<figure>
  <img src="{{ site.url }}/img/tapy5/change-theme.png" class="fullwidth" />
  <figcaption>Figure 4: Changing the Thonny theme</figcaption>
</figure>

Note how, in Figure 4, the menu bar is still grey. You'll have to restart Thonny to apply the theme fully.

Now let's write some code!


## Writing py5 Sketches

py5 has [three modes](http://py5.ixora.io/tutorials/py5-modes/) -- *module*, *class*, and *imported* mode. I cover two of those here: module and imported. To run files in Thonny, you can use the Ctrl + R, F5, or the run icon (green play button above the code editor).

### Py5 Module Mode

In *module mode*, you'll access py5 functionality through module-level functions and fields. For those coming from a Processing background, that means there's a `py5.` in front of every method and attribute. Here's a simple example:

```python
import py5

def settings():
    py5.size(500, 500)

def setup():
    py5.fill(255, 0, 0)
    py5.no_stroke()

def draw():
    py5.circle(py5.mouse_x, py5.mouse_y, 10)
    print(py5.frame_count)

py5.run_sketch()
```

Note the differences compared with Processing.py. First, you must add the `import py5` line. Functions like `noStroke()` are written as `no_stroke()` in py5, and `frameCount` becomes `frame_count`. This converting [camelCase](https://en.wikipedia.org/wiki/Camel_case) to [snake_case](https://en.wikipedia.org/wiki/Snake_case) is consistent throughout py5. Also, you must include a `py5.run_sketch()` line to actualize your sketch. Of course, `print()` is a standard Python function that requires no `py5` prefix.

You can refer to the py5 reference for a complete list of what's available in py5:  
[http://py5.ixora.io/reference/](http://py5.ixora.io/reference/)

It's also handy to note that Thonny includes code completion, so you can hit the Tab key or Ctrl + Space to select what you need from py5 (Figure 5).

<figure>
  <img src="{{ site.url }}/img/tapy5/code-completion.png" class="fullwidth" />
  <figcaption>Figure 5: Thonny's code completion, activate using Tab or Ctrl + Space</figcaption>
</figure>

Run the sketch to view the result (Figure 6).

<figure>
  <img src="{{ site.url }}/img/tapy5/module-mode.png" class="fullwidth" />
  <figcaption>Figure 5: Running a basic module mode sketch</figcaption>
</figure>

Thonny is full of [useful features](https://thonny.org/), many in the form of panels that you can activate from the **View** menu. I won't cover those here.

That concludes this brief introduction to *module mode*. The *imported mode* is even closer to Processing, which I cover next.

### Py5 Imported Mode (for a more authentic Processing experience)

*"Imported Mode was originally designed to be used by beginner programmers. It is analogous to the Processing code users write in the Processing Development Editor (PDE)."  
-- from the official [py5 documentation](http://py5.ixora.io/tutorials/py5-modes#imported-mode)*

To get this working nicely, you'll need to make a small modification to Thonny. Within your *thonny_py5* folder, you'll need to locate a file named *running.py*:
```
thonny_py5/thonny/lib/python3.9/site-packages/thonny/running.py
```

Open this file with a code/text editor and search for the following line:  
`cmd_parts = ["%" + command_name, rel_filename] + args`

Insert the following new code:
```python
        ...
        cmd_parts = ["%" + command_name, rel_filename] + args

        # insert this new code ▼▼▼
        if args[0] == 'imported_mode':
            import site
            rs_file = '/py5_tools/tools/run_sketch.py'
            rs_path = str(site.getsitepackages()[0]) + rs_file
            cmd_parts = ["%" + command_name, rs_path, rel_filename]
```

Save your changes. This will tell Thonny to use a special py5 utility script to run your code. But, what if you don't want to use it? Well, this utility script only fires *if* you add `imported_mode` to your Thonny *Program arguments*. To do this, select **View > Program arguments**, then enter `imported_mode` into the field that appears (Figure 6).

<figure>
  <img src="{{ site.url }}/img/tapy5/program-arguments.png" class="fullwidth" />
  <figcaption>Figure 6: Setting the Program arguments to imported_mode</figcaption>
</figure>

Now you can write your code without any `py5` prefixes or `import` line. Here's the same simple example from above converted to module mode:

```python
def settings():
    size(500, 500)

def setup():
    fill(255, 0, 0)
    no_stroke()

def draw():
    circle(mouse_x, mouse_y, 10)
    print(frame_count)
```

This is beginning to look a lot more like Processing code! The creator of py5 plans to make an adjustment to the next release that allows you to place the `size()` function in the `setup()` block -- so you wouldn't require a `settings()` function.

Use the stop button to stop/exit any sketch you run (Figure 7).

<figure>
  <img src="{{ site.url }}/img/tapy5/stop-button.png" class="fullwidth" />
  <figcaption>Figure 7: Exit sketches using the stop button</figcaption>
</figure>

If you restart Thonny, it'll recall the arguments field from the last session. Empty this to return to normal Python mode.


## Installing Packages

You can install additional Python libraries to extend your py5 sketches. In this section, you'll install a 2D Python physics library, [Pymunk](http://www.pymunk.org). The techniques you use here are applicable to installing other Python packages.

<blockquote markdown="1">
NOTE: One of the neat things about JPype is that it makes the Java Processing jars available to the CPython interpreter. Processing.py uses [Jython](https://www.jython.org/), which does *not* support third-party Python libraries that use extensions written in C.
</blockquote>

You need to install packages using Thonny's built-in `pip` command. Open your terminal and change to your Thonny `bin` directory:

```
cd ~/Desktop/thonny_py5/thonny/bin
```

Note that my *thonny_py5* resides on my Desktop; your path is different if you've moved your folder elsewhere.

Now install Pymunk:

```
./pip3 install pymunk
```

This `pip` command (within your Thonny app) installs all of it's packages to Thonny's `/lib/python3.9/site-packages/` location. Pymunk is now part of your portable app.

Now that you've installed Pymunk, you can use this library in your sketches.


## A Pymunk example

Open Thonny and add the following code to a new file:

```python
import pymunk

space = pymunk.Space()
space.gravity = (0, 900)

# create valley-like floor
segment1 = pymunk.Segment(space.static_body, (0, 100), (250, 450), 5)
segment1.elasticity = 1
segment2 = pymunk.Segment(space.static_body, (500, 100), (250, 450), 5)
segment2.elasticity = 1
space.add(segment1, segment2)

# create ball
body = pymunk.Body(mass=1, moment=10)
body.position = 90, 0
ball = pymunk.Circle(body, radius=10)
ball.elasticity = 0.95
space.add(body, ball)

def settings():
    size(500, 500)

def draw():
    background(150)

    # render all of the elements
    stroke(255)
    stroke_weight(segment1.radius*2)
    line(segment1.a.x, segment1.a.y, segment1.b.x, segment1.b.y)
    line(segment2.a.x, segment2.a.y, segment2.b.x, segment2.b.y)
    no_stroke()
    circle(ball.body.position.x, ball.body.position.y, ball.radius*2)

    space.step(1/get_frame_rate())
```

Run the sketch to begin the simulation -- the ball from around the top of the display window and bounces around before settling to a standstill in the trough.

<figure>
  <img src="{{ site.url }}/img/tapy5/pymunk-example.png" class="fullwidth" />
  <figcaption>Figure 8: The ball bounces around within the valley</figcaption>
</figure>

...

http://www.pymunk.org/en/latest/pymunk.html


http://py5.ixora.io/reference/





## Conclusion

http://py5.ixora.io/install/#install-cairo-and-cairosvg-optional

py5 is new and exciting, and it's changing all the time ...

http://py5.ixora.io/community/

http://py5.ixora.io/blog/

-- from the official [py5 documentation](http://py5.ixora.io/tutorials/py5-modes#imported-mode)*

"The Processing Editor does not currently support py5, but perhaps one day it will. Until then, you can use the py5 Jupyter Notebook Kernel.""

thonny has plugins -- so maybe a procssing one with all of the settings (imports, pyde extensions, a color mixder, etc.)

even an option to export to pyp5js, or bpy for 3d, or shoebot mode?

https://github.com/hx2A/py5generator/discussions/12

*End*

## References

* http://py5.ixora.io/
* http://py5.ixora.io/about/
* http://py5.ixora.io/reference/
* http://py5.ixora.io/tutorials/
* https://py.processing.org/
* https://thonny.org/
*
* ...
