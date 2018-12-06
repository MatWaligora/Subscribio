import React, { Component } from 'react';
import './App.css';
import Subscriptions from './containers/Subscriptions';
import NewSubscription from './containers/NewSubscription/NewSubscription';
import Modal from './components/Ui/Modal/Modal';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Subscribio</h1>
        </header>
          <main className="App-main">
            { this.props.showModal
              ? <Modal closeModal={this.props.toggleEditionModal}>
                  <NewSubscription closeModal={this.props.toggleEditionModal}/>
                </Modal>
              : null }
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
