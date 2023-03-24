function ShortMoviesFilter(movies, textRequest, positionCheckbox) {
  let shortMoviesFilter = movies; // по умолчанию все подгруженные фильмы
  let searchResult;
  //если короткометражка, то фильмы меньше 40 мин
  if (positionCheckbox) {
    shortMoviesFilter = shortMoviesFilter.filter(
      (movie) => movie.duration <= 40
    );
  }

  if (
    textRequest === "" ||
    textRequest === null ||
    textRequest === "undefined"
  ) {
    searchResult = shortMoviesFilter;
  } else {
    //отсеиваем по полю с названием
    searchResult = shortMoviesFilter.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(textRequest.toLowerCase());
    });
  }
  return searchResult;
}

export default ShortMoviesFilter;
