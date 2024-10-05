//Import  Mongoose Module
var mongoose = require('mongoose');

// Connect to Mongodb  database(testDb is database name)
mongoose.connect('mongodb://127.0.0.1:27017/payroll');

// Create  schema
var Schema = mongoose.Schema;

// Schema properties should be match mongodb collection properites
var WorkModelSchema = new Schema(
    {   
        empId:Number,
        work: String,
        date:Date
     }, 
    { versionKey: false  } );

// Create Model Object	
// "depts"   --- collection name in mongodb
var WorkSchedule = mongoose.model('workSchedule', WorkModelSchema );

// Exporting DeptModel 
module.exports = WorkSchedule;
