import moongose from "moongose";

const fileSchema = new moongose.Schema({

}, {});


const User = moongose.model("User", userSchema);

export default User;