import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/Ui/Input/Input';
import * as actions from '../../store/actions/index';

class newSubscription extends Component {
  handleFormSubmission = (ev) => {
    ev.preventDefault();
    const newSubscription = {};
    for (let key in this.props.editedSubscription) {
      newSubscription[key] = this.props.editedSubscription[key].value;
    }
    newSubscription.userId = this.props.userId;
    this.props.editionMode === 'add'
      ? this.props.onNewSubscription(newSubscription, this.props.token)
      : this.props.onUpdateSubscription({subscription: newSubscription, id: this.props.editedSubscriptionId}, this.props.token);

  };

  inputChangeHandler = (ev, formIdentifier) => {
    this.props.onUpdateEditedSubscriptionValue(ev.target.value, formIdentifier)
  };

  render() {
    const formElementsArray = [];
    for (let key in this.props.editedSubscription) {
      const {config, value, valid, touched} = this.props.editedSubscription[key];
      formElementsArray.push({
        id: key,
        config,
        value,
        touched,
        valid
      });
    }
    const form = formElementsArray.map(formElement => (
      <Input key={formElement.id}
             elementConfig={formElement.config}
             value={formElement.value}
             isValid={formElement.valid}
             isTouched={formElement.touched}
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
    editedSubscription: state.sub.editedSubscription,
    editedSubscriptionId: state.sub.editedSubscriptionId,
    editionMode: state.sub.editionMode,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onNewSubscription: (subscription, token) => dispatch(actions.addSubscription(subscription, token)),
    onUpdateSubscription: (subscription, token) => dispatch(actions.updateSubscription(subscription, token)),
    onUpdateEditedSubscriptionValue: (value, formIdentifier) => dispatch(actions.updateEditedSubscriptionValue(value, formIdentifier)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(newSubscription);
