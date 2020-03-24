import React from 'react';
import Stream from './Stream'

class Streams extends Stream {
  render(){
	const Streams = props=> {
	  const streams = props.streams.map(stream => <Stream key={stream.id} {...stream}/>)

	    return (
	      <div>
	         <h1>Streams</h1>
	      </div>
	    );
	}
  }	
};
export default Streams;
