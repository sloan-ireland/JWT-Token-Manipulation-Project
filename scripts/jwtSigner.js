const jwt = require('jsonwebtoken')
const crypto = require('crypto')
function jwtSigner(headers,payload,key,signature) {
  const hstr = (btoa(JSON.stringify(headers).replace(/\\/g, "")))
  const pstr = btoa(JSON.stringify(payload).replace(/\\/g, ""))

  console.log('pstr', JSON.stringify(payload))
  const msg = hstr + '.' + pstr.slice(0, pstr.length - 1)
  if (key) {
    const dig = crypto.createHmac('sha256', key)
      .update(msg)
      .digest('base64')
    return msg + '.' + dig.slice(0, dig.length - 1)
  }
  if (signature){
    return msg+'.'+signature
  }
}

module.exports = jwtSigner
