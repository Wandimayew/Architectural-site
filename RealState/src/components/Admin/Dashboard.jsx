import React from "react";
import { Link, Route, Routes} from "react-router-dom";
import Design from "./Design";
import Books from "./Books";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ApprovedCarts from "./ApprovedCarts";
import CartDetails from "./CartDetails";

const Dashboard = () => {
  const navigate=useNavigate();
  const {logout}=useAuth();
  const handleLogout=()=>{
      logout();
      navigate("/")
      console.log("log out clicked");
  }
  return (
    <div className="w-full bg-blue-gray-700 flex justify-evenly h-screen ">
      <div className="w-1/4    flex h-[550px] py-4 justify-between  border-solid">
        <div className="flex  flex-col w-full px-5 justify-between gap-5 ">
          <Link to="addDesigns">
          <div className="hover:bg-gray-400 hover:rounded-lg bg-gray-200 w-full py-5">
            <h1 className="px-10">Designs</h1>
          </div>
          </Link>
          <Link to="addBooks">
          <div className="hover:bg-gray-400 active:bg-blue-gray-600 hover:rounded-lg bg-gray-200 w-full py-5">
            <h1 className="px-10">Books</h1>
          </div>
          </Link>
          <Link to="approvedCarts">
          <div className="hover:bg-gray-400 hover:rounded-lg bg-gray-200 w-full py-5">
            <h1 className="px-10">Approved Carts</h1>
          </div>
          </Link>

          <div className="hover:bg-gray-400 hover:rounded-lg bg-gray-200 cursor-pointer w-full py-5"
          onClick={handleLogout}
          >
            <h1 className="px-10">logout</h1>
          </div>
        </div>
      </div>
      <div className="w-3/4 border mt-3 mr-5 rounded-lg overflow-y-auto bg-blue-gray-500 border-gray-600">
      <Routes>
      <Route path="addDesigns" element={<Design />} />
      <Route path="addBooks" element={<Books />}></Route>
      <Route path="approvedCarts" element={<ApprovedCarts />}></Route>
      <Route path="cartDetails" element={<CartDetails />}></Route>
      </Routes>
      </div>

    </div>
  );
};

export default Dashboard;