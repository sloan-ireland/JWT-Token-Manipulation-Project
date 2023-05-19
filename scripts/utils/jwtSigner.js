const jwt = require('jsonwebtoken')
const crypto = require('crypto')
function jwtSigner(headers,payload,key,signature,alg) {
  let hstr = btoa(JSON.stringify(headers).replace(/\\/g, ""))
  let pstr = btoa(JSON.stringify(payload).replace(/\\/g, ""))
  let headerLength = hstr.length;
  while (hstr[headerLength-1]==='='){
    headerLength--;
  }
  let payloadLength = pstr.length;
  while (pstr[payloadLength-1]==='='){
    payloadLength--;
  }

  const msg = hstr.slice(0,headerLength) + '.' + pstr.slice(0,payloadLength)

  if (signature){
    return msg+'.'+signature
  }

  if (alg==='none'||alg==='None'){
    return msg
  }

  if (alg.slice(0,2)==='HS') {
    console.log(alg.slice(2));
    const dig = crypto.createHmac(`sha${alg.slice(2)}`, key)
      .update(msg)
      .digest('base64url')
    return msg + '.' + dig
  } else {
    return jwt.sign(payload,key,{algorithm:alg})
  }
}

module.exports = jwtSigner
