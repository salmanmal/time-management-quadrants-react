const defaultState = {
  data: {
    i_U: [],
    i_NU: [],
    nI_U: [],
    nI_NU: [],
    trash:[],
    archive:[]
  },
  kanbanData: [],
  loading: 0,
  snackbarData: [],
  userData: null
};

const actionType = {
  ADD_DATA: "ADD_DATA",
  ADD_USER_DATA: "ADD_USER_DATA",
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  ADD_SNACKBAR_DATA: "ADD_SNACKBAR_DATA",
  REMOVE_SNACKBAR_DATA: "REMOVE_SNACKBAR_DATA",
  ADD_KANBAN_DATA: "ADD_KANBAN_DATA"
};
const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionType.ADD_DATA: {
      return { ...state, data: action.payload };
    }
    case actionType.ADD_USER_DATA: {
      return { ...state, userData: action.payload };
    }
    case actionType.START_LOADING: {
      return { ...state, loading: state.loading + 1 };
    }
    case actionType.STOP_LOADING: {
      return { ...state, loading: state.loading - 1 };
    }
    case actionType.ADD_SNACKBAR_DATA: {
      return {
        ...state,
        snackbarData: [...state.snackbarData, action.payload]
      };
    }
    case actionType.REMOVE_SNACKBAR_DATA: {
      return { ...state, snackbarData: [] };
    }
    case actionType.ADD_KANBAN_DATA: {
      return { ...state, kanbanData: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const addData = data => {
  return { type: actionType.ADD_DATA, payload: data };
};
export const addKanbanData = data => {
  return { type: actionType.ADD_KANBAN_DATA, payload: data };
};
export const addUserData = data => {
  return { type: actionType.ADD_USER_DATA, payload: data };
};
export const startLoading = () => {
  return { type: actionType.START_LOADING };
};
export const stopLoading = () => {
  return { type: actionType.STOP_LOADING };
};
export const addSnackbar = (message, dispatch) => {
  setTimeout(() => {
    dispatch(removeSnackbar());
  }, 3000);
  return { type: actionType.ADD_SNACKBAR_DATA, payload: message };
};

const removeSnackbar = () => {
  debugger;
  return { type: actionType.REMOVE_SNACKBAR_DATA };
};

export { appReducer as default };
