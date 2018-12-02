import React from 'react';
import './Subscription.css';

const subscription = (props) => {
    return (
        <div className="Subscription">
            <span>
                {props.name}
            </span>
            <span>
                {props.amount}
            </span>
            <span>
                {props.paymentDate}
            </span>
        </div>
    );
}

export default subscription;