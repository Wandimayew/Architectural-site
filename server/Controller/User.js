import User from  '../Model/User.js'
import jwt from "jsonwebtoken";
import Cart from '../Model/Cart.js';

const JWT_SECRET_KEY = "real_state";

export const addUser = async (req, res) => {
  console.log('Request received at addUser controller');
    try {
      const { email, password } = req.body;
  
      const newUser = new User({
        email,
        password,
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
      console.log("registered");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export const userLogin= async (req, res)=>{
    console.log('Request received at userLogin controller');
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email, password: password });
      console.log("User found:", user);
      if (user) {
        // Generate a JWT token
        const token = jwt.sign(
          { userId: user._id, email: user.email, role: user.role },
          JWT_SECRET_KEY,
          {
            expiresIn: "2m", // Token expiration time (adjust as needed)
          }
        );
        console.log(user);
        res.json({ success: true, token, user: { email: user.email, userId: user._id, role: user.role } });
      } else {
        // If the user is not found, send an error message
        res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
// Modify the getUserById function in your server-side logic
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("User ID:", userId);

    // Fetch user details along with approved cart items
    const user = await User.findById(userId);
    const cartItems = await Cart.find({ user: userId, approval: true });
console.log("cart items",cartItems);
    // Calculate total price for the user
    const totalPrice = cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0);


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user, totalPrice });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

  