---
layout: page
title: Time-Line
---

I was recently in a conversation about the things we loved and hated in school.  We ended up on the subject of history.  One of my teachers, Mr. Bess, was [in]famous for his map assignments.  He would assign us a country or sometimes a whole continent.  We would have to draw the geographic and political boundaries to scale and label major cities and regions.  Almost everyone hated the maps but I rather enjoyed them.  My friend was lamenting about a time-line assignment she had to do. Each student was given a time period to include in a time-line.  Everyone had strict guidelines on size of paper and scale.  At the end of the assignment, the teacher would tape all of the projects together to create a single monolithic timeline that wrapped all around the class room.

I was rather intrigued about this idea. How difficult would it be to create a time-line using only HTML and JavaScript?  The TL;DR answer is… not very long.

The HTML5 Canvas is perfect for drawing just about anything.  A Google spread sheet makes a quick and dirty read-only database.  I got a working demo slapped together in less than 500 lines of code.  I’m pretty sure I can get it even smaller once I make a couple of code cleanup passes.

An early version of the project read from a Google Docs sheet using jQuery’s `$.getJSON` function.  Later I added the google sheets API which requires an API key and OAuth.  

In the next version, I hope to drop the spreadsheet altogether and allow the user to feed in a topic.  The app will scrape important people and events from Wikipedia and create the time-line dynamically.

[Early Version with OAuth](http://jphendrix.github.io/projects/time-line/timeline.html)
