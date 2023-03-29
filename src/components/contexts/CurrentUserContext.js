import { createContext } from "react";
// создали контекст с объектом{name:"RomanB10", email:"romanB10@yandex.ru"} по умолчанию
export const CurrentUserContext = createContext({
    name: "RomanB10",
    email: "romanB10@yandex.ru",
    id:""
});

// задали пременную в контексте
export const currentUser = {
    name: "RomanB10",
    email: "romanB10@yandex.ru"
}
export default CurrentUserContext;