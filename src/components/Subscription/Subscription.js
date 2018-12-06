import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import './Subscription.css';

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
      <div className="Overlay">
        <div className="Overlay-button"
             onClick={() => props.onSetEditedSubscription(props.id)}>
          Edit
        </div>
        <div className="Overlay-button"
             onClick={() => props.onRemoveSubscription(props.id)}>
          Delete
        </div>
      </div>
    </div>
  );
};



const mapDispatchToProps = dispatch => {
  return {
    onSetEditedSubscription: (subscriptionId) => dispatch(actions.setEditedSubscription((subscriptionId))),
    onRemoveSubscription: (subscriptionId) => dispatch(actions.removeSubscription((subscriptionId))),
  }
};
export default connect(null, mapDispatchToProps)(subscription);

