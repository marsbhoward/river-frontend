import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrailers } from '../actions/trailerActions'
import MovieInfo from '../components/MovieInfo';

class InfoPage extends Component { 

  constructor(props){
    super(props)
    this.trailerPath = this.trailerPath.bind(this)
    this.state = {
      selectedMovie: JSON.parse(sessionStorage.currentMovieList).find(element => element.id === parseInt(sessionStorage.currentMovie)),
      youtube: null,
      cssColor: ""
    }

  } 
  
  componentDidMount() {
    
    //pass stream id and movie id in props
    // only works with db complete reset
    let apiMovieID = parseInt(sessionStorage.currentMovie )


    //if current movie does not have a youtube_id on the backend
  	  
    //else
      //get trailer from backend 
      //set this.props.trailer to that youtube_id
      //** if this cant be done set up conditional render. setstate trailer: youtube_id. pass state to MovieInfo instead of trailer prop **
  }

  componentDidUpdate(prevProps){
  	if (prevProps!== this.props)
  	{
      
      let apiMovieID = sessionStorage.currentMovie 
      if (prevProps.currentBackend !== this.props.currentBackend){
        console.log(this.props)
        console.log('updated')
        adapter.getYoutubeID(this.props.streamID, apiMovieID).then(movie => {
          this.logMovie(movie)
        })
      }
      
      //if (prevProps.darkmodeProp !== this.props.darkmodeProp){
        this.setState({cssColor: this.props.css('Info',this.props.darkmodeProp)}) 
      //}
  	}
  }

  logMovie = (selectedMovie) => {    
    //mars rerender problem?
      this.setState({
        selectedMovie: selectedMovie
      })
      console.log('STATE SET')
    if(selectedMovie.youtube_id === null){
      //if youtube_id on api is empty
      //not getting updated trailer here
      this.fetchTrailer(selectedMovie.title,selectedMovie.year)
      console.log('got trailer')
    }
    else {
      this.setState({youtube: selectedMovie.youtube_id})
    }        
  }


  trailerPath = (passedMovie) =>{
    let newMovieList = JSON.parse(sessionStorage.currentMovieList)
    console.log(this)
    //mars passed movie is coming back null on occation
    if (passedMovie){
      if (this.props.trailer !== "kJQP7kiw5Fk" && passedMovie.youtube_id === null){ 
        adapter.updateYoutubeID(passedMovie.stream_id,passedMovie.id,this.props.trailer).then(data => {
          console.log(data)
        })
        passedMovie.youtube_id = this.props.trailer
        sessionStorage.setItem('currentMovieList',JSON.stringify(newMovieList)) 
        console.log('trailer updated on backend') 
      }
      else if (this.props.trailer === 'kJQP7kiw5Fk') {
     
        console.log('error loading video from youtube')
      }
      else {
        console.log('trailer was loaded from backend') 
      }
      this.setState({
        youtube:this.props.trailer
      })
    }
  }

  fetchTrailer = (title, year) => {
    console.log('grabbing trailer')
  	this.props.fetchTrailers(title,year)

  }

  handler = (trailer) => {
    //pass to MovieList
    this.props.trailerID(trailer)
  }

  handleLoading = () => {
    if(this.props.loading===true) 
    {
      return <div>Loading Info...</div>
    } 
    else {
      // change selected movie to backend movie
      return (
      	<div>
      		<MovieInfo youtube={this.state.youtube} path={this.trailerPath} selectedMovie ={this.state.selectedMovie} currentMovie={this.props.currentMovie} trailer={this.props.trailer} handler={this.handler}/>
      	</div>
      )
    }
  }

  render() {
    let title = 'title'
    if (this.props.currentMovie.Title !== undefined){
      title = this.props.currentMovie.Title 
    }
    else{
      if (sessionStorage.selectedMovie.title){
        title =  JSON.parse (sessionStorage.selectedMovie.title)
        console.log(title)
      }
      else{
        console.log('reached')
        window.location.reload()
      }
    }
    
    return (
    <div style={{background:this.state.cssColor.background,color:this.state.cssColor.color}}  className= "Info">
    	<div className="banner-3">{title.toUpperCase()}</div>
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