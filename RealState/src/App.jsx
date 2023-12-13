import { useEffect, useState } from "react";
import { Navbar,  Footer } from "./components/index";
import DesignCard from "./components/DesignCard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DesignDetail from "./components/DesignDetail";
import Cart from './components/cart'
import Home from "./components/Home";
import Header from "./components/Header";
import { DataProvider } from './contexts/DataContext';
import License from "./components/License";
import AboutUs from "./components/AboutUs";
function App() {
  const [count, setCount] = useState(0);
  console.log('App component rendered');
  return (
    <div className="bg-gray-100">

    <DataProvider>
<Router>
  <Header />
  <div className='flex justify-center'>
      <Navbar />
      </div>
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/designs" element={<DesignCard />} ></Route>
    <Route path="/designs/details" element={<DesignDetail />}></Route>
    <Route path="/cart" element={<Cart />}></Route>
    <Route path="/aboutus" element={<AboutUs />}></Route>
    <Route path="/license" element={<License />}></Route>
  </Routes>
  <div className="mt-24">

  <Footer />
  </div>
</Router>
    </DataProvider>
          
    </div>

    // <Router>
    //   <div className="flex gap-5 flex-col">
    //     <SideBar />
    //     <Routes>
    //       <Route path="/admin/designs" element={<Design />} />
    //       <Route path="/admin/homepage" element={<AdminHome />} />
    //       <Route path="/admin/notification" element={<Notification />} />
    //       <Route path="/admin/books" element={<Books />} />
    //       <Route path="/dashboard" element={<Dashboard />} />
    //       <Route path="/" element={<HomePage />}>
    //         <Route path="designs" element={<DesignCard />}></Route>
    //         <Route path="books" element={<BookList />} ></Route>
    //         <Route path="designs/showmore" element={<DesignDetail />} ></Route>
    //         <Route path="cart" element={<art />}></Route>
    //       </Route>
    //     </Routes>
    //     <Footer />
    //   </div>
    // </Router>
  );
}
export default App;