
var express=require('express');
var chatController=require('./controllers/ChatController');
var app=express();
//var userSchema = require('./UserSchema');
app.set('view engine','ejs');
app.use(express.static('./public'));
app.listen(3000);
chatController(app);




































/*var express=require('express');
var todoController=require('./controllers/todoControllers');
var app=express();
app.set('view engine','ejs');
app.use(express.static('/public'));
todoController(app);
app.listen(3000);
/*app.get('/profile/:name',function(req,res){
res.render('test')
});

app.get('/kmit/:name',function(req,res){
var data={age:29,job:'developer',hobbies:['eating','sleeping']}
res.render('test',{person: req.params.name, data: data});
});
*/








/*
var http=require('http');
var server=http.createServer(function(req,res)
{
res.writeHead(200,{'content-Type':'text/plain'});
res.end('Hello DBOX');
});
server.listen(3000,'127.0.0.1');
console.log('listenting');
*/
