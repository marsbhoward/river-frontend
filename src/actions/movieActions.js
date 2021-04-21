const PROXY = "https://cors-anywhere-dd.herokuapp.com/";
const streamsAPI = 'https://river-api.herokuapp.com/streams'
const URL = PROXY + streamsAPI


//	fetch(`http://www.omdbapi.com/?t=${movie}+&apikey=6b46131b`).then(response => {

export function fetchMovies (id) {
    let listOfMovieIds = []
    console.log(id)
    return (dispatch) => {
        dispatch({ type: 'LOADING_MOVIES'})
        fetch(`${streamsAPI}/${id}/movies`).then(response => {
            return response.json()
        }).then(responseJSON => {
            Promise.all(
                responseJSON.map(
                    movie => fetch(`https://www.omdbapi.com/?t=${movie.slug}&y=${movie.year}+&apikey=6b46131b`)
                    .then(resp => {
                        //write movie title to backend
                        return resp.json()
                    })
                )
            ).then(listOfMovies => {
                listOfMovies.map((movie, index) => {
                    let movie_id = responseJSON[index].id
                    let title = movie.Title
                    if(responseJSON[index].title === null){   
                        fetch(`${URL}/${id}/movies/${responseJSON[index].id}?title=${title}`, {
                            method: 'PATCH',
                            headers: { "Content-Type": "application/json" },
                        }).then(response => {
                            listOfMovieIds.push(movie_id)
                        try {
                            dispatch({ type: 'ADD_MOVIES', movies: listOfMovies, ids: listOfMovieIds})
                        }
                        catch(error){
                            console.log(error)
                        }
                    })
                    }
                    else {
                        listOfMovieIds.push(movie_id)
                        try {
                            dispatch({ type: 'ADD_MOVIES', movies: listOfMovies, ids: listOfMovieIds})
                        }
                        catch(error){
                            console.log(error)
                        }
                    }  
                })
            })
        })
    }
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
                                dispatch({ type: 'ADD_MOVIES', movies: [], ids: [], currentTitle: responseJSON})
                            }
                            catch(error){
                                console.log(error)
                            }
                        }
                        else{
                            console.log('didnt have a title')
                            console.log(responseJSON)
                        }
                        })
        }
}