const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt  = require('jsonwebtoken')

app.use(express.urlencoded());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.post('/login',async (req,res)=>{
  console.log(req.body)
  res.json(jwt.sign({user:req.body.username},'readthisfromfilelater'))
})

app.listen(8080,()=>{console.log('rdy')})
