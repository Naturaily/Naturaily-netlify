---
title: 'LV Cloud - Enterprise-level IoT monitoring solution for energy grids'
slug: lvcloud
layout: portfolio-case
image: /assets/images/portfolio/lvcloud/top.png
alt: lvcloud
header: >
  <strong>LV Cloud</strong> -<br> Enterprise-level IoT<br>
  monitoring solution<br> for <strong>energy grids</strong>
geometry-class: geometric-figure__blue
about-title: About
about-subtitle: About EA Technology
about-column-1: >
  EA Technology is a UK-based company, with seven regional offices across
  the globe, supplying a comprehensive range of high voltage and low voltage
  asset management solutions for testing and monitoring power networks.
  The business is a world leader in electrical asset management, fault detection
  and failure prevention. It provides customers with a state-of-the-art
  LV network automation solution – ALVIN.<br><br>
  The company was founded in 1966 and now has more than 200 employees around
  the world.
about-image: /assets/images/portfolio/lvcloud/about-map.png
about-alt: ea technology company map
about-dot1-color: yellow
about-dot2-color: blue
separator-image: /assets/images/portfolio/lvcloud/separator.png
separator-alt: lvcloud screens
separator-class: portfolio-separator__lvcloud
goal-title: Goal
goal-subtitle: The goal
goal-text: >
  The goal was to create an IT system that will work as a user interface for
  a number of VisNet® Hub, ALVIN® equipment and a couple more devices.
goal-image-1: /assets/images/portfolio/lvcloud/goal-alvin.png
goal-alt-1: alvin
goal-column-1: >
  ALVIN® Reclose is the next generation of supply-restoration reclose
  equipment, providing Network Operators with invaluable support in reducing
  costs and delivering better customer service.
goal-image-2: /assets/images/portfolio/lvcloud/goal-visnet.png
goal-alt-2: visnet
goal-column-2: >
  VisNet® Hub checks the voltage and current data on every LV feeder, giving
  insights about the load, faults and condition of respective devices across
  the network.<br><br>
  This data is critical to network operators in order to improve both network
  flexibility and efficiency, together with security and quality of supply,
  as low carbon technologies become more widespread. - If you want to know more
  about the device, you will find it <a class="text-secondary" href="#">here</a>.
video-title: Video
video-subtitle: Video
video-url: https://www.youtube.com/embed/hfQwaI5b768
video-cover: /assets/images/portfolio/lvcloud/video.png
video-text: Introducing the ALVIN <br>Reclose from EA Technology
challenge-title: Challenge
challenge-subtitle: The challenge
challenge-column-1: >
  This IoT application and its web-based interface needed the ability
  to process and aggregate a large number of measurements and events, all
  while working in real time. How did we handle this? You will find all
  the technical details below.
solution-title: Solution
solution-subtitle: Solution
solution-image: /assets/images/portfolio/lvcloud/solution-top.png
solution-alt: lv cloud app screen
solution-column-1: >
  LV Cloud is a software solution that collects, processes and aggregates
  data from different types of devices, including Reclosers, TDRs, GUARDs
  and VisnetHubs. Based on the collected data, it is possible to trace
  malfunctioning or physically damaged grids and immediately decide whether
  it needs to be fixed by a team of engineers or if it will fix itself.
  This brings many benefits to both energy companies and their clients.
solutions:
  - solution:
      title: How did the IoT application development process go?
      image: /assets/images/portfolio/lvcloud/solution1.png
      alt: lvcloud mobile panel
      class: portfolio__columns--odd
      geometric-class: geometric-figure--schema1
      animation1: portfolio-left
      animation2: portfolio-right
      text: >-
        To meet the challenges mentioned above and develop the performant IoT
        enterprise-level solution, we built <strong>Ruby</strong>
        and <strong>Ruby on Rails</strong> applications using a microservices
        architecture. There is a separate microservice assigned to each type
        of device, which increases scalability and makes the management,
        development and maintenance processes much easier.
        Thanks to this approach, we can easily detect the error and quickly
        respond to it. Any necessary fixes are made without affecting other
        microservices.
  - solution:
      dots: true
      title: >-
        Each device collects different types of data, including low voltage,
        high voltage, power, current, temperature of the device, temperature
        inside and outside the substation, and humidity.
      image: /assets/images/portfolio/lvcloud/solution2.png
      alt: lvcloud mobile data charts
      class: portfolio__columns--even
      geometric-class: geometric-figure--schema2
      animation1: portfolio-right
      animation2: portfolio-left
      text: >-
        There are between 600,000 and 1,500,000 events and measurements a day
        sent from devices to the application with an <strong>MQTT</strong> broker.
        Microservices receive, process and then broadcast the data
        via a <strong>Kafka</strong> streaming platform. Parsed measurements
        are received by the main application and saved to a <strong>MongoDB</strong>
        database.
  - solution:
      image: /assets/images/portfolio/lvcloud/solution3.png
      alt: lvcloud mobile panel
      class: portfolio__columns--odd
      geometric-class: geometric-figure--schema3
      animation1: portfolio-left
      animation2: portfolio-right
      text: >-
        These huge amounts of data could be useless if they were unreadable
        and difficult to interpret. That’s why we have chosen
        <strong>Vue.js</strong> in the frontend development, with
        <strong>Highcharts</strong> to present the data neatly.<br><br>
        Our choice of Vue.js (combined with <strong>jQuery</strong> library)
        was also because of its performance and suitability to build stable,
        large-scale solutions. This combination guaranteed the acceleration
        and facilitation of the development process.<br><br>
        If you want to know more about Highcharts itself,
        <a class="text-secondary href="https://naturaily.com/blog/big-datasets-highcharts-vue">
        follow the link to one of our blog posts</a>.
tabs:
  - tab:
      id: architecture
      title: Architecture
      image: /assets/images/portfolio/lvcloud/tab1.png
  - tab:
      id: data
      title: Data collectors/parsers
      image: /assets/images/portfolio/lvcloud/tab2.png
  - tab:
      id: commands
      title: Sample Commands Senders
      image: /assets/images/portfolio/lvcloud/tab3.png
features:
  - feature:
      title: Some of the LV Cloud features
      image: /assets/images/portfolio/lvcloud/features1.png
      class: portfolio__columns--odd
      animation1: portfolio-left
      animation2: portfolio-right
      list: >-
        <li>collecting and analyzing data supplied from devices</li>
        <li>alarms/warnings/notifications of disturbing changes</li>
        <li>failure references</li>
        <li>accurate distinction of single events from prefaults</li>
        <li>detailed information about events and prefaults</li>
        <li>generating summaries and reports</li>
        <li>presenting the event log of the device and their waveforms</li>
  - feature:
      title: Features from the user's perspective
      image: /assets/images/portfolio/lvcloud/features2.png
      class: portfolio__columns--even
      animation1: portfolio-right
      animation2: portfolio-left
      list: >-
        <li>a list of all the equipment commissioned within the system</li>
        <li>basic information about all the kit installed, such as color coded
        status, if it’s active, last dial in data etc.</li>
        <li>text messages triggered by events related to reclosers - opened, closed
        or blocked </li>
        <li>the system displays the status of each device</li>
stack-title: Technological stack
stack:
  - technology:
      name: Ruby on Rails<br> (backend)
      image: /assets/images/portfolio/artinfo/rails.png
      image-class: portfolio-stack__image--wider
      alt: ruby on rails icon
      description: >-
        The main application is written in Ruby on Rails. It is responsible for
        data aggregation, saving and reading.
  - technology:
      name: Ruby<br> (backend)
      image: /assets/images/ruby-logo.png
      alt: ruby icon
      description: There is a separate microservice for each type of device written in Ruby.
  - technology:
      name: Sidekiq<br> (search engine)
      image: /assets/images/portfolio/lvcloud/icons/sidekiq.png
      alt: sidekiq icon
      description: The entire solution uses Sidekiq for background data processing.
  - technology:
      name: Redis<br> (backend)
      image: /assets/images/portfolio/lvcloud/icons/redis.png
      alt: redis icon
      description: Stores data for processing.
  - technology:
      name: MongoDB<br> (database)
      image: /assets/images/portfolio/lvcloud/icons/mongoDB.png
      image-class: portfolio-stack__image--mongo
      alt: mongodb icon
      description: >-
        It is a mature and easily scalable document-oriented database used
        in the Main Application.
  - technology:
      name: PostgreSQL<br> (database managment)
      image: /assets/images/portfolio/lvcloud/icons/postgresql.png
      alt: postgresql icon
      description: A general-purpose object-relational database management system.
  - technology:
      name: Kafka<br> (backend)
      image: /assets/images/portfolio/lvcloud/icons/kafka.png
      image-class: portfolio-stack__image--kafka
      alt: kafka icon
      description: Streaming platform used to broadcast the data.
  - technology:
      name: Vue.js<br> (frontend)
      image: /assets/images/vue-logo.png
      alt: vue.js icon
      description: Progressive JavaScript framework used to build attractive user interfaces.
  - technology:
      name: Highcharts<br> (frontend)
      image: /assets/images/portfolio/lvcloud/icons/highcharts.png
      alt: highcharts icon
      description: >-
        Interactive JavaScript used to clearly present huge amounts of data coming
        from devices to the user interface.
  - technology:
      name: MQTT<br> (backend)
      image: /assets/images/portfolio/lvcloud/icons/mqtt.png
      image-class: portfolio-stack__image--wider
      alt: mqtt icon
      description: >-
        A lightweight messaging protocol used by devices to communicate with
        the application
tools-title: Used tools
tools:
  - tool:
      name: Docker/Swarm
      image: /assets/images/portfolio/lvcloud/icons/docker.png
      image-class: portfolio-stack__image--wider
      alt: docker icon
  - tool:
      name: Eclipse Mosquito
      image: /assets/images/portfolio/lvcloud/icons/eclipse.png
      alt: eclipse mosquito icon
experts-title: Naturaily experts involved in the project
experts:
  - expert:
      number: 1
      name: Ruby on Rails Developers
  - expert:
      number: 2
      name: Vue.js Developers
  - expert:
      number: 3
      name: UX/UI Designer
  - expert:
      number: 4
      name: QA Engineer
  - expert:
      number: 5
      name: Project Manager
results-title: The results
results-subtitle: The results
results-paragraph: >
  Developing smart grid solutions has helped many Distribution Network
  Operators, as well as the industry in general, begin to understand, plan
  and implement practical solutions for future networks.<br><br>
  LV Cloud application is already used by a couple of companies around
  the world. It helps them to minimize costs and allows informed decisions
  to be made exactly when needed.
results-text: >
  <span>Thanks to the data flowing into the application in real time, energy
  companies know precisely when they have to send a team of engineers to fix
  a failure and when it's going to repair itself.</span>
  This helps to provide continuous energy supply, reduce the response time
  and avoid financial penalties for power outages.
results-image: /assets/images/portfolio/lvcloud/results.png
results-alt: transmission tower photo
numbers-title: LVCloud in numbers
numbers-image: /assets/images/portfolio/lvcloud/results-numbers.png
numbers-lv:
  - number:
      value: 4
      name: types of devices
  - number:
      value: 600k - 1,5m
      name: measurements and events a day
  - number:
      value: 2400%
      name: connected devices
companies-title: One of the companies using LV Cloud solution
companies:
  - company:
      icon: icon-man
      description: >-
        manages the electricity network that powers everyday life for more than
        8 million people
  - company:
      icon: icon-bulb
      description: supplies energy to 3.9 million homes and businesses
  - company:
      icon: icon-query-inner-join-right
      description: >-
        has the network of more than 63,000 substations and some 60,000 miles
        of overhead power lines and underground cables spanning 9,650 square miles
  - company:
      icon: icon-case
      description: employs more than 2,700 people
companies-subtitle: In their own words
companies-quote: >
  We have invested in intelligent fuses and fault-location equipment on our
  low-voltage network to reduce the dependency on manual operation to restore
  power, shortening power cut times for our customers.<br><br>
  On our high-voltage network we've carried out significant upgrades to our
  control system, enabling our network to reconfigure itself automatically
  to respond to faults, restoring supplies for our customers more quickly.
testimonial-title: Testimonial
testimonial-subtitle: Testimonial
testimonial-image: /assets/images/portfolio/lvcloud/testimonial.png
testimonial-quote: >
  <span class="portfolio-testimonial__quote--secondary">Working with Naturaily</span>
  has been a pleasure from the very beginning of the project
testimonial-person: Chris Lowsley
testimonial-position: Director – LV Solutions at EA Technology
testimonial-text: >
  Working with Naturaily has been a pleasure from the very beginning
  of the project and throughout our continuous cooperation on the development
  of our product suite. The Naturaily team has a vision as well as a dynamic
  approach to getting the project completed. They have showed EA Technology
  how good they are, achieving outcomes that far exceeded the initial project
  scope. <br><br>
  Nothing is too much trouble for them and they are always willing to make
  things right.
estimate-text-1: >
  LV Cloud is an example of a highly performant & large-scale IoT application
  <span>Do you want to build an analogous solution suited to your industry
  needs?</span>

---
