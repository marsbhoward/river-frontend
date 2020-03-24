import React, { Component } from 'react';


let title

class Movie extends Component {

handleOnClick = () => {
    this.setState({
    currentMovie: this.props.movie,
    clicked: true
    },function () {
      this.props.handler(this.state.currentMovie,this.state.clicked)
    })    
    
  }
   




  render() {
    title = this.props.movie.Title 
    if (title){   
      return (
        <img onClick={this.handleOnClick} className= "movie" id={this.props.movie.Title} alt={this.props.movie.Title} src={this.props.movie.Poster}>
        </img>
      
      );
    }
    return (
    ""
    )
  }

};

export default Movie;