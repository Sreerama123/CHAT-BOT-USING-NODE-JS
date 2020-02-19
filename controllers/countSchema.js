var mongoose = require('mongoose');
var countSchema =new mongoose.Schema({
    intent :{
        type : String
    },
    count :{
        type : Number
    },
});
module.exports = countSchema;
