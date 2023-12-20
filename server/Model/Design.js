import mongoose from "mongoose";

const schema=mongoose.Schema;

const design=new schema({
    // user: {
    //     type: schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    //   },
      name: {
        type: String,
        required: true,
      },
      file:{
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
      desc: {
        type: String,
        required: true,
      },
      price:{
        type: Number,
        required: true
      }
})

const designs=mongoose.model("Design", design);

export default designs;