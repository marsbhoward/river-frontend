const URLa = 'https://www.googleapis.com/youtube/v3/search?part=snippet%20&maxResults=1&order=relevance&q='
const URLb = '%20trailer&key=AIzaSyBRpDAqSeCsDHlTlS7l8YHd2nOFgfTDtWM'

export function fetchTrailers (movieTitle) {
	let URL = `${URLa}${movieTitle}${URLb}`
	return (dispatch) => {
		dispatch({ type: 'LOADING_TRAILER'})
		fetch(`${URL}`).then(response => {
      		return response.json()
    	}).then(responseJSON => {
      		dispatch({ type: 'LOAD_TRAILER', trailer: responseJSON.items[0].id.videoId})
    	})
	}
}