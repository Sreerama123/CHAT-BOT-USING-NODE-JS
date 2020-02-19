var constants = require('./Constants.js');
const mongoString=constants.mongoString;
var mongoose=require('mongoose');
var countSchema = require('./countSchema');
mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true });
const count = mongoose.model('hits',countSchema);

function UpdateCount(arr)
{
  return new Promise(function(resolve,reject)
  {
for(var i=1;i<arr.length;i++)
{
  if(arr[i]!=null)
  {
  console.log('hey')

var q=arr[i]
console.log(q+"abcde")
count.find({intent:q},(err,docs)=>{

if(docs.length!=0)
{console.log(i)
  console.log(" there")
  var c=docs[0].count;
  var newvalues = { $set: {count: c+1 } };
  var query={intent:q}
  count.updateOne(query, newvalues, function(err, res) {
      if (err)
      {
      resolve(err)
      }
      else {
      console.log("1 document updated");
      resolve("Updated")
    }
    })

}
else
{
  console.log(i)
  console.log("not there")
  var m=new count
  m.intent=q;
  m.count=1
  m.save(function(err) {
  	if(err){
  		console.log(err);
  		resolve(err);
  	}
    else
      {
        console.log('inserted');
  			resolve('inserted');
      }
    });

}
})
}
}
})
}
module.exports = {

  UpdateCount


};
