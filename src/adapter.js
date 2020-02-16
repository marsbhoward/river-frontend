const URL = "http://localhost:3000"

const adapter = {

  getStreams: () => {
    return fetch(`${URL}/streams`)
    .then(resp => resp.json())
  },

  getMovies: () => {
    return fetch(`${URL}/streams/1/movies`,{
      headers: { "Content-Type": "application/json" },
    })
    .then(resp => resp.json())
  },
    getDares: () => {
    return fetch(`${URL}/dares`)
    .then(resp => resp.json()) 
  }
}


export default adapter;