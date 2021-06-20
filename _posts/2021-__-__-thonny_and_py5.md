---
layout: post
comments: true
title: "Thonny and py5"
categories: code python
published: false
---

# OPEN TERMINAL AND INSTALL

1. sudo apt-get install python3.9 python3.9-dev python3.9-venv
   (apt or whatever, needs dev files to build py5) -- check what thonny windows uses

2. cd ~/Desktop
   (or wherever you prefer)

3. mkdir thonny_py5
   cd thonny_py5

3. wget https://github.com/thonny/thonny/releases/download/v3.3.7/thonny-3.3.7-x86_64-alt.tar.gz
   (check https://github.com/thonny/thonny/releases for -py38 version if you're using windows)

4. tar -xzvf thonny-3.3.7-x86_64-alt.tar.gz
   rm thonny-3.3.7-x86_64-alt.tar.gz

5. python3.9 -m venv tempenv
   cd tempenv/lib/python3.9
   rm -r site-packages
   ln -s ../../../thonny/lib/python3.9/site-packages site-packages
   cd ../../../

6. source tempenv/bin/activate
   pip install py5
   deactivate
   rm -r tempenv

7. wget https://download.java.net/openjdk/jdk11/ri/openjdk-11+28_linux-x64_bin.tar.gz
   tar -xzvf openjdk-11+28_linux-x64_bin.tar.gz
   rm openjdk-11+28_linux-x64_bin.tar.gz

   this extracts it in your py5 directory, alongside thonny (note you could install it via apt and ignore this step)
   py5
   └─ jdk-11
   └─ thonny

   sed -i '2iexport JAVA_HOME=$PWD/../../jdk-11/' ./thonny/bin/thonny

10. printf '#!/bin/bash\ncd thonny/bin;./thonny' > run
    chmod +x run

11. clean up (if you don't want/need python 3):
    sudo apt-get remove --purge python3.9 python3.9-dev python3.9-venv
    sudo apt-get autoremove --purge


# OPEN THONNY

1. change theme (restart for full effect)
   Tools > Options...
   Theme & Font; change the UI theme and syntax theme as you please
   you'll have to restart to apply the theme fully

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


3. debugging in thonny

variables panel
```python
x = 10

while True:
    x += 1
```

object inspector
```python
class foo():
    def __init__(self, bar):
        self.bar = bar

x = foo(10)

while True:
    x.bar += 1
```



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



# INSTALLING PACKAGES

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
