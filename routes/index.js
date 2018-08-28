let express = require('express');
let path = require('path');
let router = express.Router();

/* GET home page for any unmatched paths. */
router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

module.exports = router;
