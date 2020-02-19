var mongoose = require('mongoose');
var intentsch =new mongoose.Schema({
  intent_id :{
    type : String
  },
  objects:
  {
    type:Object
  }


});

module.exports=intentsch;
