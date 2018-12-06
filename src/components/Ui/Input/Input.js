import React, {Fragment} from 'react';
import './Input.css';

const input = (props) => (
  <Fragment>
    <label htmlFor={props.name}>{props.name}</label>
    <input className="Input"
           {...props.elementConfig}
           value={props.value}
           onChange={props.handleChange}/>
  </Fragment>
);

export default input;
