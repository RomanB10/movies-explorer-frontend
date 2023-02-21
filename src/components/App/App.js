import { useState, useEffect, useCallback } from "react";
import { Route, Routes, Redirect } from "react-router-dom"; // подключение библиотеки React Router


import "./App.css";
import Header from "../Header";
import Main from "../Main/Main";
import Footer from "../Footer";

import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import PageNotFound from "../PageNotFound";
import Movies from "../Movies/Movies";
/*
// Стэйт, отвечающий за отображение карточек с фильмами
const [cards, setCards] = useState;*/

function App() {
  return (
    <div className="root">
      <div className="page">
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Main/>}/>
          <Route exact path="/movies" element={<Movies/>}/>
          <Route exact path="/signin" element={<Login/>}/>
          <Route exact path="/signup" element={<Register/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="*" element={<PageNotFound/>}/>
        </Routes>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
