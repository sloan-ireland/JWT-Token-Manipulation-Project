const crypto = require('crypto')

function keygen() {
  const keyObjects = crypto.generateKeyPairSync('rsa',{modulusLength: 4096})

  return {
    private:keyObjects.privateKey.export({format: "pem", type: "pkcs1"}),
    public:keyObjects.publicKey.export({format: "pem", type: "pkcs1"})
  }
}

