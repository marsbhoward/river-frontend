import React from 'react';
import '../index.css';
import Stream from './Stream';



export class StreamList extends React.Component {
//binds passed handler to StreamsList handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this)
  }

// recieves id from passed handler
  handler = id => {
    this.setState({
      currentStream: id
    })
 //returns the selected Stream id to StreamsPage   
    this.props.handler(id)
  }


  render() {    
    const streamsList = this.props.streamInfo.map((stream, index) => {
      return <Stream key={index} stream={stream} handler={this.handler} />
    })
    
    return (
      <div className="streams-list">
          {streamsList}
      </div>
    )
  }
}

export default StreamList;