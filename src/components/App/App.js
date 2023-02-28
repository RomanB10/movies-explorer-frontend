import { Route, Switch, useLocation } from "react-router-dom"; // подключение библиотеки React Router
import { useEffect, useState } from "react";

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

function App() {
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();

  console.log("pathname:", location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  console.log("currentPath:", currentPath);
  return (
    <div className="root">
      <div className="page">
        {currentPath === "/" ? (
          <Header currentPath={currentPath} />
        ) : currentPath === "/movies" ? (
          <Header currentPath={currentPath} />
        ) : currentPath === "/saved-movies" ? (
          <Header currentPath={currentPath} />
        ) : currentPath === "/signin" ? (
          <Header currentPath={currentPath} />
        ) : currentPath === "/signup" ? (
          <Header currentPath={currentPath} />
        ) : currentPath === "/profile" ? (
          <Header currentPath={currentPath} />
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
      </div>
    </div>
  );
}

export default App;
