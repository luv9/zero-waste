# zero-waste

Zero Waste - ASE Project

This repo will serve as the codebase for our project work in the course ASE, MAC - Fall 2022.

**Zero Waste Service - Backend Setup and Instructions**

We'll be implementing backend services using node and express. We'll be using mongodb for our database purposes.

Created zero-waste-service for backend services

Instructions to download the source code

git clone https://github.com/luv9/zero-waste.git

Commands used to create the project(no need to run these commands, these are just for reference):
npm init - for package.json

npm install express

For mongo installation and setup, please follow the instructions from official website.

For running mongodb server on MacOS(M1):
Open a new terminal window. Run the following commands:

brew services start mongodb-community@6.0

mongod --config /opt/homebrew/etc/mongod.conf --fork

In a new terminal window, run the command **_mongosh_**. This will create a connection with mongodb instance and now we can run queries on this database.

Mongo collections created: user, bin, waste.

DB Name: zero_waste

Config connection to mongo is stored in config/config.js

**_Instructions to run the backend server_**

Backend server will be running on port 3000
go to folder zero-waste/zero-waste-service, and type these commands:

npm install
npm start

**Instructions to start Angular build**
This project uses latest angular v15.0

In the terminal run ng serve command to start the angular build
if successfull then the server will be running at port 4200

if not then do npm i -f to reinstall all the dependencies 

References:

https://expressjs.com/en/starter/installing.html

https://expressjs.com/en/starter/hello-world.html

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
