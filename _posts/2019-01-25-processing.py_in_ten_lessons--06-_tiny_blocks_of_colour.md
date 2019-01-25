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
<a href="#halftones"><em>halftones</em></a> /
<a href="#tint-and-transparency"><em>tint and transparency</em></a> /
<a href="#image-kernels"><em>image kernels</em></a>

---
&nbsp;  
In this tutorial we will look at a few cool image processing techniques. You are already familiar with the `image()` function, which you have used in combination with `loadImage()` to draw image files to the Display window. GIF, JPG, and PNG files are all [*raster*](https://en.wikipedia.org/wiki/Raster_graphics) graphic formats -- that is, digital images comprised of a pixel grid. We will look at reading values off individual- as well as groups of pixels, and then manipulating them to create Photoshop-esque filters. To manage these arrays of pixel values, we'll rely on a number of the techniques you picked up in [lesson 05]({% post_url 2019-01-15-processing.py_in_ten_lessons--05-_art_of_the_state %}), particularly the combining of loops with lists.

To begin, we will peek under the hood of some image file formats. This will provide useful insights into how the colour of each pixel is controlled.

# Image Formats

Each time you run your Processing sketch, a new Display window is spawned. Like a GIF, JPG, or PNG image, the graphic in the Display window is raster-based. Using the [`saveFrame()`](http://localhost:4000/code/processing/python/2018/08/10/processing.py_in_ten_lessons-04-_beta_eq_fps_gt_12.html#saving-frames) function one can save the frame in TIFF (`.tif`) format. If it's not a TIFF you desire, then provide a (file name) argument ending in `.gif`, `.jpg`, or `png`. TIFF, however, employs no compression, resulting larger files. Processing also supports Targa (.tga), but the lessons thus far have avoided making mention of it, in favour of focussing on the common web-browser-supported formats.

Below is a screenshot of a sketch. The code is not important. Instead, focus on what what the Display window renders (a red and white striped pattern) and the file sizes of each version saved.

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

Most raster software provides some kind of quality 'slider' when exporting to JPG format. Less quality equals smaller file size, but you will find that certain photographs/graphics can handle more compression than others before they begin to look horrible.

#### PNG

PNG -- pronounced "pee-en-jee" or "ping" -- was developed as a replacement for the proprietary GIF format. GIF patents actually expired in 2004, but PNG introduced a number of compelling improvements. Like GIF, PNG compression is lossless, but the PNG palette is not restricted to 256 colours. Moreover, transparency can range from 0% to 100%, allowing for semi-opaque pixels. This is accomplished using an additional *alpha* channel. For instance, an opaque blue (with no alpha channel) is expressed as:

<code><span style="color:#FF0000">00</span><span style="color:#00FF00">00</span><span style="color:#0000FF">FF</span></code>  
Or, in binary:  
<code><span style="color:#FF0000">00000000</span><span style="color:#00FF00">00000000</span><span style="color:#0000FF">11111111</span></code>

That is 24-bits in all. However, a 32-bit value can provide room for the additional alpha channel -- of course, this consumes more storage, too. The same blue with an opacity of around 25% is therefore stored as:

<code><span style="color:#FF0000">00000000</span><span style="color:#00FF00">00000000</span><span style="color:#0000FF">11111111</span><span style="color:#999999">01000001</span></code>

This alpha feature is especially handy for placing images seamlessly over other background images.

<figure>
  <img style="background-position:-864px -80px; background-image:url({{ site.url }}/img/pitl06/image-formats-gif-jpg-png.png); height:300px" />
  <figcaption>The PNG produces smooth gradients using a large (greater than 256) pallet of colours. One cannot detect the boundaries of the graphic. The glow is comprised of many levels of semi-opaque blues, and blends beautifully over the starry background.</figcaption>
</figure>

Notably, PNGs do not support animation. The APNG (Animated Portable Network Graphics) format has failed to gain traction with some major Web Browsers. When dealing with photographs, JPGs tend to trump PNGs in terms of quality-for-size. PNGs, however excel for 'richly coloured' GIF-type graphics, like screenshots.

To reiterate, it's best to experiment with the different formats to see which is most appropriate for the graphic you wish to optimise.

## Colour Channels



## Halftones

...

## Tint and Transparency

...
https://py.processing.org/reference/tint.html
...

## Image Kernels

...

<math>
  <mfenced open = "[" close="]">
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
  <mfenced open = "[" close="]">
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
  <mfenced open = "[" close="]">
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

https://en.wikipedia.org/wiki/August_Macke

https://py.processing.org/reference/ -- creating and reading
https://py.processing.org/reference/ -- pixels

http://setosa.io/ev/image-kernels/
https://en.wikipedia.org/wiki/Kernel_(image_processing)



## Lesson 07

...


**Begin Lesson 07:** Soft-Faces *(coming soon)*

[Complete list of Processing lessons]({{ site.baseurl }}/#processing)

## References

* ...
