const PROXY = "https://cors-anywhere-dd.herokuapp.com/";
const streamsAPI = 'https://river-api.herokuapp.com/streams'
const URL = PROXY + streamsAPI


//	fetch(`http://www.omdbapi.com/?t=${movie}+&apikey=6b46131b`).then(response => {

export function fetchMovies (id) {
    return (dispatch) => {
        dispatch({ type: 'LOADING_MOVIES'})
        fetch(`${URL}/${id}/movies`).then(response => {
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
                        let stream_id = id 
                        let movie_id = responseJSON[index].id
                        let title = movie.Title                    
                         fetch(`${URL}/${id}/movies/${responseJSON[index].id}?title=${title}`, {
                            method: 'PATCH',
                            headers: { "Content-Type": "application/json" },
                        }).then(response => {
                            return response.json()
                        }).then(data => data) 
                    })
                    dispatch({ type: 'ADD_MOVIES', movies: listOfMovies})   
                })
            
        })
    }
}


export function listMovies(){
    return (dispatch) => {
        dispatch({ type: 'LOADING_MOVIES'})
        fetch(`${PROXY}https://river-api.herokuapp.com/movies`).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'ADD_MOVIES', movies: responseJSON})
        })
    }
}