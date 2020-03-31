import React from 'react';
import '../index.css';
import Movie from './Movie';
import InfoPage from '../containers/InfoPage'
import {withRouter} from 'react-router-dom';

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
  handler = (movie, clicked) => {
    this.setState({
      currentMovie: movie,
      clicked: true
    })   
  }

  render() {
    if (this.state.clicked !== true) {   
       moviesList = this.props.movieCards.map((movie, index) => {
        return <Movie key={index} movie={movie} handler={this.handler}/>
      })
      
      return (
        <div className="movie-list">
            {moviesList}
        </div>
      )
    }
    else
      showMovie = this.state.currentMovie
      //moviesList to <MovieInfo currentMovie={this.props.currentMovie} trailer={this.props.trailer} handler={this.handler}/>
      return(
      <div>
        <br/>
        <InfoPage currentMovie={showMovie}/>
        <div className="movie-list">
            {moviesList}
        </div>
      </div>
    )
  }
}

export default withRouter(MovieList);