import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listMovies } from '../actions/movieActions'
import MoviesList from './MoviesList';
import { Auth0Context } from "../react-auth0-spa";

let  moviesList

class Searchbox extends Component {
 constructor(){
    super();

    this.state={
      search:'',
      MoiveData: "",
      open: false
    };
  }

  componentDidMount() {
    this.props.listMovies()
  }

  handleClick=()=>{
    this.setState({open:true})
    console.log('true')
  }

  searchMovie=(event)=>{
    let keyword = event.target.value.toLowerCase();
    this.setState({search:keyword})
    
  }  	

  handleLoading = () => {
    if(this.props.loading) {
      return <div>Loading Titles...</div>
    } 
    else {
      if (this.props.movieCards === undefined){
        window.location.reload();
      } 
      let movieList
    

      movieList = this.props.movieCards.filter(movieCard=>{
      if(this.state.search.length >= 3 ){
            return movieCard
      }
      else{
        moviesList = ''
      }        
      }).map((movie,index)=>{
        moviesList = this.props.movieCards.map((movie, index) => {
          return <MoviesList key={index} search={this.state.search}  movie={movie} movieID={(index+1)}/>
        })
      })
    }
  }

  render(){
    let searchState=''
    if (this.state.open == false){
      searchState = <p className={'searchBar'} onClick={this.handleClick}> Search </p>
    } 
    else{
      searchState = <input type="text" id='name-input' className="searchBar" placeholder="Search by title" onChange={(e)=>this.searchMovie(e)} />
    }
  	return(
  		<div>
  			{searchState}
  			{this.handleLoading()}
        <div className="movie-list">
            {moviesList}
        </div>
  		</div>
  	)
  }

}

const mapDispatchToProps = state => {
  return {
    movieCards: state.MoviesReducer.movies,
    loading: state.MoviesReducer.loading
  }
}

export default connect(mapDispatchToProps, {listMovies})(Searchbox)