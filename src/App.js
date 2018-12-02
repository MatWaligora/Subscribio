import React, { Component } from 'react';
import './App.css';
import Subscriptions from './containers/Subscriptions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Subscribio</h1>
        </header>
          <main className="App-main">
              <Subscriptions/>
          </main>
      </div>
    );
  }
}

export default App;
