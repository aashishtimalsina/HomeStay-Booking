import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbardashboard } from "./components";

const HostAdmin = () => {
  return (
    <div className="flex">
      <div>
        <Navbardashboard />
      </div>
      <div className="w-full p-10 ">
        <Outlet />
      </div>
    </div>
  );
};
export default HostAdmin;
