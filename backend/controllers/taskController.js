const tasks = require("../models/taskModel")
const users =require("../models/userModel")
exports.createTasks = async(req,res,next)=>{

  const {email,taskname , taskdescription}=req.body
  const user = await users.findOne({email})
  try{
  if(!user)
  {
    return res.json({
        success:true,
        message:"No user recieved"
    })
  }
  
  const task = await tasks.create({
    taskname,
    taskdescription,
    user:user
})
  user.tasks.push(task)
  user.save()
res.json({
    success:true,
    message:"task created successfully",
    task
})
  }
  catch(error)
  {
    console.log(error)
  }
}

exports.getAllTasks = async(req,res)=>{
    const {id}=req.params
    const taskAll = await tasks.find({ user: id });
    console.log(taskAll)
    res.json({
        success:true,
        taskAll
    })
}

exports.getSingleTasks =async(req,res)=>{

  const {id} =req.params
  const stask =await tasks.findById(id)
  res.json({
    success:true,
    stask
  })
}

exports.updateTasks = async(req,res)=>{

    
    const{_id,taskname ,taskdescription}=req.body

 

    const updatedTasks = await tasks.findByIdAndUpdate(_id,{taskname:taskname,taskdescription:taskdescription},{new:true})
    res.json({
        success: true,
        updatedTasks
    })
}

exports.deleteTasks =async(req,res)=>{
  console.log(req.body)
    const{email}=req.body
    const {id} =req.params

    console.log(id,email)
    const user= await users.findOneAndUpdate({email},{ $pull: { tasks:id }})
    const deletedTasks = await tasks.findByIdAndDelete(id)
  
    res.json({
        success:true,
        deletedTasks
    })
}