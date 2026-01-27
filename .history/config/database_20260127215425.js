import moongose from "moongose";


export const connectDB = async () => {
    try {
        await moongose.connect(process.env.)
    } catch (error) {
        console.log(error);

    }
}