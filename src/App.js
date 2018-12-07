import React, {Component} from 'react';
import {connect} from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import Subscriptions from './containers/Subscriptions';
import NewSubscription from './containers/NewSubscription/NewSubscription';
import Modal from './components/Ui/Modal/Modal';
import Chart from './containers/Chart/Chart';

import * as actions from './store/actions/index';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onFetchSubscriptions();
  }

  render() {
    const modal = (
      <CSSTransition
        in={this.props.showModal}
        timeout={300}
        classNames="modal"
        unmountOnExit>
        <Modal closeModal={this.props.toggleEditionModal}>
          <NewSubscription closeModal={this.props.toggleEditionModal}/>
        </Modal>
      </CSSTransition>
    );
    return (
      <div className="App">
        <header className="App-header">
          <h1>Subscribio</h1>
        </header>
        <main className="App-main">
          {modal}
          <Subscriptions addNew={this.props.addNewSubscription}/>
          <Chart/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.showEditionModal
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSubscription: () => dispatch(actions.setFreshEditedSubscription()),
    toggleEditionModal: () => dispatch(actions.toggleEditionModal()),
    onFetchSubscriptions: () => dispatch(actions.fetchSubscriptions()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
