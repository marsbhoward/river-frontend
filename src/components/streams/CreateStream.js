import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import adapter from '../adapter'

  let listOfStreams = adapter.getStreams()
  .then(streamsList => streamsList)	


  class CreateStream extends Component {

  constructor() {
    super();
    this.state = {
      streamsList: [],
      stream: '',
    };
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

const mapStateToProps = ({ bands }) => ({ bands })

export default connect(null, mapStateToProps)(CreateStream);