import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addActivity } from "../CommonActions";
import Input from "../../component/Input/Input";
import { fetchFromObject, setDeep } from "../../utils/UtilityFunctions";

class AddActivity extends Component {
  state = {
    isSubmitting: false,
    formConfig: {
      ActivityName: {
        type: "text",
        value: "",
        validation: false,
        isRequired: true,
        requiredFieldMessage: "Activity Name is required.",
        // acceptPattern: /^[A-Za-z0-9,@~!#%^$&* ]+$/,
        // acceptPatternMessage: "Only A-Z and a-z are acceptable.",
        // validatePattern: /^[]{5,50}$/,
        // validatePatternMessage:"Please enter 5 to 50 characters. ",
        // maxLength: 50,
        // label: "First Name *",
        name: "ActivityName",
        className:'activity-name-input'
      }
    }
  };

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

  onFormSubmit = e => {
    
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const isFormValid = this.validateForm();
    if (isFormValid.isValid) {
      isFormValid.obj["ActivityType"]=this.props.ActivityType
      this.props.addActivity(isFormValid.obj,()=>{
        this.setState({isSubmitting:false,});
        this.onInputChange('ActivityName','');
      })
    } else {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { ActivityName } = {...this.state.formConfig};
    return (
      <div className="add-activity container">
        <form onSubmit={this.onFormSubmit}>
        <div className='row'>
          <Input {...ActivityName} onChange={this.onInputChange} />
          <i className='fa fa-plus-circle submit-icon cursor' onClick={this.onFormSubmit}></i>
          </div>
        </form>
      </div>
    );
  }
}
AddActivity.propTypes = {
  ActivityType: PropTypes.number.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    addActivity: (data, callback) => {
      dispatch(addActivity(data, callback));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddActivity);
