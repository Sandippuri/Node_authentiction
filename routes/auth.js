const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

   
//register a user
router.post('/register', async(req,res)=>{
//validating user
const {error} = registerValidation(req.body);
   if(error){
      return res.status(400).send(error.details[0].message);
   }
   //checking duplicate email
   const emailExist = await User.findOne({email:req.body.email});
   if(emailExist){
      return res.status(400).send("Email already exists");
   }

   //hashing password
   const hashedPassword = await bcrypt.hash(req.body.password,10);


   //creating user
   const user = new User({
       name:req.body.name,
       email:req.body.email,
       password:hashedPassword
   });
   try{
      const savedUser =  await user.save();
     res.send({user:user._id});
   }catch(err){
    res.status(400).send(err)
   }
});

//login
router.post('/login',async(req,res)=>{
   //validating user
   const {error} = loginValidation(req.body);
   if(error){
      return res.status(400).send(error.details[0].message);
   }
   //checking valid user
   const user = await User.findOne({email:req.body.email});
   if(!user){
      return res.status(400).send("User is not registered");
   }

   //validating password
   const validPass = await bcrypt.compare(req.body.password,user.password);
   if(!validPass){
      return res.status(400).send("Invalid email or password");
   }
   // creating jwt token
   const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
   res.header('auth-token',token).send(token);

})
 

module.exports = router;