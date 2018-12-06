import React from 'react';
import './Subscription.css';

const subscription = (props) => {
    return (
        <div className="Subscription">
            <div>
                {props.service}
            </div>
            <div>
                {(+props.amount).toFixed(2)} / {props.period}
            </div>
            <div>
                {props.startDate}
            </div>
        </div>
    );
}

export default subscription;
