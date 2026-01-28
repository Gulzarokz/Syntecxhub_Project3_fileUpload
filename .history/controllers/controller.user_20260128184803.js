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

        if ()

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error uploading image" });
    }
}