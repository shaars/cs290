var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5299);


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});

app.post('/postrequest', function(req,res){
    var qParams = [];
    for (var p in req.body){
      qParams.push({'name':p,'value':req.body[p]})
    }
    console.log(qParams);
    console.log(req.body);
    var context = {};
    context.dataList = qParams;
    context.requestType = "POST";
    res.render('request', context);
  });
  

app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.get('/getrequest',function(req,res){
    var qParams = [];
    for (var p in req.query){
      qParams.push({'name':p,'value':req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    context.requestType = "GET";
    res.render('request', context);
  });
  
 
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on  http://flip3.engr.oregonstate.edu' + app.get('port') + '; press Ctrl-C to terminate.');
});