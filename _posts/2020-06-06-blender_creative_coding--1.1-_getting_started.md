---
layout: post
comments: true
title: "Blender Creative Coding – 1.1: Getting Started"
categories: code blender python
published: false
---

<p markdown="1" style="text-align:right">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

This series of tutorial posts introduce Blender as tool for creative coding. [Blender](https://www.blender.org/) is open-source software for 3D modelling and animation, that can also handle compositing, video editing, and 2D animation.

But, Blender also features a Python API that you can use

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

# Getting Started

In this section, I'll step you through installing Blender, accessing the scripting interface, and running your first line of code. You should already possess some Python knowledge; but if you're familiar with some other programming language, you can fill in on Python as you progress through the content. Some Blender knowledge is useful, but not essential.

You can download Blender from the Blender website: [https://www.blender.org/download/](https://www.blender.org/download/)

On the Download page, click the *other versions* option. I'm using the *Portable* version. I prefer not to use installers if I can; this way, you know exactly where the Blender application is stored, which is useful for the command line step (coming up shortly). For Windows, download the *Portable(.zip)* file. For Linux, download the non-Snap-Store version (with the file size alongside it). For macOS, there's just one option, which is the one you want.

![](img/bcc01/getting-started-download-blender.png)  
*Figure 1-1: Blender download page*

Once the download is complete, extract this on your desktop, in your documents folder, or wherever you prefer. The extracted folder contains the application files -- everything you need to run Blender. On macOS, you choose where you store the application by dragging it to a location.

## Opening Blender via the Command Line

Open your terminal. On Windows, it's called the *Command Prompt*; on macOS, it's called *Terminal*; Linux folk, you know about your terminal already ;)

Type `cd` (followed by a space), then drag the extracted folder into the terminal window. This will look a little different for each system, but the principle is the same. If you used the Blender installer (as opposed to the portable version), you'd need to locate the installed files on your system. On macOS you'll have to right-click on the Blender application, select *Show Package Contents*, navigate to *Contents* > *MacOS*, and drag this into the terminal.

![](img/bcc01/getting-started-terminal-drag.png)  
*Figure 1-2: Type `cd` and drag the folder into the terminal*

This will write in the path. Hit enter to change to the Blender directory. The prompt (text to the left of the cursor) will indicate that you're in the right place. Again, this will look a bit different on your system.

![](img/bcc01/getting-started-terminal-cd.png)  
*Figure 1-3: The prompt confirms that you're in the correct directory*

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

*next lesson coming soon*

<!--
Sound exciting? You can [get started now](01-blender_creative_coding--1.2-_...)!
-->
