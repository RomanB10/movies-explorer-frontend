import { Route, Switch, Redirect, useLocation, useHistory } from "react-router-dom"; // подключение библиотеки React Router
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
  /*console.log("pathname:", location.pathname);*/

  // переменные состояние Tooltip
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false); // открыт/закрыт Тултип
  const [tooltipStatus, setTooltipStatus] = useState(""); // статус 'fail'или 'success'

  const [loggedIn, setLoggedIn] = useState(false); // информация о нашей авторизации (авторизован или нет)
  const [loading, setLoading] = useState(true); // информация о загрузке(идет загрузка или нет)
  /*const [userData,setUserData] = useState({});// состояние пользователя name, email*/

  const [textRequest, setTextRequest] = useState('')// ТЕКСТ ЗАПРОСА
  const [allMovies, setAllMovies] = useState([]); // ФИЛЬМЫ c beatfilm-movies
  const [positionCheckbox, setPositionCheckbox] = useState(false); //Состояние чекбокса


  const [currentUser, setCurrentUser] = useState({}); // ПОЛЬЗОВАТЕЛЬ
  
  const [savedMovieIds, setSavedMovieIds] = useState([]);// СОХРАНЕННЫЕ ФИЛЬМЫ ID
  const [savedMovies, setSavedMovies] = useState([]); // // СОХРАНЕННЫЕ ФИЛЬМЫ


   //чекбокс
   const [request, setRequest] = useState('');
   const [checkboxStatus, setCheckboxStatus] = useState(false);


  /*const [isLiked,setIsLiked]= useState(false); // стейт лайка*/
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
      console.log(`cbProfile=`,data)
      try {
        setLoading(true); //состояние загрузки (идет загрузка)
        const user = await apiMain.setUserInfo(data)
        if (!user) {
          throw new Error("Неверные имя или email пользователя");
        }
        setIsInfoToolTipOpen(true); // стейт открытого Тултипа
        setTooltipStatus(`success update`); // установим статус Тултипа
        setCurrentUser({ name:user.name, email:user.email, _id:user._id, ...currentUser });
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
    [setLoading, setTooltipStatus, setIsInfoToolTipOpen,setCurrentUser]
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
        /*closeAllPopups();*/
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //УДАЛЕНИЕ СОХР.ФИЛЬМА С ОСНОВНОГО API
  function handleMoviesCardDelete(idCardMovie) {
    console.log(idCardMovie);
    apiMain
      .removeMoviesCard(idCardMovie)
      .then(() => {
        const updatedMoviesCards = savedMovies.filter(function (item) {
          return item.movieId !== idCardMovie;
        }); //возвращает новый массив без карточки, в которой кликнули по корзине

        const updatedMoviesCardsId = savedMovies.filter(function (item) {
          return item._id !== idCardMovie;
        }); //возвращает новый массив без карточки, в которой кликнули по корзине

        setSavedMovies(updatedMoviesCards); //обновляем стейт карточек локально
        setSavedMovieIds(updatedMoviesCardsId); //обновляем стейт карточек локально
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //ПОЛУЧЕНИЕ ВСЕХ СОХР.ФИЛЬМОВ ОСНОВНОГО API
  function handleGetAllSavedMovies() {
    apiMain
      .getAllMoviesMainApi()
      .then((dataFromServer) => {
        console.log(dataFromServer);
        setSavedMovies([savedMovies, ...dataFromServer]); /// заносим в массив стейта сохраненных фильмов моего апи
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      apiMain.getAllMoviesMainApi()
        .then((dataFromServer) => {
          const findSavedMovies = dataFromServer.filter((m) => m.owner._id === currentUser._id)
          localStorage.setItem("savedMovies", JSON.stringify(findSavedMovies));
          setSavedMovies(findSavedMovies);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])


//ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ОСНОВНОГО с BeatfilmMoviesApi
  function handleGetAllMovies() {
    apiMovies
      .getAllMovies()
      .then((dataFromServer) => {
        setAllMovies(dataFromServer); 
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ОСНОВНОГО с BeatfilmMoviesApi
  useEffect(() => {
    if (loggedIn) {
      apiMovies
        .getAllMovies()
        .then((dataFromServer) => {
          setAllMovies(dataFromServer); // заносим в массив стейта фильмы с BeatfilmMoviesApi
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);






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
          history.push('/signin');
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
  const cbRegister = useCallback(
    async (name, email, password) => {
      try {
        console.log('cbRegister',name, email, password)
        setLoading(true); //состояние загрузки (идет загрузка)
        const data = await Auth.register(name, email, password);
        if (!data) {
          throw new Error("Неверные имя или пароль пользователя");
        }
       /* setLoggedIn(true);*/ //статус-авторизовался
        setIsInfoToolTipOpen(true); // стейт открытого Тултипа
        setTooltipStatus(`success`); // установим статус Тултипа
       /* history.push('/signin')*/
        return data;
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
    },
    []
  );

  //ВЫХОД ИЗ СИСТЕМЫ (обнудение стейт-переменных и хранилища)
  const cbLogout = useCallback(() => {
    setLoggedIn(false); // статус не авторизован
    /*setUserData({});*/
    localStorage.removeItem("jwt");
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
              <Header currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/movies" ? (
              <Header currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/saved-movies" ? (
              <Header currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/signin" ? (
              <Header currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/signup" ? (
              <Header currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/profile" ? (
              <Header currentPath={currentPath} onMenuClick={handleMenuClick} />
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
                isLoading ={loading}
                allMovies={allMovies}
                savedMovies ={savedMovies}
                onMoviesCardSave={handleMoviesCardSave}
                onMoviesCardDelete={handleMoviesCardDelete}
                onGetAllMovies={handleGetAllMovies}
                
              />
              <ProtectedRoute
                path="/saved-movies"
                loggedIn={loggedIn}
                component={SavedMovies}
                savedMovies={savedMovies}
                onMoviesCardDelete={handleMoviesCardDelete}
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



/*





  //ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ (name, email)
  function handleUpdateUser(data) {
    console.log('вызвали запрос apiMain.setUserInfo и передали',data)
    apiMain
      .setUserInfo(data)
      .then((dataFromServer) => {
        const refreshUser = dataFromServer;
        console.log('dataFromServer',dataFromServer)
        setCurrentUser({
          name: refreshUser.name,
          email: refreshUser.email,
          ...currentUser,
        });
        
        //обновление стейта с данными пользователя
        console.log('обновили', currentUser)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  */