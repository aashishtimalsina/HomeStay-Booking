import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";

function App() {
  const location = useLocation();
  const pathnames = location.pathname;
  console.log(pathnames);
  return (
    <>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
