const express = require("express")
const app= express()
const cors=require("cors")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
  
app.use(cors())
app.use(
    cors({
      origin:"*",
    })
  );
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
const tasks=require("./routes/taskRoute")
const user=require("./routes/authRoute")

app.use("/api/v1",tasks)
app.use("/api/v1",user)
module.exports = app