var express = require('express');
var router = express.Router();
const path = require('path');


 //GET home page. 
router.get('/', function(req, res) {
  res.sendFile(path.resolve('public/pages/index.html'));
});

//GET about
router.get('/about', function(req, res) {
  res.sendFile(path.resolve('public/pages/about.html'));
});
//GET resume
router.get('/resume', function(req, res) {
  res.sendFile(path.resolve('public/resume.pdf'));
});

//GET sitemap
router.get('/sitemap', function(req, res) {
  res.sendFile(path.resolve('public/sitemap.xml'));
});

//GET 404
router.get('/404', function(req, res){
  res.sendFile(path.resolve('public/pages/404.html'));
});
//GET font test
router.get('/font-test',function(req, res){
  res.sendFile(path.resolve('public/pages/font-test.html'))
})

module.exports = router;
