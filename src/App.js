import React, { Component } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import './App.css';
import Subscriptions from './containers/Subscriptions';
import NewSubscription from './containers/NewSubscription/NewSubscription';
import Modal from './components/Ui/Modal/Modal';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  render() {
    const modal = (
      <CSSTransition
        in={this.props.showModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        {(status) => (
          <Modal className={`fade fade-${status}`} closeModal={this.props.toggleEditionModal}>
            <NewSubscription closeModal={this.props.toggleEditionModal}/>
          </Modal>
        )}
      </CSSTransition>
    );
    return (
      <div className="App">
        <header className="App-header">
            <h1>Subscribio</h1>
        </header>
          <main className="App-main">
            { modal }
              <Subscriptions addNew={this.props.addNewSubscription}/>
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
        }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
