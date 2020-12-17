---
layout: post
comments: true
title: "Interactive Animation with SVG and GSAP"
categories: code javascript svg
published: true
---

In this tutorial, you'll create an interactive espresso machine using SVG, JavaScript, and the [GSAP](https://greensock.com/gsap/) library for animation. You'll draw the espresso machine using SVG code; once that's complete, you'll add the JavaScript/GSAP code to animate it. You'll learn how to use different SVG elements and attributes to draw with code. I won't go into much detail about JavaScript---just enough to add some event listeners and manipulate SVG elements with GSAP. The tutorial assumes that you possess a decent grasp of how HTML and CSS work.

The final result is a three-step, interactive animation (Figure 1). Click the object next to each numbered ball that appears to test it out:

<figure>
<div id="figure1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
  <style>
    #figure1 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure1 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
    #figure1 #portafilter1 {
      cursor: pointer;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
    <!-- coffee machine (maroon and steel with a red button) -->
    <linearGradient id="steel1">
      <stop offset="0%"   style="stop-color:#666" />
      <stop offset="50%"  style="stop-color:#FFF" />
      <stop offset="65%"  style="stop-color:#888" />
      <stop offset="100%" style="stop-color:#FFF" />
    </linearGradient>
    <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel1)" />
    <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel1)" />
    <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton1"  class="stroked" fill="#F00" />
    <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel1)" />
    <!-- coffee cup shape -->
    <path
      stroke-linejoin="round"
      class="stroked"
      fill="#0EE" fill-opacity="0.4"
      id="cup1"
      d="M335 230
         L465 230
         C465 230, 465 310, 400 310
         C335 310, 335 230, 335 230
         Z"
    />
    <!-- portafilter -->
    <g class="stroked" id="portafilter1">
      <line x1="50" y1="160" x2="200" y2="160" stroke-linecap="round" />
      <polygon
        stroke-linejoin="round"
        fill="url(#steel1)"
        points="120,160
                130,205
                190,205
                200,160"
      />
    </g>
    <!-- coffee in the coffee cup -->
    <path
      clip-path="url(#cupmask1)"
      class="stroked"
      fill="#421"
      d="M335 230
         L465 230
         C465 230, 465 310, 400 310
         C335 310, 335 230, 335 230
         Z"
    />
    <defs>
      <clipPath id="cupmask1">
        <rect id="cuplevel1" x="325" y="310" width="150" height="60" fill="#F00" />
      </clipPath>
    </defs>
    <style>
      text {
        fill: #000;
        font-family: "Times New Roman", Times, serif;
        font-size: 22px;
        font-style: italic;
        user-select: none;
      }
    </style>
    <!-- number balls -->
    <g id="step1">
      <ellipse cx="120" cy="125" rx="15" ry="15" fill="#0F0"></ellipse>
      <text x="114" y="132" style="fill:#000">1</text>
    </g>
    <g id="step2" style="opacity:0">
      <ellipse cx="335" cy="76" rx="15" ry="15" fill="#0F0"></ellipse>
      <text x="329" y="82" style="fill:#000">2</text>
    </g>
    <g id="step3" style="opacity:0">
      <ellipse cx="350" cy="245" rx="15" ry="15" fill="#0F0"></ellipse>
      <text x="345" y="252" style="fill:#000">3</text>
    </g>
    <g id="restart" style="cursor:pointer">
      <rect x="625" y="170" width="100" height="50" rx="5"  fill="#0F0" />
      <text x="653" y="201">reset</text>
    </g>
  </svg>
  <script>
    cd = document.getElementById('figure1');
    function start1() {
      // dock portafilter
      document.getElementById('portafilter1').addEventListener('click', function dockPortafilter1() {
        gsap.to('#portafilter1', 1, { x:240, onComplete:activateButton1 });
        this.removeEventListener('click', dockPortafilter1);
        document.getElementById('step1').style.opacity = 0;
        gsap.to('#step2', 0.5, { opacity:1, delay:0.5 });
        this.style.cursor = 'default';
      });
      let sb1 = document.getElementById('startbutton1');
      // activate green button
      function activateButton1() {
        sb1.setAttribute('fill', '#0F0');
        sb1.style.cursor = 'pointer';
        sb1.addEventListener('click', function greenStartButton1() {
          gsap.to('#cuplevel1', 2, { y:-60, onComplete:deactivateButton1 });
          this.removeEventListener('click', greenStartButton1);
          document.getElementById('step2').style.opacity = 0;
          gsap.to('#step3', 0.5, { opacity:1, delay:1.5 });
          this.style.cursor = 'default';
        });
      }
      // deactivate green button
      function deactivateButton1() {
        sb1.setAttribute('fill','#F00');
        document.getElementById('cup1').style.cursor = 'pointer';
        // add frothy milk
        document.getElementById('cup1').addEventListener('click', function addMilk1() {
          let milk = document.createElementNS('http://www.w3.org/2000/svg','line')
          milk.setAttribute('stroke', '#FFF');
          milk.setAttribute('stroke-opacity', '0.4');
          milk.setAttribute('stroke-width', '15');
          milk.setAttribute('stroke-linecap', 'round');
          milk.setAttribute('x1', 353);
          milk.setAttribute('y1', 250);
          milk.setAttribute('x2', 447);
          milk.setAttribute('y2', 250);
          milk.setAttribute('id', 'milk1');
          document.getElementById('cup1').style.cursor = 'default';
          document.querySelector('svg').appendChild(milk);
          this.removeEventListener('click', addMilk1);
          document.getElementById('step3').style.opacity = 0;
          gsap.to('#restart', 0, { y:0 });
        });
      }
    }
    // reset code
    gsap.to('#restart', 0, { y:450 });
    document.getElementById('restart').addEventListener('click', () => {
      gsap.to('#portafilter1', 0.2, { x:0 });
      document.getElementById('portafilter1').style.cursor = 'pointer';
      document.getElementById('startbutton1').style.cursor = 'default';
      gsap.to('#cuplevel1', 0.2, { y:0 });
      document.getElementById('milk1').remove();
      gsap.to('#step1', 0.2, { opacity:1, delay:0.5 });
      document.getElementById('step3').style.opacity = 0;
      gsap.to('#restart', 0, { y:450 });
      start1();
    });
    start1();
  </script>
</div>
<figcaption>Figure 1: Click the object next to each numbered ball to advance through the animation</figcaption>
</figure>

GIFs are probably the easiest way to get animation into a web-page, but with SVG, you get vector graphics that scale to any size with no discernible loss in quality. What's more, SVG data usually consumes less bandwidth than a GIF---and you can add interactive features (that respond buttons, mouse coordinates, and more) using JavaScript!

## The HTML Document Structure

Here's the code to start your HTML document; you'll add your SVG and JavaScript to this. To keep things simple, you'll write all of your markup, CSS, and JavaScript in this same file. The HTML includes a link in the `<head>` to (a [CDN-hosted](https://cdnjs.com/libraries/gsap)) GSAP library:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Espresso</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
    <style>
      /* CSS code goes here */
    </style>
  </head>
  <body>
    <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
      <!-- SVG code goes here -->
    </svg>
    <script>
      // JavaScript code goes here
    </script>  
  </body>
</html>
```

Add some CSS to the internal style sheet (within the `<style>` block) to center the SVG, colour the background grey, and add a dashed outline:

```html
    <style>
      /* CSS code goes here */
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
    </style>
```

This grey area will serve as the 'drawing space' (Figure 2).

<figure>
<div id="figure2">
  <style>
    /* CSS code goes here */
    #figure2 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
  </svg>
  <script>
  </script>
</div>
<figcaption>Figure 2: An empty grey drawing area defined using an SVG element and some CSS</figcaption>
</figure>

Now that you have the basic structure in place, we can add some SVG code.

SVG
---

I like the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/SVG) definition of SVG, which states that---

*Scalable Vector Graphics (SVG) is an XML-based markup language for describing two-dimensional based vector graphics. SVG is, essentially, to graphics what HTML is to text.*

For this task, you'll use different SVG elements, but only a small subset of what's available. For a complete reference of SVG elements and their attributes, you can refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/). You can add SVG images to web-pages in various ways; for this task, you'll use *inline* SVG---that is: writing the SVG code in a pair of `<svg>` tags, among the HTML. For the other ways, refer to the [MDN documentation on adding SVGs to web-pages](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web).

The `width` and `height` attributes of the `<svg>` tag define the dimensions of the graphic, like they do for GIF, JPG, or PNG image. I've used the [`viewBox`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) attribute to specify the visible boundaries of the drawing area, and some inline CSS for a `max-width` of 800px. This means that the image will display no larger than 800px wide, although it can scale down if necessary. It's always 395 pixels high. You'll see anything you plot between 0 and 800 pixels on the x-axis, and 0 and 395 pixels on the y-axis.

```html
    ...
    <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
      <!-- SVG code goes here -->
    </svg>
    ...
```

If you resize the browser window, the contents in Figure 1 will scale proportionately; this means that the coordinate space scales with the image. There are SVG attributes to control how your SVG graphics respond to resizing. If you're using a vector graphics editor to create SVGs, you can set those parameters using the appropriate export options (which actually control the `viewBox` and [`preserveAspectRatio`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio) attributes).

Next, you'll draw the espresso machine using different SVG shapes with varied strokes and fills.

### Drawing a Rectangle ###

The [`<rect>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect) tag draws a rectangle. In addition to the attributes for setting the x, y, width, and height values, there are `rx` and `ry` attributes for making the corners round. For this first rectangle, however, you'll draw sharp corners.

Add the following line to the `<svg>` section of your document---beneath the line the reads: `<!-- SVG code goes here -->`

```html
<rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
```

The `x` and `y` attributes define the position for the top-left corner of the rectangle. The coordinates for the top-left corner of the SVG are (0, 0). Increasing the x-value moves the rectangle to the right; increasing the y-value moves it down. The `width` and `height` attributes are for the rectangle's width and height, respectively. The `class` attribute (of `stroked`) is for applying a 15 pixel, black stroke (or outline) using CSS. Add this corresponding rule to your internal style sheet:

```css
svg .stroked {
  stroke: #000;
  stroke-width: 15;
}
```

I specify a `stroke` colour value using (shorthand) hexadecimal, but you could also use [keyword or rgb/rgba](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) values. The result, depicted in Figure 3, is a maroon rectangle with a thick black outline:

<figure>
<div id="figure3">
  <style>
    #figure3 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure3 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
  </svg>
  <script>
  </script>
</div>
<figcaption>Figure 3: An SVG rectangle</figcaption>
</figure>

Most style properties can be applied using inline attributes or CSS. Depending on what you wish to accomplish, you may elect one approach over the other, or a blend. It's a bit tedious defining a one-off style for each element, so if you're styling multiple elements the same way, a CSS class selector can be far more efficient.

### Adding Gradient Fills ###

You can apply gradient fills using the [`<linearGradient>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient) and [`<radialGradient>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient) tags. For the steel surfaces of the espresso machine, you'll apply a gradient comprising different shades of grey. Creating and applying the gradient is a two-step process:

1. you create a gradient fill using a `<linearGradient>` or `<radialGradient>` element and define its *colour-stops* using `<stop>` tags;
2. then, you reference the gradient by its `id` attribute to apply it to a given shape.

In this case, the `linearGradient` has an `id="steel"`, which you apply to three rectangles using a `fill="url(#steel)"` attribute. Add this code to your SVG:

```html
<linearGradient id="steel">
  <stop offset="0%"   style="stop-color:#666" />
  <stop offset="50%"  style="stop-color:#FFF" />
  <stop offset="65%"  style="stop-color:#888" />
  <stop offset="100%" style="stop-color:#FFF" />
</linearGradient>

<rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
<rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
<rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
```

The linear-gradient is horizontal by default. Note how the colour stops (`<stop>` tags) correspond to the metallic parts in Figure 4, blending from grey to white (`#FFF`) in the centre (`offset="50%"`) and again to white at the far right (`offset="100%"`).

<figure>
<div id="figure4">
  <style>
    #figure4 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure4 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
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
  <script>
  </script>
</div>
<figcaption>Figure 4: Adding steel surfaces using gradient fills</figcaption>
</figure>

There are no more steel elements to add to the espresso machine. Next, you'll add a circular red button to the top-left of the device.

### Drawing a Circle Using an Ellipse Tag ###

SVG has [`<ellipse>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse) and [`<circle>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle) tags. The `<ellipse>` is more versatile because you can use it to draw ellipses *and* circles. I'll use an `<ellipse>` for this example; of course, you're welcome to change this out for a `<circle>` if you prefer.

For the red button, add an ellipse line to the end of your SVG code:

```html
<ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
```

SVG reads from top to bottom, drawing each shape as it moves down the code. The first shape in the code appears at the bottom of the visual 'stack'. The button displays above/over the steel surface because the `<ellipse>` line comes last (Figure 5).

<figure>
<div id="figure5">
  <style>
    #figure5 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure5 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
    <linearGradient id="steel">
      <stop offset="0%"   style="stop-color:#666" />
      <stop offset="50%"  style="stop-color:#FFF" />
      <stop offset="65%"  style="stop-color:#888" />
      <stop offset="100%" style="stop-color:#FFF" />
    </linearGradient>
    <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
    <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
    <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
  </svg>
  <script>
  </script>
</div>
<figcaption>Figure 5: The red button is drawn above/over the steel surface</figcaption>
</figure>

There are several SVG tags for drawing [2D primitive shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes), including tags for lines and polygons. For more unique or elaborate shapes, you must use a `<path>`.

### Drawing a Complex Shape Using a Path ###

You use paths to create complex shapes that combine straight and/or curved lines. If you've used some vector graphics editor---like Adobe Illustrator or Inkscape---then you can think of the [`<path>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) tag as your SVG equivalent of a *pen* or *Bézier curve* tool. In fact, those applications use `<path>` tags to describe complex shapes when you export to SVG.

Add this code to the end of your SVG to draw a cup using a `<path>` tag:

```html
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
```
The `d` attribute uses various commands to construct paths; I've entered each command on its own line to make the code easier to read. The `M` command moves the 'pen' to the starting coordinates (`335 230`); the `L` command draws a straight line from the starting coordinates to (`465 230`). Note that the x-y values in each coordinate pair are separated with a space. The first `C` command draws a curve to (`400 310`)---the (`465 230`) is the control point for the first/starting anchor point; the (`465 310`) is the control point for the second/end anchor point. The second `C` command draws a curve to (`335 230`)---the control points are (`335 310`) and (`335 230`), respectively. I've placed the starting control point in the same position as the end anchor point for both curves. The `Z` command closes the path so that the outline of the cup is complete. Figure 6 visualises what's happening with the curves and control points.

<figure>
  <img src="{{ site.url }}/img/isawg/cup-path.svg" />
  <figcaption>Figure 6: The coordinates for the cup path's anchor- and control points</figcaption>
</figure>

If you've used a vector graphics editor before, the Figure 6 diagram should make some sense. There are several commands for drawing lines and curves as listed in the table below:

<table width="100%" style="margin-bottom:1.5em; max-width:800px">
  <tr style="text-align:left">
    <th>Command</th>
    <th>Operation</th>
  </tr>
  <tr>
    <td><code>M</code>, <code>m</code></td>
    <td>move to</td>
  </tr>
  <tr>
    <td><code>L</code>, <code>l</code>, <code>H</code>, <code>h</code>, <code>V</code>, <code>v</code></td>
    <td>line to</td>
  </tr>
  <tr>
    <td><code>C</code>, <code>c</code>, <code>S</code>, <code>s</code></td>
    <td>cubic bezier curve</td>
  </tr>
  <tr>
    <td><code>Q</code>, <code>q</code>, <code>T</code>, <code>t</code></td>
    <td>quadratic bezier curve</td>
  </tr>
  <tr>
    <td><code>A</code>, <code>a</code></td>
    <td>elliptical arc curve</td>
  </tr>
  <tr>
    <td><code>Z</code>, <code>z</code></td>
    <td>close path</td>
  </tr>
</table>

You'll notice that each command has an upper- and lowercase variant; this is for absolute and relative positioning. For example, you could begin your cup like this:  

`d="M335 230 L465 230 ...`  
or using:   
`d="M335 230 l130 0 ...`

The first version is what you have right now. In the second version, the `l` command (lowercase) draws a line that ends `130` pixels to the right of (`335 230`) and `0` pixels above/below it. The visual result is exactly the same as the first version. The difference is that the `l` point is positioned relative to its preceding point.

<blockquote markdown="1">
NOTE: If you're wondering: there's no difference between the uppercase and lowercase `Z`/`z` command.
</blockquote>

I won't get into any more detail about how curves work here, but you can refer to the [MDN documentation on path commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Path_commands) to learn more. Paths can be tricky to get right by hand-coding coordinates, but you can always use Inkscape, Illustrator, or some similar software if you prefer visual tools.

Figure 7 depicts the finished cup. I've styled the path using the `stroked` class, so it has a thick black stroke; the fill is a semi-opaque, blue-ish colour.

<figure>
<div id="figure7">
  <style>
    #figure7 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure7 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
    <linearGradient id="steel">
      <stop offset="0%"   style="stop-color:#666" />
      <stop offset="50%"  style="stop-color:#FFF" />
      <stop offset="65%"  style="stop-color:#888" />
      <stop offset="100%" style="stop-color:#FFF" />
    </linearGradient>
    <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
    <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
    <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
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
  <script>
  </script>
</div>
<figcaption>Figure 7: The complete cup positioned on the espresso machine</figcaption>
</figure>

In the next section, you'll group SVG elements.

### Combining Shapes into Groups ###

The group element, [`<g>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g), contains other SVG elements. It's a convenient mechanism for arranging shapes into groups of your selection so that you can address and manipulate multiple elements at once.

Add a *portafilter* (that handle thing with the coffee grounds in it), using a group that's composed of a `<line>` and a `<polygon>` tag:

```html
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
```

Note that the opening and closing `<g>` tags wrap the shapes comprising the portafilter; the group also has an `id` of `"portafilter"`. You'll use that `id` later to animate the portafilter with GSAP. The portafilter reuses the steel gradient for its fill. In Figure 8, you can see the portafilter floating on the left of the machine:

<figure>
<div id="figure8">
  <style>
    #figure8 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure8 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
    <linearGradient id="steel">
      <stop offset="0%"   style="stop-color:#666" />
      <stop offset="50%"  style="stop-color:#FFF" />
      <stop offset="65%"  style="stop-color:#888" />
      <stop offset="100%" style="stop-color:#FFF" />
    </linearGradient>
    <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
    <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
    <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
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
  <script>
  </script>
</div>
<figcaption>Figure 8: A portafilter (left) drawn with a line and polygon</figcaption>
</figure>

You can refer to the relevant MDN documentation for more on the [`<line>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line) and [`<polygon>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon) tags.

### Using Clipping Paths in SVG ###

A *clipping path* is a vector shape used to cut out a 2D image, a bit like a stencil. The result is a sort of masking effect. In Figure 9, a bright red circle (the clipping path) is placed over a dark brown star (left); after applying the clipping path, the result is a star with clipped tips (right). The operation subtracts anything outside the red circle.

<figure>
  <img src="{{ site.url }}/img/isawg/clipping-path.svg" />
  <figcaption>Figure 9: Applying a circular clipping path to a star shape</figcaption>
</figure>

You'll use a clipping path to fill the coffee cup to different levels. Create a full cup of coffee using another cup-shaped path with a brown fill. And add a red rectangle to serve as a clipping path:

```html
<path
  class="stroked"
  fill="#421"
  d="M335 230
     L465 230
     C465 230, 465 310, 400 310
     C335 310, 335 230, 335 230
     Z"
/>
<rect id="cuplevel" x="325" y="250" width="150" height="60" fill="#F00" />
```

Wherever the red rectangle overlaps the coffee cup filled in brown, the brown must show through (Figure 10). But it's not quite finished yet ...

<figure>
<div id="figure10">
  <style>
    #figure10 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure10 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
    <linearGradient id="steel">
      <stop offset="0%"   style="stop-color:#666" />
      <stop offset="50%"  style="stop-color:#FFF" />
      <stop offset="65%"  style="stop-color:#888" />
      <stop offset="100%" style="stop-color:#FFF" />
    </linearGradient>
    <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
    <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
    <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
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
    <path
      class="stroked"
      fill="#421"
      d="M335 230
         L465 230
         C465 230, 465 310, 400 310
         C335 310, 335 230, 335 230
         Z"
    />
    <rect id="cuplevel10" x="325" y="250" width="150" height="60" fill="#F00" />
  </svg>
  <script>
  </script>
</div>
<figcaption>Figure 10: A cup filled brown and a (soon-to-be) red clipping path over it</figcaption>
</figure>

Convert this red rectangle to a clipping path using `<defs>` and `<clipPath>` tags. Additionally, add a `clip-path="url(#cupmask)"` attribute to the brown mug---this will apply the relevant clipping path by referencing the `id` attribute of the opening `<clipPath>` tag:

<style>#noerr .err {background-color:transparent}</style>
<div id="noerr" markdown="1">
```html
<path
  ...
  clip-path="url(#cupmask)"
/>
<defs>
  <clipPath id="cupmask">
    <rect id="cuplevel" ... />
  </clipPath>
</defs>
```
</div>

Now that the clipping path is applied (Figure 11), all you see is the brown coffee showing through:

<figure>
<div id="figure11">
  <style>
    #figure11 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure11 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
    <linearGradient id="steel">
      <stop offset="0%"   style="stop-color:#666" />
      <stop offset="50%"  style="stop-color:#FFF" />
      <stop offset="65%"  style="stop-color:#888" />
      <stop offset="100%" style="stop-color:#FFF" />
    </linearGradient>
    <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
    <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
    <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
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
    <path
      class="stroked"
      fill="#421"
      d="M335 230
         L465 230
         C465 230, 465 310, 400 310
         C335 310, 335 230, 335 230
         Z"
      clip-path="url(#cupmask11)"
    />
    <defs>
      <clipPath id="cupmask11">
        <rect id="cuplevel11" x="325" y="250" width="150" height="60" fill="#F00" />
      </clipPath>
    </defs>
  </svg>
  <script>
  </script>
</div>
<figcaption>Figure 11: The clipping path effect applied to the coffee in the mug</figcaption>
</figure>

But, the clipping path is currently sitting at the full position. Change the `y` attribute of the `cuplevel` rectangle to `310`, moving it down and emptying the mug:
```html
<rect id="cuplevel" x="325" y="310" ... />
```
A bit further along, you'll use GSAP to animate the y-position of the clipping path, moving it upward to create the illusion of a cup filling with coffee.

You can fill your clipping path in any colour you like; once it's applied, it makes no difference. I like to use bright colours so that I can easily see the shape when the effect is deactivated.

You're ready to apply some interactivity and animation to the SVG graphic.

<blockquote markdown="1">
**SVG Transformations**  
SVG transformations provide a simple way to `translate`, `rotate`, `skew`, and `scale` groups or individual shapes. They are very useful! I don't cover them here, but you can learn about them using [MDN's tutorial on Basic Transformations](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Transformations).
</blockquote>


## Adding Interactive Animation with JavaScript & GSAP

You'll click different parts of the espresso machine to trigger animations. There are many ways to animate SVG elements---natively (*CSS*, *rAF*, *WAAPI*, *VanillaJS*) and using JavaScript libraries (like *Anime*, *Mo*, and *p5*). You'll use *GSAP*, a JavaScript library especially developed for handling animation. As the GSAP developers put it---

*Think of GSAP as the Swiss Army Knife of JavaScript animation...but better. It animates anything JavaScript can touch (CSS properties, canvas library objects, SVG, React, Vue, generic objects, whatever) and it solves countless browser inconsistencies, all with blazing speed (up to 20x faster than jQuery), including automatic GPU-acceleration of transforms.*

If you're not convinced, they list a bunch more reasons on the [GSAP website](https://greensock.com/gsap/). For additional guidance on using GSAP, you can refer to the [official documentation](https://greensock.com/docs/).

### Changing the Mouse Cursor for Interactive Elements

There are three clickable items: the portafilter, start button, and cup (see Figure 1). To begin, add a CSS rule to change the mouse cursor to a pointer whenever it hovers over the (soon-to-be) clickable portafilter element:

```css
#portafilter {
  cursor: pointer;
}
```

This will help indicate to the user (by way of that gloved-pointy-finger cursor) that the portafilter is interactive.

### Programming the Portafilter Animation

You have the GSAP library linked in the `<head>` of your HTML, and an empty pair of `<script>` tags (just before the closing `</body>` tag) for adding new JavaScript code. Add some JavaScript for an event listener to that section:

```javascript
// JavaScript code goes here
document.getElementById('portafilter').addEventListener('click', function dockPortafilter() {
  alert('clicked');
});
```

Clicking the portafilter pops-up an alert box that reads "clicked". The `document.getElementById()` accepts a single argument: the `id` of the element you want to address; in this case, it's `portafilter`. You add an event listener to that element using the `addEventListener()` method---specifically, one that listens for a mouse `'click'`. You can name the `function` whatever you like (even make it nameless), so I've used `dockPortafilter()`. The indented code---`alert('clicked')`---is triggered whenever you click the portafilter.

SVG is part of the DOM, so JavaScript does pretty much all the same things in SVG as it does in HTML. In other words, you can address elements as you might in HTML, add event listeners, and so on.

Now replace the `alert()` line with three new lines:

```diff
-  alert('clicked');
+  gsap.to('#portafilter', 1, {x: 240});
+  this.removeEventListener('click', dockPortafilter);
+  this.style.cursor = 'default';
```

Click the portafilter to move it into position above the cup. The `gsap.to('#portafilter', 1, {x: 240})` smoothly animates the `'#portafilter'` element from its current location to a new x-coordinate of `240`, taking `1` second to complete the motion. Then, the `removeEventListener()` method removes the click event by referencing the function name (`dockPortafilter`), so that you cannot click/animate the portafilter again, and resets the mouse cursor (to the `default` arrow cursor).

<figure>
<div id="figure12">
  <style>
    #figure12 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure12 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
    #figure12 #portafilter {
      cursor: pointer;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
    <linearGradient id="steel">
      <stop offset="0%"   style="stop-color:#666" />
      <stop offset="50%"  style="stop-color:#FFF" />
      <stop offset="65%"  style="stop-color:#888" />
      <stop offset="100%" style="stop-color:#FFF" />
    </linearGradient>
    <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
    <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
    <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
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
    <path
      class="stroked"
      fill="#421"
      d="M335 230
         L465 230
         C465 230, 465 310, 400 310
         C335 310, 335 230, 335 230
         Z"
      clip-path="url(#cupmask12)"
    />
    <defs>
      <clipPath id="cupmask12">
        <rect id="cuplevel12" x="325" y="250" width="150" height="60" fill="#F00" />
      </clipPath>
    </defs>
  </svg>
  <script>
    document.querySelector('#figure12 #portafilter').addEventListener('click', function dockPortafilter13() {
      gsap.to('#figure12 #portafilter', 1, { x:240 });
      this.removeEventListener('click', dockPortafilter13);
      this.style.cursor = 'default';
    });
  </script>
</div>
<figcaption>Figure 12: Click the portafilter to animate it into position above the cup</figcaption>
</figure>

This animation technique is referred to as *tweening*. A tween generates intermediate frames between a start and end frame to create the appearance of smooth animation. In GSAP, you use the [`gsap.to()`](https://greensock.com/docs/v3/GSAP/gsap.to()), [`gsap.from()`](https://greensock.com/docs/v3/GSAP/gsap.from()), and [`gsap.fromTo()`](https://greensock.com/docs/v3/GSAP/gsap.fromTo()) for any properties you want to tween.

Once the portafilter animation finishes, the red button should change to green. But, this requires a callback function.

### Using a Callback Function to Initialise the Start Button

In computer programming, a *callback*  is any executable code that's passed as an argument to other code. Or, in JavaScript-speak: a function that's handed to another function as one of its arguments.

You don't want the red button operational until the portafilter is locked in position. To change the red button to green *after* the portafilter tween is complete, you'll use a callback function. Specify the callback function name using an additional `onComplete` parameter in your existing `gsap.to()` line:

```javascript
  ...
  gsap.to('#portafilter', 1, {x: 240, onComplete: activateButton});
  ...
```

The `onComplete: activateButton` tells GSAP that once the tween is complete, JavaScript must call a function named `activateButton()`. Define that function next:


```javascript
let sb = document.getElementById('startbutton');

function activateButton() {
  sb.setAttribute('fill', '#0F0');
  sb.style.cursor = 'pointer';
  sb.addEventListener('click', function greenStartButton() {
    gsap.to('#cuplevel', 2, {y: -60, onComplete: deactivateButton});
    this.removeEventListener('click', greenStartButton);
    this.style.cursor = 'default';
  });
}
```

The `activateButton()` function turns the start button green and adds a new event listener to it. When you click the start button, the `gsap.to()` line tweens the `y` position of the `#cuplevel` clipping path, moving it upward to a new y-coordinate of `-60` over a duration of `2` seconds; on completion, the callback function will run a `deactivateButton()` function. But there's no corresponding function definition for that, yet.

### Creating New SVG Elements with Javascript

You use the `createElement()` method to create new HTML elements using JavaScript. The process is very similar for SVG, except that you use [`createElementNS()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS) instead.

Add a corresponding `deactivateButton()` function for your last `gsap.to()` tween. This will add some frothy milk to the cup using a thick, semi-opaque line with rounded tips:

```js
function deactivateButton() {
  sb.setAttribute('fill','#F00');
  let cup = document.getElementById('cup');
  cup.style.cursor = 'pointer';
  cup.addEventListener('click', function addMilk() {
    let milk = document.createElementNS('http://www.w3.org/2000/svg', 'line')
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
```

The [`<line>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line) element draws a line connecting two points. To create this, I've used a `createElementNS()` function that includes an SVG namespace URI and `line` argument. The points at each of the line end are defined using `x1`, `y1`, `x2`, and `y2` attributes, which I've set using the [`setAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) method. After adding several attributes, I append the line element to the SVG (using an `appendChild()` method).

Test out the sequence of clicks in Figure 13: click the portafilter; then the button; and finally, the lip of the cup to add the frothy milk.

<figure>
<div id="figure13">
  <style>
    #figure13 svg {
      background-color: #888;
      outline: 1px dashed #666;
    }
    #figure13 svg .stroked {
      stroke: #000;
      stroke-width: 15;
    }
    #figure13 #portafilter {
      cursor: pointer;
    }
  </style>
  <svg width="100%" height="395" viewBox="0 0 800 395" style="max-width: 800px">
    <rect x="260" y="115" width="280" height="200" fill="maroon" class="stroked" />
    <linearGradient id="steel">
      <stop offset="0%"   style="stop-color:#666" />
      <stop offset="50%"  style="stop-color:#FFF" />
      <stop offset="65%"  style="stop-color:#888" />
      <stop offset="100%" style="stop-color:#FFF" />
    </linearGradient>
    <rect x="250" y="35"  rx="5" ry="5" width="300" height="80" class="stroked" fill="url(#steel)" />
    <rect x="250" y="315" rx="5" ry="5" width="300" height="45" class="stroked" fill="url(#steel)" />
    <rect x="350" y="115" rx="5" ry="5" width="100" height="45" class="stroked" fill="url(#steel)" />
    <ellipse cx="290" cy="75" rx="15" ry="15" id="startbutton"  class="stroked" fill="#F00" />
    <path
      stroke-linejoin="round"
      class="stroked"
      fill="#0EE" fill-opacity="0.4"
      id="cup13"
      d="M335 230
         L465 230
         C465 230, 465 310, 400 310
         C335 310, 335 230, 335 230
         Z"
    />
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
    <path
      class="stroked"
      fill="#421"
      d="M335 230
         L465 230
         C465 230, 465 310, 400 310
         C335 310, 335 230, 335 230
         Z"
      clip-path="url(#cupmask13)"
    />
    <defs>
      <clipPath id="cupmask13">
        <rect id="cuplevel13" x="325" y="310" width="150" height="60" fill="#F00" />
      </clipPath>
    </defs>
    <g id="restart13" style="cursor:pointer">
      <rect x="625" y="170" width="100" height="50" rx="5"  fill="#0F0" />
      <text x="653" y="201">reset</text>
    </g>
  </svg>
  <script>
    function start13() {
      document.querySelector('#figure13 #portafilter').addEventListener('click', function dockPortafilter13() {
        gsap.to('#figure13 #portafilter', 1, { x:240, onComplete: activateButton13});
        this.removeEventListener('click', dockPortafilter13);
        this.style.cursor = 'default';
      });
      let sb13 = document.querySelector('#figure13 #startbutton');
      function activateButton13() {
        sb13.setAttribute('fill', '#0F0');
        sb13.style.cursor = 'pointer';
        sb13.addEventListener('click', function greenStartButton13() {
          gsap.to('#figure13 #cuplevel13', 2, { y:-60, onComplete: deactivateButton13});
          this.removeEventListener('click', greenStartButton13);
          this.style.cursor = 'default';
        });
      }
      function deactivateButton13() {
        sb13.setAttribute('fill','#F00');
        let cup = document.getElementById('cup13');
        cup.style.cursor = 'pointer';
        cup.addEventListener('click', function addMilk13() {
          let milk = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          milk.setAttribute('stroke', '#FFF');
          milk.setAttribute('stroke-opacity', '0.4');
          milk.setAttribute('stroke-width', '15');
          milk.setAttribute('stroke-linecap', 'round');
          milk.setAttribute('x1', 353);
          milk.setAttribute('y1', 250);
          milk.setAttribute('x2', 447);
          milk.setAttribute('y2', 250);
          milk.setAttribute('id', 'milk');
          document.querySelector('#figure13 svg').appendChild(milk);
          this.removeEventListener('click', addMilk13);
          this.style.cursor = 'default';
          gsap.to('#figure13 #restart13', 0, { y:0 });
        });
      }
    }
    start13();
    // reset code
    gsap.to('#figure13 #restart13', 0, { y:450 });
    document.querySelector('#figure13 #restart13').addEventListener('click', () => {
      gsap.to('#figure13 #portafilter', 0.2, { x:0 });
      document.querySelector('#figure13 #portafilter').style.cursor = 'pointer';
      document.querySelector('#figure13 #startbutton').style.cursor = 'default';
      gsap.to('#figure13 #cuplevel13', 0.2, { y:0 });
      document.querySelector('#figure13 #milk').remove();
      gsap.to('#figure13 #restart13', 0, { y:450 });
      start13();
    });
  </script>
</div>
<figcaption>Figure 13: Click the portafilter, then the button, then the lip of the cup</figcaption>
</figure>

I've also added a reset button to restart the steps. You can find the complete code, with the reset button, on [CodePen](https://codepen.io/tabreturn/pen/BaLWgxy) (where I've split the code into separate HTML/CSS/JS panes).

<blockquote markdown="1">
**For a challenge**, see if you can add a stream of coffee, from the portafilter to the cup, while the cup is filling up.
</blockquote>


## Summary

In this tutorial, you used different SVG tags to draw rectangles, ellipses, and paths. You can use SVG attributes to apply strokes and solid- and gradient fills to those shapes. You can also define groups of elements, which is a useful technique for addressing and manipulating multiple shapes at once. Clipping paths are a handy way to clip/mask off parts of objects you want to hide.

You added GSAP animations to the SVG using JavaScript. GSAP can tween curves, colours, CSS properties, and much more. The `gsap.to()` method for tweens includes handy callback parameters, like `onComplete` to execute additional code once a tween is complete. Of course, you can combine other JavaScript with GSAP, like methods for creating new SVG elements dynamically.

But there's so much more to SVG and GSAP, and I encourage you to explore more using the links in the References section. Be sure to checkout [SVG transformation attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Transformations), too---and how [GSAP can tween them](https://greensock.com/docs/v3/GSAP/gsap.to())! If you're looking for some cool projects to apply these techniques, I'd suggest that combining SVG and GSAP is a great way to create [explorable explanations](https://en.wikipedia.org/wiki/Explorable_explanation) and unique data visualisations.

*End*

## References

* https://codepen.io/MarioD/post/interactive-hippo-button-tutorial
* https://developer.mozilla.org/en-US/docs/Web/SVG/Element
* https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
* https://greensock.com/docs/
* https://greensock.com/get-started
