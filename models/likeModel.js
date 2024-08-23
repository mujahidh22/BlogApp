const mongoose = require("mongoose")

//route handler
const likeSchema = new mongoose.Schema({
    post: {  //kis post pr like kr rhe ho
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", //reference to the Post model
    },
    user: {  // kaunsa user kr rha h like
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Like", likeSchema);  