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
          name: 'Service',
          placeholder: 'Service'
        }
      },
      amount: {
        value: 0,
        config: {
          type: 'number',
          name: 'Amount',
          placeholder: 'Amount'
        }
      },
      period: {
        value: 'month',
        config: {
          type: 'select',
          name: 'Period',
          placeholder: 'Month',
          options: [
            {
              value: 'week',
              displayName: 'Week'
            },
            {
              value: 'month',
              displayName: 'Month'
            },
            {
              value: 'year',
              displayName: 'Year'
            }
          ]
        }
      },
      startDate: {
        value: new Date(),
        config: {
          type: 'date',
          name: 'Start date',
          placeholder: 'Start date'
        }
      },
      endDate: {
        value: new Date(),
        config: {
          type: 'date',
          name: 'End date',
          placeholder: 'End date'
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
    this.props.closeModal();
  };

  inputChangeHandler = (ev, formIdentifier) => {
    this.updateValue(ev.target.value, formIdentifier)
  };

  updateValue = (newValue, formIdentifier) => {
    console.log('updateValue', newValue, formIdentifier);
    const updatedValue = {
      ...this.state.subscription[formIdentifier],
      value: newValue
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
        config: this.state.subscription[key].config,
        value: this.state.subscription[key].value
      } );
    }

    const form = formElementsArray.map(formElement => (
      <Input key={formElement.id}
             elementConfig={formElement.config}
             value={formElement.value}
             handleChange={(ev) => this.inputChangeHandler(ev, formElement.id)}
             handleDateChange={(value) => this.updateValue(value, formElement.id)}/>
    ));

    return (
      <div className="NewSubscription">
        <form onSubmit={this.handleFormSubmission}>
          {form}
          <br/>
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
