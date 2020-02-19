var mongoose=require('mongoose');
var JobSchema = require('./intentsch.js');
var constants = require('./Constants.js');
const mongoString=constants.mongoString;
var countSchema = require('./countSchema');
mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true });
const Job = mongoose.model('abc',JobSchema);
var m = new Job;
m.intent_id = 'kmit';
m.save(function(err) {
	if(err){
		console.log(err);
	}
  else {
    {
      console.log('inserted');
    }
  }
});
module.exports = (function(app)
{

});
