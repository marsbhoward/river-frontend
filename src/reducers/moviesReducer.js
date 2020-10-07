const moviesReducer = (state = { movies: [], ids:[], loading: false }, action) => {
   switch(action.type) {
    case 'LOADING_MOVIES':
      return {
        ...state,
        movies: [...state.movies],
        loading: true
      }
    case 'ADD_MOVIES':
      return {
        ...state,
        movies: action.movies,
        ids:  action.ids,
        loading: false
      }    
      
    default:
      return state;
  }
}
 
export default moviesReducer;