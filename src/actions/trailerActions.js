const URLa = 'https://www.googleapis.com/youtube/v3/search?part=snippet%20&maxResults=1&order=relevance&q='
const URLb = '%20trailer&key=AIzaSyDJoamFx61luWHpVofetaLKwu_FacN1O18'

export function fetchTrailers (movieTitle,movieYear) {
	let URL = `${URLa}${movieTitle}${movieYear}${URLb}`
	return (dispatch) => {
		dispatch({ type: 'LOADING_TRAILER'})
		fetch(`${URL}`).then(response => {
      		return response.json()
    	}).then(responseJSON => {
      		dispatch({ type: 'LOAD_TRAILER', trailer: responseJSON.items[0].id.videoId})
    	})
    	.catch((error) => {
  			console.error('Error:', error);
  			dispatch({ type: 'LOAD_TRAILER', trailer: 'kJQP7kiw5Fk'})
		})
	}
}