import React, { Component } from "react";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import { basePath } from "../../config/baseConfig";
import {getUserData} from '../CommonActions';
import ReactLogo from "../../logo.svg";
import './layout.scss'

class Header extends Component {
  componentDidMount(){
    const {isLoggedin,UserData}=this.props;
    if(isLoggedin&&!UserData){
      this.props.getUserData()
    }
  }
 
  render() {
      const {isLoggedin,logOut,UserData,SnackBarData}=this.props;
    return (
      <div className={`header-content`}>
        <div className="header">
          <div className="header-1">
            <Link to={`${basePath}/`}>
              <img src={ReactLogo} alt={`React`} style={{maxWidth:'100px'}}/>
            </Link>
          </div>

          <div className="header-2">
            <div className="header-3"><span><b>{(UserData&&isLoggedin)?`Welcome : ${UserData.firstName} ${UserData.lastName}`:'Welcome to Four Quadrants of Time Management'}</b></span>{isLoggedin&&  <div className="logoutlink" onClick={logOut} > | Logout</div>}  </div>
          </div>
        </div>
        {SnackBarData.length>0&&<div id="snackbar" className='show'>
        {SnackBarData.map(message=>(<div >{message}</div>)
        )}
        
        </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserData:state.app.userData,
    SnackBarData:state.app.snackbarData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => {
      dispatch(getUserData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);