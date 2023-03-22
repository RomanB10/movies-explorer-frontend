function ShortMoviesFilter(movies, textRequest, positionCheckbox){
    let shortMoviesFilter = movies; // по умолчанию все подгруженные фильмы
    console.log('В компонент фильтрации movies=',movies)
    console.log('В компонент фильтрации textRequest=',textRequest)
    console.log('В компонент фильтрации positionCheckbox=',positionCheckbox)
    let searchResult
      //если короткометражка, то фильмы меньше 40 мин
    if (positionCheckbox) {
       shortMoviesFilter = shortMoviesFilter.filter((movie)=> movie.duration <= 40)
    }
    
    //отсеиваем по полю с названием
    searchResult = shortMoviesFilter.filter((movie)=>{
        return movie.nameRU.toLowerCase().includes(textRequest.toLowerCase())
    })
    console.log('В компонент фильтрации итог ПОИСКА=',searchResult)
    return searchResult;
}

export default ShortMoviesFilter;