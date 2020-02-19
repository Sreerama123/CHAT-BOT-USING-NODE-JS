var mongoose = require('mongoose');
var feedbackSchema =new mongoose.Schema({
  question :{
    type : String
  },
  suggested_intent :{
    type : String
  },
});
module.exports = feedbackSchema;
