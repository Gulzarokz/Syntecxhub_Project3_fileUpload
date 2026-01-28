import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users",)


const PORT = process.env.PORT || 3000;
connectDB();




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})