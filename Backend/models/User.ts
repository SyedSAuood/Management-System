import mongoose from "mongoose";

/**
 *in database schema definition (like in ORMs), using String indicates that the field should hold string-based data, and
 * the ORM will handle mapping this data to the appropriate database type (like VARCHAR or TEXT).
 */
const userschema = new mongoose.Schema({
    UserName : {type : String, require: true},
    Email : {type : String, require : true},
    Role : {type : String , require : true},
    Password :{type : String, require : true},
    ConfirmPassword :{type : String, require : true}

});
const User = mongoose.model("User",userschema);

export default User;