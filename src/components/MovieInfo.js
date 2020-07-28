import React, { Component } from 'react';
import Video from './Video';

class MovieInfo extends Component {

  componentDidMount() {
    this.props.path(this.props.selectedMovie)
    console.log(this)
  }

  render() {
  	let currentMovie = this.props.currentMovie
    let videoId 
    let fullSrc
    if (this.props.selectedMovie !== ""){
      fullSrc = 'https://www.youtube.com/embed/' + this.props.selectedMovie.youtube_id
    }
    else{
      fullSrc = 'https://www.youtube.com/embed/' + this.props.trailer
    }
    let errorMsg

    console.log(this.props.trailer)
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

