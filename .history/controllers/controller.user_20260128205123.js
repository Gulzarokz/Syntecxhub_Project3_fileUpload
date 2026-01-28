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
        const user = await User.findById(req.params.id); // ✅ pass the string ID
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Optional: Delete old profile image
        if (user.profileImage?.path) {
            try {
                fs.unlinkSync(user.profileImage.path);
                console.log("Old profile image deleted");
            } catch (err) {
                console.log(err);
            }
        }

        // If you want to store **only the first uploaded file** as profileImage:
        const file = req.files[0];

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

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error uploading image" });
    }
};
