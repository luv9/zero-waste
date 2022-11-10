const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser');
const app = express()
app.use(express.static(path.join(__dirname, 'public')));

const config = require('./config/config')
const routes = require('./routes/index')


const port = config.port;
const mongoUrl = config.mongoUrl;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  console.log(`Mongo database working on: ${mongoUrl}`)
})
