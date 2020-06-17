import React, { useState } from 'react';
import Input from './Input.js';
import Results from './Results.js';

function Container() {
  const [state, setState] = useState({
    data: [],
    loading: false,
    errorMessage: ''
  });

  const onChange = e => {
    const term = e.target.value;

    setState(s => ({
      loading: true,
      data: [],
      errorMessage: ''
    }));

    fetch('https://fa-search-backend.herokuapp.com/search?delay=true&term=' + term).then(response => {
      return response.json();
    }).then(data => {
      setState(s => ({
        loading: false,
        data,
        errorMessage: ''
      }));
    }).catch(e => {
      setState(s => ({
        loading: false,
        data: [],
        errorMessage: e.message
      }));
    });
  };


  return (
    <div className="container">
      <Input loading={state.loading} onChange={onChange} />
      <Results data={state.data} errorMessage={state.errorMessage} />
    </div>
  );
}

export default Container;
