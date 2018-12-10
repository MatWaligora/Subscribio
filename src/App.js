import React, {Component} from 'react';
import {connect} from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import Subscriptions from './containers/Subscriptions/Subscriptions';
import NewSubscription from './containers/NewSubscription/NewSubscription';
import Modal from './components/Ui/Modal/Modal';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import * as actions from './store/actions/index';
import './App.css';
import Login from "./containers/Auth/Login/Login";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  handleLogout = () => {
    this.props.onLogout();
    this.props.history.push('/auth');
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Subscriptions}/>
        <Redirect to="/"/>
      </Switch>
    );

    if(!this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={Login}/>
          <Redirect to="/auth"/>
        </Switch>
      )
    }

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
          <button onClick={this.handleLogout} className="Button Button-close">Logout</button>
        </header>
        <main className="App-main">
          {modal}
          {routes}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.sub.showEditionModal,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEditionModal: () => dispatch(actions.toggleEditionModal()),
    onTryAutoSignup: () => dispatch( actions.authCheckState() ),
    onLogout: () => dispatch(actions.logout())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
