//import adapter from '../adapter'


export default function streamsReducer(state = {key: "pair"}, action) {
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
};
