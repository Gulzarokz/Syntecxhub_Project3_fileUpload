import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import profileRouter from "./routes/route.user.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", profileRouter);


const PORT = process.env.PORT || 3000;
connectDB();




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})