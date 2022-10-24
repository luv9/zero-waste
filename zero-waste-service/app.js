const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config')

const app = express()
const port = config.port;
const mongoUrl = config.mongoUrl;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('<b>Zero Waste</b> website coming soon!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  console.log(`Mongo database working on: ${mongoUrl}`)
})
