import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Admin from "./routes/Admin";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
