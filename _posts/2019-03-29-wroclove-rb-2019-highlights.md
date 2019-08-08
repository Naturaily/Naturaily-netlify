---
title: 'Wroclove.rb 2019 Highlights '
description: >-
  Wroclove.rb’s main goal is to help Ruby professionals get better at what they
  do. How could we miss such an opportunity and not send a strong representation
  of Naturaily? Of course, we did!
slug: wrocloverb-2019-highlights
layout: post
twitter-card: summary_large_image
date: '2019-03-29 04:05:01 +0200'
category: Events
author: Beata Twardowska
avatar: beata.jpg
image: wrocloverb_highlights.jpeg
text-preview: >-
  Wroclove.rb’s main goal is to help Ruby professionals get better at what they
  do. How could we miss such an opportunity and not send a strong representation
  of Naturaily? Of course, we did!
tags:
  - Events
---
You know you’re dealing with good developers when it’s the first, sunny weekend of spring, the thermometer hits the magical 21 degrees Celsius mark – and yet they still prefer to spend the three consecutive days within the cold walls, broadening the knowledge of their trade: **Mutation Testing, Business Logic in Ruby, Building UIs for Microservices, Autoloading or Orchestrating video transcoding in Ruby**.

As the organizers say: Wroclove.rb’s main goal is to help Ruby professionals get better at what they do. How could we miss such an opportunity and not send a strong representation of Naturaily? Of course, we did!

![Naturaily team](/_assets/images/naturaily-team-wroclove-rb.jpg)

Wroclove.rb in a nutshell:

**Date:** 22-24 March 2019

**Speakers:** Markus Schirp, Andrzej Krzywda, Ethan Garofolo, Janko Marohnić, Martin Gamsjaeger, Norbert Wójtowicz, Dmitry Salahutdinov, Victor Shepelev, Michał Matyas, Chris Seaton, Anton Davydov and Dávid Halász

How was it? What were the most interesting topics? Check out what Błażej, Stefan and Adam have to say about it.



## Błażej:  

Definitely, the most noteworthy talks were:

1. **Mutation Testing - Markus Schrimp**

> The purpose of mutation testing is to evaluate unit test coverage. During mutation tests, mutations (minor, random changes in the code) are made automatically and unit tests are performed after each such change. 
>
> Based on the results of the tests carried out after each change, you can tell when code coverage is poor, or that you are dealing with redundant code. After the introduction of the mutation the test result should change. Otherwise, it means that the quality of the code could be improved.
>
> Mutation testing differs from static coverage tests, which only allow to verify if the code is covered by tests, but say nothing about the quality of testing. With static analysis, we can deal with situations where assertions are empty, but coverage statistics are still satisfactory. 
>
> The idea discussed by Markus is very interesting, but the process itself is quite resource-intensive, which is why it is gaining popularity now when developers have sufficient computing power at hand. 
>
> Introduction of mutational tests to the project increases the development time of new functionalities – that's a fact. However, in the long-term perspective, it certainly pays off. I encourage you to familiarize yourself with the [tool](https://github.com/mbj/mutant) proposed by Markus.

**2. Business logic in Ruby without frameworks, libraries and persistence - Andrzej Krzywda**

> Andrzej's speech was devoted to business logic, but he also delved into technicalities a bit. Among other things, Andrzej presented Arkency's idea for the implementation of the State Machine and made public [the following repository](https://github.com/arkency/aggregates).
>
> The creators assumed that a state can be presented as a class. Andrzej decided to use Duck Typing. We are also dealing with metaprogramming (that is all that should satisfy Ruby programmers). It all fits the DDD (Domain Driven Design) approach and CQRS (Command Query Responsibility Segregation), which Arkency advocates. 
>
> I think it's worth taking a closer look at this solution when you implement the State Machine next time.

**3. Handling file uploads for a modern developer - Janko Marohnic**

> Janko devoted his speech to [Shrine](https://github.com/shrinerb/shrine), his own solution enabling file uploads.
>
> At Naturaily, we haven't had the opportunity to use it yet, but it looks promising. If you're wondering what sets it apart from other solutions, I recommend that you look  [here](https://github.com/shrinerb/shrine/blob/v2.16.0/doc/advantages.md#readme).
>
> For managing uploads on the frontend, Janko recommended [Uppy](https://uppy.io/), which can be used independently of Shrine. Modularity of this solution is a big advantage.

**4. The TruffleRuby Compilation Pipeline (Chris Seaton)**

> [TruffleRuby](https://github.com/oracle/truffleruby) is an Oracle project whose idea is to speed up Ruby without affecting its syntax. TruffleRuby is part of a much wider project (more about it [here](https://www.graalvm.org/)), the aim of which is to improve and preserve current languages, so that programmers choose those that they like, rather than those that are the fastest. 

**5. Development with Axioms (Martin Gamsjaeger)**

> Martin presented a very interesting approach for working out processes of introducing changes in the repository. The whole presentation was based on the concept of the axiom. It boils down to the fact that as a team you try to establish certain statements (truths) on which you later base your process. On the basis of axioms, we define certain rules (transformations) that are to lead us to specific conclusions (assertions). Martin's talk was definitely one of the most interesting and inspiring for me. I believe that taking the time to analyze and develop processes always yields great results.



## Stefan:

> Importantly, Martin's speech, mentioned by Błażej, was not just a bunch of "philosophical ramblings". It presented a specific approach to naming changes (commits) and their granulation. This unified approach results from the analysis of the types of changes we introduce to the code (years of insights). In my opinion, using it can help in dividing tasks into individual changes and enforces a small granulation of changes accordingly. It enforces a kind of a disciplined approach to making changes and hence teaches their stable implementation in the code. So even though the topic does not sound practical, it is actually something that is very much related to our daily work and we could start using it right away.
>
> What I also found interesting, apart from the topics mentioned above, was Norbert Wójtowicz's talk about declarative downloading of API data, using the parser Pathom written in Clojure. Pathom can download and parse data from various sources (YouTube, Facebook, SpaceX, etc.). The data we need is expressed in a declarative manner –  a solution which seems very clear and easy to maintain – combining data from various sources of information seems fabulously simple.



## Adam:

> Optimistic UI is also worth mentioning here. According to this approach, after each action performed by the user, we do not have to wait for the response from the back end, but immediately send the message that the action was successful. We assume that this will be the case, as statistically 98% of requests are successful. You can find more information about Optimistic UI [here](https://uxplanet.org/optimistic-1000-34d9eefe4c05).

If you've also been to Wroclove.rb, be sure to share your opinion in a comment and let them know what you found the most interesting. 
