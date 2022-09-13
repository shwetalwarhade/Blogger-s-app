// require
const express =require("express");
const bodyParser=require("body-parser");
const _ =require("lodash");
const mongoose=require("mongoose");
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", 'ejs');

// connecting to mongoDB database
mongoose.connect("mongodb://localhost:27017/blogs",{
  useNewUrlParser :true,
  useUnifiedTopology :true
});
// creating Schema
const postsSchema = new mongoose.Schema({
  title:String,
  content:String
});
// crating the model with new collection
const Post = mongoose.model("Post",postsSchema);

// adding routes to applications

 app.get("/",function(req,res){
 Post.find({},function(err,posts){
  res.render("Home",{
    finalPosts:posts,
  });
});
});

  app.get("/about",(req,res)=>{
    res.render("about")
  });

app.get("/compose",(req,res)=>{
  res.render("compose")
});
// body-parser
app.post("/compose",(req,res)=>{

   const post =new Post({
      title: req.body.postTitle,
      content: req.body.postBody,
   });
post.save(function (err) {
  if(!err){
    res.redirect("/");
  }
});
});

app.get("/posts/:postId",function (req,res) {

  const requestdPostId =req.params.postId;

  Post.findOne({
    _id :requestdPostId
  },function(err,post){
    res.render("post",{
      customTitle :post.title,
      customContent: post.content,
    });
  });

});

 app.listen(3000,()=>{
   console.log("this is running on port 3000")
 });
