// import model
const Post= require("../models/postModel");
const Comment = require("../models/commentModel")

exports.createPost = async (req,res)=>{
    try{
        /**************************** Creating a new Post *****************/
        //fetch data from req body
        const {title,body}= req.body;
        //create a Post object
        const post=new Post({
            title,body,
        })
        //Save the new comment into the database
        const savedPost = await post.save();


        res.json({
            post:savedPost,
        })
    }
    catch(err){         
        return res.status(400).json({
            message:err.message,
            error: "Error while creating Post",
        });
    }
};


exports.getAllPosts = async (req,res) => {
    try{
        const posts = (await Post.find().populate("likes")).populate("comments").exec();  // sari ki sari post nikal li
        res.json({
            posts,
        })
    }
    catch(err){
        return res.status(400).json({
            message:err.message,
            error: "Error while creating Post",
        });
    }
}