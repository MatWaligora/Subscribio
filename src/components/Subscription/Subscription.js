import React from 'react';
import './Subscription.css';

const subscription = (props) => {
    return (
        <div className="Subscription">
            <span>
                {props.service}
            </span>
            <span>
                {props.amount.toFixed(2)}
            </span>
            <span>
                {props.startDate}
            </span>
        </div>
    );
}

export default subscription;
