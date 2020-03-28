import * as types from '../actions/types';

const initialState = {
  accessToken: '',
  getAccessTokenSuccess: false,

  users: [],
  getUsersSucces: false,

  error: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        getAccessTokenSuccess: false,
        error: false,
      };

    case types.ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload['data'],
        getAccessTokenSuccess: true,
      };

    case types.ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        accessToken: '',
        error: true,
      };

    case types.GET_USER_REQUEST:
      return {
        ...state,
        getUsersSucces: false,
        error: false,
      };

    case types.GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload['data'],
        getUsersSucces: true,
      };

    case types.GET_USER_FAILURE:
      return {
        ...state,
        getUsersSucces: false,
        error: true,
      };

    default:
      return state;
  }
};

export default loginReducer;
