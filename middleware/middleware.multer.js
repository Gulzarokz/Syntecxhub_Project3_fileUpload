
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const validExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const validMime = allowedTypes.test(file.mimetype);

    if (validExt && validMime) cb(null, true);
    else cb(new Error("Only image files are allowed!"));
};

// Maximum file size 2MB
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter
});

export default upload;
