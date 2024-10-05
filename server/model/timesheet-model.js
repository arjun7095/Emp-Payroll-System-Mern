//Import  Mongoose Module
var mongoose = require('mongoose');

// Connect to Mongodb  database(testDb is database name)
mongoose.connect('mongodb://127.0.0.1:27017/payroll');

// Create  schema
var Schema = mongoose.Schema;

// Schema properties should be match mongodb collection properites
var TimeSheetSchema = new Schema(
    {   
        empId:Number,
        date:Date,
        punchIn : String,
        punchOut: String,
        duration:String
     }, 
    { versionKey: false  } );

// Create Model Object	
// "depts"   --- collection name in mongodb
var TimeSheet = mongoose.model('timeSheet', TimeSheetSchema );

// Exporting DeptModel 
module.exports = TimeSheet;
