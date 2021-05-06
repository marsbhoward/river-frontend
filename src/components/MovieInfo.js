import React, { Component } from 'react';
import Video from './Video';

class MovieInfo extends Component {

  componentDidMount() {
    this.props.path(this.props.selectedMovie)
  }

   componentDidUpdate(prevProps){

    if (this.props.currentMovie.Title !== prevProps.currentMovie.Title && this.props.selectedMovie === "")
    {
      console.log('different title')
      //this.props.path(this.props.selectedMovie)
    } 
  }

  shouldTrailerLoad = (passedMovie) => {
    if (passedMovie !=null){
      if (this.props.youtube !== null) {
        console.log('youtube id is present on backend')
        return ('https://www.youtube.com/embed/' + this.props.youtube)
      }
      else{
        //trigged incoreectly
        console.log('trailer fetched from youtube')
        return ('https://www.youtube.com/embed/' + this.props.trailer)
      }
      }
    else{
    }
  }

  render() {
  	let currentMovie = this.props.currentMovie
    let videoId 
    let fullSrc = this.shouldTrailerLoad(this.props.selectedMovie)

    //console.log(this.props.selectedMovie )
    //error when selecting from search


    let errorMsg

    if (this.props.trailer === "kJQP7kiw5Fk"){
      errorMsg = "due to an issue with this sites connection to youtube the trailer can not be viewed at this time";
      this.props.handler("default")
      videoId = this.props.trailer
    }
    else{
      this.props.handler(this.props.trailer)
    }

  	const ratings = currentMovie.Ratings.map((rating, index) =>(
  		<li  key={index}>» {rating.Source}: {rating.Value} «</li>  
 	  ));    

    return (
    	<div className = "show_Movie" >
        <img className= "selected_Movie" alt={currentMovie.Title} src={currentMovie.Poster}></img>
          <h4> Rated: {currentMovie.Rated}</h4>   
          <h4> Year: {currentMovie.Year}</h4> 
          <h4> Genre: {currentMovie.Genre} </h4>
          <h5> Actors: {currentMovie.Actors} </h5>
          <h5> Director: {currentMovie.Director} </h5>
          <h5> Awards: {currentMovie.Awards} </h5>
		    <h4> Ratings </h4>
        <ul style={{display: 'inline',margin: 40, listStyle: 'none'}}> {ratings} </ul>
          <h4> Plot</h4>
          <h5>{currentMovie.Plot} </h5>
        <Video fullSrc= {fullSrc} videoID = {videoId}/>
        <p>{errorMsg}</p>        
      </div>
    )
  }
}
export default MovieInfo;

