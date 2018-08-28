let UserModel = require('../models/UserModel')
let UserAuthentication = {
  verifyUserToken: (token, successCallback, failureCallback) => {
    UserModel.where({ api_token: token }).countDocuments((err, count) => {
      if (err)
        return 
      !!count ? successCallback() : failureCallback()
    })
  }
}

module.exports = UserAuthentication