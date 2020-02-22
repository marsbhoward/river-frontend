//import adapter from '../adapter'


function streamsReducer(state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD_STREAM":
      return [...state, action.stream];
 
    case "REMOVE_STREAM":
      idx = state.findIndex(stream => stream.id  === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
 
    default:
      return state;
  }
}
export default streamsReducer