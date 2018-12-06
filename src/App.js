import React, { Component } from 'react';
import './App.css';
import Subscriptions from './containers/Subscriptions';
import NewSubscription from './containers/NewSubscription/NewSubscription';
import Modal from './components/Ui/Modal/Modal';

class App extends Component {
  state = {
    showModal: false,

  };

  addNewSubscription = () => {
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Subscribio</h1>
        </header>
          <main className="App-main">
            { this.state.showModal
              ? <Modal closeModal={this.closeModal}>
                  <NewSubscription closeModal={this.closeModal}/>
                </Modal>
              : null }
              <Subscriptions addNew={this.addNewSubscription}/>
          </main>
      </div>
    );
  }
}

export default App;
