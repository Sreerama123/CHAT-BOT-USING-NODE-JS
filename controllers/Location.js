var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var exp = require('./Experience.js');
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

function location(location,type,title,min,max,min_exp,max_exp,count1)
{
  return new Promise(function(resolve,reject)
  {

    var set=new Set();
    var arr=new Array();
    var a="Sorry I didn't understand You"
    if(location==null && title==null)
    {

      var k=new Array();
      jobs.find({emp_type:type},(err,docs)=>{
        console.log(docs.length);

        for(var i=0;i<docs.length &&i<3;i++)
        {
          set.add(docs[i].title);
        }
        arr=Array.from(set);
        console.log(arr)
        if(min!=null || max!=null)
        {
          exp.experience(min,max,min_exp,max_exp,null).then(function(data)
          {

            console.log(data);


            var intersection = data.filter(function(x) {

              if(arr.indexOf(x) != -1)
              return true;
              else
              return false;
            });
            console.log('haha');
            console.log(intersection);
            if(count1!=null)
            {
              console.log('a')
              var int1=new Array();
              int1[0]=intersection.length
              resolve(int1);
            }
            else
            {
              console.log('b')


              resolve(intersection);
            }
          })
        }
        else
        {
          if(count1!=null)
          {
            console.log('c')
            var arr1=new Array();
            arr1[0]=arr.length;
            resolve(arr1);
          }
          else
          {

            /*console.log('d')
            console.log(k);
            resolve(arr);*/
            if(arr.length>3)
            {
              resolve(arr.slice(0, 3));
            }
            else {
              resolve(arr);
            }
          }
        }
      })
    }
    else if(location==null && type==null)
    {
      count=0;
      jobs.find({title:title},(err,docs)=>
      {
        console.log(docs.length);
        for(var i=0;i<docs.length && i<3;i++)
        {

          set.add(docs[i].title);

        }
        arr=Array.from(set)
        if(min!=null || max!=null)
        {
          exp.experience(min,max,min_exp,max_exp,null).then(function(data)
          {

            console.log(data);
            var intersection = data.filter(function(x) {

              if(arr.indexOf(x) != -1)
              return true;
              else
              return false;
            });
            if(count1!=null)
            {
              console.log('a')
              var int1=new Array();
              int1[0]=intersection.length
              resolve(int1);
            }
            else {
              console.log('b')
              resolve(intersection);
            }
          })
        }
        else {
          if(count1!=null)
          {
            console.log('c')
            var arr1=new Array();
            arr1[0]=arr.length;
            resolve(arr1);
          }
          else {

            console.log('d')
            /*  console.log(k);
            resolve(arr);*/
            if(arr.length>3)
            {
              resolve(arr.slice(0, 3));
            }
            else {
              resolve(arr);
            }
          }
        }
      });

    }
    else if(title==null && type==null)
    {
      var count=0
      jobs.find({},(err,docs)=>{

        for(var i=0;i<docs.length;i++)
        {
          var l=docs[i].officelocation_show_arr;
          if(l.includes(location))
          {

            set.add(docs[i].title);

          }
        }
        arr=Array.from(set)
        console.log(arr);
        if(min!=null || max!=null)
        {
          exp.experience(min,max,min_exp,max_exp,null).then(function(data)
          {

            console.log(data);


            var intersection = data.filter(function(x) {

              if(arr.indexOf(x) != -1)
              return true;
              else
              return false;
            });
            if(count1!=null)
            {
              console.log('a')
              var int1=new Array();
              int1[0]=intersection.length
              resolve(int1);
            }
            else {
              console.log('b')
              resolve(intersection);

            }
          })
        }
        else {
          if(count1!=null)
          {
            console.log('c')
            var arr1=new Array();
            arr1[0]=arr.length;
            resolve(arr1);
          }
          else {

            console.log('d')
            console.log(k);
            console.log(arr)
            if(arr.length>3)
            {
              resolve(arr.slice(0, 3));
            }
            else {
              resolve(arr);
            }
          }
        }
      });
    }

    else if(location==null)
    {
      jobs.find({emp_type:type,title:title},(err,docs)=>{
        count++;
        console.log(docs.length);

        for(var i=0;i<docs.length;i++)
        {
          set.add(docs[i].title);
        }
        arr=Array.from(set)

        if(min!=null || max!=null)
        {
          exp.experience(min,max,min_exp,max_exp,null).then(function(data)
          {

            console.log(data);
            var intersection = data.filter(function(x) {

              if(arr.indexOf(x) != -1)
              return true;
              else
              return false;
            });
            if(count1!=null)
            {
              console.log('a')
              var int1=new Array();
              int1[0]=intersection.length
              resolve(int1);
            }
            else {
              console.log('b')
              resolve(intersection);
            }
          })
        }
        else {
          if(count1!=null)
          {
            console.log('c')
            var arr1=new Array();
            arr1[0]=arr.length;
            resolve(arr1);
          }
          else {

            /*  console.log('d')
            console.log(k);
            resolve(arr);*/
            if(arr.length>3)
            {
              resolve(arr.slice(0, 3));
            }
            else {
              resolve(arr);
            }
          }
        }
      });

    }
    else if(title==null)
    {

      jobs.find({emp_type:type},(err,docs)=>{

        console.log(docs.length);

        for(var i=0;i<docs.length;i++)
        {

          var l=docs[i].officelocation_show_arr;

          if(l.includes(location))
          {
            set.add(docs[i].title);


          }
        }
        arr=Array.from(set)
        if(min!=null || max!=null)
        {
          exp.experience(min,max,min_exp,max_exp,null).then(function(data)
          {
            console.log(data);
            var intersection = data.filter(function(x) {

              if(arr.indexOf(x) != -1)
              return true;
              else
              return false;
            });
            if(count1!=null)
            {
              console.log('a')
              var int1=new Array();
              int1[0]=intersection.length
              resolve(int1);
            }
            else {
              resolve(intersection);
            }

          })
        }
        else {
          if(count1!=null)
          {
            console.log('c')
            var arr1=new Array();
            arr1[0]=arr.length;
            resolve(arr1);
          }
          else {

            console.log('d')
            /*  console.log(k);
            resolve(arr);*/
            if(arr.length>3)
            {
              resolve(arr.slice(0, 3));
            }
            else {
              resolve(arr);
            }
          }
        }

      });
    }
    else if(type==null)
    {
      jobs.find({title:title},(err,docs)=>{

        console.log(docs.length);

        for(var i=0;i<docs.length;i++)
        {

          var l=docs[i].officelocation_show_arr;
          console.log(l);

          if(l.includes(location))
          {
            set.add(docs[i].title);

          }


        }
        arr=Array.from(set)

        if(min!=null || max!=null)
        {
          exp.experience(min,max,min_exp,max_exp,null).then(function(data)
          {

            console.log(data);


            var intersection = data.filter(function(x) {

              if(arr.indexOf(x) != -1)
              return true;
              else
              return false;
            });
            if(count1!=null)
            {
              console.log('a')
              var int1=new Array();
              int1[0]=intersection.length
              resolve(int1);
            }
            else {
              console.log('b')
              resolve(intersection);
            }
          })
        }
        else {
          if(count1!=null)
          {
            console.log('c')
            var arr1=new Array();
            arr1[0]=arr.length;
            resolve(arr1);
          }
          else {
            console.log('d')
            /*  console.log(k);
            resolve(arr);*/
            if(arr.length>3)
            {
              resolve(arr.slice(0, 3));
            }
            else {
              resolve(arr);
            }
          }
        }

      });

    }
    else if(location!=null && type!=null && title!=null)
    {
      jobs.find({title:title,emp_type:type},(err,docs)=>{

        console.log(docs.length);

        for(var i=0;i<docs.length;i++)
        {

          var l=docs[i].officelocation_show_arr;

          if(l.includes(location))
          {
            set.add(docs[i].title);

          }


        }
        arr=Array.from(set)

        if(min!=null || max!=null)
        {
          exp.experience(min,max,min_exp,max_exp,null).then(function(data)
          {

            console.log(data);


            var intersection = data.filter(function(x) {

              if(arr.indexOf(x) != -1)
              return true;
              else
              return false;
            });
            if(count1!=null)
            {
              console.log('a')
              var int1=new Array();
              int1[0]=intersection.length
              resolve(int1);
            }
            else {
              console.log('b')


              resolve(intersection);
            }


          })
        }
        else {
          if(count1!=null)
          {
            console.log('c')
            var arr1=new Array();
            arr1[0]=docs.length;
            resolve(arr1);
          }
          else {

            console.log('d')
            /*  console.log(k);
            resolve(arr);*/
            if(arr.length>3)
            {
              resolve(arr.slice(0, 3));
            }
            else {
              resolve(arr);
            }
          }
        }

      })

    }
  })
}
module.exports = {


  location

};
