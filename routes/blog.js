const express = require("express")
const router = express.Router();

//Import Controller
const {createLike,unlikePost} = require("../controllers/LikeController")
const {createComment} = require("../controllers/commentController")
const {createPost,getAllPosts} = require("../controllers/postController")



//Mapping 
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts/get",getAllPosts);
router.post("/likes/like",createLike);
router.post("/likes/unlike",unlikePost);

//export
module.exports=router;