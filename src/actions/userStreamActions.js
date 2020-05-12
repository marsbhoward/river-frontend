const PROXY = "https://cors-anywhere-dd.herokuapp.com/";
const userStreamsAPI = 'https://river-api.herokuapp.com/users/'

export const fetchUserStreams = (userID) => {
	const streamURL = `${PROXY}${userStreamsAPI}${userID}/user_streams`
	return (dispatch) => {
		dispatch({ type: 'LOADING_STREAMS'})
		fetch(streamURL).then(response => {
      		return response.json()
    	}).then(responseJSON => {
      		dispatch({ type: 'ADD_STREAMS', streams: responseJSON})
    	})
	}
}