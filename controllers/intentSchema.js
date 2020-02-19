var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var intentSchema =new mongoose.Schema({
  int_id :{
    type : Number

  },
  intent :{
    type : String
  },
  data :{
    type : String
  },
  link :{
    type : String
  }

  
});
module.exports=intentSchema;
