import React, { Component } from 'react';


let title

class Movie extends Component {

constructor(props){
  super(props)
  this.state = {movieClass: "movie"}
}  

componentDidMount(){
}

componentDidUpdate() {
window.scrollTo(0, 0);   
}

componentWillUnmount() {
    
}


//refactor to use session storage to grab current movie 
//this will also help search be implemented
  handleOnClick = () => {
    this.setState({
    currentMovie: this.props.movie,
    clicked: true
    },function () {      
    this.props.handler(this.state.currentMovie,this.state.clicked,this.props.movieID);
    this.scrollToTop()
    })    
    
  }


  scrollToTop = () => {
    console.log('to the top')
    window.scrollTo(0, 0);    
  }
 
  mouseEnter = () => {
    this.setState({
        movieClass: "movie highlight"
      })
  }

  mouseExit = () => {
    this.setState({
        movieClass: "movie"
      })
  }    




  render() {
    title = this.props.movie.Title 
    if (title){   
      return (
        <img  onClick={this.handleOnClick} onMouseMove={this.mouseEnter} onMouseLeave={this.mouseExit}  className= {this.state.movieClass} id={this.props.movie.Title} alt={this.props.movie.Title} src={this.props.movie.Poster}>
        </img>
      
      );
    }
    return (
    ""
    )
  }

};

export default Movie;