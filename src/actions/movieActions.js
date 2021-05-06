const PROXY = "https://cors-anywhere-dd.herokuapp.com/";
const streamsAPI = 'https://river-api.herokuapp.com/streams'
const URL = PROXY + streamsAPI


//	fetch(`http://www.omdbapi.com/?t=${movie}+&apikey=6b46131b`).then(response => {

export function fetchMovies (id) {
    let listOfMovieIds = []
    console.log('I was ran ' +id)
    return (dispatch) => {
        console.log('test')
        dispatch({ type: 'LOADING_MOVIES'})
        fetch(`${streamsAPI}/${id}/movies`).then(response => {
            return response.json()
        }).then(responseJSON => {
            Promise.all(
            responseJSON.map((movie, index) => {
                    let movie_id = movie.id
                    

                    let title
                    let poster = null
                    if (movie.poster !== "null" && movie.poster !== "N/A"){
                        poster = movie.poster
                    }
                    if(responseJSON[index].title === 'undefined' || responseJSON[index].poster === "null"){   
                        if (movie.slug=== 'skylin3s'){
                            movie.slug = 'skylines'
                        }
                        else if(movie.slug=== 'the-sputnik'){
                            movie.slug = 'Sputnik'
                        }
                        else if(movie.slug=== 'charlies-angels'){
                            movie.slug = "charlie's-angels"
                        }
                        fetch(`https://www.omdbapi.com/?t=${movie.slug}&y=${movie.year}&type=movie+&apikey=6b46131b`).then(response=>{return response.json()}).then(moreInfo =>{
                            title = moreInfo.Title
                            poster = moreInfo.Poster
                            return moreInfo
                        }).then(movieInfo=>{
                            if (movieInfo.Response !== "False"){
                                return movieInfo
                            }
                            else{
                                let newReturn = Promise.resolve(getNewData(movieInfo,movie))
                                //console.log(newReturn)
                                return newReturn 
                            }
                            }).then(newmovieInfo=>{
                            let year = newmovieInfo.Year    
                            title = newmovieInfo.Title
                            poster = newmovieInfo.Poster
                            fetch(`${URL}/${id}/movies/${movie_id}?poster=${poster}&title=${title}&year=${year}&slug=${movie.slug}`, {
                                method: 'PATCH',
                                headers: { "Content-Type": "application/json" },
                            })                            
                        })
                    }
                    listOfMovieIds.push(movie_id)
                })
                ).then(response => {
                    try {
                        localStorage.setItem ('currentMovieList', JSON.stringify(responseJSON))
                        localStorage.setItem ('listOfMovieIds', JSON.stringify(listOfMovieIds))
                        dispatch({ type: 'ADD_MOVIES', movies: responseJSON, currentMovieList: responseJSON,ids: listOfMovieIds})
                    }
                    catch(error){
                        console.log(error)
                    }
                })
            })
        }
}

function returnValue(info,original){
    if (info.Title !== undefined){
        return  info
    }
    else{
        return original
    }
}


async function getNewData(dataResponce,movie){
        let x =Promise.resolve(
            fetch(`https://www.omdbapi.com/?t=${movie.slug}&type=movie+&apikey=6b46131b`).then(response=>{
                return response.json()}).then(passInfo =>{
                    return returnValue(passInfo,dataResponce)
                }))
        return x
}



export function listMovies(){
    return (dispatch) => {
        dispatch({ type: 'LOADING_MOVIES'})
        fetch(`https://river-api.herokuapp.com/movies`).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'ADD_MOVIES', movies: responseJSON})
        })
    }
}

//send specific movie to omdb and retrieve all the data
// for use with movie search
export function fetchTitle (movieInfo){
    return (dispatch) => {
            dispatch({ type: 'LOADING_MOVIES'})
            fetch(`https://www.omdbapi.com/?t=${movieInfo.slug}&y=${movieInfo.year}+&apikey=6b46131b`).then(response => {
                return response.json()
            }).then(responseJSON => {
                            if(responseJSON.Title !== null){ 
                            try {
                                localStorage.setItem('selectedMovie',JSON.stringify(responseJSON))
                                dispatch({ type: 'ADD_MOVIES', movies: [], ids: [], currentTitle: responseJSON})
                            }
                            catch(error){
                                console.log(error)
                            }
                        }
                        else{
                        }
                        })
        }
}