---
title: 'LVCloud case study: IoT application development | Naturaily'
description: Case study on developing a successful IoT solution for energy market.
layout: portfolio-details
project-font-colour: purple
project-screenshot: /assets/images/LVCloud.png
project-logo: /assets/images/lvcloud-logo.png
project-logo-class: lvcloud
banner-bg: /assets/images/projects-background-purple.png
banner-text: >-
  LVCloud is an Internet of Things (IoT) application that monitors and takes
  care of the grid. Check out how we have combined new technologies, such as
  machine learning, into a sophisticated app that can detect and solve problems
  with electricity networks before anyone knew they existed.
banner-tech:
  - 'Ruby on Rails, Vue.js, MQTT'
step-one-title: Taking care of the grid
step-one-text: >-
  When electricity networks malfunction, this can cause serious problems for our
  society and this is not a science fiction scenario anymore. You could have
  laughed about it a couple of decades ago, but nowadays we are too dependent on
  the grid. It needs to be monitored so that specialists can intervene and solve
  problems quickly before power is lost to businesses and
  homes<br><br>Hardware-wise the grid is monitored by auto reclosing devices,
  which are sophisticated circuit breakers. But they need sophisticated software
  to operate correctly.
step-one-image: /assets/images/lvcloud-screen-1.png
step-two-title: Monitor the grid like a pro
step-two-text: >-
  The reclosing device's main job is to restore the electricity supply within
  the area it operates in. When something goes wrong, the circuit breaker will
  open and therefore isolate that part of the electricity network where the
  fault is present. However, using the in-built intelligence of the
  auto-reclosing circuit breaker, it will test to see if the fault is still
  present and if not, it will close and restore supplies to customers.
  <br><br>It's XXI century so the recloser is much more sophisticated and it
  also enables recording of critical information about the grid's
  state.<br><br>Now this is where Naturaily steps in. We have created software
  that collects information from reclosers and analyzes it to find traces of
  malfunction or physical damage. Any type of non-obvious problems like too high
  humidity caused by various incidents or cables in a poor state of repair.
  Think of “Minority Report” class software for finding electricity network
  pre-faults.<br><br>Other devices exist: TDRs (Time-domain reflectometers),
  ATLMs (ALVIN Transformer Load Monitors). We gather data from all of them. And
  also enable managing them with our software.<br><br>In addition to a web based
  dashboard, engineers are notified via email or text.
step-two-image: /assets/images/lvcloud-screen-2.png
step-three-title: Ruby-based microservices
step-three-text: >-
  The software is created for large scale: hundreds of thousands of devices and
  millions of events. But the number of devices is not the biggest problem. The
  main requirement was that the application works in real time! To handle this,
  we have designed Ruby-based microservices architecture and wrote the most
  critical parts in faster, more concurrent language - Elixir. Apart from
  scalability, we wanted to bring XXI century to this solution and implemented
  machine learning algorithms to find patterns and detect prefaults.<br><br>We
  use Docker for one-click super convenient server creation process for each end
  customer. It’s critical as our solution is more PaaS-like solution where each
  end customer has its own hardware set up.<br><br>MongoDB and Redis are used to
  store and work with data. As our data model must be quite elastic and write
  speed is crucial, MongoDB is a great choice. MQTT is the standard
  communication protocol between end devices and our system.<br><br>To put it
  shortly: heaven of internet of things development stack.
step-three-image: /assets/images/lvcloud-screen-3.png
src-stack-1: /assets/images/ruby-logo.png
alt-stack-1: ruby
src-stack-2: /assets/images/vue-logo.png
alt-stack-2: vue
src-stack-3: /assets/images/mqtt-logo.png
alt-stack-3: mqtt
step-four-title: Watch Netflix peacefully
step-four-text: >-
  We are kidding, of course. This has much more impact for the stability of the
  network and your life. Charging your Tesla can overload the grid, so the
  sooner maintenance people get information about potential malfunction, the
  better, because you won't even know a problem existed.
step-four-image-one: /assets/images/lvcloud-screen-4.png
step-four-image-two: /assets/images/lvcloud-screen-5.png
step-four-image-three: /assets/images/lvcloud-screen-6.png
testimonial-photo: /assets/images/ChrisLowsley.jpg
testimonial-name: Chris Lowsley
testimonial-brand: Director – LV Solutions at EA Technology
testimonial-logo: /assets/images/ea-tech-logo.png
testimonial-text: >-
  Working with Naturaily has been a pleasure from the start of the project to
  our continuing development of our product suite, Naturaily have vision and a
  dynamic approach to getting the project completed, they have showed EA
  Technology what good is and far exceeded the initial project scope, nothing is
  too much trouble and they are always willing to assist in getting things
  right.
slide-left: Snipsl
slide-left-logo: /assets/images/snipsl.png
slide-left-link: /project/snipsl
slide-right: Zapnito
slide-right-logo: /assets/images/zapnito.png
slide-right-link: /project/zapnito
---
