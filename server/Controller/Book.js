import Book from "../Model/Book.js"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: "df9r98enp",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

export const addBook=async(req,res)=>{
    try {
        const { name, desc, price } = req.body;
        const files = req.files;
        // console.log(files);
        // console.log(req.body);
        const file = files["file"][0];
    
        let imageFileResult;

            //upload image file to cloudinary
    imageFileResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          {
            timeout: 60000,
            folder: "gallerys",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(new Error("faild to upload image"));
            } else {
              //upload was successfull, resolve the promise with the result
              resolve(result);
            //   console.log("image i wanted",imageFileResult);
            }
          }
        );
      });
      // console.log("Image uploaded successfully:", imageFileResult);
      // Now you can use `imageFileResult` to construct the secure URL or perform other operations.
  
      // Construct the secure URL using the public_id from the result
    //   const publicId = imageFileResult.public_id;
    //   const secureURL = cloudinary.url(publicId, { secure: true });
        // save image URLs to the database
    const image = await Book.create({
        file: {
          public_id: imageFileResult.public_id,
          secure_url: imageFileResult.secure_url,
        },
        name: name,
        desc: desc,
        price: price,
      });
      //delete the uploaded local files
      fs.unlink(file.path, (error) => {
        if (error) {
          // console.error("faild to delete files file:", error);
        }
      });
  
      res.status(201).json({ message: "file uploaded successfully" });
            // console.log("request is", req.body);
            
        //     const book=await Book.create(req.body);
        //     return res.status(200).json(book);
        } catch (error) {
            // console.log(error.message);
            return res.status(404).json({message: error.message})
        }
}
export const getBook=async(req, res)=>{

try {
    // console.log("conesdkfjg");
    const book=await Book.find();
    if(book){
        // console.log(book);
        res.json({success: true, book})
    }else{
        // console.log("not a book");
    }
} catch (error) {
    // console.log("all wrong");
}

}
export const deleteBook=async(req,res)=>{
console.log("deleteedddd");
try {
  const designId = req.params.id;
  console.log("items to be deleted id", designId);

  // Find the design by ID and delete it
  const deletedDesign = await Book.findByIdAndDelete(designId);

  if (!deletedDesign) {
    // If the design with the given ID is not found
    return res.status(404).json({ error: "Design not found" });
  }

  console.log("Deleted design:", deletedDesign);

  // Send a response back to the client if needed
  res.status(200).json({ message: "Design deleted successfully" });
} catch (error) {
  console.error("Error deleting design", error);
  res.status(500).json({ error: "Internal Server Error" });
}
}
export const editBook=async(req,res)=>{
  console.log("editeddd");
  try {
    const {name, desc, price} = req.body;
    console.log("the name sis",name);
    const bookId = req.params.itemID;
    console.log("the edited id",bookId);

    // Find the design by ID and update its fields
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { name, desc, price },
      { new: true } // This option returns the modified document
    );
  
    if (!updatedBook) {
      // If the design with the given ID is not found
      return res.status(404).json({ error: "Design not found" });
    }
    console.log("Updated design:", updatedBook);
    // Send a response back to the client if needed
    res.status(200).json({ message: "Design updated successfully", updatedBook });
  } catch (error) {
    console.error("Error updating design", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}