export const initialState = {
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false
};

export const AuthReducer = (state, action) => {

  switch (action.type) {

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };

    default:
      return state;
  }

};