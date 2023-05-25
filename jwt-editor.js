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
  let path = [];
  while (true) {
    let obj = payload;
    for (const prop of path) {
      obj = obj[prop];
    }
    console.log(obj);
    const answer = await getInput(`
Enter 'set' to change a key's value,
      'cd' to navigate to a nested object,
      'save' to save and exit,
      'back' to navigate out of a nested object:
`);
    if (answer === "save") {
      const newToken = jwt.sign(payload, "secret");
      console.log(`\nNew JWT token: ${newToken}\n`);
      return;
    } else if (answer === "cd") {
      const key = await getInput("Enter the key of the nested object: ");
      if (obj[key] && typeof obj[key] === "object") {
        path.push(key);
      } else {
        console.error("Invalid key or not an object.");
      }
    } else if (answer === "set") {
      const key = await getInput("Enter the key to set: ");
      if (obj.hasOwnProperty(key)) {
        const value = await getInput("Enter the new value: ");
        try {
          obj[key] = JSON.parse(value);
        } catch (err) {
          obj[key] = value;
        }
      } else {
        console.error("Invalid key.");
      }
    } else if (answer === "back") {
      path.pop();
    } else {
      console.error("Invalid syntax.");
    }
  }
})();
