import React,{ useState, useEffect } from 'react';
//import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movieActions'
import { fetchTitle } from '../actions/movieActions'
import MovieList from '../components/MovieList'
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch, useStore } from 'react-redux'

const MoviesPage = (props) => { 
  const movieData = useSelector(state => state.MoviesReducer, []) || []; 
  const dispatch = useDispatch();
  const location = useLocation();
  const [clicked, setCliked] = useState('');
  const [movieDataArray,setMovieDataArray] = useState([]); 
  const [currentTitle, setCurrentTitle] = useState([]);  

  useEffect(() => {
      if (typeof location.state !== "undefined"){
        console.log(location.state)
        setCliked(true)
        getTitleData()
       
        
        
       // CurrentMovie(movieData)
        

      }
      else{
        getMoviesArray()
      }       
    }, []);
    //dispatch({type: 'LOADING_MOVIES'})
    //props.fetchMovies(localStorage.currentStream)
    //console.log(props)
    //console.log(movieData)
    //console.log(dispatch(fetchMovies(localStorage.currentStream)))
  

  function trailerID(trailer){ 
    //link trailer to backend
  }

  function getMoviesArray(){
    dispatch(fetchMovies(localStorage.currentStream));
    setMovieDataArray(movieData.movies)  
  }
  function getTitleData(){
    dispatch(fetchTitle(location.state.state.currentMovie))
    //dispatch(fetchTitle(Promise.resolve(location.state).then(location.state.state.currentMovie)))
    //dispatch(fetchTitle(location.state.state.currentMovie))
    setCurrentTitle(movieData.currentTitle)
  }


  function handleFunctions (e){
    props.pointer(e)
    props.resetCount()
  }


  //<MovieList streamID={props.handler} movieCards={props.movieCards} movieIds={props.movieIds} trailerID={props.trailerID} currentStream={props.currentStream}/>
  function handleLoading (){
    
    if(movieData.loading) {
      return <div>Loading Movies...</div>
    } 
    else {
      if (typeof location.state !== "undefined"){
        if (typeof movieData.currentTitle !== "undefined"){
          return(
          <div onClick={handleFunctions}>
            <MovieList passedMovie={movieData.currentTitle} streamID={localStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={localStorage.currentStreamName}/>                  
          </div>
          )
        }
        else
        getTitleData()
          return(
            <div onClick={handleFunctions}>
              <MovieList passedMovie={movieData.currentTitle} streamID={localStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={localStorage.currentStreamName}/>                  
            </div>
          )
      }
        else{
          //getMoviesArray()
            return (
              <div onClick={handleFunctions}>
                  <MovieList streamID={localStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={localStorage.currentStreamName}/>                  
              </div>
            )
        }
      
    }
  }

  
    return (
      <div className="App">
        {handleLoading()}
      </div>
    );
  }





const mapDispatchToProps = state => {
  return {
    movieCards: state.MoviesReducer.movies.sort(),
    movieIds: state.MoviesReducer.ids,
    loading: state.MoviesReducer.loading
  }
}

export default(MoviesPage)