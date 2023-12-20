import Cart from "../Model/Cart.js";

export const cartAdd = async (req, res) => {
  try {
    const { id, newItem } = req.body;
    //   // Ensure cartData is an array before proceeding
    //   if (!cartData || !Array.isArray(cartData)) {
    //     return res.status(400).json({ error: 'Invalid cart data' });
    //   }
    //   // Use a Set to remove duplicate items based on their names
    //   const uniqueCartData = Array.from(new Set(cartData.map(item => item.name))).map(name => {
    //     // Find the first occurrence of the item with the given name
    //     const matchingItem = cartData.find(item => item.name === name);
    //     console.log(name);
    //     return {
    //       name: matchingItem.name,
    //       image: matchingItem.image,
    //       price: matchingItem.price
    //     };
    //   });
    //   // Here you can store the uniqueCartData in your database or perform any other necessary actions
    //   console.log('Unique Cart Data:', uniqueCartData);
    console.log("Unique Cart Data:", newItem.name);
    const name = newItem.name;
    const image = newItem.image;
    const price = newItem.price;
    const user = id;
    const approval = false;
    const item = new Cart({
      user,
      name,
      image,
      price,
      approval,
    });

    const savedItem = await item.save();

    res.status(201).json(savedItem);
    console.log(savedItem);
    console.log("registered");
    //   res.status(200).json({ message: 'Data stored successfully for user ID ' + id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id of the user", id);
    const cart = await Cart.find({ user: id });

    if (cart.length > 0) {
      console.log("Cart items found:", cart);
      res.status(200).json({ success: true, cart });
    } else {
      console.log("No items found in the cart for the user.");
      res
        .status(404)
        .json({
          success: false,
          message: "No items found in the cart for the user.",
        });
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const removeCart = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received request to remove item with ID:", id);

    // Assuming your Cart model has an _id field for each cart item
    // const removedItem = await Cart.findByIdAndRemove(idToRemove);
    const removedItem = await Cart.findOneAndDelete({ _id: id });

    if (removedItem) {
      res
        .status(200)
        .json({ success: true, message: "Item removed from the cart" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Item not found in the cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const approveCarts = async (req, res) => {
  try {
    const aprovedcart = await Cart.find({ approval: true });

    if (aprovedcart.length > 0) {
      console.log("Cart items found:", aprovedcart);
      res.status(200).json({ success: true, aprovedcart });
    } else {
      console.log("No items found in the cart for the user.");
      res
        .status(404)
        .json({
          success: false,
          message: "No items found in the cart approval for the user.",
        });
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const cartCheckOut = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("User ID:", userId);
    // Log the userId and count of matching documents before the update
    const cartBeforeUpdate = await Cart.find({ userId, approval: false });
    console.log("Before update:", userId, cartBeforeUpdate.length);
    // Update all cart items for the user with 'approved: true'
    const updatedCart = await Cart.updateMany(
      { user: userId, approval: false }, // Assuming you have 'approved' field in your CartItem model
      { $set: { approval: true } }
    );
    console.log("the updated", updatedCart);
    res.status(200).json({ message: "Checkout successful", updatedCart });
    console.log("successfull");
  } catch (error) {
    console.error("Error during checkout", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
