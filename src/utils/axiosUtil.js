// import {startLoading,stopLoading } from '../../reducer/appReducer';

export const getHeader=(getState)=>{
    const access_token=getState().auth.loginData.token
    return {headers:{Authorization:`bearer ${access_token}`}}
}