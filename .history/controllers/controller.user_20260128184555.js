import User from "../models/model.user";



export const uploadProfileImage = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error uploading image" });
    }
}