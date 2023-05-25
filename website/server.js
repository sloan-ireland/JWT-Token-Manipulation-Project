const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt  = require('jsonwebtoken')
const cors = require('cors')
const fs = require('fs')

app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.json({limit: '10mb',extended:true}));

app.post('/login',async (req,res)=>{
  console.log(req.body)
  if (req.body.password === 'jimmy') {
    		console.log(jwt.sign({username: req.body.username}, 'readthisfromfilelater'))
	  res.json(jwt.sign({username: req.body.username}, 'readthisfromfilelater'))
  }
})

app.post('/getFlag',async (req,res)=>{
  const verified = jwt.verify(req.body.token,'readthisfromfilelater',{
    algorithms:['HS256','HS384','HS512','RS256','RS384','none']
  })
  if (verified.username==='jimmy'){
    res.json('flag1: ' + fs.readFileSync('../flags/flag1'))
  }
  if (verified.username==='administrator') {
    res.json('flag2: ' + fs.readFileSync('../flags/flag2'))
  }
})

app.listen(8080,()=>{console.log('rdy')})
