import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/Ui/Input/Input';
import * as actions from '../../store/actions/index';
import './NewSubscription.css';

class newSubscription extends Component {
  handleFormSubmission = (ev) => {
    ev.preventDefault();
    const newSubscription = {};
    for ( let key in this.props.editedSubscription ) {
      newSubscription[key] = this.props.editedSubscription[key].value;
    }
    this.props.editionMode === 'add' ? this.props.onNewSubscription(newSubscription) : this.props.onUpdateSubscription(newSubscription) ;

  };

  inputChangeHandler = (ev, formIdentifier) => {
    this.props.onUpdateEditedSubscriptionValue(ev.target.value, formIdentifier)
  };

  render() {
    const formElementsArray = [];

    for ( let key in this.props.editedSubscription ) {
      formElementsArray.push( {
        id: key,
        config: this.props.editedSubscription[key].config,
        value: this.props.editedSubscription[key].value
      } );
    }
    const form = formElementsArray.map(formElement => (
      <Input key={formElement.id}
             elementConfig={formElement.config}
             value={formElement.value}
             handleChange={(ev) => this.inputChangeHandler(ev, formElement.id)}
             handleDateChange={(value) => this.props.onUpdateEditedSubscriptionValue(value, formElement.id)}/>
    ));

    return (
      <div className="NewSubscription">
        <form onSubmit={this.handleFormSubmission}>
          {form}
          <br/>
          <button type="submit" className="Button">
            {this.props.editionMode === 'add' ? <span>Add</span> : <span>Save</span>}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editedSubscription: state.editedSubscription,
    editionMode: state.editionMode
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onNewSubscription: (subscription) => dispatch(actions.addSubscription((subscription))),
    onUpdateSubscription: (subscription) => dispatch(actions.updateSubscription((subscription))),
    onUpdateEditedSubscriptionValue: (value, formIdentifier) => dispatch(actions.updateEditedSubscriptionValue(value, formIdentifier)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(newSubscription);
