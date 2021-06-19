import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movieActions'
import { fetchTitle } from '../actions/movieActions'
import MovieList from '../components/MovieList'
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory} from "react-router-dom";

const MoviesPage = (props) => { 
  const history = useHistory();
  const movieData = useSelector(state => state.MoviesReducer, []) || []; 
  const dispatch = useDispatch();
  const location = useLocation();
  const [clicked, setCliked] = useState(false);
  const [cssColor, setCssColor] = useState("")
  //const [movieDataArray,setMovieDataArray] = useState([]); 
  //const [currentTitle, setCurrentTitle] = useState([]); 
  const [count, setCount]= useState(0);
  const [pageCount, setPageCount]= useState(0);

  useEffect(() => {
    setCssColor(props.css('Movies',props.darkmodeProp))
      if (sessionStorage.currentStreamName === " "){
        alert("error selecting stream please try again")
        history.push(`/userstreams`
        )
      }


      if (typeof location.state !== "undefined"){
        //set clicked
        changeClicked()
        getTitleData()
        
        
        
       // CurrentMovie(movieData)
        

      }
      else{
        console.log('got array')
        getMoviesArray()
      }       
    }, []);
    //dispatch({type: 'LOADING_MOVIES'})
    //props.fetchMovies(sessionStorage.currentStream)
    //console.log(props)
    //console.log(movieData)
    //console.log(dispatch(fetchMovies(sessionStorage.currentStream)))
  
  function changeClicked(){
    setCliked(true)
  }

  function trailerID(trailer){ 
    //link trailer to backend
  }

  function getMoviesArray(){
    dispatch(fetchMovies(sessionStorage.currentStream));
    //setMovieDataArray(movieData.movies)  
  }
  function getTitleData(){
    dispatch(fetchTitle(location.state.state.currentMovie))
    //dispatch(fetchTitle(Promise.resolve(location.state).then(location.state.state.currentMovie)))
    //dispatch(fetchTitle(location.state.state.currentMovie))
    //setCurrentTitle(movieData.currentTitle)
  }

  function getcurrentTitle(movieData){
    dispatch(fetchTitle(movieData))
    //dispatch(fetchTitle(Promise.resolve(location.state).then(location.state.state.currentMovie)))
    //dispatch(fetchTitle(location.state.state.currentMovie))
    //setCurrentTitle(movieData.currentTitle)
    sessionStorage.setItem('selectedMovie', movieData.currentTitle)
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
      getTitleData()
      getMoviesArray()
      setCount (count+1)
    }
    
    if(movieData.loading) {
      return <div>Loading Movies...</div>
    }
    else{ 
      if (typeof location.state !== "undefined"){
        if (typeof movieData.currentTitle !== "undefined"){
          
          //getTitleData()
          //getcurrentTitle(movieData.currentTitle)
          return(
          <div className="moviesPage" onClick={handleFunctions}>
            <MovieList clickValue={clicked} handler={handler} darkmodeProp = {props.darkmodeProp} css={props.css} movieBackend={location.state.state.currentMovie} passedMovie={JSON.parse(sessionStorage.selectedMovie)} streamID={sessionStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={sessionStorage.currentStreamName}/>                  
          </div>
          )
        }
        else{
        //getTitleData()
        
          return(
            <div className="moviesPage" onClick={handleFunctions}>
              <MovieList handler={handler} darkmodeProp = {props.darkmodeProp} css={props.css} movieBackend={''} passedMovie={movieData.currentTitle} streamID={sessionStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={sessionStorage.currentStreamName}/>                  
            </div>
          )
        }
      }
        else{
          
          //getMoviesArray()
            return (
              <div className="moviesPage" onClick={handleFunctions}>
                  <MovieList handler={handler} darkmodeProp = {props.darkmodeProp} css={props.css} passGetData={getcurrentTitle} streamID={sessionStorage.currentStream} isClicked={clicked} trailerID={trailerID} movieCards={movieData.movies} movieIds={movieData.ids}  currentStream={sessionStorage.currentStreamName}/>                  
              </div>
            )
        }  
      }
  }

  
    return (
      <div style={{background: cssColor.background}}  className="App">
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