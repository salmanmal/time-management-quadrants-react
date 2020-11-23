import axios from "axios";

import { getHeader } from "../utils/axiosUtil";
import { GetUserUrl ,GetActivitiesUrl,AddActivityUrl,MarkCompleteUrl,RemoveActivityUrl,UpdateActivityUrl,GetDashboardUrl,AddKanbanColumnUrl,AddProjectUrl,AddProjectTaskUrl,AddTaskCommentUrl,RemoveKanbanColumnUrl,RemoveProjectUrl,RemoveProjectTaskUrl,RemoveCommentUrl,MoveTaskUrl} from "../utils/Constants";
import { addUserData,addData,startLoading, stopLoading,addSnackbar,addKanbanData } from "../reducer/appReducer";



export const getUserData = () => {
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(GetUserUrl, {}, config)
      .then(response => {
        dispatch(addUserData(response.data));
        dispatch(stopLoading());
      })
      .catch(e => {
        dispatch(stopLoading());
      });
  };
};


export const getActivities=()=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(GetActivitiesUrl, {}, config)
      .then(response => {

        dispatch(addData(response.data));
        dispatch(stopLoading());
      })
      .catch(e => {
        dispatch(stopLoading());
      });
  };
}

export const addActivity=(data,callback)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(AddActivityUrl, data, config)
      .then(response => {
        dispatch(getActivities());
        dispatch(addSnackbar('Activity Added',dispatch))
        callback()
        dispatch(stopLoading());
      })
      .catch(e => {
        dispatch(stopLoading());
      });
  };
}


export const markComplete=(data)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(MarkCompleteUrl, data, config)
      .then(response => {
        dispatch(getActivities());
        dispatch(stopLoading());
        dispatch(addSnackbar('Activity Marked Completed',dispatch))
      })
      .catch(e => {
        dispatch(stopLoading());
      });
  };
}

export const removeActivity=(data)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(RemoveActivityUrl, data, config)
      .then(response => {
        dispatch(getActivities());
        dispatch(stopLoading());
        dispatch(addSnackbar('Activity Removed',dispatch))
      })
      .catch(e => {
        dispatch(stopLoading());
      });
  };
}

export const updateActivity=(data)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(UpdateActivityUrl, data, config)
      .then(response => {
        dispatch(getActivities());
        dispatch(stopLoading());
        dispatch(addSnackbar('Activity Moved',dispatch))
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}

export const getDashboard=()=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(GetDashboardUrl, {}, config)
      .then(response => {
        dispatch(addKanbanData(response.data));
        dispatch(stopLoading());
      })
      .catch(e => {
        dispatch(stopLoading());
      });
  };
}

export const addKanbanColumn=(data,callback)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(AddKanbanColumnUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('New Column added',dispatch))
        callback();
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}

export const addProject=(data,callback)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(AddProjectUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('New Project added',dispatch))
        callback();
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}

export const addProjectTask=(data,callback)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(AddProjectTaskUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('New Task added',dispatch))
        callback()
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}
export const addTaskComment=(data,callback)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(AddTaskCommentUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('New Comment added',dispatch))
        callback();
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}

export const removeKanbanColumn=(data)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(RemoveKanbanColumnUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('Column removed',dispatch))
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}

export const removeProject=(data)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(RemoveProjectUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('Project removed',dispatch))
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}

export const removeProjectTask=(data)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(RemoveProjectTaskUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('Task removed',dispatch))
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}

export const removeComment=(data)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(RemoveCommentUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('Comment removed',dispatch))
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}
export const moveTask=(data)=>{
  return (dispatch, getState) => {
    const config = getHeader(getState);
    dispatch(startLoading());
    return axios
      .post(MoveTaskUrl, data, config)
      .then(response => {
        dispatch(getDashboard());
        dispatch(stopLoading());
        dispatch(addSnackbar('Task moved',dispatch))
      })
      .catch(e => {
        debugger;
        dispatch(stopLoading());
      });
  };
}