const users=require("../models/userModel")
const bcrypt=require("bcrypt")
exports.registerUser = async(req,res)=>{
    const {username,email,password} =req.body
    console.log(req.body)
    const hashpassword = await bcrypt.hash(password,10);
    console.log("hello",hashpassword)
    const newUser = await users.create({
        email,
        username,
        password:hashpassword
    })
    res.json({
        success: true,
        message:"User Created",
        newUser
    })
}

exports.loginUser = async(req,res)=>{
    const {email,password} =req.body
     const user = await users.findOne({email:email})
     if(!user)
     {
        return res.json({
            success:true,
            message:"User Not Found"
        })
     }
     const passwordValidation = await bcrypt.compare(password,user.password)
     if(!passwordValidation)
     {
        return res.json({
            success :true,
            message:"Password Incorrect"
        })
     }
     res.json({
        success :true,
        message:"Logged in",
        user
    })
     
}