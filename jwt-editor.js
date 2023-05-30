const jwt = require("jsonwebtoken");
const readline = require("readline");
const jwtRead = require('./jwtReader.js')

const jwtSign = require('./jwtSigner.js')
const fs = require("fs");

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
  const isRSA = decoded.headers.alg.slice(0, 2) === 'RS'
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

      const signingKey = fs.readFileSync('./sign.key')
      const verificationKey = fs.readFileSync('./verify.key')

      // Ask for RSA public key
      console.log('Token signed with the signing key given: ');
      const withKey = jwtSign(decoded.headers, payload, signingKey, null, decoded.headers.alg);
      console.log(withKey)
      if (isRSA) {
        decoded.headers.alg = `HS${decoded.headers.alg.slice(2)}`
        console.log('RSA token signed with HMAC and verification key: ');
        const rsaToken = jwtSign(decoded.headers, payload, verificationKey, null, decoded.headers.alg);
        console.log(rsaToken)
      }

      decoded.headers.alg = 'none'
      const noneToken = jwtSign(decoded.headers, payload, null, null, 'none');
      decoded.headers.alg = 'None'
      const noneToken2 = jwtSign(decoded.headers, payload, null, null, 'none');

      console.log('None-signed tokens: ');
      console.log(noneToken)
      console.log(noneToken2)

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
