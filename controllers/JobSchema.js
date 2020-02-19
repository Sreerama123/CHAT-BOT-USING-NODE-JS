var mongoose = require('mongoose');
var JobSchema =new mongoose.Schema({
    id :{
        type : String
    },
    experience_from_num :{
        type : Number
    },
    experience_to_num :{
        type : Number
    },
     officelocation_arr :{
      type: Array
    },
    officelocation_show_arr :{
      type : String
    },
    created_on :{
        type : String
    },
    department :{
        type : String
    },
    department_id :{
        type : String
    },
    emp_type :{
        type : String
    },
   emp_type_id :{
        type : String
    },
    title :{
        type : String
    }

});
module.exports = JobSchema;
