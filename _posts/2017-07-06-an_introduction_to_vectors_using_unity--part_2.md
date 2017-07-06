---
layout: post
comments: true
title: "An Introduction to Vectors Using Unity -- part 2"
categories: code physics unity
---

<!-- unityscript error highlight conceal -->
<style> .err {background-color: transparent !important} </style>

This is the second post in a three part tutorial series introducing vectors. It extends on what was produced in part 1. If you missed this, you should start [here]({% post_url 2017-06-20-an_introduction_to_vectors_using_unity--part_1 %}).

This installment covers normalizing vectors, dynamic HUD read-outs, and coding additional physics (such as acceleration and friction).

## Normalizing Vectors

*Normalization* refers to a process that adjusts something to bring it within a regular/normal range. For example, many albums in my MP3 collection are louder than others. This isn't a problem when listening to an album from start to finish, but when I switch to playing random songs across my entire collection, I'm constantly having to adjust the volume dial. To solve this problem, I scanned the entire collection using [ReplayGain](https://en.wikipedia.org/wiki/ReplayGain) software. This software analyses and adds some metadata to each track indicating what its overall "loudness" is compared to a standard of 89 dB. When my audio player loads a track, it reads the ReplayGain metadata and automatically adjusts the volume to compensate, thus *normalizing* the loudness of the tracks. The tracks still contain the same audio information, but the playback volume is now governed by my dial.

Normalizing vectors works on a similar principle: the length/magnitude of the vector is converted to a standard unit (of 1) from which it can be increased or decreased while still containing the same direction information. To accomplish this, the *x*, *y*, and *length* values are divided by the length, resulting in a magnitude of 1:

<figure>
  <img src="{{ site.url }}/img/aitvuup2/00-normalizing-vector.svg" />
  <figcaption>With a magnitude of 1 (5 &#247; 5), the x side is equal to 0.8 (4 &#247; 5), and the y side is equal to 0.6 (3 &#247; 5).</figcaption>
</figure>

The result is referred to as a *unit vector*. Unit vectors are notated using a circumflex -- for example unit vector **u** would be written as **&#251;**.

### Normalizing Nyan Cat's Key Input

At the end of [part 1]({% post_url 2017-06-20-an_introduction_to_vectors_using_unity--part_1 %}#vector-magnitude) the **Console** output revealed that Nyan Cat's key input can reach a magnitude of *~16.97* diagonally, yet never exceeds 12 when it's directly vertical or horizontal:

<figure>
  <img src="{{ site.url }}/img/aitvuup2/01-log-magnitude.png" class="fullwidth" />
</figure>

To recap, the `Update` code multiplies the key input by `12` to produce greater thrust:

{% highlight js %}
function Update () {
  input.x = Input.GetAxis('Horizontal');
  input.y = Input.GetAxis('Vertical');
  input = multiply(input, 12);
  Debug.Log("nyan cat's input magnitude: " + magnitude(input));

  ...
{% endhighlight %}

To ensure that Nyan cat moves 12 in every direction, the vector must be normalized, then multiplied it by 12. Add a `normalize` function to perform the arithmetic (of dividing every side by the length), and employ it in the `Update` function:

{% highlight js %}
...

function normalize(v:Vector) {
  var length:float = magnitude(v);
  var norm:Vector;
  norm = divide(v, length);
  return norm;
}

...

function Update () {
  input.x = Input.GetAxis('Horizontal');
  input.y = Input.GetAxis('Vertical');
  input = normalize(input); // normalize thrust
  input = multiply(input, 12);
  Debug.Log("nyan cat's input magnitude: " + magnitude(input));

  ...
{% endhighlight %}

Save your code and test. Nyan Cat will have frozen, but you can use the arrow keys to generate Console output, regardless. Note how, for any directional input (diagonal or otherwise), the `Debug.Log` reads:  
`nyan cat's input magnitude: 12`

<figure>
  <img src="{{ site.url }}/img/aitvuup2/02-normalize-error.png" class="fullwidth" />
  <figcaption>The "Collapse" option groups any duplicate console output. You can identify which lines are actively being logged by their changing line count.</figcaption>
</figure>

The input magnitude is now equal in all directions. The problem is that Nyan Cat has stopped moving altogether! However, there are `NaN` errors in the console to provide some hint as to what could be wrong. If you are not familiar with such errors, `NaN` is an acronym for *Not a Number*. In this case, the `normalize` function is returning a `NaN` in the absence of key input -- which is actually the result of a division by zero. Update the `normalize` function to resolve this:

{% highlight js %}
function normalize(v:Vector) {
  var length:float = magnitude(v);
  var norm:Vector;

  if (length != 0) {
    norm = divide(v, length);
    return norm;
  }
  else {
    return v;
  }
}
{% endhighlight %}

Nyan Cat is moving again, but is unable to move diagonally-up-and-left (northwest) across the screen. (S)he can no longer achieve a diagonal input thrust of 16.7 -- instead maxing out at 12 -- and is overwhelmed by the combined forces of wind and gravity

You will also notice a slightly delayed reaction to releasing the arrow keys. This has nothing to do with your code, but is related to the input manager settings.

### Input Manager Settings

The Unity *Input Manager* allows you to reference your inputs by axis name -- for example: `Input.GetAxis('Vertical')`. This is useful because you can map multiple device axes (of gamepads, keyboards, etc.) to the same name, and furthermore, reconfigure your inputs without having to edit your code.

The delayed input Nyan Cat is experiencing is due to Unity's analog stick emulation. Whereas a key registers as either pressed or not pressed, an analog input is sensitive to any pressures between. For this reason, keys and buttons return a `0` *or* `1`, whereas analog inputs return a floating-point value ranging from `0.0` *to* `1.0`. More correctly speaking, because the analog stick's up and down are diametrically opposed, the `Input.GetAxis('Vertical')` values range between `-1.0` and `1.0`. When Unity is handling axis input from a keyboard, it mimics an analog stick by returning floating-point values --  and even goes a step further: when one releases an arrow key, Unity simulates the stick's re-centering by returning a range of values before reaching zero again.

The normalize function does not work well with this, rounding the floating-point values to 1 (or -1) while the simulated re-centering is taking place. However, Unity provides a setting to control the spring-back force, termed *Gravity*. Select **Edit > Project Settings > Input** and then, using the Inspector, set the *Gravity* to `3000` for both the *Horizontal* and *Vertical* axes:

<figure>
  <img src="{{ site.url }}/img/aitvuup2/03-adjust-input-gravity.png" class="fullwidth" />
  <figcaption>Be sure to set the Gravity to 3000 in both the <b>Horizontal and Vertical</b> sections.</figcaption>
</figure>

Save your code and test to confirm that the key delay issue has been resolved.

## Connecting the HUD

Currently, the HUD displays static information. Should you change the gravity or wind values, it will not reflect this. However, now that the magnitude of each force can be measured in real-time, the HUD can be connected to your code.

Select the object named *Text* in your hierarchy, and add a new script component to it named "HUD":

<figure>
  <img src="{{ site.url }}/img/aitvuup2/04-connect-hud.png" class="fullwidth" />
  <figcaption>The Text object is nested within the Canvas object.</figcaption>
</figure>

The code for the HUD script is fairly straight-forward. The `vec` variable points to Nyan Cat's "Vector" script, from which it retrieves the magnitudes of each force, outputting them to the HUD using the `.text` method:

{% highlight js %}
#pragma strict

import UnityEngine.UI;

var vec:Vectors;
var hud:Text;

function Start () {
  var nyan = GameObject.Find('nyan_cat');
  vec = nyan.GetComponent.<Vectors>();
  hud = GetComponent.<Text>();
}

function Update () {
  var w:float = vec.magnitude(vec.wind);
  var g:float = vec.magnitude(vec.gravity);
  var v:float = vec.magnitude(vec.velocity);
  var i:float = vec.magnitude(vec.input);

  hud.text =  'wind: '     + w + '\n';
  hud.text += 'gravity: '  + g + '\n';
  hud.text += 'velocity: ' + v + '\n';
  hud.text += 'input: '    + i + '\n';
}
{% endhighlight %}

You should now have a functioning HUD, listing four forces in real-time:

<figure>
  <img src="{{ site.url }}/img/aitvuup2/05-working-hud.png" class="fullwidth" />
</figure>

Remove the `Debug.Log` line in the "Vectors" script, now that it is no longer necessary.

## Acceleration

The `Update` function adds the sum total of the all vectors acting on Nyan Cat to the feline's previous location. No matter how many forces are included, the same principle applies. Consider, for example, a scenario with updrafts, thrusters, propellers, and afterburners:

{% highlight js %}
  ...
  velocity = add(velocity, gravity);
  velocity = add(velocity, wind);
  velocity = add(velocity, updraft);
  velocity = add(velocity, thruster);
  velocity = add(velocity, propeller);
  velocity = add(velocity, afterburner);

  location = add(location, velocity);
  ...
{% endhighlight %}

However, implementing acceleration requires a new variable that can accumulate velocity. This is because the velocity is equal to itself plus the acceleration -- and the acceleration increases with each frame.

Add a new `acceleration` variable to the "Vectors" script; then edit the update `Update` function:

{% highlight js %}
...
var input:Vector;
var acceleration:Vector;

...

function Update () {
  input.x = Input.GetAxis('Horizontal');
  input.y = Input.GetAxis('Vertical');
  input = normalize(input);
  input = multiply(input, 12);

  acceleration = add(gravity, wind);
  acceleration = add(acceleration, input);

  velocity = add(velocity, acceleration);

  location = add(location, velocity);
  transform.position.x = location.x;
  transform.position.y = location.y;
}
{% endhighlight %}

As there is no deceleration (yet), Nyan Cat will accumulate speed rapidly. Zero the *Gravity* and *Wind* using the Inspector, then test, and monitor the HUD to see how the velocity is increased as you continue to add further input in the same direction:

<figure>
  <img src="{{ site.url }}/img/aitvuup2/06-test-acceleration.png" class="fullwidth" />
</figure>

Were you to add a duplicate Nyan Cat to the simulation, (s)he would accelerate at an equal rate. But, what if this new Nyan Cate were made of lead? Lead weighs than pop-tarts and fur, and -- with the same forces were applied -- should accelerate more gradually. More correctly speaking, lead has greater *mass*.

### Adding Mass

Newton's second law states that *force equals mass times acceleration.* For coding this simulation, it's useful to switch things around a bit so that   
`force = mass × acceleration`  
is restated as:   
<code>acceleration = force &#247; mass</code>

Now apply this formula to the "Vector" script by adding a new `mass` variable, and adjusting the `Update` function:

{% highlight js %}
...
var mass:float = 50;

...

function Update () {
  ...

  // replace this
  //acceleration = add(gravity, wind);
  //acceleration = add(acceleration, input);

  // with this
  acceleration = add(gravity, wind);
  var force:Vector = add(acceleration, input);
  acceleration = divide(force, mass);

  ...
{% endhighlight %}

Save and test. You will notice that Nyan Cat accelerates more gradually -- but you can also adjust the *Mass* using the Inspector to see how different values affect the simulation.

## Friction

The only way to slow Nyan Cat's heading in a given direction is to apply an opposite force using the arrow keys. Friction behaves in exactly the same way. Well, technically speaking, not *exactly*, but this tutorial is about vectors not precise physics.

The `velocity` variable represents Nyan Cat's current speed and heading, so calculating an inverse velocity is simple enough. Like finding the inverse of any scalar value, this is a multiply by `-1` calculation:

{% highlight js %}
function Update () {
  ...

  velocity = add(velocity, acceleration);
  friction = multiply(velocity, -1);
  velocity = add(velocity, friction);

  ...
{% endhighlight %}

Edit your code to match that of the above, then save and test. Note how Nyan Cat is unable to move, as, no matter what forces are added to the velocity, an equal and opposite force is applied by the friction. Reduce the friction coefficient (usually represented as μ) from `-1` to `-0.05`:

{% highlight js %}
  ...
  friction = multiply(velocity, -0.05);
  ...
{% endhighlight %}

Save and test. Nyan Cat now accelerates and decelerates, however, the velocity never quite reaches zero:

<figure>
  <img src="{{ site.url }}/img/aitvuup2/07-test-friction-stop.png" class="fullwidth" />
  <figcaption>The velocity value (floating-point) is a simplified representation of <code>0.000000000000000000004498928</code></figcaption>
</figure>

### Bringing Nyan Cat to a Complete Stop

The simplest way to bring Nyan Cat's velocity to a complete halt is to round it to zero. Add a `chop` function that harnesses Unity's `Mathf.Abs`:

{% highlight js %}
...

function chop(v:Vector, tolerance:float) {
  var mag:float = magnitude(v);
  var result = new Vector();

  if (Mathf.Abs(mag) > tolerance) {
    result = v;
  }

  return result;
}

...
{% endhighlight %}

`Mathf.Abs` does the rounding down, and if this result falls within `tolerance` parameter, a zero is returned. Call the function in the `Update` function, and set the tolerance to `0.01`:

{% highlight js %}
function Update () {
  ...
  velocity = add(velocity, friction);
  // halt if within 0.01 of zero
  velocity = chop(velocity, 0.01);

  ...
{% endhighlight %}

Save, test, and confirm that Nyan Cat is able to reach a complete stop. Play around with the force values using the inspector, and perhaps consider a new `float` variable for your key input multplier.

The next step involves substituting your code with Unity's built-in features.

## Further Reading

Daniel Shiffman's *Nature of Code* focuses on the programming strategies and techniques behind computer simulations of natural systems using Processing. It's an excellent book, and a major inspiration for this post, that will take you far further and deeper into this subject matter. If you've found the tutorial interesting thus far, I highly recommend you give it a read. You can buy it in print, or read free online. Check it out [here](http://natureofcode.com/).

## Part 3

Part 3 concludes with the Unity's built-in vector implementations.

## References

https://www.khanacademy.org/math/precalculus/vectors-precalc

* http://natureofcode.com/book/chapter-1-vectors/
* http://natureofcode.com/book/chapter-2-forces/
* https://unity3d.com/learn/tutorials/topics/scripting/vector-maths