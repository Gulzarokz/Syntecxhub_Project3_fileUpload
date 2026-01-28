

export const uploadProfileImage = async (req, res) => {
    try {

        const

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error uploading image" });
    }
}