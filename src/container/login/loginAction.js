import axios from 'axios';
import qs from 'qs';
import { addLoginData } from "../../reducer/authReducer";
import {startLoading,stopLoading } from '../../reducer/appReducer';
import {LoginUrl} from '../../utils/Constants';
import {getUserData} from '../CommonActions';
export const login = (data, callback) => {
  return (dispatch, getState) => {
    
    dispatch(startLoading());
    return axios.post(LoginUrl, data).then(response=>{
      localStorage.setItem(
        "loginData",
        JSON.stringify(response.data)
      );
      dispatch(addLoginData(response.data));
      dispatch(stopLoading());
       dispatch(getUserData())
      return callback();
    }).catch(e=>{
     alert(`The user name or password is incorrect.`);
      dispatch(stopLoading());
    })
 
    
  };
};
