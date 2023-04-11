//jshint esversion:6
const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const md5=require("md5");
const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://0.0.0.0:27017/eshuDB",{useNewUrlParser:true });
const eshuSchema=new mongoose.Schema({
  email:String,
  password:String
});
const User=mongoose.model("User",eshuSchema);

app.get("/",function(req,res) {
  res.render("home");
});
app.get("/register",function(req,res) {
  res.render("register");
});
app.get("/login",function(req,res) {
  res.render("login");
});
app.post("/register",function(req,res){
  const newUser=new User({
email:req.body.username,
password:md5(req.body.password)
});
newUser.save()
.then(function(err){
    if(err){
    res.render("secrets")
    }else{
  res.render("secrets")
};
  });
});
app.post("/login",function (req,res) {
  const username=req.body.username;
  const password=md5(req.body.password);
  User.findOne({email:username})
  .then(function(founduser) {
    if(founduser){
      if(founduser.password===password){
        res.render("secrets");
      }
      else{
      res.render("failure")
      }
    }
  });
});







app.listen(3000,function(){
  console.log("Server had started port 3000");
})
