const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
          },
          username: {
            type: String,
            required: true,
          },
          password: {
            type: String,
            required: true,
          },
          tasks: [
            {
              type: mongoose.Types.ObjectId,
              ref: "tasks",
            },
          ],
    }
)
userSchema.methods.getJwtToken= function (){
    
  return  jwt.sign({id:this.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})
}            

module.exports = mongoose.model("users",userSchema)