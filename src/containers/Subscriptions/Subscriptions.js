import React, {Component} from 'react';
import {connect} from 'react-redux';
import Subscription from '../../components/Subscription/Subscription';
import Spinner from '../../components/Ui/Spinner/Spinner';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import * as actions from "../../store/actions";
import Chart from "../Chart/Chart";

class Subscriptions extends Component {
  componentDidMount() {
    this.props.onFetchSubscriptions(this.props.token);
  }
  render() {
    let subs = <TransitionGroup>
      {
        this.props.subscriptions.map((subscription, index) => {
          return (
            <CSSTransition
              key={subscription.id}
              timeout={500}
              classNames="fade">
              <Subscription {...subscription} edit={this.props.handleEdit}/>
            </CSSTransition>
          )
        })
      }
    </TransitionGroup>;
    if (this.props.fetchingData) {
      subs = <Spinner/>
    }
    return (
      <div>
        {this.props.error}
        {subs}
        <div className="Subscription Subscription-new" onClick={this.props.addNewSubscription}>
          <p className="Subscription-new">Add new</p>
        </div>
        <Chart/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptions: state.sub.subscriptions,
    fetchingData: state.sub.loading,
    error: state.sub.error,
    token: state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSubscription: () => dispatch(actions.setFreshEditedSubscription()),
    onFetchSubscriptions: (token) => dispatch(actions.fetchSubscriptions(token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
