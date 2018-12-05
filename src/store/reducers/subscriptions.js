import * as actionTypes from '../actions/actionTypes';

const initialState = {
  subscriptions: [
      {
        id: '1',
        name: 'Netflix',
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
  subscriptions.push(action.subscription);
  return {
    ...state,
    subscriptions
  }
};

const removeSubscription = (state, action) => {
  const subscriptions = state.subscriptions.slice();
  const { subscription } = action;
  subscriptions.splice(1, subscriptions.indexOf(sub => sub.id === subscription.id));
  return {
    ...state,
    subscriptions
  }
};

const updateSubscription = (state, action) => {
  const subscriptions = state.subscriptions.slice();
  const { subscription } = action;
  subscriptions[subscriptions.indexOf(sub => sub.id === subscription.id)] = subscription;
  return {
    ...state,
    subscriptions
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case [actionTypes.ADD_SUBSCRIPTION]: return addSubscription(state, action);
    case [actionTypes.REMOVE_SUBSCRIPTION]: return removeSubscription(state, action);
    case [actionTypes.UPDATE_SUBSCRIPTION]: return updateSubscription(state, action);

  }
  return state;
};
