import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Footer from "./Components/Footers";
import Services from "./Components/Services";
import Signup from "./Components/signup";
import Login from "./Components/login";

function App() {
  const location = useLocation();
  const pathnames = location.pathname;
  console.log(pathnames);
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/service" element={<Services />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
