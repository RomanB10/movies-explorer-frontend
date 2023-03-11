import { createContext } from "react";

export const SavedMoviesContext = createContext([]);

// задали пременную в контексте
export const savedMovies = []
export default SavedMoviesContext;