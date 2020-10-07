import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movieActions'
import MovieList from '../components/MovieList'

class MoviesPage extends Component {   
  
  componentDidMount() {
  this.props.fetchMovies(this.props.handler)
  }

  trailerID = (trailer) => { 
    //link trailer to backend
  }

  
  handleLoading = () => {
    if(this.props.loading) {
      return <div>Loading Movies...</div>
    } else {
      return (
      <div>
      <MovieList streamID={this.props.handler} movieCards={this.props.movieCards} movieIds={this.props.movieIds} trailerID={this.trailerID} currentStream={this.currentStream}/>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="banner-2">{this.props.streamName.toUpperCase()}</div>
        {this.handleLoading()}
      </div>
    );
  }
}



const mapDispatchToProps = state => {
  return {
    movieCards: state.MoviesReducer.movies,
    movieIds: state.MoviesReducer.ids,
    loading: state.MoviesReducer.loading
  }
}

export default connect(mapDispatchToProps, {fetchMovies})(MoviesPage)