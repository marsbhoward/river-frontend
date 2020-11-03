import React from 'react';




export class MoviesList extends React.Component {
//binds passed handler to StreamsList handler
  constructor(props){
    super(props)
  }

  componentDidMount() {
  }

  render() {
    if (this.props.movie.title!== null){
      if (this.props.movie.title.toLowerCase().includes(this.props.search)){
        console.log(this)
        //return stream name from stream id using a switch
        return (
          <div className="movie-card">
            <h1> {this.props.movie.title} </h1>
            <h3> {this.props.movie.stream_id}</h3>
          </div>
        )
      }
      else{
        return(
          ""
        )
      }
    }
    else{
        return(
          ""
        )
      }
  }

}

export default MoviesList;