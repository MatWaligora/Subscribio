import React, {Fragment} from 'react';

const input = (props) => (
  <Fragment>
    <label htmlFor={props.name}>{props.name}</label>
    <input {...props.elementConfig}
           value={props.value}
           onChange={props.handleChange}/>
  </Fragment>
);

export default input;
