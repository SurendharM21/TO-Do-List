const mongoose =require("mongoose")

const taskSchema =  mongoose.Schema(
    {
        taskname:{
            type:String,
           
        },
        taskdescription:{
            type:String,
           
        },
        user: [
            {
              type: mongoose.Types.ObjectId,
              ref: "users",
            }
        ]
    }
)

module.exports = mongoose.model("tasks",taskSchema)