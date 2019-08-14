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
Parallel computing is a cure for performance issues. It allows to do several things at once, which sounds great in the context of background jobs. Inspired by [Python’s multiprocessing module](https://docs.python.org/3.7/library/multiprocessing.html){:rel="nofollow"}{:target="_blank"} I began to think about the parallelism in Ruby. Of course, there are several ways to get closer, but in this post I’ll try to focus on the `Process` class. But before we start, I recommend that you quickly recall the differences between a process and a thread:

{% youtube Dhf-DYO1K78 %}

## What Is Wrong With Ruby as Multi-threaded Programming Language?

Ruby offers the `Thread` class that implements several methods for handling concurrent tasks. It sounds really promising on paper – opening new threads in which we can execute code and then wait until each thread finishes. Awesome, right?

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

(CPU time | system CPU time | user and system CPU times | real time)
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

|                     | Thread                                                                                    | Process                                                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Memory**          | It uses less memory thanks to shared memory and working in the scope of a single process  | Everything (including shared memory) is isolated in the scope of the process, so it uses more memory                                               |
| :-------------      | :-------------:                                                                           | :-----:                                                                                                                                            |
| **Communication:**  | We can easily return value using shared memory                                            | Requires using ([IPC](https://opensource.com/article/19/4/interprocess-communication-linux-storage){:rel="nofollow"}{:target="_blank"}) as signals |
| :-------------      | :-------------:                                                                           | :-----:                                                                                                                                            |
| **Persistence:**    | It exists in one process, so it always ends with it                                       | There is a possibility to have “zombie” processes if the parent process are killed                                                                 |
| :-------------      | :-------------:                                                                           | :-----:                                                                                                                                            |
| **Initialization:** | It’s faster in creating and deleting threads                                              | It’s much more complex and needs more time for creating and deleting processes                                                                     |
| :-------------      | :-------------:                                                                           | :-----:                                                                                                                                            |
| **Maintenance:**    | It has fewer potential issues, is easier to implement, but can be more difficult to debug | It’s easier to debug, but we have to take care of process persistence, zombies, etc.                                                               |



### Too Many Existing Processes

In the previous example I forked 10 additional processes that counted the 35th-element of the Fibonacci sequence. What happens if I change this to a greater number of processes?

```ruby
# ...
20.times do
  Process.fork do
    write_stream.puts fib(35)
  end
end
 # ....
```

When the program was running I called `ps`:

```
➜  work ps | grep ruby
68743 ttys010    0:00.18 ruby test.rb
68756 ttys010    0:00.47 ruby test.rb
68757 ttys010    0:00.46 ruby test.rb
68758 ttys010    0:00.47 ruby test.rb
68759 ttys010    0:00.46 ruby test.rb
68760 ttys010    0:00.43 ruby test.rb
68761 ttys010    0:00.42 ruby test.rb
68762 ttys010    0:00.42 ruby test.rb
68763 ttys010    0:00.43 ruby test.rb
68764 ttys010    0:00.43 ruby test.rb
68765 ttys010    0:00.43 ruby test.rb
68766 ttys010    0:00.43 ruby test.rb
68767 ttys010    0:00.43 ruby test.rb
68768 ttys010    0:00.43 ruby test.rb
68769 ttys010    0:00.43 ruby test.rb
68770 ttys010    0:00.43 ruby test.rb
68771 ttys010    0:00.43 ruby test.rb
68772 ttys010    0:00.44 ruby test.rb
68773 ttys010    0:00.43 ruby test.rb
68774 ttys010    0:00.44 ruby test.rb
68775 ttys010    0:00.42 ruby test.rb
```

We have 21 ruby processes (1 parent and 20 subprocesses) – is it much? Actually we don’t know, because it depends on factors like hardware or current system load. Please take a look at the output from HTOP:

**Idle:**

![Idle](/assets/images/idle.png)

**Single-process script:**

![Single-process script](/assets/images/singleprocess.png)

**Multi-processes script:**

![Multi-processes script](/assets/images/multiprocess.png)

At first glance, we can see that multi-processes script makes better use of the computing power of my computer. I mentioned earlier that my processor has 2 physical cores, we can see here 4 thanks to Hyperthreading – Intel technology that divides one core into 2 virtual ones.

So can there be too many tasks (processes) in the operating system scheduler? The OS provides some limitation (depending on the platform). Unix systems have a built-in command “ulimit” which defines 2 types of limits:

* **Hard** – only root can set this and it can’t be exceeded,
* **Soft** – can be exceeded if necessary.

In Linux the limit of processes is set in the file /etc/security/limits.conf. On MacOS we can use \`launchctl limit maxproc\` (the first value is a soft limit, the second one is a hard limit). You can read more [here](https://wilsonmar.github.io/maximum-limits/){:rel="nofollow"}{:target="_blank"} .

Common sense says we shouldn’t create too many subprocesses. The screenshot from HTOP when Multi-processes script was running is a good example – processes requiring a large amount of computing power can consume even 100% of the CPU, which can lead to the loss of stability of the entire system! On top of that, we should care of memory. Let’s say one simple sub-process needs 10MB of memory and we want to fork it 10 times (1 parent, 10 children) – don’t be surprised, it will take more than 100MB of memory.

### Limitations

Limiting processes in Ruby is a complex problem. I started from a simple function, but unfortunately with a failure:

```ruby
def execute
  read, write = IO.pipe
  30.times do
    process_limiter
    Process.fork do
      write.puts fib(2)
    end
  end
  Process.waitall
  write.close
  results = read.read
  read.close
end

def process_limiter
  while current_processes > 15 do
    sleep(0.1) # there should be a better script to check if the number of children is decreasing
  end
end

def current_processes
  IO.popen('ps | grep "[r]uby"').read.split("\n").size  
end

execute
```

**Process.waitall**, according to the [documentation](https://apidock.com/ruby/Process/waitall/class){:rel="nofollow"}{:target="_blank"}  \`waits for all children, returning an array of pid/status pairs\`. All forked processes exists until the .waitall method is executed. Because of that, we can’t check `ps | grep "[r]uby"'` as above.

Children-processes send the [SIGCHLD signal](https://github.com/ruby/ruby/blob/master/process.c){:rel="nofollow"}{:target="_blank"}  to the parent-process if they exist, are interrupted, or resumed after interruption. Unfortunately Ruby doesn’t have a method that can list all current processes. 

It would be great if we could check simple (pseudocode):

```ruby
Process.children
```

with output: 

```
[
  [13013, #<Process::Status: pid 13013 exit 0>],
  [13014, #<Process::Status: pid 13014 running>],
  [13015, #<Process::Status: pid 13015 running>]
]
```

To achieve it we can use process status, which we can find, for instance, in `ps aux`:

```
➜ `ps aux | grep test.rb`
```

USER               PID  %CPU %MEM      VSZ    RSS   TT  STAT STARTED      TIME COMMAND
kamilsopata      20869   1.7  0.0  4300988   3808 s002  R+    7:14AM   0:04.19 ruby test.rb
kamilsopata      20902   1.7  0.0  4300988   3856 s002  R+    7:14AM   0:04.16 ruby test.rb
kamilsopata      20794   0.0  0.1  4300988  11708 s002  S+    7:14AM   0:00.20 ruby test.rb

As you can see – two processes have the status R+ (running in the foreground) and 1 has S+ (sleeping in the foreground). This can be quite useful information, description of all statuses can be found by entering: **man ps**.

Because Ruby can’t simply kill the completed process when other processes are still running (this is the responsibility of the **.wait** method) it makes it much harder to implement a process limiter, so we have to rely on the OS features and our brainpower.

The Process module offers also **.detach** method that we can use instead of **.wait** – it works similarly with the difference that with **detach** we don’t wait for the child process. In our example we care about the result: we have to wait.

### Kill Parent

I used kill to terminate my parent-process.

`[1]    4707 terminated  ruby test.rb`

Unfortunately, the parent-process doesn’t inform its children that it has been terminated, so all processes work as if nothing happened – they become the so-called zombie processes. It can also be problematic – what if the process is a long-running job that does something and returns value? His work will be redundant + it consumes resources unnecessarily.

### Groups

> Process groups allow the system to keep track of which processes are working together and hence should be managed together via job control. – Michael K. Johnson, Erik W. Troan, Linux Application Development

Each process belongs to a group of processes. Thanks to this we can have better control the processes of our children. We can find a description of \`.setsid\` method in the [Process module documentation](https://ruby-doc.org/core-2.6.1/Process.html#method-c-setsid){:rel="nofollow"}{:target="_blank"} : “Establishes this process as a new session and process group leader, with no controlling tty. Returns the session id. Not available on all platforms.'' After setsid our process will be the session leader for this session group. Process Group ID (pgid) will also be set to the value of Process ID (pid). To demonstrate this, I wrote a simple script:

```ruby
def compare_pids(context)
  puts "#{context} - PID: #{Process.pid}, process group ID: #{Process.getpgrp}, session ID: #{Process.getsid}"
end

def exists?(pid)
  system("ps #{pid} | grep ruby") ? true : false
end

compare_pids("From parent process")

read_stream, write_stream = IO.pipe
child = Process.fork do
  compare_pids("From #1 forked process")
  Process.setsid
  compare_pids("From #1 forked process, after setsid")

  pid_child_1 = Process.fork do
    compare_pids("From #1.1 forked process")
    sleep 100
  end

  pid_child_2 = Process.fork do
    compare_pids("From #1.2 forked process")
    sleep 100
  end

  write_stream.puts "#{pid_child_1}|#{pid_child_2}"
  write_stream.close
  Process.waitall
end
sleep 2

results = read_stream.gets
read_stream.close
pid_child_1, pid_child_2 = results[(0..-2)].split("|")

child_pgid = Process.getpgid(child)
puts "From parent process:"
puts "Process Group ID of child: #{child_pgid}, child pid: #{child}"
puts "Process Group ID of child exists?: #{exists?(child_pgid)}, child pid exists?: #{exists?(child)}"
puts "pid_child_1 exists?: #{exists?(pid_child_1)}, pid_child_2 exists?: #{exists?(pid_child_2)}"

Process.kill('HUP', -child_pgid)
puts "Killed child pgid: #{child_pgid}"
puts "Process Group ID of child exists?: #{exists?(child_pgid)}, child pid exists?: #{exists?(child)}"
puts "pid_child_1 exists?: #{exists?(pid_child_1)}, pid_child_2 exists?: #{exists?(pid_child_2)}"

Process.waitall
puts "After waitall:"
puts "Process Group ID of child exists?: #{exists?(child_pgid)}, child pid exists?: #{exists?(child)}"
```

\=>
From parent process - PID: 15496, process group ID: 15496, session ID: 9817
From #1 forked process - PID: 15509, process group ID: 15496, session ID: 9817
From #1 forked process, after setsid - PID: 15509, process group ID: 15509, session ID: 15509
From #1.1 forked process - PID: 15510, process group ID: 15509, session ID: 15509
From #1.2 forked process - PID: 15511, process group ID: 15509, session ID: 15509

From parent process:
Process Group ID of child: 15509, child pid: 15509
Process Group ID of child exists?: true, child pid exists?: true
pid_child_1 exists?: true, pid_child_2 exists?: true

Killed child pgid: 15509
Process Group ID of child exists?: true, child pid exists?: true
pid_child_1 exists?: false, pid_child_2 exists?: false

After waitall:
Process Group ID of child exists?: false, child pid exists?: false

Please take a look at **pgid** in our forked process – the value is the same as the parent PID until we initialize a new session. This knowledge is quite important – we know that the PID value can also be a process group ID, so if we want to use **detach** or** kill **– we can provide **gpid** as well. This makes it much easier to manage our processes. When we called **Process.kill('HUP', -child_pgid)** ([negative value](https://ruby-doc.org/core-2.6.1/Process.html#method-c-kill){:rel="nofollow"}{:target="_blank"}  is used to kill process groups instead of processes) we killed all processes in our group. 

If you want to learn more about groups and processes, definitely check out Linux Application Development by Michael K. Johnson and  Erik W. Troan or at least [this](https://www.brianstorti.com/an_introduction_to_unix_processes/){:rel="nofollow"}{:target="_blank"}  cool article, where you can find a bunch of useful information about processes, zombies, daemons, exit codes and signals.

### Real Life Example

_listeners.rb:_

```ruby
require "rack"

class ListenerCommand
  def initialize
    @allocations = {}
  end

  def add(port)
    return if allocated_ports.include?(port)
    pid = fork_process { Listener.new(port).run }
    allocations[port] = pid
  end

  def allocated_ports
    allocations.keys
  end

  def pids
    allocations.values
  end

  private

  attr_reader :allocations

  def fork_process
    Process.fork do
      yield
    end
  end
end

class Listener
  def initialize(port)
    @port = port
  end

  def run
    app = Proc.new do |env|
        request = Rack::Request.new(env)
        log(request)
        ['200', {'Content-Type' => 'text/html'}, ['Ruby ♥.']]
    end
     
    Rack::Handler::WEBrick.run(app, Port: port)
  end

  private
  attr_reader :port

  def log(request)
    output = "#{request.base_url} visited at #{Time.now} with params: #{request.params}\n"
    File.write("#{port}_log.txt", output, mode: "a")
  end
end
```

```ruby
listeners = ListenerCommand.new

listeners.add(8000)
listeners.add(8010)
listeners.add(8020)

puts "Allocated ports: #{listeners.allocated_ports}"
puts "PIDs: #{listeners.pids}"

begin
  Process.waitall
rescue SignalException => e
  listeners.pids.each do |pid|
    Process.kill("HUP", pid)    
  end
end
```

\=>
Allocated ports: \[8000, 8010, 8020]
PIDs: \[5927, 5928, 5929]

➜  `cat 8000_log.txt`

```
http://localhost:8000 visited at 2019-07-27 09:35:08 +0200 with params: {"blah"=>"hoo"}
http://localhost:8000 visited at 2019-07-27 09:35:54 +0200 with params: {"port"=>"8000"}
```

➜  `cat 8010_log.txt`

```
http://localhost:8010 visited at 2019-07-27 09:40:17 +0200 with params: {"ruby"=>"yea"}
http://localhost:8010 visited at 2019-07-27 09:40:33 +0200 with params: {"port"=>"8010"}
```

➜  `cat 8020_log.txt`

```
http://localhost:8020 visited at 2019-07-27 09:40:17 +0200 with params: {"foo"=>"bar"}
http://localhost:8020 visited at 2019-07-27 09:40:33 +0200 with params: {"port"=>"8020"}
```

The program above creates three new processes using the **.add** method defined in **ListenerCommand** class. After process fork, **ListenerCommand** adds the allocated port and pid of the process to the allocations hash.

After that program begins to wait for all processes: **Process.waitall**. If all processes are killed – the program will finish. Also if the user attempts to kill the parent process, to avoid orphans processes, the program will catch **SignalException** exception and kill created processes.

Of course, this is only a skeleton of application, for instance - what if other exceptions occur? We always should consider all possible cases.

### Is Multi-processing a Good Alternative to Threads?

Everyone should take some time to consider the question – does my project really need multiple processes? Multi-process applications can generate many more problems and are harder to implement. Make sure you are aware of what you do and why you do it.

It’s also good to know a bit about the operation system – how will the new processes be scheduled? Why are they scheduled in this particular way? But if you want to try, it’s always worth checking if the pros and cons of multiprocessing are in line with business and technological requirements. **Thread.new** seems to be safer and has fewer potential issues, so if you really need parallelisation, you should also consider using JRuby or Rubinius.
