const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.urlencoded());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.post('/login',async (req,res)=>{
  console.log(req.body)
  res.json(req.headers)
})

app.listen(8080,()=>{console.log('rdy')})
