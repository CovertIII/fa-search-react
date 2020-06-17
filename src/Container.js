import React, { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Input from './Input.js';
import Results from './Results.js';

function Container() {
  const [state, setState] = useState({
    data: [],
    loading: false,
    errorMessage: ''
  });

  const [subject, setSubject] = useState(null);

  useEffect(() => {
    if(subject === null) {
      const sub = new BehaviorSubject('');
      setSubject(sub);
    } else {
      const observable = subject.pipe(
        debounceTime(200)
      ).subscribe( term => {
        return fetch('https://fa-search-backend.herokuapp.com/search?delay=true&term=' + term).then(response => {
          return response.json();
        }).then(data => {
          const newState = {
            data,
            loading: false
          };
          setState(s => Object.assign({}, s, newState));
        });
      });

      return () => {
        observable.unsubscribe()
        subject.unsubscribe();
      }
    }
  }, [subject]);

  const onChange = e => {
    if(subject) {
      return subject.next(e.target.value);
    }
  };

  return (
    <div className="container">
      <Input loading={state.loading} onChange={onChange} />
      <Results data={state.data} errorMessage={state.errorMessage} />
    </div>
  );
}

export default Container;
