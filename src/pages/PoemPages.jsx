import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "../components/poems/List";
import Poem from "../components/poems/Poem";

const PoemPages = () => {
  return (
    <Routes>
        <Route path="list" element={<List/>} />
        <Route path=":id" element={<Poem/>}/>
    </Routes>
  )
};

export default PoemPages;
