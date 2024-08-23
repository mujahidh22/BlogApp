// import model
const Post= require("../models/postModel");
const Comment = require("../models/commentModel")

//business logic
exports.createComment = async (req,res)=>{
    try{
        /**************************** Creating a new Comment *****************/
        //fetch data from req body
        const {post,user,body} = req.body;
        //create a comment object
        const comment = new Comment({
            post,user,body
        });
        //Save the new comment into the database
        const savedComment = await comment.save();

        /******************Post wale collection me iski detail dalo*****************************/
        //Find the post by ID,add the new comment to its 'comment' array
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments: savedComment._id}},{new: true})
            .populate("comments") //populate the comments array with the comment documents
            .exec();

        res.json({
            post: updatedPost
        });
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
            error: "Error while creating comment",
        });
    }
};