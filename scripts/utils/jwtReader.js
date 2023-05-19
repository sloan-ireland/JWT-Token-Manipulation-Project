function jwtReader(str) {
  const arr = str.split('.')
  const headers = JSON.parse(Buffer.from(arr[0],'base64').toString())
  const payload = JSON.parse(Buffer.from(arr[1],'base64').toString())
  return {
    headers:headers,
    payload:payload,
    signature:arr[2]
  }
}

module.exports = jwtReader
