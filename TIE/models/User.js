const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UsersSchema=new Schema({
    First_Name:{
        type:String,
        required:true
    },
    Last_Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
},{timestamp:true});

const Users=mongoose.model("User",UsersSchema);
module.exports=Users;
