import React from 'react';
import './Modal.css';

const modal = (props) => (
  <div className="Modal">
    <button className="Button Button-close" onClick={props.closeModal}>Close</button>
    {props.children}
  </div>
);

export default modal;
