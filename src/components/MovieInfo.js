import React, { Component } from 'react';
class MovieInfo extends Component {
  render() {
  	let currentMovie = this.props.currentMovie
  	const ratings = currentMovie.Ratings.map((rating, index) =>(
  		<li  key={index}>| {rating.Source}: {rating.Value} |</li>
 	));
 	
  	
    return (
    	 <div className = "show_Movie" >
        <img className= "selected_Movie" alt={currentMovie.Title} src={currentMovie.Poster}></img>
          <h1> {currentMovie.Title} </h1>
          <h4> Rated: {currentMovie.Rated} </h4> 
          <h4> Genre: {currentMovie.Genre} </h4>
          <h5> Actors: {currentMovie.Actors} </h5>
          <h5> Director: {currentMovie.Director} </h5>
          <h5> Awards: {currentMovie.Awards} </h5>
		  <h4> Ratings </h4>
      <ul style={{display: 'inline-flex',margin: 40, listStyle: 'none'}}> {ratings} </ul>
          <h4> Plot</h4>
          <h5>{currentMovie.Plot} </h5>
          
          
        </div>
    )
  }
}
export default MovieInfo;

