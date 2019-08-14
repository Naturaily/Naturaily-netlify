---
title: Multiprocessing in Ruby – a Good Alternative to Threads?
description: >-
  Inspired by Python’s multiprocessing module I began to think about the
  parallelism in Ruby. Of course, there are several ways to get closer, but in
  this post I’ll try to focus on the “Process” class. 
slug: multiprocessing-in-ruby
layout: post
date: '2019-08-14 10:01:00 +0200'
category: Ruby on Rails development
author: Kamil Sopata
authors: Kamil Sopata
avatar: /assets/images/kamil-sopata.png
image: /assets/images/multiprocessing-in-ruby-a-good-alternative-to-threads_.png
text-preview: >-
  Parallel computing is a cure for performance issues. It allows to do several
  things at once, which sounds great in the context of background jobs. Inspired
  by Python’s multiprocessing module I began to think about the parallelism in
  Ruby. Of course, there are several ways to get closer, but in this post I’ll
  try to focus on the “Process” class. But before we start, I recommend that you
  quickly recall the differences between a process and a thread.
tags:
  - Ruby on Rails development
---
Parallel computing is a cure for performance issues. It allows to do several things at once, which sounds great in the context of background jobs. Inspired by [Python’s multiprocessing module](https://docs.python.org/3.7/library/multiprocessing.html){:rel="nofollow"}{:target="_blank"} I began to think about the parallelism in Ruby. Of course, there are several ways to get closer, but in this post I’ll try to focus on the “Process” class. But before we start, I recommend that you quickly recall the differences between a process and a thread:

{% youtube Dhf-DYO1K78 %}

## What Is Wrong With Ruby as Multi-threaded Programming Language?

Ruby offers the “Thread” class that implements a number of methods for handling concurrent tasks. It sounds really promising on paper – opening new threads in which we can execute code and then wait until each thread finishes. Awesome, right?

Unfortunately, it is not as amazing as it seems. Why? First of all, you need to know what it really looks like under the hood. 

In the whole post I will be using a simple Fibonacci sequence algorithm, because it takes some time to compute:

```ruby
def fib(n)
  return n if [0,1].include?(n)
  fib(n-1) + fib(n-2)
end
```
