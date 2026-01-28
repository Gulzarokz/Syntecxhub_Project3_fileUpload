import moongose from "moongose";

const fileSchema = new moongose.Schema(
    {
        filename: {
            type: String,
            required: true,
        },

    },
    { timestamps: true });


const User = moongose.model("User", userSchema);

export default User;