import React from 'react';




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

  render() {
    if (this.props.movie.title!== null){
      if (this.props.movie.title.toLowerCase().includes(this.props.search)){
        console.log(this)
        //return stream name from stream id using a switch
        return (
          <div className= {this.state.style}>
            <p className= 'title'> {this.props.movie.title} </p>
            <p className= 'stream-name'> {this.state.streamName}</p>
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