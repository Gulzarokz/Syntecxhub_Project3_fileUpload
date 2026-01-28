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

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Optional: Delete old files if you want
        if (user.fileUploads && user.fileUploads.length > 0) {
            user.fileUploads.forEach(file => {
                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            });
        }

        // Save all uploaded files
        const uploadedFiles = req.files.map(file => ({
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
            uploadedAt: new Date()
        }));

        // Push files into fileUploads array
        user.fileUploads.push(...uploadedFiles);

        await user.save();

        res.status(200).json({
            message: "Files uploaded successfully",
            fileUploads: user.fileUploads
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error uploading image" });
    }
};

