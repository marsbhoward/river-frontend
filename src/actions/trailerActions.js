const URLa = 'https://www.googleapis.com/youtube/v3/search?part=snippet%20&maxResults=1&order=relevance&q='
const URLb = '%20trailer&key=AIzaSyDJoamFx61luWHpVofetaLKwu_FacN1O18'


//https://www.googleapis.com/youtube/v3/search?part=snippet%20&maxResults=1&order=relevance&q=Blade%20Runner%2020492017%20trailer&key=AIzaSyDJoamFx61luWHpVofetaLKwu_FacN1O18
//'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q=blade%20runner%202045%20official%20trailer&key=[YOUR_API_KEY]'
export function fetchTrailers (movieTitle,movieYear) {
	let URL = `${URLa}${movieTitle}${movieYear}${URLb}`
	return (dispatch) => {
		dispatch({ type: 'LOADING_TRAILER'})
		fetch(`${URL}`).then(response => {
			console.log(response)
      		return response.json()
    	}).then(responseJSON => {
			console.log(responseJSON)
			try{
      		dispatch({ type: 'LOAD_TRAILER', trailer: responseJSON.items[0].id.videoId})
			}
			catch(error){
				console.error('Error:', error);
				console.log(responseJSON)
				dispatch({ type: 'LOAD_TRAILER', trailer: 'kJQP7kiw5Fk'})
		  }
    	})
	}
}