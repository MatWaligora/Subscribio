import React, {Component} from 'react';
import {connect} from 'react-redux';
import Subscription from '../components/Subscription/Subscription';

class Subscriptions extends Component {
  render() {
    const subs = this.props.subscriptions.map((subscription, index) => {
      return (
        <Subscription {...subscription} key={subscription.service + index} edit={this.props.handleEdit}/>
      )
    });

    return (
      <div>
        {subs}
        <div className="Subscription Subscription-new" onClick={this.props.addNew}>
          <p className="Subscription-new">Add new</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptions: state.subscriptions
  }
};

export default connect(mapStateToProps)(Subscriptions);
