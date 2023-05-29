const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const { sanitizeUsername, sanitizePassword } = require('./sanitization');

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Sanitize the username and password inputs
    const sanitizedUsername = sanitizeUsername(username);
    const sanitizedPassword = sanitizePassword(password);

    // Check if the sanitized inputs are empty
    if (!sanitizedUsername || !sanitizedPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Check the username and password
    if (sanitizedUsername === 'jimmy' && sanitizedPassword === 'correctpassword') {
      const token = jwt.sign({ username: sanitizedUsername }, 'readthisfromfilelater');
      return res.json(token);
    }

    // If the username or password is incorrect, return an error message
    return res.status(401).json({ error: 'Invalid username or password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/getFlag', async (req, res) => {
  try {
    console.log(req.body.token);
    console.log(jwt.decode(req.body.token));
    let key = null;
    try {
      key = JSON.parse(fs.readFileSync('./secret').toString());
    } catch (error) {
      console.error(error);
    }
    const verified = jwt.verify(req.body.token, key);
    if (verified.username === 'jimmy') {
      console.log('verified jimmy');
      res.json('flag1: ' + fs.readFileSync('./flag1'));
    }
    if (verified.username === 'administrator') {
      res.json('flag2: ' + fs.readFileSync('./flag2'));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(8080, () => {
  console.log('rdy');
});
