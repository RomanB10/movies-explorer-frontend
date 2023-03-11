class MoviesApi {
    constructor(config){
        this._url = config.url;
        /*this._headers = config._headers;*/
    }

  //ЗАГРУЗКА фильмов с сервера
  // сработает при GET-запросе на URL '/' - возвращает все фильмы
  getAllMovies() {
    return fetch(`${this._url}/`, {
      method: "GET",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }



}



//Прямо внутри api.js создайте экземпляр класса Api 
//и экспортируйте этот экземпляр вместо самого класса.
const apiMovies = new MoviesApi({
    url: "https://api.nomoreparties.co/beatfilm-movies",
   });
   
   export default apiMovies;