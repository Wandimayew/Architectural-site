import React,{useState, useEffect} from 'react'
import axios from 'axios';
const BookList = () => {
    const [data, setData] = useState([]);
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [itemID, setItemId] = useState("");
    useEffect(() => {
      const getDesignList = async () => {
        try {
          const lists = await axios
            .get(`http://localhost:5000/book/getBooks`)
            .then((res) => {
              console.log(
                "the book list",
                res.data.book
              );
              setData(res.data.book)
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
            console.log("errorre");
            console.log(error);
        }
      };
      getDesignList();
    }, []);
  
    const prepareForEdit = (id, name, desc, price) => {
      setEditable(true);
      console.log("the index is", id);
      setName(name);
      setDesc(desc);
      setPrice(price);
      setItemId(id);
      console.log("edit clicked");
    };
    const handleUpdate = async () => {
      console.log("save clicked");
      console.log("Name:", name);
      console.log("Desc:", desc);
      console.log("Price:", price);
  
      try {
        const updatedBook = await axios.put(
          `http://localhost:5000/book/editBook/${itemID}`,
          { name, desc, price },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Update response:", updatedBook);
      
        setData((prevData) =>
          prevData.map((item) =>
            item._id === itemID
              ? {
                  ...item,
                  name: updatedBook.data.updatedBook.name,
                  desc: updatedBook.data.updatedBook.desc,
                  price: updatedBook.data.updatedBook.price,
                }
              : item
          )
        );
        console.log("the data is the data", updatedBook);
        setEditable(false);
        setName("");
        setDesc("");
        setPrice("");
        setItemId(null);
      } catch (error) {}
    };
    const handleDelete = async (id) => {
      console.log("ids to be deleted", id);
      try {
        const deletedItem = await axios.delete(
          `http://localhost:5000/book/deleteBook/${id}`
        );
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {}
      console.log("delete clicked");
    };
    return (
<div style={{ maxHeight: '550px', overflowY: 'scroll' }}>
  <table className="w-full border-collapse border-2 h-auto" style={{ borderSpacing: '2px' }}>
    <thead className="w-full border-2 h-auto">
      <tr className=''>
        <th className="border-2 w-1/6">Name</th>
        <th className="border-2 w-1/2">Description</th>
        <th className="border-2 w-10">Price</th>
        <th className="border-2 w-1/5">Action</th>
      </tr>
    </thead>
    {editable ? (
      <tbody className="h-auto border-2 top-0 w-full">
        <tr key={itemID} className='border-2'>
          <td className='border-2 border-solid'>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </td>
          <td className='border-2 border-solid'>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </td>
          <td className='border-2 border-solid'>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </td>
          <td className='border-2 border-solid'>
            <div className='flex justify-center'>
              <button
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    ) : (
      <tbody className="gap-4 space-x-2">
        {data.map((item, index) => (
          <tr key={item._id} className='border-2'>
            <td className="items-center px-4 border-2">{item.name}</td>
            <td className='border-2'>{item.desc}</td>
            <td className="items-center px-6 border-2">{item.price}</td>
            <td className='border-2'>
              <div className="w-full">
                <button
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={() =>
                    prepareForEdit(
                      item._id,
                      item.name,
                      item.desc,
                      item.price
                    )
                  }
                >
                  Edit
                </button>{" "}
                <button
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    )}
  </table>
</div>

    
    );
}

export default BookList