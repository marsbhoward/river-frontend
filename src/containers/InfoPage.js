import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrailers } from '../actions/trailerActions'
import MovieInfo from '../components/MovieInfo';

class InfoPage extends Component { 

  constructor(props){
    super(props)
    this.state = {
      selectedMovie: null,
      youtube: null
    }

  } 
  
  componentDidMount() {
    //pass stream id and movie id in props
    // only works with db complete reset
    let apiMovieID = localStorage.currentMovie 
    console.log('getting youtube id')
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
      let apiMovieID = localStorage.currentMovie 
      adapter.getYoutubeID(this.props.streamID, apiMovieID).then(movie => this.logMovie(movie))
  	}
  }

  logMovie = (selectedMovie) => {
        this.setState({
          selectedMovie: selectedMovie
        })

        //localStorage.setItem('currentMovie',selectedMovie)

      if (selectedMovie === null) {
        console.log('component did not update')
      }
      else{
        if(selectedMovie.youtube_id === null){
          //if youtube_id on api is empty
          //not getting updated trailer here
          console.log('youtube_id null')
          this.fetchTrailer()
          this.setState({youtube: null})
        }
        else {
          this.setState({youtube: "yes"})
        }        
      }
  }


  trailerPath = (passedMovie) =>{

    
    if (this.props.trailer.length > 0 && this.props.trailer !== "kJQP7kiw5Fk" && passedMovie.youtube_id === null){ 
      adapter.updateYoutubeID(passedMovie.stream_id,passedMovie.id,this.props.trailer).then(data => data)
      console.log('trailer updated on backend') 
    }
    else if (this.props.trailer === 'kJQP7kiw5Fk') {
      console.log('error loading video from youtube')
    }
    else {
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
      		<MovieInfo youtube={this.state.youtube} path={this.trailerPath} selectedMovie = {this.state.selectedMovie} currentMovie={this.props.currentMovie} trailer={this.props.trailer} handler={this.handler}/>
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
      return fetch(`https://river-api.herokuapp.com/streams/${stream_id}/movies/${movie_id}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(resp => resp.json())     
    },

    updateYoutubeID: (stream_id, movie_id, youtube_id) => {
      return fetch(`https://river-api.herokuapp.com/streams/${stream_id}/movies/${movie_id}`, {  
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({stream_id, movie_id, youtube_id})
      })
    .then(resp => resp.json())       
    }
  }


export default connect(mapDispatchToProps, {fetchTrailers})(InfoPage)