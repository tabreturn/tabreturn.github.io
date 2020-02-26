---
layout: post
comments: true
title: "Portable Thonny + p5"
categories: code processing python
published: false
---

...

* this is for windows
* download thonny portable (https://github.com/thonny/thonny/releases/tag/v3.2.6)
* add p5 package (https://github.com/thonny/thonny/wiki/InstallingPackages)
* download and place glfw dlls in thonny dir (next to thonny.exe)
* /thonny+p5/Lib/site-packages/vispy/ext/glfw.py
~~~

import sys
_glfw_file = sys.executable.replace('\\', '\\\\')
_glfw_file = _glfw_file.replace('python.exe', 'glfw3.dll')

# Else, we failed and exit
...
~~~
* you can delete the .pyc files and __pycache__ directories if you want to


## Introduction

...

## ...
