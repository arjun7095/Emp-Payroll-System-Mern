//Import  Mongoose Module
var mongoose = require('mongoose');

// Connect to Mongodb  database(testDb is database name)
mongoose.connect('mongodb://127.0.0.1:27017/payroll');

// Create  schema
var Schema = mongoose.Schema;

// Schema properties should be match mongodb collection properites
var EmployeesModelSchema = new Schema(
    {   
        empId:{
            type: Number,
            required : true,
            unique : true
        },
        name: String,
        email:{
            type: String,
            required : true,
            unique : true
        },
        category:String,
       
        salary:Number,
        address:String
     }, 
    { versionKey: false  } );

// Create Model Object	
// "depts"   --- collection name in mongodb
var EmployeesModel = mongoose.model('employees', EmployeesModelSchema );

// Exporting DeptModel 
module.exports = EmployeesModel;
