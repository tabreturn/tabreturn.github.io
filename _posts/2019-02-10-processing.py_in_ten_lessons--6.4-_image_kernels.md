---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 6.4: Image Kernels"
categories: code processing python
mathml: true
image: /img/pitl03/iteration-for-loop-adaption.png
description: A series of tutorials on Processing.py, introducing non-programmers to the fundamentals of computer programming in a visual context.
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

## Image Kernels

If you've ever sharpened or blurred a digital image, it's likely that the software you were using relied on an *image kernel* to process the effect. Moreover, the fields of computer vision and machine learning utilise image kernels for feature- detection and extraction.

An image kernel, put simply, is a small [matrix]({% post_url 2018-08-11-processing.py_in_ten_lessons--4.2-_transformations %}#matrices) that passes over the pixels of your image manipulating the values as it moves along. To illustrate, here's a three-by-three blur kernel in action. The *kernel* (left) begins with its centre placed over the first (top-left) pixel of the source image. A new (first) pixel value is calculated using the centre and eight neighbouring cells sampled in the kernel.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mona-lisa-1.png" class="fullwidth" />
  <figcaption>Left: kernel sample. Right: newly processed pixel.</figcaption>
</figure>

For any edge pixels, though, the kernel 'hangs' over the boundary and samples empty cells. One common solution is to extend the borders pixels outward.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mona-lisa-1-edge.png" class="fullwidth" />
</figure>

This process advances pixel-by-pixel. In this instance, the kernel motion is left-to-right, row-by-row -- although, as long as every pixel is processed, the sequence does not matter.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mona-lisa-2.png" />
  <figcaption>The kernel motion is left-to-right, row-by-row.</figcaption>
</figure>

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mona-lisa-3.png" />
  <figcaption>When the kernel reaches the final pixel, the process is complete.</figcaption>
</figure>

The magic part is how the kernel combines the nine values into one -- a form of mathematical *convolution*, where each pixel is weighted and then added to its local neighbours. In the illustration below, the source pixels are labelled *a*--*i* and the matrix cells, *1*--*9*.

<style>
  #image-kernel-matrix-sample, #image-kernel-matrix-kernel {
    color: #00FF00;
    display: grid;
    float: left;
    font-style: italic;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    height: 120px;
    overflow: hidden;
    text-align: center;
    width: 120px;
  }
  #image-kernel-matrix-sample div, #image-kernel-matrix-kernel div {
    box-sizing: border-box;
    padding-top: 7px;
  }
  #image-kernel-matrix-sign {
    float: left;
    font-size: 1.5em;
    padding-top: 45px;
    padding-right: 2px;
    text-align: center;
    width: 40px;
  }
  #image-kernel-matrix-kernel div {
    float: left;
    outline: #00FF00 2px solid;
  }
  #image-kernel-matrix-result {
    background-color: #795130;
    float: left;
    height: 40px;
    margin-top: 40px;
    width: 40px;
  }
</style>
<div id="image-kernel-matrix-sample">
  <div style="background-color:#714931">a</div>
  <div style="background-color:#623c2a">b</div>
  <div style="background-color:#6b472f">c</div>
  <div style="background-color:#7d5535">d</div>
  <div style="background-color:#6d452d">e</div>
  <div style="background-color:#6b462f">f</div>
  <div style="background-color:#956935">g</div>
  <div style="background-color:#885d31">h</div>
  <div style="background-color:#744b2c">i</div>
</div>
<div id="image-kernel-matrix-sign"> × </div>
<div id="image-kernel-matrix-kernel" style="outline:#00FF00 4px solid">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>
<div id="image-kernel-matrix-sign"> = </div>
<div id="image-kernel-matrix-result"> </div>
<br style="clear:both" />

The convolution operation multiplies each cell by its corresponding partner. So, a × 1, then b × 2, and so on through to i × 9. The results of all these multiplications are then added together, producing a blurred colour value.

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>a</mi></mtd>
        <mtd><mi>b</mi></mtd>
        <mtd><mi>c</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>d</mi></mtd>
        <mtd><mi>e</mi></mtd>
        <mtd><mi>f</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>g</mi></mtd>
        <mtd><mi>h</mi></mtd>
        <mtd><mi>i</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>×</mo>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mi>1</mi></mtd>
        <mtd><mi>2</mi></mtd>
        <mtd><mi>3</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>4</mi></mtd>
        <mtd><mi>5</mi></mtd>
        <mtd><mi>6</mi></mtd>
      </mtr>
      <mtr>
        <mtd><mi>7</mi></mtd>
        <mtd><mi>8</mi></mtd>
        <mtd><mi>9</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
  <mo>=</mo>
  <mrow>
    <mfenced open="(" close=")" separators=""><mi>a</mi><mo>·</mo><mi>1</mi></mfenced>
    <mo>+</mo>
    <mfenced open="(" close=")" separators=""><mi>b</mi><mo>·</mo><mi>2</mi></mfenced>
    <mo>+</mo>
    <mo>&hellip;</mo>
    <mo>+</mo>
    <mfenced open="(" close=")" separators=""><mi>i</mi><mo>·</mo><mi>9</mi></mfenced>
  </mrow>
</math>

<sup markdown="1">If you are a math/ML/CV/other nerd -- you may point out that that kernel has not been flipped, so this is, in fact, a *cross-correlation* and not a convolution. You are correct. However, we'll be using symmetrical kernels, so correlation and convolution coincide.</sup>

The numbers *1*--*9* are simply variables. With the theory out of the way, it's time to program your own image kernels so that you can experiment with different combinations of weightings.

### Roll Your Own Image Kernel

Create a new sketch and save it as "image_kernels".

Download this image of a Kuba people's *Mwaash aMbooy mask* and place it your sketch's "data" sub-directory:

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/mwaash-ambooy-grey.png" download>mwaash-ambooy-grey.png</a>

Begin with the following code:

{% highlight py %}
size(1000,720)
background('#004477')
noStroke()
mwaashambooy = loadImage('mwaash-ambooy-grey.png')
image(mwaashambooy, 0,0)
{% endhighlight py %}

The image has been greyscaled prior to loading. A single colour channel will be easier to manage at first.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-load.jpg" />
  <figcaption>
    Mwaash aMbooy mask<br />
    <a rel="nofollow" class="external text" href="http://www.brooklynmuseum.org">Brooklyn Museum</a> [<a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> / converted to greyscale]
  </figcaption>
</figure>

As with the previous tasks, the processed version will appear in the blue area to the right. To begin, add a loop to your sketch.

{% highlight py %}
halfwidth = width/2
x = 0
y = 0

for i in range(halfwidth*height):

    if i%halfwidth==0 and i!=0:
        y += 1
        x = 0
    x += 1
{% endhighlight py %}

Because we are sampling greyscale pixels, it does not matter if you extract the red, green, or blue channel -- remember that these are equal for any shade of grey. Add the following line to the loop:

{% highlight py %}
    sample = red( get(x,y) )
{% endhighlight py %}

Next, create a new grey `color`, assign it to a variable named `kernel`, and use `set` to draw a corresponding pixel in the right half of the window:

{% highlight py %}
    kernel = color(sample,sample,sample)

    set(x+halfwidth, y, kernel)
{% endhighlight py %}

We could use a `get(x,y)` as the third argument of the `set()` function and thereby forgo the previous two lines. The visual result is an exact duplicate of the source, anyhow. The purpose of these seemingly unnecessary steps is to verify that everything works for now; we'll adapt this code as we go.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-duplicate.jpg" />
  <figcaption>Before proceeding, ensure that your Display window shows two greyscale masks.</figcaption>
</figure>

With each iteration, we must sample nine pixels for the kernel. The loop begins at the top-left pixel, meaning that, on the first iteration the kernel samples five 'empty' pixels that lie beyond the edges. To keep things simple, we'll not use the 'extend' trick; rather, Processing will record these as black. This will result in slightly darkened border pixels, but nothing too noticeable.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-zoom.png" />
  <figcaption>The loop begins at the top-left pixel.</figcaption>
</figure>

Replace the `sample` variable with a list. This new list structure grabs the nine pixels at once.

{% highlight py %}
    #sample = red( get(x,y) )
    sample = [
      red(get(x-1,y-1)), red(get(x,y-1)), red(get(x+1,y-1)),
      red(get(x-1,y))  , red(get(x,y))  , red(get(x+1,y)),
      red(get(x-1,y+1)), red(get(x,y+1)), red(get(x+1,y+1))
    ]
{% endhighlight py %}

Next, replace the `kernel` variable with a list that multiplies the sample values by some kernel weightings. To start, we'll perform an *identity* operation -- which is math-speak for "returns the same values it was provided".

{% highlight py %}
    #kernel = color(sample,sample,sample)
    kernel = [
      0*sample[0], 0*sample[1], 0*sample[2],
      0*sample[3], 1*sample[4], 0*sample[5],
      0*sample[6], 0*sample[7], 0*sample[8]
    ]
{% endhighlight py %}

To illustrate this operation using the matrix diagram from earlier -- we have black left/top edge pixels and a matrix of zeroes with a `1` in the centre.

<div id="image-kernel-matrix-sample">
  <div style="background-color:#000000"></div>
  <div style="background-color:#000000"></div>
  <div style="background-color:#000000"></div>
  <div style="background-color:#000000"></div>
  <div style="background-color:#303030"></div>
  <div style="background-color:#242424"></div>
  <div style="background-color:#000000"></div>
  <div style="background-color:#262626"></div>
  <div style="background-color:#202020"></div>
</div>
<div id="image-kernel-matrix-sign"> × </div>
<div id="image-kernel-matrix-kernel" style="outline:#00FF00 4px solid; font-style:normal;">
  <div>0</div>
  <div>0</div>
  <div>0</div>
  <div>0</div>
  <div>1</div>
  <div>0</div>
  <div>0</div>
  <div>0</div>
  <div>0</div>
</div>
<br style="clear:both" />

Recall though, that after multiplying, we add-together the products. The Python `sum()` function makes things easy for you, adding up all the numbers in a list. Replace the existing `set` line as below.

{% highlight py %}
    #set(x+halfwidth, y, kernel)
    r = sum(kernel)
    set( x+halfwidth, y, color(r, r, r) )
{% endhighlight py %}

Run the sketch. The results appear the same as before (an exact duplicate). You are now ready to begin experimenting with different kernel weightings.

#### Box Blur

The box blur is a simple kernel that averages adjacent pixel values. The result is a 'softer' image with lower contrast.

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>0.11</mn></mtd>
        <mtd><mn>0.11</mn></mtd>
        <mtd><mn>0.11</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0.11</mn></mtd>
        <mtd><mn>0.11</mn></mtd>
        <mtd><mn>0.11</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0.11</mn></mtd>
        <mtd><mn>0.11</mn></mtd>
        <mtd><mn>0.11</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

{% highlight py %}
    kernel = [
      0.11*sample[0], 0.11*sample[1], 0.11*sample[2],
      0.11*sample[3], 0.11*sample[4], 0.11*sample[5],
      0.11*sample[6], 0.11*sample[7], 0.11*sample[8]
    ]
{% endhighlight py %}

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-kernel-blur.jpg" />
  <figcaption>Box blur.</figcaption>
</figure>

#### Edge Detection

As the name implies, edge detection methods aim to identify edge points/boundaries within an image. The lighter the resultant pixel appears, the more pronounced the change is in image brightness.

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>-4</mn></mtd>
        <mtd><mn>1</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

{% highlight py %}
    kernel = [
      0*sample[0], 1*sample[1], 0*sample[2],
      1*sample[3],-4*sample[4], 1*sample[5],
      0*sample[6], 1*sample[7], 0*sample[8]
    ]
{% endhighlight py %}

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-kernel-edge-detection.jpg" />
  <figcaption>Edge detection.</figcaption>
</figure>

#### Sharpen

Sharpening makes light pixels lighter and dark pixels darker. The result is an increased contrast and 'crisper' edges. The kernel is, effectively, the inverse of an edge detect.

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>-1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>-1</mn></mtd>
        <mtd><mn>5</mn></mtd>
        <mtd><mn>-1</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>-1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

{% highlight py %}
    kernel = [
      0*sample[0],-1*sample[1], 0*sample[2],
     -1*sample[3], 5*sample[4],-1*sample[5],
      0*sample[6],-1*sample[7], 0*sample[8]
    ]
{% endhighlight py %}

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-kernel-sharpen.jpg" />
  <figcaption>Sharpen.</figcaption>
</figure>

These are a few common kernel types. However, image kernels need not be limited to 3 × 3, symmetric matrices and can operate on whatever channel(s) you feed them (full-colour RGB, HSB, etc.). Like many things matrix-related, this stuff can get very involved. We'll not venture any deeper, although the final section of lesson 6 covers Processing's [filter](#filters) functions, many of which rely on convolution matrices.

### Colour Emboss Task

In this task, the challenge is to apply an emboss to a colour image. You may use your existing sketch or create a new one. Download the colour version of the *Mwaash aMbooy mask* and place it your sketch's "data" sub-directory:

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/mwaash-ambooy-colour.png" download>mwaash-ambooy-colour.png</a>

Do not forget to load the colour image:

{% highlight py %}
...
mwaashambooy = loadImage('mwaash-ambooy-colour.png')
image(mwaashambooy, 0,0)
...
{% endhighlight py %}

The emboss kernel creates the illusion of depth by emphasising contrast in a given direction.

<math>
  <mfenced open="[" close="]">
    <mtable>
      <mtr>
        <mtd><mn>2</mn></mtd>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>0</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>-1</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>0</mn></mtd>
        <mtd><mn>-1</mn></mtd>
        <mtd><mn>-2</mn></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>

The final result looks like this:

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-kernel-emboss-colour.jpg" class="fullwidth" />
</figure>

If you've no idea where to start, consider a separate kernel for each R/G/B channel.

<p style="text-align:right" markdown="1">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
