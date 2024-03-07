const mongoose = require("mongoose");
    
const connectDB =  async ()=>{
    mongoose.connect("mongodb+srv://jayurane32003:jayrane32003@cluster0.phyhiqw.mongodb.net/mern_crud?retryWrites=true&w=majority").then(()=>{
        console.log("Db connected")
      }).catch((error)=>{
        console.log("Db connection failed")
        console.log(error)
        process.exit(0)
      })
}
module.exports =  connectDB;




