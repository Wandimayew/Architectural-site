import mongoose from "mongoose";

const schema=mongoose.Schema;

const cart=new schema({
    user: {
        type: schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    book:{
        type: schema.Types.ObjectId,
        required: false,
        ref: "Book"
    },
    design:{
        type: schema.Types.ObjectId,
        required: false,
        ref: "Design"
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    approval:{
        type: Boolean,
        required: false
    }
})

const carts=mongoose.model("Cart", cart);

export default carts;