import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Page from "../components/Page";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <>
        <Layout />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<Page />} />
        </Routes>
    </>
  );
};

export default AppRoutes;