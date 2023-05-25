// This is a simple CLI for editing a JWT token in JS
// The token is provided as a command line argument
// The program displays the current payload and prompts the user for what they want to change
// The user can "cd" into different parts of the token and enter plain text for the new values
// The token is decoded and encoded using the jsonwebtoken library

const jwt = require("jsonwebtoken");
const readline = require("readline");

async function getInput(prompt) {
  const rl = readline.createInterface(process.stdin, process.stdout);
  return new Promise((resolve, reject) => rl.question(prompt, (token) => {
    rl.close()
    resolve(token)
  }))
}

// Get the token from the command line
const token = process.argv[2];
if (!token) {
  console.error("Please provide a valid JWT token as an argument.");
  process.exit(1);
}

// Decode the token and get the payload
const payload = jwt.decode(token);
if (!payload) {
  console.error("Invalid JWT token.");
  process.exit(1);
}



(async () => {
// Define a function to prompt the user for changes
  let path = []
  while (true) {
    let obj = payload
    for (const prop of path){
      obj = obj[prop]
    }
    console.log(obj)
    const answer = await getInput('Enter \'set\' to change a key\'s value, or \'cd\' to navigate to a nested object, ' +
      ',\'save\' to save and exit, or \'back\' to navigate out of a nested object:')
    // If the user enters 'save', encode the payload and print the new token
    if (answer === "save") {
      const newToken = jwt.sign(payload, "secret");
      console.log(`New JWT token: ${newToken}`);
      return
    }
    // If the user enters 'cd', ask them for the key of the nested object
    else if (answer === "cd") {
      const key = await getInput("Enter the key of the nested object: ")
      // If the key exists and is an object, call the prompt function recursively with the new path and object
      if (obj[key] && typeof obj[key] === "object") {
        path.push(key)
      }
      // Otherwise, print an error message and repeat the prompt
      else {
        console.error("Invalid key or not an object.");
      }
    }
    // If the user enters a valid key, ask them for the new value
    else if (answer==='set'){
      const key = await getInput('Enter the key to set: ')
      if (obj.hasOwnProperty(key)) {
        const value = await getInput("Enter the new value: ")
        // Try to parse the value as JSON, or use it as a string
        try {
          obj[key] = JSON.parse(value);
        } catch (err) {
          obj[key] = value;
        }
      }else {
        console.error("Invalid key.");
      }
    }
     else if (answer === 'back') {
      path.pop()
    }
    // Otherwise, print an error message and repeat the prompt
    else {
      console.error("Invalid syntax.");
    }
  }
})()

