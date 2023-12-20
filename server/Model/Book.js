import mongoose from "mongoose";

const schema = mongoose.Schema;

const book = new schema({
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
});

const books = mongoose.model("Book", book);

export default books;
