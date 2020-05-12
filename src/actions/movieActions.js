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
    				title => fetch(`https://www.omdbapi.com/?t=${title}+&apikey=6b46131b`)
    				.then(resp => {
    					return resp.json()
    				})
    			)
    			).then(listOfMovies => {
    			dispatch({ type: 'ADD_MOVIES', movies: listOfMovies})	
    			})
    		
    	})
	}
}



