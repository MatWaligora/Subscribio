import React, {Component} from 'react';
import Input from '../../components/Ui/Input/Input';
import './NewSubscription.css';

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
      startDate: {
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
  };

  inputChangeHandler = (ev, formIdentifier) => {
    const updatedValue = {
      ...this.state.subscription[formIdentifier],
      value: ev.target.value
    };
    const updatedForm = {
      ...this.state.subscription,
      [formIdentifier]: updatedValue
    }
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
    ))
    return (
      <div className="NewSubscription">
        <form onSubmit={this.handleFormSubmission}>
          {form}
        </form>
      </div>
    );
  }
}

export default newSubscription;
