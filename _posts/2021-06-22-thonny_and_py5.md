---
layout: post
comments: true
title: "Thonny and py5"
categories: code python
published: false
---

I very recently stumbled upon [py5](http://py5.ixora.io/), a Python version of Processing for Python 3.8+ that uses Processing's core libraries under the hood (thanks to some [JPype](http://www.jpype.org) magic). 

Previously, I wrote a post on [combining the Thonny editor and p5]({% post_url 2020-02-26-thonny_and_p5 %}). p5 is sort of Python 'clone' of Processing, that doesn't actually use Processing to generate visual output. But py5 is quite different. As it's creator, Jim Schmitz, [explains](http://py5.ixora.io/about/) -- 

*"Processing.py is the spiritual ancestor to and inspiration for py5. Py5 is similar to Processing.py in that both use Python syntax but their implementations are very different. Processing.py and py5 do not share any code but py5 benefits from code in the Processing core libraries written to accomodate Processing.py."*

I got excited when I read this. Promptly, I set out to see is I could combine with py5 with Thonny, which worked out very nicely (Figure 1).

<figure>
  <img src="{{ site.url }}/img/tapy5/banner.png" class="fullwidth" />
  <figcaption>Figure 1: Thonny doing its <a href="https://py.processing.org/">Processing.py/Python Mode</a> impression with py5</figcaption>
</figure>

I prefer to run an application in a portable fashion where I can. For different reasons this is useful, including that it's easier to distribute something that beginners can just click and run. This post covers how to roll your own portable Thonny + py5 IDE on Linux (Mint in my case). Ubuntu and other Debian distros should work with these instructions. The process is similar for Mac and Linux setups, although I will not cover the procedure for these platforms.


## Install

To begin, open your terminal. At the time of writing, Thonny (at version [3.3.10](https://github.com/thonny/thonny/releases/tag/v3.3.10)) is bundled with Python 3.7.9. py5 requires Python 3.8 or higher. But, there are alternative versions of Thonny that use Python 3.9.5 instead, which is what I'll use here.

Start by installing a few Python 3.9 packages. This is necessary to build py5; you can always remove them later.
```
sudo apt-get install python3.9 python3.9-dev python3.9-venv
```

Now, set up a new folder named *thonny_py5* for your Thonny + py5 install. Recall that this is set up to be portable -- you can move it anywhere you like later. I've decide to create this on my Desktop:
```
cd ~/Desktop
mkdir thonny_py5
cd thonny_py5
```

You've now changed to the *thonny_py5*. Your terminal prompt should refelct this. Download and extract the "alt" version of Thonny (for Python 3.9):
```
wget https://github.com/thonny/thonny/releases/download/v3.3.7/thonny-3.3.7-x86_64-alt.tar.gz+tar -xzvf thonny-3.3.7-x86_64-alt.tar.gz
rm thonny-3.3.7-x86_64-alt.tar.gz
```

Set up a virtual environment so that you install the py5 packages with. To install those packages in Thonny's Python location, I've used a symlink. Once I've installed the package, I delete the virtual environment:
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

I've explicity installed py5 version 0.4a2. At the time of writing, this the latest version.

py5 requires Java 11 (for those Processing core libraries). I'm installing OpenJDK 11:
```
wget https://download.java.net/openjdk/jdk11/ri/openjdk-11+28_linux-x64_bin.tar.gz
tar -xzvf openjdk-11+28_linux-x64_bin.tar.gz
rm openjdk-11+28_linux-x64_bin.tar.gz
```

This extracts OpenJDK in your py5 directory, alongside thonny:
```
py5
└─ jdk-11
└─ thonny
```

Enter this command so that Thonny knows where to find Java when it runs your py5 programs/sketches:
```
sed -i '2iexport JAVA_HOME=$PWD/../../jdk-11/' ./thonny/bin/thonny
```

Finally, create a *run* file in the root of your *thonny_p5* directory to start Thonny:
```
printf '#!/bin/bash\ncd thonny/bin;./thonny' > run
chmod +x run
```

If you'd like to, you can remove the Python3.9 packages from your system:
```
sudo apt-get remove --purge python3.9 python3.9-dev python3.9-venv
sudo apt-get autoremove --purge
```

You can now move *thonny_p5* folder anywhere you like, copy it to other Linux computers, and so on. It's self-contained, with Python, the py5 libraries, and Java built-in. 


## Running Thonny

When you run Thonny for the first time, there's a simple configuration step (Figure 2), then you're ready to write code (Figure 3).

<figure>
  <img src="{{ site.url }}/img/tapy5/configuration-start.png" style="border:1px solid black" />
  <figcaption>Figure 2: Starting Thonny for the first time, you must complete this simple configuration step</figcaption>
</figure>

<figure>
  <img src="{{ site.url }}/img/tapy5/standard-editor.png" class="fullwidth" />
  <figcaption>Figure 3: Thonny's standard appearance</figcaption>
</figure>

If you've already installed another Thonny instance on you machine, it'll skip the configuration step and load your default preferences.

### Customising Thonny's Appearance

To make everything look more Processing-esque, you can change the theme by selecting **Tools > Options...**, then select **Theme & Font** where you can change the UI theme and syntax theme as you please (Figure 4). 

<figure>
  <img src="{{ site.url }}/img/tapy5/change-theme.png" class="fullwidth" />
  <figcaption>Figure 4: Changing the Thonny theme</figcaption>
</figure>

You'll have to restart to apply the theme fully. 


## Customising Thonny's Appearance



2. create a sketch, run (it'll prompt you to save)

```python
import py5

def settings():
    py5.size(200, 200)

def draw():
    py5.rect(py5.mouse_x, py5.mouse_y, 10, 10)

py5.run_sketch()
```
use ctrl+space to list the different py5 methods and atrributes

mention assistant; close if you wish



Thonny is full of [useful features](https://thonny.org/), which you can explore



thonny has plugins -- so maybe a procssing one with all of the settings (imports, pyde extensions, a color mixder, etc.)

even an option to export to pyp5js, or bpy for 3d, or shoebot mode?


hide assistant

http://py5.ixora.io/reference/

no draw() mode ...

debug example




imported mode
Uncheck Tooos > Options... > Assistant > Open Assistant automatically when program crashes with an exception

```python
import py5, py5_tools
py5_tools.set_imported_mode(True)
from py5 import *

print(py5_tools.imported.get_imported_mode())

def settings():
    size(300, 200)

def setup():
    rect_mode(CENTER)

def draw():
    rect(py5.mouse_x, py5.mouse_y, 10, 10)

def mouse_clicked():
    print(555)

run_sketch()
```



# Installing Packages

cd to thonny_py5/thonny/bin
./pip3 install ...

an example using pymunk

```
import py5

import pymunk
# http://www.pymunk.org/en/latest/tutorials/SlideAndPinJoint.html
space = pymunk.Space()
space.gravity = (0, -900)

b0 = space.static_body
segment = pymunk.Segment(b0, (0, 0), (640, 0), 4)
segment.elasticity = 1
body = pymunk.Body(mass=1, moment=10)
body.position = 100, 200

circle = pymunk.Circle(body, radius=20)
circle.elasticity = 0.95

space.add(body, circle, segment)
def settings():
    py5.size(200, 200)

def draw():
    py5.background(0)
    py5.circle(circle.body.position.x, circle.body.position.y, circle.radius)
    
    space.step(0.02)        # Step the simulation one step forward
    #space.debug_draw(print_options) # Print the state of the simulation

py5.run_sketch()
```




http://py5.ixora.io/reference/





CODE


import py5
from py5 import *

import numpy as np
a = np.arange(15).reshape(3, 5)

class a():
    def __init__(self, a, b):
        self.a = a
        self.b = b
xxx = a(1, 2)

def pleaseSkipMe():
    print("you can't see me!")

def settings():
    size(500, 500)

def setup():

    background(0)
    img = load_image('smile.jpg')
    image(img, 10, 10)



def draw():
    fill(255,0,0)
    rect(py5.mouse_x, py5.mouse_y, 10, 10)
    xxx.a = py5.mouse_x

pleaseSkipMe()

run_sketch()








import py5


def settings():
    py5.size(300, 200)

def setup():
    py5.rect_mode(py5.CENTER)

def draw():
    py5.rect(py5.mouse_x, py5.mouse_y, 10, 10)

py5.run_sketch()









# https://magpi.raspberrypi.org/articles/thonny

from time import sleep

x = 10

while True:
    print("x:", x)
    x += 1
    sleep(0.05)



## Conclusion

py5 is new and exciting, and it's changing all the time ...




*End*

## References

* https://...
* ...
