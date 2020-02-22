import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieInput from './MovieInput';

class Movies extends Component{
  render() {

    let movies = this.props.streams.map(movie => <li key={movie.id}>{movie.name}</li>);

    return (
      <div>
      <h2>Movies</h2>
        <ul>

        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { streams: state.streams }
}

export default connect(mapStateToProps)(Movies);
