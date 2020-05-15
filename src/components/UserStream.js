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
//remove edit list, it is now in profile page

export class UserStream extends Component {

    constructor(props){
    super(props)
    this.state = {
      logo: "",
    }
  }

  componentDidMount() {
	  switch (this.props.stream.stream_id) {
      case 1:
        this.setState({
        	logo: netflix,
        	streamName: "netflix"
        })
        break;
      case 2:
        this.setState({
        	logo: hulu,
        	streamName: "hulu"
        })
        break;
      case 3:
        this.setState({
        	logo: amazon,
        	streamName: "amazon"
        })
        break;
      case 4:
        this.setState({
        	logo: hbo,
        	streamName: "hbo"
        })
        break;
      case 5:
        this.setState({
          logo: disney,
          streamName: "disney"
        })
        break;         
      case 6:
        this.setState({
        	logo: showtime,
        	streamName: "showtime"
        })
        break;
      case 7:
        this.setState({
        	logo: starz,
        	streamName: "starz"
        })
        break;
      case 8:
        this.setState({
        	logo: cinimax,
        	streamName: "cinimax"
        })
        break;
      case 9:
        this.setState({
        	logo: dc,
        	streamName: "dc"
        })
        break;
      case 10:
        this.setState({
        	logo: apple,
        	streamName: "apple"
        })
        break;
      case 11:
        this.setState({
        	logo: epix,
        	streamName: "epix"
        })
        break;         
      case 12:
        this.setState({
        	logo: cbs,
        	streamName: "cbs"
        })
        break;
      case 13:
        this.setState({
        	logo: tbs,
        	streamName: "tbs"
        })
        break;
      case 14:
        this.setState({
        	logo: tnt,
        	streamName: "tnt"
        })
        break;
      case 15:
        this.setState({
        	logo: shudder,
        	streamName: "shudder"
        })
        break;
      case 16:
        this.setState({
        	logo: amc,
        	streamName: "amc"
        })
        break;
      case 17:
        this.setState({
        	logo: fx,
        	streamName: "fx"
        })
        break;         
      case 18:
        this.setState({
        	logo: syfy,
        	streamName: "syfy"
        })
        break;
      case 19:
        this.setState({
        	logo: ifc,
        	streamName: "ifc"
        })
        break;                                                                                                                      
      default:
        this.setState({logo: logo})
        break;
    }    
  } 

    handleOnClick = () => {
    //returns the selected Stream id to streamsList
    this.props.handler(this.props.stream.stream_id,this.state.streamName)
    }
     
  render() {
    streamSrc = this.state.logo
    let streamId = this.props.stream
    if (this.props.streamLinks === true){
        return (
        <Link to={`/streams/${this.state.streamName}/movies`}>          
          <img onClick={this.handleOnClick} className= "stream" id={streamId.stream_id} alt={this.state.streamName} src={streamSrc}></img>
        </Link>          
        )
    }
    else{
      if (this.props.editClicked === true){
          if (this.props.stream.selected === true){
            return (
              <img onClick={() =>  {this.props.handleLists(streamId)} }className= "stream true" id={streamId.stream_id} alt={this.state.streamName} src={streamSrc}></img>
            )
        }
          else{
            return (
              <img onClick={() =>  {this.props.handleLists(streamId)} }className= "stream false" id={streamId.stream_id} alt={this.state.streamName} src={streamSrc}></img>
            )
          }
      }
      if (this.props.stream.selected === true){
        return (
          <img className= "stream true" id={streamId.stream_id} alt={this.state.streamName} src={streamSrc}></img>
        )
      }
      else{
        return (
        <img className="stream false" id={streamId.stream_id} alt={this.state.streamName} src={streamSrc}></img>
        )
      }
    }
  }    
}

export default UserStream;