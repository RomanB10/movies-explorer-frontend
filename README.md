# Дипломный проект  учебного курса Яндекс.Практикум: " Movies-explorer-frontend "

### Обзор

* Интро
* Функциональность
* Ссылка на сайт
*Ссылка на макет Figma
*Ссылка на репозиторий бэкенда
* Стэк
* Применяемые технологии
* Статус выполнения проекта

**Интро**
* <p align="left"> Клиентская  часть дипломного проекта выполнена  с использованием функциональных компонентов на  «Реакт» <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="20" height="20"/> </a>, представляет собой веб-приложение по поиску фильмов, созданный по макету графического редактора Figma.<a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="20" height="20"/> </a></p> 
* В проекте реализована адаптивная вёрстка  под мобильную и десктопную версию экрана. Формы для ввода данных в проекте имеют моментальную механику валидации и показ ошибок в интерфейсе.
* Сервис позволяет  зарегистрированным  пользователям  искать фильмы  по названию, фильтровать по длительности просмотра , выбирая короткометражки , смотреть трейлеры на сторонних ресурсах, а также добавлять/удалять к себе в «сохранённые фильмы». После регистрации у пользователя имеется возможность редактировать учетные данные (name, email).

**Функциональность**
  - Приложение взаимодействует с двумя API: сторонний сервис с данными всех фильмов [https://api.nomoreparties.co/beatfilm-movies]( https://api.nomoreparties.co/beatfilm-movies) и API, реализованный  мной [https://api.movies-explorer.romb.nomoredomains.rocks](https://api.movies-explorer.romb.nomoredomains.rocks)
  - Реализованы регистрация и авторизация пользователя
  - В приложении  реализованы следующие роуты :\
     -`/` — отображается страница «О проекте»; \
     -`/signin и /signup` — отображаются страницы авторизации и регистрации.\
     -Только для авторизованных пользователей:\
     -`/movies` — отображается страница «Фильмы»;\
     -`/saved-movies` — отображается страница «Сохранённые фильмы»;\
     -`/profile` — отображается страница с профилем пользователя;
     - Реализованы модальные окна, которые информируют пользователя об успешной (или не очень) регистрации 
      - На странице `/profile` можно редактировать данные текущего пользователя, (необходимо заполнить поле «Имя» и «Е-mail»).Если вновь введенные данные отличаются от текущих, то кнопка «Редактировать» становится активной. При успешном выполнении запроса к серверу по смене данных пользователя, появляется модальное окно с уведомлением.
      - На странице `/movies ` имеется возможность производить поиск фильмов по названию, просматривать трейлеры путем клика по постеру фильма , выбирать только короткометражки , оставлять лайки с добавлением фильмов в «сохраненные».
- На странице `/saved-movies ` отображаются фильмы,  добавленные (сохраненные) на основной странице `/movies ` .Имеется возможность удалять фильмы, повторным нажатием на кнопку лайк, а также искать и фильтровать фильмы аналогично страницы `/movies `.
-  Переход по не существующему роуту сопровождается выводом сообщения «404-Страница не найдена»

**Ссылка на сайт**
* [https://movies-explorer.romb.nomoredomains.work](https://movies-explorer.romb.nomoredomains.work)

**Ссылка на макет Figma**
* [https://disk.yandex.ru/d/mFtShmJT1diyAA](https://disk.yandex.ru/d/mFtShmJT1diyAA)

**Ссылка на репозиторий бэкенда**
* [https://github.com/RomanB10/movies-explorer-api](https://github.com/RomanB10/movies-explorer-api)


**Стэк**

*Frontend:*\
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)\
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)\
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)\
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

*Backend:*

![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)\
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) \
<a href="https://www.mongoosejs.com/"><img src="https://github.com/jaumereg/img-logos/blob/master/logos/mongoose.png" width= "128px"></a>

 *Database:*\
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


**Применяемые технологии**
* Grid Layout
* Flex-box верстка
* Позиционирование
* Медиазапросы
* React
* Роуты
* HOC
* Функциональные компоненты
* «React»-хуки

**Статус выполнения проекта**
* Дипломный проект выполнен
