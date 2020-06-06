---
layout: post
comments: true
title: "Blender Creative Coding – 1.1: Getting Started"
categories: code blender python
published: false
---

<!--
<p markdown="1" style="text-align:right">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>
-->

In this series of tutorials, I'll introduce Blender as a tool for creative coding. [Blender](https://www.blender.org/) is open-source software for 3D modelling and animation that can also handle compositing, video editing, and 2D animation. Artists and animators operate Blender using a graphic user interface (Figure 1-1), but it also features a Python API that can do everything the GUI can and more. That means you can use Python code draw, position, animate, and manipulate 3D objects.

<figure>
  <img src="{{ site.url }}/img/bcc01/getting-started-blender.png" class="fullwidth" />
  <figcaption>Figure 1-1: The Blender modelling interface</figcaption>
</figure>

I began experimenting with Blender scripting largely via *Processing Python Mode*. I'm interested in creative coding using Python. Processing Python Mode is a fantastic entry point into the world of creative coding, Python, and programming in general. I think it's so great that I wrote a [whole course]({{ site.baseurl }}/#processing-reverse) on it. You won't outgrow Processing, but you might have the urge to delve into some more advanced 3D stuff---particle systems, rigid-body/fluid/cloth dynamics, metaballs, volumetrics, and so forth. With Blender scripting, you get access to all of that and a powerful render engine to output your creations in high-resolution image and video formats.

I'll be adding lessons whenever I have time. This series of tutorials is serves as a journal for myself, and a guide for others. I've always longed to get 'properly' into Blender, and now I've found a reason to do so.

### What You Should Know Already

I'll provide a brief overview of the Python language in lesson 2. If you're familiar with some other programming language, you should be fine. If you have no programming experience, it's best to learn some Python first (using [Processing Python mode]({{ site.baseurl }}/#processing-reverse) or some other Python environment).

Some Blender knowledge is useful, but not essential.

# Getting Started

In this section, I'll step you through installing Blender, accessing the scripting interface, and running your first line of code. At the time of writing, Blender is on release 2.83.

Download Blender from the Blender website at [https://www.blender.org/download/](https://www.blender.org/download/).

On the Download page, click the *other versions* option (Figure 1-2). I'm using the *Portable* version. I prefer not to use installers if I can; this way, you know exactly where the Blender application is stored, which is useful for the command line step (coming up shortly). For Windows, download the *Portable(.zip)* file. For Linux, download the *non*-Snap-Store version. For macOS, there's just one option, which is the one you want.

<figure>
  <img src="{{ site.url }}/img/bcc01/getting-started-download-blender.png" class="fullwidth" />
  <figcaption>Figure 1-2: Blender download page</figcaption>
</figure>

Once the download is complete, extract this wherever you like---on your desktop, in your documents folder, or wherever you prefer. The extracted folder contains the application files---everything you need to run Blender. On macOS, you choose where you store the application by dragging it to that location.

## Opening Blender via the Command Line

Open your terminal. On Windows, it's called the *Command Prompt*; on macOS, it's called *Terminal*; Linux folk, you know about your terminal already ;)

In a new terminal window, type `cd` (followed by a space), then drag the extracted folder into the terminal window (Figure 1-3). This will look a little different for each system, but the principle is the same. If you used the Blender installer (as opposed to the portable version), you'd need to locate the installed files on your system. On macOS, first you have to right-click on the Blender application, select *Show Package Contents*, navigate to *Contents* > *MacOS*, and drag the *MacOS* folder into the terminal.

<figure>
  <img src="{{ site.url }}/img/bcc01/getting-started-terminal-drag.png" class="fullwidth" />
  <figcaption>Figure 1-3: Type <code>cd</code> and drag the folder into the terminal</figcaption>
</figure>

This will write in the path. Hit enter to change to the Blender directory. The prompt (text to the left of the cursor) will indicate that you're in the right place (Figure 1-4). Again, this will look a bit different on your system.

<figure>
  <img src="{{ site.url }}/img/bcc01/getting-started-terminal-cd.png" class="fullwidth" />
  <figcaption>Figure 1-4: The prompt confirms that you're in the correct directory</figcaption>
</figure>

![](img/bcc01/getting-started-terminal-cd.png)  
*Figure 1-3: *

Open the Blender executable from the command line. On Windows, type `blender.exe`; for macOS/Linux, type `./blender`. This will open Blender from the terminal. The terminal window remains open.

![](img/bcc01/getting-started-terminal-blender.png)  
*Figure 1-4: Launching Blender from the terminal*

You'll be using the terminal for developing Blender scripts.

## Your First Line of Blender Script

Time to enter your first line of code! In Blender, switch to the *Scripting* tab, then click *New*:

![](img/bcc01/getting-started-new-script.png)  
*Figure 1-5: Switch to the Scripting tab*

Type in: `print('Hello, World!')`. Then, run the script using **Alt-P** (or by clicking the *Run Script* button). The terminal should display a `Hello, World!`.

![](img/bcc01/getting-started-run-script.png)  
*Figure 1-6: The terminal displays `Hello, World!` when you run the script*

Just above where you entered `print('Hello, World!')`, there's a link to access the *Text* menu. Use the *Save As...* option to save the script as *hello_world.py*.

Excellent! You've got a working Python script. It's time to move onto manipulating objects with code.



<p style="text-align:right" markdown="1">
<em>next lesson coming soon</em><br />
<!--
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
-->
[Complete list of Blender Creative Coding lessons]({{ site.baseurl }}/#blender-reverse)
</p>
