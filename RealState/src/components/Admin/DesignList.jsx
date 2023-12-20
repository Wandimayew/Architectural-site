import React, { useEffect, useState } from "react";
import axios from "axios";

const DesignList = () => {
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
          .get(`http://localhost:5000/design/getDesigns`)
          .then((res) => {
            console.log(
              "the book list",
              res.data.design.map((item) => item.name)
            );
            setData(res.data.design);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {}
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
      const updatedDesign = await axios.put(
        `http://localhost:5000/design/editDesigns/${itemID}`,
        { name, desc, price },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update response:", updatedDesign);
      
      setData((prevData) =>
        prevData.map((item) =>
          item._id === itemID
            ? {
                ...item,
                name: updatedDesign.data.updatedDesign.name,
                desc: updatedDesign.data.updatedDesign.desc,
                price: updatedDesign.data.updatedDesign.price,
              }
            : item
        )
      );
      console.log("the data is the data", updatedDesign);
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
        `http://localhost:5000/design/deleteDesigns/${id}`
      );
           // Update the state by filtering out the deleted item
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {}
    console.log("delete clicked");
  };
  return (
    <div style={{ maxHeight: '550px', overflowY: 'scroll' }}>
      <table className="w-full">
        <thead className="w-full h-auto">
          <tr>
            <th className="w-1/6">Name</th>
            <th className="w-1/2">Description</th>
            <th className="w-1/6">Price</th>
            <th className="w-1/6">Action</th>
          </tr>
        </thead>
        {editable ? (
          <tbody className="h-auto top-0 w-full">
            <tr key={itemID}>
              <td>
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </td>
              <td>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </td>
              <td>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </td>
              <td>
                <button onClick={handleUpdate}>save</button>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="gap-4 space-x-2">
            {data.map((item, index) => (
              <tr key={item._id} >
                <td className="items-center px-4">{item.name}</td>
                <td>{item.desc}</td>
                <td className="items-center px-6">{item.price}</td>
                <td>
                  <div className="w-full justify-between items-center px-6">
                    <button
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
                    /
                    <button onClick={() => handleDelete(item._id)}>
                      {" "}
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
};
export default DesignList;
