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
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!req.file) { // ✅ single file
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Delete old profile image if exists
        if (user.profileImage?.path) {
            try { fs.unlinkSync(user.profileImage.path); } catch (err) { console.log(err); }
        }

        // Save uploaded file
        const file = req.file;

        user.profileImage = {
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
            uploadedAt: new Date()
        };

        await user.save();

        res.status(200).json({
            message: "Profile image uploaded successfully",
            profileImage: user.profileImage
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error uploading image" });
    }
};

