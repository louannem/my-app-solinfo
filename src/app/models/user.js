import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    lastname: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
       type: String,
       required: [true, "Please provide a password"],
    },
    description: {
        type: String,
        required: false
    },
    session: {
        type: {
            id: String,
            createdAt: Date,
            expiresAt: Date,
        },
        required: false
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;