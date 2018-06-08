---
layout: post
comments: true
title: "An Introduction to Vectors Using Unity -- part 3"
categories: code physics unity
---

<!-- unityscript error highlight conceal -->
<style> .err {background-color: transparent !important} </style>

This is the third and final part in an introductory series on vectors. The instalment covers substituting the existing vector code with Unity's built-in features, extending upon what was produced in parts 1 and 2. If you missed these, begin with [part 1]({% post_url 2017-06-20-an_introduction_to_vectors_using_unity_--_part_1 %}).

## Replacing Components

Unity includes built-in features for dealing with 2- and 3-dimensional vectors -- so when adding any components or code, you will need to ensure that you are using the variants relevant to your project. Furthermore, Unity naming conventions tend to 'assume' things are 3D by default -- for example, the *"Rigidbody"* component handles 3D physics, whereas the *"Rigidbody 2D"* is for 2D physics.

Select Nyan Cat and disable/uncheck the existing *Vectors (Script)* component; then add a Rigidbody 2D component using **Add Component > Physics 2D > Rigidbody 2D**:

<figure>
  <img src="{{ site.url }}/img/aitvuup3/00-disable-vectors-and-add-rigidbody.png" class="fullwidth" />
</figure>

Test the adapted setup. Nyan Cat will drop under the force of gravity (slowly, as Nyan Cat's dimensions have been substantially upscaled) but will pass through the platform below. Adding a **Box Collider 2D** to both Nyan Cat and the platform resolves the issue:

<figure>
  <img src="{{ site.url }}/img/aitvuup3/01-add-box-colliders.png" class="fullwidth" />
  <figcaption>Ctrl/Cmd-click selecting objects in the Hierarchy panel allows one to add components to multiple objects simultaneously.</figcaption>
</figure>

With Unity physics now in effect, and the existing vectors script disabled, you can begin a new script to handle Nyan Cat's movement using the built-in vector features. Add a new script component to Nyan Cat named "UnityVectors":

<figure>
  <img src="{{ site.url }}/img/aitvuup3/02-add-unityvectors-script-component.png" class="fullwidth" />
</figure>

Copy the entire `Update` function from the disabled Vectors script and paste it over the UnityVectors'. The UnityVectors script (with all commented code removed) will now read as follows:

{% highlight js %}
#pragma strict

function Start () {

}

function Update () {
  input.x = Input.GetAxis('Horizontal');
  input.y = Input.GetAxis('Vertical');
  input = normalize(input);
  input = multiply(input, inputmultiplier);

  acceleration = add(gravity, wind);
  var force:Vector = add(acceleration, input);
  acceleration = divide(force, mass);

  velocity = add(velocity, acceleration);
  friction = multiply(velocity, -0.05);
  velocity = add(velocity, friction);
  velocity = chop(velocity, 0.01);

  location = add(location, velocity);
  transform.position.x = location.x;
  transform.position.y = location.y;
}
{% endhighlight %}

Save and test the simulation. Unsurprisingly, the game fails to start and the Console panel lists multiple errors. To better understand how Unity's vector classes function, you will now replace the code a section at a time.

## Replacing Code

Unity provides predefined classes for handling 2- and 3D vectors. Define a new `Vector2` variable to hold the player's key input values; and comment out everything within the the Update function, except for the `GetAxis` lines:

{% highlight js %}
#pragma strict

var input = Vector2();

function Update () {
  input.x = Input.GetAxis('Horizontal');
  input.y = Input.GetAxis('Vertical');
  /*
  input = normalize(input);
  ...
  */
}
{% endhighlight %}

Save the code and test. Because the `input` variable is datatyped as a 2D vector, the Inspector now displays *X-* and *Y* fields for it.

<figure>
  <img src="{{ site.url }}/img/aitvuup3/03-testing-input-vector2d.png" class="fullwidth" />
  <figcaption>Pressing the up key during play results in a Y-Input value of 1.</figcaption>
</figure>

To normalize vectors, use the Vector2 class's `normalize` method; to multiply vectors, make use of the `*` operator:

{% highlight js %}
  ...
  input.x = Input.GetAxis('Horizontal');
  input.y = Input.GetAxis('Vertical');
  input = input.normalized;
  input = input * 12;
  /*
  input = normalize(input);
  ...
  */
}
{% endhighlight %}

Now define additional Vector2 variables for the other forces, and then add them using `+` operators in order to calculate the acceleration:

{% highlight js %}
...

var input = Vector2();
var wind = Vector2();
var acceleration = Vector2();

function Update () {
  input.x = Input.GetAxis('Horizontal');
  input.y = Input.GetAxis('Vertical');
  input = input.normalized;
  input = input * 12;

  acceleration =  wind + input;
  ...
{% endhighlight %}

No `gravity` variable is required. Unless specified otherwise, all rigidbody objects are affected by the gravity of the physics engine. Applying other forces to Nyan Cat is accomplished using the Rigidbody2D component's `AddForce` method:

{% highlight js %}
  ...

  acceleration = gravity + wind + input;
  GetComponent.<Rigidbody2D>().AddForce(acceleration);
  ...
{% endhighlight %}

Using the Inspector panel, locate to the Rigidbody 2D component's *Mass* field -- Nyan Cat's *Mass* is currently set to `1`; change it to `0.1` . This wouldn't always be necessary, but accommodates for the upscaled environment. The *Use Auto Mass* option calculates a mass based on size/volume, so it should definitely be avoided in this instance! In the script's *Wind* field, enter an *X* value of `-0.5`.

<figure>
  <img src="{{ site.url }}/img/aitvuup3/04-adjust-mass-and-set-wind.png" class="fullwidth" />
</figure>

Save and test. The reduced mass will ensure that Nyan Cat doesn't feel too 'heavy', and the wind is in effect again, but the HUD no longer functions properly.

## Reconfiguring the HUD Script

The HUD script requires a few edits to get it working again. Here is the amended version:

{% highlight js %}
#pragma strict

import UnityEngine.UI;

var vec:UnityVectors;
var hud:Text;
var nyan:GameObject;

function Start () {
  nyan = GameObject.Find('nyan_cat');
  vec = nyan.GetComponent.<UnityVectors>();
  hud = GetComponent.<Text>();
}

function Update () {
  var w:float = vec.wind.magnitude;
  var g:float = Physics.gravity.magnitude;
  var v:float = nyan.GetComponent.<Rigidbody2D>().velocity.magnitude;
  var i:float = vec.input.magnitude;

  hud.text =  'wind: '     + w + '\n';
  hud.text += 'gravity: '  + g + '\n';
  hud.text += 'velocity: ' + v + '\n';
  hud.text += 'input: '    + i + '\n';
}
{% endhighlight %}

Save, then test to verify that the the HUD is working again.

<figure>
  <img src="{{ site.url }}/img/aitvuup3/05-complete.png" class="fullwidth" />
</figure>

## FixedUpdate

The Unity `Update` function runs once-per-frame. However, frame-rates fluctuate during play -- slowing noticeably under heavy processing loads. Physics calculations (i.e. anything dealing with Rigidbodies) should be placed within a `FixedUpdate` function. Open the *UnityVectors* script and move the `AddForce` line into `FixedUpdate` function:

{% highlight js %}
...

function FixedUpdate () {
  GetComponent.<Rigidbody2D>().AddForce(acceleration);
}
{% endhighlight %}

This probably won't make much of a difference in this simulation, but reflects best practices.

*End*

## References

* https://khanacademy.org/math/precalculus/vectors-precalc
* http://natureofcode.com/book/chapter-1-vectors/
* http://natureofcode.com/book/chapter-2-forces/
* https://unity3d.com/learn/tutorials/topics/scripting/vector-maths
* https://youtube.com/watch?v=QH2-TGUlwu4
