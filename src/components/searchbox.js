import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listMovies } from '../actions/movieActions'
import MoviesList from './MoviesList';

let  moviesList


class Searchbox extends Component {
 constructor(props){
    super(props);

    this.state={
      search:'',
      MoiveData: "",
      searchState: '',
      setClass: '',
      
    };
  }


  componentDidMount() {
    //interfe
    this.props.listMovies()
    this.handleStuff()
  }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps){
      if (this.props.sBoxCount < 1){
        this.handleStuff()
        this.props.addCount()
        this.props.listMovies()
      }
    }
  }

  getStuff=()=>{
    let theSearchState =''
    let theSetClass = ''
    if (this.props.sBoxOpenState === false){
      theSearchState= <p className={"searchBar"} onClick={this.handleClick}> Search </p>
      this.setState({search: ''})
      } 
    else{
      theSearchState= <input type="text" id="name-input" className="searchBar" placeholder="Search by title" onClick={this.props.pointer} onChange={(e)=>this.searchMovie(e)} />
      theSetClass= 'searchBackground'
      }
    return [theSearchState, theSetClass]
  }

  refresh(){
    console.log(this)
  }

  handleStuff(){
    let results = this.getStuff()
    this.setState({
      searchState: results[0],
      setClass: results[1]
    }) 
  }


  handleClick=()=>{
    this.props.resetCount()
    //this.setState({open:true})
    //console.log(this.state.open)
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
        console.log('no movie card')
        //window.location.reload();
      }
      if (sessionStorage.AllMovies !== 'not loaded'){
        let listM = JSON.parse(sessionStorage.AllMovies)
        listM.filter(movieCard=> {
          if(this.state.search.length >= 3 ){
            if (movieCard.slug.includes(this.state.search)){
                moviesList = JSON.parse(sessionStorage.AllMovies).map((movie, index) => {
                  return <MoviesList key={index} search={this.state.search}  movie={movie} movieID={(movie.id)} cardStyle='height: -webkit-fill-available;
                  overflow: hidden;'/>
                })
              }
            }
            else{
              moviesList = ''
            }
            return "done"        
          })
      }
      else{
        //this.props.listMovies()
      }
    }
  }

  render(){
  	return(
      /* onClick={() => this.loseFocus(this.props.target)} */
      /* need to find faster way to clear search state. possibly render only if not blank*/
  		<div className="searchBar" onClick={this.props.pointer} >  
  			{this.state.searchState}
  			{this.handleLoading()}
        <div onClick={this.handleClick}  className={this.state.setClass} >
          <div className="search-list" onClick={this.props.pointer}>
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