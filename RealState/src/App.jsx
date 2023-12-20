import {  Footer,  Dashboard } from "./components/index";
import DesignCard from "./components/DesignCard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DesignDetail from "./components/DesignDetail";
import Cart from "./components/cart";
import BookList from "./components/BookList";
import Header from "./components/Header";
import Home from "./components/Home";
import { DataProvider } from "./contexts/DataContext";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
function App() {
  console.log("App component rendered");
  return (
    <div className="bg-gradient-to-br flex flex-col gap-10 from-gray-100 to-blue-gray-500">
      <AuthProvider>
        <DataProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/designs" element={<DesignCard />}></Route>
              <Route path="/books" element={<BookList />}></Route>
              <Route path="/designs/details" element={<DesignDetail />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/signUpForm" element={<RegistrationForm />}></Route>
              <Route path="/loginForm" element={<LoginForm />}></Route>
              <Route path="/dashboard/*" element={<Dashboard />} >
              </Route>
            </Routes>
            <div className="">
              <Footer />
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}
export default App;
