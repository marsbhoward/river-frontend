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
  const [currentMovie, setCurrentMovie] = useState('');  

  useEffect(() => {
      if (location.state !== undefined){
        dispatch(fetchTitle(location.state.currentMovie))
        setCliked(location.state.clicked)
        CurrentMovie(movieData)

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

  function CurrentMovie(data){
    if (data.currentTitle !== undefined){
      setCurrentMovie(data.currentTitle)
    }
  }

  function handleFunctions(e){
    props.pointer(e)
    props.resetCount()
  }



  //<MovieList streamID={props.handler} movieCards={props.movieCards} movieIds={props.movieIds} trailerID={props.trailerID} currentStream={props.currentStream}/>
  function handleLoading (){
    if(movieData.loading) {
      return <div>Loading Movies...</div>
    } 
    else {
      if (location.state !== undefined){
        if (movieData.currentTitle !== undefined){
          return(
          <div>
            <MovieList passedMovie={movieData.currentTitle} streamID={localStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={localStorage.currentStreamName}/>                  
          </div>
          )
        }
        else
          return(
            <h1>{location.state.currentMovie.slug}</h1>
          )
      }
        else{
            return (
              <div>
                  <MovieList streamID={localStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={localStorage.currentStreamName}/>                  
              </div>
            )
        }
      
    }
  }

  
    return (
      <div className="App" onClick={handleFunctions}>
        
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