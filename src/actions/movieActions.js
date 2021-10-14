const PROXY = "https://cors-anywhere-dd.herokuapp.com/";
const streamsAPI = 'https://river-api.herokuapp.com/streams'
const URL = PROXY + streamsAPI


//	fetch(`http://www.omdbapi.com/?t=${movie}+&apikey=6b46131b`).then(response => {

export function fetchMovies (id) {
    let listOfMovieIds = []
    let listOfMovies = []
    let listOfMoviesNotFound = []
    let notFoundCount = 0
    return (dispatch) => {
        dispatch({ type: 'LOADING_MOVIES'})
        
        fetch(`${streamsAPI}/${id}/movies`).then(response => {
            return response.json()
        }).then(responseJSON => {
            Promise.all(
            responseJSON.map((movie, index) => {
                    let movie_id = movie.id
                    

                    let title
                    let year = 0
                    let poster = null
                    let newSlug = ''
                    if (movie.poster !== "null" && movie.poster !== "N/A"){
                        poster = movie.poster
                    }
                    if(responseJSON[index].title === 'undefined' || responseJSON[index].poster === null){   
                        /*
                        else if (movie.slug=== ''){
                            movie.slug = ""
                        }
                        */
                        
                        if (newSlug === ''){
                            newSlug = movie.slug 
                        }
                        if (year === 0){
                            year = movie.year
                        } 
                         
                        
                        fetch(`https://www.omdbapi.com/?t=${newSlug}&y=${year}&type=movie+&apikey=6b46131b`).then(response=>{return response.json()}).then(moreInfo =>{
                            //mars fixed year movies cause error when rendered
                            //should be writting fixed year to backend
                            //might be fixed on reset
                            //error also cause when clicking a movie that can not be found on ombdapi
                           
                            title = moreInfo.Title
                            
                            poster = moreInfo.Poster
                            return moreInfo
                        }).then(movieInfo=>{
                            if (movieInfo.Response !== "False"){
                                return movieInfo
                            }
                            else{
                                let newReturn = Promise.resolve(getNewData(movieInfo,movie))
                                
                                return newReturn 
                            }
                            }).then(newmovieInfo=>{
                            year = newmovieInfo.Year
                            
                            title = newmovieInfo.Title
                            
                            poster = newmovieInfo.Poster


                            if (title !== undefined){
                                fetch(`${URL}/${id}/movies/${movie_id}?poster=${poster}&title=${title}&year=${year}&slug=${newSlug}`, {
                                    method: 'PATCH',
                                    headers: { "Content-Type": "application/json" },
                                })
                            }
                            else {

                            }                           
                        })
                    }
                    listOfMovieIds.push(movie_id)
                    if(movie.title!== "undefined" && movie.poster !== "undefined"){
                        listOfMovies.push(movie)
                    }
                    else{
                        listOfMoviesNotFound.push(movie)
                        notFoundCount++
                    }
                    return 'done'
                })
                ).then(response => {
                    if (listOfMoviesNotFound.length>0){
                        console.log('id ' +id)
                        console.log(listOfMoviesNotFound)
                        console.log('count '+ notFoundCount)
                    }
                    try {
                        sessionStorage.setItem ('currentMovieList', JSON.stringify(listOfMovies))
                        sessionStorage.setItem ('listOfMovieIds', JSON.stringify(listOfMovieIds))
                        dispatch({ type: 'ADD_MOVIES', movies: listOfMovies, currentMovieList: listOfMovies,ids: listOfMovieIds})
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
    if (sessionStorage.AllMovies=== 'not loaded'){
        return (dispatch) => {
            dispatch({ type: 'LOADING_MOVIES'})
            fetch(`https://river-api.herokuapp.com/movies`).then(response => {
                return response.json()
            }).then(responseJSON => {
                sessionStorage.setItem ('AllMovies', JSON.stringify(responseJSON))
                dispatch({ type: 'ADD_MOVIES', movies: responseJSON})
            })
        }
    }
    else return(dispatch) =>{
        dispatch({type: 'ADD_MOVIES', movies: JSON.parse(sessionStorage.AllMovies)})
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
                                sessionStorage.setItem('selectedMovie',JSON.stringify(responseJSON))
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