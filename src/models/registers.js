const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
//generating tokens
userSchema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id.toString()},"usersignupauthenticationmernbackendproject");
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token;
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
}

const Register = new mongoose.model("Register",userSchema);

exports=module.exports=Register;