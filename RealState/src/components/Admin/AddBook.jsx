import React,{useState} from 'react'
import axios from 'axios';

const AddBook = () => {
    const [file, setFile] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);
    };
    const handleUpload = async (e) => {
      e.preventDefault();
      const formData = new FormData();
  
      formData.append("name", name);
      formData.append("price", price);
      formData.append("desc", desc);
      if (file) {
        formData.append("file", file);
      }
      try {
        await axios
          .post(
            `http://localhost:5000/book/addBooks`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            { timeout: 100000 }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {}
    };
    return (
      <div id="id" className="w-full flex flex-col bg-green-200  h-full">
        <div className="flex justify-center items-center py-5">
          <h1 className="">Add Books to the store</h1>
        </div>
        <div className="flex flex-col gap-10 h-full py-4 items-center justify-between">
          <div className="flex justify-between gap-12 py-3 w-full">
            <div className="flex gap-3 px-3 flex-1">
              <label>Name</label>
              <input
                value={name}
                type="text"
                className="w-full py-2 rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-3 px-3  w-1/4">
              <label>Price</label>
              <input
                value={price}
                type="text"
                className="w-full py-2 rounded-lg"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full px-3 flex flex-col gap-3 h-1/3 justify-between">
            <label>description</label>
            <textarea
              value={desc}
              type="text"
              className="rounded-lg w-full h-full"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex w-full px-3 gap-3 flex-col">
            <label>File</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="mt-1 sm:w-1/2 lg:w-2/5 p-2  border border-solid rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {file && (
              <p className="text-sm mt-2">
                Uploading this image may take approximately{" "}
                {Math.ceil(file && (file.size / 1000000) * 40)} seconds.
                <br />
                Optimize your experience by using smaller file sizes.
              </p>
            )}
          </div>
          <button
         className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
           onClick={handleUpload}>upload</button>
        </div>
      </div>
    );
}

export default AddBook