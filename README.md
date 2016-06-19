# iChat  <img src="https://travis-ci.org/Psyringe/iChat.svg?branch=master"></img>
A simple IRC-Like chat powered by Node.js
<br>
<br>
###Installation
`cd` into the projects root folder and run `npm install` and `bower install`.
Make sure you have `mocha` installed globally. If not, install it with `sudo npm i mocha -g`<br>

###Starting the Server
You can start the server using `npm run start` command. To change
the port, edit package.json file, under "scripts", edit the "start" command
and change the port from the default (which is 4500) to whatever you want.
<br>
###Running Tests
You can run tests by `cd`ing into the root folder and running `npm run test` command.<br>
Please note that one test will fail, and this is intentional. (It fails routing to `/about` url).
<br>
###Deploy on Server
See this tutorial on how to run it on your server using nginx:<br>
<a href="https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04" target="_blank">Deploying Nodejs Apps - Digital Ocean</a>
<br>
<br>
Borderliner: <a href="mailto:hajianpour.mr@gmail.com">[hajianpour.mr@gmail.com]</a>
