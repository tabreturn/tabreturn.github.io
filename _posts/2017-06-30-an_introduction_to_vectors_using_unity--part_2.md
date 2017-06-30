---
layout: post
comments: true
title: "An Introduction to Vectors Using Unity -- part 2"
categories: code physics unity
---

<!-- unityscript error highlight conceal -->
<style> .err {background-color: transparent !important} </style>

This is the second and final post in a series of tutorials introducing vectors. In this installment covers normalizing vectors, dynamic HUD read-outs, coding additional physics (acceleration & friction), and concludes with Unity's built-in vector implementations.

You will need to continue with what you produced in part 1. If you missed this, you should start [here]({% post_url 2017-06-20-an_introduction_to_vectors_using_unity--part_1 %}).

## Normalizing Vectors

Part 1 ended with a unsolved problem. Currently, the `Update` function reads as follows:

{% highlight js %}
function Update () {
  input.x = Input.GetAxis('Horizontal');
  input.y = Input.GetAxis('Vertical');
  input = multiply(input, 12);
  Debug.Log("nyan cat's input magnitude: " + magnitude(input));
  ...
{% endhighlight %}

This code multiplies the input by 12 to produce greater thrust. The problem, as revealed in the **Console** output is that the magnitude can reach *~16.97* with diagonal input, yet never exceeds 12 with directly vertical or horizontal input:

<figure>
  <img src="{{ site.url }}/img/aitvuup2/00-log-magnitude.png" class="fullwidth" />
</figure>


## Creating a New Document

...

## Further Reading

Nature of code ...

...source code ...

## References

https://www.khanacademy.org/math/precalculus/vectors-precalc

* http://natureofcode.com/book/chapter-1-vectors/
* http://natureofcode.com/book/chapter-2-forces/
* https://unity3d.com/learn/tutorials/topics/scripting/vector-maths
... Nyan Cat ...
