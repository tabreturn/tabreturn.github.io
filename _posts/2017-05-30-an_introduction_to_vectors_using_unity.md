---
layout: post
comments: true
title: "An Introduction to Vectors Using Unity"
categories: code physics unity
---

<!-- unityscript error highlight conceal -->
<style> .err {background-color: transparent !important} </style>

Firstly: this post looks at vectors, *as in physics* (not scalable graphics) otherwise referred to as *Euclidean vectors*. Unity includes classes for dealing with 2- and 3-dimensional vectors, but the purpose of this tutorial is to understand vector concepts and math from the bottom up. You will write your own 2D vector code from scratch, and once this is complete, take a look at Unity's built-in vector functions.

## Introduction

To keep things as simple as possible, this tutorial makes use of *UnityScript*. Anyone familiar with the basics of Unity, and some programming language (be JavaScript, Python, C#, or something similar), should grasp things just fine. To get started, all you'll need is [Unity](https://unity3d.com/), and:

* this <a href='{{ site.url }}/img/aitvuu/nyan_cat.png' download>Nyan Cat graphic</a>;
* and this [font, named Wendy](http://www.dafont.com/wendy.font) (by none other than Wendy, apparently).

## Creating a New Document

Begin by creating a new project in **2D** project in Unity:

<figure>
  <img src="{{ site.url }}/img/aitvuu/00-new-document.png" class="full" />
</figure>

Import the [nyan_cat.png]({{ site.url }}/img/aitvuu/nyan_cat.png) graphic (which you can do by simply dragging into the **Assets** panel), and using the **Inspector** panel on the right, set the graphic's *Pixels per Unit* to `30` and *Filter Mode* to `Point`.

<figure>
  <img src="{{ site.url }}/img/aitvuu/01-nyan-cat-settings.png" class="full" />
</figure>

Now add (drag) `nyan_cat` to the **Hierarchy** panel (at the top-left).

<figure>
  <img src="{{ site.url }}/img/aitvuu/02-nyan-cat-hierarchy.png" class="full" />
</figure>

Create a new sprite by right-clicking in the **Assets** panel and selecting **Create > Sprites > Square**. Drag this new square into the **Hierarchy** panel and name the instance "platform".

<figure>
  <img src="{{ site.url }}/img/aitvuu/03-create-platform.png" class="full" />
</figure>

From here on in, you'll be making adjustments to the instances of the nyan_cat and platform in the Hierarchy panel, so don't worry about those in the Assets panel. Scale and position the platform as per the screenshot below:

<figure>
  <img src="{{ site.url }}/img/aitvuu/04-position-platform.png" class="full" />
  <figcaption>Note that you'll need to be in <b>Scene</b> view to use the visual move & scale tools.</figcaption>
</figure>

At this point you can test the game (using the play button), but nothing will happen. Nyan Cat and the platform remain suspended, seemingly frozen in the positions you have placed them.

With your `nyan_cat` instance selected, using the **Add Component** button in the **Inspector** panel, select a **Physics 2D > Rigidbody 2D**:

<figure>
  <img src="{{ site.url }}/img/aitvuu/05-add-rigidbody.png" class="full" />
</figure>

If you test/play the scene again, Nyan Cat will drop, falling straight through the platform. Now add a Rigidbody 2D to the platform, as well -- however, check/tick the `Y` and `Z` *Constraints* under the **Rigidbody 2D** parameters to prevent gravity pulling it down:

<figure>
  <img src="{{ site.url }}/img/aitvuu/06-platform-constraints.png" class="full" />
</figure>

Finally, add a **Box Collider 2D** component (also found within Physics 2D) to both Nyan Cat and the platform, so that they behave like 'solid' objects:

<figure>
  <img src="{{ site.url }}/img/aitvuu/07-add-box-collider.png" class="full" />
  <figcaption>Be sure to add the Box Collider to both Nyan Cat and the platform.</figcaption>
</figure>

Play the scene. Nyan Cat should now drop and land/stop on the platform.

## Adjusting the Scale for Easier Math

Before getting into the code and mathy stuff, it's best to scale everything in order to make the numbers a bit more sensible to work with. This step will allow you to avoid long decimals in favour of single- and double-digit integers. You wouldn't scale things so dramatically -- and it'll incur some odd side-effects, as you'll come to see -- but understanding vectors will be easier using values like `[1, 5]` instead of `[0.0025, 0.0125]`.

Make the necessary adjustments to the following in the Hierarchy:

* "Main Camera" -- in the **Camera** component, set the *Background* (Hex Colour) field to `00447700`, and the *Size* field to `2000`.

<figure>
  <img src="{{ site.url }}/img/aitvuu/08-camera-settings.png" class="full" />
</figure>

* "nyan_cat" -- in the **Transform** component, set both the *X* and *Y* *Scale* to `500`.

<figure>
  <img src="{{ site.url }}/img/aitvuu/09-nyan-cat-scale.png" class="full" />
</figure>

* "platform" -- in the **Transform** component, set the *X* to *Y* *Scale* to `2800` and `15` respectively. You'll also need to reposition the platform using the *Y* *Position* value (around `-1500`).

<figure>
  <img src="{{ site.url }}/img/aitvuu/10-platform-scale.png" class="full" />
</figure>

If you play the scene now, it should look somethig like this:

<figure>
  <img src="{{ site.url }}/img/aitvuu/11-test-scale.png" class="full" />
</figure>

However, everything should move far more slowly -- although Nyan Cat is actually moving at the same speed as before. This is because (s)he is now 500 times larger -- about 500 m<sup>3</sup> in size in terms of Unity physics! So, what was a cat falling a few meters, is now more like a massive meteoroid hurtling through space ... which is rather fitting.

Remember, though, this scaling makes the math simpler, so it's all relative and won't actually make any difference when you start writing some code to replace Unity's physics with your own. This, the final step here is to remove the **Rigidbody 2D** and **Box Collider 2D** components from both Nyan Cat and the platform. You can do this using the menu under the cog icon:

<figure>
  <img src="{{ site.url }}/img/aitvuu/12-remove-component.png" class="full" />
</figure>

## Adding Some Code

Using **Add Component > New Script**, add a new *Java Script* to Nyan Cat; name it "Vectors":

<figure>
  <img src="{{ site.url }}/img/aitvuu/13-vectors-script-component.png" class="full" />
</figure>

### Basic Movement and 'Gravity' the Non-Vector Way

Begin by adding some simple code to your Vector scripts to pull Nyan Cat downward:

{% highlight js %}
#pragma strict

function Start () {

}

var y:float = 0;
var YSpeed:float = 6;

function Update () {
  y += YSpeed;
  transform.position.y = y;
}
{% endhighlight %}

Now that Nyan Cat is falling, add some lateral movement:

{% highlight js %}
...

var x:float = 0;
var y:float = 0;
var XSpeed:float = 6;
var YSpeed:float = 6;

function Update () {
  x += XSpeed;
  transform.position.x = x;

  y += YSpeed;
  transform.position.y = y;
}
{% endhighlight %}

You can edit the variables in the code, but Unity's Inspector makes things easier for you (and can be edited during play):

<figure>
  <img src="{{ site.url }}/img/aitvuu/14-inspector-variables.png" class="full" />
</figure>

## Adding a HUD

While you can watch the Inspector to track any variable values, a Heads-Up Display adds a nice touch. Add the Wendy ([wendy.ttf]((http://www.dafont.com/wendy.font))) file to your Assets. You can simply drag it into Unity. Then, from the menu bar, select **GameObject > UI > Text** -- this will create a new Text component. Using the Inspector:

* enter into the *Text* field: `wind: -5`, and on a new line, `gravity: -10`;
* set the *Font* to `Wendy`;
* *Vertical Overflow* to `Overflow`;
* and then adjust *width/height/PosX/PosY* under **Rect Transform** to place the HUD at top-left.

<figure>
  <img src="{{ site.url }}/img/aitvuu/15-add-hud.png" class="full" />
</figure>

You'll control the HUD output dynamically using your code, but for now, simply set your variable values to match those in the HUD:

{% highlight js %}
...

var x:float = 0;
var y:float = 0;
var XSpeed:float = -5;
var YSpeed:float = -10;

...
{% endhighlight %}

Unity will retain the last values in the Inspector, so use the cog icon menu to **Reset** them:

<figure>
  <img src="{{ site.url }}/img/aitvuu/16-reset-values.png" class="full" />
</figure>

The next step is to rewrite the code using a vector approach, but, first, an introduction to vectors is required.

## Vectors -- The Fundamentals

According to [Wikipedia](https://en.wikipedia.org/wiki/Euclidean_vector), "a Euclidean vector, used to represent physical quantities that have both magnitude and direction". That's a pretty accurate description, but to make things clearer, consider this diagram:

<figure>
  <img src="{{ site.url }}/img/aitvuu/17-.svg" />
</figure>



https://www.khanacademy.org/math/precalculus/vectors-precalc


















## Further Reading

Although [Tanner Helland's blog post]( http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/) on the topic.

## References

* http://natureofcode.com/book/chapter-1-vectors/
* http://natureofcode.com/book/chapter-2-forces/
* https://unity3d.com/learn/tutorials/topics/scripting/vector-maths
... Nyan Cat ...
