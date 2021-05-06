const PROXY = "https://cors-anywhere-dd.herokuapp.com/";
const streamsAPI = 'https://river-api.herokuapp.com/streams'
const URL = PROXY + streamsAPI


//	fetch(`http://www.omdbapi.com/?t=${movie}+&apikey=6b46131b`).then(response => {

export function fetchMovies (id) {
    let listOfMovieIds = []
    return (dispatch) => {
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
                    if(responseJSON[index].title === 'undefined' || responseJSON[index].poster === null){   
                        if (movie.slug=== 'skylin3s'){
                            movie.slug = 'skylines'
                        }
                        else if(movie.slug=== 'the-sputnik'){
                            movie.slug = 'Sputnik'
                        }
                        else if(movie.slug=== 'charlies-angels'){
                            movie.slug = "charlie's-angels"
                        }
                        else if (movie.slug=== 'spy-kids-2-the-island-of-lost-dreams'){
                            movie.slug = "spy-kids-2"
                        }
                        else if (movie.slug=== 'cher-the-loneliest-elephant'){
                            movie.slug = "cher"
                        }
                        else if (movie.slug=== 'lemony-snickets-a-series-of-unfortunate-events'){
                            movie.slug = "a-series-of-unfortunate-events"
                        }
                        else if (movie.slug=== 'shes-out-of-my-league'){
                            movie.slug = "she's-out-of-my-league"
                        }
                        else if (movie.slug=== 'shes-out-of-my-league'){
                            movie.slug = "she's-out-of-my-league"
                        }
                        else if (movie.slug=== 'the-wild-thornberrys-movie'){
                            movie.slug = "the-wild-thornberrys"
                        }
                        else if (movie.slug=== 'jackass-25'){
                            movie.slug = "jackass 2.5"
                        }
                        else if (movie.slug=== 'jackass-35'){
                            movie.slug = "jackass 3.5"
                        }
                        else if (movie.slug=== 'the-wild-thornberrys-movie'){
                            movie.slug = "the-wild-thornberrys"
                        }
                        else if (movie.slug=== 'the-naked-gun-212-the-smell-of-fear'){
                            movie.slug = "the-naked-gun"
                        }
                        else if (movie.slug=== 'police-story-3-supercop'){
                            movie.slug = "supercop"
                        }
                        else if (movie.slug=== 'new-gods-nezha-reborn'){
                            movie.slug = "nezha-reborn"
                        }
                        else if (movie.slug=== 'w-lesie-dzis-nie-zasnie-nikt'){
                            movie.slug = "Nobody-Sleeps-in-the-Woods-Tonight"
                        }
                        else if (movie.slug=== 'strange-dastanas'){
                            movie.slug = "Ajeeb Daastaans"
                        }
                        else if (movie.slug=== 'strange-dastanas'){
                            movie.slug = "Ajeeb Daastaans"
                        }
                        else if (movie.slug=== 'connected'){
                            movie.slug = "The-Mitchells-vs-the-Machines "
                        }
                        
                        
                        
                        
                        fetch(`https://www.omdbapi.com/?t=${movie.slug}&y=${movie.year}&type=movie+&apikey=6b46131b`).then(response=>{return response.json()}).then(moreInfo =>{
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
                            let year = newmovieInfo.Year    
                            title = newmovieInfo.Title
                            poster = newmovieInfo.Poster
                            console.log(title + " written to backend")
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