import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./Route/User.js";
import bookRoute from "./Route/Book.cjs";
import designRoute from "./Route/Design.cjs";
import cartRoute from "./Route/Cart.js";

const app = express();
// const corsOptions = {
//   origin: 'http://localhost:5173', // Update with your frontend URL
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/book", bookRoute);
app.use("/design",designRoute);

// app.use("/books", bookRoute);
// app.use("/designs", designRoute);

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

try {
  await mongoose.connect(process.env.URL || "mongodb://localhost:27017/Architecture");
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
