import React from 'react';
import InfoPage from '../containers/InfoPage'
import {Link} from 'react-router-dom'




export class MoviesList extends React.Component {
//binds passed handler to StreamsList handler
  constructor(props){
    super(props)

    this.state={
      streamName:'',
      style:''
    };    
  }

  componentDidMount() {
    switch (this.props.movie.stream_id) {
      case 1:
        // statements_1
        this.setState({streamName:"Netflix"})
        this.setState({style:"movie-card netflix"})
        break;
      case 2:
        // statements_1
        this.setState({streamName:"Hulu"})
        this.setState({style:"movie-card hulu"})
        break;
      case 3:
        // statements_1
        this.setState({streamName:"Amazon"})
        this.setState({style:"movie-card prime"})
        break;
      case 4:
        // statements_1
        this.setState({streamName:"HBO Max"})
        this.setState({style:"movie-card hbo"})
        break;
      case 5:
        // statements_1
        this.setState({streamName:"Disney+"})
        this.setState({style:"movie-card disney"})
        break;
      case 6:
        // statements_1
        this.setState({streamName:"Showtime"})
        this.setState({style:"movie-card showtime"})
        break;
      case 7:
        // statements_1
        this.setState({streamName:"Starz"})
        this.setState({style:"movie-card starz"})
        break;
      case 8:
        // statements_1
        this.setState({streamName:"Cinimax"})
        this.setState({style:"movie-card max"})
        break;
      case 9:
        // statements_1
        this.setState({streamName:"DC Universe"})
        this.setState({style:"movie-card dc"})
        break;
      case 10:
        // statements_1
        this.setState({streamName:"Apple TV"})
        this.setState({style:"movie-card apple"})
        break;
      case 11:
        // statements_1
        this.setState({streamName:"Epix"})
        this.setState({style:"movie-card epix"})
        break;
      case 12:
        // statements_1
        this.setState({streamName:"CBS"})
        this.setState({style:"movie-card cbs"})
        break;
      case 13:
        // statements_1
        this.setState({streamName:"TBS"})
        this.setState({style:"movie-card tbs"})
        break;
      case 14:
        // statements_1
        this.setState({streamName:"TNT"})
        this.setState({style:"movie-card tnt"})
        break;
      case 15:
        // statements_1
        this.setState({streamName:"Shudder"})
        this.setState({style:"movie-card shudder"})
        break;
      case 16:
        // statements_1
        this.setState({streamName:"AMC"})
        this.setState({style:"movie-card amc"})
        break;
      case 17:
        // statements_1
        this.setState({streamName:"FX"})
        this.setState({style:"movie-card fx"})
        break;
      case 18:
        // statements_1
        this.setState({streamName:"SYFY"})
        this.setState({style:"movie-card stfy"})
        break;
      case 19:
        // statements_1
        this.setState({streamName:"IFC"})
        this.setState({style:"movie-card ifc"})
        break;                                                                                                
      default:
        // statements_def
        this.setState({streamName:""})
        this.setState({style:"movie-card"})
        break;
    }
  }

  handleOnClick = () => {
    this.setState({
    currentMovie: this.props.movie,
    clicked: true
    },function () {
    this.props.handler(this.state.currentMovie,this.state.clicked,this.props.movieID);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    })    
    
  }


  render() {
      const regex = /-/g;
      let unslug = this.props.movie.slug.replace(regex, ' ')
      unslug = unslug.toLowerCase()
      if (unslug.includes(this.props.search)){
        //onclick route to stream address ex: http://localhost:3000/streams/hbo/movies
        //also render movie as if it was clicked on the movies page


        //movie sends info to movieList and MovieList renders Infopage
        //<InfoPage movieIds={this.props.movieIds} streamID={this.props.streamID} movieID={this.state.movieID} currentMovie={showMovie} trailerID={this.trailerID}/>

        return (
          <div className= {this.state.style}>
            <p className= 'title'> {unslug} </p>
            <Link to={`/streams/${this.state.streamName.toLowerCase()}/movies`}>
              <span className= 'stream-name'> {this.state.streamName}</span>
            </Link>
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