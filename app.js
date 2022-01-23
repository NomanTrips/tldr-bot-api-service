const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
require('dotenv').config()
const openai = require("./openai");


app.use(cors())

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.post('/', (req, res) => {
  //console.log(req.body.text)
  openai.callOpenaiApi(req.body.text)
    .then(data => {
      console.log(data.choices[0]);
      var summary = data.choices[0]; // only return one choice
      var trunc = false;
      if (summary.finish_reason == "length") {
        summary.text = summary.text + "....";
        trunc = true;
      }
      res.json({ message: 'tldr text:', summary: summary.text, is_truncated: trunc })
    })
    .catch(err => console.log(err))
  //res.send({})
})

app.listen(port, () => {
  console.log(`tldr bot api service running on http://localhost:${port}`)
})