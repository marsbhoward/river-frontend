import React, { Component } from 'react';
import { addStream } from '../actions';
import { connect } from 'react-redux'; 
import adapter from '../adapter'

  let listOfStreams = adapter.getStreams()
  .then(streamsList => streamsList)	


  export class StreamInput extends Component {

  state = {
    streamsList: [],
    stream: ''
  }

  componentDidMount () {
   	listOfStreams
    .then (json => 
          this.setState({
          streamsList: json
     }))
  }  

  handleclick(e) {
    this.setState({
    	stream: e.target.textContent
    });
  }

  render() { 
    const resArr = this.state.streamsList.map((r, i)=> {
      return (<button className= "stream" id = {r.name} key={i}
        onClick={(e) => {this.handleclick(e,)}}>{r.name}
      </button>
      )
    })  
    return (
      <div>
        {resArr}
    </div>
    )
  }
}

export default connect(null, { addStream })(StreamInput);