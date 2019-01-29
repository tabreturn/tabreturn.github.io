---
layout: post
comments: true
title: "Processing.py in Ten Lessons -- 06: Tiny Blocks of Colour"
categories: code processing python
published: false
---

***Covered in this lesson:***  
<a href="#image-file-formats"><em>image formats</em></a> /
<a href="#colour-channels"><em>colour channels</em></a> /
<a href="#halftone"><em>halftone</em></a> /
<a href="#tint-and-transparency"><em>tint and transparency</em></a> /
<a href="#image-kernels"><em>image kernels</em></a>

---
&nbsp;  
In this tutorial we will look at a few cool image processing techniques. You are already familiar with the `image()` function, which you have used in combination with `loadImage()` to draw image files to the display window. GIF, JPG, and PNG files are all [*raster*](https://en.wikipedia.org/wiki/Raster_graphics) graphic formats -- that is, digital images comprised of a pixel grid. We will look at reading values off individual- as well as groups of pixels, and then manipulating them to create Photoshop-esque filters. To manage these arrays of pixel values, we'll rely on a number of the techniques you picked up in [lesson 05]({% post_url 2019-01-15-processing.py_in_ten_lessons--05-_art_of_the_state %}), particularly the combining of loops with lists.

To begin, we will peek under the hood of some image file formats. This will provide useful insights into how the colour of each pixel is controlled.

# Image Formats

Each time you run your Processing sketch, a new display window is spawned. Like a GIF, JPG, or PNG image, the graphic in the display window is raster-based. Using the [`saveFrame()`](http://localhost:4000/code/processing/python/2018/08/10/processing.py_in_ten_lessons-04-_beta_eq_fps_gt_12.html#saving-frames) function one can save the frame in TIFF (`.tif`) format. If it's not a TIFF you desire, then provide a (file name) argument ending in `.gif`, `.jpg`, or `png`. TIFF, however, employs no compression, resulting larger files. Processing also supports Targa (.tga), but the lessons thus far have avoided making mention of it, in favour of focussing on the common web-browser-supported formats.

Below is a screenshot of a sketch. The code is not important. Instead, focus on what what the display window renders (a red and white striped pattern) and the file sizes of each version saved.

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

Before proceeding with an explanation of these differences, here is a 3-point file size primer:

* you know that digital information is stored as ones and zeroes (remember that the film, *The Matrix*?) and each `1` or `0` is referred to as a *bit* (a binary digit);
* there are 8 bits in a *byte*, for example `10110110`;
* a *kilobyte* (KB) is 1000 bytes.

The "bands.tif" file is by far the largest file at 31 kilobytes. Recall that Processing uses no compression when saving TIFF files, so this comes as no surprise. But how exactly does a TIFF store pixel values, and how does this affect the size? To answer this question, one should begin with colour values. Consider the hexadecimal value for <span style="color:red">red</span>:

<code>#<span style="color:#FF0000">FF</span><span style="color:#00FF00">00</span><span style="color:#0000FF">00</span></code>

Each pair of digits has been coloured according to the RGB primary it controls. Using decimal values, we can rewrite this as:

<code>(<span style="color:#FF0000">255</span>, <span style="color:#00FF00">0</span>, <span style="color:#0000FF">0</span>)</code>

But -- neither hexadecimal nor decimal numbers are expressed purely in ones and zeroes. In order to store this information digitally, the values must be converted to binary. It figures, right? Because binary is comprised of ones and zeroes, and so are bits. To convert from a zero in decimal to a zero binary is easy -- it's `0` in binary, too. The same goes for `1`. But what about `2`? Binary has only two digits to work with! Below is an abridged conversion table:

Decimal &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| Binary
----------------------------------------- | ------
0                                         | `0`
1                                         | `1`
2                                         | `10`
3                                         | `11`
4                                         | `100`
5                                         | `101`
...                                       |
                                          |
----------------------------------------- | ------

Humans count on their fingers, so a base-10 (decimal) system is fitting. Suppose you are counting the number of people who pass you in the street. To keep track, you form a fist with each hand; when the first person passes you, you raise your left thumb. For the second person, you raise your left index finger; and so forth.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-decimal-counting-7.svg" />
  <figcaption>
    Counting to seven on two hands.
  </figcaption>
</figure>

You count up to ten, then run out of fingers. For eleven, you ask a friend sitting beside to 'store' a one on her fingers. You then close your fists beginning at one again (your left thumb). When you reach twenty, your friend lifts her left index finger, and you begin at one again. In all, twenty six people pass you.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-decimal-counting-26.svg" />
  <figcaption>
    Your friend's final count is 2 (left); yours is 6 (right).
  </figcaption>
</figure>

Once you reach a hundred, you'll need to find another friend. From this, we can gather that for each power of ten you require an additional digit -- i.e. 10, 100, 1000.

Now, imagine you had no fingers (or thumbs). Once you've counted to two, you've run out of 'stumps' to count on. When counting in *binary* (base-2), whenever you reach some power of two an additional digit is required. The table below provides binary-to-decimal conversions for powers of two.

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

Have you been wondering where those letters in hexadecimal come from? Well, hexadecimal is a base-16 system. Just imagine some alien race with 16 fingers. To make accommodate the extra fingers, we use the letters `A` to `F`.

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

Humans have used all sorts of [numeral systems](https://en.wikipedia.org/wiki/List_of_numeral_systems#Standard_positional_numeral_systems). For example, the French use base-10 until seventy, after which point it's a mixture of base-10 and base-20. The *Telefol* and *Oksapmin* speaking people of Papua New Guinea use a *Heptavigesimal* (base-27) system, where the words for each number are named according to the 27 body parts they use for counting. Oh, and if you wondering, pi is irrational in all of them ... but, on second thought, what if pi were the base? 😕

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

Note how 255 is the highest decimal that can be represented using 8-bits. It is no coincidence that the brightest red your screen can display is expressed as `(255, 0, 0)`. Or that white is `(255, 255, 255)`. At a hardware level, these are all converted to binary. The table above shows that 255 is represented as eight `1`s in binary. Let us rewrite red in binary:

<code><span style="color:#FF0000">11111111</span><span style="color:#00FF00">00000000</span><span style="color:#0000FF">00000000</span></code>

I have padded the green and blue bits with zeroes. White would be a complete string of ones. In all, there are 8 × 3 = 24 bits. That's 24-bit colour, which can describe a whopping 256 × 256 × 256 = 16,777,216 possible (yet not necessarily distinguishable) colours. As you will recall, the Processing sketch produces the following result:

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-stripes.png" style="max-width:100px" />
</figure>

The size of the (uncompressed) TIFF file is 31 KB. Here's why:

* the graphic is 100 pixels wide by 100 pixels high, and therefore comprised of 100 × 100 = 10,000 pixels;
* each pixel contains one 24-bit colour value;
* 10,000 pixels × 24-bit colour values = 240,000 bits;
* there are 8 bits in a byte, so that's 240,000 bits ÷ 8 = 30,000 bytes.
* 30,000 bytes = 30 kilobytes (KB).

Okay, so we have accounted for 30 KB, but what about the extra 1 KB?. I have used [Hex Fiend](https://ridiculousfish.com/hexfiend/) -- an open source hex editor -- to open and inspect the raw data of the "bands.tif" file. Of course, the data is ultimately stored binary, but hexadecimal values make it easier to make sense of.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-tiff-hex.png" class="fullwidth" />
  <figcaption>The "bands.tif" file opened in Hex Fiend. Scrolling down reveals alternating clusters of <code>FF0000</code> and <code>FFFFFF</code> values.</figcaption>
</figure>

The numbers appear in byte groupings of three (six `0`--`F` numbers in a group). Scrolling through the file reveals alternating clusters of `FF0000` and `FFFFFF` values -- that is, red and white respectively. This is what we would expect, after all, the graphic is a pattern of alternating white and red strips. However, the first three lines contain a bunch of seemingly random numbers, then there's `000000`s up to and including byte 768 (as indicated by the line numbers in the left margin). At the bottom of the window you can spot the file size in bytes.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-tiff-hex-size.png" />
</figure>

That is 768 bytes over our expected 30,000. This accounts for the extra 1 KB, which the file manager has simply rounded-up to 31 KB. Removing everything up to where the first `FF0000` cluster reduces the file size to exactly 30 KB.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-tiff-hex-adjusted.png" />
  <figcaption>Everything up to the first <code>FF0000</code> instance has been deleted. The file size is now exactly 30,0000 bytes.</figcaption>
</figure>

So what was stored in bytes 0 to 768? The beginning section of the file contains important information to identify it as a TIFF and provide important information, including but not limited to the image width, height, bit-depth, and orientation. Leaving this information out will 'break' the graphic.

Processing generates TIFF files using the most basic of the format's baseline features. Nonetheless, the TIFF 6.0 specification supports various compression schemes, layers, deep colour (16- as opposed to 8-bits per channel), transparency, pages, and multiple colour models (RGB, CMYK, LAB, etc.). Be aware, though, that many of these features are extensions, and reader support will vary. Overall, TIFF is versatile format, well suited for working on graphics between different applications, and for archiving purposes. Essentially, it rolls all of GIF, JPG, and PNG's features into a single format. However, it's not supported on the Web.

### GIF vs JPG vs PNG

If you are looking at any image on a web-page, chances are it's either a GIF, JPG, or PNG. *SVG* (Scalable Vector Graphics) are also popular, but not for raster graphics. Size is important to consider when you are transferring files across an internet connection. Smaller equals faster, so all three formats employ some form of compression.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png" class="fullwidth" />
  <figcaption>A web-page that includes a GIF, JPG, and PNG image</figcaption>
</figure>

The details of data compression are complicated, mathematical, and beyond the scope of these lessons. Nonetheless, you'll gain a high-level insight into how the compression algorithms are operating. The main focus, though, is on why you would elect to use one over the other two. If you are familiar with some raster editing software, such as GIMP of Photoshop, it's a good idea to play around with the export options to see how the different GIF, JPG, and PNG parameters affect the quality and size of these files.

#### GIF

GIF is the oldest of the three formats. There's an ongoing war over whether it is pronounced "**g**if" (with a hard *g*, like in *gift*) or "**j**iff". The format utilises the *Lempel–Ziv–Welch* (LZW) data compression scheme. Our image is a sequence of red and white stripes, and this is just the type of graphic to which GIF is best suited. That is, images consisting primarily of areas filled in flat colours. For instance, graphs, diagrams, text and line art. Unsurprisingly, it outperforms JPG and PNG for our stripy red pattern, consuming just 298 bytes. Opening the "bands.gif" file in a hex editor reveals how small it is, and also some insight into how the format works.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-formats-gif-hex.png" class="fullwidth" />
  <figcaption>The hexadecimal values for red (<code>FF0000</code>) and white (<code>FFFFFF</code>) have been outlined in green.</figcaption>
</figure>

Despite there being thousands of red and white pixels in the graphic, the hex editor contains a single instance of `FF0000` and `FFFFFF`. This pair of colour values make up the image's *colour table*. What precedes the colour table identifies the file as GIF and describes the width, height, and other characteristics. What follows the colour table (after the `2C` and terminating with a `3B`) is compressed graphic data. Rather than specifying the value of each pixel, the LZW algorithm matches each pixel with one of the two colour table entries. But LZW can this another step further. Each red stripe is a continuous string of 100 × 10 = 1000 hexadecimal values. This string can in-turn be stored in table, so that each time it reappears, the relevant table entry can be recalled.

GIF has its limitations. Most notably, there is a 256 colour limit on the number of values you can pick for the colour table. To get smaller GIF files, one reduces this palette further. Placing alternating colours in checkerboard-type arrangements -- a technique known as *dithering* -- helps make up for the limited colour table, but it's often easy to discern this pattern and it works against the compressibility. Transparency is supported, but the level of opacity is either 0% or 100% and nothing between.

<figure>
  <img style="background-position:0px -80px; background-image:url({{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png); height:300px" />
  <figcaption>The dithering pattern can be discerned wherever colours blend into other colours (e.g. the yellow to orange blend running down the letters). GIF cannot support the semi-transparent blues in the glow, so it fades to white before up to the point where transparency begins (and the starry background beneath can show through).</figcaption>
</figure>

GIF also supports animation, which is handy for short loops of cats doing silly things.

#### JPG

JPG (pronounced "jay-peg", often bearing the extension `.jpeg`) uses a *lossy* compression that does not support any transparency. Unlike *lossless* GIFs or PNGs, each time you reopen and save a JPG file, the image quality degrades further. The compression algorithm works by taking advantage of the human psychovisual system, disregarding information we are less likely to visually detect. Humans are more sensitive to [differences in brightness than differences in colour](https://en.wikipedia.org/wiki/Chroma_subsampling), an characteristic that JPG can take advantage of. The format works well for images with graduated colour, like photographs, but causes noticeable *artefacts* to appear wherever there is sharp contrast.

<figure>
  <img style="background-position:-432px -80px; background-image:url({{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png); height:300px" />
  <figcaption>A highly compressed JPG. The artefacts are most apparent around the edges of the letters. As there is no support for transparency, a white background extends to the boundaries of the graphic.</figcaption>
</figure>

Most raster software provides some kind of quality 'slider' when exporting to JPG format. Less quality equals smaller file size, but you will find that certain photographs/graphics can handle more compression before they begin to look horrible.

#### PNG

PNG -- pronounced "pee-en-jee" or "ping" -- was developed as a replacement for the proprietary GIF format. GIF patents actually expired in 2004, but PNG introduced a number of compelling improvements. Like GIF, PNG compression is lossless, but the PNG palette is not restricted to 256 colours. Moreover, transparency can range from 0% to 100%, allowing for semi-opaque pixels. This is accomplished using an additional *alpha* channel. For instance, an opaque blue (i.e. no alpha) can be expressed as:

<code><span style="color:#FF0000">00</span><span style="color:#00FF00">00</span><span style="color:#0000FF">FF</span></code>  
Or, in binary:  
<code><span style="color:#FF0000">00000000</span><span style="color:#00FF00">00000000</span><span style="color:#0000FF">11111111</span></code>

That is 24 bits in all -- with 8 bits for each R/G/B *channel*. A 32-bit hexadecimal value provides room for the additional alpha channel; of course, this consumes more storage, too. The same blue with an opacity of around 25% is hence stored as:

<code><span style="color:#FF0000">00000000</span><span style="color:#00FF00">00000000</span><span style="color:#0000FF">11111111</span><span style="color:#999999">01000001</span></code>

This alpha feature is especially handy for placing images seamlessly above other background images.

<figure>
  <img style="background-position:-864px -80px; background-image:url({{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png); height:300px" />
  <figcaption>The PNG produces smooth gradients using a large (greater than 256) pallet of colours. One cannot detect the boundaries of the graphic. The glow is comprised of many levels of semi-opaque blues, and blends beautifully over the starry background.</figcaption>
</figure>

Notably, PNGs do not support animation. The APNG (Animated Portable Network Graphics) is an extension to the format, but it has failed to gain traction with some major Web Browsers (Microsoft).

When dealing with photographs, JPGs tend to trump PNGs in terms of quality-for-size. PNGs, however excel when you require transparency, or desire GIF-style sharpness with a greater range of colour.

There are a few up-and-coming Web image formats (WEBP, HEIC) that promise even smaller file sizes and better quality. Whether they gain traction depends largely on support from authoring tools and browsers. To reiterate, though, it's best to experiment with the different formats to see how they work and which is most appropriate for a given graphic you wish to optimise.

## Colour Channels

Each pixel is mixed using three primary colours: red, green, and blue. Another way to think of this is three monochrome images (or *channels*) combined together.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-channels.png" class="fullwidth" />
  <figcaption>Auguste Macke's Modefenster separated into red, green, and blue channels.</figcaption>
</figure>

Sometimes it is preferable to work with four channels. For instance, you may need an alpha channel for transparency. Another scenario is print design. Colour printers use a four-colour *CMYK* model: <span style="color:#0EE">cyan</span>, <span style="color:magenta">magenta</span>, <span style="color:#EE0">yellow</span>, and **black**. If you have ever replaced ink cartridges in your printer, you have probably noticed this. For this reason, desktop publishing formats can denote colours using 32-bit values. For instance, a blue mixed with 100% cyan and 50% magenta is:

<code><span style="color:#0EE">FF</span><span style="color:magenta">80</span><span style="color:#EE0">00</span><span style="color:black">00</span></code>

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-cmyk.png" class="fullwidth" />
  <figcaption>
  Mixing colour CMYK using Krita. Note the Channels panel to the lower-right; whiter areas indicate more ink. The painting is Hokusai's <a href="https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg">The Great Wave off Kanagawa</a>.
  </figcaption>
</figure>

Note Krita's *Channels* panel to the lower-right. Whiter areas indicate higher values for the respective channel. For instance, the Cyan channel's intense areas of white correspond to the blue areas in the wave. The Magenta channel appears like a duller copy of the Cyan channel, i.e the blue is largely a mix of about 100% cyan and 50% magenta. By manipulating colour channels you can manipulate the overall hue, saturation, and lightness. If you are familiar with software like GIMP or Photoshop, you will be familiar with such operations.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-gimp.png" class="fullwidth" />
  <figcaption>GIMP's Hue-Saturation tool. In this instance, the saturation has been reduced to -85. GIMP's Channels panel (to the lower right) separate the image values into Red, Green, Blue, and Alpha.</figcaption>
</figure>

Processing has various functions for manipulating colour channels. Experimenting with these is a great to peak into the inner workings of applications like Photoshop.

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
  <img src="{{ site.url }}/img/pitl06/colour-channels-setup.png" />
</figure>

We will be sampling parts of the painting and placing the processed output in the empty blue area to the right. The first function you need to know is the [`get()`](https://py.processing.org/reference/get.html). This is used to read colours of pixels in the display window. First, grab a section of pixels by adding a `get()` to the bottom of your code:

{% highlight py %}
grab = get(0,0, 200,200)
{% endhighlight %}

The arguments are the same as those of the `rect()` function, i.e., the variable `grab` is assigned a copy of all the pixels within a rectangular area beginning at the top left (`0,0`) and extending 200 pixels across and 200 pixels down (`200,200`). Add an `image()` line to draw the pixels into the empty area on the right:

{% highlight py %}
grab = get(0,0, 200,200)
image(grab, 600,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-area.png" />
</figure>

Alternatively, you can make use of the [`copy()`](https://py.processing.org/reference/copy.html) function which also provides arguments for the destination scale.

{% highlight py %}
#    src. coords --> dest. coords
copy(0,0,200,200,    600,600,100,100)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-copy.png" />
</figure>

To grab an retrieve a single pixel's colour, leave out the width and height arguments. If the any pixel sampled is outside of the image window, black is returned.

{% highlight py %}
singlepixel = get(190,200)
fill(singlepixel)
rect(700,300, 200,200)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-single.png" />
</figure>

Intriguingly, if you print the `singlepixel` variable a (negative) integer appears. This is how Processing stores colours in memory. You do not need to understand how this works because there are functions for converting these integer-based data types to more familiar schemes.

{% highlight py %}
print(singlepixel) # -248272
{% endhighlight %}

We can now build a duplicate image on the right by sampling each pixel and placing its clone 500 pixels (half the width of the Display) to the right. Sure, it would be easier to just grab the whole area of the painting, but the pixel-by-pixel approach is necessary for the upcoming steps. Add this loop to the bottom of your code:

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

You should be quite comfortable with loops now. In this instance, the `range` is half the display window's with by its full height. In a pixel-by-pixel, row-by-row manner, the loop gets each pixel and `set`s its clone accordingly. The `set()` function accepts three arguments: an x-coordinate, then y-coordinate, then colour. Run the sketch. The new pixels are drawn over your earlier experiments.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-get-set.png" />
</figure>

Now, with each iteration, we will separate the pixel values into the independent R, G, and B channels.  Comment out the existing `set()` line and add a `red()`, `green()` and `blue()` function to extract the three channel values.

{% highlight py %}
    ...

    pixel = get(x,y)
    #set(x+halfwidth, y, pixel)

    r = red(pixel)
    g = green(pixel)
    b = blue(pixel)
{% endhighlight %}

With each iteration, variables `r`, `g`, and `b` are each assigned a value between `0` and `255`. Excellent! That's a familiar range, right? Remember, `255` equals `FF` equals `11111111`. Let's visualise the channels, beginning with red. Recall that the Channels panels in both Krita and GIMP (and Photoshop, for that matter) appear as greyscale thumbnails. Add the following lines to your loop:

{% highlight py %}
    channelr = color(r, r, r)
    set( x+halfwidth, y, color(r,r,r) )
{% endhighlight %}

The [`color()`](https://py.processing.org/reference/color.html) function converts the RGB values into the integer types that `get()` and `set()` work with (the way Processing stores colours in memory). If the current pixel is bright red, the `color(r, r, r)` line is equivalent to `color(255, 255, 255)`. This means that the brightest reds should appear as white; no red is black; and everything else is some shade of grey. Run the code.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-red.png" />
  <figcaption>Red channel (right).</figcaption>
</figure>

Observe how the red "MODE" sign registers as white; this indicates red values of around 100%. The yellow stripes in the awning over the window are also white; this is because yellow is mixed using 100% red and 100% green. Comment out the red `set()` line and try a green channel instead.

{% highlight py %}
    #set( x+halfwidth, y, color(r,r,r) )
    set( x+halfwidth, y, color(g,g,g) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-green.png" />
  <figcaption>Green channel (right).</figcaption>
</figure>

The green channel confirms the prominence of green in the awning. The sign, however, has very little green -- or blue. You can add a `set()` line for blue if you wish to confirm this. Any area that is grey, white, or black, will possess equal quantities of red, green, and blue.

To covert the image to greyscale, rather than greyscale representations of each channel, we average out the three values.

{% highlight py %}
...
channelavg = (r + g + b) / 3
greyscale = color(channelavg, channelavg, channelavg)
set( x+halfwidth, y, greyscale )
{% endhighlight %}

Or, to accommodate for the greater number of green receptors in the human eye, include the following coefficients. The yellows otherwise won't appear bright enough:

{% highlight py %}
channelavg = (r*0.89 + g*1.77 + b*0.33) / 3
{% endhighlight %}

In the image below, the area within the green brackets exhibits the calibrated values. Note how the awning's bright yellow and darker orange strip appear as the same shade of grey using straight-forward averaged values.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-greyscale.png" />
  <figcaption>Greyscale conversion (right).</figcaption>
</figure>

To invert the colours (like a [film negative](https://en.wikipedia.org/wiki/Negative_(photography))), subtract the `r`/`g`/`b` from the maximum channel value of 255.

{% highlight py %}
...
invcolour = color(255-r, 255-g, 255-b)
set( x+halfwidth, y, invcolour )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-invert.png" />
  <figcaption>Inverted image channels (right).</figcaption>
</figure>

See if you can work out how to create an inverted greyscale version.

### HSB Channels

In the very first lesson, you were introduced to Processing's various [colour modes]({% post_url 2018-06-12-processing.py_in_ten_lessons--01-_hello_world %}#colour-mode). Using the `colorMode()` function, the colour mixing scheme can be switched from RGB to HSB (Hue, Saturation, Brightness). You can think of HSB as an alternative set of channels that may be more appropriate for what you need to accomplish. Switch the `colorMode` to HSB and add a new loop to the end of your existing "colour_channels" code.

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

Working in HSB makes it far easier to shift hues, adjust saturation, and alter brightness. As the `colorMode()` aguments have set Processing to operate like the GIMP colour mixer depicted below:

<figure>
  <img src="{{ site.url }}/img/pitl01/colour-gimp-mixer.png" />
  <figcaption>GIMP colour mixer with the HSB values highlighted.</figcaption>
</figure>

If you wish to, you can comment out the previous loop -- or instead, not bother and just allow the new loop to draw over what's there already. Use the `hue()`, `saturation()`, and `brightness()` functions to separate the pixel values into three HSB channels.

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

Adjusting the hue is akin to taking each pixel's value and rotating the triangle to produce a new rotation value between 0 and 360 degrees. This is the same as shifting a hue slider in GIMP or Photoshop.

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-gimp-hs.png" class="fullwidth" />
  <figcaption>Adjusting the Hue slider.</figcaption>
</figure>

But simply adding degrees of rotation to the `h` variable is problematic. For example, what if the `h` is `40` and we subtracted `50`. The result is 40 - 50 = -10 degrees, which lands outside of the permitted range. Instead, rotating past 0 or 360 should reset the degrees to zero, then subtract/add the remaining difference. This way 40 - 50 = 350 degrees. This is an example of *clock arithmetic*. The 'wrap-around' concept is nothing new to you. If it is currently three AM, and somebody asks what time was it four hours ago, you wouldn't say "minus one AM"? Moreover, clock arithmetic is an application of *modular arithmetic* -- the favourite pastime of our good friend the modulo operator! Add a new `set()` line that subtracts `50` from the hue, and performs a `%360` on the result.

{% highlight py %}
    #set( x+halfwidth,y, color(h, s, b) )
    set( x+halfwidth,y, color((h-50)%360, s, b) )
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/colour-channels-hue.png" />
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
  <img src="{{ site.url }}/img/pitl06/colour-channels-saturation.png" />
  <figcaption>The hue remains the same but the saturation has been pushed to maximum.</figcaption>
</figure>

You are now familiar with how colour channels are managed. This theory can be used for all sorts of colour adjustments, but also lays the foundation for the next sections where we look at filter effects. There are a few other functions for the colour data type that we did not cover. These omissions include:

* [`alpha()`](#tint-and-transparency) for extracting alpha (transparency) values;
* [`blendColor()`](https://py.processing.org/reference/blendColor.html), for blending two colours together using a selection of modes;
* [`lerpColor()`](https://py.processing.org/reference/lerpColor.html), for calculating the colour that lies between two other colours;
* [`loadPixels()`](https://py.processing.org/reference/lerpColor.html), [`pixels()`](https://py.processing.org/reference/pixels.html), and [`updatePixels()`](https://py.processing.org/reference/updateYixels.html) work together to load and manipulate pixels in the display window. This is a faster, albeit more complicated, alternative to using `get()` and `set()`.

## Halftone

Suppose that you have an image of continuous tones, i.e. an infinite range of blended greys. For the sake of example, we will use a photograph of Elisabet Ney's *Lady Macbeth* sculpture (below). The image is to appear in a newspaper, printed in black & white, so you convert the image to greyscale and email it off to the publishers.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-lady-macbeth.png" />
  <figcaption>
    Elisabet Ney's Lady Macbeth in colour and greyscale.<br />
    source: <a href="https://commons.wikimedia.org/wiki/File:Elisabet_Ney_-_Lady_Macbeth_-_Detail.jpg">Wikimedia Commons</a>
  </figcaption>
</figure>

In the 1870s, it wasn't so simple. Of course, there was no email and, more critically, publishers were still figuring how to print photographs. However, printers could print illustrations. Illustrations were etched into wood then cast into metal plates; which could then be covered in ink to transfer images to paper. The challenge with photographs was continuous tones -- or more specifically, how to render solid black ink in so many shades of grey. The solution was *halftone*; tiny dots of varying size that create the illusion of grey when viewed from a sufficient distance. The exact details of the process are not important; suffice to say it is all handled digitally today.

The images below depict four possible approaches to creating halftones. The simplest is approach is no halftone (top-left). Rather, each shade of grey is rendered as either black *or* white governed by whether it exceeds a given brightness threshold. The stochastic halftone (top-right) uses *dots of equal size*, adjusting their spacing for darker/lighter tones. Such dithering techniques can, therefore, be described as *frequency modulated*.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-comparison.png" class="fullwidth" />
  <figcaption>
    Clockwise from the top-left: 50% threshold; stochastic halftone; halftone lines; round dots.
  </figcaption>
</figure>

*Amplitude modulated* halftones (bottom-left and bottom-right) rely on varying sized dots of fixed spacing, or lines of varying weight. Although, these could be any formed using various other shapes (squares, ellipses, etc.).

Halftone techniques remain an essential part of printing today. Halftone dots are produced for each of the CMYK primary channels, so that semi-opaque inks create the optical effect of full-colour imagery.

<figure>
  <img src="{{ site.url }}/img/pitl06/wikimedia-backup/Halftoningcolor.svg" />
  <figcaption>
    Source: <a href="https://en.wikipedia.org/wiki/File:Halftoningcolor.svg">Wikimedia Commons</a>
  </figcaption>
</figure>

Round dots are the most commonly used. If you magnify a print you should be able to *spot* them.

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

As with the previous sketch, we will be drawing the processed version in the empty blue space on the right.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-setup.png" />
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

Most of this code should look familiar, although the [`ceil()`](https://py.processing.org/reference/ceil.html) function may be new to you. This is the *ceiling* function; it performs a round up on floating point values. For example, `ceil(9.1)` would return `10`. It is necessary to employ it here so that any half rows are prevented from stopping short of the bottom of the display window. A `rect()` line has been included to visualise the cells. Run the code.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-setup-cells.png" />
</figure>

For the halftone effect, we want to sample the pixel a the centre of each cell. To accomplish this, add half the width/height to x/y coordinate. Also, comment out the `rect()` line.

{% highlight py%}
    #rect(x,y, cellsize,cellsize)
    x = int(x+cellsize/2)
    y = int(y+cellsize/2)
    pixel = get(x,y)
{% endhighlight %}

Next, using the brightness value of each pixel sampled, we calculate an amplitude (`amp`) for each halftone dot. The value, however, must be reduced by a factor of `200` so that the dots are not too large.

{% highlight py%}
    ...
    pixel = get(x,y)
    b = brightness(pixel)
    amp = 10*b/200.0
{% endhighlight %}

Finally, add the relevant stroke and fill properties, then the ellipse/circle itself.

{% highlight py%}
    noStroke()
    fill('#FFFFFF')
    ellipse(x+halfwidth,y, amp,amp)
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-circles.png" />
  <figcaption>The completed circular halftone effect.</figcaption>
</figure>

You are not limited to circles, or white as a fill. In the next two tasks, you be challenged to replicate two other halftone effects.

### Pixel Art Task

Using the same "haltones" sketch you have been working on, recreate the pixelated effect below.

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-pixelated.png" />
  <figcaption>Pixelated halftone effect.</figcaption>
</figure>

Before beginning the next task, comment out the circular halftone and pixel art specific lines. You should still be able to make use of the existing loop.

### ASCII Art Task

For ASCII art, you will need to decide on a set of characters to serve as your colour ramp. For ten shades, you can use the following sequence (which begins with a space character):

` .:-=+*#%@`

With so few shades, you can expect to lose a fair amount of detail. The final result should look something like this:

<figure>
  <img src="{{ site.url }}/img/pitl06/halftone-effects-ascii.png" />
  <figcaption>Pixelated ASCII art effect (zoomed in).</figcaption>
</figure>

There are many halftone effects to explore. By combining the techniques covered here, you can come up with all sorts of interesting results. As a staring point, you can see what happens when you combine the circular, pixel, and ASCII effects.

## Tint and Transparency

Processing's [`tint()`](https://py.processing.org/reference/tint.html) function tints images using a specified colour. This is like taking a sheet of colour transparency film and placing it over a given image. It's simple enough to use, and best explained with few code snippets.

<figure>
  <img src="{{ site.url }}/img/pitl06/tints-red-transparent.png" class="fullwidth" />
  <figcaption>
    From left to right: standard image; red tint; 25% transparent.<br />
    source: <a href="https://commons.wikimedia.org/wiki/File:Beijing_Forbidden_City_Imperial_Guardian_Lions.jpg">Wikimedia Commons</a>
  </figcaption>
</figure>

The function accepts three `0`--`255` (RGB) values arguments.

{% highlight py%}
# no tint
img = loadImage('guardian-lion.png')
image(img, 0,0)

# red tint
tint(255,0,0)
image(img, width/3,0)
{% endhighlight %}

Alternatively, you could use a single argument if it is a `color()` data type:

{% highlight py%}
red = color(255,0,0)
tint(red)  
image(img, width/3,0)
{% endhighlight %}

The `tint` and `color` functions also accept a fourth (alpha) `0`--`255` argument for transparency. If you need to affect the image transparency but retain the colour, use white with an alpha.

{% highlight py%}
# 25% transparent
transparent25 = color(255,255,255, 65)
tint(transparent25)
image(img, width/3*2,0)
{% endhighlight %}

To separate out an alpha from any `color` value, use the [`alpha()`](https://py.processing.org/reference/alpha.html) function.

{% highlight py%}
print( alpha(transparent25) ) # displays 65.0
{% endhighlight %}

Once you have set a tint, it remains in effect for any subsequent images -- unless you include another `tint()` line, or a [`noTint()`](https://py.processing.org/reference/noTint.html).

## Image Kernels

If you have ever sharpened or blurred a digital image, it's likely that the software you were using relied on *image kernel* to process the effect. In the fields of computer vision and machine learning, image kernels are utilised for feature- detection and extraction.

An image kernel, put simply, is a small [matrix]({% post_url 2018-08-10-processing.py_in_ten_lessons--04-_beta_eq_fps_gt_12 %}#matrices) that passes over the pixels of your image, manipulating the values as it moves along. To illustrate, here is three-by-three blur kernel in action. The *kernel* (left) begins with its centre placed over the first (top-left) pixel of the source image. A new pixel colour value is calculated using the nine cells sampled by the kernel.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mona-lisa-1.png" class="fullwidth" />
</figure>

For any edge pixels, though, the kernel hangs over the boundary and samples empty cells. One common solution is to extend the borders pixels outward.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mona-lisa-1-edge.png" class="fullwidth" />
</figure>

This process proceeds pixel-by-pixel. In this instance, the kernel motion is left-to-right, row-by-row -- although, as long as every pixel is processed, the sequence does not matter.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mona-lisa-2.png" />
  <figcaption>The kernel motion is left-to-right, row-by-row.</figcaption>
</figure>

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mona-lisa-3.png" />
  <figcaption>When the kernel reaches the final pixel, the process is complete.</figcaption>
</figure>

The magic part is how the kernel combines the the nine value into one -- a form of mathematical *convolution*, where each pixel is weighted and then added to its local neighbours. In the illustration below, the source pixels are labelled *a*--*f* and the matrix, *1*--*9*.

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

The convolution is calculated as by multiplying each cell by its corresponding partner. So, a × 1, then b × 2, and so on though to i × 9. The result is the sum of all these multiplications.

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

<sup markdown="1">If you are a math/ML/CV/other nerd -- you may point out that that kernel has not been flipped, so this is, in fact, a *cross correlation* and not a convolution. You are correct. However, we will be using symmetrical kernels, so correlation and convolution coincide.</sup>

The numbers *1*--*9* are simply variables. One replaces them with actual kernel weightings. With the theory out the way, it's time to program your own image kernels so that you can experiment different weight combinations.

### Roll Your Own Image Kernel

Create a new sketch and save it as "image_kernels".

Download this image of a Kuba poeple's *Mwaash aMbooy mask* and place it your sketch's "data" sub-directory:

<a href="{{ site.url }}/img/pitl06/wikimedia-backup/mwaash-ambooy-grey.png" download>mwaash-ambooy-grey.png</a>

Begin with the following code:

{% highlight py %}
size(1000,720)
background('#004477')
noStroke()
mwaashambooy = loadImage('mwaash-ambooy-grey.png')
image(mwaashambooy, 0,0)
{% endhighlight py %}

Run the sketch. The image is greyscale. To begin, a single colour channel is easier to manage.

<figure>
  <img src="{{ site.url }}/img/pitl06/image-kernels-mwaashambooy-load.png" />
  <figcaption>
    Source: <a href="https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_22.1582_Mwaash_aMbooy_Mask.jpg">Wikimedia Commons</a>
  </figcaption>
</figure>

As with the prior task, the processed version will appear in the blue area to the right. 

## filters
https://py.processing.org/reference/filter.html


## Lesson 07

...


**Begin Lesson 07:** Soft-Faces *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* http://setosa.io/ev/image-kernels/
* https://medium.freecodecamp.org/best-image-format-for-web-in-2019-jpeg-webp-heic-avif-41ba0c1b2789
* https://en.wikipedia.org/wiki/Kernel_(image_processing)
