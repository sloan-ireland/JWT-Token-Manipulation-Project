const crypto = require('crypto')
const {writeFileSync} = require("fs");

function keygen() {
  const keyObjects = crypto.generateKeyPairSync('rsa',{modulusLength: 4096})

  return {
    private:keyObjects.privateKey.export({format: "pem", type: "pkcs1"}),
    public:keyObjects.publicKey.export({format: "pem", type: "pkcs1"})
  }
}

writeFileSync('../private.pem',keygen().private)
writeFileSync('../public.pem',keygen().public)

module.exports = keygen

