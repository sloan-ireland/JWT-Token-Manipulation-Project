// This is a simple CLI for editing a JWT token in JS
// The token is provided as a command line argument
// The program displays the current payload and prompts the user for what they want to change
// The user can "cd" into different parts of the token and enter plain text for the new values
// The token is decoded and encoded using the jsonwebtoken library

const jwt = require("jsonwebtoken");
const readline = require("readline");

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

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define a function to prompt the user for changes
const prompt = (path, obj) => {
  // Display the current object at the path
  console.log(`Current payload at ${path}:`);
  console.log(JSON.stringify(obj, null, 2));

  // Ask the user what they want to change
  rl.question(
    "Enter a key to change its value, or 'cd' to navigate to a nested object, or 'save' to save and exit: ",
    (answer) => {
      // If the user enters 'save', encode the payload and print the new token
      if (answer === "save") {
        const newToken = jwt.sign(payload, "secret");
        console.log(`New JWT token: ${newToken}`);
        rl.close();
      }
      // If the user enters 'cd', ask them for the key of the nested object
      else if (answer === "cd") {
        rl.question("Enter the key of the nested object: ", (key) => {
          // If the key exists and is an object, call the prompt function recursively with the new path and object
          if (obj[key] && typeof obj[key] === "object") {
            prompt(`${path}.${key}`, obj[key]);
          }
          // Otherwise, print an error message and repeat the prompt
          else {
            console.error("Invalid key or not an object.");
            prompt(path, obj);
          }
        });
      }
      // If the user enters a valid key, ask them for the new value
      else if (obj.hasOwnProperty(answer)) {
        rl.question("Enter the new value: ", (value) => {
          // Try to parse the value as JSON, or use it as a string
          try {
            obj[answer] = JSON.parse(value);
          } catch (err) {
            obj[answer] = value;
          }
          // Repeat the prompt with the updated object
          prompt(path, obj);
        });
      }
      // Otherwise, print an error message and repeat the prompt
      else {
        console.error("Invalid key.");
        prompt(path, obj);
      }
    }
  );
};

// Start the prompt with the root path and payload
prompt("payload", payload);
