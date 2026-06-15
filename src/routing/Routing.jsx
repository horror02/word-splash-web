import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
const PoemPages = lazy(() => import("../pages/PoemPages"));
const AdminPage = lazy(() => import("../pages/AdminPage"));

const Routing = () => {
  return (
    <>
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-screen">
                    <Spin size="large" tip="Loading"/>
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/poems/*" element={<PoemPages />} />
                <Route path="/admin/*" element={<AdminPage />}/>
            </Routes>
        </Suspense>
    </>
  )
};

export default Routing;
