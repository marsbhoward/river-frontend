import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
  const [count, setCount]= useState([0]);

  useEffect(() => {
      if (typeof location.state !== "undefined"){
        //set clicked
        changeClicked()
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
  
  function changeClicked(){
    setCliked(true)
  }

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

  function getcurrentTitle(movieData){
    dispatch(fetchTitle(movieData))
    //dispatch(fetchTitle(Promise.resolve(location.state).then(location.state.state.currentMovie)))
    //dispatch(fetchTitle(location.state.state.currentMovie))
    setCurrentTitle(movieData.currentTitle)
    localStorage.setItem('selectedMovie', movieData.currentTitle)
  }

  function handleFunctions (e){
    props.pointer(e)
    props.resetCount()
  }

  function handler(){
    changeClicked()
    setCount(0)
  }

  //<MovieList streamID={props.handler} movieCards={props.movieCards} movieIds={props.movieIds} trailerID={props.trailerID} currentStream={props.currentStream}/>
  function handleLoading (){
    if (count< 1 && typeof location.state !== "undefined"){
      console.log(count)
      getTitleData()
      getMoviesArray()
      setCount (count+1)
    }
    
    if(movieData.loading) {
      return <div>Loading Movies...</div>
    } 
    else {
      if (typeof location.state !== "undefined"){
        if (typeof movieData.currentTitle !== "undefined"){
          //getTitleData()
          //getcurrentTitle(movieData.currentTitle)
          return(
          <div className="moviesPage" onClick={handleFunctions}>
            <MovieList handler={handler} movieBackend={location.state.state.currentMovie} passedMovie={JSON.parse(localStorage.selectedMovie)} streamID={localStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={localStorage.currentStreamName}/>                  
          </div>
          )
        }
        else
        getTitleData()
          return(
            <div className="moviesPage" onClick={handleFunctions}>
              <MovieList movieBackend={''} passedMovie={movieData.currentTitle} streamID={localStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={localStorage.currentStreamName}/>                  
            </div>
          )
      }
        else{
          //getMoviesArray()
            return (
              <div className="moviesPage" onClick={handleFunctions}>
                  <MovieList handler={handler} passGetData={getcurrentTitle} streamID={localStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={localStorage.currentStreamName}/>                  
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
    movieCards: state.MoviesReducer.movies,
    movieIds: state.MoviesReducer.ids,
    loading: state.MoviesReducer.loading
  }
}

export default connect(mapDispatchToProps, { fetchMovies,fetchTitle })(MoviesPage)