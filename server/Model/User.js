import mongoose from "mongoose";

const schema=mongoose.Schema;

const user=new schema({
    firstName:{
        type: String,
        required: false
    },
    lastName:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: false
    },
    role:{
        type: String,
        required: false
    }
})

const users=mongoose.model("User", user);

export default users;