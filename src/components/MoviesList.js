import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movieActions'
import InfoPage from '../containers/InfoPage'
import { useHistory, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch, useStore } from 'react-redux'



function MoviesList (props){
  const location = useLocation();
  const dispatch = useDispatch();
  const [movieDataArray,setMovieDataArray] = useState([]); 
  const history = useHistory();
//binds passed handler to StreamsList handler
  const [streamName, setStreamName] = useState('');
  const [streamId, setStreamId] = useState('');
  const [streamSlug, setStreamSlug] = useState('');
  const [style, setStyle] = useState('');
  const [movieName, setMovieName] =useState('');


  useEffect(() => {
    switch (props.movie.stream_id) {
      case 1:
        // statements_1
        setStreamName('Netflix')
        setStyle('movie-card netflix')
        setStreamSlug('netflix');
        setStreamId(1);
        break;
      case 2:
        // statements_1
        setStreamName("Hulu")
        setStyle("movie-card hulu")
        setStreamId (2);
        setStreamSlug ('hulu');                
        break;
      case 3:
        // statements_1
        setStreamName("Amazon")
        setStyle("movie-card prime")
        setStreamId(3);
        setStreamSlug('amazon');                  
        break;
      case 4:
        // statements_1
        setStreamName("HBO Max")
        setStyle("movie-card hbo")
        setStreamId (4);
        setStreamSlug ('hbo');                  
        break;
      case 5:
        // statements_1
        setStreamName("Disney +")
        setStyle("movie-card disney")
        setStreamId (5);
        setStreamSlug ('disney');                  
        break;
      case 6:
        // statements_1
        setStreamName("Showtime")
        setStyle("movie-card showtime")
        setStreamId (6);
        setStreamSlug ('showtime');                  
        break;
      case 7:
        // statements_1
        setStreamName("Starz")
        setStyle("movie-card starz")
        setStreamId (7);
        setStreamSlug ('starz');                  
        break;
      case 8:
        // statements_1
        setStreamName("Cinimax")
        setStyle("movie-card max")
        setStreamId (8);
        setStreamSlug ('cinimax');                  
        break;
      case 9:
        // statements_1
        setStreamName("DC Universe")
        setStyle("movie-card dc")
        setStreamId (9);
        setStreamSlug ('dc');                  
        break;
      case 10:
        // statements_1
        setStreamName("Apple TV")
        setStyle("movie-card apple")
        setStreamId (10);
        setStreamSlug ('apple');                  
        break;
      case 11:
        // statements_1
        setStreamName("Epix")
        setStyle("movie-card epix")
        setStreamId (11);
        setStreamSlug ('epix');                  
        break;
      case 12:
        // statements_1
        setStreamName("CBS")
        setStyle("movie-card cbs")
        setStreamId (12);
        setStreamSlug ('cbs');                  
        break;
      case 13:
        // statements_1
        setStreamName("TBS")
        setStyle("movie-card tbs")
        setStreamId (13);
        setStreamSlug ('tbs');                  
        break;
      case 14:
        // statements_1
        setStreamName("TNT")
        setStyle("movie-card tnt")
        setStreamId (14);
        setStreamSlug ('tnt');                  
        break;
      case 15:
        // statements_1
        setStreamName("Shudder")
        setStyle("movie-card shudder")
        setStreamId (15);
        setStreamSlug ('shudder');                  
        break;
      case 16:
        // statements_1
        setStreamName("AMC")
        setStyle("movie-card amc")
        setStreamId (16);
        setStreamSlug ('amc');                  
        break;
      case 17:
        // statements_1
        setStreamName("FX")
        setStyle("movie-card fx")
        setStreamId (17);
        setStreamSlug ('fx');                  
        break;
      case 18:
        // statements_1
        setStreamName("SYFY")
        setStyle("movie-card stfy")
        setStreamId (18);
        setStreamSlug ('syfy');                  
        break;
      case 19:
        // statements_1
        setStreamName("IFC")
        setStyle("movie-card ifc")
        setStreamId (19);
        setStreamSlug ('ifc');                          
        break;
      case 20:
        // statements_1
        setStreamName("Peacock")
        setStyle("movie-card peacock")
        setStreamId (20);
        setStreamSlug ('peacock');                  
        break;
      case 21:
        // statements_1
        setStreamName("Paramount +")
        setStyle("movie-card paramount")
        setStreamId (21);
        setStreamSlug ('paramount');                  
        break;        
      default:
        // statements_def
        setStreamName("")
        setStyle("movie-card")          
        break;
      }
      setMovieName(props.movie.id)
    });

  function handleCollection(handleMovie){
    //dispatch(fetchMovies(streamId));
    fetchMovies(streamId);
    handleMovie();
  }

  function handleClick(){
    handleCollection(handleMovie, console.log('finished'));
  }


  function handleMovie() {
//need to set current movie for info page
      console.log(streamSlug)
      
      //localStorage.setItem('currentMovieList', JSON.stringify(props.movie))
      history.push(`/streams/${currentStream.toLowerCase()}/movies`,
        {state: { 
          clicked: true, 
          currentMovie: props.movie
        }}
      )
      window.location.reload() 
      console.log("ok I'm reloaded")
      
      localStorage.setItem('currentStream', streamId);
      localStorage.setItem('currentStreamName', streamSlug);
      localStorage.setItem('currentMovie', props.movie.id)  
    //  window.history.pushState({ 'clicked': true },'',`/streams/${streamName.toLowerCase()}/movies`)
    //  window.location.reload();

  }

  function handleStream() {
    console.log(props)
    history.push({
      pathname: `/streams/${currentStream.toLowerCase()}/movies`,   
    })    
    localStorage.setItem('currentStream', streamId);
    localStorage.setItem('currentStreamName', streamSlug);             
  }  




      const regex = /-/g;
      let unslug = props.movie.slug.replace(regex, ' ')
      let currentStream = streamName
      unslug = unslug.toLowerCase()
      if (unslug.includes(props.search)){
        //onclick route to stream address ex: http://localhost:3000/streams/hbo/movies
        //also render movie as if it was clicked on the movies page


        //movie sends info to movieList and MovieList renders Infopage
        //<InfoPage movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={this.state.movieID} currentMovie={showMovie} trailerID={this.trailerID}/>


      /* alternative
      this.props.history.push({
        pathname: '/',
        state: {
          successMessage: this.generateSuccessMessage(payload)
        }
      });      

       */
        return (
          <div className= {style}>
              
              <img className= "title" onClick= {handleClick} alt= {unslug} src={props.movie.poster}></img>
              
              
            
              <span onClick= {handleStream} className= 'stream-name'> {streamName}</span>
          </div>
        )
      }
      else{
        return(
          ""
        )
      }
    }
 
const mapDispatchToProps = state => {
  return {
    movieCards: state.MoviesReducer.movies,
    loading: state.MoviesReducer.loading
  }
}

export default connect(mapDispatchToProps, {fetchMovies})(MoviesList)