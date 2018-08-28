let crypto = require('crypto'),
    alg = 'aes-256-ctr',
    envVars = (process && process.env) || require('../config/config'),
    pwd = envVars.REACT_APP_XAVIER_PRIVATE_KEY;

let TextEncryption = {
  encrypt: (text) => {
    var cipher = crypto.createCipher(alg,pwd)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex')
    return crypted
  },

  decrypt: (text) => {
    var decipher = crypto.createDecipher(alg,pwd)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8')
    return dec
  }
}

module.exports = TextEncryption