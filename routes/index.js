var express = require('express');
var router = express.Router();
const request = require('request')
const path = require('path');
const app = require('../app.js')
const packageVersion = require("../package.json");
const views = require('../views.json')
const routes = require("./routes.json")       
const fs = require('fs');
const { json } = require('express/lib/response.js');
require('dotenv').config();
let projectsUrl = "/projects/"

// 1 GET commit version from GITHUB API  *START*
let appVer = "<sdsd>";
console.log(appVer)
let options = {
  headers: {
    'User-agent': "shivanshguleria"
  }
}
 request.get('https://api.github.com/repos/shivanshguleria/shivanshguleria.ml/git/ref/heads/main',options,function(err,res,body){
  if(err) {
    console.log("Request failed")
  }
  else if(res.statusCode === 200) {
  const reqBody = JSON.parse(body)
  request.get(reqBody.object.url, options, function(err, res,body){
    if(err) {
      console.log("Second Request Failed")
    } else if(res.statusCode === 200) {
      let reqBody2 = JSON.parse(body).message.split('\n')
      appVer = reqBody2[0]
      console.log(appVer)
    }
  })
  } else {
    console.log("\nCommit Request Failed due to res error [routes/index]")
  }
});
//1  *END*

//2 Upload new book  *START*
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

// 2 *END*

//GET home page. 
router.get('/', function(req, res) {
  res.redirect("https://shivanshguleria.xyz")
  // res.render('index', {
  //   title: 'Shivansh Guleria',
  //   views: views
  // });
});

router.get('/web', function(req, res) {
  res.render('index', {
    title: 'Shivansh Guleria',
    views: views
  });
});

//GET about
router.get('/about', function(req, res) {
  res.render('about', {
    title: 'About',
    version: appVer
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
  res.sendFile(path.resolve('public/Resume.pdf'));
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

//GET projects
router.get('/projects',(req, res) => {
  res.render('projects', {
    title: "Projects",
    views: views
  })
})

//GET all misc proojects
for(let i = 0; i < routes.routes.length; i++) {
let link = routes.routes[i].link
let route = routes.routes[i].path
router.get(projectsUrl  + link, (req, res) => {
  res.sendFile(path.resolve(route))
})
}

//GET jsprojects/leadsTracker-extension
router.get(projectsUrl + "leadsTracker-extension", (req, res) => {
  res.redirect("https://files.shivanshguleria.ml/src/misc/leadsTracker.zip")
})

console.log(process.env.PORT)
module.exports = router;
