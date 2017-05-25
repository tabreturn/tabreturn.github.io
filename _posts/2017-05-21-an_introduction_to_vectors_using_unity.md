---
layout: post
comments: true
title: "An Introduction to Vectors Using Unity"
categories: code physics unity
---

Firstly: this post looks at vectors, *as in physics* (not scalable graphics) otherwise referred to as *Euclidean vectors*. Unity includes classes for dealing with 2- and 3-dimensional vectors, but the purpose of this tutorial is to understand vector concepts and math from the bottom up. You will write your own 2D vector code from scratch, and once this is complete, take a look at Unity's built-in vector functions.

## Introduction

To keep things as simple as possible, this tutorial makes use of *UnityScript*. Anyone familiar with the basics of Unity, and some programming language (be JavaScript, Python, C#, or something similar), should grasp things just fine. To get started, all you'll need is [Unity](https://unity3d.com/), and:

* this <a href='{{ site.url }}/img/aitvuu/nyan_cat.png' download>Nyan Cat graphic</a>;
* and this [font, named Wendy](http://www.dafont.com/wendy.font) (by none other than Wendy, apparently).

## Creating a New Document

...

<figure>
  <img src='{{ site.url }}/img/aitvuu/01-new-document.png'>
  <figcaption>Averaged proportions of RGB channels (left) versus the luminosity ratio (right).</figcaption>
</figure>

...

{% highlight js %}
// use either 'averaged' or 'luminosity'
var algorithm = 'luminosity';
// the selector ID you wish to affect
var selector = document.getElementById('alert');
{% endhighlight %}



## Further Reading

Although [Tanner Helland's blog post]( http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/) on the topic.

## References

* http://natureofcode.com/book/chapter-1-vectors/
* http://natureofcode.com/book/chapter-2-forces/
* https://unity3d.com/learn/tutorials/topics/scripting/vector-maths
