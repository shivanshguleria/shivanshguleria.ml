var express = require('express');
var router = express.Router();


module.exports.index = function(req, res) {
  res.sendFile('/public/pages/index.html')
}
/* GET home page. 
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('/public/pages/index.html'));
});*/



module.exports = router;
