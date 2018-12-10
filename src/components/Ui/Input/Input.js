import React, {Fragment} from 'react';
import DatePicker from "react-datepicker";

import './Input.css';
import "react-datepicker/dist/react-datepicker.css";

const input = (props) => {
  let input;
  const classNames = ['Input'];
  if(props.isTouched) {
    classNames.push('Touched');
  }
  if(props.isValid) {
    classNames.push('Valid');
  }
  if(props.isTouched && !props.isValid) {
    classNames.push('Error');
  }
  switch (props.elementConfig.type) {
    case 'date':
      input = (<DatePicker className={classNames.join(' ')}
                           dateFormat="dd/MM/yyyy"
                           selected={props.value}
                           onChange={props.handleDateChange}
      />);
      break;
    case 'select':
      input = (<select className={classNames.join(' ')}
                       {...props.elementConfig}
                       value={props.value}
                       onChange={props.handleChange}>
        {props.elementConfig.options.map(opt => {
          return (<option key={opt.displayName}
                          value={opt.value}>
            {opt.displayName}
          </option>)
        })}
      </select>);
      break;
    default:
      input = (<input className={classNames.join(' ')}
                      {...props.elementConfig}
                      value={props.value}
                      onChange={props.handleChange}/>);
      break;
  }

  return (
    <Fragment>
      <label htmlFor={props.elementConfig.name}>{props.elementConfig.name}</label>
      {input}
    </Fragment>
  );
}

export default input;
