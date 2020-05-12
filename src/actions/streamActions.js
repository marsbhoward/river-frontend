const PROXY = "https://cors-anywhere-dd.herokuapp.com/";
const streamsAPI = 'https://river-api.herokuapp.com/streams'
const URL = PROXY + streamsAPI

export const fetchStreams = () => {
	return (dispatch) => {
		dispatch({ type: 'LOADING_STREAMS'})
		fetch(URL).then(response => {
      		return response.json()
    	}).then(responseJSON => {
      		dispatch({ type: 'ADD_STREAMS', streams: responseJSON})
    	})
	}
}