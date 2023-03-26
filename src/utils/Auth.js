/*export const BASE_URL = "https://api.movies-explorer.romb.nomoredomains.rocks";*/
export const BASE_URL = "http://localhost:3005";

/*мой API*/

//Метод регистрации
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email , password: password}),
  }).then(checkResponse);
};

//Метод авторизации
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: email , password: password }),
  }).then(checkResponse);
};

//Проверка валидности токена
export const chekToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, //записываем схему аутентификации токен
    },
  }).then(checkResponse);
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};
