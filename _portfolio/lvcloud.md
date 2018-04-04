---
title: "LVCloud case study: IoT application development | Naturaily"
description: Case study on developing a successful IoT solution for energy market.
layout: portfolio-details
project-screen: /assets/images/LVCloud.png
project-logo:
banner-bg: /assets/images/projects-background-purple.png
banner-text: LVCloud is an Internet of Things application that monitors and takes care of the grid. Check out how we combined new technologies, like machine learning, into a sophisticated app that solves problems with electric network before anyone knew they existed. 
banner-tech:
- Ruby on Rails, Vue.js, MQTT
step-one: The need
step-one-title: Taking care of the grid
step-one-text: Electric network malfunction causing serious problems for the society? That is not a science fiction scenario anymore. You could have laughed about it a couple of decades ago, but nowadays we are too dependent on the grid. It needs to be monitored so that specialists can intervene and solve problems quickly.<br><br>Hardware-wise the grid is monitored by reclosers, which are sophisticated fuses. But they need software.
step-two: The solution
step-two-title: Monitor the grid like a pro
step-two-text: "Recloser's main job is to bring back the electricity within the area it operates in. When something goes wrong, the fuse will blow and therefore secure that part of the electricity network. But it will try to reclose and make everything works again.<br><br>It's XXI century so recloser is much more sophisticated and it also enables recording information about the grid's state.<br><br>Now this is where Naturaily steps in. We have created software that collects information from reclosers and analyzes it to find traces of malfunction or physical damage. Any type of non-obvious problems like too high humidity caused by various incidents or worn out cables. Think of “Minority Report” class software for finding electric network prefaults.<br><br>Other devices exist: TDRs (Time-domain reflectometers), ATLMs (ALVIN Transformer Load Monitors). We gather data from all of them. And also enable managing them with our software.<br><br>Apart from dashboard, engineers are notified via email or text."
step-three: The tools
step-three-title: Ruby-based microservices
step-three-text: "The software is created for large scale: hundreds of thousands of devices and millions of events. But the amount of devices is not the biggest problem. The main requirement was that the application works in real time! To handle this we have designed Ruby-based microservices architecture and wrote the most critical parts in faster, more concurrent language - Elixir. Apart from scalability, we wanted to bring XXI century to this solution and implemented machine learning algorithms to find patterns and detect prefaults.<br><br>We use Docker for one-click super convenient server creation process for each end customer. It’s critical as our solution is more PaaS-like solution where each end customer has its own hardware set up.<br><br>MongoDB and Redis are used to store and work with data. As our data model must be quite elastic and write speed is crucial, MongoDB is a great choice. MQTT is the standard communication protocol between end devices and our system.<br><br>To put it shortly: heaven of internet of things development stack."
src-stack-1: /assets/images/ruby-logo.png
alt-stack-1: ruby
src-stack-2: /assets/images/vue-logo.png
alt-stack-2: vue
src-stack-3: /assets/images/mqtt-logo.png
alt-stack-3: mqtt
step-four: The results
step-four-title: Watch Netflix peacefully
step-four-text: We are kidding, of course. This has much more impact for the stability of the network and your life. Charging your Tesla can overload the grid, so the sooner maintenance people get information about potential malfunction, the better, because you won't even know a problem existed.
comment-photo: /assets/images/firefield-face.png
comment-name: Adam McGovan
comment-brand: CEO Firefield
comment-logo: /assets/images/firefield.png
comment-text: Firefield had the good fortune of getting introduced to Marcin and the Naturaily team at the end of 2015. Since then a number of their resources have helped us to bring our clients’ products and visions to life. The members of the Naturaily team combine a level of professionalism, experience, and collaboration that is hard to find in today’s technology landscape. We would recommended them and their partnership-driven commitment to anyone.
slide-left: Snipsl
slide-left-logo: /assets/images/snipsl.png
slide-left-link: /project/snipsl
slide-right: Zapnito
slide-right-logo: /assets/images/zapnito.png
slide-right-link: /project/zapnito
image-one:
image-two:
image-three:
image-four:
image-five:
---
