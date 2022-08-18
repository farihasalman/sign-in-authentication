const express=require('express');
const app=express();
const hbs=require('hbs')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const auth=require('./middleware/auth')

const path=require('path');
require("./db/connect")
const Register=require('./models/registers')
const Course=require('./models/courses')
const port=process.env.PORT || 6767; 

const static_path=path.join(__dirname,'../public')
const templates_path=path.join(__dirname,'../templates/views')
const partials_path=path.join(__dirname,'../templates/partials')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(express.static(static_path))
app.set('view engine','hbs');
app.set('views',templates_path)
hbs.registerPartials(partials_path)

//rendering index - home page
app.get('/',(req,res)=>{
    res.render('index')
})
//rendering secret - home page
app.get('/secret',auth,(req,res)=>{
    Course.find()
    .then((courses)=>{
        res.render('secrethome',{
            courses
        })
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',async (req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        //comparing the two passwords
        if(password===cpassword){
            const registerUser=new Register({
                username:req.body.username,
                email:req.body.email,
                password:password,
                confirmpassword:cpassword
            })
            const token=await registerUser.generateAuthToken();
            res.cookie("jwttoken",token,{
                expires:new Date(Date.now() + 600000),
                httpOnly:true
            });

            const registered=await registerUser.save();
            return res.redirect('/secret')

        }else{
            return res.status(400).send("Passwords do not match!")
        }
    }
    catch(err){
        res.status(400).send("Entered email id already exists!")
    }
})

app.listen(6767,()=>{
    console.log(`Server started on port ${port}`);
})