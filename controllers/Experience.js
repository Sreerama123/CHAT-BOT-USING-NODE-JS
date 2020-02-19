var bodyParser=require('body-parser');
var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
var constants = require('./Constants.js');
const mongoString=constants.mongoString;
const accessToken=constants.accessToken
const cheerio=require('cheerio');
const request=require('request');
var session=require('express-session');
const emailRegex=require('email-regex');
var userSchema = require('./UserSchema');
var JobSchema = require('./JobSchema');
mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true })
const User = mongoose.model('User',userSchema)
const jobs = mongoose.model('jobs',JobSchema)
var urlencodedParser=bodyParser.urlencoded({extend:false});

function experience(min,max,min_exp,max_exp,c)
{
  return new Promise(function(resolve,reject)
  {
    var ans=new Array();
    var set = new Set();
    if(min!=null && max!=null)
    {
      jobs.find({experience_to_num:max_exp,experience_from_num:min_exp},(err,docs)=>{


        for(var i=0;i<docs.length;i++)
        {
          console.log(docs[i].experience_to_num);

          set.add(docs[i].title);


        }
        var arr=new Array();
        arr=Array.from(set);
        /*ans=arr;
        resolve(ans);*/
        if(c!=null)
        {
          var arr1=new Array();
          arr1[0]=arr.length
          resolve(arr1);
        }
        else {
          resolve(arr)
        }

      })
    }

    else if(min!=null)
    {
      console.log(c+"sdfg")
      jobs.find({experience_from_num:min_exp},(err,docs)=>{

        for(var i=0;i<docs.length;i++)
        {
          console.log(docs[i].experience_to_num);

          set.add(docs[i].title);



        }

        var arr=new Array();
        arr=Array.from(set);
        console.log(arr);
        /*  ans=arr;
        console.log("sreerama")
        resolve(ans);*/
        if(c!=null)
        {
          var arr1=new Array();
          arr1[0]=arr.length
          resolve(arr1);
        }
        else {
          resolve(arr)
        }

      })
    }
    else if(max!=null)
    {


      jobs.find({experience_to_num:max_exp},(err,docs)=>{


        for(var i=0;i<docs.length;i++)
        {
          console.log(docs[i].experience_to_num);

          set.add(docs[i].title);

        }

        var arr=new Array();
        arr=Array.from(set);
        /*ans=arr;
        resolve(ans);*/
        if(c!=null)
        {
          var arr1=new Array();
          arr1[0]=arr.length
          resolve(arr1);
        }
        else {
          resolve(arr)
        }
      })
    }

  }

)}

module.exports = {

  experience,


};
