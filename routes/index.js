var express = require('express');
var router = express.Router();
const path = require('path');
const packageVersion = require("../package.json");
const views = require('../views.json')
const fs = require('fs');
require('dotenv').config();
//GET home page. 
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Shivansh Guleria',
    views: views
  });
});
//GET about
router.get('/about', function(req, res) {
  res.render('about', {
    title: 'About',
    version: packageVersion.version
  });
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

//GET files
router.get('/files', function(req, res) {
  res.render('files', {
    title: "Files",
    views: views
  })
});

if(process.env.PORT === "3000"){
//GET upload 
router.get('/files/upload', (req, res) => {
  res.render("upload", {
    title: "Upload"
  });
});

//POST upload
router.post('/upload', (req,res) => {
  let id = Object.keys(views.books).length + 1;
  let title = req.body.title;
  let author = req.body.cauthor;
  let link = "https://files.shivanshguleria.ml/src/books/" + title + ".pdf";
  let size = req.body.size;
  let page = req.body.pages;
  const data = fs.readFileSync("./views.json");
  let myObject= JSON.parse(data);
  let newData = {
    id: id,
    title: title,
    author: author,
    link: link,
    size: size,
    pages: page 
  };
  myObject['books'].push(newData);
  jsonStr = JSON.stringify(myObject);
  fs.writeFile("./views.json", jsonStr, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });
  res.json({message: "Files Added"});
})
}
else{
  router.get('/files/upload', (req, res) => {
    res.redirect("https://www.youtube.com/watch?v=H8ZH_mkfPUY");
  });

  router.post('/upload', (req,res) => {
    res.redirect("https://www.youtube.com/watch?v=H8ZH_mkfPUY");
  });
}

//GET projects
router.get('/jsprojects',(req, res) => {
  res.render('jsprojects', {
    title: "Projects",
    views: views
  })
})

//GET jsprojects/counterapp
router.get('/jsprojects/counterapp', (req, res)=> {
  res.sendFile(path.resolve('projects/counter-app.html'));
})

//GET jsprojects/calculater-challenge
router.get('/jsprojects/calculater-challenge', (req, res)=> {
  res.sendFile(path.resolve('projects/calculater-challenge.html'));
})

//GET jsprojects/blackjack-game
router.get('/jsprojects/blackjack-game', (req, res) => {
  res.sendFile(path.resolve('projects/blackjack-game.html'));
})
 
//GET jsprojects/emoji-fighter
router.get("/jsprojects/emoji-fighter", (req, res) => {
  res.sendFile(path.resolve('projects/emoji-fighter.html'));
})

//GET jsprojects/sorting-fruits
router.get("/jsprojects/sorting-fruits", (req, res) => {
  res.sendFile(path.resolve('projects/fruit-sort.html'));
})

//GET jsprojects/password-generater
router.get("/jsprojects/password-generater", (req, res) => {
  res.sendFile(path.resolve('projects/password-generater.html'));
})

//GET jsprojects/leadsTracker-extension
router.get("/jsprojects/leadsTracker-extension", (req, res) => {
  res.redirect("https://files.shivanshguleria.ml/src/misc/leadsTracker.zip")
})

//GET /jsprojects/add-to-cart
router.get("/jsprojects/add-to-cart",(req, res) => {
  res.sendFile(path.resolve('projects/add-to-cart.html'))
})

//GET /jsprojects/generate-pass
router.get("/jsprojects/generate-pass",(req, res) => {
  res.sendFile(path.resolve('projects/generate-pass.html'))
})

console.log(process.env.PORT)
module.exports = router;
