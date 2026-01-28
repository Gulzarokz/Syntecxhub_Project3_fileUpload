import moongose from "moongose";

const userSchema = new moongose.Schema({}, {});


const User = moongose.model("User", userSchema);

export default User;