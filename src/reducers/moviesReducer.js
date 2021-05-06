export const initialState = {
  movies : [],
  ids: [],
  loading: false,
  currentTitle: [],
  currentMovieList: []
};

export const moviesReducer = (state = initialState, action) => {
   switch(action.type) {
    case 'LOADING_MOVIES':
      return {
        ...state,
        movies: [...state.movies],
        currentMovieList: [...state.movies],
        loading: true
      }
    case 'ADD_MOVIES':  
      return {
        ...state,
        movies: action.movies ,
        currentMovieList: action.currentMovieList ,
        ids:  action.ids,
        currentTitle: action.currentTitle,
        loading: false
      }  
      
    default:
      return state;
  }
}
 
export default moviesReducer;