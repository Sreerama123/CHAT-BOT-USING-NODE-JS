var mongoose = require('mongoose');
var integerschema =new mongoose.Schema({
  intent_id :{
    type : String
  },

  data :{
    type : String
  },
  link :{
    type : String
  }

});

module.exports=integerschema;
