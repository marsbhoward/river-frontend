import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listMovies } from '../actions/movieActions'
import MoviesList from './MoviesList';
import { Auth0Context } from "../react-auth0-spa";
import { findDOMNode } from 'react-dom';
import $ from 'jquery'; 

let  moviesList
let count = 0
//close sereach area if input box lose fousand input box is empty

class Searchbox extends Component {
 constructor(props){
    super(props);

    this.state={
      search:'',
      MoiveData: "",
      open: this.props.sBoxOpenState
    };

  this.loseFocus = this.loseFocus.bind(this)
  }

  componentDidMount() {
    this.props.listMovies()
    console.log(this.props.sBoxOpenState)
  }

  componentDidUpdate(){
    
  }


  loseFocus=(target)=>{

  }


  handleClick=()=>{
    this.setState({open:true})
  }

  searchMovie=(event)=>{
    let keyword = event.target.value.toLowerCase();
    this.setState({search:keyword})
    
  }  	

  handleLoading = () => {
    if(this.props.loading) {
      return ' '
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
          return <MoviesList key={index} search={this.state.search}  movie={movie} movieID={(index+1)} cardStyle='height: -webkit-fill-available;
          overflow: hidden;'/>
        })
      })
    }
  }

  render(){
    let searchState=''
    let setClass = ''
    
    if (this.state.open === false){
      searchState = <p className={'searchBar'} onClick={this.handleClick}> Search </p>
      setClass= ''
    } 
    else{
      searchState = <input type="text" id='name-input' className="searchBar" placeholder="Search by title" onClick={this.props.pointer} onChange={(e)=>this.searchMovie(e)} />
      
      setClass = 'searchBackground'
    }

  	return(
      /* onClick={() => this.loseFocus(this.props.target)} */
  		<div onBlur= {() => this.loseFocus(this.props.target)}>
  			{searchState}
  			{this.handleLoading()}
        <div className={setClass} >
          <div className="search-list" onClick={this.props.pointer} >
              {moviesList}
          </div>
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