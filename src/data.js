import React from 'react';
import adapter from './adapter'

let listOfStreams = adapter.getStreams()
.then(streamsList => streamsList)


class Data extends React.Component {
  constructor() {
    super()
    this.state = {
      streamsList: []
    }
  }


componentDidMount () {
   	listOfStreams
    .then (json => 
          this.setState({
          streamsList: json
     }))
  }  
  



  render() { 
    const resArr = this.state.streamsList.map((r, i)=> {
      return (<li key={i}>
        {r.name}
      </li>
      )
    })  
    return (
      <div>
        <h1>List of Streams</h1>
        <ul>
        {resArr}
        </ul>
    </div>
    )
  }
}

export default Data;