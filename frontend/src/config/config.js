let fs = require("fs");
let configData = fs.readFileSync("frontendConfig.json");
class Config{
  env(){
    return process ? process.env : configData
  }
}

export default Config