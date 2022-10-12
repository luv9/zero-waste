const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<b>Zero Waste</b> website coming soon!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
