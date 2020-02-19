var bodyParser=require('body-parser');
var mongoose=require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var constants = require('./Constants.js');
const mongoString=constants.mongoString;
var intentSchema = require('./intentSchema');
intentSchema.plugin(AutoIncrement, {id:'int_seq',inc_field: 'int_id'});
mongoose.connect(mongoString,{  useUnifiedTopology: true ,useNewUrlParser: true })
var intent=mongoose.model("intent",intentSchema);
var n = new intent;
n.intent='blogs';
n.data="We encourage you to visit our News site, where we update our Global and Brand Newsrooms with information on Our Brands, Who We Are, Sustainability and much more"
n.link='https://www.darwinbox.com/blog/';
n.save(function(err) {
	if(err){
		console.log(err);
	}
	else {
		{
			console.log('inserted');
		}
	}
});
