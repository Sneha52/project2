const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{type:String,
    required:true,unique:true},
    p1:{type:String,
        required:true},
    p2:{type:String,
        required:true}

})
const Register=new mongoose.model("Register",userSchema);
module.exports=Register;
