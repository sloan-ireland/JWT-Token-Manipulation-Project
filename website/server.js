const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const fs = require('fs')

app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json({limit: '10mb', extended: true}));

app.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    if (req.body.password === 'jimmy') {
      console.log(jwt.sign({username: req.body.username}, 'readthisfromfilelater'))
      res.json(jwt.sign({username: req.body.username}, 'readthisfromfilelater'))
    }
  } catch {
    res.json('error')
  }
})

app.post('/getFlag', async (req, res) => {
  try {
    let key = false
    try {
      key = JSON.parse(fs.readFileSync('./secret').toString());
    }catch (e){console.log(e)}
    let verified;
    try {
      verified = jwt.verify(req.body.token, key)
    } catch {}
    try {
      verified = jwt.verify(req.body.token, 'readthisfromfilelater')
    } catch {}
    if (verified.username === 'jimmy') {
      console.log('verified jimmy')
      res.json('flag1: ' + fs.readFileSync('./flag1'))
    }
    if (verified.username === 'administrator') {
      res.json('flag2: ' + fs.readFileSync('./flag2'))
    }
  } catch (e){
    console.log(e)
  }
})

app.listen(8080, () => {
  console.log('rdy')
})
