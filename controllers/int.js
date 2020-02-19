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
var intentSchema = require('./intentsch');
var intent = require('./integerschema');
mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true })

const intent_dbox= mongoose.model('abcs',intentSchema)
const intent_darwin= mongoose.model('intents',intent)
console.log(intent_dbox);
console.log(intent_darwin);
var urlencodedParser=bodyParser.urlencoded({extend:false});

function intents(intent_id,obj)
{
  return new Promise(function(resolve,reject)
  {
    var arr=new Array();
    if(intent_id!=null)
    {
      intent_dbox.find({intent_id:intent_id},(err,docs)=>{
        arr[0]=docs[0].objects[obj].data;
        arr[1]=docs[0].objects[obj].link;
        resolve(arr);

      }

    )
  }
  else {
    intent_darwin.find({intent:obj},(err,docs)=>{

      arr[0]=docs[0].data;
      arr[1]=docs[0].link;

      resolve(arr);
    })

  }

})
}
//intents('feature','payroll');
//onsole.log(intents(null,'hiring'))

module.exports = {

  intents,


};
