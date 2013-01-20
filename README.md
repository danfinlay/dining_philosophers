#Dining Philosophers#
I came upon the Dining Philosophers problem earlier today and for whatever reason wanted to experiment with a few solutions.  Since it's a problem often taught in programming classes, it seemed natural to explore it using programming, so I started making a version of the problem that you could try to solve in javascript, and watch it play out in real time.

The project can be seen live [here](http://danfinlay.com/projects/dining_philosophers).

Currently the core utility of the project is broken, because for some reason the eval function which is used to implement a user's design is not working.  I might try to make it work with Components.utils.evalInSandbox instead.  Posting it in hopes someone can see what's wrong.