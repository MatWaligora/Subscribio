import * as actionTypes from './actionTypes';

export const addSubscription = ( subscription ) => {
  return {
    type: actionTypes.ADD_SUBSCRIPTION,
    subscription
  };
};

export const removeSubscription = ( subscriptionId ) => {
  return {
    type: actionTypes.REMOVE_SUBSCRIPTION,
    subscriptionId
  };
};

export const updateSubscription = ( subscription ) => {
  return {
    type: actionTypes.UPDATE_SUBSCRIPTION,
    subscription
  };
};

export const updateEditedSubscriptionValue = ( value, formIdentifier ) => {
  return {
    type: actionTypes.UPDATE_EDITED_SUBSCRIPTION_FORM_VALUE,
    payload: {value, formIdentifier}
  };
};

const editSubscription = ( subscriptionId ) => {
  return {
    type: actionTypes.SET_EDITED_SUBSCRIPTION,
    subscriptionId
  };
};

const setFreshSubscription = () => {
  return {
    type: actionTypes.SET_FRESH_EDITED_SUBSCRIPTION
  };
};

export const setEditedSubscription = ( subscriptionId ) => {
  return dispatch => {
    dispatch(editSubscription(subscriptionId));
    dispatch(toggleEditionModal());
  }
};

export const setFreshEditedSubscription = () => {
  return dispatch => {
    dispatch(setFreshSubscription());
    dispatch(toggleEditionModal());
  }
};

export const toggleEditionModal = () => {
  return {
    type: actionTypes.TOGGLE_EDITION_MODAL
  };
};
