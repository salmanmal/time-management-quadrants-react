import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addProject} from '../CommonActions'
import {fetchFromObject,setDeep} from '../../utils/UtilityFunctions';
import Input from '../../component/Input/Input';

export class AddNewProject extends Component {
    state = {
        isSubmitting: false,
        formConfig: {
          ProjectName: {
            type: "text",
            value: "",
            validation: false,
            isRequired: true,
            requiredFieldMessage: "Project Name is required.",
            acceptPattern: /^[A-Za-z0-9,@~!#%^$&* ]+$/,
            acceptPatternMessage: "Only A-Z and a-z are acceptable.",
            validatePattern: /^[A-Za-z0-9,@~!#%^$&* ]{3,50}$/,
            validatePatternMessage:
              "Please enter 3 to 50 characters. Only A-Z and a-z are acceptable.",
            maxLength: 50,
            // label: "First Name *",
            name: "ProjectName",
            className:'activity-name-input',
            placeHolder:'Add New Project'

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
        
          this.props.addProject(isFormValid.obj,()=>{
            this.setState({isSubmitting:false,});
            this.onInputChange('ProjectName','');
          })
        } else {
          this.setState({ isSubmitting: false });
        }
      };
    
      render() {
        const { ProjectName } = {...this.state.formConfig};
        return (
          <div className="add-kanban-form container">
            <form onSubmit={this.onFormSubmit}>
            <div className='row'>
              <Input {...ProjectName} onChange={this.onInputChange} />
              <i className='fa fa-plus-circle submit-icon cursor' onClick={this.onFormSubmit}></i>
              </div>
            </form>
          </div>
        );
      }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => {
    return {
        addProject: (data,callback) => {
        dispatch(addProject(data,callback));
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProject)
