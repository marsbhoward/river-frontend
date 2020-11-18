export const initialState = {
  movies : [],
  ids: [],
  loading: false,
  currentTitle: []
};

export const moviesReducer = (state = initialState, action) => {
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
        movies: action.movies ,
        ids:  action.ids,
        currentTitle: action.currentTitle,
        loading: false
      }  
      
    default:
      return state;
  }
}
 
export default moviesReducer;