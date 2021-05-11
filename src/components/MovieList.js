import React from 'react';
import '../index.css';
import Movie from './Movie';
import InfoPage from '../containers/InfoPage'

let moviesList


class MovieList extends React.Component {
  componentDidMount() {
    
    if (typeof this.props.passedMovie !== "undefined"){
      this.setCurrentMovieState()
    }
    else{
      
    }
   }

//binds passed handler to MoviesPage handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this);
    this.state = {
      clicked: this.props.isClicked
    }

  }

  setCurrentMovieState = () =>{
    console.log('set new movie state')
    this.setState({
        currentMovie: this.props.passedMovie,
        clicked: true
    })
    //console.log(this.state.currentMovie)
  }

// recieves id from passed handler
  handler = (movie, clicked, movieID) => {
    //localStorage.setItem('currentMovie', this.props.movieIds[(movieID-1)])
    
    this.props.handler()
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
    if (localStorage.currentMovieList !== " "){
      moviesList = JSON.parse(localStorage.currentMovieList).map((movie, index) => {
        return <Movie key={index} movie={movie} passGetData={this.props.passGetData} handler={this.handler} movieID={(index+1)}/>
      })
    }
    else{
      moviesList = this.props.movieCards.map((movie, index) => {
        return <Movie key={index} movie={movie} passGetData={this.props.passGetData} handler={this.handler} movieID={(index+1)}/>
      })  
    }

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
          <div className = "WasClicked">
            <br/>
            <InfoPage movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={parseInt(localStorage.currentMovie)} currentBackend={this.props.movieBackend} currentMovie={this.props.passedMovie} trailerID={this.trailerID}/>
            <div className="movie-list">
                {moviesList}
                <br/>
            </div>
          </div>
        )
      }
      else{
        
        // get omdb movie
        return(
          <div>
            <br/>
            <InfoPage movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={parseInt(localStorage.currentMovie)} currentMovie={JSON.parse(localStorage.selectedMovie)} trailerID={this.trailerID}/>
            <div className="movie-list">
                {moviesList}
            </div>
          </div>
        )              
      }
   }
  }
export default (MovieList);