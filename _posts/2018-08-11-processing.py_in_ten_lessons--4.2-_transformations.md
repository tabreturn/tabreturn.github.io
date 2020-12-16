---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 4.2: Transformations"
categories: code processing python
mathml: true
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

## Transformations

Processing's transform functions provide a convenient means of dealing with complex geometric transformations. Such operations include scaling, rotation, shearing, and translation. Suppose that you wish to rotate and scale the star shape depicted at the top-left, such that it results in the bottom-right:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-star.png" />
</figure>

The code for the *untransformed* star's ten vertices look something like this:

{% highlight py %}
beginShape()
vertex(190,66)
vertex(220,155)
vertex(310,155)
vertex(238,210)
vertex(264,298)
vertex(190,246)
vertex(114,298)
vertex(140,210)
vertex(68,155)
vertex(158,155)
endShape(CLOSE)
{% endhighlight %}

To calculate the coordinates for the *rotated + scaled* vertex positions, a *matrix* is required.

### Matrices

In mathematics, a matrix (plural: matrices) is a rectangular array of values. As an example, here's a two-by-three matrix (2 rows, 3 columns):

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>2</mn></mtd>
        <mtd><mn>5</mn></mtd>
        <mtd><mn>12</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>19</mn></mtd>
        <mtd><mn>9</mn></mtd>
        <mtd><mn>7</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Given that digital images are essentially rectangular grids of pixels, it's easy to imagine how matrices are used extensively in graphics processing. That said, matrices are applied in various fields of mathematics and other sciences.

To step you through how matrices operate, we'll take a look at a few practical examples. Things get pretty mathematical here, but the idea is to grasp a matrix as a concept. Following this section, you'll be introduced to Processing's built-in matrix functions -- meaning you'll no longer need to perform the calculations yourself.

Create a new sketch and save it as "matrices". Within the sketch's folder, create a "data" subfolder containing a copy of the grid.png and grid-overlay.png files:

<a href="{{ site.url }}/img/pitl04/grid.png" download>grid.png</a>  
<a href="{{ site.url }}/img/pitl04/grid-overlay.png" download>grid-overlay.png</a>

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-folder.png" />
</figure>

Add the following code:

{% highlight py %}
size(800, 800)
grid = loadImage('grid.png')
image(grid, 0,0)
noFill()
stroke('#FFFFFF')
strokeWeight(3)

x = 400; y = 200
w = 200; h = 200

rect(x,y, w,h)
{% endhighlight %}

In Python, semicolons (`;`) serve as a substitute for new lines. The `x`/`y`/`w`/`h` variable assignments have been arranged in the above manner as a matter of style. If you wish to avoid the semicolons, you may write each variable on its own line. The `x`/`y` values represent the coordinates for the top-left corner of the square; the `w`/`h` variables, its width and height. Run the sketch and confirm that your display window matches the image below.

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-setup.png" />
</figure>

Matrices operate on vertices, whereas the `rect()` function does not. To move forward, substitute the `rect()` function with a `quad()`.

{% highlight py %}
#rect(x,y, w,h)
quad(
  x, y,
  x, y+h,
  x+w, y+h,
  x+w, y
)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-quad.png" />
  <figcaption>Vertices labelled according to their <code>quad()</code> arguments.</figcaption>
</figure>

The output appears the same but is now based on vertices. Of course, this code does not make use of Processing's `vertex()` function, but each x-y pair of values comprises a vertex nonetheless.

#### Translate

The first transformation you'll perform is a *translation*; this involves moving the square a given distance in some direction. It's an easy enough task to accomplish without a matrix, but also ideal for introducing how matrices work.

Firstly, take note of how the top-left vertex `(x, y)` determines the positions of the other three vertices. Therefore the only matrix operation you need to perform is on the top-left vertex -- the remaining vertices can be calculated by adding the relevant `w` and `h` values. The matrix you are manipulating can, hence, be expressed as:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Or, if you substitute the variable values:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

To translate a matrix, add (or subtract) another matrix. To perform a matrix addition, add-up the values of each row:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>+</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>a</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>b</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mi>x</mi>
          <mo>+</mo>
          <mi>a</mi>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>y</mi>
          <mo>+</mo>
          <mi>b</mi>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Append the following code -- namely: two new variables representing values `a` and `b` (the distance the shape must move horizontally and vertically); a yellow stroke; and a new `quad()` that integrates the matrix calculations within its arguments:

{% highlight py %}
a = 100; b = -80
stroke('#FFFF00')
quad(
  x+a, y+b,
  x+a, y+h+b,
  x+w+a, y+h+b,
  x+w+a, y+b
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>+</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>100</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>-80</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mn>400</mn>
          <mo>+</mo>
          <mn>100</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>200</mn>
          <mo>+</mo>
          <mn>-80</mn>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Run the sketch. The new yellow square is drawn `100` pixels further right and `80` pixels closer to the top edge than the original.

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-translate.png" />
</figure>

#### Scale

To scale a shape, one must *multiply* the matrix you intend to transform by one describing a transformation. In mathematical notation, this can be expressed as:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>a</mi></mtd>
        <mtd><mi>b</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>c</mi></mtd>
        <mtd><mi>d</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

And this is the point where the power of matrices becomes evident! Depending on the values you substitute for `a`, `b`, `c`, and `d`, the result will be either a scale, reflect, squeeze, rotate, or shear operation. Take a moment to study how matrix multiplication is performed:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>a</mi></mtd>
        <mtd><mi>b</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>c</mi></mtd>
        <mtd><mi>d</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mi>x</mi>
            <mo>·</mo>
            <mi>a</mi>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>y</mi>
            <mo>·</mo>
            <mi>b</mi>
          </mfenced>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mi>x</mi>
            <mo>·</mo>
            <mi>c</mi>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>y</mi>
            <mo>·</mo>
            <mi>d</mi>
          </mfenced>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

To perform a scale, value `a` multiplies the width, and value `d` multiplies the height. To half the square's width and height, use a matrix where both `a` and `d` are equal to `0.5`:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>0.5</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>0.5</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>   
  <mo>=</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0.5</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>  
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0.5</mn>
          </mfenced>  
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Add some code that draws a new orange square half the size of the white one:

{% highlight py %}
a = 0.5; b = 0
c = 0; d = 0.5
stroke('#FF9900')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Run the sketch. The orange square is half the size of the white square, but the position has also changed:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-scale.png" />
</figure>

To reveal why the position changes, add the grid-overlay.png file to your code -- but halve its size using a third and fourth `image()` argument:

{% highlight py %}
...

grido = loadImage('grid-overlay.png')
image(grido, 0,0, 800/2,800/2)

a = 0.5; b = 0
c = 0; d = 0.5
stroke('#FF9900')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

As evidenced by the grid overlay, when one performs a scale transformation, the entire grid upon which the shape is plotted scales toward the origin (0,0).

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-scale-grid-overlay.png" />
  <figcaption>The <span style="color:#0099FF">brighter blue</span> lines and numbers are those of the grid-overlay.png file.</figcaption>
</figure>

Scaling need not be proportionate. Comment out the grid-overlay image, and adjust your `a` and `b` variables for a distorted square:

{% highlight py %}
grido = loadImage('grid-overlay.png')
#image(grido, 0,0, 800/2,800/2)

a = 0.3; b = 0
c = 0;   d = 1.8
stroke('#FF9900')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>0.3</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1.8</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>   
  <mo>=</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0.3</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>  
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>1.8</mn>
          </mfenced>  
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-scale-disproportionate.png" />
</figure>

#### Reflect

Reflecting a shape is a matter of scaling one axis by a negative value; then multiplying the other by `1`.

For a horizontal reflection use:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mo>-</mo><mi>a</mi></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

And for a vertical reflection:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mo>-</mo><mi>d</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Be aware, though: reflection operations are relative to the origin (0,0). As an example, add a new red square that's a horizontal reflection of the white original:

{% highlight py %}
a = -1; b = 0
c = 0;  d = 1
stroke('#FF0000')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>-1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>   
  <mo>=</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>-1</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>  
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>1</mn>
          </mfenced>  
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

The result is a square with a width of `-200`, drawn from a starting coordinate of `(-400,200)`. As this lies beyond left-edge of the display window, it cannot be seen.

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-reflect.png" class="fullwidth" />
  <figcaption>The green line indicates the axis of horizontal reflection.</figcaption>
</figure>

#### Rotate

Rotation transformations require the trigonometric functions `cos()` and `sin()`. Recall, though, that Processing deals in radians rather than degrees, so any arguments you pass these functions must be expressed in radians.

Add a pink version of the white square, rotated 45 degrees (roughly `0.785` radians).

{% highlight py %}
a = cos(0.785); b = -sin(0.785)
c = sin(0.785); d = cos(0.785)
stroke('#FF99FF')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>cos(0.785)</mn></mtd>
        <mtd><mn>-sin(0.785)</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>sin(0.785)</mn></mtd>
        <mtd><mn>cos(0.785)</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

The result is a 'top-left' coordinate of roughly (141, 424).

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mn>282.96</mn>
          <mo>+</mo>
          <mn>-141.37</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>282.73</mn>
          <mo>+</mo>
          <mn>141.47</mn>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mn>141.58</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>424.2</mn>
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-rotate.png" />
  <figcaption>With the square rotated 45 degrees, the top-left corner appears in a top-centre position.</figcaption>
</figure>

As with the other transformations, the axis runs through (0,0). To better visualise this, here's the rotation represented with a grid-overlay graphic:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-rotate-overlay.png" />
</figure>

#### Shear

Shearing a shape slants/skews it along the horizontal or vertical axis. The area (or volume), however, remains constant.

To shear horizontally, use:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mi>b</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

And for a vertical shear:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>x</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>y</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mi>c</mi></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>


Add a red version of the white square, sheared vertically using a coefficient of `0.4`.

{% highlight py %}
a = 1;   b = 0
c = 0.4; d = 1
stroke('#FF0000')
quad(
  x*a + y*b,         x*c + y*d,
  x*a + (y+h)*b,     x*c + (y+h)*d,
  (x+w)*a + (y+h)*b, (x+w)*c + (y+h)*d,
  (x+w)*a + y*b,     (x+w)*c + y*d
)
{% endhighlight %}

Expressed in matrix notation, this is:

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>400</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>200</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0.4</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>1</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>0</mn>
          </mfenced>  
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mfenced open="(" close=")" separators="">
            <mn>400</mn>
            <mo>×</mo>
            <mn>0.4</mn>
          </mfenced>
          <mo>+</mo>
          <mfenced open="(" close=")" separators="">
            <mi>200</mi>
            <mo>×</mo>
            <mn>1</mn>
          </mfenced>  
        </mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

Below is the result, along with a grid-overlay and x-y coordinate label:

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-shear.png" />
  <figcaption>A vertically-sheared red square.</figcaption>
</figure>

This section has introduced some fundamental transformation concepts using matrices while avoiding anything larger than 2 × 2 matrix. If you want to handle larger matrices, take a look at Python's [NumPy](http://www.numpy.org/) library.

<sup>In programming, a *library* is a collection of prewritten code. Instead of you having to write everything from scratch, Python provides a system for utilising packages of other people's code. We'll be leveraging a few different libraries in these lessons.</sup>

Next up: performing all of the above transformations without having to worry about the math!

#### Processing Transform Functions

After having done transformations the hard way, grasping Processing's transform functions is a breeze.

Create a new sketch and save it as "transform_functions". Within the sketch's folder, create a "data" subfolder containing a copy of the grid.png and grid-overlay.png files:

<a href="{{ site.url }}/img/pitl04/grid.png" download>grid.png</a>  
<a href="{{ site.url }}/img/pitl04/grid-overlay.png" download>grid-overlay.png</a>

Add the following setup code (note that grid-overlay.png is loaded but not drawn):

{% highlight py %}
size(800,800)
noFill()
stroke('#FFFFFF')
strokeWeight(3)
grid = loadImage('grid.png')
image(grid, 0,0)
grido = loadImage('grid-overlay.png')
{% endhighlight %}

Add a white rectangle, drawn in the same position as that of the last sketch. Because you'll be using Processing's built-in transform functions, a `rect()` will work fine, i.e. there's no need to use a `quad()` unless you prefer to.

{% highlight py %}
x = 400; y = 200
w = 200; h = 200
rect(x,y, w,h)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-setup.png" />
</figure>

Add a `translate(100,-80)` function and a duplicate `rect()` in yellow:

{% highlight py %}
...
x = 400; y = 200
w = 200; h = 200
rect(x,y, w,h)

translate(100,-80)
stroke('#FFFF00')
rect(x,y, w,h)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-matrices-translate.png" />
</figure>

Add a square, 100 × 100 pixels in width/height, with an x-y coordinate of zero:

{% highlight py %}
...
stroke('#FF0000')
rect(0,0, 100,100)
{% endhighlight %}

Run the sketch. The red square can be seen cut-off near the top-left of the display window. The shapes do not change position -- rather it's the coordinate system that does. To better visualise this behaviour, draw the grid-overlay.png after the `translate()` function:

{% highlight py %}
...
x = 400; y = 200
w = 200; h = 200
rect(x,y, w,h)

translate(100,-80)
image(grido, 0,0)
stroke('#FFFF00')
rect(x,y, w,h)
stroke('#FF0000')
rect(0,0, 100,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-functions-translate-overlay.png" />
</figure>

To return the red square to the top-left corner, one could add a `translate(-100,80)` to offset the prior one -- or better yet, isolate the translation. Wrap the `translate`, `image`, and yellow square code in a `pushMatrix()` and `popMatrix()` function. These will create a new matrix stack within which only the nested shapes (a yellow square, for now) are translated:

{% highlight py %}
...
x = 400; y = 200
w = 200; h = 200
rect(x,y, w,h)

pushMatrix()
translate(100,-80)
image(grido, 0,0)
stroke('#FFFF00')
rect(x,y, w,h)
popMatrix()

stroke('#FF0000')
rect(0,0, 100,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-functions-translate-matrix.png" />
</figure>

This makes for a useful drawing approach -- moving the coordinate system to avoid keeping track using variables, then adding a `popMatrix()` to return to the original coordinate system. It ultimately depends on what works best for what you are drawing.

In addition to `translate()`, Processing's 2D transform functions include, [rotate()](http://py.processing.org/reference/rotate.html), [scale()](http://py.processing.org/reference/scale.html), [shearX()](http://py.processing.org/reference/shearX.html), and [shearY()](http://py.processing.org/reference/shearY.html).

What is more, you may combine these as you wish. Add further transform functions to the existing matrix stack:

{% highlight py %}
pushMatrix()
translate(100,-80)
rotate(0.785)
shearY(0.4)
image(grido, 0,0)
stroke('#FFFF00')
rect(x,y, w,h)
popMatrix()
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl04/transformations-functions-multiple.png" />
</figure>

You'll be using a mix of coordinate tracking and transformation techniques in the tasks to come.

<p style="text-align:right" markdown="1">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
