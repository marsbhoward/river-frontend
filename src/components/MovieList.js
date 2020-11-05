import React from 'react';
import '../index.css';
import Movie from './Movie';
import InfoPage from '../containers/InfoPage'


let showMovie
let moviesList


class MovieList extends React.Component {
  componentDidMount() {
    
   }

//binds passed handler to StreamsList handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this);
    this.state = {clicked: false}

  }

// recieves id from passed handler
  handler = (movie, clicked, movieID) => {
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
    if (this.state.clicked !== true) {   
       moviesList = this.props.movieCards.map((movie, index) => {
        return <Movie key={index} movie={movie} handler={this.handler} movieID={(index+1)}/>
      })
      
      return (
        <div className="movie-list">
            {moviesList}
        </div>
      )
    }
    else
      showMovie = this.state.currentMovie
      
      return(
      <div>
        <br/>
        <InfoPage movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={this.state.movieID} currentMovie={showMovie} trailerID={this.trailerID}/>
        <div className="movie-list">
            {moviesList}
        </div>
      </div>
    )
  }
}

export default (MovieList);