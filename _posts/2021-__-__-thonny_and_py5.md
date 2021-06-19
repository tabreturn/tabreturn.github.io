---
layout: post
comments: true
title: "Thonny and py5"
categories: code python
published: false
---



OPEN TERMINAL

1. sudo apt-get install python3.9 python3.9-dev python3.9-venv 
   (apt or whatever, needs dev files to build py5) -- check what thonny windows uses

2. cd ~/Desktop
   (or wherever you prefer)

3. mkdir thonny_py5
   cd thonny_py5
   python3.9 -m venv env
   source env/bin/activate
   pip install py5
   deactivate


3. wget https://github.com/thonny/thonny/releases/download/v3.3.7/thonny-3.3.7-i686-alt.tar.gz
   (check https://github.com/thonny/thonny/releases for -py38 version if you're using windows)

4. tar -xzvf thonny-3.3.7-i686-alt.tar.gz
   rm -r env thonny-3.3.7-i686-alt.tar.gz

5. cd ./env/lib/python3.9/site-packages/* 
   cpbackcall* chardet9* daetutil easy_install.py decorator* idna* ipython* jpype line_profiler* matplotlib* noise* nptyping* numpy* IPython JPype* pexpect* pandas* pickleshare* PIL Pillow* prompt_toolkit* py5* pygments Pygments* python_dateutil* pytz* requests* setup.py stackprinter* tests traitlets* typish* urlib3* wcwidth* *jpype* decorator.py kernprof.py ../thonny/lib/python3.9/site-packages/

8. dowload jdk11 from https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html
   and extract it in your py5 directory, alongside thonny (or install it via apt and ignore the next step)
   py5
   └─ jdk-11.x.xx
   └─ thonny

9. sed -i '2iexport JAVA_HOME=$PWD/../jdk-11.x.xx/' ./thonny/bin/thonny
   (replace the x's accordingly)

10. ln -s ./thonny/bin/thonny thonny_py5

10. optional clean up: 
sudo apt-get remove --purge python3.9 python3.9-dev python3.9-venv
sudo apt-get autoremove --purge








OPEN THONNY

tab to prompt for methods and attrs
ctrl+space for auto-complete (continous)

Uncheck Tooos > Options... > Assistant > Open Assistant automatically when program crashes with an exception


change theme (restart for full effect)

thonny has plugins -- so maybe a procssing one with all of the settings (imports, pyde extensions, a color mixder, etc.)

even an option to export to pyp5js, or bpy for 3d, or shoebot mode?


hide assistant

http://py5.ixora.io/reference/

no draw() mode ...

debug example








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

