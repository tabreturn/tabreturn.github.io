---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 06: Tiny Blocks of Colour"
categories: code processing python
mathml: true
---

***Covered in this lesson:***  
<a href="#colour-channels"><em>colour channels</em></a> /
<a href="#halftone"><em>halftone</em></a> /
<a href="#image-kernels"><em>image kernels</em></a> /
<a href="#filters-and-blends"><em>filters and blends</em></a> /
<a href="#tint-and-transparency"><em>tint and transparency</em></a>

---
&nbsp;  
In this tutorial, we will look at a few cool image processing techniques. You are already familiar with the `image()` function, which you have used in combination with `loadImage()` to draw image files to the display window. GIF, JPG, and PNG files are all [*raster*](https://en.wikipedia.org/wiki/Raster_graphics) graphics formats -- that is, digital images comprised of a pixel grid. We will look at reading values off individual- as well as groups of pixels and then manipulating them to create Photoshop-esque filters. To manage these arrays of pixel values, we'll rely on a number of the techniques that you picked up in [lesson 05]({% post_url 2019-01-15-processing.py_in_ten_lessons--05-_art_of_the_state %}), in particular, the combining of loops with lists.

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

To begin, we will peek under the hood of some image file formats; this will provide useful insight into how the colours of individual pixels are controlled.

### Image Formats

Each time you run a sketch, Processing generates a new or updated display window. Like a GIF, JPG, or PNG image, the graphic presented in the display window is raster-based. Using the [`saveFrame()`](http://localhost:4000/code/processing/python/2018/08/10/processing.py_in_ten_lessons-04-_beta_eq_fps_gt_12.html#saving-frames) function one can capture the current frame in TIFF (`.tif`) format. Alternatively, a (filename) argument ending in `.gif`, `.jpg`, or `.png` produces a compressed image file. With TIFF, Processing employs no compression resulting in larger files. *TARGA* (.tga) is also an option, but these lessons avoid covering it in favour of focussing on the more common web-browser-supported formats.

Below is a screenshot of a sketch. The code is not important. Instead, focus on what the display window renders (a red and white striped pattern) and the file sizes of each version saved.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-stripes-file-sizes.png" class="fullwidth" />
  <figcaption>
    <table>
      <tr><td> bands.gif </td><td>&ndash; 298 bytes </td></tr>
      <tr><td> bands.jpg </td><td>&ndash; 4 KB      </td></tr>
      <tr><td> bands.png </td><td>&ndash; 233 bytes </td></tr>
      <tr><td> bands.tga </td><td>&ndash; 796 bytes </td></tr>
      <tr><td> bands.tif </td><td>&ndash; 31 KB     </td></tr>
    </table>
  </figcaption>
</figure>

Before proceeding with an explanation for these differences, here is a 3-point primer on file size:

* you know that computers store digital information as ones and zeroes; you refer to each 1 or 0 as a *bit* (a binary digit);
* there are 8 bits in a *byte*, for example, `10110110`;
* a *kilobyte* (KB) is 1000 bytes.

The "bands.tif" file is by far the largest, weighing in at a comparatively hefty 31 kilobytes. Recall that Processing uses no compression when saving TIFF files, so this is no surprise. But how exactly does a TIFF store pixel values, and what is the relation to size? To begin to answer this question, consider the hexadecimal value for <span style="color:red">red</span>:

<code>#<span style="color:#FF0000">FF</span><span style="color:#00FF00">00</span><span style="color:#0000FF">00</span></code>

Each pair of digits has been coloured according to the RGB primary it controls. Alternatively, we could rewrite this using decimal values:

<code>(<span style="color:#FF0000">255</span>, <span style="color:#00FF00">0</span>, <span style="color:#0000FF">0</span>)</code>

Alas, this still isn't pure ones and zeroes. Information stored digitally requires conversion to binary. It figures, right? Because binary comprises ones and zeroes, and so do bits. To convert from a zero in decimal to a zero in binary is easy -- it's `0` in both systems. The same goes for `1`. But what about `2`? Binary has only two digits to work with, whereas decimal has ten. Below is an abridged conversion table:

Decimal &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| Binary
----------------------------------------- | ----------
0                                         | `0`
1                                         | `1`
2                                         | `10`
3                                         | `11`
4                                         | `100`
5                                         | `101`
...                                       |
255                                       | `11111111`
                                          |
----------------------------------------- | ----------

We count on our fingers, so a base-10 (decimal) system is fitting. For instance, suppose you are counting the number of people who pass you in the street. To keep track, you begin by forming a fist with each hand; when the first person passes you, you raise your left thumb. For the second person, you extend your left index finger; and so forth. I know this seems menial but bear with me.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-decimal-counting-7.svg" />
  <figcaption>
    Counting to seven on two hands.
  </figcaption>
</figure>

You reach ten people and have run out of fingers. For the eleventh passerby, you ask a friend sitting beside to 'store' a one on her fingers. You then close your fists beginning at one again (your left thumb). When you reach twenty, your friend extends her left index finger, and you start at one again. In all, twenty-six people pass you.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-decimal-counting-26.svg" />
  <figcaption>
    Your friend's final count is 2 (left); yours is 6 (right).
  </figcaption>
</figure>

To proceed beyond a hundred with this system, you'll need to find another friend. From this exercise, we gather that for each power of ten you require an additional digit -- i.e. 10, 100, 1000.

Now, imagine you had no fingers (or thumbs). Once you've counted to two, you run out of 'stumps' to count on. When counting in *binary* (base-2), every time you reach some power of two an additional digit is required. The table below provides binary-to-decimal conversions for powers of two.

Binary &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| Decimal
---------------------------------------- | -------
`0`                                      | 0
`10`                                     | 2
`100`                                    | 4
`1000`                                   | 8
`10000`                                  | 16
`100000`                                 | 32
`...`                                    |
                                         |
---------------------------------------- | -------

If you were using your friends to help hold digits, counting to 32 requires five assistants. Don't worry, though, this conversion process is handled for you by Processing so that you will never need to deal directly with binary.

In [lesson 01]({% post_url 2018-06-12-processing.py_in_ten_lessons--01-_hello_world %}#colour) you received little explanation for how hexadecimal actually works. You have probably been wondering where those letters from, right? Well, hexadecimal is a *base-16* system. Just imagine some alien race with sixteen fingers. To accommodate these extra fingers, we include the letters `A` to `F`.

Hexadecimal &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| Decimal
--------------------------------------------- | -------
`...`                                         |
`8`                                           | 8
`9`                                           | 9
`A`                                           | 10
`B`                                           | 11
`C`                                           | 12
`D`                                           | 13
`E`                                           | 14
`F`                                           | 15
`10`                                          | 16
`11`                                          | 17
`...`                                         |
`FF`                                          | 255
                                              |
--------------------------------------------- | -------

People have used all sorts of [numeral systems](https://en.wikipedia.org/wiki/List_of_numeral_systems#Standard_positional_numeral_systems). For example, the French use base-10 until seventy, after which point it's a mixture of base-10 and base-20. The *Telefol* and *Oksapmin* speaking people of Papua New Guinea use a *Heptavigesimal* (base-27) system, where the words for each number are named according to the 27 body parts they use for counting.

<sup>If you are wondering, &#960; is irrational in every numeral system. But, on second thought, what if 3.141... were the base? 😕</sup>

Let's return to binary numbers. Here are a few sequences:

Binary &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| Decimal
---------------------------------------- | -------
`10000000`                               | 128
`10000001`                               | 129
`10000010`                               | 130
`...`                                    |
`11111111`                               | 255
`100000000`                              | 256
                                         |
---------------------------------------- | -------

Note how 255 is the highest decimal that can be represented using eight bits. It is no coincidence that you express the brightest red your screen can display as `(255, 0, 0)`. Or that white is `(255, 255, 255)`. At a hardware level, these integers are all converted to binary. As indicated in the table above, eight `1`s in binary is equivalent to 255 in decimal. Let us rewrite red in binary:

<code><span style="color:#FF0000">11111111</span><span style="color:#00FF00">00000000</span><span style="color:#0000FF">00000000</span></code>

I have padded the green and blue values with zeroes so that each colour is eight bits in length. White would be a complete string of ones. In all, there are 8 × 3 = 24 bits. Hence, this is 24-bit colour, which can describe a whopping 256 × 256 × 256 = 16,777,216 possible (yet not necessarily distinguishable) colour variations.

Now, back to the sketch. To remind you, this the visual output we are dealing with:

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-stripes.png" style="max-width:100px" />
</figure>

The size of the (uncompressed) TIFF file is 31 KB. Here is why:

* the graphic is 100 pixels wide by 100 pixels high, and therefore comprised of 100 × 100 = 10,000 pixels;
* each pixel contains one 24-bit colour value;
* 10,000 pixels × 24-bit colour values = 240,000 bits;
* there are 8 bits in a byte, so that's 240,000 bits ÷ 8 = 30,000 bytes.
* 30,000 bytes = 30 kilobytes (KB).

Okay, so we have accounted for 30 KB, but what about the extra 1 KB? I have used [Hex Fiend](https://ridiculousfish.com/hexfiend/) -- an open source hex editor -- to open and inspect the raw data of the "bands.tif" file. Of course, the data is ultimately stored as binary, but it is easier to make sense of hexadecimal. You can follow along using a hex editor too, but there is no need.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-tiff-hex.png" class="fullwidth" />
  <figcaption>The "bands.tif" file opened in Hex Fiend. Scrolling down reveals alternating clusters of <code>FF0000</code> and <code>FFFFFF</code> values.</figcaption>
</figure>

The numbers appear in byte groupings of three (clusters of six `0`--`F` numbers). Scrolling through the file reveals alternating stretches of `FF0000` and `FFFFFF` values -- that is, red and white respectively; this is what we would expect, after all, the graphic is a pattern of alternating white and red stripes. However, the first three lines contain a bunch of seemingly random numbers; then, there are `000000`s (black?) up to byte 768 (as indicated by the count in the left margin).

<figure>
  <div style="background-position:-40px -20px; background-color:white; background-size:300%; background-image:url({{ site.url }}/img/pitl06/image-formats-tiff-hex.png); height:400px; max-width:400px"></div>
  <figcaption>The first three lines contain no <code>FF0000</code> or <code>FFFFFF</code> values. The first stretch of <code>FF0000</code>'s appear at byte 768.</figcaption>
</figure>

At the bottom of the window, you can spot the file size in bytes.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-tiff-hex-size.png" />
</figure>

That is 768 bytes over our expected 30,000. This accounts for the extra 1 KB, which the file manager has rounded-up to 31 KB. Removing everything up to where the first `FF0000` cluster reduces the file size to precisely 30 KB.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-tiff-hex-adjusted.png" />
  <figcaption>Deleting everything up to the first <code>FF0000</code> instance leaves you with a file of 30,0000 bytes.</figcaption>
</figure>

So what was stored in bytes 0 to 768? The beginning section of the file contains vital information to identify it as a TIFF and specify parameters for -- but not limited to -- width, height, bit-depth, and orientation. Leaving this information out will most certainly break the graphic.

Processing generates TIFF files using the format's most essential features. The TIFF 6.0 specification can support various compression schemes, layers, deep colour (16- as opposed to 8-bits per channel), transparency, pages, and multiple colour models (RGB, CMYK, LAB, etc.). Be aware, though, that many of these extra features are extensions, and reader support will vary. Overall, TIFF is a very versatile format, well suited for working on graphics between different applications and for archiving purposes. Essentially, TIFF rolls all of GIF, JPG, and PNG's features into a single specification. Nevertheless, it's not supported on the Web.

### GIF vs JPG vs PNG

If you are looking at an image on a web-page, chances are it's either a GIF, JPG, or PNG. Scalable Vector Graphic format (SVG) is also popular, but not designed for raster graphics. Size is important to consider when you are transferring files across an internet connection. Smaller equals faster, so all three formats employ compression techniques.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png" class="fullwidth" />
  <figcaption>A web-page that includes a GIF, JPG, and PNG image</figcaption>
</figure>

The details of data compression are complicated, mathematical, and beyond the scope of these lessons. Nonetheless, you'll gain a high-level insight into how compression algorithms operate. The main focus, though, is on why you would elect to use one format over the other. If you are familiar with some raster editing software, such as GIMP or Photoshop, it's a good idea to play around with the export options to see how the different GIF, JPG, and PNG parameters affect the quality and size of these files.

#### GIF

GIF is the oldest of the three formats. There's an ongoing war over whether it is pronounced "**g**if" (with a hard *g*, like in gift) or as "**j**iff". The format utilises the *Lempel–Ziv–Welch* (LZW) data compression scheme. Our image is a sequence of red and white stripes, and this is just the type of graphic to which GIF is best suited. More specifically, images consisting primarily of areas filled in flat colour. For instance, graphs, diagrams, text, and line art. Unsurprisingly, it outperforms JPG and PNG for our red-white stripy pattern, consuming just 298 bytes. Opening the "bands.gif" file in a hex editor reveals how small it is, and also provides insight into how the format works.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-gif-hex.png" class="fullwidth" />
  <figcaption>The hexadecimal values for red (<code>FF0000</code>) and white (<code>FFFFFF</code>) have been outlined in green.</figcaption>
</figure>

Despite there being thousands of red and white pixels in the graphic, the hex editor contains a single instance of `FF0000` and `FFFFFF`. This pair of colour values makes up the image's *colour table*. What precedes the colour table identifies the file as GIF and describes the width, height, and other characteristics. What follows the colour table (after the `2C` and terminating with a `3B`) is compressed graphics data. Rather than specifying the value of each pixel, the LZW algorithm matches each pixel with one of the two colour table entries. But LZW can take this indexing system one step further. Each red stripe is a continuous string of 100 × 10 = 1000 hexadecimal values. This string can in-turn be stored in a table, so that each time the red stripe reappears, the relevant table entry is repeated.

GIF has its limitations. Most notably, the colour table may not exceed 256 colours. For greater GIF compression one reduces this palette further. The GIF below consists of around sixteen colours and the reduction in range is quite evident. Placing alternating colours in checkerboard-type arrangements -- called *dithering* -- helps make up for the limited colour table, but it's often easy to discern this pattern, and it works against the compressibility. GIF supports transparency, but the level of opacity is either 0% or 100% (nothing between).

<figure>
  <div style="background-position:-5px -80px; background-image:url({{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png); height:300px; max-width:400px"></div>
  <figcaption>The dithering pattern is most discernable wherever colours blend gradually into one another (e.g. the yellow to orange blend running down the letters). GIF cannot support the semi-transparent blues in the glow, so there is a fade to white up to the point where absolute transparency begins (and the starry background beneath shows through).</figcaption>
</figure>

GIF also supports animation, which is handy for short loops of cats doing silly things.

#### JPG

JPG (pronounced "jay-peg"; often bearing the extension `.jpeg`) uses a *lossy* compression that does not support any type of transparency. Unlike *lossless* GIFs or PNGs, each time you reopen, perform a minuscule edit, and save a JPG file, the image quality degrades further. The compression algorithm works by taking advantage of the human psychovisual system, disregarding information we are less likely to detect visually. Humans are more sensitive to [differences in brightness than differences in colour](https://en.wikipedia.org/wiki/Chroma_subsampling), a characteristic that JPG leverages. The format works well for images with graduated colour, like photographs, but causes noticeable *artefacts* to appear wherever there is a sharp contrast.

<figure>
  <div style="background-position:-432px -80px; background-image:url({{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png); height:300px; max-width:400px"></div>
  <figcaption>A highly compressed JPG. The artefacts are most apparent around the edges of the letters. As there is no support for transparency, a white background extends to the boundaries of the graphic.</figcaption>
</figure>

Most raster software provides some or other of quality 'slider' when exporting to JPG format. Less quality equals smaller file size, but you will find that certain photographs/graphics can handle more compression before they begin to look horrible.

#### PNG

PNG -- pronounced "pee-en-jee" or "ping" -- was developed as a replacement for the proprietary GIF format. Although GIF patents expired in 2004, PNG had introduced a number of compelling improvements. Like GIF, PNG compression is lossless, but the PNG with no 256 colours palette restriction. Moreover, transparency can range from anywhere between 0% to 100%, allowing for semi-opaque pixels. This is accomplished using an additional *alpha* channel. For instance, an opaque blue (i.e. no alpha) can be expressed as:

<code><span style="color:#FF0000">00</span><span style="color:#00FF00">00</span><span style="color:#0000FF">FF</span></code>  
Or, in binary:  
<code><span style="color:#FF0000">00000000</span><span style="color:#00FF00">00000000</span><span style="color:#0000FF">11111111</span></code>

That is 24 bits in all -- with 8 bits for each R/G/B *channel*. A 32-bit hexadecimal value provides room for the additional alpha channel; of course, this consumes more storage/bandwidth too. The same blue with an opacity of around 25% is, hence, stored as:

<code><span style="color:#FF0000">00000000</span><span style="color:#00FF00">00000000</span><span style="color:#0000FF">11111111</span><span style="color:#999999">01000001</span></code>

This alpha feature is especially handy for placing images seamlessly above other background images.

<figure>
  <div style="background-position:-864px -80px; background-image:url({{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png); height:300px; max-width:400px"></div>
  <figcaption>The PNG produces smooth gradients using a large (greater than 256) palette of colours. The glow is comprised of many levels of semi-opaque blues and blends beautifully over the starry background. As a result, one cannot detect the boundaries of the graphic. </figcaption>
</figure>

Notably, PNGs do not support animation. The APNG (Animated Portable Network Graphics) specification is an extension to the format, but it has failed to gain traction with some major (Microsoft) web browsers.

When dealing with photographs, JPGs tend to trump PNGs in terms of quality-for-size. PNGs, however, excel when you require transparency or desire GIF-style sharpness with a greater range of colour.

There are a few up-and-coming Web image formats (WEBP, HEIC) that promise comparable quality in smaller files. Whether they gain traction depends largely on support from authoring tools and browsers. To reiterate, though, it's best to experiment with the different formats to see how they work and which is most appropriate for a given graphic you wish to optimise.

## Colour Channels

Each pixel on your screen is mixed using three primary colours: red, green, and blue. Another way to think of this is three monochrome images (or *channels*) that control the levels of each primary, combined into one image.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-channels.png" class="fullwidth" />
  <figcaption>
    August Macke's <q>Modefenster</q> separated into red, green, and blue channels.<br />
  </figcaption>
</figure>

Notice how the whiter areas of *Modefenster*, such as the foreground woman's face, appear solid for every channel. Recall that, to produce white, the red, green, and blue channels must combine at full intensity.

Sometimes it is preferable to work with four channels. For instance, you may need an alpha channel for transparency. Another scenario is print design. Colour printers use a four-colour *CMYK* model: <span style="color:#0EE">cyan</span>, <span style="color:magenta">magenta</span>, <span style="color:#EE0">yellow</span>, and **black**. If you have ever replaced ink cartridges in your printer, you have probably noticed this. For CMYK, desktop publishing file formats can handle 32-bit colour values. For instance, a blue mixed with 100% cyan and 50% appears as:

<div style="background-color:#0067A4; display:inline-block; width:80px; height:2.5em; margin-bottom:1em"></div>

In hexadecimal notation, it is:

<code><span style="color:#0EE">FF</span><span style="color:magenta">80</span><span style="color:#EE0">00</span><span style="color:black">00</span></code>

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-cmyk.png" class="fullwidth" />
  <figcaption>
  Mixing CMYK colours using <a href="https://krita.org">Krita</a>. The painting is Hokusai's <q><a href="https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg">The Great Wave off Kanagawa</a></q>.
  </figcaption>
</figure>

Observe Krita's *Channels* panel to the lower-right; whiter areas indicate higher values for the respective channel. For instance, the Cyan channel's bright regions correspond to the blue areas in the wave. The Magenta channel appears like a duller copy of the Cyan channel; the predominant blue is mostly a mix of around 100% cyan and 50% magenta. By manipulating colour channels, you can control the overall hue, saturation, and lightness. If you are familiar with software like GIMP or Photoshop, or perhaps more basic image editing software, you have likely performed such operations before.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-gimp.png" class="fullwidth" />
  <figcaption>GIMP's Hue-Saturation tool. In this instance, the saturation has been reduced to <code>-85</code>. GIMP's Channels panel (to the lower right) separates the image into its Red, Green, Blue, and Alpha channels.</figcaption>
</figure>

Processing has various functions for manipulating colour channels. Experimenting with these reveals the inner workings of applications like Photoshop.

### RGB Channels

 Create a new sketch and save it as "colour_channels". Download this copy of August Macke's *Modefenster* and place it your sketch's "data" sub-directory:

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/modefenster.png" download>modefenster.png</a>

Add the following setup code:

{% highlight py %}
size(1000,720)
background('#004477')
noStroke()
modefenster = loadImage('modefenster.png')
image(modefenster, 0,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-setup.jpg" />
</figure>

We will be sampling parts of the painting and placing the processed output in the empty blue area to the right. The first function you need to know is the [`get()`](https://py.processing.org/reference/get.html). This is used to read the colours of pixels that lie within the display window. First, grab a section of pixels by adding a `get()` to the bottom of your code:

{% highlight py %}
grab = get(0,0, 200,200)
{% endhighlight %}

The arguments are the same as those of the `rect()` function; the variable `grab` is assigned a copy of all the pixels within a rectangular area beginning at the top left (`0,0 ...`) and extending 200 pixels across and 200 pixels down (`... 200,200`). Add an `image()` function to draw the pixels into the empty area on the right:

{% highlight py %}
grab = get(0,0, 200,200)
image(grab, 600,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-area.jpg" />
</figure>

Alternatively, you can make use of the [`copy()`](https://py.processing.org/reference/copy.html) function which additionally accepts arguments for the destination coordinates and scale.

{% highlight py %}
#    src. coords --> dest. coords
copy(0,0,200,200,    600,600,100,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-copy.jpg" />
  <figcaption>A copy and scale (shrink) in one function.</figcaption>
</figure>

To retrieve a single pixel's colour, use a `get()` function without width and height arguments. If any pixel sampled lies outside of the image window, the `get()` returns black.

{% highlight py %}
singlepixel = get(190,200)
fill(singlepixel)
rect(700,300, 200,200)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-single.jpg" />
  <figcaption>A square filled with the colour sampled from a single pixel.</figcaption>
</figure>

Intriguingly, if you print the `singlepixel` variable a (negative) integer appears; this is how Processing stores colours in memory. You do not need to understand how this works because there are functions for converting these integer-based data types to standard hexadecimal and RGB.

{% highlight py %}
print(singlepixel) # -248525
{% endhighlight %}

We can now build a duplicate image on the right by sampling each pixel and placing its clone 500 pixels (half the width of the display window) to the right. Sure, it would be easier to grab the whole area of the painting, but the pixel-by-pixel approach is necessary for the upcoming steps. Add this loop to the end of your code:

{% highlight py %}
halfwidth = width/2
x = 0
y = 0

for i in range(halfwidth*height):

    if i%halfwidth==0 and i!=0:
        y += 1
        x = 0
    x += 1

    pixel = get(x,y)
    set(x+halfwidth, y, pixel)
{% endhighlight %}

You should be quite comfortable with loops now. In this instance, the `range` is half the display window's width by the full height. In a pixel-by-pixel, row-by-row manner, the loop `get`s each pixel and `set`s its clone accordingly. The `set()` function accepts three arguments: an x-coordinate, then y-coordinate, then colour. Run the sketch. Your earlier experiments are drawn over with new pixels.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-set.jpg" />
</figure>

With each iteration, we will now separate the pixel values into the independent R, G, and B channels.  Comment out the existing `set()` line and add a `red()`, `green()` and `blue()` function to extract the three channel values.

{% highlight py %}
    ...

    pixel = get(x,y)
    #set(x+halfwidth, y, pixel)

    r = red(pixel)
    g = green(pixel)
    b = blue(pixel)
{% endhighlight %}

With each pixel sampled, variables `r`, `g`, and `b` are each assigned a value between `0` and `255`. Excellent! That's a familiar range, right? Remember, `255` equals `FF` equals `11111111`.

The [`color()`](https://py.processing.org/reference/color.html) function converts RGB values into the integer types that `get()` and `set()` work with (the way Processing stores colours in memory). Add the following lines to the end of your loop:

{% highlight py %}
    rgb = color(r, g, b)
    set( x+halfwidth, y, rgb )
{% endhighlight %}

Run the sketch. The result is the same as before. We have split the colour into its R/G/B constituents then merged them back together using the `color()` function.

Now, let's visualise the channels beginning with red. Recall that the Channels panels in both Krita and GIMP (and Photoshop, for that matter) display greyscale thumbnails. Greys are an equal mix of red, green, and blue -- therefore, to represent a red channel in greyscale, use the red value for all three `color` arguments.

{% highlight py %}
    #rgb = color(r, g, b)
    set( x+halfwidth, y, color(r,r,r) )
{% endhighlight %}

If the current iteration's pixel is bright red, the `color(r, r, r)` line is equivalent to `color(255, 255, 255)`. This means that the most vivid reds will appear as white, that no red is black, and that everything else is some shade of grey. Run the code.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-red.jpg" />
  <figcaption>Red channel (right).</figcaption>
</figure>

Note how the red "MODE" sign registers as white; this indicates red values of near 100%. The yellow stripes in the awning over the window are also white; this is because yellow is mixed using 100% red and 100% green. Comment out the red `set()` line and try a green channel instead.

{% highlight py %}
    #set( x+halfwidth, y, color(r,r,r) )
    set( x+halfwidth, y, color(g,g,g) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-green.jpg" />
  <figcaption>Green channel (right).</figcaption>
</figure>

The green channel confirms the prominence of green in the awning. The sign, however, has very little green -- or blue, for that matter. You can try a `set()` line for blue if you wish to confirm this. Any area in the original image that is grey, white, or black, will possess equal quantities of red, green, and blue.

To convert the image to greyscale, rather than greyscale representations of each channel, average out the three values.

{% highlight py %}
...
channelavg = (r + g + b) / 3
greyscale = color(channelavg, channelavg, channelavg)
set( x+halfwidth, y, greyscale )
{% endhighlight %}

Include the following coefficients to accommodate the greater number of green receptors in the human eye. The yellows will, otherwise, not appear bright enough.

{% highlight py %}
channelavg = (r*0.89 + g*1.77 + b*0.33) / 3
{% endhighlight %}

In the image below, the area within the green brackets exhibits the calibrated values. Note how the awning's bright yellow and darker orange strip appear as the same shade of grey with the straightforward averaged values.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-greyscale.jpg" />
  <figcaption>Greyscale conversion (right). Note the more pronounced stripes within the green brackets.</figcaption>
</figure>

To invert the colours (like a [film negative](https://en.wikipedia.org/wiki/Negative_(photography))), subtract each `r`/`g`/`b` value from its maximum channel value of 255.

{% highlight py %}
...
invcolour = color(255-r, 255-g, 255-b)
set( x+halfwidth, y, invcolour )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-invert.jpg" />
  <figcaption>Inverted image channels (right).</figcaption>
</figure>

See if you can work out how to create an inverted greyscale version.

### HSB Channels

The very first lesson introduced Processing's various [colour modes]({% post_url 2018-06-12-processing.py_in_ten_lessons--01-_hello_world %}#colour-mode). The colour mixing scheme can be switched from RGB to HSB (Hue, Saturation, Brightness) using the `colorMode()` function. You can think of HSB as an alternative set of channels that may be more appropriate for what you need to accomplish. Switch the `colorMode` to HSB and add a new loop to the end of your existing "colour_channels" code. If you wish to, you can comment out the previous loop -- or instead, not bother and just allow the new loop to draw over what's there already.

{% highlight py %}
colorMode(HSB, 360, 100, 100)
x = 0
y = 0

for i in range(halfwidth*height):

    if i%halfwidth==0 and i!=0:
        y += 1
        x = 0
    x += 1
{% endhighlight %}

Working in HSB makes it far easier to shift hues, adjust saturation, and alter brightness. The `colorMode()` arguments have now set Processing to operate like the GIMP colour mixer depicted below.

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-gimp-mixer.png" />
  <figcaption>GIMP colour mixer with the HSB values highlighted.</figcaption>
</figure>

Use the `hue()`, `saturation()`, and `brightness()` functions to separate the pixel values into three HSB channels.

{% highlight py %}
    ...
    pixel = get(x,y)
    h = hue(pixel)
    s = saturation(pixel)
    b = brightness(pixel)
{% endhighlight %}

To create an exact copy of the painting, use a `set()` line with the `h`/`s`/`b` variables as arguments:

{% highlight py %}
    set( x+halfwidth,y, color(h, s, b) )
{% endhighlight %}

Adjusting the hue involves taking a pixel's hue value and rotating the GIMP mixer triangle to produce a new rotation value between 0 and 360 degrees. This is akin to shifting a hue slider in GIMP or Photoshop.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-gimp-hs.png" class="fullwidth" />
  <figcaption>Adjusting the Hue slider.</figcaption>
</figure>

But simply adding degrees of rotation to the `h` variable is problematic. For example, what if the `h` is `40` and we subtracted `50`. The result is 40 - 50 = -10 degrees, which lands outside of the permitted range. Instead, rotating past 0 or 360 should reset the degrees to zero, then subtract/add the remaining difference. This way 40 - 50 = 350 degrees. This is an example of *clock arithmetic*. The 'wrap-around' concept is nothing new to you. If it is currently three AM, and somebody asks what time was it four hours ago, you wouldn't say "minus one AM"? Clock arithmetic is an application of *modular arithmetic* -- the favourite pastime of our good friend the modulo operator! Add a new `set()` line that subtracts `50` from the hue and performs a `%360` on the result.

{% highlight py %}
    #set( x+halfwidth,y, color(h, s, b) )
    set( x+halfwidth,y, color((h-50)%360, s, b) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-hue.jpg" />
  <figcaption>Rotating/shifting the hue channel by 50°.</figcaption>
</figure>

To invert the colour, but keep the same brightness, pick the colour on the opposite side of the colour wheel by adding 180°.

{% highlight py %}
    set( x+halfwidth,y, color((h+180)%360, s, b) )
{% endhighlight %}

For the most vivid colours possible, set the saturation value to maximum (100%) for every pixel.

{% highlight py %}
    set( x+halfwidth,y, color(h, 100, b) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-saturation.jpg" />
  <figcaption>The hue remains the same, but the saturation has been pushed to maximum.</figcaption>
</figure>

You are now familiar with colour channel management. You can apply this theory to all sorts of colour adjustment. These principles also lay the foundation for the next sections where we look at filter effects. There are a few other functions for the colour data type that we did not cover. These omissions include:

* [`alpha()`](#tint-and-transparency), for extracting alpha (transparency) values;
* [`blendColor()`](https://py.processing.org/reference/blendColor.html), for blending two colours using a selection of modes;
* [`lerpColor()`](https://py.processing.org/reference/lerpColor.html), for calculating the colour(s) that lie between two other colours;
* [`loadPixels()`](https://py.processing.org/reference/lerpColor.html), [`pixels()`](https://py.processing.org/reference/pixels.html), and [`updatePixels()`](https://py.processing.org/reference/updateYixels.html), which work together to load and manipulate pixels in the display window. This is a faster, albeit more complicated, alternative to using `get()` and `set()`.

## Halftone

Suppose that you have an image of continuous tones, i.e. an infinite-like range of blended greys. For this example, we will use a photograph of Elisabet Ney's *Lady Macbeth* sculpture (below). The image is to appear in a newspaper printed in black & white, so you convert the image to greyscale and email it off to the publishers.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-lady-macbeth.jpg" />
  <figcaption>
    Elisabet Ney's <q>Lady Macbeth</q> in colour and greyscale.<br />
    <a href="https://de.wikipedia.org/wiki/User:Ingrid_Fisch" class="extiw" title="de:User:Ingrid Fisch">Ingrid Fisch</a> [<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>]
  </figcaption>
</figure>

Of course, in the 1870s it wasn't this simple. There was no email and, more critically, publishers were still figuring how to print photographs. In spite of this limitation, printers managed to reproduce illustrations. Illustrations were etched into wood then cast into metal plates; which could then be coated in ink and used to transfer the images to paper. The challenge with photographs was continuous tones -- or more specifically, how to render solid black ink in a multitude of grey shades. The solution was *halftone*; tiny dots of varying size that create the illusion of grey when viewed from a sufficient distance. The exact details of the process are not important; suffice to say it is all handled digitally today.

The images below contrast four different halftone techniques. The simplest approach is no halftone (top-left). Here, a brightness threshold is used to determine which shades of grey are rendered black *or* white. The stochastic halftone (top-right) uses *dots of equal size*, adjusting their spacing to emulate darker/lighter tones. Such dithering techniques can, therefore, be described as *frequency modulated*.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-comparison.png" class="fullwidth" />
  <figcaption>
    Clockwise starting top-left: 50% threshold; stochastic halftone; halftone lines; round dots.
  </figcaption>
</figure>

*Amplitude modulated* halftones (bottom-left and bottom-right) rely on varying sized dots in a grid-like arrangement, or evenly-spaced lines of variable weight. These patterns, however, can be formed using various other shapes (squares, ellipses, etc.).

Halftone techniques remain an essential part of printing today. Halftone separations for each CMYK channel create the optical effect of full-colour imagery when overlayed as semi-opaque inks.

<figure>
  <img src="{{ site.url }}/img/pitl06/wikimedia-backup/Halftoningcolor.svg" />
  <figcaption>
    Three examples of colour halftoning with CMYK separations.<br />
    Pbroks13d (SVG version) and Slippens (PNG original) [Public domain], <a href="https://commons.wikimedia.org/wiki/File:Halftoningcolor.svg">via Wikimedia Commons</a>
  </figcaption>
</figure>

Round dots are the most commonly used shapes. If you magnify a print you should be able to *spot* them.

### Halftone Dots

Create a new sketch and save it as "halftones". Download this copy of Leonardo da Vinci's *Mona Lisa* and place it your sketch’s "data" sub-directory:

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/mona-lisa.png" download>mono-lisa.png</a>

Add the following setup code:

{% highlight py%}
size(1000,720)
background('#004477')
noFill()
monalisa = loadImage('mona-lisa.png')
image(monalisa, 0,0)
{% endhighlight %}

As with the previous sketch, we will be rendering a processed version in the empty blue space on the right.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-setup.jpg" />
</figure>

Our first halftone will consist of amplitude-modulated circles. We will begin by adding the global variables and main loop. The image will be divided into 'cells'. In effect, these cells control the 'resolution' of the halftone.

{% highlight py%}
halfwidth = width/2
coltotal = 50.0                  # number of cells per row
cellsize = halfwidth/coltotal    # width/height of each cell
rowtotal = ceil(height/cellsize) # cells per column
col = 0
row = 0

for i in range( int(coltotal*rowtotal) ):

    x = int(col*cellsize)
    y = int(row*cellsize)
    col += 1

    if col >= coltotal:
        col = 0
        row += 1

    rect(x,y, cellsize,cellsize)
{% endhighlight %}

Most of this code should look familiar, although the [`ceil()`](https://py.processing.org/reference/ceil.html) function may be new to you. The *ceiling* function performs a round-up operation on floating point values. For example, `ceil(9.1)` would return `10`. It is necessary to employ it here to prevent any half rows from stopping short of the bottom of the display window. A `rect()` line is included to visualise the cells. Run the code.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-setup-cells.jpg" />
</figure>

For the halftone effect, we want to sample the pixel a the centre of each cell. To accomplish this, add half the width/height to the x/y coordinate. Also, comment out the `rect()` line.

{% highlight py%}
    #rect(x,y, cellsize,cellsize)
    x = int(x+cellsize/2)
    y = int(y+cellsize/2)
    pixel = get(x,y)
{% endhighlight %}

Next, using the brightness value of each pixel sampled, we calculate an amplitude (`amp`) for each halftone dot. The amount, however, must be reduced by a factor of `200` so that the dots are not too large.

{% highlight py%}
    ...
    pixel = get(x,y)
    b = brightness(pixel)
    amp = 10*b/200.0
{% endhighlight %}

Finally, add the relevant stroke and fill properties, then the ellipse/circle function.

{% highlight py%}
    noStroke()
    fill('#FFFFFF')
    ellipse(x+halfwidth,y, amp,amp)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-circles.jpg" />
  <figcaption>The completed circular halftone effect.</figcaption>
</figure>

You are not limited to circles or white fills. In the next two tasks, you will be challenged to replicate two new halftone effects.

### Pixel Art Task

Using the "haltones" sketch you have been working on, recreate the pixelated effect below.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-pixelated.jpg" />
  <figcaption>Pixelated halftone effect.</figcaption>
</figure>

You should be able to comment out the circular-halftone-specific lines and make use of the existing loop.

### ASCII Art Task

For ASCII art, you will need to decide on a set of characters to serve as your colour ramp. For ten shades, you can use the following sequence (which begins with a space character). The glyphs range from lightest on the left to darkest at the right.

` .:-=+*#%@`

With so few shades, expect substantial [*posterisation*](https://en.wikipedia.org/wiki/Posterization) -- the "conversion of a continuous gradation of tone to several regions of fewer tones, with abrupt changes from one tone to another" (Wikipedia). The final result should look something like this:

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-ascii.png" />
  <figcaption>Pixelated ASCII art effect (zoomed in).</figcaption>
</figure>

There are many halftone effects to explore. By riffing off the techniques covered here, you can come up with all sorts of interesting results. For example, see what happens when you combine the circular, pixel, and ASCII effects.

## Image Kernels

If you have ever sharpened or blurred a digital image, it's likely that the software you were using relied on an *image kernel* to process the effect. Moreover, the fields of computer vision and machine learning utilise image kernels for feature- detection and extraction.

An image kernel, put simply, is a small [matrix]({% post_url 2018-08-10-processing.py_in_ten_lessons--04-_beta_eq_fps_gt_12 %}#matrices) that passes over the pixels of your image manipulating the values as it moves along. To illustrate, here is a three-by-three blur kernel in action. The *kernel* (left) begins with its centre placed over the first (top-left) pixel of the source image. A new (first) pixel value is calculated using the centre and eight neighbouring cells sampled in the kernel.

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

The magic part is how the kernel combines the nine values into one -- a form of mathematical *convolution*, where each pixel is weighted and then added to its local neighbours. In the illustration below, the source pixels are labelled *a*--*f* and the matrix cells, *1*--*9*.

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

<sup markdown="1">If you are a math/ML/CV/other nerd -- you may point out that that kernel has not been flipped, so this is, in fact, a *cross-correlation* and not a convolution. You are correct. However, we will be using symmetrical kernels, so correlation and convolution coincide.</sup>

The numbers *1*--*9* are simply variables. With the theory out the way, it's time to program your own image kernels so that you can experiment with different combinations of weightings.

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

We could use a `get(x,y)` as the third argument of the `set()` function and thereby forgo the previous two lines. The visual result is an exact duplicate of the source, anyhow. The purpose of these seemingly unnecessary steps is to verify that everything works for now; we will adapt this code as we go.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-duplicate.jpg" />
  <figcaption>Before proceeding, ensure that your Display window shows two greyscale masks.</figcaption>
</figure>

With each iteration, we must sample nine pixels for the kernel. The loop begins at the top-left pixel, meaning that, on the first iteration the kernel samples five 'empty' pixels the lie beyond the edges. To keep things simple, we will not use the 'extend' trick; rather, Processing will record these as black. This will result in slightly darkened border pixels, but nothing too noticeable.

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

Next, replace the `kernel` variable with a list that multiplies the sample values by some kernel weightings. To start, we will perform an *identity* operation -- which is math-speak for "returns the same values it was provided".

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

These are a few common kernel types. However, image kernels need not be limited to 3 × 3, symmetric matrices and can operate on whatever channel(s) you feed them (full-colour RGB, HSB, etc.). Like many things matrix-related, this stuff can get very involved. We will not venture any deeper, although the final section of this lesson covers Processing's [filter](#filters) functions, many of which rely on convolution matrices.

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

If you have no idea where to start, consider a separate kernel for each R/G/B channel.

## Filters and Blends

If you are a user of raster graphics software, such as GIMP or Photoshop, you have almost certainly encountered filters and blend modes. On a technical level, blend modes -- and most filters -- operate on colour channels. Processing's filter and blend functions span a selection of common image processing algorithms. Technically speaking, one can program these effects using the techniques covered thus far. We look at replicating a few of the simpler blend modes.

### Filters

Filters range from utilitarian and understated to hideously gaudy. To be fair, most have their place, but perhaps some users lack an understanding of how much of -- and to which parts of an image -- a given filter should be applied. Some impressive developments are being made in this area thanks in part to advances in artificial intelligence. For instance, here is a Vincent van Gogh imitation of the Mwaash aMbooy mask created using [DeepArt.io](https://deepart.io/)'s neural algorithm.

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-filter-deepart.jpg" />
  <figcaption>
    Created with <a href="https://deepart.io/">DeepArt.io</a>.
  </figcaption>
</figure>

Rather than list all of GIMP's filters, here are the top-level categories into which they are arranged: blur, enhance, distort, light and shadow, noise, edge detect, generic, combine, artistic, decor, map, render, web, and animation. On average, a category contains around ten items, so that's a lot of filters! Processing has eight filters in total.

The Processing [`filter()`](https://py.processing.org/reference/filter.html) function requires a predefined filter name as an argument. Depending on the effect, there may be a second argument. If you want to experiment, download this photo of Florentijn Hofman's *Rubber Duck*. Alternatively, you may prefer just to read over this section. The tutorial provides an image comparing all of the effects further along.

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/480px-Rubber_Duck_in_Sydney,_January_5,_2013.jpg" download>480px-Rubber_Duck_in_Sydney,_January_5,_2013.jpg</a>

If you have decided to write some code, place the image in the sketch's "data" sub-directory and add the following code:

{% highlight py %}
size(480,480)
background('#004477')
rubberduck = loadImage(
  '480px-Rubber_Duck_in_Sydney,_January_5,_2013.jpg'
)
image(rubberduck, 0,0)
textSize(28)
text('Rubber Duck', 20,150)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-filter-start.jpg" />
  <figcaption>
    <q>Rubber Duck</q> by Florentijn Hofman, in Darling Harbour as part of the 2013 Sydney Festival.<br />
    Newtown grafitti [<a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a> / added title], <a href="https://commons.wikimedia.org/wiki/File:Rubber_Duck_in_Sydney,_January_5,_2013.jpg">via Wikimedia Commons</a>
  </figcaption>
</figure>

To blur the image, add the following line to the end of your code:

{% highlight py %}
filter(BLUR)
{% endhighlight %}

For more blurring, BLUR accepts an additional level parameter. For example:

{% highlight py %}
filter(BLUR, 3)
{% endhighlight %}

The array of images below compares each of Processing's filter arguments. The caption beneath lists the corresponding function calls.

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-filter-types.jpg" class="fullwidth" />
  <figcaption>
    <style>
      #filter-code { display:grid; grid-template-columns:1fr 1fr 1fr }
      @media screen and (max-width:580px) {
        #filter-code { grid-template-columns:1fr }
      }
    </style>
    <em>Corresponding filter code (left-to-right, row-by-row):</em>
    <div id="filter-code">
      <div>No filter</div>
      <div><code>filter(BLUR,3)</code></div>
      <div><code>filter(DILATE)</code> × 2</div>
      <div><code>filter(ERODE)</code> × 2</div>
      <div><code>filter(GRAY)</code></div>
      <div><code>filter(INVERT)</code></div>
      <div><code>filter(POSTERIZE,3)</code></div>
      <div><code>filter(THRESHOLD)</code></div>
      <div>Posterise × 3 & blur × 3</div>
    </div>
  </figcaption>
</figure>

You already know how to program a number of these filters manually. If you are wondering how `DILATE` works, it's a kernel that replaces the matrix centre pixel with its brightest neighbour; the `ERODE`, on the other hand, picks the darkest. Note that the effect manipulates everything drawn before the `filter()` line. Any subsequent code is unaffected. For example:

{% highlight py %}
...
filter(BLUR)
textSize(15)
text('Sydney, 2013', 20,180)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-filter-ordering.jpg" />
  <figcaption>The <q>Sydney, 2013</q> line comes after the filter function and is therefore unaffected.</figcaption>
</figure>

If you are using animation, the filter effects become cumulative. In other words, a `filter(BLUR)` placed within a `draw()` block results in an image that is blurred more and more with each frame.

By combining multiple built-in filters, your own programmed effects, and even some animation, you can create some mesmerising effects. Explore the GIMP/Photoshop/Krita/etc. filters for more inspiration.

### Image Blend Modes

When I began using raster graphics software (Photoshop 5.5 in 1999) I was thrilled with how I could manipulate photographs using a variety of touch-up, filter, and distortion tools. Initially, blend modes were something I seemed to gloss over and never touch again. In time, though, I grew more accustomed to incorporating them in my workflow. Today, I swear by them. Before, I had always found their names confusing and never understood which blend to select for the desired effect. Most of the time I'd simply cycle through them until I struck the right look. When I eventually learnt about the underlying math, everything made sense.

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-blend-gimp-blending-modes.png" class="fullwidth" />
  <figcaption>GIMP's layer blend modes. What does "Addition" even mean, anyhow?</figcaption>
</figure>

If you have no experience with blend modes, the screenshot below should help explain how they work. Let me begin by stating that layers are an integral component of raster graphic applications. Elements are placed on different layers so that they can be moved, scaled, and reordered to form a desired composition. By default, layers are opaque, obscuring any elements that lie further down the 'stack'. By adjusting the blending mode, you control how the lower layers are affected. For example, a *multiply* blend mode has a tint-like effect.

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-blend-gimp-multiply-blend.png" class="fullwidth" />
  <figcaption>The top-most <q>red</q> layer has its blend <q>Mode</q> set to <i>Multiply</i>.</figcaption>
</figure>

Perhaps you have never used blend modes. Or, maybe you're that Photoshop whiz who intuitively selects modes but can't begin to explain how it they work? Today, we unravel the mystery.

We will begin by programming our own blend mode, then move onto Processing's built-in functions. Create a new sketch and save it as "blends". In the "data" sub-directory, add a copy of the <a href="{{ site.url }}/img/pitl06/wikimedia-backup/480px-Rubber_Duck_in_Sydney,_January_5,_2013.jpg" download>Rubber Duck</a> image file from the last exercise. Add some code to draw a sequence of rainbow bands and place the image.

{% highlight py %}
size(960,480)
background('#004477')
noStroke()
halfwidth = width/2

fill('#FF0000'); rect(0,0,width,80)
fill('#FF9900'); rect(0,80,width,80)
fill('#FFFF00'); rect(0,160,width,80)
fill('#00FF00'); rect(0,240,width,80)
fill('#0099FF'); rect(0,320,width,80)
fill('#6633FF'); rect(0,400,width,80)

rubberduck = loadImage(
  '480px-Rubber_Duck_in_Sydney,_January_5,_2013.jpg'
)
image(rubberduck, 0,0)
{% endhighlight %}

Run the sketch and confirm that the visual output matches the image below.

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-blend-image-setup.jpg" />
</figure>

As with the previous exercises, a duplicate of the duck will be drawn to the right -- in this case, over the rainbow colours. The difference this time will be the blending modes you apply in the process. Start by setting the `colorMode`'s RGB values so that they range from `0`--`1` (as opposed to the default `0`--`255`).

{% highlight py %}
colorMode(RGB, 1)
{% endhighlight %}

In this new mixing scheme, bright red is `color(1,0,0)`  
This will help when it comes to performing blend mode calculations.

Next, use a loop to draw an exact duplicate to the right.

{% highlight py %}
x = 0
y = 0

for i in range(halfwidth*height):

    if i%halfwidth==0 and i!=0:
        y += 1
        x = 0
    x += 1

    layer1 = get(x, y)
    r = red(layer1)
    g = green(layer1)
    b = blue(layer1)
    layer2 = color(r, g, b)
    set( x+halfwidth, y, layer2 )
{% endhighlight %}

Splitting the `layer1` value into its composite channels only to recombine them seems redundant, but structures the code for the upcoming steps. Run the code to confirm the correct visual output.

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-blend-image-duplicate.jpg" />
  <figcaption>
    Duplicate duck drawn to the right.
  </figcaption>
</figure>

This is the simplest blend mode, *normal*, where the upper 'layer' completely conceals everything beneath it (the rainbow colours). We may not have actual layers, but can conceptually visualise the idea as such:

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-blend-normal.png" />
  <figcaption>
    Normal blend mode.
  </figcaption>
</figure>

From here onward, we will make adjustments to the `r`/`g`/`b` variables to achieve different blends. Let's try a *multiply*. Multiply gets its name from the arithmetic involved, whereby the corresponding channel values of the upper and lower layers are multiplied together. Adapt your code:

{% highlight py %}
    ...
    layer1 = get(x, y)

    layer0 = get(x+halfwidth, y)
    r = red(layer0) * red(layer1)
    g = green(layer0) * green(layer1)
    b = blue(layer0) * blue(layer1)

    layer2 = color(r, g, b)
    ...
{% endhighlight %}

The result is a rainbow-sequence of colour tints.

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-blend-multiply.png" />
  <figcaption>
    Multiply blend mode.
  </figcaption>
</figure>

I'm sure that you can guess how the *add*, and *subtract* modes work? While you can manually program your own blend modes, it's easier to reach for Processing's [`blend()`](https://py.processing.org/reference/blend.html) and [`blendMode()`](https://py.processing.org/reference/blendMode.html) functions. The `blend()` has a few more options, but `blendMode()` is the approach recommended by Processing's developers. Below is a table of the various `blendMode()` arguments/modes and their calculations on the red channel. Of course, blue and green channels would be likewise affected.

`BLEND`          | *the default/normal blend mode*
`ADD`            | *`r = red(layer0) + red(layer1)`*
`DARKEST`        | *`r = min( red(layer0), red(layer1) )`*
`DIFFERENCE``   `| *`SUBTRACT` that switches operands to always get a positive value*
`EXCLUSION`      | *`DIFFERENCE` with a lower contrast*
`LIGHTEST`       | *`r = max( red(layer0), red(layer1) )`*
`MULTIPLY`       | *`r = red(layer0) * red(layer1)`*
`REPLACE`        | *`BLEND` with no alpha support*
`SCREEN`         | *`r = 1-(1-red(layer0)) * (1-red(layer1))`*
`SUBTRACT`       | *`r = red(layer0) - red(layer1)`*
|||

The following image compares each of above-listed modes -- beginning with `BLEND` at the top-left, then proceeding left-to-right, row-by-row, ending on `SUBTRACT` at the bottom-right.

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-blend-image-types.jpg" class="fullwidth" />
  <figcaption>
    <style>
      #blend-code { display:grid; grid-template-columns:1fr 1fr 1fr }
      @media screen and (max-width:580px) {
        #blend-code { grid-template-columns:1fr }
      }
    </style>
    <em>Corresponding blend code (left-to-right, row-by-row):</em>
    <div id="blend-code">
      <div><code>blendMode(BLEND)</code></div>
      <div><code>blendMode(ADD)</code></div>
      <div><code>blendMode(DARKEST)</code></div>
      <div><code>blendMode(DIFFERENCE)</code></div>
      <div><code>blendMode(EXCLUSION)</code></div>
      <div><code>blendMode(LIGHTEST)</code></div>
      <div><code>blendMode(MULTIPLY)</code></div>
      <div><code>blendMode(SUBTRACT)</code></div>
      <div><code>blendMode(SCREEN)</code></div>
    </div>
  </figcaption>
</figure>

You can replace the entire `for` loop with this `blend()` and `image()` function.

{% highlight py %}
blendMode(MULTIPLY)
image(rubberduck, halfwidth,0)
'''
x = 0
...
{% endhighlight %}

Be aware, though, the blend mode will persist for any subsequent images or shapes that you draw. For example:

{% highlight py %}
blendMode(MULTIPLY)
image(rubberduck, halfwidth,0)
fill('#FF0000')
ellipse(halfwidth,height/2, 300,300)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/filters-and-blends-blend-multiply-persist.jpg" />
  <figcaption>
    Everything below the <code>blendMode(MULTIPLY)</code> line exhibits multiply behaviour.
  </figcaption>
</figure>

To 'reset' to the default, use the `blendMode` argument, `BLEND`

{% highlight py %}
    blendMode(MULTIPLY)
    image(rubberduck, halfwidth,0)
    fill('#FF0000')
    ellipse(halfwidth,height/2, 300,300)
    blendMode(BLEND)
    # back to normal hereafter ...
{% endhighlight %}

Graphic designers, VFX artists, and animators rely on blending modes for many neat tricks. For instance, *multiply* and *subtract* are handy for extracting logos from white or black backgrounds; *darkest* is great for sky replacements; while *difference* is useful for comparing and aligning video footage. With a bottom-up understanding of how blend modes work, you can take full advantage of them in your creative workflows.

## Mondrian Task

In this challenge, you get to fix a partially complete Processing adaptation of Piet Mondrian's *Composition with Red, Blue, and Yellow*.

<figure>
  <img src="{{ site.url }}/img/pitl06/wikimedia-backup/1010px-Piet_Mondriaan,_1930_-_Mondrian_Composition_II_in_Red,_Blue,_and_Yellow.png" />
  <figcaption>
    <q>Composition II in Red, Blue, and Yellow</q><br />
    Piet Mondrian [Public domain]
  </figcaption>
</figure>

For this task, the smoothing will be disabled; this will result in sharper lines. If you are looking to disable *anti-aliasing* (default setting), then the [`noSmooth()`](https://py.processing.org/reference/noSmooth.html) function is what you are after. Anti-aliasing makes edges appear smoother by producing intermediate blended pixels that slightly blur the boundary.

<figure>
  <img src="{{ site.url }}/img/pitl06/mondrian-task-nosmooth.png" />
  <figcaption>Zoomed-in versions of <code>smooth()</code> and <code>noSmooth()</code> on the lower-left- and right respectively.</figcaption>
</figure>

Create a new sketch and save it as "mondrian". Copy-paste in all of the code below.

{% highlight py %}
size(480,480)
background('#004477')
noSmooth()
noStroke()
'''
# red square
fill('#FF8800'); rect(0,0,width,350)
blendMode(___)
fill('#008800'); rect(0,0,width,350)

# white bottom edge
blendMode(___)
fill('#FF0000'); rect(105,350,375,130)
fill('#00BB00'); rect(105,350,375,130)
fill('#000088'); rect(105,350,375,130)

# yellow corner
blendMode(___)
fill('#FFFF00'); rect(435,0,45,height)

# white right edge squares
blendMode(___)
noStroke()
fill('#FFFFFF'); rect(435,350,45,54)
rect(0,0,105,144); rect(0,167,105,183)

# blue corner
blendMode(___)
fill('#0088FF'); rect(0,350,105,height)

# unwanted circle
blendMode(___)
fill('#0099FF'); ellipse(70,414,120,120)
# can't make the circle vanish?
# are you sure the previous blend is correct?

# thinner lines
blendMode(___)
stroke('#FFFFFF')
strokeWeight(11); line(105,0,105,height)
line(0,350,width,350); line(434,350,434,height)

strokeWeight(23)
strokeCap(SQUARE)

# thicker line upper-left
blendMode(___)
stroke('#00FFFF'); line(0,155,100,155)

# thicker line lower-right
blendMode(___)
stroke('#FFFF00'); line(440,415,width,415)
'''
{% endhighlight %}

You should notice that most of the code is commented out using multi-line comments. Now, moving the opening `'''` down as you progress, replace each of the `___` arguments with the correct blend mode. To start you off, here is the first solution:

{% highlight py %}
# red square
fill('#FF8800'); rect(0,0,width,350)
blendMode(SUBTRACT)
fill('#008800'); rect(0,0,width,350)
'''
# white bottom edge
blendMode(___)
...
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/mondrian-task-red.png" />
</figure>

Here is the final result for your reference.

<figure>
  <img src="{{ site.url }}/img/pitl06/mondrian-task-complete.png" />
</figure>

As a reminder, the blending modes are `BLEND`, `ADD`, `DARKEST`, `DIFFERENCE`, `EXCLUSION`, `LIGHTEST`, `MULTIPLY`, `REPLACE`, `SCREEN`, `SUBTRACT`.

## Tint and Transparency

Processing's [`tint()`](https://py.processing.org/reference/tint.html) function tints images using a specified colour. This is like taking a sheet of colour transparency film and placing it over a given image. It's simple enough to use and best explained with few code snippets.

Create a new sketch and save it as "tints". Download this guardian lion photograph (Forbidden City, Beijing) and place it your sketch's "data" sub-directory.

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/guardian-lion.png" download>guardian-lion.png</a>

Setup the sketch with the following code:

{% highlight py%}
size(1050,500)
background('#004477')
noStroke()
img = loadImage('guardian-lion.png')
image(img, 0,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/tint-and-transparency-setup.png" />
  <figcaption>
    A forbidden city imperial guardian lion.<br />
    Tang Zu-Ming [Public domain], <a href="https://commons.wikimedia.org/wiki/File:Beijing_Forbidden_City_Imperial_Guardian_Lions.jpg">via Wikimedia Commons</a>
  </figcaption>
</figure>

The tint function accepts three `0`--`255` (RGB) values as arguments.

{% highlight py%}
tint(255,153,0)
image(img, width/3,0)
{% endhighlight %}

Alternatively, you could use a single argument of the `color()` data type:

{% highlight py%}
#tint(255,153,0)
orange = color(255,153,0)
tint(orange)
image(img, width/3,0)
{% endhighlight %}

Run the code to confirm that the tint is working.

<figure>
  <img src="{{ site.url }}/img/pitl06/tint-and-transparency-orange.jpg" />
</figure>

The `tint` function can accept a fourth `0`--`255` argument for transparency (*alpha*). Create a new `orange50` variable, with an opacity of 50%, then add a new `tint` line followed by a second instance of the `image`.

{% highlight py%}
orange50 = color(255,153,0, 128) # 255 ÷ 2 ≈ 128
tint(orange50)
image(img, width/3*2,0)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/tint-and-transparency-orange-alpha.jpg" />
  <figcaption>Left to right: no tint; orange tint; orange tint with 50% alpha.</figcaption>
</figure>

If you need to affect the image transparency but retain the colour, use a white tint and your desired alpha value. Once you have set a tint it remains in effect for any further images, unless you include a subsequent `tint()` line or a [`noTint()`](https://py.processing.org/reference/noTint.html).

If you are wondering to yourself, "this looks a lot like a multiply blend mode", you'd be correct. The effect can be replicated manually by using the loop arrangements from the "blend_modes" exercises. This would entail an additional alpha argument in the `colorMode()` function and some adapted loop code. For example:

{% highlight py%}
colorMode(RGB, 1,1,1,1)

...

    layer1 = get(x,y)
    r = red(orange50) * red(layer1)
    g = green(orange50) * green(layer1)
    b = blue(orange50) * blue(layer1)
    a = alpha(orange50)
    fill( color(r,g,b,a) )
    rect(x+width/3*2, y, 1, 1)
{% endhighlight %}

The [`alpha()`](https://py.processing.org/reference/alpha.html) function is used to separate out an alpha channel from a `color` value.

## Lesson 07

That concludes another lesson. You now understand how to manage colour on a channel and bit-level, and have gained insights into how popular image formats work along the way.

In the next lesson, you will look at interactivity in Processing. As you will see, Processing is great for mouse, keyboard, and other interaction, but rather clumsy for building user interfaces. If you have any experience with programming interfaces in other languages (perhaps some JavaScript, etc.), you'll quickly realise what I mean. However, some useful Processing libraries provide an extended set of turnkey GUI features.

**Begin Lesson 07:** Soft-Face *(coming soon)*

[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)

## References

* http://setosa.io/ev/image-kernels/
* https://medium.freecodecamp.org/best-image-format-for-web-in-2019-jpeg-webp-heic-avif-41ba0c1b2789
* https://en.wikipedia.org/wiki/Blend_modes
* https://en.wikipedia.org/wiki/Kernel_(image_processing)
