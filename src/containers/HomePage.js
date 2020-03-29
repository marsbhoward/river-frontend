import React, { Component } from 'react';

/*  createPlayer: (name, game_id) => {
    return fetch(`${URL}/games/${game_id}/players`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name, game_id)
    })
    .then(resp => resp.json()) 
  },


  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 1,
      "order": "relevance",
      "q": "the Avengers trailer",
      "type": "video"
    })

https://developers.google.com/youtube/v3/search?key={key}&part=snippet

AIzaSyA0YG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA

https://www.googleapis.com/youtube/v3/search?key=&part=snippet&maxResults=1&order=relevance&q=the%20Avengers%20trailer&type=video&key=AIzaSyBRpDAqSeCsDHlTlS7l8YHd2nOFgfTDtWM HTTP/1.1


//working api link

  */
  

class HomePage extends Component {  

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  	
  render() {
    return (
      <div className = "home">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
}
export default HomePage

