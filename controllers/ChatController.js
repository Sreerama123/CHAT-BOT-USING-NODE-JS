var bodyParser=require('body-parser');
var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const uuid = require('uuid');
const admin=require('firebase-admin');
var constants = require('./Constants.js');
var exp = require('./Experience.js');
var dialogflow=require('./dialogflow.js');
var schema=require('./SchemaController.js')
var loc1 = require('./Location.js');
var inten = require('./int.js');
var update=require('./countUpdate.js')
const mongoString=constants.mongoString;
const accessToken=constants.accessToken
const cheerio=require('cheerio');
const request=require('request');
var session=require('express-session');
const emailRegex=require('email-regex');
var userSchema = require('./UserSchema');
var JobSchema = require('./JobSchema');
var data=[{item:'hi'},{item:'hello'}];
const secret='kmit';
/**
* Send a query to the dialogflow agent, and return the query result.
* @param {string} projectId The project to be used
*/
const val="Sorry could'nt get you information";
//  mongoose.connect('mongodb+srv://dbox:darwinbox123456789@cluster0-obikb.mongodb.net/test?retryWrites=true&w=majority',{  useUnifiedTopology: true ,useNewUrlParser: true })
try {
  mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true })

} catch (e) {
  console.log(e);

} finally {

}
//mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true })


const User = mongoose.model('User',userSchema)
const jobs = mongoose.model('jobs',JobSchema)
var urlencodedParser=bodyParser.urlencoded({extend:false});
module.exports = (function(app)
{
  //app.use(cookieparser());
  app.get('/bot', function(req,res)
  {
    res.render('bot');
  })
  app.get('/error', function(req,res)
  {
    res.render('error');
  })
  app.get('/chat', function(req,res)
  {
    res.render('chat');
  })

  app.use(session({secret:"dbox"}));

  app.post('/login', urlencodedParser,function(req,res)
  {
    var text=req.body.name;

    console.log(text);
    if(emailRegex().test(text))
    {

      console.log(req.body);
      try {

        User.find({email_id:text},(err,docs)=>{
          req.session.email=text;
          console.log(docs);
          if(docs.length==0)
          {
            res.send({status:'Please  Register,Enter you name',keyword:'rname'});
          }
          else
          {
            var pass=docs[0].password;
            req.session.password=pass;
            console.log(pass);
            res.send({status:'Please Enter Password',keyword:'password'});
          }

        });
      }
      catch(e)
      {
        console.log(e);
      }
    }
    else if(req.body.keyword=='rname')
    {
      req.session.rname=text;

      res.send({status:'Enter you Password',keyword:'rpassword'});
    }
    else if(req.body.keyword=='rpassword')
    {
      req.session.rpassword=text;
      var newuser=new User();
      newuser.name=req.session.rname;
      newuser.password=req.session.rpassword;
      newuser.email_id=req.session.email;
      newuser.save((err,doc)=>{
        if(err){
          console.log(err);
        }
        else
        {
          console.log('Inserted');
        }
      })

      const user=
      {
        email:req.session.email,
        password:text
      }
      const token=jwt.sign(user, secret);
      console.log(token+"12345");
      res.send({status:'Registration Successful,What do you want to know',keyword:'resume',api_key:token});
    }


    else if(req.body.keyword=='password'){
      var emailId=req.session.email;

      if(text==req.session.password)
      {

        const user=
        {
          email:emailId,
          password:req.session.password
        }
        const token=jwt.sign(user, secret);

        /*res.cookie('access_token',token,{
        maxAge:60 * 60 * 1000,
        httpOnly:true

      })*/
      res.send({status:'Hello,What do you want to know',keyword:'resume',api_key:token});
    }
    else {

      res.send({status:'Please Enter Valid Password',keyword:'password'});

    }
  }
  else {
    res.send({status:'Please enter a valid email Id',keyword:'email'});
  }
})

app.post('/chat',urlencodedParser,function(req,res)
{

  var token;
  try{
    token=req.body.token;
    console.log(token);

    const decoded=jwt.verify(token,secret);
  }
  catch
  {
    res.status(403);
  }
  var text=req.body.name;
  console.log(text);

  if(req.body.keyword=='success' || req.body.keyword=='resume'||req.body.keyword=='reply')
  {
    var arr=new Array();
    let result_form_dialog_flow = dialogflow.runSample(req.body.name).then(async function(data)
    {
      arr=data;

      console.log(arr)

      var word=req.body.name;
      console.log(word);
      if(arr.length!=1)
      {
        await  update.UpdateCount(arr).then(function(data)
        {
          console.log(data);
        })
      }
      if(arr[0]=='error')
      {
        console.log("I am heree");
        schema.addIntent(word).then(function(data)
        {
          console.log(data);
        })

        res.send({status:"Sorry I didn't understand you",keyword:'resume',api_key:token});
      }
      else  if(arr[0]=='jobs') {

        if(arr.length==1)
        {
          res.send({status:val,keyword:'resume',api_key:token});
        }
        if(arr[1]!=null || arr[2]!=null || arr[3]!=null)
        {
          loc1.location(arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8]).then(function(data)
          {
            console.log(data.length);

            ans=data;
            if(data.length==0)
            {
              res.send({status:val,keyword:'resume',api_key:token});
            }
            else {
              res.send({status:ans,keyword:'resume',flag:"1",api_key:token,link:'https://wild11.darwinbox.in/ms/candidate/careers'});
            }
          })

        }

        else if(arr[4]!=null ||arr[5]!=null)
        {
          console.log(arr[4]);
          exp.experience(arr[4],arr[5],arr[6],arr[7],arr[8]).then(function(data)
          {
            console.log(data);

            ans=data;
            console.log(ans)
            if(data.length==0)
            {
              res.send({status:val,keyword:'resume',api_key:token});
            }
            else {
              res.send({status:data,keyword:'resume',flag:"1",api_key:token,link:'https://wild11.darwinbox.in/ms/candidate/careers'});
            }
          })
        }
      }
      else if(arr[0]=='Welcome')
      {
        cosnole.log("shakeel")
        res.send({status:arr[1],keyword:'resume',api_key:token});

      }
      else if(arr[0]='intent')
      {


        var reply='';

        console.log(arr);

        inten.intents(arr[1],arr[2]).then(function(data)
        {

          reply=data[0];
          var link=data[1];
          console.log(data);
          if(data.length==0)
          {
            res.send({status:val,keyword:'resume',api_key:token});
          }
          else {
            res.send({status:reply,keyword:'resume',link:link,api_key:token,type:arr[0]});
          }

        })

      }

    });
  }
});
});
