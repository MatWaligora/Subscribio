import * as actionTypes from '../actions/actionTypes';

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
  subscriptions: [],
  loading: false
};

const addSubscriptionStart = (state, action) => {
  return {
    ...state,
    showEditionModal: false,
    loading: false
  }
};

const addSubscriptionError = (state, action) => {
  return {
    ...state,
    showEditionModal: false,
    loading: false,
    error: action.error
  }
};

const addSubscriptionSuccess = (state, action) => {
  return {
    ...state,
    showEditionModal: false,
    loading: false,
    error: null
  }
};

const fetchSubscriptionsSuccess = (state, action) => {
  return {
    ...state,
    subscriptions: action.subscriptions,
    loading: false,
    error: null
  }
};

const removeSubscription = (state, action) => {
  const subscriptions = state.subscriptions.slice();
  subscriptions.splice(subscriptions.findIndex(sub => sub.id === action.subscriptionId), 1);
  return {
    ...state,
    subscriptions,
    editedSubscriptionId: null
  }
};

const removeSubscriptionError = (state, action) => {
  return {
    ...state,
    error: action.error
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

const updateSubscriptionSuccess = (state, action) => {
  return {
    ...state,
    showEditionModal: false,
    editedSubscriptionId: null
  }
};
const updateSubscriptionError = (state, action) => {
  return {
    ...state,
    showEditionModal: false,
    editedSubscriptionId: null,
    error: action.error
  }
};

const updateEditedSubscriptionValue = (state, action) => {
  const subscription = {...state.editedSubscription};

  const {value: newValue, formIdentifier} = action.payload;

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

const fetchedSubscriptionsStart = (state, action) => {
  return {
    ...state,
    loading: true
  }
};

const fetchSubsriptionsError = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SUBSCRIPTION_START:
      return addSubscriptionStart(state, action);
    case actionTypes.ADD_SUBSCRIPTION_ERROR:
      return addSubscriptionError(state, action);
    case actionTypes.ADD_SUBSCRIPTION_SUCCESS:
      return addSubscriptionSuccess(state, action);
    case actionTypes.REMOVE_SUBSCRIPTION_SUCCESS:
      return removeSubscription(state, action);
    case actionTypes.REMOVE_SUBSCRIPTION_ERROR:
      return removeSubscriptionError(state, action);
    case actionTypes.UPDATE_SUBSCRIPTION_SUCCESS:
      return updateSubscriptionSuccess(state, action);
    case actionTypes.UPDATE_SUBSCRIPTION_ERROR:
      return updateSubscriptionError(state, action);
    case actionTypes.UPDATE_EDITED_SUBSCRIPTION_FORM_VALUE:
      return updateEditedSubscriptionValue(state, action);
    case actionTypes.SET_EDITED_SUBSCRIPTION:
      return setEditedSubscription(state, action);
    case actionTypes.SET_FRESH_EDITED_SUBSCRIPTION:
      return setFreshEditedSubscription(state, action);
    case actionTypes.TOGGLE_EDITION_MODAL:
      return toggleEditionModal(state, action);
    case actionTypes.FETCH_SUBSCRIPTIONS_START:
      return fetchedSubscriptionsStart(state, action);
    case actionTypes.FETCH_SUBSCRIPTIONS_ERROR:
      return fetchSubsriptionsError(state, action);
    case actionTypes.FETCH_SUBSCRIPTIONS_SUCCESS:
      return fetchSubscriptionsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
