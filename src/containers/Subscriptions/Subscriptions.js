import React, {Component} from 'react';
import {connect} from 'react-redux';
import Subscription from '../../components/Subscription/Subscription';
import Spinner from '../../components/Ui/Spinner/Spinner';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

class Subscriptions extends Component {
  render() {
    let subs = <TransitionGroup>
      {
        this.props.subscriptions.map((subscription, index) => {
          return (
            <CSSTransition
              key={subscription.id }
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
