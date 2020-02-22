import { combineReducers } from "redux";
import streamsReducer from "./streamsReducer"; 
import moviesReducer from "./moviesReducer"

const rootReducer = combineReducers({
  streams: streamsReducer,
  movies: moviesReducer
});

//const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
 
export default rootReducer;