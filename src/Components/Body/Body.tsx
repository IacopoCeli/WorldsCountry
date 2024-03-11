import React from 'react';
import './Body.css';
import Nations from './Nations/Nations'

export default function Body() {

  return (

    <>
      <div className="container-fluid">
        <div className="row">
          <Nations />
        </div><br />
      </div>  
    </>

  );
}
