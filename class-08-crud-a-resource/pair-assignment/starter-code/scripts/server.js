var express = require('express');
var app = express();
var config = require('./config');
var models = require('./models');
var projects = require('../data/hackerIpsum.json');
var PORT = config.PORT;
var DB = config.DB;


app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/articles', function(req, res){
  models.Article.findAll().then(function(articles){
    res.json(articles);
  });
});

models.sequelize.sync({force: true}).then(function(y){
  projects.forEach(function(item){
    models.Article.create({
      title: item.title,
      category: item.category,
      author: item.author,
      authorUrl: item.authorUrl,
      publishedOn: item.publishedOn,
      body: item.body

    })
  })
});

models.sequelize.sync().then(function(x){
  app.listen(PORT, function(){
    console.log('server started','listening on PORT: '+ PORT+"DB URI STRING: " + DB);
  })
})
