import React, { Component } from 'react';
import netflix from'../streams_logos/netflix.png';
import hulu from'../streams_logos/hulu.png';
import amazon from'../streams_logos/amazon.png';
import hbo from'../streams_logos/hbo.png';
import disney from'../streams_logos/disney.png';
import showtime from'../streams_logos/showtime.png';
import starz from'../streams_logos/starz.png'
import cinimax from'../streams_logos/cinimax.png'
import dc from'../streams_logos/dc.png'
import apple from'../streams_logos/apple.png'
import epix from'../streams_logos/epix.png'
import cbs from'../streams_logos/cbs.png'
import tbs from'../streams_logos/tbs.png'
import tnt from'../streams_logos/tnt.png'
import shudder from'../streams_logos/shudder.png'
import amc from'../streams_logos/amc.png'
import fx from'../streams_logos/fx.png'
import syfy from'../streams_logos/syfy.png'
import ifc from'../streams_logos/ifc.png'
import logo from'../logo.png'
import {Link} from 'react-router-dom'

let streamSrc
export class Stream extends Component {

    constructor(props){
    super(props)
    this.state = {
      logo: "",
    }
  }

  componentDidMount() {
    switch (this.props.stream.name) {
      case "netflix":
        this.setState({logo: netflix})
        break;
      case "hulu":
        this.setState({logo: hulu})
        break;
      case "amazon":
        this.setState({logo: amazon})
        break;
      case "disney":
        this.setState({logo: disney})
        break;
      case "hbo":
        this.setState({logo: hbo})
        break;         
      case "showtime":
        this.setState({logo: showtime})
        break;
      case "starz":
        this.setState({logo: starz})
        break;
      case "cinimax":
        this.setState({logo: cinimax})
        break;
      case "dc":
        this.setState({logo: dc})
        break;
      case "apple":
        this.setState({logo: apple})
        break;
      case "epix":
        this.setState({logo: epix})
        break;         
      case "cbs":
        this.setState({logo: cbs})
        break;
      case "tbs":
        this.setState({logo: tbs})
        break;
      case "tnt":
        this.setState({logo: tnt})
        break;
      case "shudder":
        this.setState({logo: shudder})
        break;
      case "amc":
        this.setState({logo: amc})
        break;
      case "fx":
        this.setState({logo: fx})
        break;         
      case "syfy":
        this.setState({logo: syfy})
        break;
      case "ifc":
        this.setState({logo: ifc})
        break;                                                                                                                      
      default:
        this.setState({logo: logo})
        break;
    }
  } 


  handleOnClick = () => {
    //returns the selected Stream id to streamsList
    this.props.handler(this.props.stream.id,this.props.stream.name)
    }
     

  render() {
    streamSrc = this.state.logo
    if (this.props.stream.name){
      return (
          <Link to={`/streams/${this.props.stream.name}/movies`}>
            <img onClick={this.handleOnClick} className= "stream" id={this.props.stream.id} alt={this.props.stream.name} src={streamSrc}></img>
          </Link>
      );
    }
  }

};

export default Stream;