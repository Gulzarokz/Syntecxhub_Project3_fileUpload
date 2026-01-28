import moongose from "moongose";

const fileSchema = new moongose.Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        originalname: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        path: {
            type: String,
            required: true
        },
        uploadAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);


const userSchema = new moongose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

const User = moongose.model("User", userSchema);

export default User;