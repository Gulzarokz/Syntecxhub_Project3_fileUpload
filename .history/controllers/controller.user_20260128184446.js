


export const uploadProfileImage = async (req, res) => {
    try {



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error uploading image" });
    }
}