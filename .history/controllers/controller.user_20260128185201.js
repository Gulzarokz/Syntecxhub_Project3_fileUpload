import User from "../models/model.user.js";
import fs from "fs";
import path from "path";



export const uploadProfileImage = async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (user.profileImage?.path) {
            try {
                fs.unlink(user.profileImage.path);
                console.log("Old profile image deleted");
            } catch (error) {
                console.log(error);

            }
        }

        user.profileImage = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error uploading image" });
    }
}