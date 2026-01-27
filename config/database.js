import moongose from "mongoose";


export const connectDB = async () => {
    try {
        await moongose.connect(process.env.DB_URL);
        console.log("DB connect successfully");

    } catch (error) {
        console.log(error);

    }
}

export default connectDB;