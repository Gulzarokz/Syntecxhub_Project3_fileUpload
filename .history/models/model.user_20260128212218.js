
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },   // stored file name
    originalname: String,                          // original file name
    mimetype: String,                              // e.g., image/png
    size: Number,                                  // file size in bytes
    path: String,                                  // file path or URL
    uploadedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: fileSchema                     // embedded metadata
});

const User = mongoose.model("User", userSchema);
export default User;
