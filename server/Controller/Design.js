import Design from "../Model/Design.js"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: "df9r98enp",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

export const addDesign=async(req,res)=>{
    try {
        const { name, desc, price } = req.body;
        const files = req.files;
        console.log(files);
        console.log(req.body);
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
              console.log("image i wanted",imageFileResult);
            }
          }
        );
      });
    //   console.log("Image uploaded successfully:", imageFileResult);
      // Now you can use `imageFileResult` to construct the secure URL or perform other operations.
  
      // Construct the secure URL using the public_id from the result
    //   const publicId = imageFileResult.public_id;
    //   const secureURL = cloudinary.url(publicId, { secure: true });
        // save image URLs to the database
    const image = await Design.create({
        file: {
          public_id: imageFileResult.public_id,
          secure_url: imageFileResult.secure_url,
        },
        name: name,
        desc: desc,
        price: price,
      });
      console.log("image added is",image);
      //delete the uploaded local files
      fs.unlink(file.path, (error) => {
        if (error) {
          console.error("faild to delete files file:", error);
        }
      });
  
      res.status(201).json({ message: "file uploaded successfully" });
            // console.log("request is", req.body);
            
        //     const book=await Book.create(req.body);
        //     return res.status(200).json(book);
        } catch (error) {
            console.log(error.message);
            return res.status(404).json({message: error.message})
        }
}
export const getDesign=async(req, res)=>{

try {
    console.log("getting");
    const design=await Design.find();
    if(design){
        console.log("the design is",design);
        res.json({success: true, design})
    }else{
        console.log("not a design");
    }
} catch (error) {
    console.log("all wrong");
}
}
export const editDesign = async (req, res) => {
  try {
    const { name, desc, price } = req.body;
    console.log("the name sis", name);
    const designId = req.params.itemID;
    console.log("the edited id", designId);

    // Find the design by ID and update its fields
    const updatedDesign = await Design.findByIdAndUpdate(
      designId,
      { name, desc, price },
      { new: true } // This option returns the modified document
    );

    if (!updatedDesign) {
      // If the design with the given ID is not found
      return res.status(404).json({ error: "Design not found" });
    }

    console.log("Updated design:", updatedDesign);
    // Send a response back to the client if needed
    res.status(200).json({ message: "Design updated successfully", updatedDesign });
  } catch (error) {
    console.error("Error updating design", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDesign= async(req,res)=>{
  console.log("it is deleting");
try {
  const designId = req.params.id;
  console.log("items to be deleted id", designId);

  // Find the design by ID and delete it
  const deletedDesign = await Design.findByIdAndDelete(designId);

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