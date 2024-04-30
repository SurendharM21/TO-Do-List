const express=require("express")
const router=express.Router()
const {createTasks,getAllTasks,updateTasks,deleteTasks,getSingleTasks} =require("../controllers/taskController")




router.post("/tasks/createTasks",createTasks)
//router.get("/tasks/getAllTasks/:id",getAllTasks)
router.route("/tasks/getSingleTasks/:id").get(getSingleTasks)
router.route("/tasks/getAllTasks/:id").get(getAllTasks)
router.route("/tasks/updateTasks").put(updateTasks)
router.route("/tasks/deleteTasks/:id").delete(deleteTasks)

module.exports = router