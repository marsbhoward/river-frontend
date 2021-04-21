import React from 'react';
import '../index.css';
import Movie from './Movie';
import InfoPage from '../containers/InfoPage'

let moviesList


class MovieList extends React.Component {
  componentDidMount() {
    if (typeof this.props.passedMovie !== "undefined"){
      //this.setCurrentMovieState()
    }
    else{
      
    }
   }

//binds passed handler to StreamsList handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this);
    this.state = {
      clicked: this.props.isClicked
    }

  }

  setCurrentMovieState = () =>{
    this.setState({
        currentMovie: this.props.passedMovie
    })
    //console.log(this.state.currentMovie)
  }

// recieves id from passed handler
  handler = (movie, clicked, movieID) => {
    localStorage.setItem('currentMovie', this.props.movieIds[(movieID-1)])
    console.log('updated current movie id')
    this.setState({
      currentMovie: movie,
      clicked: true,
      movieID: movieID
    })   
  }

  trailerID = (trailer) => { 
    this.props.trailerID(trailer)
  }

  render() {
    //addition if to make sure passed movie is in
    moviesList = this.props.movieCards.map((movie, index) => {
      return <Movie key={index} movie={movie} handler={this.handler} movieID={(index+1)}/>
    })

    if (this.state.clicked !== true) {   
     return (
       <div className= "NotClicked">
         <br/>
       <div className="movie-list">
           {moviesList}
       </div>
       </div>
     )
   }
    else
      if (typeof this.props.passedMovie !== "undefined"){
        return(
          <div>
            <br/>
            <InfoPage movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={parseInt(localStorage.currentMovie)} currentMovie={this.props.passedMovie} trailerID={this.trailerID}/>
            <div className="movie-list">
                {moviesList}
                <br/>
            </div>
          </div>
        )
      }
      else{
        console.log(this.state.currentMovie)
        return(
          <div>
            <br/>
            <InfoPage movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={parseInt(localStorage.currentMovie)} currentMovie={this.state.currentMovie} trailerID={this.trailerID}/>
            <div className="movie-list">
                {moviesList}
            </div>
          </div>
        )              
      }
   }
  }
export default (MovieList);