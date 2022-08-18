const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/UserSignup")
.then(()=>{
    console.log("Connection to Database Successful!")
}).catch((err)=>{
    console.error("Connection Unsuccessful")

})