---
title: Stick-it! And the Power of Event Storming
description: >-
  Miscommunication between business people and engineers is a common issue.
  While we could start pointing fingers and blaming either side, the problem
  will not go away on its own.
slug: power-of-event-storming
layout: post
date: '2019-08-27 07:24:52 +0200'
category: Software development
authors:
  avatar: /assets/images/michal_kosyk_profile.webp
  label: Michał Kosyk
  value: author-27
  slug: michal-kosyk
image: /assets/images/stick-it_-and-the-power-of-event-storming-1-.webp
text-preview: >
  Miscommunication between business people and engineers is a common issue.
  While we could start pointing fingers and blaming either side, the problem
  will not go away on its own. Teams will miss deadlines because something was
  not clear, the product will fail to meet the client’s expectations, ergo he
  won’t be willing to pay another invoice because.
---
Miscommunication between business people and engineers is a common issue. While we could start pointing fingers and blaming either side, the problem will not go away on its own. Teams will miss deadlines because something was not clear, the product will fail to meet the client’s expectations, ergo he won’t be willing to pay another invoice because of it.

Alberto Brandolini, the creator of the solution I would like to present here, said something really interesting:

> It's developer's (mis)understanding, not expert knowledge that gets released into production.

Let that sink in. The sentence implies that it is not the business people who decide about the final shape of the product, but the engineers. The reason behind it is that **developers translate the business language into a programming one**. We sometimes say that something is “lost in translation”, which perfectly fits our case.

Another obstacle is time or, to be more specific, the daily burn rate. There is no way you can analyse the business world infinitely because you will use up all of the available funds. You need an efficient, easy to use tool which enables both parties (business people and developers) to learn about the intrinsic characteristics of the business domain and, as a result, create a precise model of it.

## Creating or Finding a Common Tongue

Models, aggregates, tables, databases and so on – people unfamiliar with the jargon find it hard to comprehend what a developer is saying. Engineers seem to us mortals as some sort of aliens, with all their _message queues_, _asynchronous programming_, _relational databases_, _http statuses_, _protocols_ and so on. And developers rarely know anything about the domain they are paid to model. Taxes, company rules and market reality are as mumbo-jumbo to them as their lingo is to the business people.

What both of us need is a _common tongue_, a **tool giving us access to each other’s understanding**. The common thing we understand, or at least can start a discussion with, are the most basic phenomena we can observe: **events**.

We can easily understand things like: a fire started, the coffee machine broke. When we do not fully understand it, we can easily divide the given event into a few smaller ones. That will provide us with a vision of what the domain does, which is a much better starting point for further discussion of what the _domain is_.

Let us imagine programming a coffee machine. We have no idea about what a coffee machine does except that it gives coffee. We could start with something like this:

{% image /assets/images/1_stick_it.webp null null %}

Okay, we see the beginning of a process and its end. We stand with a barista as a domain expert and he adds some few stick-its.

{% image /assets/images/2_stick_it.webp null null %}

Okay, something fishy is going on here. You’re not an expert but this is really confusing. You ask – Is this right? Is the order right?

The barista thinks for a second and comes up with a simple – “not really, let me fix it for you”:

{% image /assets/images/3_stick_it.webp null null %}

Then the developer looks at the events and does some thinking. Finally, the question arises – what if there is no coffee?

The barista takes a deep breath gazing at the stick-its. He understands the problem and answers “Yes, so, in a cafe-style coffee machine a barista takes care of that. But when you are not accustomed to that, you may forget to add coffee. You can face a situation when someone forgets to add coffee.

The developer asks a few more questions and other problems pop out. The board looks like this:

{% image /assets/images/4_stick_itpng.webp null null %}

The barista and the developer look at the board.

“How about having a check BEFORE we start to make coffee?” Asks the barista.

“Ok, let’s do it.”

{% image /assets/images/5_stick_it.webp null null %}

“Does it look good?” Asks the developer.

“Yeah. Let’s add espresso.” Says the barista.

{% image /assets/images/6_stick_it.webp null null %}

They look at the board again. Without a word, they added more stick-its, change the order and, end up with something like:

{% image /assets/images/7_stick_it.webp null null %}

“I think we have some redundancy here.” Says the developer. The barista nods and points at the ‘Coffee ground’ domain event and responds, “I think this has something in common, right?”

They remove the redundancy the best way they could.

{% image /assets/images/8_stick_it.webp null null %}

“Hey, right! This is it! Latte is just milk with some espresso. That means we can close the process of making espresso and use it as the basis for a latte.”  Says the barista.

An interesting thing then happens. The business side of the story, a person who obviously knew all of the answers, realizes that a process can be streamlined by reorganizing it. The barista quickly shuffles the stick-its on the board:

{% image /assets/images/9__stick_it.webp null null %}

Now, the cost of understanding the process is much smaller. They were also able to overcome the initial problem of communicating with each other, which **was the main goal in the first place**.

This is just a small example of how an **event storming session** can unfold itself in the process of defining the domain via events. This is a way of tackling the most complicated business realities out there, for in every process there is something happening. If something happens, we can derive events out of it.

## Building blocks

{% image /assets/images/10__stick_it.webp null null %}

You already saw a few building blocks. As I was writing this article, I planned to use the collection above, yet I found out that in the middle of the process I need a new one, which we can call “business process”. Let’s go through them:

* **Domain Event** displays “what happened” in the domain.
* **Command** represents what its name is, i.e. a _command_. Sometimes a process starts because of different types of commands. So the “computer turned off” event can be initialized by the “turn off the computer” command from a user or by another annoying Windows 10 “critical” update.
* **Read Model** is an entity from which we can, well, read!
* **Aggregate** forms a coherent boundary based on business rules. In other words, it is a snapshot of the system in the given moment and context.
* **Rule** stands for a business rule that requires satisfaction to validate another block.
* **User** is an actor who  interacts with the system.
* **Condition** covers situations when our process branches out into different paths.

## Expected Result

The developers cannot be held responsible for not understanding things that are never raised in the meetings. **Nothing is obvious**. In my opinion, tackling the complexity of software most often results in a better understanding of the business side of things. As Brian Goetz said in 2009 when asked about advice for Java programming: _“write dumb code, code that is straightforward, clean, and follows the most obvious object-oriented principles”_. Yet, in reality, when the business side is obscure to the developers, how can they write straightforward code when everything is subject to change?

On the other hand, it is not the fault of business people that they do not disclose everything about the business side of things. There is a different world out there, dark and full of errors. Instead of pointing at the manager or the product owner and saying “he/she is the one to blame”, how about you ask for one event storming session to level out the field of business knowledge?

Have fun storming out your business events,

Farewell

Sources:

* [Amazon](https://www.amazon.com/Domain-Driven-Design-Distilled-Vaughn-Vernon/dp/0134434420){:rel="nofollow"}{:target="_blank"}
* [Youtube](https://www.youtube.com/watch?v=NGXl1D-KwRI){:rel="nofollow"}{:target="_blank"}
* [Github](https://github.com/mariuszgil/awesome-eventstorming){:rel="nofollow"}{:target="_blank"}
* [Event storming](https://www.eventstorming.com/){:rel="nofollow"}{:target="_blank"}
* [Oracle](https://www.oracle.com/technetwork/articles/javase/devinsight-1-139780.html#1){:rel="nofollow"}{:target="_blank"}

[{% image /assets/images/job-offers_naturaily.webp join join %}](https://naturaily.com/careers){:target="_blank"}
