import React from 'react';
import '../index.css';
import Movie from './Movie';
import InfoPage from '../containers/InfoPage'

let moviesList

// mars this page is causing multiple rerenders
class MovieList extends React.Component {

  //binds passed handler to MoviesPage handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this);
    this.state = {
      cssColor: ""
    }
  }

  componentDidMount() {
    if (typeof this.props.passedMovie !== "undefined"){
      console.log(this.props)
      this.setCurrentMovieState()
    }
    this.setState({cssColor: this.props.css('Info',this.props.darkmodeProp)})
   }

  setCurrentMovieState = () =>{
    this.setState({
        currentMovie: this.props.passedMovie,
        clicked: true
    })
    //console.log(this.state.currentMovie)
  }

 

// recieves id from passed handler
  handler = (movie, clicked, movieID) => {
    //sessionStorage.setItem('currentMovie', this.props.movieIds[(movieID-1)])
    console.log('state set')
    this.props.handler()
    sessionStorage.setItem('currentMovie',movie.id)
    sessionStorage.setItem('selectedMovie',JSON.stringify( movie))
    this.setState(prevState=>({
      currentMovie: movie,
      //this.props.isClicked fucntion
      movieID: movieID
    }))   
  }

  trailerID = (trailer) => { 
    this.props.trailerID(trailer)
  }

  render() {
    //addition if to make sure passed movie is in
    if (sessionStorage.currentMovieList !== " "){
      moviesList = JSON.parse(sessionStorage.currentMovieList).map((movie, index) => {
        return <Movie key={index} movie={movie} darkmodeProp = {this.props.darkmodeProp}  passGetData={this.props.passGetData} handler={this.handler} movieID={(index+1)}/>
      })
    }
    else{
      moviesList = this.props.movieCards.map((movie, index) => {
        return <Movie key={index} movie={movie} darkmodeProp = {this.props.darkmodeProp}  passGetData={this.props.passGetData} handler={this.handler} movieID={(index+1)}/>
      })  
    }

    if (this.props.isClicked !== true) {  
     return (
       <div className= "NotClicked">
         <br/>
       <div className="movie-list">
           {moviesList}
       </div>
       </div>
     )
   }
    else if (typeof this.props.passedMovie !== "undefined"){
        return(
          <div className = "WasClicked-undefined">
            <br/>
            <InfoPage darkmodeProp = {this.props.darkmodeProp} css={this.props.css} movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={parseInt(sessionStorage.currentMovie)} currentBackend={this.props.movieBackend} currentMovie={this.props.passedMovie} trailerID={this.trailerID}/>
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
          <div className = "WasClicked">
            <br/>
            <InfoPage darkmodeProp = {this.props.darkmodeProp} css={this.props.css} movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={parseInt(sessionStorage.currentMovie)} currentMovie={JSON.parse(sessionStorage.selectedMovie)} trailerID={this.trailerID}/>
            <div className="movie-list" style={{background:this.props.css("Movies",this.props.darkmodeProp).background}}>
                {moviesList}
            </div>
          </div>
        )              
      }
   }
  }
export default (MovieList);