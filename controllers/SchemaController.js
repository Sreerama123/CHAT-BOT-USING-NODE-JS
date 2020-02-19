var constants = require('./Constants.js');
const mongoString=constants.mongoString;
var mongoose=require('mongoose');
sw = require('stopword');
var feedbackSchema = require('./feedbackSchema');
mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true });
const feedback = mongoose.model('feedback',feedbackSchema);

function addIntent(question)
{
  return new Promise(function(resolve,reject)
  {
	const oldString = question.split(' ')
	const newString = sw.removeStopwords(oldString);

	 var intents = newString.toString();
var m=new feedback;
m.question=question;
m.suggested_intent=intents;
m.save(function(err) {
	if(err){
		console.log(err);
		resolve(err);
	}
  else {
    {
      console.log('inserted');
			resolve('inserted');
    }
  }
});
})
}
module.exports = {

  addIntent


};

/*var mongoose=require('mongoose');
var JobSchema = require('./JobSchema');
mongoose.connect('mongodb+srv://dbox:dbox@cluster0-obikb.mongodb.net/test?retryWrites=true&w=majority',{  useUnifiedTopology: true ,useNewUrlParser: true });
const Job = mongoose.model('Job',JobSchema);
var m = new Job;
m.id = '5e27f1e741829';
m.experience_from= 0;
m.experience_to =0;
m.office_location_arr = ['Hyderabad, Telangana, India'];
m.office_location_show_arr='Hyderabad, Telangana, India';
m.created_on ='2020-01-22T06:55:35.000Z';
m.department = 'Product Design';
m.department_id ='Product Design';
m.emp_type='Full-Time';
m.emp_type_id ='Full-Time';
m.title='Product Designer';
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
*/
