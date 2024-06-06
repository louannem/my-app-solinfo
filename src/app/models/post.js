import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        unique: true,
    },
    content: {
        type: String,
        unique: false,
    },
    timestamp: {
        type: Date,
        unique: false,
    },
    likes: {
        type: Number,
    }
})

const Post = mongoose.models.posts || mongoose.model("posts", userSchema);

export default Post;