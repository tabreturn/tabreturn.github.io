---
layout: post
comments: true
title: "Comparing Colours"
categories: code
---

This post discusses the concepts around measuring differences in colour, particularly in the RGB colour space.

## Introduction

I recently developed a [prototype system](http://corvet.tabreturn.com) for automatically assessing vector graphics drawing tasks -- basically: you download a graphic; re-draw it using your preferred vector graphics software (Illustrator, Inkscape, or CorelDRAW); and then upload it once you're done. Your rendition is then compared to the original and you receive a score for your efforts. Hence my investigation into this topic, as, in addition to comparing the coordinates and dimensions of various shapes, the assessment algorithms are also required to compare the accuracy of fill and outline colours.

*Note that throughout this article, Excel formula notation has been used instead of mathematical notation.*

### Colours for Digital Displays

Before proceeding, here's a basic introduction to how computers (and screens in general) display colour. You may already know about a bit this topic, but if you don't, this is the gist of it: every pixel of colour that you see on your screen is displayed by mixing together three primary colours -- much like how you mixed red, yellow, and blue paint in art class. However, your screen relies on red, *green*, and blue instead. Furthermore, as light blends colour in an *additive* fashion, pixels mixing all of these primaries together appear white. Conversely, a complete absence of any colour results in black. Other colours contain varied quantities of red, green, and blue. For example, a bright red would be:  

<div style="background-color:red; display:inline-block; width:80px; height:2em"></div>  
red: 100%  
green: 0%  
blue: 0%

A darker red could be represented as:  

<div style="background-color:#800; display:inline-block; width:80px; height:2em"></div>  
red: 50%  
green: 0%  
blue: 0%

Following the same red-green-blue sequence (RGB), black is 0&#124;0&#124;0; white is 100&#124;100&#124;100; blue is 0&#124;0&#124;100; yellow is 100&#124;100&#124;0; and so forth. These values are often represented in hexadecimal, where 100% is described as FF -- but this article avoids hexadecimal representations.

## Distance

Distance can be defined as the length of the space between two points. In this case, those points happen to be colours, and the range of space the colours occupy is referred to as a [gamut](https://en.wikipedia.org/wiki/Gamut). Certain media offer wider gamuts than others. For example, if you print this page, these two colour swatches will appear far more alike on paper -- if not identical -- than on your screen:

<div style="background-color:#0F0; display:inline-block; width:80px; height:2em"></div>
<div style="background-color:#69bd45; display:inline-block; width:80px; height:2em"></div>
<div style="clear:both; height:1em"></div>

Thus, one can say that the screen's bright green is out of gamut in the printer's (CMYK) colour space.

### One Primary Colour

To begin, consider an image rendered using a single primary colour, rather than three. It's probably easiest to use a black primary, just like a grey-scale printer does. So, 0 black results in white; whereas 100 is the darkest black; and everything between in some shade of grey. Below is a greyscale image, where point *A* has a black value of 40 and point *B* a value of 95.

![greyscale sample]({{ site.url }}/img/cc-greyscale-sample.png)

So if one were to plot points *A* and *B* along a scale, it looks something like this:

![greyscale graph]({{ site.url }}/img/cc-greyscale-graph.svg)

If you wish to calculate a distance between the two colours, simply take B and subtract A from it, which in this case is:  
`95 - 45`  
which equals **50**.

So the smaller the value, the closer the match; a value of zero indicates that the colours are identical.

### Two Primary Colours

Now consider an image in which all of the colours are mixed from two primaries -- such as a [duotone](https://en.wikipedia.org/wiki/Duotone). Below is a sepia duotone of the same photograph:

![sepia-tone sample]({{ site.url }}/img/cc-sepia-sample.png)

Rather than measuring the distance in one dimension, the values must now be plotted in **two dimensions** -- one for sepia and one for black. In order to measure the distance one must employ the [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem) and use the length of the hypotenuse to indicate the distance between the two points :

![sepia-tone graph]({{ site.url }}/img/cc-sepia-graph.svg)

Therefore, the distance (the black dashed-line) between colours A and B is calculated as:  
`SQRT( (90-30)^2 + (50-35)^2 )`  
which equals roughly **62**.

This same concept can be extended for full-colour images.

### Three Primary Colours

It has been established that screens display full-colour graphics using three primary colours, namely red, green, and blue. In the image below, the RGB values for points A and B are equal to 30&#124;50&#124;70 and 5&#124;0&#124;5 respectively:

![colour sample]({{ site.url }}/img/cc-colour-sample.png)

An additional **third** dimension is now added to the graph, as visually illustrated in the diagram below:

![colour graph]({{ site.url }}/img/cc-colour-graph.svg)

Mathematically speaking, an extra dimension has been added to the Pythagorean theorum, so the distance is now calculated as:  
`SQRT( (30-5)^2 + (50-0)^2 + (70-5)^2 )`  
which equals roughly **86**.

More correctly speaking, this distance is referred to as [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance), and there are no limits to how many dimensions can be added to the formula. It would seem that Euclidean distance is a measure of how similar two colours are ... **but** it's a bit more complicated than this ...

## The Human Visual System (HVS) Model

When taking into account differences in colour, one has to consider the apparatus. For humans, this is a combination of the eyes and brain. To assist in hardware and software development, experts in the field of computer graphics have devised the *HVS Model*. By modeling how humans visually perceive the world around them, they are able to optimise how devices handle and render graphics. For example, JPG compression can dramatically reduce the file size of digital photos by discarding information -- yet there is little to no discernible difference to the HVS. Of course, heavier JPG compressions do produce a more noticeable loss in quality, but high-quality JPGs are difficult to discern from an uncompressed original. One technique JPG compression relies on is [Chroma subsampling](https://en.wikipedia.org/wiki/Chroma_subsampling) which takes advantage of the HVS's lower acuity for detecting differences in colour than differences in brightness (or more correctly, *luminance*).

### Visual Acuity

There are other compression techniques that advantage of how the HVS operates. To explain another concept, observe the two swatches below. Which is brighter?

<div style="background-color:#0000FC; display:inline-block; width:80px; height:2em"></div>
<div style="background-color:#0000FF; display:inline-block; width:80px; height:2em"></div>
<div style="clear:both; height:1em"></div>

Maybe removing the gap will help? Still unsure?

<div style="background-color:#0000FC; float:left; width:80px; height:2em"></div>
<div style="background-color:#0000FF; float:left; width:80px; height:2em"></div>
<div style="clear:both; height:1.5em"></div>

The correct answer is ... the right swatch. Although both swatches contain no red or green, the right swatch has 1% less blue in it. As a test, I took a screenshot and zoomed into the centre boundary of the gap-less version; there indeed was a difference, albeit a barely discernible one. Now imagine an image that contains both of these colours alongside one another, and possibly interspersed amongst other colours. The image effectively contains more information than the HVS can truly handle. One colour will suffice, so compression algorithms, such as those used in GIF and PNG, reduce the file size by reducing the number of colours in the image.

### Delta E

Delta E (ΔE, dE) is the measure of change in *visual perception*. The earliest formula was simply a Euclidean distance calculation. However, the *Commission Internationale de l'Éclairage* (CIE) has extended upon and refined it (numerous times) to improve accuracy. For example, the RGB colour space is not perceptually uniform. The HVS is more sensitive to certain colours due to the physiology of the eye -- with green being more dominant than red or blue. But, one can compensate by adjusting the formula, factoring in the correct RGB ratio by multiplying the green value (G) by four making its effect the most prominent over the red (R) -- which must be multiplied by three; and blue (B), which has must be multiplied by two -- so that the Euclidean distance formula changes from:

`SQRT( R^2 + G^2 + B^2 )`  
to:  
`SQRT( 3(R)^2 + 4(G)^2 + 2(B)^2 )`

It gets more complicated, though, and further adjustments must be made to accommodate for the fact that changes in darker colours are less noticeable than those in lighter colours. And this is where I end, and where you head over to Zachary Schuessler's [Delta E 101 webpage](http://zschuessler.github.io/DeltaE/learn/). Zachary explains Delte E further, and also provides the CIE's algorithms implemented as a [JavaScript library](https://zschuessler.github.io/DeltaE/).

# References

* https://www.researchgate.net/publication/236023905_Color_difference_Delta_E_-_A_survey
* http://zschuessler.github.io/DeltaE/learn/
