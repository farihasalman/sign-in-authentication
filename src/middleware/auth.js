const jwt=require("jsonwebtoken")
const Register=require('../models/registers')

const auth=async (req,res,next)=>{
    try{
        const token=req.cookies.jwttoken;
        const verifyUser=jwt.verify(token,"usersignupauthenticationmernbackendproject");
        next();
    }
    catch(err){
        res.status(401).send(err);
    }
}

module.exports=auth;