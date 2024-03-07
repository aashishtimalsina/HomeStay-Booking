// import React from "react";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Home from "./Components/Home";
// import Contact from "./Components/Contact";
// import About from "./Components/About";
// import Footer from "./Components/Footers";
// import Services from "./Components/Services";
// import Signup from "./Components/signup";
// import Login from "./Components/login";
// import Dashboard from "./Admin dasbord/components/Dashboard/Dashboard";
// import Admin from "./Admin dasbord/index.jsx";
// import Navbardashboard from "./Admin dasbord/components/Sidebar.jsx";

// const App = () => {
//   const location = useLocation();

//   // Check if the current location matches "/admin"
//   const isAdminPage = location.pathname.startsWith("/admin");

//   return (
//     <div>
//       {/* Render Navbar conditionally */}
//       {/* {!isAdminPage && } */}

//       <Routes>
//   {/* public routes */}
//   <Navbar />
//   <Route exact path="/" element={<Home />} />
//   <Route path="/contact" element={<Contact />} />
//   <Route path="/about" element={<About />} />
//   <Route path="/signup" element={<Signup />} />
//   <Route path="/login" element={<Login />} />
//   <Route path="/service" element={<Services />} />

//   {/* private routes  */}

//   <Navbardashboard />
//   <Route path="/admin" element={<Admin />} />
//   <Route path="/admin/dashboard" element={<Dashboard />} />
// </Routes>

//       <Footer />
//     </div>
//   );
// };

// export default App;
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
import Dashboard from "./Admin dasbord/components/Dashboard/Dashboard";
import Admin from "./Admin dasbord/index.jsx";
import BarGraph from "./Admin dasbord/components/reuseable/BarGraph.jsx";
import Host from "./Admin dasbord/Host/Host.jsx";
import AddDetailForm from "./Admin dasbord/Host/Add.jsx";
// import activitesViewmorePage from "./Components/Home/activitiViewmorePage.jsx";

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service" element={<Services />} />
        <Route path="/vewMore/:id" element={<activitesViewmorePage />} />

        {/* private routes  */}
        {isAdminPage && (
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add" element={<BarGraph />} />
            <Route path="host" element={<Host />} />
            <Route path="host/add" element={<AddDetailForm />} />
            {/* <Route path="host/update/:id" element={<HostUpdate />} />
            <Route path="host/delete/:id" element={<Hostdelete />} />
            <Route path="host/detail/:id" element={<Hostdelete />} /> */}
          </Route>
        )}
      </Routes>
      {isAdminPage ? "" : <Footer />}
    </>
  );
};

export default App;
