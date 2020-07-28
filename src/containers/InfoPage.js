import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrailers } from '../actions/trailerActions'
import MovieInfo from '../components/MovieInfo';

class InfoPage extends Component { 

  constructor(props){
    super(props)
    this.state = {selectedMovie: ""}

  } 
  
  componentDidMount() {
    //pass stream id and movie id in props
    console.log(this)
    let apiMovieID = this.props.movieID + ((this.props.streamID-1)*41)    
    adapter.getYoutubeID(this.props.streamID, apiMovieID).then(movie => this.logMovie(movie))

    //if current movie does not have a youtube_id on the backend
  	  
    //else
      //get trailer from backend 
      //set this.props.trailer to that youtube_id
      //** if this cant be done set up conditional render. setstate trailer: youtube_id. pass state to MovieInfo instead of trailer prop **
  }

  componentDidUpdate(prevProps){

  	if (this.props.currentMovie.Title !== prevProps.currentMovie.Title)
  	{
      let apiMovieID = this.props.movieID + ((this.props.streamID-1)*41)    
      adapter.getYoutubeID(this.props.streamID, apiMovieID).then(movie => this.logMovie(movie))
  	}
  }

  logMovie = (selectedMovie) => {
        this.setState({
          selectedMovie: selectedMovie
        })
      if(selectedMovie.youtube_id === null){
        //if youtube_id on api is empty
        //not getting updated trailer here
        console.log('youtube_id null')
        this.fetchTrailer()
      }
      else {
        console.log('youtube_id has value and state set')
      }
  }


  trailerPath = (passedMovie) =>{

    if (this.props.trailer.length > 0 && this.props.trailer !== "kJQP7kiw5Fk" && passedMovie !== ""){ 
      adapter.updateYoutubeID(passedMovie.stream_id,passedMovie.id,this.props.trailer).then(data => data)
      console.log('trailer updated on backend') 
    }
    else if (this.props.trailer === 'kJQP7kiw5Fk') {
      console.log('did not update backend')
      console.log('error loading video from youtube')
    }
    else {
      console.log('did not update backend')
      console.log('trailer was loaded from backend')
    }
  }

  fetchTrailer = () => {
  	this.props.fetchTrailers(this.props.currentMovie.Title,this.props.currentMovie.Year)
  }

  handler = (trailer) => {
    //pass to MovieList
    this.props.trailerID(trailer)
  }

  handleLoading = () => {
    if(this.props.loading) 
    {
      return <div>Loading Movies...</div>
    } 
    else {
      return (
      	<div>
      		<MovieInfo path={this.trailerPath} selectedMovie = {this.state.selectedMovie} currentMovie={this.props.currentMovie} trailer={this.props.trailer} handler={this.handler}/>
      	</div>
      )
    }
  }

  render() {
    return (
    <div className= "Info">
    	<div className="banner-3">{this.props.currentMovie.Title.toUpperCase()}</div>
    	{this.handleLoading()}
	</div>
 	);
  }
}

const mapDispatchToProps = state => {
  return {
    trailer: state.TrailersReducer.trailer,
    loading: state.TrailersReducer.loading
  }
}

  const adapter = {
    getYoutubeID: (stream_id, movie_id) => {
      return fetch(`https://cors-anywhere-dd.herokuapp.com/https://river-api.herokuapp.com/streams/${stream_id}/movies/${movie_id}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(resp => resp.json())     
    },

    updateYoutubeID: (stream_id, movie_id, youtube_id) => {
      return fetch(`https://cors-anywhere-dd.herokuapp.com/https://river-api.herokuapp.com/streams/${stream_id}/movies/${movie_id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({stream_id, movie_id, youtube_id})
      })
    .then(resp => resp.json())       
    }
  }


export default connect(mapDispatchToProps, {fetchTrailers})(InfoPage)