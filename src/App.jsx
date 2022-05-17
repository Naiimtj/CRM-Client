import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./paginas/Home";
import NewClient from "./paginas/NewClient";
import EditClient from "./paginas/EditClient";
import SeeClients from "./paginas/SeeClients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="client/new" element={<NewClient />} />
          <Route path="client/edit/:id" element={<EditClient />} />
          <Route path="client/:id" element={<SeeClients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
