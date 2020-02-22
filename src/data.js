import React from 'react';
import adapter from './adapter'


let listOfStreams = adapter.getStreams()
.then(streamsList => streamsList)


class Data extends React.Component {
  constructor() {
    super()
    this.state = {
      streamsList: [],
      moviesList: []
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
      return (<p className= "stream" id = {r.name} key={i}>
        {r.name}
      </p>
      )
    })  
    return (
      <div>
        {resArr}
    </div>
    )
  }
}


export default Data;