import * as actionTypes from './actionTypes';

export const addSubscription = ( subscription ) => {
  return {
    type: actionTypes.ADD_SUBSCRIPTION,
    subscription
  };
};

export const removeSubscription = ( subscription ) => {
  return {
    type: actionTypes.REMOVE_SUBSCRIPTION,
    subscription
  };
};

export const updateSubscription = ( subscription ) => {
  return {
    type: actionTypes.UPDATE_SUBSCRIPTION,
    subscription
  };
};
