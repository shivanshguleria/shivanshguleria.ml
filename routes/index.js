var express = require('express');
var router = express.Router();
const path = require('path');


//GET home page. 
router.get('/', function(req, res) {
  res.render('index', {title: 'Shivansh Guleria'});
});

//GET about
router.get('/about', function(req, res) {
  res.render('about', {title: 'About'});
});

//GET 404
router.get('/404', function(req, res){
  res.render('404', {title: 'Page Not Found'});
});

//GET test
router.get('/test',function(req, res){
  res.render('test', {title : '!!This is a Test!!'})
})

//GET resume
router.get('/resume', function(req, res) {
  res.sendFile(path.resolve('public/resume.pdf'));
});

//GET sitemap
router.get('/sitemap', function(req, res) {
  res.sendFile(path.resolve('public/sitemap.xml'));
});

module.exports = router;
