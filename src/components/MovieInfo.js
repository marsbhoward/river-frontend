import React, { Component } from 'react';
class MovieInfo extends Component {

  componentDidMount() {
    console.log(this)
    
  }

  render() {
  	let currentMovie = this.props.currentMovie
    let videoId = this.props.trailer
    let fullsrc = 'https://www.youtube.com/embed/' + videoId
  	const ratings = currentMovie.Ratings.map((rating, index) =>(
  		<li  key={index}>| {rating.Source}: {rating.Value} |</li>
 	));
 	
    return (
    	<div className = "show_Movie" >
        <img className= "selected_Movie" alt={currentMovie.Title} src={currentMovie.Poster}></img>
          <h4> Rated: {currentMovie.Rated} </h4> 
          <h4> Genre: {currentMovie.Genre} </h4>
          <h5> Actors: {currentMovie.Actors} </h5>
          <h5> Director: {currentMovie.Director} </h5>
          <h5> Awards: {currentMovie.Awards} </h5>
		    <h4> Ratings </h4>
        <ul style={{display: 'inline-flex',margin: 40, listStyle: 'none'}}> {ratings} </ul>
          <h4> Plot</h4>
          <h5>{currentMovie.Plot} </h5>
        <iframe title= "youtube" className="player"  
          src={fullsrc}
          frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
      </div>
    )
  }
}
export default MovieInfo;

