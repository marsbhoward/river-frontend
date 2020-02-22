export const addStream = stream => {
  return {
    type: 'ADD_STREAM',
    stream
  };
};

export const removeStream = id => {
  return {
    type: 'REMOVE_STREAM',
    id
  };
};

export const addMovie = movie => {
  return {
    type: 'ADD_MOVIE',
    movie
  };
};

export const removeMovie = id => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
};
