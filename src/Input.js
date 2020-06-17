import React from 'react';

function Input({loading, onChange}) {
  return (
    <div className="input-group mb-3 mt-3">
      <input type="text" className="form-control" placeholder="Search..." aria-label="Search icons" aria-describedby="basic-addon2" onChange={onChange} />
      <div className="input-group-append">
        { loading ?
          <span className="input-group-text" id="basic-addon2">Loading...</span> :
          <span className="input-group-text" id="basic-addon2">Ready</span>
        }
      </div>
    </div>
  );
}

export default Input;
