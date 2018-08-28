let express = require('express');
let router = express.Router();
let ArticleModel = require('../models/ArticleModel');
let UserAuthentication = require('../helpers/userAuthentication')

/* GET articles listing. */
router.get('/', function(req, res, next) {
  ArticleModel.find({}).sort('field -created_at').exec((err, articles)=>{
    if(err){
      next(err)
    }else{ 
      res.send(articles)
    }
  })
});

/* POST articles creation */
router.post('/', function(req, res, next) {
  UserAuthentication.verifyUserToken(req.body.token, (err, user)=>{
      let article = new ArticleModel(req.body.article);
      article.save( (err, article) =>{
        if(err){
          next(err);
        }else{
          res.send(article)
        }
      });
    },
    () => {
      res.status(401)
      res.send('Unauthorized user credentials')
    }
  );
});

/* PUT articles update */
router.put('/:id', function(req, res, next) {
  UserAuthentication.verifyUserToken(req.body.token, (err, user)=>{
      ArticleModel.findByIdAndUpdate(req.body.article._id, req.body.article, (err, article) => {
        if(err){
          next(err);
        }else{
          res.send(req.body.article);
        }
      });
    },
    () => {
      res.status(401)
      res.send('Unauthorized user credentials')
    }
  )
});

/* DELETE articles */
router.delete('/:id', function(req, res, next) {
  ArticleModel.findByIdAndDelete(req.body.article._id, {}, (err, article) => {
    if(err){
      next(err);
    }else{
      res.status(202);
      res.send('OK')
    }
  });
});

module.exports = router;
