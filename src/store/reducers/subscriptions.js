import * as actionTypes from '../actions/actionTypes';
import shortid from 'shortid';

const getFreshSubscription = () => {
  return {
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

const initialState = {
  editedSubscription: getFreshSubscription(),
  showEditionModal: false,
  editedSubscriptionId: null,
  editionMode: 'add',
  subscriptions: [
      {
        id: '1',
        service: 'Netflix',
          startDate: '10.11.2018',
          endDate: '10.11.2019',
          paymentDate: '10.12.2018',
          amount: 45,
          period: 'month'
      }
  ]
};

const addSubscription = (state, action) => {
  const subscriptions = state.subscriptions.slice();
  subscriptions.push({...action.subscription, id: shortid.generate()});
  return {
    ...state,
    subscriptions,
    showEditionModal: false
  }
};

const removeSubscription = (state, action) => {
  const subscriptions = state.subscriptions.slice();
  subscriptions.splice( subscriptions.findIndex(sub => sub.id === action.subscriptionId));
  return {
    ...state,
    subscriptions,
    editedSubscriptionId: null
  }
};

const setEditedSubscription = (state, action) => {
  const {subscriptionId} = action;
  const newSub = state.subscriptions.find(sub => sub.id === subscriptionId);
  const editedSubscription = {...state.editedSubscription};
  for (let key in newSub) {
    if (editedSubscription.hasOwnProperty(key)) {
      editedSubscription[key].value = key.indexOf('Date') !== -1 ? new Date(newSub[key]) : newSub[key];
    }
  }
  return {
    ...state,
    editedSubscription,
    editedSubscriptionId: subscriptionId,
    editionMode: 'edit'
  }
};

const setFreshEditedSubscription = (state, action) => {
  return {
    ...state,
    editedSubscription: getFreshSubscription(),
    editionMode: 'add'
  }
};

const toggleEditionModal = (state, action) => {
  return {
    ...state,
    showEditionModal: !state.showEditionModal
  }
};

const updateSubscription = (state, action) => {
  const subscriptions = state.subscriptions.slice();
  const { subscription } = action;
  const editedSubscriptionIndex = subscriptions.findIndex(sub => sub.id === state.editedSubscriptionId);
  subscriptions[editedSubscriptionIndex] = subscription;
  return {
    ...state,
    subscriptions,
    showEditionModal: false,
    editedSubscriptionId: null
  }
};

const updateEditedSubscriptionValue = (state, action) => {
  const subscription = {...state.editedSubscription};

  const { value: newValue, formIdentifier } = action.payload;

  const updatedFormValue = {
    ...subscription[formIdentifier],
    value: newValue
  };
  const updatedEditedSubscription = {
    ...subscription,
    [formIdentifier]: updatedFormValue
  };
  return {
    ...state,
    editedSubscription: updatedEditedSubscription
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SUBSCRIPTION: return addSubscription(state, action);
    case actionTypes.REMOVE_SUBSCRIPTION: return removeSubscription(state, action);
    case actionTypes.UPDATE_SUBSCRIPTION: return updateSubscription(state, action);
    case actionTypes.UPDATE_EDITED_SUBSCRIPTION_FORM_VALUE: return updateEditedSubscriptionValue(state, action);
    case actionTypes.SET_EDITED_SUBSCRIPTION: return setEditedSubscription(state, action);
    case actionTypes.SET_FRESH_EDITED_SUBSCRIPTION: return setFreshEditedSubscription(state, action);
    case actionTypes.TOGGLE_EDITION_MODAL: return toggleEditionModal(state, action);
    default: return state;
  }
};

export default reducer;
