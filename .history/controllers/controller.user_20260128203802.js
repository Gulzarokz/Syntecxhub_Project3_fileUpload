import User from "../models/model.user.js";
import fs from "fs";
import path from "path";


export const UserProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(403).json({
                success: false,
                message: "Username and email are required"
            })
        }
        // const findUser = await User.findOne({ email });
        // if (!findUser) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "user not found"
        //     })
        // }
        const newUser = User.create({
            username,
            email
        })
        return res.status(200).json({
            success: true,
            message: "User profile created successfully",
            user: newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error fetching user profile" });
    }
}


export const uploadProfileImage = async (req, res) => {
    try {

        const user = await User.findById(req.params);
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

        await user.save();

        res.status(200).json({ message: "Profile image uploaded successfully", profileImage: user.profileImage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error uploading image" });
    }
}