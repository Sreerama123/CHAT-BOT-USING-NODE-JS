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
var intentSchema = require('./intentSchema');
mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true })

const intent_dbox= mongoose.model('intents',intentSchema)
var urlencodedParser=bodyParser.urlencoded({extend:false});

function intents(cus_intent)
{
  return new Promise(function(resolve,reject)
  {
    var res=new Array();

    intents_dbox.find({intent:cus_intent},(err,docs)=>{

      if(docs.length!=0)
      {
        res[0]=docs[0].data;
        res[1]=docs[0].link;
        resolve(res);
      }
      else {
      //  console.log(err)
      resolve(res);
      }
    });

    /*var pageToVisit = "https://darwinbox.com/index.php";
    console.log("Visiting page " + pageToVisit);
    request(pageToVisit, function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }
      console.log("Status code: " + response.statusCode);
      if(response.statusCode === 200) {
        var $ = cheerio.load(body);
        var links=collectInternalLinks($);
        for(var i=0;i<links.length;i++)
        {
          if(links[i].includes(intent))
          {
            console.log(links[i]);
            fun(links[i]);
            break;
          }
        }
      }
    });
    function collectInternalLinks($) {
    var allRelativeLinks = [];
    var allAbsoluteLinks = [];

    var relativeLinks = $("a[href^='/']");
    relativeLinks.each(function() {
      allRelativeLinks.push($(this).attr('href'));

    });

    var absoluteLinks = $("a[href^='http']");
    absoluteLinks.each(function() {
      allAbsoluteLinks.push($(this).attr('href'));
    });
    var allLinks = allAbsoluteLinks.concat(allRelativeLinks);
    console.log(allLinks);
    return allLinks;
  }
  function fun(link)
           {
             var page = "https://darwinbox.com/"+link;

             console.log("Visiting page " + page);
             request(page, function(error, response, body) {
               if(error) {
                 console.log("Error: " + error);
               }
               // Check status code (200 is HTTP OK)
               console.log("Status code: " + response.statusCode);
               if(response.statusCode === 200) {
                 // Parse the document body
                 var $ = cheerio.load(body);
                 link="https://darwinbox.com/"+link;
                 var reply=$("meta[name='description']").attr("content");
                 // reply=reply+"<a href='" + link + "'> Read More</a>";
                 var result=new Array();
                 result[0]=reply;
                 result[1]=link;
                 console.log(result);
                 resolve(result);

               }
             });
           }*/
  }

)}

module.exports = {

  intents,


};
