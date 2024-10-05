//Import  Mongoose Module
var mongoose = require('mongoose');

// Connect to Mongodb  database(testDb is database name)
mongoose.connect('mongodb://127.0.0.1:27017/payroll');

// Create  schema
var Schema = mongoose.Schema;

// Schema properties should be match mongodb collection properites
var salaryModelSchema = new Schema(
    {   
        empId:Number,
        name: String,
        salary:Number,
        month:String,
        year:Number,
       
     }, 
    { versionKey: false  } );

// Create Model Object	
// "depts"   --- collection name in mongodb
var SalaryModel = mongoose.model('salaries', salaryModelSchema );

// Exporting DeptModel 
module.exports = SalaryModel;