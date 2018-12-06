import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/Ui/Input/Input';
import './NewSubscription.css';
import * as actions from '../../store/actions/index';

class newSubscription extends Component {
  state = {
    subscription: {
      service: {
        value: '',
        config: {
          type: 'text',
          name: 'service',
          placeholder: 'Service'
        }
      },
      amount: {
        value: 0,
        config: {
          type: 'number',
          name: 'amount',
          placeholder: 'Amount'
        }
      },
      period: {
        value: '',
        config: {
          type: 'text',
          name: 'period',
          placeholder: 'Month'
        }
      },
      startDate: {
        value: new Date(),
        config: {
          type: 'date',
          name: 'startDate',
          placeholder: 'Start date'
        }
      },
      endDate: {
        value: new Date(),
        config: {
          type: 'date',
          name: 'startDate',
          placeholder: 'Start date'
        }
      }
    }
  };

  handleFormSubmission = (ev) => {
    ev.preventDefault();
    const newSubscription = {};
    for ( let key in this.state.subscription ) {
      newSubscription[key] = this.state.subscription[key].value;
    }
    this.props.onNewSubscription(newSubscription);
  };

  inputChangeHandler = (ev, formIdentifier) => {
    const updatedValue = {
      ...this.state.subscription[formIdentifier],
      value: ev.target.value
    };
    const updatedForm = {
      ...this.state.subscription,
      [formIdentifier]: updatedValue
    };
    this.setState({
      subscription: updatedForm
    })
  };

  render() {
    const formElementsArray = [];

    for ( let key in this.state.subscription ) {
      formElementsArray.push( {
        id: key,
        config: this.state.subscription[key].config
      } );
    }

    const form = formElementsArray.map(formElement => (
      <Input key={formElement.id} elementConfig={formElement.config} value={formElement.value} handleChange={(ev) => this.inputChangeHandler(ev, formElement.id)}/>
    ));

    return (
      <div className="NewSubscription">
        <form onSubmit={this.handleFormSubmission}>
          {form}
          <button type="submit" className="Button">Add</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNewSubscription: (subscription) => dispatch(actions.addSubscription((subscription)))
  }
};

export default connect(null, mapDispatchToProps)(newSubscription);
