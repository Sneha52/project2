const express = require("express");
const path=require("path");
const app = express();
require("./db/conn");
const Register=require("./models/register");
const port=process.env.PORT || 3000
const static_path=path.join(__dirname,"../public");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.get("/", (req,res) => {
    res.render("design")


});
app.get("/display",(req,res)=>{
    res.render("display");
});
app.get("/display2",(req,res)=>{
    res.render("display2");
});
app.get("/signin",(req,res)=>{
    res.render("signin");
});
app.get("/index",(req,res)=>{
    res.render("index");
});
app.post("/index",async (req,res)=>{
    try{
       const p1=req.body.p1;
        const p2=req.body.p2;
        if(p1===p2){
            const registerUser=new Register({
                username: req.body.username,
                p1:p1,
                p2:p2
            })
            const registered= await registerUser.save();
            res.status(201).render("design");
        }
        else{
           res.send("password is not matching");
        }
    }
    catch (error){
        res.status(400).send(error);
    }
});
app.post("/signin",async (req,res)=>{
   try{
       const username=req.body.username;
       const p1=req.body.p1;
        const useremail=await Register.findOne({username:username});
       if(useremail.p1 === p1){
           res.status(201).render("design");
       }
       else{
           res.send("Invalid email or password");

                  }
   }
   catch (error){
       res.status(400).send("invalid email");
   }
});
app.listen(port ,()=>{
    console.log('server is running at ${port}');
});
