//Import  Mongoose Module
var mongoose = require('mongoose');

// Connect to Mongodb  database(testDb is database name)
mongoose.connect('mongodb://127.0.0.1:27017/payroll');

// Create  schema
var Schema = mongoose.Schema;

// Schema properties should be match mongodb collection properites
var LeaveSchema = new Schema(
    {   
        empId:Number,
        name: String,
        leaveType: String,
        startDate: Date,
        endDate: Date,
        reason:String , 
        status: String,
     }, 
    { versionKey: false  } );

// Create Model Object	
// "depts"   --- collection name in mongodb
var Leaves = mongoose.model('leaves', LeaveSchema );

// Exporting DeptModel 
module.exports = Leaves;
