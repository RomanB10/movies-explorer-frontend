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
import ShortMoviesFilter from "../ShortMoviesFilter/ShortMoviesFilter";

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

import {
  IMAGE_URL,
  SCREEN_SM,
   SCREEN_MD,
  LOAD_SIZE_LG,
   LOAD_SIZE_MD,
  LOAD_SIZE_SM,
   LOAD_CARD_SIZE_LG,
  LOAD_CARD_SIZE_MD,
   LOAD_CARD_SIZE_SM} from '../../utils/constants';

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
  const [loading, setLoading] = useState(false); // информация о загрузке(идет загрузка или нет)

  const [textRequest, setTextRequest] = useState(""); // текст запроса на странице 'фильмы'
  const [textRequestSavedMovies, setTextRequestSavedMovies] = useState(""); // текст запроса на странице 'сохраненные фильмы'
  const [positionCheckbox, setPositionCheckbox] = useState(false); //Состояние чекбокса
  const [positionCheckboxSavedMovies, setPositionCheckboxSavedMovies] = useState(false); 

  const [currentUser, setCurrentUser] = useState({}); // ПОЛЬЗОВАТЕЛЬ

  const [allMovies, setAllMovies] = useState([]); // ФИЛЬМЫ c beatfilm-movies
  const [savedMovies, setSavedMovies] = useState([]); // // СОХРАНЕННЫЕ ФИЛЬМЫ
  const [moviesList, setMoviesList] = useState([]); // Фильмы для отображения на странице '/movies'
  const [searchedMovies, setSearchedMovies] = useState([]); // НАЙДЕННЫЕ ФИЛЬМЫ через поиск
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]); // НАЙДЕННЫЕ СОХРАНЕННЫЕ ФИЛЬМЫ через поиск

  const [displayMovies, setDisplayMovies] = useState(0)// количество отображаемых карточек с фильмами
  const [elseMovies, setElseMovies] = useState(0)// количество подгружаемых карточек с фильмами

  const [width, setWidth] = useState(window.innerWidth);// текущий размер окна
  const [elseButton,setElseButton] = useState(false);// Стейт кнопки "Еще"
  const [isSaved, setIsSaved] = useState(false); // стейт лайка
  const [searchActive, setSearchActive] = useState(false); // состояние нажатия на поиск

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
        image: IMAGE_URL + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail: IMAGE_URL + data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
      .then((dataFromServer) => {
        const newMovie = dataFromServer;
        setSavedMovies([newMovie, ...savedMovies]); //при сеттере необходимо создавать новый массив, клонируя предыдущий ...spread
        localStorage.setItem("savedMovieIds", JSON.stringify([newMovie, ...savedMovies]));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //УДАЛЕНИЕ СОХР.ФИЛЬМА С ОСНОВНОГО API
  function handleMoviesDelete(movie) {
    apiMain
      .removeMoviesCard(movie._id )
      .then(() => {
        const updatedMoviesList = savedMovies.filter(function (savedMovie) {
          return savedMovie._id !== movie._id;
        });
        //возвращаем массив без удаленной карточки
        setSavedMovies(updatedMoviesList);
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
          localStorage.setItem("savedMovies", JSON.stringify(dataFromServer));
          setSavedMovies(dataFromServer);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);



  useEffect(() => {
    if (localStorage.getItem('searchedResult')) {
      const firstSearch = JSON.parse(localStorage.getItem('searchedResult'));
      const updateSearchResult = ShortMoviesFilter(firstSearch, textRequest, positionCheckbox);
      setSearchedMovies(updateSearchResult);
      console.log('updateSearchResult',updateSearchResult)
    }
  }, [setSearchedMovies])

  //ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ОСНОВНОГО с BeatfilmMoviesApi
  function handleGetAllMovies(textRequest, positionCheckbox) {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000)
    setMoviesList([]);
    setTextRequest(textRequest);
    setPositionCheckbox(positionCheckbox);
    const openingMoviesStorage = JSON.parse(localStorage.getItem("AllMovies"));
    //проверка, фильмы уже загружены или нет
    if (!openingMoviesStorage) {
      setLoading(true);
      apiMovies
        .getAllMovies()
        .then((dataFromServer) => {
          setAllMovies(dataFromServer);
          localStorage.setItem("AllMovies",JSON.stringify(dataFromServer)); /*ЗАПИСЬ В СТРОКУ ПЕРВОЙ ЗАГРУЗКИ ФИЛЬМОВ*/
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

//выполнение поиска по сохраненным фильмам
  function handleSearchSavedMovie(textRequestSavedMovies, positionCheckboxSavedMovies) {
    console.log('positionCheckboxSavedMovies',positionCheckboxSavedMovies)
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
      const searchedSavedMovies = ShortMoviesFilter(savedMovies, textRequestSavedMovies, positionCheckboxSavedMovies);
      
      setTextRequestSavedMovies(textRequestSavedMovies);
      setPositionCheckboxSavedMovies(positionCheckboxSavedMovies)
      setSearchedSavedMovies(searchedSavedMovies);
      setSearchActive(true)
  }

  useEffect(() => {
    if (searchedSavedMovies.length > 0) {
        const searchedResult = ShortMoviesFilter(savedMovies, textRequestSavedMovies, positionCheckboxSavedMovies);
        localStorage.setItem("textRequestSavedMovies", textRequestSavedMovies); //Запись пойска
        localStorage.setItem("positionCheckboxSavedMovies", positionCheckboxSavedMovies);//Запись состояния чекбокса
        setSearchedSavedMovies(searchedResult);
        setSearchActive(false)
    }
    
    return 
}, [savedMovies, textRequestSavedMovies, positionCheckboxSavedMovies]);


// при условии уже загруженных фильмов с Beatfilm
  useEffect(() => {
    if (allMovies.length > 0) {
      const searchedResult = ShortMoviesFilter(allMovies, textRequest, positionCheckbox);
      localStorage.setItem("textRequest", textRequest); //Запись пойска
      localStorage.setItem("positionCheckbox", positionCheckbox); //Запись положения чекбокса
      localStorage.setItem('searchedResult', JSON.stringify(searchedResult));

      setSearchedMovies(searchedResult);
    }
    return ;
  }, [allMovies, textRequest, positionCheckbox]);


  // количество отображаемых фильмов + количество добавляемых 
  useEffect(() => {
    if (width > SCREEN_MD) {
      setDisplayMovies(LOAD_SIZE_LG);
      setElseMovies(LOAD_CARD_SIZE_LG);
    } else if (width >SCREEN_SM) {
      setDisplayMovies(LOAD_SIZE_MD);
      setElseMovies(LOAD_CARD_SIZE_MD);
    } else {
      setDisplayMovies(LOAD_SIZE_SM);
      setElseMovies(LOAD_CARD_SIZE_SM);
    }
    return
  }, [width])

  // при условии уже найденных фильмов по поиску
  useEffect(() => {
    if (searchedMovies.length > 0) {
    if (searchedMovies.length > displayMovies) {
        setMoviesList(searchedMovies.slice(0, displayMovies));
        setElseButton(true);//кнопка 'еще' отрисовывается
      } else {
        setMoviesList(searchedMovies);
      }
    }
      },[searchedMovies,displayMovies]);

    // функция добавления фильмов
    function handleLoadMoreMovies() {
      setDisplayMovies((prev) => prev + elseMovies);
    }

  //отображение карточек при невозможности загрузить больше
  //кнопка 'еще' скрывается
  useEffect(() => {
    if (moviesList.length === searchedMovies.length) {
      setElseButton(false);
    }
  }, [moviesList, searchedMovies]);

  //ЗАПРОС к моему серверу за данными текущего пользователя при каждом рендере
  useEffect(() => {
    if (loggedIn) {
      apiMain
        .getUserInfo()
        .then((dataFromServer) => {
          const refreshUser = dataFromServer;
          setCurrentUser({
            name: refreshUser.name,
            email: refreshUser.email,
            _id: refreshUser._id,
            ...currentUser,
          }); //обновление стейта с данными пользователя
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
        setCurrentUser({
          name: refreshUser.name,
          email: refreshUser.email,
          _id: refreshUser._id,
          ...currentUser,
        }); //обновление/дублирование стэйта актуальными данными с сервера name, email
        history.push(location)
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
          history.push('/movies')
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
    [setLoading, setTooltipStatus, setIsInfoToolTipOpen]
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
    currentPath('');
    setAllMovies([]);
    setSavedMovies([]);
    setMoviesList([]);
    setSearchedSavedMovies([]);
    setSearchedMovies([]);
    history.push('/');
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="app">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <SavedMoviesContext.Provider value={savedMovies}>
            {currentPath === "/" ? (
              <Header width={width}isLoading={loading} loggedIn={loggedIn} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/movies" ? (
              <Header width={width}isLoading={loading}  loggedIn={loggedIn} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/saved-movies" ? (
              <Header width={width}isLoading={loading}  loggedIn={loggedIn} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/signin" ? (
              <Header width={width}isLoading={loading} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/signup" ? (
              <Header width={width} isLoading={loading} currentPath={currentPath} onMenuClick={handleMenuClick} />
            ) : currentPath === "/profile" ? (
              <Header width={width} isLoading={loading} currentPath={currentPath} onMenuClick={handleMenuClick} />
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
                moviesList={moviesList}
                savedMovies={savedMovies}
                onMoviesCardSave={handleMoviesCardSave}
                onMoviesCardDelete={handleMoviesDelete}
                onGetAllMovies={handleGetAllMovies}
                elseButton = {elseButton}
                onHandleLoadMoreMovies ={handleLoadMoreMovies}
              />
              <ProtectedRoute
                path="/saved-movies"
                loggedIn={loggedIn}
                isLoading={loading}
                component={SavedMovies}
                savedMovies={savedMovies}
                searchedSavedMovies ={searchedSavedMovies}
                onMoviesCardDelete={handleMoviesDelete}
                currentPath={currentPath}
                onSearchSavedMovie ={handleSearchSavedMovie}
              />
              <ProtectedRoute
                path="/profile"
                component={Profile}
                loggedIn={loggedIn}
                onLogout={cbLogout}
                onUpdateUser={cbProfile}
                isloading = {loading}
              />
              <Route path="/signin">
              {!loggedIn ?
                <Login handleLogin={cbLogin} isLoggedIn={loggedIn}  isloading = {loading}/>: (<Redirect exact to="/"/>)}
              </Route>
              <Route path="/signup">
              {!loggedIn ?
                <Register onRegister={cbRegister} isLoggedIn={loggedIn} isloading = {loading}/>:(<Redirect exact to="/"/>)}
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
