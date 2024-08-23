// import model
const Post = require("../models/postModel");
const Like = require("../models/likeModel");
const { deleteModel } = require("mongoose");

//business logic
exports.createLike = async (req, res) => {
    try {
        /**************************** Creating a new Like *****************/
        //fetch data from req body
        const { post, user } = req.body;
        //create a like object
        const like = new Like({
            post, user
        });
        //Save the new comment into the database
        const savedLike = await like.save();

        /******************Post wale collection me iski detail dalo*****************************/
        //Find the post by ID,add the new comment to its 'comment' array
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true })
            .populate("likes") //populate the comments array with the comment documents
            .exec();

        res.json({
            post: updatedPost
        });
    }
    catch (err) {
        return res.status(400).json({
            message: err.message,
            error: "Error while creating comment",
        });
    }
};


exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;
        //find and delete the like collection me se
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });
        //update/delete in the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true })

        res.json({
            post:updatedPost,
        });
    }
    catch (err) {

    }
}