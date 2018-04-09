---
title: Using Google Sheets as a dashboard for Breeze time tracker
date: 08-21-2017
category: Management
author: Sebastian Kubiak
avatar: /assets/images/seba.jpg
image: /assets/images/macierevicz.jpg
text-preview: >-
  Some of our everyday issues and tasks can be solved or simplified with a
  little bit of ingenuity and right tools. With the increased number of projects
  we have been working on, our team faced a challenge with reporting and
  tracking progress among projects and financial results which could be very
  helpful from a managerial point of view. This article covers two basic
  solutions our team came up with.
tags:
  - Agile
  - Node.js development
---


Some of our everyday issues and tasks can be solved or simplified with a little bit of ingenuity and right tools. With the increased number of projects we have been working on, our team faced a challenge with reporting and tracking progress among projects and financial results which could be very helpful from a managerial point of view. This article covers two basic solutions our team came up with.


## Necessity is the mother of invention

Out of all, the primary requirement our tool had to fulfill was providing data that, after the right processing, could give us information helpful in future decision-making such as choosing right assignments for each developer or checking if a project is profitable.

We decided to create a tool which would **automatically get and export Breeze** (our issue&time tracker) logs in a format that would later allow us to create various financial and time reporting sheets easily. We can then use and process this data using already existing solutions and tools. Since changes influenced by our clients happen in our projects on daily basis, reports have to be constantly updated, meaning that the more often they are updated, the better.

Our team developed two main solutions to these needs – code named “pre-MVP” and “Final MVP”.

## **#1 codename: “pre-MVP”**

In this very simple solution, we used only two tools - **Breeze and Google Sheets. Breeze allows users to generate a public link with up-to-date time reports**. We used this very handy feature to import all the data we want to Google Sheets using ImportXML function and some knowledge of XPath. Since Breeze’s reports are HTML documents, we can use XPath to point what section we want to import to the Google Sheets document.

Generating lots of reports from Breeze and importing them to the spreadsheet let us extract very brief, but concise data about a number of hours spent on a single project and other useful statistics - more importantly, it allows us to check the company revenue info in real time.

“pre-MVP” was created in a very short period of time. It was a prototype, an origin of a much more complex solution that we will cover in the further part of this post.

**Pros:**

- Beauty of this project is that it doesn’t require any coding skills – pretty much anyone can learn how Google Sheets’ functions work and adjust them according to their needs.

- It shows that you can create pretty much a completely new solution to your problems using already existing and widely available tools and functions.

**Cons:**

- The simplicity of this solution leads to some issues with making the process autonomous and further data development, for example, imported data is meant to be read by people, not by machines - time spent on a project is presented in “4h30min” format, making working with this data more difficult – we had to put much effort, time and work into analyzing and processing the data in Google Sheets to then make use out of it.

- After a few months of using the “pre-MVP” version as a reporting tool, we noticed a large amount of time we had to spend by the end of each billing month to use it effectively – up to 10 - 20 hours. Each ‘project – developer’ duo needs a new report created in Breeze which is a very time-consuming process and it is quite easy to make a mistake with the input of the public link to the spreadsheet, especially when we have many more parallel projects than usual.

- Google has a limit of 50 in the number of active fields [even though Google said that they removed it somehow it still exists ¯\_(ツ)_/¯ ] that are allowed to contain IMPORTXML. We quickly reached the maximum of the allowed ImportXML functions in one document. The easiest solution would be creating new documents every time the limit is reached but this solution is temporary, tedious and has to be done manually which is not really what we were going for.


## **#2 codename: “Final MVP”**

Since using “pre-MVP” was a very tedious and time-consuming process, even though it met our initial expectations, we had to develop something new, something more efficient. This solution is much more advanced than the previous version due to the variety of tools, API’s and modules which are used, like:

- [Breeze API](https://www.breeze.pm/api) – allowed us to build custom application integrated with the Breeze database,

- [PostgreSQL](https://postgresql.org) – free, widely used and most advanced open-source database management system we use to store all data fetched from breeze API. PostgreSQL can generate CSV files that can be then hosted on Web server for further processing,

- [Node.js](https://nodejs.org) as well as Node.js modules:
  - [REST Client](https://github.com/aacerox/node-rest-client) for Node.js
  - Node.js [ORM](https://github.com/sequelize/sequelize)

- IMPORTDATA function in Google Sheets – importing data from the CSV files.

Our team created an application using Node.js, its purpose is extracting data about projects, developers, and a number of hours spent on a project through Breeze REST API. All the information is then uploaded to the PostgreSQL database. The application constantly connects to Breeze API every 10 minutes and gathers new data. The data in the database is then updated with new information.




## The database

To make the data we gather as useful as possible we included lots of additional tables and functions in the database, like a table with the current rate per ‘project-developer’ duo or exchange rates.

Periodically data from specific reports are being exported to CSV file using the native function of PostgreSQL copy…to CSV. We have been using this file format because it is a perfect input material for Google Sheets (Plus: they can update on their own!).

This process allows us to generate key reports in Google Sheets like calculating man-hours to measure the cost per project or per developer, billable/non-billable ratio or average daily revenue but most importantly data sheets that allow us to view **the revenue info almost in real time**.

Additionally, “Final MVP” allows us to find assignment leaks in cases when a developer assigned to any project or is spending time on internal issues.

## Plans for the future

Even though we haven’t noticed many issues with this solution we are still planning to add new features to maximize the workflow, like automatic updates of currency rates from our finance solutions provider company - Walutomat. Each month the system has to be manually set for the next settlement period which is a tedious task (well, not as tedious as “pre-MVP”. But still) - in the future, we will make this process completely automatic.

## Saving a lot of time and resources

The final version of the MVP took approximately 60 of working hours to develop. It is a relatively small amount of time, considering the fact that creating a stand-alone system with all the features “Final MVP” has without the usage of already existing APIs and tools could take up to 500+ hours. Yep. Not to mention the resources that would have to be used for that kind of project.

The results given by “pre-MVP” haven’t been as deep and complex as the “Final MVP” version’s either, so it is safe to say that spending these 60 hours of development saved us a lot of time and stress in the long run.

Considering all the above, it is evident that creating “Final MVP” was a **clever and smart decision**.

**Pros:**

- Processes are automatic, they don’t require as much attention and manual interaction as the “pre-MVP” version did.

- Data is processed almost in real time and can be viewed at any moment.

- It can be easily upgraded with new functionalities, improvements, and features.

**Cons:**

- Implementing this system requires programming skills.

We believe there are many areas where this approach could be efficient cost-wise and deliver great results at the same time. Google Sheets can be used as a dashboard for all types of reporting jobs as in accounting, HR and sales.

Do you have any suggestions regarding our project? Did you do anything similar yourself? Go ahead and share your ideas with us in the comments!
