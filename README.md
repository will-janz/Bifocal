Bifocal
=======

Bifocal was the project name for the Open Book Ben front end, and was initially used in the first beta. It has since been replaced, and the team at Open Book Ben have allowed me to host my work publicly to show that I know what I'm doing. My undying gratitude goes to Chris and the entire team at OBB.


This repository has been cleaned and had its history removed to prevent the accidental leaking of any sensitive information, as such, a vibrant git history is not available. Some files may have been edited for presentation purposes, but everything is pretty much from early 2014. 


**All logos and art assets copyright Open Book Ben LLC, used with permission**

## History ##
This repository was used from Oct 2013 to Feb 2014


Named after Ben Franklin's [invention of the same name](http://en.wikipedia.org/wiki/Bifocals), this was the visual/presentation layer of the Open Book Ben web application.


**Server stack**  
Linux, NodeJS, Express for development (sudo node scripts/nodeServer.js from inside the root directory to start the server)  
LAMP for deployment and remote staging  

**Client stack**  
AngularJS, LESS, jQuery, Bootstrap

## File Structure ##
Each vertical will be a package consisting of a verticals styles, scripts, etc. Each vertical package will be in it's own directory under app/verticals, and be structured similar to the parent app directory. (This, of course, is subject to change).

* Shared files will be in the main, top level app folders
* No vertical will contain any libraries


## Prerequisites
These are in package.json - requires sudo to install from the project's root directory  
	sudo npm install  

## Testing
Karma is used for unit testing.  
**Config**: config/  
**Starting script**: scripts/test.sh  
**Tests**: test/unit/*.*  
**Test coverage**: scripts/testCoverage.sh  

Test coverage output should land in /coverage/Phantom JS 1.9.2 (Linux)/index.html. Click on the link 'js' All new code should have 90%+ line coverage. It is easy to get this. 100% should be the goal.

## Pre-Deployment Checklist
* Remove less.watch() so we don't DDoS ourselves
* Fusion-ha CSS files and JS files

## Continuous Integration Build
Bifocals uses Drone.Io. Sign up for an accout using your bitbucket account.
The following fies relate to the CI build:
* scripts/checkCoverage.sh
* scripts/ci_test.sh
* scripts/drone.io.txt
* config/karma.ci.conf.js
