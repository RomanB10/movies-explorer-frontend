class MainApi {
    constructor(config){
        this._url = config.url;
        /*this._headers = config._headers;*/
    }


//ВОЗВРАЩАЕТ информацию о пользователе с сервера (email и имя)
 // сработает при GET-запросе на URL '/users/me' - получить информацию о текущем пользователе
getUserInfo(){
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`,{
        headers: {
            authorization: `Bearer ${token}`,
        },
    }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
};

//ОБНОВЛЯЕТ информацию о пользователе на сервере (email и имя)
  // сработает при PATCH-запросе на URL '/users/me' - обновляет профиль
  setUserInfo(data) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }





//ЗАГРУЗКА фильмов с сервера
  // сработает при GET-запросе на URL '/movies' - возвращает все фильмы
  getAllMoviesMainApi() {
     const token = localStorage.getItem('jwt')
     return fetch(`${this._url}/movies`, {
       method: "GET",
       headers: {
         authorization: `Bearer ${token}`,
       }
     }).then((res) =>
       res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
     );
   }
 
   //СОЗДАЕТ ФИЛЬМ с переданными в теле полями
   // сработает при POST-запросе на URL '/movies' - добавляет фильм
   addNewMoviesCard(data) {
       console.log('fetch POST фильм', data)
     const token = localStorage.getItem('jwt')
     return fetch(`${this._url}/movies`, {
       method: "POST",
       headers: {
         "Content-type": "application/json",
         authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(data),
     }).then((res) =>
       res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
     );
   }
     //УДАЛЯЕТ СОХРАНЕННЫЙ ФИЛЬМ по id
  removeMoviesCard(idCard) {
      console.log('fetch',idCard)
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/movies/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Установка и снятие лайка (PUT,DELETE) https://localhost:3000/cards/cardId/likes
  changeLikeCardStatus(idCard, isLiked) {
    const token = localStorage.getItem('jwt')
    const addLike = { 
      method: "PUT", 
      headers: {authorization: `Bearer ${token}`}
    };
    const deleteLike = { 
      method: "DELETE", 
      headers: {authorization: `Bearer ${token}`}
    };

    return fetch(
      `${this._url}/cards/${idCard}/likes`,
      isLiked ? deleteLike : addLike
    ).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

}
//Прямо внутри api.js создайте экземпляр класса Api 
//и экспортируйте этот экземпляр вместо самого класса.
const apiMain = new MainApi({
    url: "http://localhost:3005",
    /*url: "https://api.mesto.romanb10.nomoredomains.rocks"*/
   });
   
   export default apiMain;