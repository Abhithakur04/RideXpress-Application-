const userModel=require("../models/user.model");
const userService=require("../services/user.services")
const {validationResult}=require("express-validator");
const BlacklistTokenModel=require("../models/blacklistToken.model");

module.exports.registerUser=async(req,res,next)=>{
   //body and validationResult are middlewares in which body check if error is there or not nad move to next middleware

   const errors=validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array() });  
    
   }
   const {fullname,email,password}=req.body;
   const isUserAlreadyExist=await userModel.findOne({email});
   if(isUserAlreadyExist){
      return  res.status(400).json({message:"User already exist"}); 
   }
   const hashedPassword=await userModel.hashPassword(password);
   const user=await userService.createUser({
         firstname:fullname.firstname,
         lastname:fullname.lastname,
         email,
         password:hashedPassword
   });
   const token=user.generateAuthToken();
   res.status(201).json({token,user});
};

module.exports.loginUser=async(req,res,next)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array() }); 
   }
   const {email,password}=req.body;
   const user=await userModel.findOne({email}).select("+password");
   if(!user){
      return res.status(401).json({message:"Invalid email or password"});
   }
   const isMatch=await user.comparePassword(password);
   if(!isMatch){
      return res.status(401).json({message:"Invalid email or password"});
   }
   const token=user.generateAuthToken();
   res.cookie("token",token);
   res.status(200).json({token,user});
};

module.exports.getUserProfile=async(req,res,next)=>{
 res.status(200).json(req.user);
}
//we clear cookie and store the token in blacklistmodel which expires after 24 hr

module.exports.logoutUser=async(req,res,next)=>{
   res.clearCookie("token");
   //this will clear the cookie but before sending the response if another request is processing
   const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
   //balcklisting is used because we need logout from all devices
   await BlacklistTokenModel.create({token});
   res.status(200).json({message:"Logged Out"});
}
