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

I prepared 2 benchmarks based on a method that looks for 35-element of the Fibonacci sequence. The first one executed `fib(35)` 10 times. The second one does the same thing but using threads. I also ran these benchmarks 3 times to ensure that the results are repeatable (I used a MacBookPro with 2 core 2,4 GHz Intel Core i5 and 8GB RAM):

```ruby
Benchmark.measure { 10.times { fib(35) } }
```

(CPU time | system CPU time | the sum of the user and system CPU times | elapsed real time)
38.243695   0.647830  38.891525 ( 41.074481)
36.667084   0.550266  37.217350 ( 38.464907)
38.844508   0.711785  39.556293 ( 42.610056)
`AVG: 40.72s`

```ruby
Benchmark.measure { 
  threads = []
  10.times do
    threads << Thread.new { Thread.current[:output] = fib(35) }
  end
  threads.each { |thread| thread.join }
}
```

38.623686   0.611559  39.235245 ( 40.751415)
38.077194   0.579472  38.656666 ( 39.956344)
38.445872   0.603536  39.049408 ( 40.273643)
`AVG: 40.33s`

The results are almost the same (the last column in bracket is the real time of execution). Why works it like this? Let’s dig a bit.

[Ruby interpreter (Matz's Ruby Interpreter)](https://en.wikipedia.org/wiki/Ruby_MRI){:rel="nofollow"}{:target="_blank"} uses [Global Interpreter Lock (GIL)](https://wiki.python.org/moin/GlobalInterpreterLock){:rel="nofollow"}{:target="_blank"} which is also used by other interpreters, such as CPython. GIL controls the execution in threads – only one thread can be executed at a time. Thus the benchmarks above are the same – in both cases, only one task is processed at a time. 

Each Ruby process always has one dedicated GIL that handles this process. Probably your first thought is – can’t we just turn off GIL? But it is not as easy as it seems – Ruby needs GIL because it avoids executions that aren’t thread-safe – for instance by the execution of non-atomic operations.

> We can define an atomic operation as any operation that is uninterruptible. – Robert C. Martin, Clean Code

It is worth checking out Ruby implementations using other interpreters. One of them is [JRuby](https://www.jruby.org/){:rel="nofollow"}{:target="_blank"} based on Java Virtual Machine – it has no GIL and handles real threading.

## Process-based parallelism

Ruby provides a [Process](https://ruby-doc.org/core-2.6.3/Process.html){:rel="nofollow"}{:target="_blank"} module which we can use to create new processes. Let’s try the multi-processes fib(n) execution:

```ruby
Benchmark.measure {
  read_stream, write_stream = IO.pipe
  10.times do
    Process.fork do
      write_stream.puts fib(35)
    end
  end
  Process.waitall
  write_stream.close
  results = read_stream.read
  read_stream.close
}
```

\=>
0.001240   0.005190  63.827237 ( 17.158324)
0.001579   0.007635  65.032995 ( 19.821757)
0.001433   0.006900  64.022068 ( 18.152649)
`AVG: 18.38s`



In this way, the execution took 22 seconds less than when using a single process implementation. I think it is a pretty good result. The OS scheduled new processes depending on which thread and core will be used to execute the code, and for how long. I have 2 cores on my MacBook Pro – the performance increased twofold (execution time is twice as fast) – do you see the analogy? More cores = better performance (in simplification and on condition that other processes won’t block them).

## Process Module – a Magic Cure?

You may know multiprocessing from Chrome browser – each tab, for security reasons, exists in a separate process. In Ruby environment creating a new child-processes may increase performance, but it also entails certain restrictions. First of all, new processes put additional responsibilities on the developer. Extra care is required for their execution. 

We always have to answer a few questions: will this solve our problems? When should we use multi-process architecture? How many processes should we run at one time? Do we need some kind of process limiter? How can too many existing processes affect our system? Will we be able to control the number of children-processes? What happens to the children-processes if the parent-process is killed? When is it worth using? 

It clearly shows – there are a lot of considerations along the way. Let’s try to resolve a few of them.

### When It makes Sense

Creating a multi-process application is much harder than creating a multi-threaded application. It makes sense when the number of new processes isn’t too big, their execution takes a long time (creating a process is a bit expensive – especially in MS Windows), we have a multi-core processor, we don’t want to share data between processes (or if we know how to share them safely) and when we don’t care about returning data from the process (which is a bit problematic). In general – each process should be independent, and the parent process should be the controller of these processes. Below you will find an example of a multi-process application.

[tabela]

