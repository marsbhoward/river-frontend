import React,{ useState, useEffect } from 'react';
import { useHistory} from "react-router-dom";

function Movie (props) {
  const history = useHistory();
  const [movieClass, setMovieClass] = useState('movie');


useEffect(() => {
  //window.scrollTo(0, 0); 
})


//refactor to use session storage to grab current movie 
//this will also help search be implemented
function handleOnClick(){
  sessionStorage.setItem('currentMovie',props.movie.id)
  sessionStorage.setItem('selectedMovie',JSON.stringify( props.movie))
  props.handler(props.movie,true,props.movieID);
  
    history.push(`/streams/${sessionStorage.currentStreamName}/movies`,
    {state: { 
      clicked: true, 
      currentMovie: props.movie
    }}
  ) 
    
}

 
function mouseEnter(){
  setMovieClass ("movie highlight")
}

function mouseExit(){
  setMovieClass ("movie")
}



  if (props.movie.title){   
      return (
        <img  onClick={handleOnClick} onMouseMove={mouseEnter} onMouseLeave={mouseExit}  className= {movieClass} id={props.movie.title} alt={props.movie.slug} src={props.movie.poster}>
        </img>
      
      );
    }
    else{
    return (
    ""
    )}
}

export default Movie;