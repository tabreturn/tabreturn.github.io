---
layout: post
comments: true
title: "Interactive SVG Animation with GSAP"
categories: code javascript
published: false
---

...

<figure>
  <img src="{{ site.url }}/img/tap/thonny-download.png" class="fullwidth" />
  <figcaption>At the time of writing, version 3.2.6 is the latest release</figcaption>
</figure>


SVG
===

"Scalable Vector Graphics (SVG) is an XML-based markup language for describing two-dimensional based vector graphics. SVG is, essentially, to graphics what HTML is to text."  
-- https://developer.mozilla.org/en-US/docs/Web/SVG

In this lesson, you'll look at writing SVG code to draw shapes. To animate the shapes, you'll employ a JavaScript library named *GSAP*.

You'll use various SVG elements, but only a small subset of what's available. For a complete reference of SVG elements and attributes, you can refer to the MDN documentation:

* https://developer.mozilla.org/en-US/docs/Web/SVG/Element
* https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute

You can add SVG images to web-pages in various ways; for this task, you'll use *inline* SVG (writing the SVG code among the HTML). For the other ways, refer to the [MDN documentation on adding SVGs to web-pages](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web).

There are SVG attributes to control how your SVG graphics scale/respond to resizing. Many vector graphics editors provide export options to set those parameters, although you can code them manually.

You'll recreate the following graphic using SVG markup, which will include animation:

![](00-complete.png)

Setup an HTML Document
----------------------

Here is the code to start off your file. This initial structure will include a link to a GSAP file (CDN-hosted). To keep things simple, you'll use an internal stylesheet and internal JavaScript:

```html
<!DOCTYPE html>

<html>

  <head>

    <meta charset="utf-8" />
    <title>212 Coffee</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>

    <style>
    </style>

  </head>

  <body>

    <script>
    </script>

  </body>

</html>
```

Save the file as *212-coffee.html*.

SVG
---

To begin creating shapes, add an empty `svg` tag; this will serve as your 'drawing space'. Use `width` and `height` attributes to define the size:

```html
  ...

  <body>

    <svg width="800" height="395">

    </svg>

    <script>
    ...
```

Add some CSS (within the `<style>` block) to style the background and outline the SVG element:

```css
      html, body {
        align-items: center;
        background-color: #888;
        display: flex;
        height: 100%;
        justify-content: center;
      }

      svg {
        outline: 1px dashed #666;
      }
```

![](01-start.png)

You are now ready to add some shapes.

### Rectangles ###

Use the `<rect>` tag to draw a rectangle:

```html
    <svg width="800" height="395">

      <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />

    </svg>
```

The attributes (`x`, `y`, `width`, `height`, `fill`) should be self-explanatory. The `class` attribute is for applying some CSS styling. Add this corresponding rule to your internal stylesheet:

```css
      svg .stroked {
        stroke: #000;
        stroke-width: 15;
      }
```

![](02-rect.png)

Most properties can be applied using inline attributes or CSS. Depending on what you wish to accomplish, you may elect one approach over the other, but it's a bit tedious defining a one-off style for each element. If you're styling multiple elements the same way, a CSS class selector can be far more efficient.

### Gradient Fills ###

You can apply gradient fills using the `linearGradient` tag. This is a two-step process:

1. you define the colour-stops using `stop` tags;
2. then reference the gradient by its `id` attribute. In this case, the `linearGradient` has an `id="steel"`, which you can apply to any shape using a `fill="url(#steel)"` attribute.

Add the code:

```html
      ...

      <linearGradient id="steel">
        <stop offset="0%"   style="stop-color:#666" />
        <stop offset="50%"  style="stop-color:#FFF" />
        <stop offset="65%"  style="stop-color:#888" />
        <stop offset="100%" style="stop-color:#FFF" />
      </linearGradient>
      <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
      <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
      <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    </svg>
```

![](03-rects.png)

You have the chrome/steel elements. Next, you'll add the red button (at the top-left of the machine).

### Ellipses ###

For the red button, add an ellipse just above your final rectangle:

```html
      ...
      <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
      <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    </svg>
```

You draw the button after the `height="80"` rectangle (the top panel), so it appears above/over it.

![](04-ellipse.png)

### Paths ###

You can think of the SVG `<path>` tag as your SVG *pen / Bézier curve* tool.

Add a new path element for the cup:

```html
      ...
      <path
        stroke-linejoin="round"
        class="stroked"
        fill="#0EE" fill-opacity="0.4"
        id="cup"
        d="M335 230
           L465 230
           C465 230, 465 310, 400 310
           C335 310, 335 230, 335 230
           Z"
      />
    </svg>
```

The result is a cup shape filled in a semi-opaque blue-ish color:

![](05-path.png)

The `d` attribute uses various commands to construct paths:

Command                      | Operation
-----------------------------|-----------------------
`M`, `m`                     | move to
`L`, `l`, `H`, `h`, `V`, `v` | line to
`C`, `c`, `S`, `s`           | cubic bezier curve
`Q`, `q`, `T`, `t`           | quadratic bezier curve
`A`, `a`                     | elliptical arc curve
`Z`, `z`                     | close path

For more on how to use those commands, refer to the [MDN documentation on path commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Path_commands).

It's probably best to draw paths using something like *Inkscape* or *Illustrator* rather than write them by hand.

### Groups ###

The group tag (`<g>`) groups elements. This makes for a convenient way to address and manipulate multiple elements.

Add a *portafilter* (handle thing with the coffee grounds in it), composed of a `line` and polygon `element`:

```html
      ...
      <g class="stroked" id="portafilter">
        <line x1="50" y1="160" x2="200" y2="160" stroke-linecap="round" />
        <polygon
          stroke-linejoin="round"
          fill="url(#steel)"
          points="120,160
                  130,205
                  190,205
                  200,160"
        />
      </g>
    </svg>
```

Note that the shapes comprising the portafilter are wrapped in group tag with an `id` of `portafilter`. You'll use that ID later to animate the portafilter.

![](06-group.png)

For more on `<line />` and `<polygon />`, refer to the relevant MDN documentation:

* https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line
* https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon

### Clipping Path ###

A *clipping path* is a vector shape used to cut out a 2D image, a bit like a stencil. Anything inside the clipping path remains after it's applied to another shape; anything outside the path is omitted from the resulting shape. The result is a sort of masking effect. Here's an example of [circle-shaped clipping mask applied to a star](https://www.svgator.com/help/getting-started/creating-masks-in-adobe-illustrator)

You'll use a clipping path to fill the cup with coffee.

First, 'fill' the mug with coffee by creating another (brown) mug-shaped path:

```html
      ...
      <path
        clip-path="url(#cupmask)"
        class="stroked"
        fill="#421"
        d="M335 230
           L465 230
           C465 230, 465 310, 400 310
           C335 310, 335 230, 335 230
           Z"
      />
    </svg>
```

Note the `clip-path="url(#cupmask)"`---this will apply the relevant clipping mask (which you have yet to define).

![](07-clip_base.png)

Now, add a rectangle that will mask the coffee in the cup:

```html
      ...
      <rect id="cuplevel" x="325" y="250" width="150" height="60" fill="#F00" />
    </svg>
```

Okay, so it looks a bit odd. It's not quite finished yet ...

![](08-clip_rect.png)

Recall that the bright red rectangle will serve as the clipping path -- in other words, wherever it overlaps the brown shape (the coffee in the cup), the brown will show through. Now convert this `rect` to an actual clipping path:

```html
      ...
      <defs>
        <clipPath id="cupmask">
          <rect id="cuplevel" x="325" y="250" width="150" height="60" fill="#F00" />
        </clipPath>
      </defs>
    </svg>
```

Note the `id="cupmask"` attribute that corresponds to the `clip-path="url(#cupmask)` in the brown `<path>` tag.

![](09-clip_complete.png)

You're ready to apply some interactivity and animation to the image.

SVG Transformations
-------------------

Although not covered in this lesson, it's good to know about SVG transformations. These provide a simple way to *translate*, *rotate*, *skew*, and *scale* groups or individual shapes:  
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Transformations


SVG Animation and Interactivity
===============================

You can click different parts of the machine to trigger animations. You'll use JavaScript and *GSAP* (a library with animation functions) for handling animation.

Note that there are many ways to animate SVG elements -- natively (*CSS*, *rAF*, *WAAPI*) and using other JavaScript libraries (like *Anime*, *Mo*, *p5*, *Snap*). For additional guidance on using GSAP, you can refer to the official documentation:

https://greensock.com/docs/3

To begin, add some CSS to change the cursor to a pointer whenever it hovers over some (soon-to-be) clickable element:

```css
      #portafilter, #startbutton, #cup {
        cursor: pointer;
      }
```

You have the GSAP library linked in the `head` of your HTML document, and an empty pair of `script` tags (just before the closing `</body>` tag) for adding your JavaScript code. Let's begin with an event listener---which works exactly the same way as it would with HTML:

```html
    <script>
      document.getElementById('portafilter').addEventListener('click', function dockPortafilter() {
        alert('clicked');
      });
    </script>
```

Clicking the portafilter pops-up an alert box that reads "clicked".

SVG is part of the DOM, so JavaScript does pretty much all the same things in SVG as it does in HTML. In other words, you can address elements as you might in HTML, add event listeners, etc.

Replace the `alert` with some tween code:

```html
    <script>
      document.getElementById('portafilter').addEventListener('click', function dockPortafilter() {
        gsap.to('#portafilter', 1, { x:240 });
        this.removeEventListener('click', dockPortafilter);
        this.style.cursor = 'default';
      });
    </script>
```

Clicking the portafilter moves it into position above the cup, performing a smooth tween in the process. The `gsap.to('#portafilter', 1, {x:240})` tweens the `'#portafilter'` element from its current location to a new x-coordinate of `240`, taking `1` second to complete the motion. Then, the code removes the event listener (`removeEventListener`) so that you cannot click/animate the portafilter again, and resets the mouse cursor (to the standard pointer).

![](10-tween_portafilter.png)

Once this motion is complete, you can press the red button (to start the machine). To add the event listener for the red button *after* the tween is complete, you'll use a *callback* function. Add this as an additional parameter to your existing `gsap.to`:

```js
        ...
        gsap.to('#portafilter', 1, { x:240, onComplete:activateButton });
        ...
```

The `onComplete:activateButton` specifies that once the tween is finished, JavaScript must call a function named `activateButton`. Define that function, and set the `y` attribute of the coffee in the mug to `310` (to have it start empty):

```html
        ...
          <rect id="cuplevel" x="325" y="310" width="150" height="60" fill="#F00" />
        ...
```
```js
      ...
      let sb = document.getElementById('startbutton');

      function activateButton() {
        sb.setAttribute('fill', '#0F0');
        sb.addEventListener('click', function greenStartButton() {
          gsap.to('#cuplevel', 2, { y:-60 });
          this.removeEventListener('click', greenStartButton);
          this.style.cursor = 'default';
        });
      }
    </script>
```

The `activateButton()` function sets the button fill to green and adds a new event listener to it. Pressing this button---which is only possible once it turns green---will fill the mug:

![](11-callback_fill_mug.png)

Add another callback:

```js
        ...
          gsap.to('#cuplevel', 2, { y:-60, onComplete:deactivateButton });
          ...
```

And a corresponding function to add some frothy milk to the mug:

```js
      function deactivateButton() {
        sb.setAttribute('fill','#F00');
        document.getElementById('cup').addEventListener('click', function addMilk() {
          let milk = document.createElementNS('http://www.w3.org/2000/svg','line')
          milk.setAttribute('stroke', '#FFF');
          milk.setAttribute('stroke-opacity', '0.4');
          milk.setAttribute('stroke-width', '15');
          milk.setAttribute('stroke-linecap', 'round');
          milk.setAttribute('x1', 353);
          milk.setAttribute('y1', 250);
          milk.setAttribute('x2', 447);
          milk.setAttribute('y2', 250);
          document.querySelector('svg').appendChild(milk);
          this.removeEventListener('click', addMilk);
          this.style.cursor = 'default';
        });
      }
    </script>
```

Save, refresh your browser, and run through the click-sequence again; for the third/last step, click on the mug to add the froth.

![](12-callback_milk.png)

Challenge
---------

See if you can add the following features:

* a stream of coffee, from the portafilter to the mug, while the mug is filling-up;
* add some button to reset the process.


212 Arcade
==========

Convert your *212 Arcade* div-based graphs to an SVG solution.

*end*






## References

*
