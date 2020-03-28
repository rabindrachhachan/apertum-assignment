import loginReducer from './onboarding/reducer/login';

const RootReducer = (state, action) => {
  if (action.type === 'INITIALIZE_STATE') {
    state = undefined;
  }

  return {
    loginReducer: loginReducer(state && state.loginReducer, action),
  };
};

export default RootReducer;
