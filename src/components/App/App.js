import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom"; // подключение библиотеки React Router
import { useEffect, useState, useCallback } from "react";
import "../../vendor/fonts/fonts.css";

import "./App.css";
import Header from "../Header";
import Main from "../Main/Main";
import Profile from "../Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import MenuPopup from "../MenuPopup";
import Footer from "../Footer";
import Preloader from "../Movies/Preloader";
import { imageUrl } from "../const-breakpoints";

import Login from "../Login";
import Register from "../Register";
import ProtectedRoute from "../ProtectedRotes/ProtectedRoute"; // импортируем HOC
import PageNotFound from "../PageNotFound";
import InfoTooltip from "../InfoTooltip";

import * as Auth from "../../utils/Auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import SavedMoviesContext from "../contexts/SavedMoviesContext";
import apiMain from "../../utils/MainApi";
import apiMovies from "../../utils/MoviesApi";

function App() {
  const history = useHistory();

  //переменная состояния, отвечающая за видимость меню
  const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);

  const [currentPath, setCurrentPath] = useState(""); // стейт текущего роута
  const location = useLocation(); // возвращаем объект с нужным полем пути

  // переменные состояние Tooltip
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false); // открыт/закрыт Тултип
  const [tooltipStatus, setTooltipStatus] = useState(""); // статус 'fail'или 'success'

  const [loggedIn, setLoggedIn] = useState(false); // информация о нашей авторизации (авторизован или нет)
  const [loading, setLoading] = useState(true); // информация о загрузке(идет загрузка или нет)

  const [textRequest, setTextRequest] = useState(""); // ТЕКСТ ЗАПРОСА
  const [positionCheckbox, setPositionCheckbox] = useState(false); //Состояние чекбокса

  const [currentUser, setCurrentUser] = useState({}); // ПОЛЬЗОВАТЕЛЬ

  const [allMovies, setAllMovies] = useState([]); // ФИЛЬМЫ c beatfilm-movies
  const [savedMovies, setSavedMovies] = useState([]); // // СОХРАНЕННЫЕ ФИЛЬМЫ
  const [savedMovieIds, setSavedMovieIds] = useState([]); // СОХРАНЕННЫЕ ФИЛЬМЫ ID
  /*const [searchedMovies, setSearchedMovies] = useState([]);*/

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // открытие/закрытие меню dropdown
  function handleMenuClick() {
    setMenuPopupOpen(true);
  }
  function closeAllPopups() {
    setMenuPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  //ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ (name, email)
  const cbProfile = useCallback(
    async (data) => {
      /*console.log(`cbProfile=`,data)*/
      try {
        setLoading(true); //состояние загрузки (идет загрузка)
        const user = await apiMain.setUserInfo(data);
        if (!user) {
          throw new Error("Неверные имя или email пользователя");
        }
        setIsInfoToolTipOpen(true); // стейт открытого Тултипа
        setTooltipStatus(`success update`); // установим статус Тултипа
        setCurrentUser({
          name: user.name,
          email: user.email,
          _id: user._id,
          ...currentUser,
        });
        return user;
      } catch (err) {
        setIsInfoToolTipOpen(true); // стейт открытого Тултипа
        setTooltipStatus(`fail`); // установим статус Тултипа
        if (err === 409) {
          console.log("409 - Пользователь с таким email уже существует");
        } else {
          console.log(`Оишибка:${err}`);
        }
      } finally {
        setLoading(false); // состояние загрузки (загрузка завершена)
      }
    },
    [setLoading, setTooltipStatus, setIsInfoToolTipOpen, setCurrentUser]
  );

  // ДОБАВЛЕНИЕ СОХР.ФИЛЬМА В ОСНОВНОЙ API //РАБОТАЕТ
  function handleMoviesCardSave(data) {
    console.log(data);
    apiMain
      .addNewMoviesCard({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: imageUrl + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail: imageUrl + data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
      .then((dataFromServer) => {
        const newMovie = dataFromServer;
        setSavedMovies([newMovie, ...savedMovies]); //при сеттере необходимо создавать новый массив, клонируя предыдущий ...spread
        setSavedMovieIds([newMovie.movieId, ...savedMovieIds]);
        /* setSearchedMovies([newMovie, ...savedMovies])*/
        /* localStorage.setItem("savedMovies", JSON.stringify(savedMovies));*/
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //УДАЛЕНИЕ СОХР.ФИЛЬМА С ОСНОВНОГО API
  function handleMoviesDelete(movies) {
    apiMain
      .removeMoviesCard(movies._id || movies.id)
      .then(() => {
        //вариант для сохраненных фильмов
        const updatedMoviesList = savedMovies.filter(function (savedMovie) {
          return savedMovie._id !== movies._id;
        });

        //возвращаем массив без удаленной карточки
        setSavedMovies(updatedMoviesList);

        //вариант для  фильмов со страницы фильмы
        const updatedMoviesIdList = savedMovieIds.filter(function (
          savedMovieId
        ) {
          return savedMovieId !== movies.id;
        });
        setSavedMovieIds(updatedMoviesIdList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //ПОЛУЧЕНИЕ ВСЕХ СОХР.ФИЛЬМОВ ОСНОВНОГО API
  useEffect(() => {
    if (loggedIn) {
      apiMain
        .getAllMoviesMainApi()
        .then((dataFromServer) => {
          /*localStorage.setItem("savedMovies", JSON.stringify(dataFromServer));*/
          setSavedMovies(dataFromServer);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ОСНОВНОГО с BeatfilmMoviesApi
  function handleGetAllMovies(textRequest, positionCheckbox) {
    /*setLoading(true);*/

    setTextRequest(textRequest);
    setPositionCheckbox(positionCheckbox);
    localStorage.setItem("textRequest", textRequest); //Запись пойска
    localStorage.setItem("positionCheckbox", positionCheckbox); //Запись пойска

    const openingMoviesStorage = JSON.parse(localStorage.getItem("AllMovies"));
    /* const searchedFilms = ShortMoviesFilter(openingMoviesStorage ,textRequest,positionCheckbox);*/

    console.log(`openingMoviesStorage`, openingMoviesStorage);
    //если уже загружали фильмы

    if (!openingMoviesStorage) {
      apiMovies
        .getAllMovies()
        .then((dataFromServer) => {
          setAllMovies(dataFromServer);
          localStorage.setItem(
            "AllMovies",
            JSON.stringify(dataFromServer)
          ); /*ЗАПИСЬ В СТРОКУ ПЕРВОЙ ЗАГРУЗКИ ФИЛЬМОВ*/
        })
        .catch((err) => {
          console.log(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setAllMovies(openingMoviesStorage);
    }
  }
  //ЗАПРОС к моему серверу за данными текущего пользователя при каждом рендере
  useEffect(() => {
    if (loggedIn) {
      apiMain
        .getUserInfo()
        .then((dataFromServer) => {
          const refreshUser = dataFromServer;
          console.log(
            "apiMain.getUserInfo Вернул дату refreshUser",
            refreshUser
          );
          setCurrentUser({
            name: refreshUser.name,
            email: refreshUser.email,
            _id: refreshUser._id,
            ...currentUser,
          }); //обновление стейта с данными пользователя
          console.log("apiMain.getUserInfo CurrentUser", currentUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //ЗАПРОС ПРОВЕРКИ ТОКЕНА
  const tokenCheck = useCallback(async () => {
    try {
      setLoading(true); //состояние загрузки (идет загрузка)
      let jwt = localStorage.getItem("jwt"); // получаем значение по ключю из хранилища
      console.log("jwt", jwt);
      if (!jwt) {
        throw new Error("Токен не обнаружен");
      }
      const user = await Auth.chekToken(jwt);
      if (!user) {
        throw new Error("Недействительный пользователь");
      }
      if (user) {
        setLoggedIn(true); //статус-авторизовался
        const refreshUser = user;
        console.log("чекТОкен вернул бэк", refreshUser);
        setCurrentUser({
          name: refreshUser.name,
          email: refreshUser.email,
          _id: refreshUser._id,
          ...currentUser,
        }); //обновление/дублирование стэйта актуальными данными с сервера name, email
        console.log("чекТОкен currentUser", currentUser);
      }
    } catch (err) {
      if (err === 400) {
        console.log("400 - Токен не передан или передан не в том формате");
      }
      if (err === 401) {
        console.log("401 - Переданный токен некорректен");
      } else {
        console.log(`Оишибка:${err}`);
      }
    } finally {
      setLoading(false); // состояние загрузки (загрузка завершена)
    }
  }, []);

  //ЗАПРОС НА АВТОРИЗАЦИЮ
  const cbLogin = useCallback(
    async (email, password) => {
      try {
        setLoading(true); //состояние загрузки (идет загрузка)
        const data = await Auth.authorize(email, password); // бэкенд вернул token,записали в data
        if (!data) {
          throw new Error("Неверные имя или пароль пользователя");
        }
        if (data.token) {
          localStorage.setItem("jwt", data.token); // сохраняем в ключ 'jwt' значение tokena
          setTooltipStatus(`success`); // установим статус Тултипа
          setLoggedIn(true); //статус-авторизовался
          return data;
        }
        return data;
      } catch (err) {
        setIsInfoToolTipOpen(true); // стейт открытого Тултипа
        setTooltipStatus(`fail`); // установим статус Тултипа
        if (err === 400) {
          console.log("400 - Не передано одно из полей");
        }
        if (err === 401) {
          console.log("401 - Пользователь с email не найден");
        } else {
          console.log(`Оишибка:${err}`);
        }
      } finally {
        setLoading(false); // состояние загрузки (загрузка завершена)
      }
    },
    [setLoading, setLoggedIn, setTooltipStatus, setIsInfoToolTipOpen]
  );

  //ЗАПРОС НА РЕГИСТРАЦИЮ
  const cbRegister = useCallback(async (name, email, password) => {
    try {
      setLoading(true); //состояние загрузки (идет загрузка)
      const data = await Auth.register(name, email, password);
      if (!data) {
        throw new Error("Неверные имя или пароль пользователя");
      }
      setIsInfoToolTipOpen(true); // стейт открытого Тултипа
      setTooltipStatus(`success`); // установим статус Тултипа
      cbLogin(email,password)// сразу авторизуемся,чтобы рендерить 'movies'
    } catch (err) {
      setIsInfoToolTipOpen(true); // стейт открытого Тултипа
      setTooltipStatus(`fail`); // установим статус Тултипа
      if (err === 400) {
        console.log("400 - Неккоректно заполнено одно из полей");
      } else {
        console.log(`Оишибка:${err}`);
      }
    } finally {
      setLoading(false); // состояние загрузки (загрузка завершена)
    }
  }, [setLoading, setTooltipStatus, setIsInfoToolTipOpen]);

  //ВЫХОД ИЗ СИСТЕМЫ (обнудение стейт-переменных и хранилища)
  const cbLogout = useCallback(() => {
    setLoggedIn(false); // статус не авторизован
    localStorage.clear();
    setCurrentUser([]);
    setAllMovies([]);
    setSavedMovieIds([]);
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  if (loading) {
    // на весь компонент App пока идет загрузка рендери это
    return <Preloader />;
  }

  return (
    <div className="app">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <SavedMoviesContext.Provider value={savedMovies}>
            {currentPath === "/" ? (
              <Header width={width}loggedIn={loggedIn} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/movies" ? (
              <Header width={width} loggedIn={loggedIn} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/saved-movies" ? (
              <Header width={width} loggedIn={loggedIn} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/signin" ? (
              <Header width={width} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/signup" ? (
              <Header width={width} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/profile" ? (
              <Header width={width} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : (
              <></>
            )}
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <ProtectedRoute
                path="/movies"
                currentPath={currentPath}
                component={Movies}
                loggedIn={loggedIn}
                isLoading={loading}
                allMovies={allMovies}
                savedMovies={savedMovies}
                onMoviesCardSave={handleMoviesCardSave}
                onMoviesCardDelete={handleMoviesDelete}
                onGetAllMovies={handleGetAllMovies}
              />
              <ProtectedRoute
                path="/saved-movies"
                loggedIn={loggedIn}
                component={SavedMovies}
                savedMovies={savedMovies}
                onMoviesCardDelete={handleMoviesDelete}
                currentPath={currentPath}
              />
              <ProtectedRoute
                path="/profile"
                component={Profile}
                loggedIn={loggedIn}
                onLogout={cbLogout}
                onUpdateUser={cbProfile}
              />
              <Route path="/signin">
                <Login handleLogin={cbLogin} isLoggedIn={loggedIn} />
              </Route>
              <Route path="/signup">
                <Register onRegister={cbRegister} isLoggedIn={loggedIn} />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>

              <Route>
                {!loggedIn ? (
                  <Redirect exact to="/" />
                ) : (
                  <Redirect to="/movies" />
                )}
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
            <MenuPopup
              isMenuPopupOpen={isMenuPopupOpen}
              onClose={closeAllPopups}
              currentPath={currentPath}
              width={width}
              loggedIn={loggedIn}
            />
            <InfoTooltip
              tooltipStatus={tooltipStatus}
              isInfoToolTipOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}
            />
          </SavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
