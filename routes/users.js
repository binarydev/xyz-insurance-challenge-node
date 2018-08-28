let express = require('express');
let router = express.Router();
let UserModel = require('../models/UserModel')
let TextEncryption = require('../frontend/src/isomorphicUtilities/TextEncryption')

/* POST user login. */
router.post('/login', function(req, res, next) {
  let userQuery = UserModel.where({ email: req.body.user.email, password_hash: req.body.user.pass })
  userQuery.findOne(function(err, user){
    if(err){
      next(err)
    }else{
      if(!user){
        res.status(401)
      }
      res.send(user)
    }
  })
});

/* POST user creation */
/* WARNING: only for testing and demo purposes, DO NOT ENABLE THIS ENDPOINT IN PRODUCTION */
router.post('/', function(req, res, next) {
  let userQuery = UserModel.where({ email: req.body.user.email })
  userQuery.findOne(function(err, user){
    if(!user){ 
      let user = new UserModel(req.body.user);
      user.password_hash = TextEncryption.encrypt(req.body.user.pass)
      user.api_token = TextEncryption.encrypt(req.body.user.email + Date.now()) //ensures uniqueness
      user.save( (err, user) =>{
        if(err){
          next(err);
        }else{
          res.send(user);
        }
      });
    }else{
      res.status(422)
      res.send({errors: ["User already exists"]})
    }
  });
});

module.exports = router;
