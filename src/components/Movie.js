import React,{ useState, useEffect } from 'react';
import { useHistory} from "react-router-dom";
import { useSpring, animated } from 'react-spring'


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(0deg) rotateY(0deg) scale(${s})`

function Movie (props) {
  const [prop, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  const history = useHistory();
  const [movieClass, setMovieClass] = useState('movie');


useEffect(() => {
  //window.scrollTo(0, 0); 
})


//refactor to use session storage to grab current movie 
//this will also help search be implemented
function handleOnClick(){
  //follow this path to fix error mars
  props.handler(props.movie,true,props.movieID);
    history.push(`/streams/${sessionStorage.currentStreamName}/movies`,
    {state: { 
      clicked: true, 
      currentMovie: props.movie
    }}
  ) 
    
}

 
function mouseEnter(){
  //setMovieClass ("movie highlight")
}

function mouseExit(){
  //setMovieClass ("movie")
}




  if (props.movie.title){   
      return (
        <animated.div onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })} onMouseLeave={() => set({ xys: [0, 0, 1] })} style={{ transform: prop.xys.interpolate(trans) }}>
          <img  onClick={handleOnClick} onMouseMove={mouseEnter} onMouseLeave={mouseExit}  className= {movieClass} id={props.movie.title} alt={props.movie.slug} src={props.movie.poster}>
          </img>
        </animated.div>          
      
      );
    }
    else{
    return (
    ""
    )}
}

export default Movie;