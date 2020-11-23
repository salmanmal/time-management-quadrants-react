const defaultState = {
  loginData: localStorage.loginData ? JSON.parse(localStorage.loginData) : null
};

const actionType = {
  ADD_LOGIN_DATA: "ADD_LOGIN_DATA",
  LOGOUT: "LOGOUT"
};
 const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionType.ADD_LOGIN_DATA: {
      return { ...state, loginData: action.payload };
    }
    case actionType.LOGOUT: {
      return { ...state, loginData: null };
    }
    default: {
      return state;
    }
  }
};

export const addLoginData = data => {
  return { type: actionType.ADD_LOGIN_DATA, payload: data };
};
export const logOut = () => {
  return { type: actionType.LOGOUT };
};

export {authReducer as default}