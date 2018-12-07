import React, {Component} from 'react';
import {connect} from 'react-redux';
import Subscription from '../components/Subscription/Subscription';
import Spinner from '../components/Ui/Spinner/Spinner';

class Subscriptions extends Component {
  render() {
    let subs = this.props.subscriptions.map((subscription, index) => {
      return (
        <Subscription {...subscription} key={subscription.service + index} edit={this.props.handleEdit}/>
      )
    });
    if (this.props.fetchingData) {
      subs = <Spinner/>
    }
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
    subscriptions: state.subscriptions,
    fetchingData: state.loading
  }
};

export default connect(mapStateToProps)(Subscriptions);
