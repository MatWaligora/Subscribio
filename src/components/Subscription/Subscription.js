import React from 'react';
import './Subscription.css';
import moment from 'moment';

const subscription = (props) => {
  const startDate = moment(props.startDate).format('DD.MM.YYYY');
  return (
    <div className="Subscription">
      <div>
        {props.service}
      </div>
      <div>
        {(+props.amount).toFixed(2)} / {props.period}
      </div>
      <div>
        {startDate}
      </div>
    </div>
  );
}

export default subscription;
