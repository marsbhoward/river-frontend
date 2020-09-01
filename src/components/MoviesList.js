import React from 'react';




export class MoviesList extends React.Component {
//binds passed handler to StreamsList handler
  constructor(props){
    super(props)
  }

  componentDidMount() {
  }

  render() {
      if (this.props.movie.title.toLowerCase().includes(this.props.search)){
        return (
          <div className="moiveCard">
            <h1> {this.props.movie.title} </h1>
          </div>
        )
      }
      else{
        return(
          ""
        )
      }
  }

}

export default MoviesList;