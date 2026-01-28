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


// Upload or update profile picture
export const uploadProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Delete old picture if exists
        if (user.profilePicture?.path) {
            fs.unlink(user.profilePicture.path, err => {
                if (err) console.log("Old file delete error:", err.message);
            });
        }

        // Save new metadata
        user.profilePicture = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path
        };

        await user.save();
        res.json({ message: "Profile picture uploaded", data: user.profilePicture });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete profile picture
export const deleteProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user || !user.profilePicture) return res.status(404).json({ message: "No profile picture found" });

        fs.unlink(user.profilePicture.path, err => {
            if (err) console.log("File deletion error:", err.message);
        });

        user.profilePicture = undefined;
        await user.save();

        res.json({ message: "Profile picture deleted" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Serve profile picture
export const getProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user || !user.profilePicture) return res.status(404).json({ message: "No profile picture" });

        res.sendFile(path.resolve(user.profilePicture.path));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

