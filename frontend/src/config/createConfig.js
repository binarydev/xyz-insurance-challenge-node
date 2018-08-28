var fs = require('fs');
var json = JSON.stringify(
  { 
    "REACT_APP_XAVIER_PRIVATE_KEY": process.env.REACT_APP_XAVIER_PRIVATE_KEY 
  }
)
fs.writeFileSync('src/config/frontendConfig.json', json, 'utf8');