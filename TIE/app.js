//pakages
require('dotenv').config()
const express=require('express')
const ejs=require('ejs')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const path=require('path')
const cookieParser = require('cookie-parser')

const Users=require("./models/User");
const Question=require("./models/Ques");
const { redirect } = require('express/lib/response')


const app=express()
const port=process.env.PORT || 5000
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,useUnifiedTopology: true  }).then(res=>{
  app.listen(port)
  console.log(`Connected to DB and running at ${port}`)
})
.catch(err=>console.log(err))


//middleware and static files
app.set('view engine','ejs')
app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser())

//index
app.get('/',(req,res)=>{
  res.render('Index')
});

app.get('/Login',(req,res)=>{
  res.render('Login')
});

app.get('/QP',(req,res)=>{
  res.render('QP')
});


app.get('/Replay',(req,res)=>{

  Question.find().sort({createdAt:-1})
  .then((result)=>{
    console.log(result);
     res.render('Replay',{title:'Questions Avilable',Questions:result})
  })
  .catch(err=>console.log(err))
});

app.get('/ans/:id',(req,res)=>{
  const id=req.params.id;
  Question.findById(id)
  .then(result=>{
   res.render('Answer',{title:'Question and answer',Question:result})
  })
  .catch(err=>console.log(err))
})

app.put("/answer",(req,res)=>{
  Question.findByIdAndUpdate(req.body.id,{Question:req.body.Question,Answer:req.body.Answer},{useFindAndModify:true})
  .then(result=>{
    res.send({redirect:"/"})
  })
  .catch(err=>console.log(err))
  // //res.send({redirect:'/'})
})
app.get('/SignUp',(req,res)=>{
  res.render('SignUp')
});

//signup post
app.post("/signup",async(req,res)=>{
  
  const user=await new Users(req.body)
  user.save()
  res.send({redirect:'/Login',data:'succesful registred'})
})

app.post("/signin",async(req,res)=>{
    const user=await Users.findOne({email:req.body.Email})
  

  if(user.Password != req.body.Password){
    res.send({redirect:'/Login',data:'invalid password'})
     return
  }
  else{
    res.send({redirect:'/',data:'Logged in'})
  }
})

app.post("/ques",async(req,res)=>{

  const ques=await new Question(req.body)
  ques.save()  
  res.send({redirect:'/Replay'})
})