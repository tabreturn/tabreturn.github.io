---
layout: post
comments: true
title: "Processing.py in Ten Lessons – 3.1: Control Flow"
categories: code processing python
---

<p markdown="1" style="text-align:right">
&laquo; <a href="{{ page.previous.url }}">{{ page.previous.title | split:'–'| last }}</a> |
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
</p>

The programs you've written thus far execute line-by-line, beginning at the top of the code and ending at the bottom. You can visualise this flow as a set of steps chained together in a linear arrangement. In lesson 3, we explore how to lay divergent paths for the program to follow.

### Control Flow

A programmer can write various calls and conditions to reorder the linear sequence of execution -- a concept referred to as *control flow* -- thereby directing the program to skip, jump to, and repeat lines.

<figure>
  <img src="{{ site.url }}/img/pitl03/intro-flowchart.svg" />
  <figcaption>Sequential (left) versus control-flowed execution (right).</figcaption>
</figure>

Control flow allows for more 'intelligent' programs. As an example: consider that you wish to fill the display window with circles.

<figure>
  <img src="{{ site.url }}/img/pitl03/intro-circles.svg" />
  <figcaption>9-circle (left) and 81-circle (right) layouts.</figcaption>
</figure>

A 9-circle arrangement requires writing nine `ellipse` functions; this is manageable enough. However, writing eighty-one `ellipse` lines is tedious. Using control flow statements, one can instead instruct Processing to add as many circles as are required, ceasing once eighty-one have been placed. This allows for more dynamic code, i.e. you specify the size of circles, and the program calculates how many columns and rows are required. Additionally, this approach can better cater for random diameter values.

Lesson 3 covers topics involving conditional statements and iteration. Implementing such logic may require you to think in new ways. If you find yourself struggling with something, do not stress, that's normal! With a little perseverance, you’ll soon grasp whatever is that has you snagged.

You'll also explore randomness -- one of the most powerful and exciting tools in the creative programmer's tool-set.

<p style="text-align:right" markdown="1">
<a href="{{ page.next.url }}">{{ page.next.title | split:'–'| last }}</a> &raquo;<br />
[Complete list of Processing.py lessons]({{ site.baseurl }}/#processing-reverse)
</p>
