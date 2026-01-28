import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import profileRouter from "./routes/route.user.js";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();

const uploadsDir = path.join(__dirname, "uploads");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static("upload"))

app.use("/api/v1/users", profileRouter);


const PORT = 3000;
connectDB();




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})