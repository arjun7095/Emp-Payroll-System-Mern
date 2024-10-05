const express = require("express");
const AdminsModel = require('./model/auth-model');

const router = express.Router();





router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await AdminsModel.findOne({ email, password }).exec();
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
  }
});


router.post('/register/employee',  async  function (req,res)
{ 
        var empObj  = new  AdminsModel({ 
                username  :  req.body.username,
                email   : req.body.email,
                role  : req.body.role,
                password   : req.body.password,
                 });

        // Logic to insert new dept in database
         await  empObj.save(); 
		
		var result = {};
		result.status  = "Registration Successful!!";
		console.log("[Create] - Record inserted in Database");
		res.send(result);           
});

module.exports = router;