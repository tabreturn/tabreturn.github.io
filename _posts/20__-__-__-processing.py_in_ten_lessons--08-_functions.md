---
layout: post
comments: false
title: "Processing.py in Ten Lessons – 08: Functions"
categories: code processing python
published: false
---

---
&nbsp;  


You will often find that you repeat the same, or very similar, lines of code within a single sketch. Moreover, as your programs grow more complex, repetition tends to creep in. For more modular and reusable code, one can employ *functions*. In the next chapter, you will look at how to define and work with functions. As a concept, you should grasp functions without much trouble, especially considering what you managed thus far. On the other hand, I'll still be throwing in some crunchy tasks to keep you challenged!

parametric equations
retro screensaver

function naming conventions

functions make code easier to write, read, test, fix.


functions look familiar? you have already used them


arguments

A parameter is the variable which is part of the method’s signature (method declaration). An argument is an expression used when calling the method
(a method has parameters and takes args)

positional args f(1,2)
keyword args f(a=1, b=2); f(b=2, a=1)
default values?


returning values
return dicts/lists? (and passing?)

(*args, **kwargs)

* introduce functions
 * #004477
 * draw a stickman, then add a few more noting how much you repeat the lines of code
 * make a function stickman(); they all draw above one another, so add args
 *

* introduce parametric equations
 * do non-function version of parabola, then convert to function with a return

~~~
size(100,100)
background('#004477')

x = 40
y = 30
g = 20

def face(x,y,gap):
    stroke('#FFFFFF')
    line(x,0, x,y)
    line(x,y, x+gap,y)
    line(x+gap,y, x+gap,100)
    mouthy = height-(height-y)/2
    line(x,mouthy, x+gap,mouthy)
    noStroke()
    ellipse(x-gap/2,y/2, 5,5)
    ellipse(x+gap/2,y/2, 5,5)

face(x,y,g)

~~~

**In development**  
*Lesson 09: Object-Orientation*  
*Lesson 10: Some Physics*  
*Bonus Lesson: 3D and Shaders*

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
