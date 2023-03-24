function ShortMoviesFilter(movies, textRequest, positionCheckbox){
    let shortMoviesFilter = movies; // по умолчанию все подгруженные фильмы
    console.log('В компонент фильтрации, СПИСОК ФИЛЬМОВ=',movies)
    console.log('В компонент фильтрации, ТЕКСТ ИНПУТА=',textRequest)
    console.log('В компонент фильтрации, ПЕРЕКЛЮЧАТЕЛЬ=',positionCheckbox)
    let searchResult
      //если короткометражка, то фильмы меньше 40 мин
    if (positionCheckbox) {
       shortMoviesFilter = shortMoviesFilter.filter((movie)=> movie.duration <= 40)
    }

    if (textRequest==='' || textRequest=== null || textRequest=== 'undefined') {
      console.log('условие когда textRequest = null')
      searchResult = shortMoviesFilter;
    } else {

    //отсеиваем по полю с названием
    searchResult = shortMoviesFilter.filter((movie)=>{
        return movie.nameRU.toLowerCase().includes(textRequest.toLowerCase())
    })
  }
    

    console.log('В компонент фильтрации, ИТОГ ПОИСКА=',searchResult);
    return searchResult;
}

export default ShortMoviesFilter;