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
    const key = fs.readFileSync('./secret')
    if (req.body.password === 'jimmy'&&req.body.username==='jimmy') {
      // console.log(jwt.sign({username: req.body.username}, key))
      res.json(jwt.sign({username: req.body.username}, key))
    } else if (req.body.username==='Marc'&&req.body.password==='jiang'){
      res.send('flag{sp3ci@1_m@rc_fl@g}')
    } else{
      res.json({error:true})
    }
  } catch {
    res.json({error:true})
  }
})

app.post('/getFlag', async (req, res) => {
  try {
    let key = false
    try {
      key = JSON.parse(fs.readFileSync('./secret').toString());
    }catch {}
    let verified;
    try {
      console.log(key)
      verified = jwt.verify(req.body.token, key)
    } catch {}
    try {
      verified = jwt.verify(req.body.token, fs.readFileSync('./secret'))
    } catch {}
    console.log(verified)
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
