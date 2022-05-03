const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const QuestionSchema=new Schema({
    Question:{
        type:String,
        required:true
    },
    Answer:{
        type:Array,
        required:false
    }
},{timestamp:true});

const Question=mongoose.model("Ques",QuestionSchema);
module.exports=Question;
