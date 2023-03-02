import { Route, Switch, useLocation } from "react-router-dom"; // подключение библиотеки React Router
import { useEffect, useState } from "react";
import '../../vendor/fonts/fonts.css'

import "./App.css";
import Header from "../Header";
import Main from "../Main/Main";
import Footer from "../Footer";

import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import PageNotFound from "../PageNotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import MenuPopup from "../MenuPopup";

function App() {
//переменная состояния, отвечающая за видимость меню
 const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);

  const [currentPath, setCurrentPath] = useState("");// стейт текущего роута
  const location = useLocation();

  console.log("pathname:", location.pathname);

 function handleMenuClick(){
  setMenuPopupOpen(true);
 }

 function closeMenuPopup(){
  setMenuPopupOpen(false)
 }

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  console.log("currentPath:", currentPath);
  return (
    <div className="app">
      <div className="page">
        {currentPath === "/" ? (
          <Header currentPath={currentPath} onMenuClick={handleMenuClick}/>
        ) : currentPath === "/movies" ? (
          <Header currentPath={currentPath} onMenuClick={handleMenuClick}/>
        ) : currentPath === "/saved-movies" ? (
          <Header currentPath={currentPath} onMenuClick={handleMenuClick}/>
        ) : currentPath === "/signin" ? (
          <Header currentPath={currentPath} onMenuClick={handleMenuClick}/>
        ) : currentPath === "/signup" ? (
          <Header currentPath={currentPath} onMenuClick={handleMenuClick}/>
        ) : currentPath === "/profile" ? (
          <Header currentPath={currentPath} onMenuClick={handleMenuClick}/>
        ) : (
          <></>
        )}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {currentPath === "/" ? (
          <Footer />
        ) : currentPath === "/movies" ? (
          <Footer />
        ) : currentPath === "/saved-movies" ? (
          <Footer />
        ) : (
          <></>
        )}
        <MenuPopup isMenuPopupOpen={isMenuPopupOpen} onClose ={closeMenuPopup} currentPath={currentPath}/>
      </div>
    </div>
  );
}

export default App;
