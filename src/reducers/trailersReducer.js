const trailersReducer = (state = { trailer: [], loading: false }, action) => {
   switch(action.type) {
    case 'LOADING_TRAILER':
      return {
        ...state,
        trailer: [...state.trailer],
        loading: true
      }
    case 'LOAD_TRAILER':
      return {
        ...state,
        trailer: action.trailer,
        loading: false
      }
    default:
      return state;
  }
}
 
export default trailersReducer;