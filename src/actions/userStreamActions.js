const PROXY = "https://cors-anywhere.herokuapp.com/";
const userStreamsAPI = 'https://river-api.herokuapp.com/user/'

export function fetchUserStreams (userID) {
	const streamURL = PROXY + streamsAPI
	return (dispatch) => {
		dispatch({ type: 'LOADING_USERSTREAMS'})
		fetch(`${streamURL}`).then(response => {
      		return response.json()
    	}).then(responseJSON => {
      		dispatch({ type: 'LOAD_USERSTREAMS', userStreams: responseJSON})
    	})
	}
}