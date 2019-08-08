---
title: >-
  Kafka vs Mosquitto - which tool is better for communication between
  microservices?
description: >-
  Recently microservices architecture is becoming more and more popular. In this
  post, we'll compare the two most popular messaging brokers - Kafka and MQTT
  (Mosquitto). 
slug: kafka-mosquitto-microservices
layout: post
twitter-card: summary_large_image
date: '2018-10-01 10:00:04 +0200'
category: Ruby on Rails development
author: Marcin Mantke
avatar: marcin-mantke.png
image: kafka-mosquitto-microservices.jpg
text-preview: >-
  Recently microservices architecture is becoming more and more popular. In this
  post, we'll compare the two most popular messaging brokers - Kafka and MQTT
  (Mosquitto) to see which one is the best. 
tags:
  - Ruby on Rails development
---
Recently microservices architecture is becoming more and more popular. Orchestration tools like Docker and Kubernetes make it very simple to create and maintain such applications. One can say that these tools are even forcing microservices architecture.

## Communication between microservices

Unfortunately, such an architecture, apart from many advantages, has some challenges, too! And one of them is finding a good way of communication between microservices.

If you had such a problem, you surely heard about three solutions: **REST API, MQTT or Kafka**. Believe me or not, but REST API is a no-go for this use case. So we are left with two solutions: MQTT and Kafka.

Both are messaging brokers which have **different protocols** and **serve different purposes**, so let’s make a comparison of these two. 

## Perfect messaging broker

Let's start with things that are the most important for microservices.

Microservices should have **persisted data storage**. They should be able to take a **high volume traffic** and massive datasets. Also, they should have an ability to split the traffic into separated, logical parts, for example, topics. Lastly, microservices should have a very high **reliability** and events deliverability. 

So with these requirements in mind let’s jump into the **comparison between Kafka and Mosquitto**.

## Kafka:

Kafka was originally created by LinkedIn employees back in 2011 with their messaging system in mind. It was later distributed on the Apache License. Kafka persists events, meaning that messages are immediately written to the filesystem when they are received. 

It has an ability to scale services without the fear of duplicated processing of event. Kafka scales by adding more partitions so that the messages from each partition can be processed in parallel making the tool **easily and highly scalable**. That’s because, from the very beginning, it was being developed for big systems. It scales better than other similar ‘stateful’ message brokers.  

Kafka can **easily deal with high-velocity data ingestion**. On top of that, the libraries are written in the most popular languages. It has some really interesting frameworks, check out this Ruby-based one - **[Karafka](https://github.com/karafka/karafka){:rel=nofollow}**. 

Unfortunately **Kafka depends on Zookeeper in order to work properly.** 

## Mosquitto:

Let’s take a look at Mosquitto, another for communication between microservices. 

Mosquitto is a very popular solution among developers. It is a **lightweight** protocol created for IoT projects. It is based on publish/subscribe model. The message broker is independent from other applications or libraries. 

Mosquitto is licensed under EPL/END meaning that it is open source, also it is a part of the Eclipse Foundation - it’s an important factor for many projects. Mosquitto has multiple libraries in many languages, so it’s safe to say that it is quite versatile, meaning that **it can be easily adapted by developers to a project**. 

## Answer: 

Kafka is better suited for microservices. It has persistent storage, so events from particular topic can be replayed from the beginning allowing to introduce **Event Sourcing** pattern.

Check out both tools here:
* [Eclipse Mosquitto](https://mosquitto.org/){:rel=nofollow}
* [Apache Kafka](https://kafka.apache.org/){:rel=nofollow}
