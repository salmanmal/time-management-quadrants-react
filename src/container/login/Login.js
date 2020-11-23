import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../component/Input/Input";

import { login } from "./loginAction";
import { fakeAuth } from "../../App";
import "./Login.scss";
import { basePath } from "../../config/baseConfig";
import {fetchFromObject,setDeep} from '../../utils/UtilityFunctions'; 
// import BackGround from '../../assets/images/bg.jpg';

export class Login extends Component {
  state = {
    redirectToReferrer: false,
    formConfig: {
      Username: {
        type: "text",
        value: "",
        validation: false,
        isRequired: true,
        label:'Username',
        requiredFieldMessage: "Username is required.",
        acceptPattern: /^[A-Za-z0-9]+$/,
        acceptPatternMessage: "Only A-Z and a-z are acceptable.",
        validatePattern: /^[A-Za-z0-9]{3,50}$/,
        validatePatternMessage:
          "Please enter 3 to 50 characters. Only A-Z and a-z are acceptable.",
        maxLength: 50,
        // label: "First Name *",
        name: "Username",
      },Password: {
        type: "password",
        value: "",
        validation: false,
        isRequired: true,
        label:'Password',
        requiredFieldMessage: "Password is required.",
        acceptPattern: /^[A-Za-z0-9]+$/,
        acceptPatternMessage: "Only A-Z and a-z are acceptable.",
        validatePattern: /^[A-Za-z0-9]{3,50}$/,
        validatePatternMessage:
          "Please enter 3 to 50 characters. Only A-Z and a-z are acceptable.",
        maxLength: 50,
        // label: "First Name *",
        name: "Password",
      },
    }
  };

  componentDidMount() {
    if (this.props.auth.loginData) {
      this.setState({ redirectToReferrer: true });
    }
  }

  onInputChange = (key, value) => {
    let formConfig = { ...this.state.formConfig };
    let FieldData = fetchFromObject(formConfig, key);
    FieldData.value = value;
    FieldData.validation = false;
    formConfig = setDeep(formConfig, key, FieldData, true);
    this.setState({ formConfig });
  };
  validateForm = (rootPath = "") => {
    let isValid = true;
    let obj = {};
    const keys = rootPath
      ? Object.keys(fetchFromObject(this.state.formConfig, rootPath))
      : Object.keys(this.state.formConfig);
    let { formConfig } = this.state;
    keys.forEach(item => {
      let path = rootPath ? rootPath + "." + item : item;
      let fetchedObject = fetchFromObject(formConfig, path);
      if (fetchedObject instanceof Object) {
        if (fetchedObject instanceof Array) {
          fetchedObject.forEach((arrayitem, index) => {
            let arraypath = path + "." + index;
            const isobjValid = this.validateForm(arraypath);
            obj[item] = isobjValid.obj;
            if (isValid && !isobjValid.isValid) {
              isValid = isobjValid.isValid;
            }
          });
        } else {
          if (fetchedObject.value != undefined) {
            obj[item] = fetchedObject.value;
            if (!fetchedObject.value && fetchedObject.isRequired) {
              fetchedObject.validation = fetchedObject.requiredFieldMessage;
            } else if (
              fetchedObject.value &&
              fetchedObject.validatePattern &&
              !fetchedObject.validatePattern.test(fetchedObject.value)
            ) {
              fetchedObject.validation = fetchedObject.validatePatternMessage;
            }
            if (fetchedObject.validation) {
              isValid = false;
              console.log(path);
              formConfig = setDeep(formConfig, path, fetchedObject, true);
              this.setState({ formConfig });
            }
          } else {
            const isobjValid = this.validateForm(path);
            obj[item] = isobjValid.obj;
            if (isValid && !isobjValid.isValid) {
              isValid = isobjValid.isValid;
            }
          }
        }
      }
    });

    return { isValid, obj };
  };
  login = e => {
    e.preventDefault();
    const isFormValid = this.validateForm();
    if (isFormValid.isValid) {
      this.props.login(isFormValid.obj, () => {
        fakeAuth.authenticate(() => {
          this.setState({ redirectToReferrer: true });
        });
      });
    } 
  };

  render() {
    console.log(this.props);
    let { from } = this.props.location.state || {
      from: { pathname: `${basePath}/` }
    };
    let { redirectToReferrer } = this.state;
  const {Username,Password}=this.state.formConfig;


    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      
      <div className="loginpage" >
      {/* <img src={BackGround}/> */}
        <form onSubmit={this.login}>
          <label className="maintitle text-center">Login</label>
          <div className="loginforminn">
          <Input {...Username} onChange={this.onInputChange} />
          <Input {...Password} onChange={this.onInputChange} />
            
            <button type="submit" className="commonbtn">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    login: (data, callback) => {
      dispatch(login(data, callback));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
