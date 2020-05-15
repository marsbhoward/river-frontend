import React, { Component } from 'react';
import UserStream from '../components/UserStream';


export class Profile extends Component {
  

  componentDidMount() {
  }

//binds passed handler to StreamsList handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this)
  }

// recieves id from passed handler
  handler = (id,name) => {
    this.setState({
      currentStream: id,
      currentStreamName:name
    })
 //returns the selected Stream id to StreamsPage   
    this.props.handler(id,name)
  }



  render() {    
    const streamsList = this.props.userStreams.map((stream,index) => {

      return <UserStream key={index} stream={stream} handleLists={this.props.handleLists} handler={this.handler} editClicked={this.props.editClicked} streamLinks={this.props.streamLinks}/>
    })
    
    return (
      <div className="streams-list-2">
          {streamsList}
      </div>
    )
  }
}


export default Profile;