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

export const reducer = (state = initialState, action) => {
  return state;
};