---
title: How to analyze competition’s tweeting patterns
description: >-
  Keeping track of your competition can be tricky and tedious. Luckily, with
  this tutorial, you can analyze their tweeting patterns like a pro!
slug: analyzing-competitions-tweeting-patterns
date: '2016-08-12 10:38:01 +0000'
category: Online marketing
author: Marcin Sulikowski
avatar: /assets/images/marcin.jpg
image: /assets/images/analyze_competition.jpg
text-preview: >-
  Ever wondered what approach your competition has to Twitter? If so, I’ve got
  good news for you. It’s super easy to check what they post about and how often
  they do.
tags:
  - Online marketing
---


Ever wondered what approach your competition has to Twitter? If so, I’ve got good news for you. It’s super easy to check what they post about and how often they do. All you need is just a couple of tools properly configured. Here it is:
* Zapier account,
* Google Sheets account,
* …and a Twitter account.


## Setting up the tools

1. Create a new Google spreadsheet and one worksheet per each competitor within it. I’ve used Netguru and El Passion as an example.

  ![analyze_competition_01](/assets/images/analyze_competition_01.png "analyze_competition_01")

  Next make sure to enter column names in each worksheet, you will need them later to assign data from Twitter.

  ![analyze_competition_02](/assets/images/analyze_competition_02.png "analyze_competition_02")

2. I assume you have a Zapier account already. So log in and open this [zap](https://zapier.com/app/min/1353/start). It’s a zap that saves tweets from chosen Twitter accounts to Google sheets.

  ![analyze_competition_03](/assets/images/analyze_competition_03.png "analyze_competition_03")

3. Now click “Make this Zap!” button and connect your Twitter account.

  ![analyze_competition_04](/assets/images/analyze_competition_04.png "analyze_competition_04")

4. After connecting Twitter type in you competition account name, here we use “netguru”.

  ![analyze_competition_05](/assets/images/analyze_competition_05.png "analyze_competition_05")

5. In the last step we need to choose the spreadsheet, worksheet and assign proper Twitter feed data (Text and Created At in our case) to worksheet columns.

  ![analyze_competition_06](/assets/images/analyze_competition_06.png "analyze_competition_06")

6. Now run a test and then just wait for spreadsheet to fill in.

## Seeking the truth

What to do with the data gathered? Well, using Spreadsheets functions you can easily check how often your competition tweets, if they tweet regularly or not, how many tweets a month do they publish etc.

Lessons learned? When I analyzed data gathered for two exemplary competitors mentioned above, I concluded Netguru has a very systematic, even robotic,  approach towards publishing. They tweet at least couple times a day, at various times, from early morning to late night, which seems like a good tactic given they’re a business targeting global audience. The main purpose is to drive traffic to their blog.

El Passion for that matter has a bit more humane approach and posts photos from company parties. They seem to be treating Twitter not as a traffic source, but more as a communications tool.

Good luck with your own analysis!


PS If you want to get a better overview of **what** your competition is tweeting about and not the patterns, then set up a similar zap but this time pushing new tweets to a Slack channel. After couple days you will get a good picture of what your competitors tweet about.
