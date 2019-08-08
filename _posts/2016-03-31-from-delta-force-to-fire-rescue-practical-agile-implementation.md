---
title: From “Delta Force” to “Fire Rescue”. Practical Agile implementation.
description: >-
  Learn how we have practically implemented agile manifesto, including Scrum and
  Kanban, in our everyday work in software development.
slug: practical-agile-implementation
date: '2016-03-31 10:38:01 +0000'
category: Agile
author: Sebastian Kubiak
avatar: seba.jpg
image: fire.jpg
text-preview: >-
  We are a small (over a dozen people) remote development team. That kind of
  team has pretty standard and diversified portfolio of projects.
tags:
  - Agile
---

We are a small (over a dozen people) remote development team. That kind of team has pretty standard and diversified portfolio of projects.

* Size of the project/team -  stable businesses we work with require medium sized teams of developers assisted by a QA and PM. The team is usually dropped on an unknown terrain. It establishes their orders and delivers a perfect product on time. On the other hand, we also work with small startups that require "one man-army" developer, who is responsible for wide range of tasks.
* Phase in application’s life cycle - we’re approached by Clients with projects in various stages of development. Some of them are yet to be build from scratch, some are in maintenance or in slow, on-demand development.
* Financial settlement - “Fixed Price” or “Time and Materials”. Project settlement method is of great importance. It impacts project management techniques, final product quality, possible technical debt, risk and the general satisfaction of both parties.
* Others - generally, every project is different and may be dependent on various conditions, even such as customer’s personality traits, cultural practices, etc.
As you can see, regarding the choice of methodology, there are plenty of variables and decisions. Additionally, it must be taken at the very beginning of work on the project.

## How we started
Agile Manifesto is no longer young. It was formulated in 2001 and everyone has known it very well. I will quote it in a nutshell:

“Interaction, collaboration, change adaptation, working product ”

In Naturaily, we currently use two agile methodologies: Scrum and Kanban. Scrum has more rules and orders than Kanban. Kanban is simpler and more adaptive than Scrum, which is a great advantage in some kind of projects. Both approaches are still very liberal in comparison with for example Rational Unified Process, which has hundreds of rules of use, and also belongs to Agile.
I don’t even want to mention classic Waterfall model, because it makes me have a headache ;)

## How we got trapped
Scrumdamentalism - the mistaken belief that Pure Scrum always is the right solution (by Henrik Kniberg)

Sadoscrumism - the mistaken assumption that pain triggered by Scrum always is a good kind of pain(by Henrik Kniberg).

We focused on Scrum from the very beginning of Naturaily. We even promoted the slogan "Married to scrum". Every project, regardless of its type, size or method of settlement, is forced to fit in Scrum and we always try to faithfully implement its principles.

It took some time. At some point, we noticed that something was wrong...

We were at the beginning of the sprint. We planned it carefully but suddenly Product Owner screamed that there was a fatal error in working app or he urgently demanded a completely new functionality that ruined our plan.

Increasingly, we had to break scrum rules. This marriage resulted in more and more pain. This relationship began to be tiring… We started to suffer because of the methodology we used, which (as we thought) did not fit our needs.

We started to look for other solutions and simplifications. By chance, I found [Henrik Kniberg’s blog](http://blog.crisp.se). I quickly discovered that we were the victims of Scrumdamentalism and we applied severe symptoms of Sadoscrumism ;)

## How we resolved it
According to the Japanese [Shu-Ha-Ri scheme of learning](https://en.wikipedia.org/wiki/Shuhari), it emerged that we stuck in ‘Shu’ phase trying to force our team to adopt "pure" scrum. We felt like banging our head against a brick wall.

We decided to jump to “Ha” phase. We started to experiment, to seek new paths and solutions. Finally, we decided to simplify the process of project management.

We split projects into two types:
* projects written from scratch and well planned with a fixed budget and a dedicated team focused solely on its project. They’re often fix-price gigs. We called it “Delta Force” projects.
* projects where the customer often changes priorities, backlog and eagerly works closely with development team. These are very often time & materials gigs and in maintenance. We called it "Fire Rescue" projects.

Working with “Fire Rescue” projects needs some internal changes and procedures upgrades, but from the very beginning we use Continous Integration and Continous Delivery tools, so frequent releasing of business value is easy to us.

Now we can start new “Fire Rescue” project really quickly, it takes only an hour to get from “go” decision through configuring stage environment with CI&CD to kick-off meeting with team and customer.

This way was found by us as the best suited “project configuration” for our specific business model. Of course, all the time we experiment and adjust procedures to better fits to the needs of our customers. Conducting software agency is a constant adaptation to external conditions and struggle with competition. We hope that soon we will move to the phase of the "Ri" of “Shu-Ha-Ri”.

## Summary
To sum up, we implement the following “Natudologies” actually:
* SCRURAILY aka. “Delta Force” - We choose for new, well-planned projects where you can safely prepare sprints. When the team starts the “action”, it is not wise to stop or change anything. We can fail our misson or have KIA(killed in action). Best fit for fixed-price, build from scratch projects.
* KANBAILY aka. “Fire Rescue” - Simple, fast and efficient by limiting the amount of work-in-progress. There is no time-boxing, which is good for projects in maintenance or when client frequently changes project backlog and his priorities. The team is always ready to jump into action. Best fit for t&m projects.
* WATERFAILY aka. “Pain&NoGain” - just kidding ;)

Remember, every organization is different and has its own history. How it evolved in your company?
